<template>
  <router-view />
  <Snackbar />
</template>

<script lang="ts" setup>
import Snackbar from '@/components/Snackbar.vue';
import { useAppTheme } from './composables/useAppTheme';

const { getTheme } = useAppTheme()
getTheme()
</script>
