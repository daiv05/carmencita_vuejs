<script setup>
import api_url from "../../config";
import NavBar from "../../components/NavBar.vue";
import ModalCargoComponent from "../../components/RecursosHumanos/ModalCargoComponent.vue";
import ModalAgregarCargoComponent from "../../components/RecursosHumanos/ModalAgregarCargoComponent.vue";
import ModalEliminarCargoComponenteVue from "../../components/RecursosHumanos/ModalEliminarCargoComponente.vue";
import ModalConsultarCargoComponent from "../../components/RecursosHumanos/ModalConsultarCargoComponent.vue";

</script>

<template>
     <NavBar />
     <main class="bg-gray-100">
          <div>
               <div class="flex bg-white mx-auto p-5 shadow-md justify-between">
                    <h1 class="font-bold text-blue-700 text-xl">Gestión de Cargos</h1>
                    <div class="flex items-center rounded-[4.44px] bg-indigo-700 hover:bg-blue-700">
                         <button class="w-auto h-auto m-2 text-[13px] font-medium text-center text-white"
                              @click="abrirModalAgregar">
                              Agregar Cargo
                         </button>
                    </div>
               </div>
               <div class="flex justify-start items-center mt-4 ml-4">
                    <a href="#" @click="$router.go(-1)" class="text-sm text-black font-medium flex items-center">
                         <img src="../../assets/icons/arrow.svg" alt="Regresar" class="h-6 w-6 mr-1"> Regresar
                    </a>
               </div>
          </div>

          <section class="bg-gray-100">
               <section class="container mx-auto p-6 z-900">
                    <Teleport to="body">
                         <div class="z-999 fixed top-36 left-0 right-0  p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                              role="alert" v-if="exitoTransaccion">
                              {{ mensajeTransaccion }}
                         </div>
                    </Teleport>
                         <div class="md:w-[85%] w-auto p-4 mx-auto bg-white shadow rounded-md overflow-auto">
                              <table class="table w-full max-h-screen rounded-md">
                                   <thead class="border-b bg-slate-100">
                                        <tr
                                             class="text-center uppercase">
                                             <th class="px-6 py-4 text-xs text-gray-500 font-semibold">Cargo</th>
                                             <th class="px-6 py-4 text-xs text-gray-500 font-semibold">Sueldo ($)</th>
                                             <th class="px-6 py-4 text-xs text-gray-500 font-semibold">Acciones</th>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        <tr class=" border-b hover:bg-slate-100 hover:shadow" v-for="cargo in listaCargos" v-bind:key="cargo.id_cargo">
                                             <td class="cursor-pointer px-4 py-3 text-center hover:bg-gray-100"
                                                  @click="mostrarCargo(cargo.id_cargo)">
                                                  <div class="">
                                                       <p class="font-semibold text-black">{{ cargo.nombre_cargo }}</p>
                                                  </div>
                                             </td>
                                             <td class="px-4 py-3 text-ms font-semibold text-center">${{ cargo.salario_cargo
                                             }}</td>
                                             <td class="px-4 py-3 text-xs text-center">
                                                  <button type="button"
                                                       class="py-2 px-4 m-2 focus:outline-none text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm bg-emerald-500 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                                       @click="modificarCargo(cargo.id_cargo)">Editar</button>
                                                  <button type="button"
                                                       class="py-2 px-4 m-2 :outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                                       @click="eliminarCargo(cargo.id_cargo)">Eliminar</button>
                                             </td>
                                        </tr>
                                   </tbody>
                              </table>
                         </div>
               </section>
          </section>

          <Teleport to="body">
               <ModalCargoComponent v-if="controlModal" @cerrarModal="cerrarModal" :cargo="cargoParametro">
               </ModalCargoComponent>
          </Teleport>

          <Teleport to="body">
               <ModalAgregarCargoComponent v-if="controlModalAgregar" @cerrarModalAgregar="cerrarModalAgregar">
               </ModalAgregarCargoComponent>
          </Teleport>

          <Teleport to="body">
               <ModalEliminarCargoComponenteVue v-if="controlModalEliminar" @cerrarModalEliminar="cerrarModalEliminar"
                    :cargo="cargoParametro"></ModalEliminarCargoComponenteVue>
          </Teleport>
          <Teleport to="body">
               <ModalConsultarCargoComponent v-if="controlModalConsultar" @cerrarModalConsultar="cerrarModalConsultar"
                    :cargo="cargoParametro"></ModalConsultarCargoComponent>
          </Teleport>

     </main>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import { useToast } from "vue-toastification";
