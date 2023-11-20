import './assets/main.css'
import store from './store/auth'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import './assets/main.css';
import VueApexCharts from "vue3-apexcharts";
import axios from 'axios';


window.axios = axios;
window.axios.defaults.withCredentials = true;
window.axios.defaults.headers.common["Accept"]="application/json";
window.axios.defaults.headers.common["Content-Type"]="application/json";
window.axios.defaults.headers.common["X-Requested-With"]="XMLHttpRequest";

// Set the appropriate CORS headers based on the current origin
//axios.defaults.headers.common['Access-Control-Allow-Origin'] = window.location.origin;
window.axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE';
window.axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'X-Requested-With, Content-Type';
//window.axios.defaults.baseURL="http://localhost:8000"
window.axios.defaults.baseURL="http://192.168.1.11:8081"

// Validar en cada response si el usuario esta autenticado
window.axios.interceptors.response.use(
  response => response,
  error => {
    try {
      if (error.response.status === 401) {
        console.log('no auth');
        store.dispatch("cleanStore");
        router.push("/iniciar_sesion");
      }
    } catch (error) {
      console.log(error);
      store.dispatch("cleanStore");
      router.push("/iniciar_sesion");
    }
    //error.response.data.is_auth ? console.log('aa') : store.dispatch('logout');
    return Promise.reject(error);
  }
);

const app = createApp(App)

const options = {
  transition: "Vue-Toastification__fade",
  maxToasts: 20,
  newestOnTop: true
};

app.use(Toast, options);
app.use(router);
app.use(store);

/*const options = {
  transition: "Vue-Toastification__fade",
  maxToasts: 20,
  newestOnTop: true
};*/

//app.use(Toast, options);
//app.use(router);
//app.use(store);
app.use(VueApexCharts);
app.mount('#app')
