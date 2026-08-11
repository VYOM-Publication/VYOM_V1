import { redirect } from 'next/navigation';

/**
 * /articles → redirects to /books
 * Previously a broken link. Will be replaced with a dedicated
 * articles/journal listing page once the backend is available.
 * TODO: Replace redirect with GET /api/v1/articles page once backend credentials are available.
 */
export default function ArticlesPage() {
  redirect('/books');
}
