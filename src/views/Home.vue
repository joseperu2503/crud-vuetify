<template>
  <v-container>
    <v-row>
      <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4" lg="3">
        <ProductCard :product="product" />
      </v-col>
    </v-row>
    <v-row justify="center" class="mt-8" v-if="loading">
      <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
    </v-row>
    <v-btn class="v-btn--floating-action" fab dark color="primary" rounded icon="mdi-plus" size="large"
      @click="newProduct">
    </v-btn>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue';
import { Product } from '@/interfaces/product.interface'
import { useSnackbar } from '@/composables/useSnackbar';
import ProductCard from '@/components/ProductCard.vue';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useProduct } from '@/composables/useProduct';

const loading = ref(false)
const { openSnackbar } = useSnackbar()
const products = ref<Product[]>([])
const $useProduct = useProduct()
const pagination = ref({
  currentPage: 1,
  totalPages: 1,
})
const getProducts = async () => {
  if (pagination.value.currentPage > pagination.value.totalPages || loading.value) return;

  loading.value = true
  try {
    const productsResponse = await $useProduct.getProducts(pagination.value.currentPage)
    pagination.value.currentPage = pagination.value.currentPage + 1
    pagination.value.totalPages = productsResponse.meta.last_page
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
  if (scrollPosition >= triggerPosition) {
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
