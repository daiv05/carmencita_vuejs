<template>
    <div>
      <div v-if="avisos.length > 0">
        <transition name="fade" mode="out-in" class="bg-primary">
          <div :key="currentAviso.id" class="alert">
            <h1 class="text-white"></h1>
            <p class="mt-2 w-100 text-lg font-semibold text-left text-white">{{ currentAviso.titulo_aviso }}</p>
            <p class="mt-2 w-100 text-sm font-semibold text-left text-white">{{ currentAviso.cuerpo_aviso }}</p>
          </div>
        </transition>
      </div>
      <div v-else>
        <h5>Cargando avisos...</h5>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import api_url from '../../config.js';

  
  export default {
    data() {
      return {
        avisos: [],
        currentAvisoIndex: 0,
      };
    },
    computed: {
      currentAviso() {
        return this.avisos[this.currentAvisoIndex];
      },
    },
    mounted() {
      this.getAvisos();
      setInterval(this.changeAviso, 5000);
    },
    methods: {
      getAvisos() {
        axios.get(api_url + '/avisos_blog')
          .then(response => {
            this.avisos = response.data;
          })
          .catch(error => {
            console.error(error);
          });
      },
      changeAviso() {
        this.currentAvisoIndex = (this.currentAvisoIndex + 1) % this.avisos.length;
      },
    },
  };
  </script>
  
  <style>
  .bg-primary {
    background-color: #3056d3ff;
  }
  
  .alert {
    color: white;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.8s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  
  @media (min-width: 992px) {
    .text-lg {
      font-size: 1.25rem;
    }
  
    .text-sm {
      font-size: 0.875rem;
    }
  }
  </style>
  