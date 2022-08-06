import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
const pinia = createPinia()
import './api/request/request'
import 'element-plus/theme-chalk/el-loading.css'
createApp(App).use(pinia).use(router).mount('#app')
