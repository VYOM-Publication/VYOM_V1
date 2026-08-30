'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronDown, User, BookOpen, Clock, Bookmark, Download, Bell, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';

interface NavSession {
  name: string;
  role: string;
  dashboard: string;
  avatarUrl?: string;
}

interface UserMenuProps {
  session: NavSession;
}

export default function UserMenu({ session }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuth();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  async function handleSignOut() {
    await logout();
  }

  const isReader = session.role === 'member';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-1 py-1 rounded-full hover:bg-sand/35 transition-all focus:outline-none"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {session.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={session.avatarUrl}
            alt={session.name}
            className="h-8 w-8 rounded-full object-cover border border-sand/40 shadow-sm"
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-ochre/15 text-ochre flex items-center justify-center font-bold text-xs select-none shadow-sm">
            {session.name.substring(0, 2).toUpperCase()}
          </div>
        )}
        <span className="hidden sm:inline text-xs font-bold text-forest-green/80">
          {session.name}
        </span>
        <ChevronDown className={`h-3 w-3 text-forest-green/50 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2.5 w-56 rounded-2xl border border-sand/40 bg-white p-2 shadow-card z-50 transform origin-top-right transition-all">
          <div className="px-3 py-2.5 border-b border-sand/20">
            <p className="text-xs font-bold text-forest-green truncate">{session.name}</p>
            <p className="text-[10px] font-bold text-forest-green/45 uppercase tracking-widest mt-0.5">
              {isReader ? 'Reader Account' : `${session.role} Portal`}
            </p>
          </div>

          <div className="py-1.5 flex flex-col gap-0.5">
            {isReader ? (
              <>
                <Link href="/member/dashboard" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-forest-green/75 hover:bg-sand/25 hover:text-forest-green transition-colors">
                  <BookOpen className="h-4 w-4 text-forest-green/40" /> My Library
                </Link>
                <Link href="/member/reading-history" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-forest-green/75 hover:bg-sand/25 hover:text-forest-green transition-colors">
                  <Clock className="h-4 w-4 text-forest-green/40" /> Reading History
                </Link>
                <Link href="/member/bookmarks" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-forest-green/75 hover:bg-sand/25 hover:text-forest-green transition-colors">
                  <Bookmark className="h-4 w-4 text-forest-green/40" /> Bookmarks
                </Link>
                <Link href="/member/downloads" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-forest-green/75 hover:bg-sand/25 hover:text-forest-green transition-colors">
                  <Download className="h-4 w-4 text-forest-green/40" /> Downloads
                </Link>
                <Link href="/member/profile" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-forest-green/75 hover:bg-sand/25 hover:text-forest-green transition-colors">
                  <User className="h-4 w-4 text-forest-green/40" /> Profile
                </Link>
              </>
            ) : (
              <>
                <Link href={session.dashboard} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-forest-green/75 hover:bg-sand/25 hover:text-forest-green transition-colors">
                  <Settings className="h-4 w-4 text-forest-green/40" /> Dashboard Console
                </Link>
                {session.role === 'author' && (
                  <Link href="/author/notifications" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-forest-green/75 hover:bg-sand/25 hover:text-forest-green transition-colors">
                    <Bell className="h-4 w-4 text-forest-green/40" /> Notifications
                  </Link>
                )}
              </>
            )}
          </div>

          <div className="border-t border-sand/20 my-1" />

          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors text-left"
          >
            <LogOut className="h-4 w-4 text-red-500" /> Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
