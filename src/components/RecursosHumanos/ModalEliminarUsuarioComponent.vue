<script setup>
import api_url from "../../config"
</script>

<template>
    <Transition name="modal">
        <div class="modal-mask bg-white">
            <div class="modal-container">
                <main>
                    <div class="mb-4">
                        <h1 class="text-2xl font-bold mb-6 text-left">Eliminar Usuario</h1>
                        <p>Nombre de Usuario</p>
                        <p class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            id="name" name="name"> {{ usuarioModificado.name }}</p>
                    </div>
                    <div class="mb-4">
                        <p>E-mail</p>
                        <p class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            id="email" name="email"> {{ usuarioModificado.email }}</p>
                    </div>
                    <div class="mb-4">
                        <p>Cargo</p>
                        <p class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            id="cargo" name="cargo">  {{ usuarioModificado.cargo }} </p>
                    </div>
                    <div class="text-center">
                        <button
                            class="bg-red-600 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
                            type="button" @click="eliminarUsuario">Eliminar</button>
                        <button id="btnCancelar"
                            class=" ml-4 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            @click="cancelar"> Cancelar</button>
                    </div>
                </main>
            </div>
        </div>
    </Transition>
</template>

<script>
//import { Field } from 'vee-validate';
import axios from 'axios';
import '../../assets/modal_default.css';
import { useToast} from "vue-toastification";

const toast = useToast();

//cambiar el nombre de las variables 
export default {
    components: {
        //Field,
    },
    data() {
        return {
            usuarioModificado: {},
            //empleado: {},
        }
    },
    //props: ["usuario"],
    props: {usuario: null},
    mounted() {
        this.cargarUsuarioModificado();
        //this.obtenerEmpleado();
    },
    methods: {
        /*cargarUsuarioModificado() {
            this.usuarioModificado = {
                id: this.usuario.id,
                name: this.usuario.name,
                email: this.usuario.email,
                password: this.usuario.password,
                id_empleado: this.usuario.id_empleado,
            };
        },*/
        cargarUsuarioModificado() {
            this.usuarioModificado = this.usuario;
            console.log(this.usuarioModificado);
        },
        cancelar() {
            this.$emit("cerrarModalEliminar", false, null);
        },
        /*obtenerEmpleado() {
            axios.get(api_url + "/empleados/" + this.usuario.id_empleado)
                .then(response => {
                    this.empleado = response.data.empleado
                })
                .catch(
                    error => {
                        console.log(error);
                    }
                );
        },*/
        eliminarUsuario() {
            console.log(this.usuario.id);
            axios.delete(api_url + "/usuarios/" + this.usuario.id).then(
                response => {
                    this.watch_toast("success", "Se ha eliminado el usuario correctamente");
                    if (response.data.status) {
                        this.$emit("cerrarModalEliminar", response.data.status);

                    }
                }
            ).catch(
                error => {
                    console.log(error);
                    this.mostrarMensajeError(error.response.data.message);
                }
            );
        },
        mostrarMensajeError(mensajes) {
            this.errorAlGuardar = true;
            this.mensajeConsulta = mensajes;
            mensajes.forEach(element => {
                this.watch_toast("error", element);
            });
        },
        watch_toast(tipo, mensaje) {
            if (tipo == "success") {
                toast.success(mensaje, {
                    position: "bottom-left",
                    timeout: 2994,
                    closeOnClick: true,
                    pauseOnFocusLoss: false,
                    pauseOnHover: false,
                    draggable: true,
                    draggablePercent: 0.27,
                    showCloseButtonOnHover: false,
                    hideProgressBar: true,
                    closeButton: "button",
                    icon: true,
                    rtl: false
                });
            } else {
                toast.error(mensaje, {
                    position: "bottom-left",
                    timeout: 2994,
                    closeOnClick: true,
                    pauseOnFocusLoss: false,
                    pauseOnHover: false,
                    draggable: true,
                    draggablePercent: 0.27,
                    showCloseButtonOnHover: false,
                    hideProgressBar: true,
                    closeButton: "button",
                    icon: true,
                    rtl: false
                });
            }
        },
    }
}
</script>