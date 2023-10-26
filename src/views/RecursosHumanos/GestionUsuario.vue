<script setup>
import api_url from "../../config";
import NavBar from "../../components/NavBar.vue";
import ModalUsuarioComponent from "../../components/RecursosHumanos/ModalUsuarioComponent.vue";
import ModalAgregarUsuarioComponent from "../../components/RecursosHumanos/ModalAgregarUsuarioComponent.vue";
import ModalConsultarUsuarioComponent from "../../components/RecursosHumanos/ModalConsultarUsuarioComponent.vue";
import ModalEliminarUsuarioComponent from "../../components/RecursosHumanos/ModalEliminarUsuarioComponent.vue";
</script>

<template>
    <NavBar />
    <main class="bg-gray-100">
        <div>
            <div class="flex bg-white mx-auto p-5 shadow-md justify-between">
                <h1 class="font-bold text-blue-700 text-xl">Gestión de Usuarios</h1>
                <div class="flex items-center rounded-[4.44px] bg-indigo-700 hover:bg-blue-700">
                        <button class="w-auto h-auto m-2 text-[13px] font-medium text-center text-white"
                            @click="abrirModalAgregar">
                            Agregar Usuario
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
                        <div class="md:w-[85%] w-auto p-4 mx-auto bg-white shadow rounded-md overflow-auto">
                              <table class="table w-full max-h-screen rounded-md">
                                   <thead class="border-b bg-slate-100">
                                        <tr class="text-center uppercase">
                                            <th class="px-6 py-4 text-xs text-gray-500 font-semibold">Nombre</th>
                                            <th class="px-6 py-4 text-xs text-gray-500 font-semibold">E-mail</th>
                                            <th class="px-6 py-4 text-xs text-gray-500 font-semibold">Cargo</th>
                                            <th class="px-6 py-4 text-xs text-gray-500 font-semibold">Acciones</th>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        <tr class=" border-b hover:bg-slate-100 hover:shadow" v-for="usuario in listaUsuarios" v-bind:key="usuario.id">
                                             <td class="cursor-pointer px-4 py-3 text-center hover:bg-gray-100"
                                                  @click="mostrarUsuario(usuario.id)">
                                                  <div class="">
                                                       <p class="font-semibold text-black">{{ usuario.name }}</p>
                                                  </div>
                                             </td>
                                            <td class="px-4 py-3 text-ms font-semibold text-center">{{ usuario.email }}</td>
                                            <td class="px-4 py-3 text-ms font-semibold text-center">{{ usuario.cargo }}</td>
                                            <td class="px-4 py-3 text-xs text-center">
                                                <button type="button"
                                                    class="py-2 px-4 m-2 focus:outline-none text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm bg-emerald-500 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                                    @click="modificarUsuario(usuario.id)">Editar</button>
                                                <button type="button"
                                                    class="py-2 px-4 m-2 :outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                                    @click="eliminarUsuario(usuario.id)">Eliminar</button>
                                            </td>
                                        </tr>
                                   </tbody>
                              </table>
                         </div>
               </section>
          </section>

        <Teleport to="body">
            <ModalUsuarioComponent v-if="controlModal" @cerrarModal="cerrarModal" :usuarioActual="usuarioParametro">
            </ModalUsuarioComponent>
        </Teleport>

        <Teleport to="body">
            <ModalAgregarUsuarioComponent v-if="controlModalAgregar" @cerrarModalAgregar="cerrarModalAgregar">
            </ModalAgregarUsuarioComponent>
        </Teleport>

        <Teleport to="body">
            <ModalEliminarUsuarioComponent v-if="controlModalEliminar" @cerrarModalEliminar="cerrarModalEliminar"
                :usuario="usuarioParametro">
            </ModalEliminarUsuarioComponent>
        </Teleport>

        <Teleport to="body">
            <ModalConsultarUsuarioComponent v-if="controlModalConsultar" @cerrarModalConsultar="cerrarModalConsultar"
                :usuario="usuarioParametro"></ModalConsultarUsuarioComponent>
        </Teleport>
    </main>
</template>

<script>
import axios from "axios";
import { ref } from "vue";

export default {
    data(){
        return {
            listaUsuarios: [],
            controlModal: ref(false),
            usuarioParametro: null,
            exitoTransaccion: false,
            mensajeTransaccion: "",
            controlModalAgregar: ref(false),
            controlModalConsultar: ref(false),
            controlModalEliminar: ref(false),
        }
    },
    created(){
        this.getUsuarios();
    },
    methods:{

        getUsuarios(){
            axios.get(api_url + '/usuarios').then(
                response => {
                    this.listaUsuarios = response.data
                }
            );
        },
        cerrarModal(esModificacion){
            if(esModificacion){
                this.getUsuarios();
                this.exitoTransaccion = true;
                this.mensajeTransaccion = "Se ha modificado el usuario correctamente";
                setTimeout(this.cambiarValorEstadoTransaccion, 5000);
            }
            this.controlModal = false;
        },
        setearUsuarioParametro(idUsuario){
            this.listaUsuarios.forEach(usuario => {
                if(usuario.id == idUsuario){
                    this.usuarioParametro = usuario;
                }
            });
        },
        modificarUsuario(idUsuario){
            console.log("El usuario es: " + idUsuario);
            this.setearUsuarioParametro(idUsuario);
            this.controlModal = true;
        },
        eliminarUsuario(idUsuario){
            this.setearUsuarioParametro(idUsuario);
            this.controlModalEliminar = true;
        },
        cerrarModalAgregar(guardadoConExito, nuevoUsuario){
            if (guardadoConExito && nuevoUsuario) {
                this.getUsuarios();
                this.exitoTransaccion = true;
                //this.mensajeTransaccion = "Se ha agregado el usuario correctamente";
                setTimeout(()=>{
                    this.exitoTransaccion = false;
                }, 4000);
            }
            this.controlModalAgregar = false;
        },
        abrirModalAgregar(){
            this.controlModalAgregar = true;
        },
        eliminarUsuarioLista(usuario){
            let posicion;
            console.log("El usuario es: " + usuario);
            posicion = this.listaUsuarios.findIndex(tempUsuario => tempUsuario.idUsuario === usuario);
            console.log("La posicion es: " + posicion);
            this.listaUsuarios.splice(posicion, 1);
            console.log(this.listaUsuarios);
        },
        cerrarModalEliminar(seElimino){
            if(seElimino){
                //this.eliminarUsuarioLista(usuario);
                this.getUsuarios();
                //this.mensajeTransaccion = "Se ha eliminado el usuario correctamente";
                this.exitoTransaccion = true;
                setTimeout(()=>{
                    this.exitoTransaccion = false;
                }, 4000);
            }
            this.controlModalEliminar = false;
        },
        mostrarUsuario(idUsuario){
            this.setearUsuarioParametro(idUsuario);
            this.controlModalConsultar = true;
        },
        cerrarModalConsultar(){
            this.controlModalConsultar = false;
        },
    }
}

</script>