<template>
  <v-card title="Products" :loading="loading">
    <v-card-text>
      <v-btn prepend-icon="$plus" color="primary" @click="newProduct" class="mt-4">
        New
      </v-btn>

      <v-table class="mt-10">
        <thead>
          <tr>
            <th class="text-left">ID</th>
            <th class="text-left" style="min-width: 200px">Name</th>
            <th class="text-left">Price</th>
            <th class="text-left">Stock</th>
            <th class="text-left" style="min-width: 110px">Date</th>
            <th class="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.id }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.stock }}</td>
            <td>{{ product.created_at }}</td>
            <td>
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn v-bind="props" icon="mdi-dots-vertical" size="small"></v-btn>
                </template>
                <v-list>
                  <v-list-item :value="0" @click="editProduct(product.id)" title="Edit" append-icon="mdi-pencil" />
                  <v-list-item :value="0" @click="deleteProduct(product.id)" title="Delete" append-icon="mdi-delete" />
                </v-list>
              </v-menu>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { appApi } from '@/api/appApi'
import { Product } from '@/interfaces/product.interface'
import { useSnackbar } from '@/composables/useSnackbar';
import { useRouter } from 'vue-router';

const router = useRouter()

const products = ref<Product[]>([])

const showModal = ref(false)
const loading = ref(false)
const productId = ref<number | null>(null)

const newProduct = () => {
  router.push('/create-product')
}

const getProducts = async () => {
  loading.value = true
  try {
    let response = await appApi.get("/products")
    products.value = response.data
  } catch (error) {
    openSnackbar('An error occurred while loading the products.', 'error')
  }
  loading.value = false
}

const editProduct = (id: number) => {
  router.push(`/product/${id}`)
}

const { openSnackbar } = useSnackbar()

const deleteProduct = async (id: number) => {
  try {
    let response = await appApi.delete(`/products/${id}`)
    openSnackbar(response.data.message, 'success')
    getProducts()
  } catch (error: any) {
    openSnackbar('An error occurred. Please try again.', 'error')
  }
}

getProducts()
</script>