import { Article } from '../../models/article.model';
import { Category } from '../../models/category.model';
import { Download } from '../../models/download.model';
import { NotFoundError } from '../../shared/errors';
import { ArticleStatus } from '@vyom/types';
import { Types } from 'mongoose';

export class ArticlesService {
  async getArticles(query: { category?: string; search?: string; tag?: string; status?: ArticleStatus; volume?: number; issue?: number }) {
    const filter: any = { isDeleted: false };

    if (query.status) {
      filter.status = query.status;
    } else {
      filter.status = ArticleStatus.PUBLISHED; // default to published
    }

    if (query.volume) filter.volume = Number(query.volume);
    if (query.issue) filter.issue = Number(query.issue);
    if (query.tag) filter.tags = query.tag;

    if (query.category) {
      const cat = await Category.findOne({
        $or: [
          { _id: Types.ObjectId.isValid(query.category) ? new Types.ObjectId(query.category) : undefined },
          { slug: query.category },
        ].filter(Boolean) as any,
      });
      if (cat) {
        filter.categoryIds = cat._id;
      } else {
        return [];
      }
    }

    if (query.search) {
      filter.$or = [
        { title: { $regex: query.search, $options: 'i' } },
        { abstract: { $regex: query.search, $options: 'i' } },
        { doi: { $regex: query.search, $options: 'i' } },
      ];
    }

    return Article.find(filter)
      .populate('categoryIds', 'name slug')
      .populate('authorIds', 'fullName email')
      .sort({ publishDate: -1 });
  }

  async getArticleBySlugOrId(identifier: string) {
    const isId = Types.ObjectId.isValid(identifier);
    const filter = isId ? { _id: identifier, isDeleted: false } : { slug: identifier, isDeleted: false };

    const article = await Article.findOne(filter)
      .populate('categoryIds', 'name slug')
      .populate('authorIds', 'fullName email');

    if (!article) {
      throw new NotFoundError('Article not found');
    }

    // Increment view count
    article.viewCount += 1;
    await article.save();

    return article;
  }

  async recordDownload(articleId: string, userId?: string, ipAddress?: string, userAgent?: string) {
    const article = await Article.findById(articleId);
    if (!article) throw new NotFoundError('Article not found');

    article.downloadCount += 1;
    await article.save();

    // Create Download log
    const download = new Download({
      articleId: article._id,
      userId: userId ? new Types.ObjectId(userId) : undefined,
      ipAddress,
      userAgent,
      downloadedAt: new Date(),
    });
    await download.save();

    return article;
  }

  async createArticle(data: any) {
    let slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const existing = await Article.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now().toString().substring(8)}`;
    }

    const article = new Article({
      ...data,
      slug,
      viewCount: 0,
      downloadCount: 0,
    });

    return article.save();
  }

  async updateArticle(id: string, data: any) {
    const article = await Article.findById(id);
    if (!article) throw new NotFoundError('Article not found');

    if (data.title && data.title !== article.title) {
      let slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const existing = await Article.findOne({ slug, _id: { $ne: id } });
      if (existing) {
        slug = `${slug}-${Date.now().toString().substring(8)}`;
      }
      article.slug = slug;
    }

    Object.assign(article, data);
    return article.save();
  }

  async deleteArticle(id: string) {
    const article = await Article.findById(id);
    if (!article) throw new NotFoundError('Article not found');

    article.isDeleted = true;
    await article.save();
    return true;
  }

  // Generate dynamic citation formats
  generateCitations(article: any) {
    const authorsList = article.authorIds
      .map((a: any) => {
        const names = a.fullName.split(' ');
        const lastName = names[names.length - 1];
        const firstNameInitial = names[0] ? `${names[0].charAt(0)}.` : '';
        return `${lastName}, ${firstNameInitial}`;
      })
      .join(', & ');

    const year = article.publishDate ? new Date(article.publishDate).getFullYear() : new Date().getFullYear();
    const title = article.title;
    const volume = article.volume || '';
    const issue = article.issue ? `(${article.issue})` : '';
    const pages = article.pageRange ? `, ${article.pageRange}` : '';
    const doi = article.doi ? ` https://doi.org/${article.doi}` : '';

    return {
      apa: `${authorsList} (${year}). ${title}. *VYOM Journal*, ${volume}${issue}${pages}.${doi}`,
      mla: `${authorsList}. "${title}." *VYOM Journal*, vol. ${volume}, no. ${article.issue || 1}, ${year}${pages}.${doi ? ' doi:' + article.doi : ''}`,
      chicago: `${authorsList}. "${title}." *VYOM Journal* ${volume}, no. ${article.issue || 1} (${year})${pages}.${doi ? ' https://doi.org/' + article.doi : ''}`,
      harvard: `${authorsList}, ${year}. ${title}. *VYOM Journal*, ${volume}${issue}, pp.${pages.replace(', ', '')}. Available at: <https://doi.org/${article.doi || ''}>.`,
      bibtex: `@article{vyom_${article._id},\n  author = {${article.authorIds.map((a: any) => a.fullName).join(' and ')}},\n  title = {${title}},\n  journal = {VYOM Journal},\n  year = {${year}},\n  volume = {${volume}},\n  number = {${article.issue || 1}},\n  pages = {${article.pageRange || ''}},\n  doi = {${article.doi || ''}}\n}`,
    };
  }
}

export const articlesService = new ArticlesService();
