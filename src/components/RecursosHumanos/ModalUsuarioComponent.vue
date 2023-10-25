<script setup>
import api_url from "../../config";
</script>

<template>
    <Transition name="modal">
        <div class="modal-mask bg-white">
            <div class="modal-container">
                <Form @submit="guardarUsuario()">
                    

                    <h1 class="text-2xl font-bold mb-6 text-left">Editar Usuario</h1>
                    <div class="mb-4">
                        <p>Nombre</p>
                        <Field
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            type="text" id="name" name="nombre_Usuario" placeholder="Nombre Usuario" required="true"
                            v-model="name" />
                        <ErrorMessage name="nombre_usuario" />
                    </div>
                    <div class="mb-4">
                        <p>E-mail</p>
                        <Field
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            type="email" id="email" name="email" placeholder="E-mail" 
                            v-model="email" :rules="validarEmail" />
                        <ErrorMessage name="email" />
                    </div>
                    <!--<div class="mb-4">
                        <Field as="text" name="cargo" id="cargo"
                            v-model="cargo"
                            class="block mx-0 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            disabled />
                    </div>-->
                    <div class="text-center">
                        <button
                            class="bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300">Guardar</button>
                        <button id="btnCancelar" type="button"
                            class=" ml-4 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            @click="cerrarModal"> Cancelar</button>
                    </div>

                </Form>
            </div>
        </div>
    </Transition>
</template>
<script>
import axios from 'axios';
import { Field, ErrorMessage, Form } from 'vee-validate';
import { defineRule } from 'vee-validate';
import '../../assets/modal_default.css';
import { useToast} from "vue-toastification";

const toast = useToast();

defineRule('confirmed', (value, [target]) => {
    if (value === target) {
        return true;
    }
    return 'Las contraseñas no coinciden';
});

export default {
    components: {
        Field,
        ErrorMessage,
    },
    data() {
        return {
            errorAlGuardar: false,
            mensajeConsulta: "",
            name: "",
            email: "",
            password: "",
            password2: "",
            listaEmpleados: [],
            usuario: {
                name: "",
                email: "",
                id: "",
            },

        }
    },
    props: {usuarioActual: null},
    mounted() {  
        this.name = this.usuarioActual.name;
        this.email = this.usuarioActual.email;
        console.log(this.usuarioActual);
    },
    methods: {
        cerrarModal(event) {
            event.preventDefault();
            this.$emit("cerrarModal", false, null);
        },
        guardarUsuario() {
            this.usuario.name = this.name;
            this.usuario.email = this.email;
            this.usuario.id = this.usuarioActual.id;
            console.log(this.usuario);
            axios.post(api_url + "/usuarios/" + this.usuarioActual.id, this.usuario).then(
                response => {
                    this.watch_toast("success", "Se ha actualizado el usuario correctamente");
                    if (response.data.status) {
                        this.$emit("cerrarModal", true);
                    }
                }
            ).catch(
                error => {
                    console.log(error)
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
        validarCamposDeTexto(value) {
            if (!value) {
                return "Este campo no puede quedar vacío";
            }
            return true;
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