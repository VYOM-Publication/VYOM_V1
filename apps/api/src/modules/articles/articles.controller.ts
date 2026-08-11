import { Request, Response, NextFunction } from 'express';
import { articlesService } from './articles.service';
import { sendSuccess } from '../../shared/utils/response';
import { createArticleSchema, updateArticleSchema } from '@vyom/validations';
import { ArticleStatus } from '@vyom/types';
import { Role } from '@vyom/constants';

export class ArticlesController {
  async getArticles(req: Request, res: Response, next: NextFunction) {
    try {
      const category = req.query.category as string;
      const search = req.query.search as string;
      const tag = req.query.tag as string;
      const volume = req.query.volume ? parseInt(req.query.volume as string, 10) : undefined;
      const issue = req.query.issue ? parseInt(req.query.issue as string, 10) : undefined;

      let status: ArticleStatus | undefined;
      const roles = (req as any).user?.roles ?? [];
      const hasPrivileges = roles.includes(Role.ADMIN) || roles.includes(Role.EDITOR);

      if (hasPrivileges && req.query.status) {
        status = req.query.status as ArticleStatus;
      } else {
        status = ArticleStatus.PUBLISHED;
      }

      const articles = await articlesService.getArticles({ category, search, tag, status, volume, issue });
      sendSuccess(res, { articles });
    } catch (err) {
      next(err);
    }
  }

  async getArticle(req: Request, res: Response, next: NextFunction) {
    try {
      const identifier = req.params.slugOrId;
      const article = await articlesService.getArticleBySlugOrId(identifier);
      
      // Generate citations
      const citations = articlesService.generateCitations(article);

      sendSuccess(res, { article, citations });
    } catch (err) {
      next(err);
    }
  }

  async recordDownload(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const userId = (req as any).user?.sub; // Optional userId
      const ipAddress = req.ip;
      const userAgent = req.headers['user-agent'];

      const article = await articlesService.recordDownload(id, userId, ipAddress, userAgent);
      sendSuccess(res, { downloadCount: article.downloadCount }, 'Download count recorded');
    } catch (err) {
      next(err);
    }
  }

  async createArticle(req: Request, res: Response, next: NextFunction) {
    try {
      const data = createArticleSchema.parse(req.body);
      const article = await articlesService.createArticle(data);
      sendSuccess(res, { article }, 'Article created successfully', 201);
    } catch (err) {
      next(err);
    }
  }

  async updateArticle(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const data = updateArticleSchema.parse(req.body);
      const article = await articlesService.updateArticle(id, data);
      sendSuccess(res, { article }, 'Article updated successfully');
    } catch (err) {
      next(err);
    }
  }

  async deleteArticle(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      await articlesService.deleteArticle(id);
      sendSuccess(res, null, 'Article deleted successfully');
    } catch (err) {
      next(err);
    }
  }
}

export const articlesController = new ArticlesController();
