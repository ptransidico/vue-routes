<template>
  <nav class="bg-white shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <div class="flex items-center space-x-4">
          <span class="text-xl font-bold text-blue-600">MyApp</span>
          <router-link to="/dashboard" class="text-gray-700 hover:text-blue-500">Dashboard</router-link>
          <router-link to="/about" class="text-gray-700 hover:text-blue-500">About</router-link>
        </div>

        <div class="flex items-center">
          <button @click="handleLogout" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-xl transition">
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

async function handleLogout() {
  try {
    await axios.post("/auth/logout");
    await router.push("/");
  } catch (err) {
    console.error("Errore durante il logout:", err);
  }
}
</script>
