<template>
    <div>
        <h1>Elenco Post</h1>
        <div v-if="loading">Caricamento...</div>
        <ul v-else>
            <li v-for="post in posts" :key="post.id">
                {{ post.title }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../lib/axios'

const posts = ref([])
const loading = ref(true)

onMounted(async () => {
    try {
        const response = await api.get('/posts')
        posts.value = response.data
    } catch (error) {
        console.error('Errore nel caricamento:', error)
    } finally {
        loading.value = false
    }
})
</script>
