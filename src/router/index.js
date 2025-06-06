import { createRouter, createWebHistory } from 'vue-router';
import NotFound from '../views/NotFound.vue';
import Dashboard from '../views/DashBoard.vue';
const Home = () => import('../views/LoginForm.vue');
const DosePersonale = () => import('../views/DosePersonale.vue');
const DosePaziente = () => import('../views/DosePaziente.vue');
const Sorgenti = () => import('../views/Sorgenti.vue');
const Therabed = () => import('../views/Therabed.vue');
const Inventario = () => import('../views/Inventario.vue');
const ForgotPassword = () => import('../views/ForgotPassword.vue');
const Settings = () => import('../views/Settings.vue');

import { useAuthStore } from '@/stores/auth';

// Importa le viste che vuoi usare come pagine
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { requiresGuest: true } // 👈 rotta per utenti non autenticati -- impedisce accesso se già loggato
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { requiresAuth: true } // 👈 rotta protetta
    },
    {
        path: '/settings',
        name: 'Settings',
        component: Settings,
        meta: { requiresAuth: true } // 👈 rotta protetta
    },
    {
        path: '/inventario',
        name: 'Inventario',
        component: Inventario,
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
        component: ForgotPassword,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

/* router.beforeEach(async (to, from, next) => {
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
}) */

router.beforeEach(async (to, from, next) => {
    const auth = useAuthStore();

    const requiresAuth = to.meta.requiresAuth; // 👈 rotta protetta
    const requiresGuest = to.meta.requiresGuest; // 👈 rotta per utenti non autenticati

    const isLoggedIn = auth.user ? true : await auth.fetchUser(); // 👈 verifica se l'utente è loggato

    if (requiresAuth && !isLoggedIn) { // 🔐 se la rotta richiede autenticazione e l'utente non è loggato
        return next({ name: 'Home' }); // ❌ Non loggato → redirige a login
    }

    if (requiresGuest && isLoggedIn) { // Se la rotta richiede che l'utente non sia autenticato e l'utente è loggat
        return next({ name: 'Dashboard' }); // Reindirizza a Dashboard se l'utente è loggato
    }

    next(); // Continua con la navigazione
});

export default router;