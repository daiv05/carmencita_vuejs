<template>
    <NavBar />
    <section data-v-3a85fddf="" class="container mx-auto p-6 z-900">
        <div id="app">
        <AvisosComponent />
    </div>
    <p data-v-73b5fa90="" class="mt-2 flex-grow-0 flex-shrink-0 w-[500px] text-[30px] font-semibold text-left text-[#3056d3]"> 
        Estas son nuestras increibles ofertas </p>
    <div id="app">
      <Ofertas />
    </div>
    </section>

    <br>
  </template>
  
  <script>
  import Ofertas from '@/components/Marketing/Ofertas.vue'
  import AvisosComponent from '@/components/Marketing/AvisosComponent.vue'
  import NavBar from '@/components/NavBar.vue';
  
  export default {
    components: {
      Ofertas,
      AvisosComponent,
      NavBar
    }
  }
  </script>
  
  <style>
  .app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  </style>
  