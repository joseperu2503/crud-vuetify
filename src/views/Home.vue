<template>
  <v-container>
    <v-row>
      <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4" lg="3">
        <ProductCard :product="product" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { appApi } from '@/api/appApi'
import { Product } from '@/interfaces/product.interface'
import { useSnackbar } from '@/composables/useSnackbar';
import ProductCard from '@/components/ProductCard.vue';

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
</script>
