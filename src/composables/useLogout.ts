
import { useToken } from '@/composables/useToken'
import { useRouter } from 'vue-router';
import { useAuth } from './useAuth';

export function useLogout() {
  const { removeToken } = useToken()
  const router = useRouter();
  const { verifyAuth } = useAuth()

  const logout = () => {
    removeToken()
    verifyAuth()
    router.push('/')
  }

  return {
    logout,
  }
}
