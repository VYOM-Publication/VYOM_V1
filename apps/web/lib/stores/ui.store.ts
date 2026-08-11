import { create } from 'zustand';

interface UIState {
  sidebarOpen: boolean;
  mobileDrawerOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  setMobileDrawerOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  toggleMobileDrawer: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  mobileDrawerOpen: false,

  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setMobileDrawerOpen: (open) => set({ mobileDrawerOpen: open }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  toggleMobileDrawer: () => set((s) => ({ mobileDrawerOpen: !s.mobileDrawerOpen })),
}));
