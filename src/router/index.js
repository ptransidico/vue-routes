import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/LoginForm.vue';
import About from '../views/About.vue';
import NotFound from '../views/NotFound.vue';
import Dashboard from '../views/DashBoard.vue';
import DosePersonale from '../views/DosePersonale.vue';
import DosePaziente from '../views/DosePaziente.vue';
import Sorgenti from '../views/Sorgenti.vue';
import Therabed from '../views/Therabed.vue';
import axios from '@/lib/axios';

// Importa le viste che vuoi usare come pagine
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
        path: '/inventario',
        name: 'Inventario',
        component: () => import('../views/Inventario.vue'),
        meta: { requiresAuth: true } // 👈 rotta protetta
    },
    {
        path: '/sorgenti',
        name: 'Sorgenti',
        component: Sorgenti,
        meta: { requiresAuth: true } // 👈 rotta protetta
    },
     {
        path: '/therabed',
        name: 'Therabed',
        component: Therabed,
        meta: { requiresAuth: true } // 👈 rotta protetta
    },
    {
        path: '/dose-personale',
        name: 'dose-personale',
        component: DosePersonale,
        meta: { requiresAuth: true } // 👈 rotta protetta
    },
    {
        path: '/dose-paziente',
        name: 'dose-paziente',
        component: DosePaziente,
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