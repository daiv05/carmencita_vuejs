<script setup>
import api_url from "../../config";
import NavBar from "../../components/NavBar.vue";
import EmpleadoDesactivar from "../../components/RecursosHumanos/EmpleadoDesactivar.vue";
</script>
<template>
<main>
     <NavBar></NavBar>
     <div class = "container mx-auto p-6 flex justify-between">
               <h1 class="font-bold text-blue-700 text-2xl " >Gestión de Empleados</h1>
               <router-link to="empleado_agregar" class="buttonColor hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Agregar Empleado</router-link>
          </div>
          <div class="flex justify-center w-[100%] mt-[2%]">
               <table class="w-[100%] lg:w-[60%] table-auto">
                    <thead class = "mBackground border-b-2 uppercase">
                         <tr>
                              <th class="p-4 font-bold">Username</th>
                              <th class="p-4 font-bold">Nombre</th>
                              <th class="p-4 font-bold">Cargo</th>
                              <th class="p-4 font-bold">Acciones</th>
                         </tr>
                    </thead>
                    <tbody>
                         <tr class="text-center" v-for="empleado in listaEmpleados" v-bind:key="empleado.id_empleado">
                              <td class="py-4 px-8" >{{ empleado.username }}</td>
                              <td class="py-4 px-8" >{{ empleado.primer_nombre }} {{ empleado.segundo_empleado }}</td>
                              <td class="py-4 px-8" >{{empleado.cargo}}</td>
                              <td class="py-4" >
                              <router-link class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-[30px] text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 cursor-pointer"
                              v-bind:to="generarEnlace(empleado.id_empleado)">
                                             Editar</router-link>
                              <EmpleadoDesactivar class="inline-block ml-2" :id="empleado.id_empleado" :estado="empleado.estado_empleado"></EmpleadoDesactivar>     
                              </td>
                         </tr>
                    </tbody>
               </table>
          </div>
</main>
</template>

<style scope>
.mBackground{
     background-color: #F9FAFB;
     padding: 10px;
}
</style>

<script>
import axios from  "axios";
import { watch } from 'vue';
export default {
     data(){
          return{
               listaEmpleados : [],
          }
     },
     mounted(){
          //this.obtenerListaEmpleados();
     },
     created(){
          this.obtenerListaEmpleados();
     },
     methods:{
          obtenerListaEmpleados(){
               axios.get(api_url+"/empleados")
               .then(
                    (response) =>{
                        
                         this.listaEmpleados  = response.data.data;
                         console.log(this.listaEmpleados)
                    }
               )
               .catch((response)=>{
                    console.log("Ocurrio un error al obtener los registros del servidor");
               });
          },
          generarEnlace(idEmpleado){
               return "empleado_modificar/"+idEmpleado;
          },
     },
     watch:{
          listaEmpleados:function(newValue,oldValue){
               console.log("cambio el valor de la lista");
          }
     }
}
</script>
<style scoped>
.buttonColor{
     background-color: #4F46E5;
}
</style>