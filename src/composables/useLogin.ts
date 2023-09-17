
import { appApi } from '@/api/appApi'
import { useToken } from '@/composables/useToken'
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { LoginErrors, LoginForm } from '@/interfaces/login.interface';
import { initRegisterForm } from '@/interfaces/register.interface';
import { useSnackbar } from '@/composables/useSnackbar';

export function useLogin() {
  const { saveToken } = useToken()
  const { openSnackbar } = useSnackbar()

  const router = useRouter();

  const loginErrors = ref<LoginErrors>({});

  const loading = ref(false);
  const showPassword = ref(false);

  const loginForm = ref<LoginForm>({ ...initRegisterForm });

  const remember = ref(false);

  const login = async () => {
    loading.value = true
    try {
      const response = await appApi.post("/login", loginForm.value)
      saveToken(response.data.access_token)
      setRemember()
      router.replace('/my-products');
    } catch (error: any) {
      if (error.response?.status === 422) {
        loginErrors.value = error.response.data.errors;
      }
      if (error.response?.status === 401) {
        openSnackbar('Invalid credentials. Please check your username and password.', 'error')
      }
    }
    loading.value = false
  }

  const getRemember = () => {
    const rememberStorage = localStorage.getItem('remember')

    if (rememberStorage && JSON.parse(rememberStorage).remember) {
      loginForm.value.email = JSON.parse(rememberStorage).email
      remember.value = true
    }
  }

  const setRemember = () => {
    if (remember.value) {
      localStorage.setItem('remember', JSON.stringify({ remember: true, email: loginForm.value.email }))
    } else {
      localStorage.removeItem('remember')
    }
  }

  getRemember();

  return {
    login,
    loginErrors,
    loading,
    loginForm,
    remember,
    showPassword,
  }
}
