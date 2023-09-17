import { ref } from "vue";
import { defineStore } from "pinia";

export type SnackbarType = 'info' | 'success' | 'error'
export const useSnackbarStore = defineStore("snackbar", () => {

  const showSnackbar = ref<boolean>(false);
  const type = ref<SnackbarType>('info')
  const message = ref<string>('');
  const timeout = ref<NodeJS.Timeout | null>(null)

  return { showSnackbar, type, message, timeout };
});
