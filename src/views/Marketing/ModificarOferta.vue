<script setup>
import NavBar from '../../components/NavBar.vue'
import promocionForm from '../../components/Marketing/promocionForm.vue'
</script>

<template>
  <main>
    <NavBar></NavBar>
    <!-- Encabezado -->
    <div>
      <div class="flex bg-white mx-auto p-5 shadow-md justify-between">
        <h1 class="font-bold text-blue-700 text-xl">Gestion Ofertas</h1>
      </div>
      <div class="flex justify-start items-center mt-4 ml-4">
        <a
          href="#"
          @click="$router.go(-1)"
          class="text-sm text-black font-medium flex items-center"
        >
          <img src="../../assets/icons/arrow.svg" alt="Regresar" class="h-6 w-6 mr-1" /> Regresar
        </a>
      </div>
    </div>

    <div class="container m-auto p-1 pb-0 pt-4 w-4/5">
      <h2 class="font-bold text-lg ml-4">Modificar Oferta</h2>
    </div>
    <promocionForm :createForm="false" id="id"></promocionForm>
  </main>
</template>

<script></script>
