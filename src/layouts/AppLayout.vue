<template>
  <v-container>
    <v-layout>
      <v-app-bar :elevation="2" color="primary" density="compact">
        <v-app-bar-nav-icon variant="text" @click.stop="showDrawer = !showDrawer"></v-app-bar-nav-icon>
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
      <v-navigation-drawer v-model="showDrawer" temporary>
        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-store" title="My products" to="my-products"></v-list-item>
          <v-list-item prepend-icon="mdi-plus" title="Create Product" to="create-product"></v-list-item>
        </v-list>
        <template v-slot:append>
          <div class="pa-2">
            <v-btn block @click="logout" color="primary" append-icon="mdi-logout">
              Logout
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
      <v-main class="mt-8">
        <router-view></router-view>
      </v-main>
    </v-layout>
  </v-container>
</template>

<script setup lang="ts">
import { useLogout } from '@/composables/useLogout'
import ToogleTheme from '@/components/ToogleTheme.vue';
import { ref } from 'vue'
const { logout } = useLogout()


const showDrawer = ref(false);
</script>
