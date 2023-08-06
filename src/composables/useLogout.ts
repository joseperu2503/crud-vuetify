
import { useToken } from '@/composables/useToken'
import { useRouter } from 'vue-router';

export function useLogout() {
  const tokenService = useToken()
  const router = useRouter();

  const logout = () => {
    tokenService.removeToken()
    router.push('login')
  }

  return {
    logout,
  }
}
