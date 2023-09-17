<template>
  <v-container>
    <v-layout>
      <v-app-bar :elevation="2" color="primary" density="compact">
        <v-app-bar-nav-icon variant="text" @click.stop="showDrawer = !showDrawer" v-if="user"></v-app-bar-nav-icon>
        <v-app-bar-title>Crud Vuetify</v-app-bar-title>
        <template v-slot:append>
          <ToogleTheme />
          <v-menu v-if="user">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" icon="mdi-account"></v-btn>
            </template>
            <v-list>
              <v-list-item prepend-avatar="https://cdn.vuetifyjs.com/images/john.png" :title="user.name"
                :subtitle="user.email" class="mb-4">
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item :value="0">
                <v-list-item-title>Profile</v-list-item-title>
                <template v-slot:prepend>
                  <v-icon icon="md:person"></v-icon>
                </template>
              </v-list-item>
              <v-list-item :value="1">
                <v-list-item-title>Settings</v-list-item-title>
                <template v-slot:prepend>
                  <v-icon icon="md:settings"></v-icon>
                </template>
              </v-list-item>
              <v-list-item :value="2" @click="logout">
                <v-list-item-title>Logout</v-list-item-title>
                <template v-slot:prepend>
                  <v-icon icon="md:logout"></v-icon>
                </template>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn variant="outlined" @click="login" v-else>Login</v-btn>

        </template>
      </v-app-bar>
      <v-navigation-drawer v-model="showDrawer" temporary>
        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-home" title="Home" to="/" exact></v-list-item>
          <v-list-item prepend-icon="mdi-store" title="My products" to="/my-products" exact></v-list-item>
          <v-list-item prepend-icon="mdi-plus" title="Create Product" to="/create-product" exact></v-list-item>
          <v-list-item prepend-icon="md:sell" title="Brands"></v-list-item>
          <v-list-item prepend-icon="md:category" title="Categories"></v-list-item>
        </v-list>
        <template v-slot:append>
          <div class="pa-2 pb-8">
            <v-btn block @click="logout" color="primary" append-icon="md:logout">
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
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
const { logout } = useLogout()

const showDrawer = ref(false);

const authStore = useAuthStore()
const { user } = storeToRefs(authStore);

const router = useRouter();
const login = () => {
  router.push('/login')
}
</script>
