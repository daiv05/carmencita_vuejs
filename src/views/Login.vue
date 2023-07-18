<template>
    <div>
        <h2>Iniciar sesión</h2>
        <form @submit.prevent="login()">
            <label for="email">Correo:</label>
            <input type="text" id="email" v-model="email" required>
            <br>
            <label for="password">Contraseña:</label>
            <input type="password" id="password" v-model="password" required>
            <br>
            <button type="submit">Iniciar sesión</button>
        </form>
    </div>
</template>
  
<script>
import API_URL from '../config';
import axios from 'axios';
import Cookies from 'js-cookie';


export default {
    data() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        login() {
            axios.get('http://localhost:9000/sanctum/csrf-cookie');
            return axios.post(API_URL + '/auth/login', {
                email: this.email,
                password: this.password,
            })
                .then(response => {
                    try {
                        console.log(response.data);
                        Cookies.remove('authToken', response.data.token);
                        this.$router.push({ name: 'home' });
                    } catch (error){
                        console.error(error);
                    }

                })
                .catch(error => {
                    console.error(error.response.data);
                    console.log('Error al iniciar sesión');
                });
        },
    }
};
</script>