<template>
  <v-btn @click="toggleTheme" :icon="theme.global.current.value.dark ? 'mdi-weather-night' : 'mdi-weather-sunny'"></v-btn>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'

const theme = useTheme()

const toggleTheme = () => theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
</script>
