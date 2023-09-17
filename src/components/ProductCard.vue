<template>
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
</template>

<script setup lang="ts">
import { Product } from '@/interfaces/product.interface';
defineProps<{ product: Product }>()
</script>
