import { create } from 'zustand';
import * as authService from '@/features/auth/services/authService';

interface AuthState {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  login: async (email, password) => {
    const response = await authService.login(email, password);
    if (response) {
      set({ isAuthenticated: true });
    }
  },
  register: async (email, password) => {
    const response = await authService.register(email, password);
    if (response) {
      set({ isAuthenticated: true });
    }
  },
  logout: () => {
    authService.logout();
    set({ isAuthenticated: false });
  },
}));
