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
    component: () => import('@/layouts/AppLayout.vue'),
    children: [
      {
        path: '/my-products',
        component: () => import('@/views/MyProducts.vue'),
      },
      {
        path: '/create-product',
        component: () => import('@/views/ProductForm.vue'),
      },
      {
        path: '/product/:productId',
        component: () => import('@/views/ProductForm.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from) => {
  const { removeToken, validToken } = useToken()

  if (to.meta?.requiresAuth) {
    if (!validToken()) {
      removeToken()
      router.push('/login');
    }
    return true;
  }

  if (to.meta?.redirect) {
    if (validToken()) {
      router.push('/dashboard');
    }
    return true;
  }

  return true;
});

export default router
