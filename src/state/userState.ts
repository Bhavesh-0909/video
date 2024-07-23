import {create} from 'zustand';
import {User} from "@/types/User"

interface UserStateSchema{
    user: User | null;
    setUser: (user:User) => void;
    clearUser: () => void
}

export const useUserStore = create<UserStateSchema>((set) =>({
  user: null,
  setUser: (user:User) => set({ user }),
  clearUser: () => set({ user: null }),
}));
