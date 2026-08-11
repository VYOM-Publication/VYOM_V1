import { Submission } from '../../models/submission.model';
import { Review } from '../../models/review.model';
import { Article } from '../../models/article.model';
import { User } from '../../models/user.model';
import { Notification } from '../../models/notification.model';
import { emailService } from '../../shared/services/email/email.service';
import { SubmissionStatus, ReviewStatus, ReviewRecommendation, ArticleStatus } from '@vyom/types';
import { Role } from '@vyom/constants';
import { Types } from 'mongoose';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../../shared/errors';


export class SubmissionsService {
  async submitAbstract(userId: string, data: { title: string; abstract: string; keywords: string[] }) {
    const submission = new Submission({
      title: data.title,
      abstract: data.abstract,
      keywords: data.keywords,
      authorId: new Types.ObjectId(userId),
      status: SubmissionStatus.ABSTRACT_SUBMITTED,
      versions: [],
      currentVersion: 0,
      paymentStatus: 'pending',
    });

    await submission.save();

    // Create Notification for the Author
    const author = await User.findById(userId);
    if (author) {
      await new Notification({
        userId: author._id,
        title: 'Abstract Submitted',
        message: `Your abstract titled "${submission.title}" has been successfully submitted.`,
        type: 'success',
        link: `/author/dashboard`,
      }).save();

      // Send email notification
      await emailService.sendSubmissionConfirmation(author.email, author.fullName, submission.title, submission._id.toString());
    }

    // Notify Editors
    const editors = await User.find({ roles: Role.EDITOR });
    for (const editor of editors) {
      await new Notification({
        userId: editor._id,
        title: 'New Abstract Submitted',
        message: `A new abstract "${submission.title}" is pending review.`,
        type: 'info',
        link: `/editor/dashboard`,
      }).save();
    }

    return submission;
  }

  async getSubmissions(query: { authorId?: string; editorId?: string; reviewerId?: string; status?: string }) {
    const filter: any = { isDeleted: false };
    if (query.authorId) filter.authorId = new Types.ObjectId(query.authorId);
    if (query.editorId) filter.editorId = new Types.ObjectId(query.editorId);
    // Reviewers may only see submissions they are explicitly assigned to
    if (query.reviewerId) filter.reviewerIds = new Types.ObjectId(query.reviewerId);
    if (query.status) filter.status = query.status;

    return Submission.find(filter)
      .populate('authorId', 'fullName email')
      .populate('reviewerIds', 'fullName email')
      .sort({ updatedAt: -1 });
  }

  async getSubmissionById(id: string, userId: string, roles: Role[]) {
    const submission = await Submission.findById(id)
      .populate('authorId', 'fullName email')
      .populate('reviewerIds', 'fullName email')
      .populate('editorId', 'fullName email');

    if (!submission) {
      throw new NotFoundError('Submission not found');
    }

    // Verify RBAC access
    const authorIdStr = (submission.authorId as any)._id
      ? (submission.authorId as any)._id.toString()
      : submission.authorId.toString();
    const isAuthor = authorIdStr === userId;
    const isEditor = roles.includes(Role.EDITOR);
    const isAdmin = roles.includes(Role.ADMIN);
    const isReviewer = submission.reviewerIds.some((rId) => {
      const rIdStr = (rId as any)._id ? (rId as any)._id.toString() : rId.toString();
      return rIdStr === userId;
    });

    if (!isAuthor && !isEditor && !isAdmin && !isReviewer) {
      throw new UnauthorizedError('Unauthorized access to this submission');
    }

    // Find reviews if accessed by editor or assigned reviewer
    let reviews: any[] = [];
    if (isEditor || isAdmin) {
      reviews = await Review.find({ submissionId: submission._id }).populate('reviewerId', 'fullName email');
    } else if (isReviewer) {
      reviews = await Review.find({ submissionId: submission._id, reviewerId: new Types.ObjectId(userId) });
    }

    return { submission, reviews };
  }

