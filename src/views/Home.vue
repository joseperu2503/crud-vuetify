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
import { ref } from 'vue';
import { appApi } from '@/api/appApi'
import { Product } from '@/interfaces/product.interface'
import { useSnackbar } from '@/composables/useSnackbar';
import ProductCard from '@/components/ProductCard.vue';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const loading = ref(false)
const { openSnackbar } = useSnackbar()
const products = ref<Product[]>([])

const getProducts = async () => {
  loading.value = true
  try {
    let response = await appApi.get("/products")
    products.value = response.data.data
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

</script>
<style scoped>
.v-btn--floating-action {
  position: fixed;
  bottom: 16px;
  right: 16px;
}
</style>
