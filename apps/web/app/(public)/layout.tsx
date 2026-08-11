import Navbar from '@/components/layout/Navbar';
import PublicFooter from '@/components/layout/PublicFooter';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ivory font-body flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col">{children}</div>
      <PublicFooter />
    </div>
  );
}
