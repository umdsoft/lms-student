import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router/index';
import './main.css';
import i18n from './i18n';
import { createNotivue } from 'notivue';
import 'notivue/notifications.css';
import 'notivue/animations.css';
import { useAuthStore } from './shared/stores/auth';

const app = createApp(App);

const pinia = createPinia();
const notivue = createNotivue({
  position: 'top-right',
  limit: 3
});

app.use(pinia);
app.use(router);
app.use(i18n);
app.use(notivue);

// Initialize auth before mounting the app
const authStore = useAuthStore();
authStore.initAuth().finally(() => {
  app.mount('#app');
});
