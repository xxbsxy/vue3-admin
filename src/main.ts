import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createPinia } from 'pinia'
import 'element-plus/theme-chalk/el-loading.css'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-message-box.css'
import { useDirective } from '@/directives/index'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)
useDirective(app)
app.use(pinia).use(router).mount('#app')
