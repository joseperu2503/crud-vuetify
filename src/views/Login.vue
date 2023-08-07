<template>
  <v-container class="fill-height" style="min-height: 100vh;">
    <v-layout>
      <v-main>
        <v-card class="mx-auto  pt-6 pb-6" elevation="8" max-width="448" rounded="lg" :loading="loading">
          <v-card-text>
            <v-img :width="100" aspect-ratio="1" cover src="@/assets/logo.svg" class="mx-auto" />
            <v-form @keydown.enter="login">

              <div class="text-subtitle-1 text-medium-emphasis">Email</div>

              <v-text-field density="compact" placeholder="Email address" prepend-inner-icon="mdi-email-outline"
                variant="outlined" v-model="loginForm.email" :error-messages="errors.email?.[0]" color="primary"
                name="email" type="email"/>

              <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between mt-2">
                Password

                <a class="text-caption text-decoration-none text-blue" href="#" rel="noopener noreferrer" target="_blank">
                  Forgot login password?</a>
              </div>

              <v-text-field :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                :type="showPassword ? 'text' : 'password'" density="compact" placeholder="Enter your password"
                prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="showPassword = !showPassword"
                v-model="loginForm.password" :error-messages="errors.password?.[0]" color="primary" />

            </v-form>

            <v-card class="mb-8" color="surface-variant mt-4" variant="tonal">
              <v-card-text class="text-medium-emphasis text-caption">
                Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three hours.
                If
                you must login now, you can also click "Forgot login password?" below to reset the login password.
              </v-card-text>
            </v-card>

            <v-btn block class="mb-8" color="blue" size="large" variant="tonal" @click="login" :loading="loading">
              Log In
            </v-btn>

            <v-card-text class="text-center">
              <router-link class="text-blue text-decoration-none" rel="noopener noreferrer" to="/register">
                Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
              </router-link>
            </v-card-text>
          </v-card-text>
        </v-card>
      </v-main>
    </v-layout>
  </v-container>
</template>

<script setup lang="ts">
import { useLogin } from '@/composables/useLogin'

const { login, loginForm, errors, loading, remember, showPassword } = useLogin()

</script>
