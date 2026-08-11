'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Logo } from '@/components/common/Logo';
import { useDemoAuth } from '@/lib/demo-auth';
import SearchBar from './SearchBar';
import NotificationBell from './NotificationBell';
import UserMenu from './UserMenu';

const WEBSITE_LINKS = [
  { label: 'HOME',            href: '/' },
  { label: 'ABOUT US',        href: '/about' },
  { label: 'BOOKS',           href: '/books' },
  { label: 'CATEGORIES',      href: '/books' },
  { label: 'EDITORIAL BOARD', href: '/editorial-board' },
  { label: 'BLOGS',           href: '/blogs' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const authorMenuRef = useRef<HTMLLIElement>(null);
  const [authorMenuOpen, setAuthorMenuOpen] = useState(false);

  const reviewerMenuRef = useRef<HTMLLIElement>(null);
  const [reviewerMenuOpen, setReviewerMenuOpen] = useState(false);

  const editorMenuRef = useRef<HTMLLIElement>(null);
  const [editorMenuOpen, setEditorMenuOpen] = useState(false);

  const { session, logout } = useDemoAuth();

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); hamburgerRef.current?.focus(); }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  useEffect(() => { if (open) closeRef.current?.focus(); }, [open]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (authorMenuRef.current && !authorMenuRef.current.contains(event.target as Node)) {
        setAuthorMenuOpen(false);
      }
      if (reviewerMenuRef.current && !reviewerMenuRef.current.contains(event.target as Node)) {
        setReviewerMenuOpen(false);
      }
      if (editorMenuRef.current && !editorMenuRef.current.contains(event.target as Node)) {
        setEditorMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setAuthorMenuOpen(false);
    setReviewerMenuOpen(false);
    setEditorMenuOpen(false);
  }, [pathname]);

  function isActive(href: string) {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  }

  return (
    <header role="banner" className="sticky top-0 z-50 bg-ivory border-b border-sand/30 shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4" aria-label="Main navigation">
        <Logo size={36} />

        {/* Desktop nav links */}
        <ul className="hidden lg:flex items-center gap-6" role="list">
          {WEBSITE_LINKS.map(({ label, href }) => {
            const active = isActive(href);
            return (
              <li key={label}>
                <Link href={href} aria-current={active ? 'page' : undefined}
                  className={`text-xs font-bold tracking-widest transition-colors whitespace-nowrap ${
                    active
                      ? 'text-forest-green underline underline-offset-4 decoration-ochre'
                      : 'text-forest-green/60 hover:text-forest-green'
                  }`}>
                  {label}
                </Link>
              </li>
            );
          })}

          {/* Author Publications Dropdown */}
          {session && session.role === 'author' && (
            <li className="relative" ref={authorMenuRef}>
              <button
                onClick={() => setAuthorMenuOpen(!authorMenuOpen)}
                className="flex items-center gap-1 text-xs font-bold tracking-widest text-forest-green/60 hover:text-forest-green transition-colors uppercase whitespace-nowrap focus:outline-none"
              >
                My Publications <ChevronDown className="h-3 w-3" />
              </button>
              
              {authorMenuOpen && (
                <div className="absolute left-0 mt-2.5 w-48 rounded-xl border border-sand/40 bg-white p-1.5 shadow-card z-50">
                  {[
                    { label: 'Dashboard',      href: '/author/dashboard' },
                    { label: 'My Submissions', href: '/author/submissions' },
                    { label: 'New Submission', href: '/author/submissions/new' },
                    { label: 'Publications',   href: '/author/publications' },
                    { label: 'Profile',        href: '/author/profile' },
                  ].map(sub => (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      className="block px-3 py-2 rounded-lg text-xs font-semibold text-forest-green/75 hover:bg-sand/25 hover:text-forest-green transition-colors"
                    >
                      {sub.label}
                    </Link>
                  ))}
                  <div className="border-t border-sand/20 my-1" />
                  <button
                    onClick={() => logout()}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors text-left"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </li>
          )}

          {/* Reviewer Dropdown */}
          {session && session.role === 'reviewer' && (
            <li className="relative" ref={reviewerMenuRef}>
              <button
                onClick={() => setReviewerMenuOpen(!reviewerMenuOpen)}
                className="flex items-center gap-1 text-xs font-bold tracking-widest text-forest-green/60 hover:text-forest-green transition-colors uppercase whitespace-nowrap focus:outline-none"
              >
                My Reviews <ChevronDown className="h-3 w-3" />
              </button>
              
              {reviewerMenuOpen && (
                <div className="absolute left-0 mt-2.5 w-48 rounded-xl border border-sand/40 bg-white p-1.5 shadow-card z-50">
                  {[
                    { label: 'Dashboard',          href: '/reviewer/dashboard' },
                    { label: 'Active Assignments', href: '/reviewer/assignments' },
                    { label: 'Review History',     href: '/reviewer/history' },
                    { label: 'Profile',            href: '/reviewer/profile' },
                  ].map(sub => (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      className="block px-3 py-2 rounded-lg text-xs font-semibold text-forest-green/75 hover:bg-sand/25 hover:text-forest-green transition-colors"
                    >
                      {sub.label}
                    </Link>
                  ))}
                  <div className="border-t border-sand/20 my-1" />
                  <button
                    onClick={() => logout()}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors text-left"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </li>
          )}

          {/* Editor Dropdown */}
          {session && session.role === 'editor' && (
            <li className="relative" ref={editorMenuRef}>
              <button
                onClick={() => setEditorMenuOpen(!editorMenuOpen)}
                className="flex items-center gap-1 text-xs font-bold tracking-widest text-forest-green/60 hover:text-forest-green transition-colors uppercase whitespace-nowrap focus:outline-none"
              >
                Editorial Console <ChevronDown className="h-3 w-3" />
              </button>
              
              {editorMenuOpen && (
                <div className="absolute left-0 mt-2.5 w-52 rounded-xl border border-sand/40 bg-white p-1.5 shadow-card z-50">
                  {[
                    { label: 'Editorial Hub',       href: '/editor/dashboard' },
                    { label: 'Submission Queue',    href: '/editor/submissions' },
                    { label: 'Reviewer Directory',  href: '/editor/reviewers' },
                    { label: 'Issues & Volumes',    href: '/editor/issues' },
                    { label: 'Communications',     href: '/editor/communications' },
                    { label: 'Archives',            href: '/editor/archives' },
                    { label: 'Profile',             href: '/editor/profile' },
                  ].map(sub => (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      className="block px-3 py-2 rounded-lg text-xs font-semibold text-forest-green/75 hover:bg-sand/25 hover:text-forest-green transition-colors"
                    >
                      {sub.label}
                    </Link>
                  ))}
                  <div className="border-t border-sand/20 my-1" />
                  <button
                    onClick={() => logout()}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors text-left"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </li>
          )}
        </ul>

        {/* Desktop right-side controls */}
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          <SearchBar />
          {session ? (
            <div className="flex items-center gap-3">
              <NotificationBell role={session.role} />
              <UserMenu session={session} />
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login"
                className="rounded-full border border-forest-green/40 px-5 py-2 text-sm font-semibold text-forest-green hover:border-forest-green hover:bg-forest-green/5 transition-colors">
                Login
              </Link>
              <Link href="/join"
                className="rounded-full bg-ochre px-5 py-2 text-sm font-semibold text-ivory hover:bg-ochre/90 transition-colors">
                Join VYOM
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-3 lg:hidden">
          {session && <NotificationBell role={session.role} />}
          <button ref={hamburgerRef}
            className="text-forest-green p-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre"
            aria-label="Open navigation menu" aria-expanded={open} aria-controls="mobile-nav"
            onClick={() => setOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div id="mobile-nav" className="fixed inset-0 z-50 flex flex-col bg-ivory px-6 py-6 overflow-y-auto"
          role="dialog" aria-modal="true" aria-label="Navigation menu">
          <div className="flex items-center justify-between mb-8">
            <Logo size={36} />
            <button ref={closeRef}
              className="text-forest-green p-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre"
              aria-label="Close navigation menu"
              onClick={() => { setOpen(false); hamburgerRef.current?.focus(); }}>
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="mb-6">
            <SearchBar />
          </div>

          <ul className="flex flex-col gap-5 flex-1" role="list">
            {WEBSITE_LINKS.map(({ label, href }) => {
              const active = isActive(href);
              return (
                <li key={label}>
                  <Link href={href} aria-current={active ? 'page' : undefined}
                    className={`block text-sm font-bold tracking-widest transition-colors ${
                      active ? 'text-forest-green underline underline-offset-4 decoration-ochre' : 'text-forest-green/70 hover:text-forest-green'
                    }`}>
                    {label}
                  </Link>
                </li>
              );
            })}
            
            {/* Mobile links for readers */}
            {session && session.role === 'member' && (
              <li className="border-t border-sand/30 pt-4 mt-2 flex flex-col gap-4">
                <span className="text-[10px] font-bold tracking-widest text-ochre uppercase">My Library</span>
                <Link href="/member/dashboard" onClick={() => setOpen(false)} className="text-sm font-bold text-forest-green/70 hover:text-forest-green">My Library</Link>
                <Link href="/member/reading-history" onClick={() => setOpen(false)} className="text-sm font-bold text-forest-green/70 hover:text-forest-green">Reading History</Link>
                <Link href="/member/bookmarks" onClick={() => setOpen(false)} className="text-sm font-bold text-forest-green/70 hover:text-forest-green">Bookmarks</Link>
                <Link href="/member/downloads" onClick={() => setOpen(false)} className="text-sm font-bold text-forest-green/70 hover:text-forest-green">Downloads</Link>
                <Link href="/member/profile" onClick={() => setOpen(false)} className="text-sm font-bold text-forest-green/70 hover:text-forest-green">Profile</Link>
              </li>
            )}

            {/* Mobile links for authors */}
            {session && session.role === 'author' && (
              <li className="border-t border-sand/30 pt-4 mt-2 flex flex-col gap-4">
                <span className="text-[10px] font-bold tracking-widest text-ochre uppercase">My Publications</span>
                <Link href="/author/dashboard" onClick={() => setOpen(false)} className="text-sm font-bold text-forest-green/70 hover:text-forest-green">Dashboard</Link>
                <Link href="/author/submissions" onClick={() => setOpen(false)} className="text-sm font-bold text-forest-green/70 hover:text-forest-green">My Submissions</Link>
                <Link href="/author/submissions/new" onClick={() => setOpen(false)} className="text-sm font-bold text-forest-green/70 hover:text-forest-green">New Submission</Link>
                <Link href="/author/publications" onClick={() => setOpen(false)} className="text-sm font-bold text-forest-green/70 hover:text-forest-green">Publications</Link>
                <Link href="/author/profile" onClick={() => setOpen(false)} className="text-sm font-bold text-forest-green/70 hover:text-forest-green">Profile</Link>
              </li>
            )}

            {/* Mobile links for reviewers */}
            {session && session.role === 'reviewer' && (
              <li className="border-t border-sand/30 pt-4 mt-2 flex flex-col gap-4">
                <span className="text-[10px] font-bold tracking-widest text-ochre uppercase">My Reviews</span>
                <Link href="/reviewer/dashboard" onClick={() => setOpen(false)} className="text-sm font-bold text-forest-green/70 hover:text-forest-green">Dashboard</Link>
                <Link href="/reviewer/assignments" onClick={() => setOpen(false)} className="text-sm font-bold text-forest-green/70 hover:text-forest-green">Active Assignments</Link>
                <Link href="/reviewer/history" onClick={() => setOpen(false)} className="text-sm font-bold text-forest-green/70 hover:text-forest-green">Review History</Link>
                <Link href="/reviewer/profile" onClick={() => setOpen(false)} className="text-sm font-bold text-forest-green/70 hover:text-forest-green">Profile</Link>
              </li>
            )}

            {/* Mobile links for editors */}
            {session && session.role === 'editor' && (
              <li className="border-t border-sand/30 pt-4 mt-2 flex flex-col gap-4">
                <span className="text-[10px] font-bold tracking-widest text-ochre uppercase">Editorial Console</span>
                <Link href="/editor/dashboard" onClick={() => setOpen(false)} className="text-sm font-bold text-forest-green/70 hover:text-forest-green">Editorial Hub</Link>
                <Link href="/editor/submissions" onClick={() => setOpen(false)} className="text-sm font-bold text-forest-green/70 hover:text-forest-green">Submission Queue</Link>
                <Link href="/editor/reviewers" onClick={() => setOpen(false)} className="text-sm font-bold text-forest-green/70 hover:text-forest-green">Reviewer Directory</Link>
                <Link href="/editor/issues" onClick={() => setOpen(false)} className="text-sm font-bold text-forest-green/70 hover:text-forest-green">Issues & Volumes</Link>
                <Link href="/editor/communications" onClick={() => setOpen(false)} className="text-sm font-bold text-forest-green/70 hover:text-forest-green">Communications</Link>
                <Link href="/editor/archives" onClick={() => setOpen(false)} className="text-sm font-bold text-forest-green/70 hover:text-forest-green">Archives</Link>
                <Link href="/editor/profile" onClick={() => setOpen(false)} className="text-sm font-bold text-forest-green/70 hover:text-forest-green">Profile</Link>
              </li>
            )}
          </ul>

          <div className="mt-8 flex flex-col gap-3 border-t border-sand/30 pt-6">
            {session ? (
              <>
                <div className="flex items-center gap-3 px-2 mb-3">
                  <div className="h-9 w-9 rounded-full bg-ochre/15 text-ochre flex items-center justify-center font-bold text-sm">
                    {session.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-forest-green leading-none">{session.name}</span>
                    <span className="text-[10px] text-forest-green/40 capitalize font-bold mt-1 tracking-wider">{session.role}</span>
                  </div>
                </div>
                {session.role !== 'member' && session.role !== 'author' && session.role !== 'reviewer' && session.role !== 'editor' && (
                  <Link href={session.dashboard} onClick={() => setOpen(false)}
                    className="w-full text-center rounded-full bg-forest-green px-5 py-3 text-sm font-semibold text-ivory hover:bg-forest-green/90 transition-colors">
                    Dashboard Console
                  </Link>
                )}
                <button onClick={() => { setOpen(false); logout(); }}
                  className="w-full text-center rounded-full border border-forest-green/40 px-5 py-3 text-sm font-semibold text-forest-green hover:bg-forest-green/5 transition-colors">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)}
                  className="w-full text-center rounded-full border border-forest-green/40 px-5 py-3 text-sm font-semibold text-forest-green hover:bg-forest-green/5 transition-colors">
                  Login
                </Link>
                <Link href="/join" onClick={() => setOpen(false)}
                  className="w-full text-center rounded-full bg-ochre px-5 py-3 text-sm font-semibold text-ivory hover:bg-ochre/90 transition-colors">
                  Join VYOM
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
