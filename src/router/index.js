import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/LoginForm.vue';
import About from '../views/About.vue';
import NotFound from '../views/NotFound.vue';
import Dashboard from '../views/DashBoard.vue';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

const routes = [
    { path: '/', name: 'Home', component: Home },
    {
        path: '/about',
        name: 'About',
        component: About,
        meta: { requiresAuth: true } // 👈 rotta protetta 
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { requiresAuth: true } // 👈 rotta protetta
    },
    {
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: () => import('../views/ForgotPassword.vue'),
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach(async (to, from, next) => {
    if (to.meta.requiresAuth) {
        try {
            await axios.get('/api/user', { withCredentials: true }) // 🔐 Check utente loggato
            next() // OK, accedi alla pagina
        } catch (err) {
            next({ name: 'Home' }) // ❌ Non loggato → redirige a login
        }
    } else if (to.name === 'Home') {
        try {
            await axios.get('/api/user', { withCredentials: true })
            next({ name: 'Dashboard' })
        } catch {
            next()
        }
    } else {
        next() // Pagina non protetta
    }
})

export default router;
