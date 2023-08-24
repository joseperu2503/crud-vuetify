<template>
  <v-snackbar v-model="showSnackbar" multi-line :color="type" timeout="-1">
    {{ message }}

    <template v-slot:actions>
      <v-btn variant="text" @click="showSnackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { useSnackbarStore } from '@/stores/snackbar';
import { storeToRefs } from 'pinia';
const snackbar = useSnackbarStore()
const { showSnackbar, message, type } = storeToRefs(snackbar)

</script>

<style scoped></style>
