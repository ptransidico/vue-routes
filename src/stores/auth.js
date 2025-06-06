import { defineStore } from 'pinia';
import axios from '@/lib/axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
    }),
    getters: { // Getters to access state properties
        isLoggedIn: (state) => !!state.user, // Returns true if user is logged in
    },
    actions: {
        async fetchUser() { // Fetches the current user from the API
            try {
                const response = await axios.get('/api/user');
                this.user = response.data;
                return true;
            } catch (err) {
                this.user = null;
                return false;
            }
        },
        async logout() { // Logs out the user by making an API call
            await axios.post('/auth/logout');
            this.user = null;
        }
    }
});
