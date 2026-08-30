import { redirect } from 'next/navigation';

export default function PublishWithUsPage() {
  redirect('/register?role=author');
}
