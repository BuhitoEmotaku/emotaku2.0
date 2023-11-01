import './assets/main.css'
import { useEmotakuWebSocket } from '@/stores/emotakuWebSocket';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.provide('emotakuWebSocket', useEmotakuWebSocket()) // Provide the WebSocket store
app.mount('#app')
