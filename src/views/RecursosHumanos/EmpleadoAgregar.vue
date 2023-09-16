<script setup>
import empleadoForm from '../../components/RecursosHumanos/EmpleadoForm.vue';
</script>

<template>
<main>
    
    <div class="bg-slate-100">
    <div class = "bg-white w-full mx-auto p-5 shadow-md">
        <h1 class="font-bold text-blue-700 text-2xl " >Gestión de Empleados</h1>
    </div>
    
        <div class="container m-auto p-1 pb-0 pt-4 w-4/5">
            <h2 class="font-bold text-lg">Agregar empleado</h2>
        </div>
        <empleadoForm :createForm="true"></empleadoForm>
    </div>
</main>
</template>

<script>
</script>

