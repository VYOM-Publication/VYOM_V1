import { redirect } from 'next/navigation';

/**
 * /categories → redirects to /books
 * Previously this was a broken link in the old Footer component.
 * The books page now has full category filter functionality.
 */
export default function CategoriesPage() {
  redirect('/books');
}
