import './assets/main.css'

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import gsap from "./plugins/gsap"

const app = createApp(App)
app.use(createPinia())
app.use(gsap)
app.use(router)

app.mount('#app')
