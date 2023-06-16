<script setup>
import NavBar from '../../components/NavBar.vue'
import empleadoForm from '../../components/RecursosHumanos/EmpleadoForm.vue'
import modalDesactivar from '../../components/RecursosHumanos/EmpleadoDesactivar.vue'
</script>

<template>
    <NavBar></NavBar>
    <div class="bg-slate-100">
    <div class = "bg-white w-full mx-auto p-5 shadow-md">
        <h1 class="font-bold text-blue-700 text-2xl " >Gestión de Empleados</h1>
    </div>
        <div class="container m-auto p-1 pb-0 pt-4 w-4/5">
            <h2 class="font-bold text-lg">Modificar empleado</h2>
        </div>
        <empleadoForm ref="empleado"></empleadoForm>
    </div>
</template>

<script>
import { useRoute } from 'vue-router';

export default {
    data(){
        return{
            id:null,
            esta_activo: null,
        }
    }, 
    mounted(){
        const route = useRoute();
        this.id = route.params.id;
        this.esta_activo = this.$refs.empleado.getEmpleado;
    }
}
</script>