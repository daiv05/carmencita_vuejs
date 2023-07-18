import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import './assets/main.css'
import axios from 'axios'
import store from './store/auth.js'
import Cookies from 'js-cookie';

window.axios = axios;
window.axios.defaults.headers.common['Access-Control-Allow-Origin'] = window.location.origin;
window.axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE';
window.axios.defaults.headers.common['Accept'] = 'application/json';
window.axios.defaults.headers.common['Content-Type'] = 'application/json';
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.withCredentials = true;

const app = createApp(App)

const options = {
  transition: "Vue-Toastification__fade",
  maxToasts: 20,
  newestOnTop: true
};

app.use(router, Toast, options, router)

app.mount('#app')
