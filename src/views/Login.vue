<template>
  <v-container class="fill-height" style="min-height: 100vh;">
    <v-layout>
      <v-main>
        <v-card class="mx-auto  pt-6 pb-6" elevation="8" max-width="448" rounded="lg" :loading="loading">
          <v-card-text>
            <v-img :width="100" aspect-ratio="1" cover src="@/assets/logo.svg" class="mx-auto" />
            <v-form @keydown.enter="login" ref="form" validate-on="blur">

              <div class="text-subtitle-1 text-medium-emphasis">Email</div>
              <!-- :rules es para la validacion desde el frontend y para la validacion desde el backend :error-messages, ya depende de la preferencia -->
              <!-- podria usar solamente :rules y definir las reglas en el frontend, o solamente : :error-messages en caso llega algun mensaje desde le backend y quiera reenderizarlo-->
              <v-text-field density="compact" placeholder="Email address" prepend-inner-icon="mdi-email-outline"
                variant="outlined" v-model="loginForm.email" :error-messages="loginErrors.email?.[0]" color="primary"
                name="email" type="email" :rules="emailRules" />

              <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between mt-2">
                Password

                <a class="text-caption text-decoration-none text-blue" href="#" rel="noopener noreferrer" target="_blank">
                  Forgot login password?</a>
              </div>

              <v-text-field :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                :type="showPassword ? 'text' : 'password'" density="compact" placeholder="Enter your password"
                prepend-inner-icon="mdi-lock-outline" variant="outlined"
                @click:append-inner="showPassword = !showPassword" v-model="loginForm.password" color="primary"
                :rules="passwordRules" :error-messages="loginErrors.password?.[0]" />

            </v-form>

            <v-card class="mb-8" color="surface-variant mt-4" variant="tonal">
              <v-card-text class="text-medium-emphasis text-caption">
                Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three
                hours.
                If
                you must login now, you can also click "Forgot login password?" below to reset the login password.
              </v-card-text>
            </v-card>

            <v-btn block class="mb-8" color="blue" size="large" variant="tonal" @click="submit" :loading="loading">
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
import { ref } from 'vue';
const { login, loginForm, loginErrors, loading, remember, showPassword } = useLogin()

const submit = async () => {
  const { valid } = await form.value?.validate()
  if (!valid) return;
  login()
}

const form: any = ref(null)

//validacion desde el frontend
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
</script>
