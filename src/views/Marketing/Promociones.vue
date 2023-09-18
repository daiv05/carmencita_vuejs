<script setup>
import NavBar from '../../components/NavBar.vue'
import promocionForm from '../../components/Marketing/promocionForm.vue';
</script>

<template>
<main>
    <NavBar></NavBar>
    <div class="bg-slate-100">
    <div class = "bg-white w-full mx-auto p-5 shadow-md">
        <h1 class="font-bold text-blue-700 text-2xl " >Marketing</h1>
    </div>
    
        <div class="container m-auto p-1 pb-0 pt-4 w-4/5">
            <h2 class="font-bold text-lg">Registar promoción</h2>
        </div>
        <promocionForm :createForm="true"></promocionForm>
    </div>
</main>
</template>

<script>
</script>