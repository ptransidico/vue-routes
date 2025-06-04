<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
      <img src="@/assets/logo.png" alt="Logo" class="w-24 mx-auto mb-6" />
      <h2 class="text-2xl font-bold mb-6 text-center">PrimeVue Login</h2>

      <div v-if="generalError" class="text-red-600 mb-4">{{ generalError }}</div>

      <form @submit.prevent="handleLogin" class="flex flex-col gap-4">
        <div>
          <label for="email" class="block text-gray-700 mb-2">Email</label>
          <InputText id="email" v-model="email" class="w-full" />
          <small v-if="errors.email" class="text-red-500">{{ errors.email }}</small>
        </div>
        <div>
          <label for="password" class="block text-gray-700 mb-2">Password</label>
          <Password id="password" v-model="password" :toggleMask="true" class="w-full" inputClass="w-full" />
          <small v-if="errors.password" class="text-red-500">{{ errors.password }}</small>
          <div class="text-right mt-2">
            <router-link to="/forgot-password" class="text-blue-500 hover:underline text-xs">
              Hai dimenticato la password?
            </router-link>
          </div>
        </div>
        <Button type="submit" label="Login" :loading="loading" class="w-full" />
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from '@/lib/axios';

const email = ref('');
const password = ref('');
const loading = ref(false);
const generalError = ref(null);
const errors = ref({});
const router = useRouter();

async function handleLogin() {
  generalError.value = null;
  errors.value = {};
  loading.value = true;
  try {
    await axios.get('/sanctum/csrf-cookie');
    await axios.post('/auth/login', { email: email.value, password: password.value });
    await router.push('/dashboard');
  } catch (err) {
    if (err.response?.status === 422) {
      const responseErrors = err.response.data.errors || {};
      errors.value = {
        email: responseErrors.email?.[0],
        password: responseErrors.password?.[0],
      };
      generalError.value = err.response.data.message || 'Errore di validazione';
    } else {
      generalError.value = 'Errore durante il login';
    }
    console.error('Errore login:', err);
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped></style>
