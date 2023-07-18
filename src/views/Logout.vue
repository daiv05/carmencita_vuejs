<template>
    <div>
        <h2>Cerrar sesión</h2>
        <p>¿Estás seguro de que deseas cerrar sesión?</p>
        <button @click="logout">Cerrar sesión</button>
    </div>
</template>
  
<script>
import API_URL from '../config';
import axios from 'axios';
import Cookies from 'js-cookie';

export default {
    methods: {
        logout() {
            return axios.post(API_URL + '/auth/logout')
                .then(response => {
                    console.log(response.data);
                    Cookies.remove('authToken')
                    this.$router.push({ name: 'login' });
                })
                .catch(error => {
                    console.error(error);
                    console.log('Error al cerrar sesión');
                });
        },
    }
};
</script>
  