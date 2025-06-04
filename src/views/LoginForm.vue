<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
            <img src="@/assets/logo.png" alt="Logo" class="w-24 mx-auto mb-6" />
            <h2 class="text-2xl font-bold mb-6 text-center">Physico Login</h2>

            <form @submit.prevent="handleLogin">
                <!-- Errore generale -->
                <div v-if="generalError" class="text-red-600 mb-4">
                    {{ generalError }}
                </div>

                <!-- Email -->
                <div class="mb-4">
                    <label for="email" class="block text-gray-700 mb-2">Email</label>
                    <input ref="emailInput" v-model="email" id="email" type="email"
                        class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required />
                    <p v-if="errors.email" class="text-red-500 text-sm mt-1">
                        {{ errors.email }}
                    </p>
                </div>

                <!-- Password -->
                <div class="mb-6">
                    <label for="password" class="block text-gray-700 mb-2">Password</label>
                    <div class="relative">
                        <input v-model="password" :type="showPassword ? 'text' : 'password'" id="password"
                            class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required />
                        <i :class="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"
                            class="absolute right-3 top-3 text-gray-600 cursor-pointer" @click="togglePassword"></i>
                    </div>
                    <p v-if="errors.password" class="text-red-500 text-sm mt-1">
                        {{ errors.password }}
                    </p>

                    <!-- 🔗 Link "Hai dimenticato la password?" -->
                    <div class="text-right mt-2">
                        <router-link to="/forgot-password" class="text-blue-500 hover:underline text-xs">
                            Hai dimenticato la password?
                        </router-link>
                    </div>
                </div>

                <!-- Pulsante submit -->
                <button type="submit" :disabled="loading"
                    class="w-full bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition">
                    {{ loading ? "Accesso..." : "Login" }}
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from '@/lib/axios';

const email = ref("");
const password = ref("");
const showPassword = ref(false);
const loading = ref(false);
const generalError = ref(null);
const errors = ref({});
const router = useRouter();
const emailInput = ref(null);

onMounted(() => {
    emailInput.value?.focus();
});

function togglePassword() {
    showPassword.value = !showPassword.value;
}

async function handleLogin() {
    generalError.value = null;
    errors.value = {};
    loading.value = true;

    try {
        await axios.get("/sanctum/csrf-cookie");

        await axios.post("/auth/login", {
            email: email.value,
            password: password.value,
        });

        await router.push("/dashboard");

    } catch (err) {
        if (err.response?.status === 422) {
            const responseErrors = err.response.data.errors || {};
            errors.value = {
                email: responseErrors.email?.[0],
                password: responseErrors.password?.[0],
            };
            generalError.value = err.response.data.message || "Errore di validazione";
        } else {
            generalError.value = "Errore durante il login";
        }
        console.error("Errore login:", err);
    } finally {
        loading.value = false;
    }
}
</script>
