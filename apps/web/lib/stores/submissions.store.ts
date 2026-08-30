import { create } from 'zustand';
import { DEMO_SUBMISSIONS } from '../demo-data';

export interface ManuscriptSubmission {
  id: string;
  title: string;
  abstract: string;
  keywords: string[];
  author: string;
  authorEmail: string;
  affiliation: string;
  journal: string;
  articleType?: string;
  status: 'SUBMITTED_TO_ADMIN' | 'ASSIGNED_TO_EDITOR' | 'UNDER REVIEW' | 'REVISION' | 'ACCEPTED' | 'PENDING_FINAL_ADMIN_APPROVAL' | 'PUBLISHED' | 'REJECTED';
  submittedDate: string;
  daysInPipeline: number;
  currentVersion: number;
  paymentStatus: 'pending' | 'paid' | 'waived';
  reviewerCount: number;
  assignedEditorName?: string;
  doi?: string;
  revisionDeadline?: string;
  revisionComments?: string;
  manuscriptFile?: string;
  coverImage?: string;
  assignedReviewers?: string[];
}

interface SubmissionsState {
  submissions: ManuscriptSubmission[];
  addSubmission: (submission: Omit<ManuscriptSubmission, 'id' | 'submittedDate' | 'daysInPipeline' | 'currentVersion' | 'paymentStatus' | 'reviewerCount' | 'status'>) => ManuscriptSubmission;
  adminAssignEditor: (id: string, editorName: string) => void;
  editorUpdateStatus: (id: string, status: ManuscriptSubmission['status'], comments?: string) => void;
  editorPushToPublish: (id: string) => void;
  adminFinalPublish: (id: string, doi?: string) => void;
  assignReviewer: (id: string, reviewerName: string) => void;
}

const STORAGE_KEY = 'vyom_user_submissions';

function loadInitialSubmissions(): ManuscriptSubmission[] {
  if (typeof window === 'undefined') {
    return DEMO_SUBMISSIONS.map((s, idx) => ({
      ...s,
      status: (idx === 0 ? 'SUBMITTED_TO_ADMIN' : idx === 1 ? 'UNDER REVIEW' : 'ASSIGNED_TO_EDITOR') as ManuscriptSubmission['status'],
      assignedEditorName: idx > 0 ? 'Prof. Shital R Kalekar' : undefined,
    })) as ManuscriptSubmission[];
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
    console.error('Failed to load submissions from localStorage', e);
  }
  return DEMO_SUBMISSIONS.map((s, idx) => ({
    ...s,
    status: (idx === 0 ? 'SUBMITTED_TO_ADMIN' : idx === 1 ? 'UNDER REVIEW' : 'ASSIGNED_TO_EDITOR') as ManuscriptSubmission['status'],
    assignedEditorName: idx > 0 ? 'Prof. Shital R Kalekar' : undefined,
  })) as ManuscriptSubmission[];
}

export const useSubmissionsStore = create<SubmissionsState>((set, get) => ({
  submissions: loadInitialSubmissions(),

  addSubmission: (newSubData) => {
    const id = `MS-2026-${String(Math.floor(1000 + Math.random() * 9000))}`;
    const newSubmission: ManuscriptSubmission = {
      ...newSubData,
      id,
      status: 'SUBMITTED_TO_ADMIN', // 1. Author submits direct to ADMIN
      submittedDate: new Date().toISOString().split('T')[0],
      daysInPipeline: 1,
      currentVersion: 1,
      paymentStatus: 'pending',
      reviewerCount: 0,
      assignedEditorName: undefined, // Unassigned until Admin picks Editor
      assignedReviewers: [],
    };

    const updated = [newSubmission, ...get().submissions];
    set({ submissions: updated });

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save submission to localStorage', e);
      }
    }

    return newSubmission;
  },

  // 2. Admin assigns Editor to paper
  adminAssignEditor: (id, editorName) => {
    const updated = get().submissions.map(sub => {
      if (sub.id === id) {
        return {
          ...sub,
          assignedEditorName: editorName,
          status: 'ASSIGNED_TO_EDITOR' as const,
        };
      }
      return sub;
    });

    set({ submissions: updated });
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to assign editor in localStorage', e);
      }
    }
  },

  // 3. Editor updates status or requests revisions
  editorUpdateStatus: (id, status, revisionComments) => {
    const updated = get().submissions.map(sub => {
      if (sub.id === id) {
        return {
          ...sub,
          status,
          ...(revisionComments ? { revisionComments } : {}),
        };
      }
      return sub;
    });

    set({ submissions: updated });
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to update status in localStorage', e);
      }
    }
  },

  // 4. Editor pushes paper for Final Admin Approval
  editorPushToPublish: (id) => {
    const updated = get().submissions.map(sub => {
      if (sub.id === id) {
        return {
          ...sub,
          status: 'PENDING_FINAL_ADMIN_APPROVAL' as const,
        };
      }
      return sub;
    });

    set({ submissions: updated });
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to push to publish in localStorage', e);
      }
    }
  },

  // 5. Admin gives final approval & publishes
  adminFinalPublish: (id, doi) => {
    const updated = get().submissions.map(sub => {
      if (sub.id === id) {
        return {
          ...sub,
          status: 'PUBLISHED' as const,
          doi: doi || `10.vyom/pub.${sub.id.toLowerCase()}`,
        };
      }
      return sub;
    });

    set({ submissions: updated });
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to final publish in localStorage', e);
      }
    }
  },

  assignReviewer: (id, reviewerName) => {
    const updated = get().submissions.map(sub => {
      if (sub.id === id) {
        const reviewers = sub.assignedReviewers || [];
        if (!reviewers.includes(reviewerName)) {
          const nextReviewers = [...reviewers, reviewerName];
          return {
            ...sub,
            assignedReviewers: nextReviewers,
            reviewerCount: nextReviewers.length,
            status: 'UNDER REVIEW' as const,
          };
        }
      }
      return sub;
    });

    set({ submissions: updated });
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to assign reviewer in localStorage', e);
      }
    }
  },
}));
