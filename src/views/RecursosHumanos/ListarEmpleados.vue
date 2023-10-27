<script setup>
import api_url from "../../config";
import NavBar from "../../components/NavBar.vue";
import EmpleadoDesactivar from "../../components/RecursosHumanos/EmpleadoDesactivar.vue";
</script>
<template>
     <NavBar></NavBar>
     <main class="bg-slate-100">
          <div>
               <div class="flex bg-white mx-auto p-5 shadow-md justify-between">
                    <h1 class="font-bold text-blue-700 text-xl">Gestión de Empleados</h1>
                    <div class="flex items-center">
                         <router-link to="/recursos_humanos/empleado_agregar"
                              class="buttonColor w-auto h-auto px-4 py-2 rounded-[4.44px] text-[13px] font-medium text-center text-white">Agregar
                              Empleado</router-link>
                    </div>
               </div>
               <div class="flex justify-start items-center mt-4 ml-4">
                    <a href="#" @click="$router.go(-1)" class="text-sm text-black font-medium flex items-center">
                         <img src="../../assets/icons/arrow.svg" alt="Regresar" class="h-6 w-6 mr-1"> Regresar
                    </a>
               </div>
          </div>
          <div class="container w-full m-1 md:w-11/12 lg:w-4/5 p-4 sm:mx-auto bg-slate-50 shadow rounded-md overflow-auto lg:overflow-auto">
               <table class="w-full max-h-screen rounded-md">
                    <thead class="border-b bg-slate-100 uppercase">
                         <tr>
                              <th class="py-2 font-bold">Usuario</th>
                              <th class="py-2 font-bold">Nombre</th>
                              <th class="py-2 font-bold">Cargo</th>
                              <th class="py-2 font-bold">Acciones</th>
                         </tr>
                    </thead>
                    <tbody>
                         <tr class="text-center" v-for="empleado in listaEmpleados" v-bind:key="empleado.id_empleado">
                              <td class="py-2 px-8">{{ empleado.username }}</td>
                              <td class="py-2 px-8">{{ empleado.primer_nombre }} {{ empleado.segundo_empleado }}</td>
                              <td class="py-2 px-8">{{ empleado.cargo }}</td>
                              <td class="py-2">
                                   <router-link
                                        class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-[30px] text-sm px-5 py-2.5 my-2 text-center"
                                        v-bind:to="generarEnlace(empleado.id_empleado)">
                                        Editar</router-link>
                                   <EmpleadoDesactivar class="inline-block mx-2 my-2" :id="empleado.id_empleado"
                                        :estado="empleado.estado_empleado"></EmpleadoDesactivar>
                              </td>
                         </tr>
                    </tbody>
               </table>
          </div>
     </main>
</template>

<style scope>
.mBackground {
     background-color: #F9FAFB;
     padding: 10px;
}
</style>

<script>
import axios from "axios";
import { watch } from 'vue';
export default {
     data() {
          return {
               listaEmpleados: [],
          }
     },
     mounted() {
          //this.obtenerListaEmpleados();
     },
     created() {
          this.obtenerListaEmpleados();
     },
     methods: {
          obtenerListaEmpleados() {
               axios.get(api_url + "/empleados")
                    .then(
                         (response) => {

                              this.listaEmpleados = response.data.data;
                              console.log(this.listaEmpleados)
                         }
                    )
                    .catch((response) => {
                         console.log("Ocurrio un error al obtener los registros del servidor");
                         console.log(response);
                         if (response.response.data.tienePermiso === false) {
                              alert(response.response.data.mensaje);
                              setTimeout(() => { this.$router.push("/") }, 2000);
                         }
                    });
          },
          generarEnlace(idEmpleado) {
               return "/recursos_humanos/empleado_modificar/" + idEmpleado;
          },
     },
     watch: {
          listaEmpleados: function (newValue, oldValue) {
               console.log("cambio el valor de la lista");
          }
     }
}
</script>
<style scoped>
.buttonColor {
     background-color: #4F46E5;
}
</style>