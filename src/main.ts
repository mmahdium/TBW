import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { MotionPlugin } from '@vueuse/motion'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(autoAnimatePlugin)
app.use(MotionPlugin)

app.mount('#app')

