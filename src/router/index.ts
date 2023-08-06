import { createRouter, createWebHistory } from 'vue-router'
import { useToken } from '@/composables/useToken'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '',
    meta: {
      redirect: true,
    },
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue'),

      },
      {
        path: '/register',
        name: 'register',
        component: () => import('@/views/Register.vue'),
        props: true,
      },
    ]
  },
  {
    path: '',
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/Dashboard.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from) => {
  const { removeToken, isValidToken } = useToken()

  if (to.meta?.requiresAuth) {
    if (!isValidToken()) {
      removeToken()
      router.push('/login');
    }
    return true;
  }

  if (to.meta?.redirect) {
    if (isValidToken()) {
      router.push('/dashboard');
    }
    return true;
  }

  return true;
});

export default router
