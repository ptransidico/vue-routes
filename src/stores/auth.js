import { defineStore } from 'pinia';
import axios from '@/lib/axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
    }),
    getters: {
        isLoggedIn: (state) => !!state.user,
    },
    actions: {
        async fetchUser() {
            try {
                const response = await axios.get('/api/user');
                this.user = response.data;
                return true;
            } catch (err) {
                this.user = null;
                return false;
            }
        },
        async logout() {
            await axios.post('/auth/logout');
            this.user = null;
        }
    }
});
