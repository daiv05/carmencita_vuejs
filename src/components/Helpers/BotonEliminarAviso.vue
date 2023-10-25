
<template>
    <button type="button" @click="isOpen = true"
        class="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded-full m-1">Eliminar</button>

    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
        <div class="max-w-2xl p-6 bg-white rounded-md shadow-xl">
            <div class="flex justify-end">
                <svg @click="isOpen = false" xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-red-900 cursor-pointer"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <div class="flex items-center justify-between">
                <div class="w-full flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                </div>
            </div>
            <div class="flex items-center justify-between">
                <h3 class="text-2xl text-center w-full">{{ titulo }}</h3>
            </div>
            <div class="mt-4 text-center">
                <p class="mb-4 text-lg text-center">
                    {{ mensaje }}
                </p>
                <div>
                    <button @click="isOpen = false"
                        class="px-6 py-2 text-red-800 border border-red-500 rounded hover:font-semibold">
                        Cancel
                    </button>
                    <button class="px-6 py-2 ml-2 text-white bg-red-500 hover:font-semibold hover:bg-red-700 rounded"
                        @click="eliminarElemento()" type="button">
                        Aceptar
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

const toast = useToast();

export default {
    props: {
        url: null,
        titulo: null,
        mensaje: null,
        index: null,
        lista: [],
    },
    data() {
        return {
            isOpen: false,
            estatus: false,
            respuest: []
        };
    },
    methods: {
        eliminarElemento() {
            console.log(api_url + this.url);
            axios.delete(api_url + this.url)
                .then(
                    response => {
                        this.respuesta = response.data.mensaje,
                            this.estatus = response.data.respuesta,
                            this.showMessages(this.estatus, this.respuesta),
                            this.updateLista(response.data.respuesta)
                    }
                );
            this.isOpen = false;
        },
        updateLista(status) {
            if (status) {
                this.lista.splice(this.index, 1);
            }
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

    }
}

</script>