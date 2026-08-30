import { create } from 'zustand';
import { DEMO_REVIEWERS_POOL } from '../demo-data';

export interface ReviewerProfile {
  id: string;
  name: string;
  initials: string;
  institution: string;
  expertise: string[];
  hIndex: number;
  active: number;
  available: boolean;
  assignedManuscriptIds: string[];
}

interface ReviewersState {
  reviewers: ReviewerProfile[];
  assignReviewerToManuscript: (reviewerName: string, manuscriptId: string) => void;
  unassignReviewerFromManuscript: (reviewerName: string, manuscriptId: string) => void;
}

const STORAGE_KEY = 'vyom_user_reviewers';

function loadInitialReviewers(): ReviewerProfile[] {
  if (typeof window === 'undefined') {
    return DEMO_REVIEWERS_POOL.map((r, i) => ({
      ...r,
      id: `rev_${i + 1}`,
      assignedManuscriptIds: [],
    }));
  }
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load reviewers from localStorage', e);
  }
  return DEMO_REVIEWERS_POOL.map((r, i) => ({
    ...r,
    id: `rev_${i + 1}`,
    assignedManuscriptIds: [],
  }));
}

export const useReviewersStore = create<ReviewersState>((set, get) => ({
  reviewers: loadInitialReviewers(),

  assignReviewerToManuscript: (reviewerName, manuscriptId) => {
    const updated = get().reviewers.map(rev => {
      if (rev.name === reviewerName) {
        const assigned = rev.assignedManuscriptIds || [];
        if (!assigned.includes(manuscriptId)) {
          const nextAssigned = [...assigned, manuscriptId];
          return {
            ...rev,
            assignedManuscriptIds: nextAssigned,
            active: nextAssigned.length,
          };
        }
      }
      return rev;
    });

    set({ reviewers: updated });
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to persist reviewers to localStorage', e);
      }
    }
  },

  unassignReviewerFromManuscript: (reviewerName, manuscriptId) => {
    const updated = get().reviewers.map(rev => {
      if (rev.name === reviewerName) {
        const nextAssigned = (rev.assignedManuscriptIds || []).filter(id => id !== manuscriptId);
        return {
          ...rev,
          assignedManuscriptIds: nextAssigned,
          active: nextAssigned.length,
        };
      }
      return rev;
    });

    set({ reviewers: updated });
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to persist reviewers to localStorage', e);
      }
    }
  },
}));
