import { create } from 'zustand';

export interface EditorProfile {
  id: string;
  name: string;
  role: 'Editor-in-Chief' | 'Associate Editor' | 'Managing Editor' | 'Sub-Editor';
  institution: string;
  email: string;
  specialization: string[];
  activeAssignedCount: number;
  completedCount: number;
  avatarUrl?: string;
  bio?: string;
  joinedDate: string;
}

const INITIAL_EDITORS: EditorProfile[] = [
  {
    id: 'ed_1',
    name: 'Prof. Shital R Kalekar',
    role: 'Editor-in-Chief',
    institution: 'D.Y. Patil University, School of Pharmacy',
    email: 'shital.kalekar@dypatil.edu',
    specialization: ['Pharmaceutical Chemistry', 'Drug Delivery Systems', 'Pharmacognosy'],
    activeAssignedCount: 3,
    completedCount: 42,
    joinedDate: '2024-01-15',
    bio: 'Leading researcher in pharmaceutical sciences with over 15 years of editorial experience across international peer-reviewed journals.',
  },
  {
    id: 'ed_2',
    name: 'Poonam U Nalawade',
    role: 'Editor-in-Chief',
    institution: 'Herbal Science & Delivery Innovation',
    email: 'poonam.nalawade@vyompublication.com',
    specialization: ['Herbal Drug Technology', 'Phytochemistry', 'Natural Products'],
    activeAssignedCount: 2,
    completedCount: 38,
    joinedDate: '2024-02-01',
    bio: 'Pioneer in herbal science research, overseeing publication ethics and peer-review integrity for natural science monographs.',
  },
  {
    id: 'ed_3',
    name: 'Dr. Vimla Choudhary',
    role: 'Associate Editor',
    institution: 'PhD Biotechnology',
    email: 'vimla.choudhary@vyompublication.com',
    specialization: ['Biotechnology', 'Molecular Biology', 'Genetics'],
    activeAssignedCount: 1,
    completedCount: 24,
    joinedDate: '2024-03-10',
    bio: 'Specialist in molecular biotechnology, handling peer reviews for bio-innovation research papers.',
  },
  {
    id: 'ed_4',
    name: 'Prof. Ganesh More',
    role: 'Associate Editor',
    institution: 'D.Y. Patil University, School of Pharmacy',
    email: 'ganesh.more@dypatil.edu',
    specialization: ['Pharmacology', 'Clinical Pharmacy', 'Toxicology'],
    activeAssignedCount: 2,
    completedCount: 29,
    joinedDate: '2024-04-05',
    bio: 'Associate Professor of Pharmacology, managing review workflows for clinical and pharmacological submissions.',
  },
];

interface EditorsState {
  editors: EditorProfile[];
  addEditor: (editorData: Omit<EditorProfile, 'id' | 'activeAssignedCount' | 'completedCount' | 'joinedDate'>) => EditorProfile;
}

const STORAGE_KEY = 'vyom_user_editors';

function loadInitialEditors(): EditorProfile[] {
  if (typeof window === 'undefined') return INITIAL_EDITORS;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load editors from localStorage', e);
  }
  return INITIAL_EDITORS;
}

export const useEditorsStore = create<EditorsState>((set, get) => ({
  editors: loadInitialEditors(),

  addEditor: (data) => {
    const newId = `ed_${Date.now()}`;
    const newEditor: EditorProfile = {
      ...data,
      id: newId,
      activeAssignedCount: 0,
      completedCount: 0,
      joinedDate: new Date().toISOString().split('T')[0],
    };

    const updated = [newEditor, ...get().editors];
    set({ editors: updated });

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to persist editors to localStorage', e);
      }
    }

    return newEditor;
  },
}));
