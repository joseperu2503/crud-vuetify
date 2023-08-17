<template>
  <v-container>
    <v-layout>
      <v-app-bar :elevation="2" color="primary" density="compact">
        <v-app-bar-title>Dashboard</v-app-bar-title>
        <template v-slot:append>
          <ToogleTheme />
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" icon="mdi-account"></v-btn>
            </template>
            <v-list>
              <v-list-item :value="0" @click="logout">
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-app-bar>
      <v-main class="mt-8">
        <v-card title="Products" :loading="loading">
          <v-card-text>
            <v-btn prepend-icon="$plus" color="primary" @click="newProduct" class="mt-4">
              New
            </v-btn>

            <v-table class="mt-10">
              <thead>
                <tr>
                  <th class="text-left">
                    ID
                  </th>
                  <th class="text-left">
                    Name
                  </th>
                  <th class="text-left">
                    Price
                  </th>
                  <th class="text-left">
                    Stock
                  </th>
                  <th class="text-left">
                    Date
                  </th>
                  <th class="text-left">
                    Actions
                  </th>
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
                        <v-list-item :value="0" @click="deleteProduct(product.id)" title="Delete"
                          append-icon="mdi-delete" />
                      </v-list>
                    </v-menu>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-main>
    </v-layout>
    <ProductForm v-model:showModal="showModal" :productId="productId" @reloadData="getProducts" />
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { http } from '@/http/http.service'
import ProductForm from '@/components/ProductForm.vue'
import { useLogout } from '@/composables/useLogout'
import { Product } from '@/interfaces/product.interface'
import ToogleTheme from '@/components/ToogleTheme.vue';

const { logout } = useLogout()

const products = ref<Product[]>([])

const showModal = ref(false)
const loading = ref(false)
const productId = ref<number | null>(null)

const newProduct = () => {
  productId.value = null
  showModal.value = true
}

const getProducts = async () => {
  loading.value = true
  try {
    let response = await http.get("/products")
    products.value = response.data
  } catch (error) {
    console.log(error)
  }
  loading.value = false
}

const editProduct = (id: number) => {
  productId.value = id
  showModal.value = true
}

const deleteProduct = (id: number) => {
  http.delete(`/products/${id}`)
    .then(response => {
      getProducts()
    })
    .catch((error) => {
      console.log(error)
    });
}

getProducts()
</script>
