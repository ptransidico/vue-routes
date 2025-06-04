import "./assets/main.css";
import 'primeicons/primeicons.css'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrimeVue from 'primevue/config'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'

const app = createApp(App)

app.use(router)
app.use(PrimeVue)

app.component('InputText', InputText)
app.component('Password', Password)
app.component('Button', Button)

app.mount("#app")
