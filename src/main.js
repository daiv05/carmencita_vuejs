import './assets/main.css'
import store from './store/auth'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import './assets/main.css';
import axios from 'axios';


// Set the appropriate CORS headers based on the current origin
axios.defaults.headers.common['Access-Control-Allow-Origin'] = window.location.origin;
axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'X-Requested-With, Content-Type';

const app = createApp(App)


app.use(store);
app.use(router);

const options = {
  transition: "Vue-Toastification__fade",
  maxToasts: 20,
  newestOnTop: true
};

app.use(Toast, options)

app.mount('#app')
