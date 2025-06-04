<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="bg-white p-6 rounded-xl shadow-sm w-full max-w-sm">
            <h2 class="text-xl font-semibold mb-5 text-center text-gray-800">Recupera password</h2>

            <form @submit.prevent="submitEmail" class="space-y-4 text-sm">
                <div v-if="status" class="text-green-600 text-sm">{{ status }}</div>
                <div v-if="error" class="text-red-600 text-sm">{{ error }}</div>

                <div>
                    <label for="email" class="block text-gray-700 mb-1">Email</label>
                    <input v-model="email" id="email" type="email"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring focus:ring-blue-300"
                        required />
                </div>

                <button type="submit" :disabled="loading"
                    class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md text-sm transition">
                    {{ loading ? 'Invio...' : 'Invia link di reset' }}
                </button>

                <router-link to="/" class="block text-center text-blue-500 hover:underline text-xs mt-2">
                    Torna al login
                </router-link>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const email = ref('')
const loading = ref(false)
const status = ref('')
const error = ref('')

async function submitEmail() {
    loading.value = true
    status.value = ''
    error.value = ''

    try {
        await axios.get('/sanctum/csrf-cookie')

        const response = await axios.post('/forgot-password', {
            email: email.value,
        })

        status.value = response.data.status || 'Email inviata se esiste un account associato.'
    } catch (err) {
        if (err.response?.data?.errors?.email) {
            error.value = err.response.data.errors.email[0]
        } else {
            error.value = 'Errore durante l’invio'
        }
        console.error(err)
    } finally {
        loading.value = false
    }
}
</script>