  async reviewAbstract(submissionId: string, editorId: string, decision: 'approve' | 'reject', comments?: string) {
    const submission = await Submission.findById(submissionId);
    if (!submission) throw new NotFoundError('Submission not found');

    if (submission.status !== SubmissionStatus.ABSTRACT_SUBMITTED) {
      throw new BadRequestError('Submission is not in abstract submission state');
    }

    submission.editorId = new Types.ObjectId(editorId) as any;
    if (decision === 'approve') {
      submission.status = SubmissionStatus.ABSTRACT_APPROVED;
    } else {
      submission.status = SubmissionStatus.ABSTRACT_REJECTED;
    }
    await submission.save();

    // Notify author
    const author = await User.findById(submission.authorId);
    if (author) {
      const isApproved = decision === 'approve';
      await new Notification({
        userId: author._id,
        title: isApproved ? 'Abstract Approved' : 'Abstract Rejected',
        message: isApproved
          ? `Your abstract "${submission.title}" has been approved. Please upload your full manuscript.`
          : `Your abstract "${submission.title}" has been rejected.`,
        type: isApproved ? 'success' : 'danger',
        link: `/author/dashboard`,
      }).save();

      await emailService.sendWorkflowDecisionNotification(
        author.email,
        author.fullName,
        submission.title,
        submission.status,
        comments
      );
    }

    return submission;
  }

  async uploadManuscript(submissionId: string, authorId: string, file: { url: string; name: string; type: string }) {
    const submission = await Submission.findById(submissionId);
    if (!submission) throw new NotFoundError('Submission not found');

    if (submission.authorId.toString() !== authorId) {
      throw new UnauthorizedError('Only the author can upload manuscripts');
    }

    const validStatus = [SubmissionStatus.ABSTRACT_APPROVED, SubmissionStatus.REVISION_REQUESTED];
    if (!validStatus.includes(submission.status)) {
      throw new BadRequestError('Manuscript cannot be uploaded at this stage of the workflow');
    }

    submission.currentVersion += 1;
    submission.versions.push({
      versionNo: submission.currentVersion,
      fileUrl: file.url,
      fileName: file.name,
      fileType: file.type,
      createdAt: new Date(),
    });

    submission.status = SubmissionStatus.MANUSCRIPT_SUBMITTED;
    await submission.save();

    // Notify editor
    if (submission.editorId) {
      await new Notification({
        userId: submission.editorId,
        title: 'Manuscript Uploaded',
        message: `Full manuscript for "${submission.title}" has been uploaded (v${submission.currentVersion}).`,
        type: 'info',
        link: `/editor/dashboard`,
      }).save();
    }

    return submission;
  }

  async assignReviewer(submissionId: string, _editorId: string, reviewerId: string, dueDate: Date) {
    const submission = await Submission.findById(submissionId);
    if (!submission) throw new NotFoundError('Submission not found');

    const reviewer = await User.findOne({ _id: reviewerId, roles: Role.REVIEWER });
    if (!reviewer) throw new BadRequestError('Selected user is not registered as a Reviewer');

    const alreadyAssigned = submission.reviewerIds.some((rId) => rId.toString() === reviewerId);
    if (alreadyAssigned) throw new BadRequestError('Reviewer is already assigned to this submission');

    submission.reviewerIds.push(new Types.ObjectId(reviewerId) as any);
    submission.status = SubmissionStatus.UNDER_REVIEW;
    await submission.save();

    // Create a Review entry
    const review = new Review({
      submissionId: submission._id,
      reviewerId: reviewer._id,
      versionNo: submission.currentVersion,
      dueDate,
      status: ReviewStatus.PENDING,
    });
    await review.save();

    // Notify reviewer
    await new Notification({
      userId: reviewer._id,
      title: 'New Review Assignment',
      message: `You have been assigned to review "${submission.title}". Due date: ${dueDate.toLocaleDateString()}`,
      type: 'info',
      link: `/reviewer/dashboard`,
    }).save();

    await emailService.sendReviewAssignmentNotification(
      reviewer.email,
      reviewer.fullName,
      submission.title,
      dueDate
    );

    return { submission, review };
  }

