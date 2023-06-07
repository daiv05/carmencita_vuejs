<script setup>
import NavBar from '../../components/NavBar.vue'
import empleadoForm from '../../components/RecursosHumanos/EmpleadoForm.vue'
</script>

<template>
    <NavBar></NavBar>
    <div class = "container mx-auto p-5 shadow-md">
        <h1 class="font-bold text-blue-700 text-2xl " >Gestión de Empleados</h1>
    </div>
    <div class="slate-gray-100">
        <div class="container m-auto p-3 pb-0 w-4/5 my-0">
            <h2 class="font-bold text-lg">Agregar empleado</h2>
        </div>
        <empleadoForm :createForm="true"></empleadoForm>
    </div>
</template>

<script>
</script>

