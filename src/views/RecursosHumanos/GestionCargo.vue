<script setup>
import NavBar from "../../components/NavBar.vue";
import ModalCargoComponent from "../../components/RecursosHumanos/ModalCargoComponent.vue";
</script>

<template>
     <main>
          <NavBar/>
          <div class = "container mx-auto p-10 ">
               <h1 class="font-bold text-blue-700 text-2xl " >Gestión Cargos</h1>
          </div>

<section class="bg-gray-100">
               <!-- component -->
               <article>

               </article>
<section class="container mx-auto p-6 z-900">
     <Teleport to = "body"><div class="z-999 fixed top-36 left-0 right-0  p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert"
     v-if="exitoTransaccion">
     {{ mensajeTransaccion }}
     </div></Teleport>


  <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
    <div class="w-full overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase text-center">
            <th class="px-4 py-3">Nombre Cargo</th>
            <th class="px-4 py-3">Sueldo Cargo</th>
            <th class="px-4 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr class="text-gray-700" v-for="cargo in listaCargos" v-bind:key="cargo.id_cargo">
            <td class="px-4 py-3 text-center">
              <div class="">
                  <p class="font-semibold text-black">{{ cargo.nombre_cargo }}</p>
              </div>
            </td>
            <td class="px-4 py-3 text-ms font-semibold text-center">${{ cargo.salario_cargo }}</td>
            <td class="px-4 py-3 text-xs text-center">
               <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-emerald-500 dark:hover:bg-green-700 dark:focus:ring-green-800" @click="modificarCargo(cargo.id_cargo)">Editar</button>
               <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 ml-10">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
     </section>
</section>
     
<Teleport to="body">
          <ModalCargoComponent v-if="controlModal" @cerrarModal = "cerrarModal" :cargo = "this.cargoParametro"></ModalCargoComponent>
</Teleport>

     </main>
</template>

<script>
import axios from 'axios';
import {ref} from 'vue';
export default {
     data(){
          return{
               listaCargos:[],
               controlModal: ref(false),
               cargoParametro: null,
               exitoTransaccion: false,
               mensajeTransaccion:"",
          }
     },
     mounted(){
          this.getCargos();
     },
     methods: {
          getCargos(){
           axios.get('http://127.0.0.1:8000/api/cargos').then(
               response => {
                    this.listaCargos = response.data
               }
           );
          },
          cerrarModal(esModificacion){
               if(esModificacion){
                    this.getCargos();
                    this.exitoTransaccion = true;
                    this.mensajeTransaccion = "Se modifico el cargo exitosamente";
                    setTimeout(this.cambiarValorEstadoTransaccion,5000);
               }
               this.controlModal = false;
          },
          modificarCargo(idCargo){
               console.log("El cargo es : ", idCargo);
               this.listaCargos.forEach((tempCargo)=>{
                    if(tempCargo.id_cargo == idCargo){
                         this.cargoParametro = tempCargo;
                    }
               });
               this.controlModal = true;
          },
          cambiarValorEstadoTransaccion(){
               this.exitoTransaccion = false;
          }
     }
}
</script>
<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
}
</style>


