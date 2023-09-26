<template>
    <button v-if="credito.pendiente != 0" type="button" @click="isOpen = true"
        class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full m-1">Abonar</button>

        <span v-if="credito.pendiente == 0"
        class="bg-transparent hover:bg-blue-300 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full m-1 cursor-not-allowed">Abonar</span>

    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
        <div class="w-9/12 lg:w-2/4 p-6 bg-white rounded-md shadow-xl">
            <div class="flex justify-end">
                <svg @click="isOpen = false" xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-red-900 cursor-pointer"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <!--TITULO-->
            <div class="flex items-center justify-between">
                <h3 class="text-2xl text-center text-blue-700 w-full">Registrar abono</h3>
            </div>
            <div class="flex items-center m-2 justify-between">
                <h3 class="text-2xl text-center w-full">Credito {{ credito.id }} - {{ credito.proveedor.nombre_proveedor }}
                </h3>
            </div>
            <!--DETALLE DE CREDITO-->
            <div class="mt-4 text-center">
                <div class="">
                    <p class="mb-4 text-lg font-bold text-center">
                        Deuda Inicial: ${{ credito.monto_credito }}
                    </p>
                </div>
                <div class="">
                    <p class="mb-4 text-lg text-center">
                        {{ credito.detalle_credito }}
                    </p>
                </div>
                <div class="">
                    <p class="mb-4 text-lg font-bold text-center">
                        Deuda Pendiente: ${{ credito.pendiente }}
                    </p>
                </div>
                <div class="">
                    <p class="mb-4 text-md text-blue-700 font-bold text-center">
                        Nuevo Abono:
                    </p>
                </div>
                <div class="grid grid-cols-2 mb-4">
                    <div class="flex justify-center items-center">
                        <label class="mx-2 block text-sm font-medium leading-6 text-gray-900" for="fecha">Fecha</label>
                        <div class="">
                            <input v-model="fecha" type="Date" id="fecha"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                    </div>
                    <div class="flex justify-center align-middle items-center">
                        <label class=" mx-2 text-sm font-semibold leading-6 text-gray-900" for="fecha">Monto $</label>
                        <div class="w-fit">
                            <input v-model="monto" type="number" step="0.1" placeholder="0.00" max="100"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                    </div>
                </div>
                <div>
                    <button @click="isOpen = false"
                        class="px-6 py-2 text-gray-600 border-2 border-slate-300 rounded hover:font-semibold">
                        Cancel
                    </button>
                    <button class="px-6 py-2 ml-2 text-white bg-blue-500 hover:font-semibold hover:bg-blue-700 rounded"
                        @click="saveAbono()" type="button">
                        Guardar
                    </button>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import { RouterLink } from 'vue-router';
import api_url from '../../config.js';
import { useToast } from 'vue-toastification';
import moment from 'moment';

const toast = useToast();

export default {
    props: {
        url: null,
        credito: null,
        mensaje: null,
        index: null,
        lista: [],
    },
    data() {
        return {
            isOpen: false,
            estatus: false,
            monto: null,
            fecha: null,
        };
    },
    methods: {
        setFechaActual() {
            let fecha = new Date();
            this.fecha = moment(fecha).format('yyy-MM-DD');
        },
        saveAbono() {
            if (this.validarMontoAbono()) {
                const params = {
                    monto: this.monto,
                    fecha: this.fecha,
                    credito: this.credito.id
                }
                axios.post(api_url + '/abono_registrar', params)
                    .then(
                        response => (
                            this.respuesta = response.data.mensaje,
                            this.estatus = response.data.status,
                            this.showMessages(this.estatus, this.respuesta),
                            this.credito.pendiente = this.credito.pendiente - this.monto,
                            void(this.credito.abonos && this.credito.abonos.push(params)),//this.credito.abonos? this.credito.abonos.push(params): alert("hola"),
                            this.clearData(),
                            this.isOpen = false
                        )
                    )
                    .catch(error=>(
                        this.respuesta = error.response.data.mensaje,
                        this.estatus = error.response.data.status,
                        this.showMessages(this.estatus, this.respuesta)
                    ));
                //this.isOpen = false;
            }else{
                this.showMessages(false,'El abono no debe ser mayor que la deuda pendiente.')
            }
        },
        validarMontoAbono() {
            if (this.monto > this.credito.pendiente) {
                return false;
            }else{
                return true;
            }
        },
        clearData() {
            this.monto = null;
            this.setFechaActual();
        },
        showMessages(tipo, mensaje) {

            if (tipo) {
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
                toast.info(mensaje, {
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

    },
    mounted() {
        this.setFechaActual();
    }
}

</script>