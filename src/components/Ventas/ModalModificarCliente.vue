<template>
    <Transition name="modal">
        <div v-if="show" class="modal-mask bg-white">
            <div class="modal-container">
                <p class="text-xl font-bold mb-6 text-center">Modificar cliente</p>
                <div class="mb-4">
                    <div class="grid grid-cols-2">
                        <div class="col-span-1">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="nombre">
                                Nombre
                            </label>
                            <input v-model="cliente.nombre_cliente" type="text" id="nombre"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Nombre">
                        </div>
                        <div class="col-span-1 ml-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="identificador">
                                Identificador
                            </label>
                            <input v-model="cliente.distintivo_cliente" type="text" id="identificador"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Identificador">
                        </div>
                    </div>

                    <div class="grid grid-cols-2">
                        <!--DUI-->
                        <div class="col-span-1 mt-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="dui">
                                DUI
                            </label>
                            <input @input="formatear_dui(cliente.dui_cliente)" v-model="cliente.dui_cliente" type="text"
                                id="dui"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="DUI">
                        </div>
                        <!--NIT-->
                        <div class="col-span-1 mt-4 ml-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="nit">
                                NIT
                            </label>
                            <input @input="formatear_nit(cliente.nit_cliente)" v-model="cliente.nit_cliente" type="text"
                                id="nit"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="NIT">
                        </div>
                    </div>

                    <div class="grid grid-cols-2">
                        <!--NRC-->
                        <div class="col-span-1 mt-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="nrc">
                                NRC
                            </label>
                            <input @input="formatear_nrc(cliente.nrc_cliente)" v-model="cliente.nrc_cliente" type="text"
                                id="nrc"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="NRC">
                        </div>
                        <!--Departamento-->
                        <div class="col-span-1 mt-4 ml-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="departamento">
                                Departamento
                            </label>
                            <select v-model="departamento_select" @change="actualizar_municipios()" name="departamento"
                                id="departamento"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                <option disabled>Seleccione...</option>
                                <option v-for="departamento in departamentos_listado" :key="departamento.id_departamento"
                                    :value="departamento.id_departamento">{{ departamento.nombre_departamento }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <div class="grid grid-cols-2">
                        <!--Municipio-->
                        <div class="col-span-1 mt-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="municipio">
                                Municipio
                            </label>
                            <select v-model="cliente.id_municipio" name="municipio" id="municipio"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                <option disabled>Seleccione...</option>
                                <option v-for="municipio in municipios_listado" :key="municipio.id_municipio"
                                    :value="municipio.id_municipio">{{ municipio.nombre_municipio }}
                                </option>
                            </select>
                        </div>
                        <!--Direccion-->
                        <div class="col-span-1 mt-4 ml-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="direccion">
                                Dirección
                            </label>
                            <input @input="limite_direccion(cliente.direccion_cliente)" v-model="cliente.direccion_cliente"
                                type="text" id="direccion"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Dirección">
                        </div>
                    </div>
                </div>
                <div>
                    <div class="text-center">
                        <button @click="modificar_cliente()"
                            class="bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300">Guardar Cambios</button>
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
            departamento_select: "Seleccione...",
            departamentos_listado: [],
            municipios_listado: [],
        }
    },
    props: ['show', 'cliente'],
    created() {
        this.get_departamentos();
    },
    watch: {
        show: function (newValue) {
            if (newValue) {
                this.get_departamentos();
            }
        },
    },
    methods: {
        get_departamentos() {
            axios.get(api_url + "/departamentos")
                .then((res) => {
                    this.departamentos_listado = res.data.datos;
                    this.departamentos_listado.map((departamento) => {
                        if (departamento.id_departamento == this.cliente.municipio.id_departamento) {
                            this.departamento_select = departamento.id_departamento;
                            this.actualizar_municipios();
                        }
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        actualizar_municipios() {
            axios.get(api_url + "/get_municipios?departamento=" + this.departamento_select)
                .then((res) => {
                    this.municipios_listado = res.data.datos;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        modificar_cliente() {
            if (this.cliente.nombre_cliente == "" || this.cliente.distintivo_cliente == "" || this.cliente.nrc_cliente == "" || this.cliente.direccion_cliente == "" || this.cliente.id_municipio == "Seleccione...") {
                this.watch_toast("error", "Debe llenar todos los campos");
                return;
            }
            if (this.cliente.dui_cliente == "" && this.cliente.nit_cliente == ""){
                this.watch_toast("error", "Debe ingresar al menos un DUI o NIT");
                return;
            }
            if (this.cliente.dui_cliente.length < 10 && this.cliente.dui_cliente.length > 0) {
                this.watch_toast("error", "Ingrese un DUI válido");
                return;
            }
            if (this.cliente.nit_cliente.length < 17 && this.cliente.nit_cliente.length > 0) {
                this.watch_toast("error", "Ingrese un NIT válido");
                return;
            }
            if (this.cliente.nrc_cliente.length < 7) {
                this.watch_toast("error", "Ingrese un NRC válido");
                return;
            }
            axios.put(api_url + "/clientes/" + this.cliente.id_cliente, this.cliente)
                .then((res) => {
                    this.watch_toast("success", "Cliente actualizado exitosamente");
                    this.$emit('close');
                })
                .catch((err) => {
                    console.log(err);
                    err.response.data.distintivo_exist ? this.watch_toast("error", "Ya existe un cliente con ese identificador") && document.getElementById("identificador").focus() : this.watch_toast("error", "Ocurrió un error al actualizar, vuelva a intentar");
                });
        },
        formatear_dui(input) {
            let duiValue = input.replace(/[^\d]/g, '').slice(0, 9);
            let formattedDUI = '';
            if (duiValue.length > 8) {
                formattedDUI = duiValue.substring(0, 8) + "-" + duiValue.charAt(8);
            } else {
                formattedDUI = duiValue;
            }
            this.cliente.dui_cliente = formattedDUI;
        },
        formatear_nit(input) {
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
            this.cliente.nit_cliente = formattedNIT;
        },
        formatear_nrc(input) {
            let nrcValue = input.replace(/[^\d]/g, '').slice(0, 6);
            let formattedNRC = '';
            if (nrcValue.length > 5) {
                formattedNRC = nrcValue.substring(0, 5) + "-" + nrcValue.charAt(5);
            } else {
                formattedNRC = nrcValue;
            }
            this.cliente.nrc_cliente = formattedNRC;
        },
        limite_direccion(input) {
            if (input.length > 50) {
                this.cliente.direccion_cliente = input.substring(0, 50);
            }
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
}</style>
