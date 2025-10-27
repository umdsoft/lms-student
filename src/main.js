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

// Global error handler for production-ready error handling
app.config.errorHandler = (err, instance, info) => {
  console.error('Global error caught:', err);
  console.error('Component:', instance?.$options?.name || instance?.$?.type?.name || 'Unknown');
  console.error('Error info:', info);

  // Log to monitoring service in production
  if (import.meta.env.PROD) {
    // TODO: Send to monitoring service (e.g., Sentry)
    // sendToMonitoring({ error: err, component: instance, info });
  }

  // Prevent error propagation in development for better debugging
  if (import.meta.env.DEV) {
    throw err;
  }
};

// Global warning handler for catching Vue warnings
app.config.warnHandler = (msg, instance, trace) => {
  if (import.meta.env.DEV) {
    console.warn('Vue warning:', msg);
    console.warn('Component:', instance?.$options?.name || instance?.$?.type?.name || 'Unknown');
    console.warn('Trace:', trace);
  }
};

// Initialize auth before mounting the app
const authStore = useAuthStore();
authStore.initAuth().finally(() => {
  app.mount('#app');
});
