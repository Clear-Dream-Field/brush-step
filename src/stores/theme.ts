import { defineStore } from 'pinia'

interface ThemeState {
  theme: 'light' | 'dark'
}

export const useThemeStore = defineStore({
  id: 'theme',
  state: (): ThemeState => ({
    theme: (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
  }),
  
  getters: {
    isDark: (state) => state.theme === 'dark'
  },
  
  actions: {
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', this.theme)
      document.documentElement.setAttribute('data-theme', this.theme)
    }
  },
  persist: true
}) 