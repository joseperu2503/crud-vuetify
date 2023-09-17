<template>
  <v-btn @click="toggleTheme" :icon="theme.global.current.value.dark ? 'mdi-weather-night' : 'mdi-weather-sunny'"></v-btn>
</template>

<script setup lang="ts">
import { useAppTheme } from '@/composables/useAppTheme'

const { toggleTheme, theme } = useAppTheme()

</script>