  async submitReview(reviewId: string, reviewerId: string, data: { score: number; commentsForAuthor: string; commentsForEditor?: string; recommendation: ReviewRecommendation }) {
    const review = await Review.findById(reviewId);
    if (!review) throw new NotFoundError('Review assignment not found');

    if (review.reviewerId.toString() !== reviewerId) {
      throw new UnauthorizedError('You are not authorized to submit this review');
    }

    if (review.status !== ReviewStatus.PENDING) {
      throw new BadRequestError('This review has already been completed or declined');
    }

    review.score = data.score;
    review.commentsForAuthor = data.commentsForAuthor;
    review.commentsForEditor = data.commentsForEditor;
    review.recommendation = data.recommendation;
    review.status = ReviewStatus.COMPLETED;
    review.submittedAt = new Date();
    await review.save();

    // Check if all assigned reviews for this version are complete
    const submission = await Submission.findById(review.submissionId);
    if (submission) {
      // Notify editor
      if (submission.editorId) {
        await new Notification({
          userId: submission.editorId,
          title: 'Review Completed',
          message: `A reviewer has submitted feedback for "${submission.title}". Recommendation: ${data.recommendation}`,
          type: 'info',
          link: `/editor/dashboard`,
        }).save();
      }
    }

    return review;
  }

  async makeDecision(submissionId: string, _editorId: string, decision: SubmissionStatus, comments?: string) {
    const submission = await Submission.findById(submissionId);
    if (!submission) throw new NotFoundError('Submission not found');

    const allowedDecisions = [
      SubmissionStatus.ACCEPTED,
      SubmissionStatus.REJECTED,
      SubmissionStatus.REVISION_REQUESTED,
    ];

    if (!allowedDecisions.includes(decision)) {
      throw new BadRequestError('Invalid decision value for peer review result');
    }

    submission.status = decision;
    await submission.save();

    // Notify author
    const author = await User.findById(submission.authorId);
    if (author) {
      await new Notification({
        userId: author._id,
        title: `Manuscript Decision: ${decision.replace(/_/g, ' ').toUpperCase()}`,
        message: `An editorial decision has been made for "${submission.title}": ${decision.replace(/_/g, ' ')}.`,
        type: decision === SubmissionStatus.ACCEPTED ? 'success' : 'warning',
        link: `/author/dashboard`,
      }).save();

      await emailService.sendWorkflowDecisionNotification(
        author.email,
        author.fullName,
        submission.title,
        decision,
        comments
      );
    }

    return submission;
  }

  async publishSubmission(submissionId: string, _editorId: string, data: { volume: number; issue: number; pageRange: string; doi?: string; categoryIds: string[] }) {
    const submission = await Submission.findById(submissionId);
    if (!submission) throw new NotFoundError('Submission not found');

    if (submission.status !== SubmissionStatus.ACCEPTED) {
      throw new BadRequestError('Submission must be Accepted before publishing');
    }

    if (submission.paymentStatus !== 'paid') {
      throw new BadRequestError('Publication charge has not been paid for this submission');
    }

    // Create the public Article
    const lastVersion = submission.versions.find((v) => v.versionNo === submission.currentVersion);
    const pdfUrl = lastVersion?.fileUrl;

    const slug = submission.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const article = new Article({
      title: submission.title,
      slug,
      abstract: submission.abstract,
      authorIds: [submission.authorId],
      submissionId: submission._id,
      pdfUrl,
      volume: data.volume,
      issue: data.issue,
      pageRange: data.pageRange,
      doi: data.doi || `10.vyom/${Date.now()}`,
      categoryIds: data.categoryIds.map((cId) => new Types.ObjectId(cId)),
      status: ArticleStatus.PUBLISHED,
      publishDate: new Date(),
      citationText: `${submission.title}. VYOM Publication, Vol. ${data.volume}, No. ${data.issue}, pp. ${data.pageRange}.`,
    });

    await article.save();

    // Update submission
    submission.status = SubmissionStatus.PUBLISHED;
    await submission.save();

    // Notify author
    const author = await User.findById(submission.authorId);
    if (author) {
      await new Notification({
        userId: author._id,
        title: 'Article Published!',
        message: `Your article "${submission.title}" is officially published! DOI: ${article.doi}`,
        type: 'success',
        link: `/books`, // link to search/library catalog
      }).save();

      await emailService.sendPublicationConfirmation(author.email, author.fullName, submission.title, article.doi);
    }

    return { submission, article };
  }
}

export const submissionsService = new SubmissionsService();
