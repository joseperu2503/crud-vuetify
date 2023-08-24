
import { useSnackbarStore, SnackbarType } from '@/stores/snackbar';

export function useSnackbar() {
  const snackbar = useSnackbarStore()

  const openSnackbar = (message: string, type: SnackbarType = 'info', timeout = 4000) => {
    snackbar.showSnackbar = false
    snackbar.type = type
    snackbar.message = message
    snackbar.showSnackbar = true

    if (snackbar.timeout) {
      clearTimeout(snackbar.timeout)
    }
    snackbar.timeout = setTimeout(() => {
      snackbar.showSnackbar = false
    }, timeout)
  }
  return {
    openSnackbar
  }
}
