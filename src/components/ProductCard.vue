<template>
  <v-card>
    <v-img :contain="product.images[0]" height="250" :src="product.images[0]" v-if="product.images[0]">
      <template v-slot:error>
        <v-img cover height="250" src="/no-image.jpg"></v-img>
      </template>
      <template v-slot:placeholder>
        <div class="d-flex align-center justify-center fill-height">
          <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
        </div>
      </template>
    </v-img>
    <v-img cover height="250" src="/no-image.jpg" v-else></v-img>
    <v-card-item>
      <v-card-title>{{ product.name }}</v-card-title>
      <div class="description">{{ product.description }}</div>
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
<style scoped>
.description {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
