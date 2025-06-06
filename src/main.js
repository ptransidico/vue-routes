import "./assets/main.css"; // Importing main CSS file
import 'primeicons/primeicons.css' // Importing PrimeIcons CSS

import { createApp } from "vue"; // Importing Vue
import { createPinia } from 'pinia'; // Importing Pinia for state management
import App from "./App.vue"; // Importing the main App component
import router from "./router"; // Importing the router configuration

const app = createApp(App); // Creating the Vue application instance
const pinia = createPinia(); // Creating a Pinia store instance
app.use(pinia); // Using Pinia for state management
app.use(router); // Using the router for navigation
app.mount("#app"); // Mounting the Vue application to the DOM element with id "app"
