
import { http } from '@/http/http.service'
import { useToken } from '@/composables/useToken'
import { useRouter } from 'vue-router';
import { ref } from "vue";
import { LoginError, LoginForm } from '@/interfaces/login.interface';

export function useLogin() {
  const tokenService = useToken()
  const router = useRouter();

  const errors = ref<LoginError>({});

  const loading = ref(false);
  const showPassword = ref(false);

  const loginForm = ref<LoginForm>({
    email: "",
    password: "",
  });

  const remember = ref(true);

  const login = async () => {
    loading.value = true
    try {
      let response = await http.post("/login", loginForm.value)
      tokenService.saveToken(response.data.access_token)
      router.push({ name: "dashboard" });
    } catch (error: any) {
      if (error.response.status === 422) {
        errors.value = error.response.data.errors;
      }
    }
    loading.value = false
  }

  return {
    login,
    errors,
    loading,
    loginForm,
    remember,
    showPassword
  }
}
