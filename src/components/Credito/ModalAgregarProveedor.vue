<template>
    <Transition name="modal">
        <div v-if="show" class="modal-mask bg-white">
            <div class="modal-container">
                <p class="text-xl font-bold mb-6 text-center">Registrar nuevo proveedor</p>
                <div class="mb-4">
                    <div class="grid grid-cols-2">
                        <div class="col-span-1">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="nombre">
                                Nombre
                            </label>
                            <input v-model="proveedor.nombre_proveedor" type="text" id="nombre"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Nombre">
                        </div>
                    </div>

                    <div class="grid grid-cols-2">
                        <!--NIT-->
                        <div class="col-span-1 mt-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="nit">
                                NIT
                            </label>
                            <input @input="formatear_nit(proveedor.nit_pr)" v-model="proveedor.nit_pr" type="text"
                                id="nit"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="NIT">
                        </div>
                        <div class="col-span-1 mt-4 w-[50%] ml-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="nrc">
                                NRC
                            </label>
                            <input @input="formatear_nrc(proveedor.nrc_pr)" v-model="proveedor.nrc_pr" type="text"
                                id="nrc"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="NRC">
                        </div>
                    </div>
                </div>
                <br>
                <div>
                    <div class="text-center">
                        <button @click="registrar_nuevo_proveedor()"
                            class="bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300">Confirmar</button>
                        <button id="btnCancelar" @click="$emit('close')"
                            class="ml-4 py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200">
                            Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script>
import api_url from "../../config";
import axios from 'axios';
import { useToast } from 'vue-toastification'

const toast = useToast();

export default {
    data() {
        return {
            proveedor: {
                nombre_proveedor: "",
                nit_pr: "",
                nrc_pr: "",
            }
        }
    },
    props: ['show'],
    watch: {
        show: function (newValue) {
            if (newValue) {
                this.limpiar_campos();
            }
        },
    },
    methods: {
        limpiar_campos() {
            this.proveedor = {
                nombre_proveedor: "",
                nit_pr: "",
                nrc_pr: "",
            }
        },
        registrar_nuevo_proveedor() {
            if (this.proveedor.nombre_proveedor == "" || this.proveedor.nrc_pr == "" || this.proveedor.nit_pr == "") {
                this.watch_toast("error", "Debe llenar todos los campos");
                return;
            }
            if (this.proveedor.nit_pr.length < 17) {
                this.watch_toast("error", "Ingrese un NIT válido");
                return;
            }
            if (this.proveedor.nrc_pr.length < 7) {
                this.watch_toast("error", "Ingrese un NRC válido");
                return;
            }
            axios.post(api_url + "/proveedor", this.proveedor)
                .then((res) => {
                    this.watch_toast("success", "Proveedor registrado exitosamente");
                    this.$emit('close');
                })
                .catch((err) => {
                    console.log(err);
                    this.watch_toast("error", "Ocurrió un error, vuelva a intentar");
                });
        },
        formatear_nit(input) {
            // NIT con formato 0000-000000-000-0
            let nitValue = input.replace(/[^\d]/g, '').slice(0, 14);
            let formattedNIT = '';
            if (nitValue.length > 4) {
                if (nitValue.length > 10) {
                    if (nitValue.length > 13) {
                        formattedNIT = nitValue.substring(0, 4) + "-" + nitValue.substring(4, 10) + "-" + nitValue.substring(10, 13) + "-" + nitValue.substring(13);
                    } else {
                        formattedNIT = nitValue.substring(0, 4) + "-" + nitValue.substring(4, 10) + "-" + nitValue.substring(10)
                    }
                } else {
                    formattedNIT = nitValue.substring(0, 4) + "-" + nitValue.substring(4);
                }
            } else {
                formattedNIT = nitValue;
            }
            this.proveedor.nit_pr = formattedNIT;
        },
        formatear_nrc(input) {
            let nrcValue = input.replace(/[^\d]/g, '').slice(0, 6);
            let formattedNRC = '';
            if (nrcValue.length > 5) {
                formattedNRC = nrcValue.substring(0, 5) + "-" + nrcValue.charAt(5);
            } else {
                formattedNRC = nrcValue;
            }
            this.proveedor.nrc_pr = formattedNRC;
        },
        //Mostrar Toast de exito o error
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
        }
    }
}
</script>

<style scoped>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    transition: opacity 0.3s ease;
}

.modal-container {
    width: 50%;
    margin: auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
}

.modal-default-button {
    float: right;
}

.modal-enter-from {
    opacity: 0;
}

.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>
