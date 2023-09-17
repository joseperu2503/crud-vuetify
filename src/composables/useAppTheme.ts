import { useTheme } from 'vuetify'


export function useAppTheme() {
  const theme = useTheme()
  const toggleTheme = () => {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
    localStorage.setItem('theme', theme.global.name.value)
  }

  const getTheme = () => {
    const themeStorage = localStorage.getItem('theme')
    theme.global.name.value = themeStorage ?? 'light'
  }

  return {
    theme,
    toggleTheme,
    getTheme
  }
}
