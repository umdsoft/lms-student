import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router/index';
import './main.css';
import i18n from './i18n';
import { createNotivue } from 'notivue';
import 'notivue/notifications.css';
import 'notivue/animations.css';
import 'katex/dist/katex.min.css';
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

// Global error handler for production
app.config.errorHandler = (err, instance, info) => {
  console.error('Global error caught:', err);
  console.error('Component:', instance);
  console.error('Error info:', info);

  // In production, you might want to send this to a monitoring service
  // like Sentry, LogRocket, etc.
  if (import.meta.env.PROD) {
    // Example: Sentry.captureException(err);
  }
};

// Global warning handler
app.config.warnHandler = (msg, instance, trace) => {
  if (import.meta.env.DEV) {
    console.warn('Vue warning:', msg);
    console.warn('Component:', instance);
    console.warn('Trace:', trace);
  }
};

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  event.preventDefault(); // Prevent default browser behavior
});

// Initialize auth before mounting the app
const authStore = useAuthStore();
authStore.initAuth().finally(() => {
  app.mount('#app');
});
