<template>
  <v-container>
    <v-row>
      <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4" lg="3">
        <ProductCard :product="product" />
      </v-col>
    </v-row>
    <v-btn class="v-btn--floating-action" fab dark color="primary" rounded icon="mdi-plus" size="large"
      @click="newProduct">
    </v-btn>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue';
import { appApi } from '@/api/appApi'
import { Product } from '@/interfaces/product.interface'
import { useSnackbar } from '@/composables/useSnackbar';
import ProductCard from '@/components/ProductCard.vue';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { ResponsePaginate } from '@/interfaces/responsePaginate.interface';

const loading = ref(false)
const { openSnackbar } = useSnackbar()
const products = ref<Product[]>([])
const page = ref<number>(1)
const loadMore = ref<boolean>(true)
const getProducts = async () => {
  loading.value = true
  try {
    const response = await appApi.get<ResponsePaginate<Product>>("/products", {
      params: {
        page: page.value
      }
    })
    const productsResponse = response.data
    if (page.value < productsResponse.meta.last_page) {
      page.value++
      loadMore.value = true
    } else {
      loadMore.value = false
    }
    products.value.push(...productsResponse.data)
  } catch (error) {
    openSnackbar('An error occurred while loading the products.', 'error')
  }
  loading.value = false
}

getProducts()

const router = useRouter();
const authStore = useAuthStore()
const { user } = storeToRefs(authStore);

const newProduct = () => {
  if (user) {
    router.push('/create-product')
  } else {
    router.push('/login')

  }
}
function handleScroll() {
  const pageHeight = document.documentElement.scrollHeight;
  const windowHeight = window.innerHeight;
  const scrollPosition = window.scrollY;
  const distanceFromBottom = 300;
  const triggerPosition = pageHeight - windowHeight - distanceFromBottom;
  if (scrollPosition >= triggerPosition && !loading.value && loadMore.value) {
    getProducts()
  }
}

window.addEventListener('scroll', handleScroll);

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
})
</script>
<style scoped>
.v-btn--floating-action {
  position: fixed;
  bottom: 16px;
  right: 16px;
}
</style>
