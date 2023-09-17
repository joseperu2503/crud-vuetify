<template>
  <v-container class="fill-height" style="min-height: 100vh;">
    <v-layout>
      <v-main>
        <v-card class="mx-auto pt-6" elevation="8" max-width="448" rounded="lg" :loading="loading">
          <v-card-title>
            <h2 class="text-light-blue-darken-1 font-weight-bold">
              Sign Up
            </h2>
          </v-card-title>
          <v-card-text>
            <v-form @keydown.enter="register" class="mt-4" ref="form" validate-on="blur">
              <div class="text-subtitle-1 text-medium-emphasis">Name</div>
              <v-text-field density="compact" placeholder="Enter your name" prepend-inner-icon="mdi-email-outline"
                variant="outlined" v-model="registerForm.name" :error-messages="registerErrors.name?.[0]" color="primary"
                name="name" :rules="nameRules" />

              <div class="text-subtitle-1 text-medium-emphasis">Email</div>
              <v-text-field density="compact" placeholder="Email address" prepend-inner-icon="mdi-email-outline"
                variant="outlined" v-model="registerForm.email" :error-messages="registerErrors.email?.[0]"
                color="primary" name="email" type="email" :rules="emailRules" />

              <div class="text-subtitle-1 text-medium-emphasis">Password</div>
              <v-text-field :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                :type="showPassword ? 'text' : 'password'" density="compact" placeholder="Enter your password"
                prepend-inner-icon="mdi-lock-outline" variant="outlined"
                @click:append-inner="showPassword = !showPassword" v-model="registerForm.password"
                :error-messages="registerErrors.password?.[0]" color="primary" :rules="passwordRules" />

              <div class="text-subtitle-1 text-medium-emphasis">Confirm Password</div>
              <v-text-field :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                :type="showPassword ? 'text' : 'password'" density="compact" placeholder="Confirm your password"
                prepend-inner-icon="mdi-lock-outline" variant="outlined"
                @click:append-inner="showPassword = !showPassword" v-model="registerForm.password_confirmation"
                :error-messages="registerErrors.password_confirmation?.[0]" color="primary"
                :rules="confirmPasswordRules" />
            </v-form>

            <v-btn block class="mt-4" color="blue" size="large" variant="tonal" @click="submit" :loading="loading">
              Sign Up
            </v-btn>

            <v-card-text class="text-center">
              Already have any account?
              <router-link class="text-blue text-decoration-none font-weight-medium" rel="noopener noreferrer" to="/login">
                Sign In.
              </router-link>
            </v-card-text>
            <v-card-text class="text-center mt-6">
              <router-link class="text-blue text-decoration-none" rel="noopener noreferrer" to="/">
                <v-icon icon="mdi-chevron-left"></v-icon>Go to home
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
import { ref } from 'vue';

const { register, registerForm, registerErrors, loading, showPassword } = useRegister()

const submit = async () => {
  const { valid } = await form.value?.validate()
  if (!valid) return;
  register()
}


const form: any = ref(null)

//validacion desde el frontend
const nameRules = ref([
  (value: string | null) => !!value || 'Name is required.'
])
const emailRules = ref([
  (value: string | null) => {
    if (!value) {
      return 'Email is required.'
    }
    if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))) {
      return 'Invalid email format.'
    }
    return true
  },
])
const passwordRules = ref([
  (value: string | null) => {
    if (!value) {
      return 'Password is required.'
    }
    return true
  },
])
const confirmPasswordRules = ref([
  (value: string | null) => {
    if (!value) {
      return 'Confirm your password.'
    }
    if (value != registerForm.value.password) {
      return "Passwords don't match."
    }
    return true
  },
])
</script>
