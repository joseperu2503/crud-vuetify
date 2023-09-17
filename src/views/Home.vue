<template>
  <v-container>
    <v-layout>
      <v-app-bar :elevation="2" color="primary" density="compact">
        <v-app-bar-title>Crud vuetify</v-app-bar-title>
        <template v-slot:append>
          <v-btn variant="outlined" @click="login">Login</v-btn>
        </template>
      </v-app-bar>

      <v-main class="mt-8">
        <v-container class="">
          <v-row>
            <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4" lg="3">
              <v-card>
                <v-img cover height="250" :src="product.images[0]"></v-img>
                <v-card-item>
                  <v-card-title>{{ product.name }}</v-card-title>
                  <div>{{ product.description }}</div>
                  <v-card-title class="mt-4">${{ product.price }}</v-card-title>
                </v-card-item>
                <v-card-actions>
                  <v-btn variant="tonal" color="primary" prepend-icon="mdi-cart" class="mt-2">
                    Add to cart
                  </v-btn>
                  <v-btn class="mt-2">
                    Buy
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-layout>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { appApi } from '@/api/appApi'
import { Product } from '@/interfaces/product.interface'
import { useSnackbar } from '@/composables/useSnackbar';
import { useRouter } from 'vue-router';

const router = useRouter();
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

const login = () => {
  router.push('/login')
}
</script>

<style scoped></style>
