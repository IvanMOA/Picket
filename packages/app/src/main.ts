import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createHead } from '@vueuse/head'
import { store } from './store'
import './assets/index.postcss'
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4004"
const head = createHead()
const app = createApp(App)

app.use(store)
app.use(router)
app.use(head)

app.mount('#app')
