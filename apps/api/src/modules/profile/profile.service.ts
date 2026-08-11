import { User } from '../../models/user.model';
import { AuthorProfile } from '../../models/author-profile.model';
import { ReviewerProfile } from '../../models/reviewer-profile.model';
import { NotFoundError } from '../../shared/errors';
import { Role } from '@vyom/constants';

export class ProfileService {
  async getProfile(userId: string) {
    const user = await User.findById(userId);
    if (!user) throw new NotFoundError('User not found');

    const profileData: any = { user };

    // Fetch author metadata if applicable
    if (user.roles.includes(Role.AUTHOR)) {
      profileData.authorProfile = await AuthorProfile.findOne({ userId });
    }

    // Fetch reviewer metadata if applicable
    if (user.roles.includes(Role.REVIEWER)) {
      profileData.reviewerProfile = await ReviewerProfile.findOne({ userId });
    }

    return profileData;
  }

  async updateProfile(userId: string, data: any) {
    const user = await User.findById(userId);
    if (!user) throw new NotFoundError('User not found');

    if (data.fullName) {
      user.fullName = data.fullName;
    }
    await user.save();

    // Update specialized profiles
    if (user.roles.includes(Role.AUTHOR)) {
      await AuthorProfile.findOneAndUpdate(
        { userId: user._id },
        {
          $set: {
            bio: data.bio,
            affiliation: data.affiliation,
            researchInterests: data.researchInterests,
            orcidId: data.orcidId,
          },
        },
        { upsert: true, new: true }
      );
    }

    if (user.roles.includes(Role.REVIEWER)) {
      await ReviewerProfile.findOneAndUpdate(
        { userId: user._id },
        {
          $set: {
            bio: data.bio,
            affiliation: data.affiliation,
            researchInterests: data.researchInterests,
          },
        },
        { upsert: true, new: true }
      );
    }

    return this.getProfile(userId);
  }
}

export const profileService = new ProfileService();
