<template>
  <v-container class="fill-height" style="min-height: 100vh;">
    <v-layout>
      <v-main>
        <v-card class="mx-auto pt-6 pb-8" elevation="8" max-width="448" rounded="lg" :loading="loading">
          <v-card-title>
            <h2 class="text-light-blue-darken-1 font-weight-regular">
              Sign Up
            </h2>
          </v-card-title>
          <v-card-text>

            <v-form @keydown.enter="register" class="mt-4">
              <div class="text-subtitle-1 text-medium-emphasis">Name</div>
              <v-text-field density="compact" placeholder="Enter your name" prepend-inner-icon="mdi-email-outline"
                variant="outlined" v-model="registerForm.name" :error-messages="errors.name?.[0]" color="primary"
                name="name" />

              <div class="text-subtitle-1 text-medium-emphasis">Email</div>
              <v-text-field density="compact" placeholder="Email address" prepend-inner-icon="mdi-email-outline"
                variant="outlined" v-model="registerForm.email" :error-messages="errors.email?.[0]" color="primary"
                name="email" type="email" />

              <div class="text-subtitle-1 text-medium-emphasis">Password</div>
              <v-text-field :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                :type="showPassword ? 'text' : 'password'" density="compact" placeholder="Enter your password"
                prepend-inner-icon="mdi-lock-outline" variant="outlined"
                @click:append-inner="showPassword = !showPassword" v-model="registerForm.password"
                :error-messages="errors.password?.[0]" color="primary" />

              <div class="text-subtitle-1 text-medium-emphasis">Confirm Password</div>
              <v-text-field :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                :type="showPassword ? 'text' : 'password'" density="compact" placeholder="Confirm your password"
                prepend-inner-icon="mdi-lock-outline" variant="outlined"
                @click:append-inner="showPassword = !showPassword" v-model="registerForm.password_confirmation"
                :error-messages="errors.password_confirmation?.[0]" color="primary" />
            </v-form>

            <v-btn block class="mb-4 mt-4" color="blue" size="large" variant="tonal" @click="register" :loading="loading">
              Sign Up
            </v-btn>

            <v-card-text class="text-center">
              Already have any account?
              <router-link class="text-blue text-decoration-none" rel="noopener noreferrer" to="/login">
                Sign In.
              </router-link>
            </v-card-text>
          </v-card-text>
        </v-card>
      </v-main>
    </v-layout>
  </v-container>
</template>

<script setup lang="ts">
import { useRegister } from '@/composables/useRegister'

const { register, registerForm, errors, loading, showPassword } = useRegister()

</script>
