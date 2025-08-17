import { create } from 'zustand'

export const authStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || '',
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
}))
