<template>
    <Transition name="modal">
        <div v-if="show" class="modal-mask bg-white">
            <div class="modal-container">
                <h1 class="text-2xl font-bold mb-6 text-center">Registrar Pedido a Domicilio</h1>
                <div class="mb-4 flex flex-row items-center">
                    <label class="basis-1/2" for="fecha_pedido">Confirmar pedido con fecha: </label>
                    <div class="basis-1/2 flex flex-row items-center">
                        <svg class="mr-2" width="30px" height="30px" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M3 9H21M7 3V5M17 3V5M6 12H8M11 12H13M16 12H18M6 15H8M11 15H13M16 15H18M6 18H8M11 18H13M16 18H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"
                                stroke="#5a5a5a" stroke-width="2" stroke-linecap="round" />
                        </svg>
                        <input v-if="activeTab == 0"
                            class="basis-3/5 px-3 py-2 border-gray-300 text-gray-500 rounded-md focus:outline-none focus:border-indigo-500"
                            type="date" disabled id="fecha_pedido" name="fecha_pedido" :value="fecha"/>
                        <input v-else
                            class="basis-3/5 px-3 py-2 border-gray-300 text-gray-500 rounded-md focus:outline-none focus:border-emerald-500"
                            type="date" disabled id="fecha_pedido" name="fecha_pedido" :value="fecha" />
                    </div>
                </div>
                <div v-if="activeTab == 0">
                    <div class="mb-4">
                        <h3 class="text-xl text-indigo-500 font-bold mb-6 text-center">Consumidor Final</h3>
                    </div>
                    <div class="text-center">
                        <button @click="registrar()"
                            class="bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300">Guardar</button>
                        <button id="btnCancelar" @click="$emit('close')"
                            class="ml-4 py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200">
                            Cancelar</button>
                    </div>
                </div>
                <div v-else>
                    <div class="mb-4">
                        <h3 class="text-xl text-emerald-500 font-bold mb-6 text-center">Crédito Fiscal</h3>
                    </div>
                    <div class="text-center">
                        <button @click="registrar()"
                            class="bg-emerald-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-emerald-600 transition duration-300">Guardar</button>
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

export default {
    data() {
        return {
        }
    },
    props: {
        show: Boolean,
        fecha: String,
        activeTab: Boolean,
    },
    mounted() {
    },
    methods: {
        registrar(){
            this.$emit('save');
            this.$emit('close');
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
    width: 500px;
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

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

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
