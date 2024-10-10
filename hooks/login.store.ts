import {create} from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface LoginState {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const useLoginStore = create<LoginState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false }),
    }),
    {
      name: 'login-storage', // Nombre del almacenamiento en localStorage
      storage: createJSONStorage(() => sessionStorage),  // Puedes cambiar a sessionStorage si prefieres
    }
  )
);

export default useLoginStore;
