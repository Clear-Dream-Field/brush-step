import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createDiscreteApi } from 'naive-ui'

import App from './App.vue'
import router from './router'

import './assets/css/main.css'
import './assets/logo.svg'
import './assets/css/theme.css'

import { useThemeStore } from './stores/theme'

const app = createApp(App)
const pinia = createPinia()
// @ts-ignore
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

const themeStore = useThemeStore()
document.documentElement.setAttribute('data-theme', themeStore.theme)

const { message, notification, dialog, loadingBar } = createDiscreteApi(
  ['message', 'dialog', 'notification', 'loadingBar']
)

// 添加到全局
window.$message = message
window.$dialog = dialog
window.$notification = notification
window.$loadingBar = loadingBar

app.mount('#app')
