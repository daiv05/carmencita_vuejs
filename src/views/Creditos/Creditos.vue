<script setup>
import NavBar from '../../components/NavBar.vue'
import creditoForm from '../../components/Credito/creditoForm.vue';
</script>

<template>
<main>
    <NavBar></NavBar>
    <div class="bg-slate-100">
    <div class = "bg-white w-full mx-auto p-5 shadow-md">
        <h1 class="font-bold text-blue-700 text-2xl " >Gestion Credito con Proveedores</h1>
    </div>
    
        <div class="container m-auto p-1 pb-0 pt-4 w-4/5">
            <h2 class="font-bold text-lg">Registar Credito</h2>
        </div>
        <creditoForm :createForm="true"></creditoForm>
    </div>
</main>
</template>

<script>
</script>

