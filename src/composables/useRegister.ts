
import { appApi } from '@/api/appApi'
import { ref } from "vue";
import { useLogin } from '@/composables/useLogin';
import { RegisterErrors, RegisterForm, initRegisterForm } from '@/interfaces/register.interface';

export function useRegister() {

  const errors = ref<RegisterErrors>({});
  const loading = ref(false);
  const showPassword = ref(false);

  const { loginForm, login } = useLogin()

  const registerForm = ref<RegisterForm>({ ...initRegisterForm });

  const register = async () => {
    loading.value = true
    try {
      await appApi.post("/register", registerForm.value)
      loginForm.value = {
        email: registerForm.value.email,
        password: registerForm.value.password
      }
      login()
    } catch (error: any) {
      if (error.response?.status === 422) {
        errors.value = error.response.data.errors;
      }
    }
    loading.value = false
  }

  return {
    register,
    errors,
    loading,
    registerForm,
    showPassword
  }
}
