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
    {
        path: '/',
        name: 'Home',
        component: Home
    },
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
    if (to.meta.requiresAuth) { // 🔐 Controlla se la rotta richiede autenticazione
        try { // 🔐 Prova a fare una richiesta per verificare l'utente loggato
            await axios.get('/api/user') // 🔐 Check utente loggato
            next() // OK, accedi alla pagina
        } catch (err) { // ❌ Errore, utente non loggato
            next({ name: 'Home' }) // ❌ Non loggato → redirige a login
        }
    } else if (to.name === 'Home') { // Se la rotta è la Home, controlla se l'utente è già loggato
        // Se l'utente è loggato, reindirizza al Dashboard
        try {
            await axios.get('/api/user') // 🔐 Check utente loggato
            next({ name: 'Dashboard' }) // Reindirizza a Dashboard se l'utente è loggato
        } catch {
            next()// Se non è loggato, continua con la Home
        }
    } else {
        next() // Pagina non protetta
    }
})

export default router;
