export const queryKeys = {
  auth: { me: ['auth', 'me'] as const },

  articles: {
    all:      (params?: object) => ['articles', params] as const,
    trending: () => ['articles', 'trending'] as const,
    latest:   () => ['articles', 'latest'] as const,
    detail:   (id: string) => ['articles', id] as const,
  },

  books: {
    all:      (params?: object) => ['books', params] as const,
    featured: () => ['books', 'featured'] as const,
    recent:   () => ['books', 'recent'] as const,
    detail:   (id: string) => ['books', id] as const,
  },

  submissions: {
    mine:   () => ['submissions', 'mine'] as const,
    queue:  (params?: object) => ['submissions', 'queue', params] as const,
    detail: (id: string) => ['submissions', id] as const,
  },

  reviews: {
    assigned: () => ['reviews', 'assigned'] as const,
    history:  () => ['reviews', 'history'] as const,
    detail:   (id: string) => ['reviews', id] as const,
  },

  users: {
    all:    (params?: object) => ['users', params] as const,
    detail: (id: string) => ['users', id] as const,
  },

  editorial: {
    members: () => ['editorial', 'members'] as const,
    preview: () => ['editorial', 'preview'] as const,
  },

  notifications: {
    mine:        () => ['notifications'] as const,
    unreadCount: () => ['notifications', 'unread-count'] as const,
  },

  profile: {
    reading:   () => ['profile', 'reading-history'] as const,
    bookmarks: () => ['profile', 'bookmarks'] as const,
    downloads: () => ['profile', 'downloads'] as const,
  },

  announcements: {
    all: (params?: object) => ['announcements', params] as const,
  },
};
