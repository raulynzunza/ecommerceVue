
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import VuePaginate from 'vue-paginate';

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(VuePaginate);
app.mount('#app')
