<script setup>
import NavBar from '../../components/NavBar.vue'
import empleadoForm from '../../components/RecursosHumanos/EmpleadoForm.vue'
</script>

<template>
    <NavBar></NavBar>
    <div class = "w-full mx-auto p-5 shadow" 
                    style="box-shadow: 0px 1.11px 3.329166889190674px 0 rgba(0,0,0,0.1), 0px 1.11px 2.219444513320923px 0 rgba(0,0,0,0.06);">
        <h1 class="font-bold text-blue-700 text-2xl " >Gestión de Empleados</h1>
    </div>
    <div  style="background-color: #edf1fc;">
        <div class="container m-auto p-3 pb-0 w-4/5 my-0">
            <h2 class="font-bold text-lg">Agregar empleado</h2>
        </div>
        <empleadoForm :createForm="true"></empleadoForm>
    </div>
</template>

<script>
</script>

