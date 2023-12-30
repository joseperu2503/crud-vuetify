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
            <th class="text-left">Discount</th>
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
            <td>{{ product.discount ? product.discount + '%' : '-' }}</td>
            <td>{{ moment(product.created_at).format('YYYY-MM-DD HH:mm:ss') }}</td>
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
      <v-pagination :length="pagination.totalPages" v-model="pagination.currentPage"
        @update:model-value="getMyProducts"></v-pagination>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Product } from '@/interfaces/product.interface'
import { useSnackbar } from '@/composables/useSnackbar';
import { useRouter } from 'vue-router';
import { useProduct } from '@/composables/useProduct';
import moment from 'moment';

const $useProduct = useProduct()
const router = useRouter()
const products = ref<Product[]>([])
const loading = ref(false)
const pagination = ref({
  currentPage: 1,
  totalPages: 1
})

const newProduct = () => {
  router.push('/create-product')
}

const getMyProducts = async () => {
  loading.value = true
  try {
    const myProductsResponse = await $useProduct.getMyProducts(pagination.value.currentPage)
    products.value = myProductsResponse.data
    pagination.value = {
      currentPage: myProductsResponse.meta.current_page,
      totalPages: myProductsResponse.meta.last_page
    }
  } catch (error) {
    openSnackbar('An error occurred while loading the products.', 'error')
  }
  loading.value = false
}

const editProduct = (productId: number) => {
  router.push(`/product/${productId}`)
}

const { openSnackbar } = useSnackbar()

const deleteProduct = async (productId: number) => {
  loading.value = true
  try {
    let response = await $useProduct.deleteProduct(productId)
    openSnackbar(response.message, 'success')
    getMyProducts()
  } catch (error: any) {
    loading.value = false
    openSnackbar('An error occurred. Please try again.', 'error')
  }
}

getMyProducts()
</script>