const toast = useToast();
export default {
     data() {
          return {
               listaCargos: [],
               controlModal: ref(false),
               cargoParametro: null,
               exitoTransaccion: false,
               mensajeTransaccion: "",
               controlModalAgregar: ref(false),
               controlModalConsultar: ref(false),
               controlModalEliminar: ref(false),
          }
     },
     created() {
          this.getCargos();
     },
     methods: {
          getCargos() {
               axios.get(api_url + '/cargos').then(
                    response => {
                         this.listaCargos = response.data
                    }
               );
          },
          cerrarModal(esModificacion) {
               if (esModificacion) {
                    this.getCargos();
                    //this.exitoTransaccion = true;
                    //this.mensajeTransaccion = "Se modifico el cargo exitosamente";
                    //setTimeout(this.cambiarValorEstadoTransaccion, 5000);
                    toast.success("Se modifico el cargo exitosamente",{
                         timeout:4000,
                         position:"bottom-left",
                    });
               }
               this.controlModal = false;
          },
          setearCargoParmetro(idCargo) {
               this.listaCargos.forEach((tempCargo) => {
                    if (tempCargo.id_cargo == idCargo) {
                         this.cargoParametro = tempCargo;
                    }
               });
          },
          modificarCargo(idCargo) {
               console.log("El cargo es : ", idCargo);
               this.setearCargoParmetro(idCargo);
               this.controlModal = true;
          },
          eliminarCargo(idCargo) {
               this.setearCargoParmetro(idCargo);
               this.controlModalEliminar = true;
          },
          cambiarValorEstadoTransaccion() {
               this.exitoTransaccion = false;
          },
          cerrarModalAgregar(guardadoConExito, nuevoCargo) {
               if (guardadoConExito && nuevoCargo) {
                    this.listaCargos.push(nuevoCargo);
                    //this.exitoTransaccion = true;
                    //this.mensajeTransaccion = "Se agrego el cargo con exito";
                    toast.success("Se agrego el cargo con exito",{
                         timeout:4000,
                         position:"bottom-left",
                    });
               }
               this.controlModalAgregar = false;
          },
          abrirModalAgregar() {
               this.controlModalAgregar = true;
          },
          cerrarModalEliminar(seElimino, cargo) {
               if (seElimino) {
                    this.eliminarCargoLista(cargo);
                    //this.mensajeTransaccion = "Se Elimino el cargo exitosamente";
                    //this.exitoTransaccion = true;
                    toast.success("Se elimino el cargo exitosamente",{
                         timeout:4000,
                         position:"bottom-left",
                    });
               }
               this.controlModalEliminar = false;
          },
          eliminarCargoLista(cargo) {
               let posicion;
               console.log("La informacion del cargo es: ", cargo);
               posicion = this.listaCargos.findIndex(tempCargo => tempCargo.id_cargo === cargo);
               console.log("La posicion del cargo es: ", posicion);
               this.listaCargos.splice(posicion, 1);
               console.log(this.listaCargos);
          },
          mostrarCargo(id_cargo) {
               this.setearCargoParmetro(id_cargo);
               this.controlModalConsultar = true;
          },
          cerrarModalConsultar() {
               this.controlModalConsultar = false;
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


