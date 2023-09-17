import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/composables/useAuth';

const routes = [

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
    component: () => import('@/layouts/AppLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: '',
        meta: {
          requiresAuth: true,
        },
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
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from) => {
  const { verifyAuth } = useAuth()
  const isValid = verifyAuth()

  if (to.meta?.requiresAuth) {
    if (!isValid) {
      router.push('/login');
    }
    return true;
  }

  if (to.meta?.redirect) {
    if (isValid) {
      router.push('/my-products');
    }
    return true;
  }

  return true;
});

export default router
