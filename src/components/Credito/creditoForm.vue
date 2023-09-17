<script setup>
//import NavBar from '../../components/NavBar.vue'
import api_url from '../../config.js'
</script>

<template>
    <Form ref="creditoForm" id="creditoForm" class="w-auto m-4" @submit="saveCredito">
        <!--Mensajes de validacion-->
        <div id="submitMessage" class="m-0 w-full h-fit p-0">
            <div class="container bg-white shadow m-auto w-4/5 my-4 max-w-md rounded-lg" v-if="showMessageError">
                <div class="modal bg-gray-800 text-white rounded-lg p-2 w-full max-w-2xl max-h-full m-auto">
                    <div name="modalHeader" class="text-red-400 flex m-2">
                        <span class="text-red-400 my-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                            </svg>
                        </span>
                        <h1 class="m-2">Se han identificado los siguientes errores:</h1>
                    </div>
                    <div name="modalBody" class="mx-5 my-3">
                        <ul class="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                            <li v-for="err in error">{{ err }}</li>
                        </ul>
                    </div>
                    <div class="w-full flex justify-center items-center my-2">
                        <button type="button" @click="showMessageError = false"
                            class="w-3/4 focus:outline-none text-white bg-red-400 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                            Aceptar
                        </button>
                    </div>
                </div>
            </div>

            <div class="container bg-white shadow w-4/5 my-4 max-w-md rounded-lg fixed" v-if="showMessageSuccess"
                style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1;">
                <div class="modal bg-gray-800 text-white rounded-lg p-2 w-full max-w-2xl max-h-full m-auto" >
                    <div name="modalHeader" class="text-green-400 flex m-2">
                        <span class="text-green-400 my-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </span>
                        <h1 class="m-2">Credito guardado correctamente</h1>
                    </div>
                    <div class="w-full flex justify-center items-center my-2">
                        <button type="button" @click="clearForm"
                            class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                            Aceptar
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!--Contenedor de inputs-->
        <div class="container bg-white shadow m-auto p-6 w-4/5 my-4">
            <div class="border-b border-gray-900/10 pb-12">
                <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 class="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Datos del credito
                    </h2>
                </div>

                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="sm:col-span-3">
                        <label for="fecha_credito" class="block text-sm font-medium leading-6 text-gray-900">Fecha del
                            credito</label>
                        <div class="mt-2">
                            <Field v-model="credito.fecha_credito" name="fecha_credito" rules="required" id="fecha_credito"
                                type="Date" placeholder="Ingresa tu primer nombre" autocomplete="given-name"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            <ErrorMessage name="fecha_credito" class="text-red-500 text-xs" />
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label for="fecha_limite_pago" class="block text-sm font-medium leading-6 text-gray-900">Fecha
                            limite de pago</label>
                        <div class="mt-2">
                            <Field v-model="credito.fecha_limite_pago" name="fecha_limite_pago" rules="required"
                                id="fecha_limite_pago" type="Date" placeholder="Ingresa tu primer nombre"
                                autocomplete="given-name"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            <ErrorMessage name="fecha_limite_pago" class="text-red-500 text-xs" />
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label for="detalle_credito" class="block text-sm font-medium leading-6 text-gray-900">Detalle del
                            credito</label>
                        <div class="mt-2">
                            <Field v-model="credito.detalle_credito" name="detalle_credito" rules="required"
                                id="detalle_credito" type="text" placeholder="Ingresa los detalles del credito"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                style="resize: vertical !important" />
                            <ErrorMessage name="detalle_credito" class="text-red-500 text-xs" />
                        </div>
                    </div>

                    <div class="sm:col-span-3" >
                        <label for="monto_credito" class="block text-sm font-medium leading-6 text-gray-900">Monto</label>
                        <div class="mt-2">
                            <div class="mt-2 relative rounded-md shadow-sm">
                                <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    $
                                </span>
                                <Field name="monto_credito" rules="required" v-model="credito.monto_credito" id="monto_credito"
                                    type="number" min="1" placeholder="Ingresa el mondto del credito"
                                    class="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <span class="text-gray-700 sm:text-sm sm:leading-5"> USD </span>
                                </div>
                            </div>
                            <ErrorMessage name="monto_credito" class="text-red-500 text-xs" />
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label for="id_proveedor" class="block text-sm font-medium leading-6 text-gray-900">Proveedor</label>
                        <div class="mt-2">
                            <Field as="select" required name="id_proveedor" id="id_proveedor" v-model="credito.id_proveedor"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                <option value="" selected>Seleccionar...</option>
                                <option v-for="proveedor in proveedores" :key="proveedor.id" :value="proveedor.id">
                                    {{ proveedor.nombre_proveedor }}
                                </option>
                            </Field>
                            <ErrorMessage name="id_proveedor" class="text-red-500" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--submit button-->
        <div class="flex items-center justify-center">
            <router-link to="/"
                class="m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Cancelar
            </router-link>
            <button type="submit"
                class="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Registrar Credito
            </button>
        </div>
    </Form>
</template>

<script>
import axios from 'axios'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { defineRule } from 'vee-validate'
import { useRoute } from 'vue-router'

defineRule('required', (value) => {
    if (!value || !value.length) {
        return '*Campo requerido'
    }
    return true
})

function showStatusModal(message) {
    if (message.length == 0) {
        return 'Registro guardado correctamente'
    } else {
        return message
    }
}

export default {
    props: {
        createForm: null
    },
    components: {
        Form,
        Field,
        ErrorMessage
    },
    data() {
        return {
            id: 0,
            showMessageError: false,
            showMessageSuccess: false,
            proveedores: null,
            credito: {
                fecha_credito: '',
                fecha_limite_pago: '',
                detalle_credito: '',
                monto_credito: '',
                id_proveedor: '',
            },
            error: []
        }
    },
    mounted() {
        this.getProveedores()
        const route = useRoute()
        this.id = route.params.id
        if (this.createForm == null) {
            this.getProveedores()
        }
    },
    methods: {
        getProveedores() {
            axios.get(api_url + '/proveedores').then((response) => (this.proveedores = response.data))
        },
        saveCredito(values) {
            if (this.createForm != null) {
                const params = {
                    fecha_credito:this.credito.fecha_credito,
                    fecha_limite_pago:this.credito.fecha_limite_pago,
                    monto_credito:this.credito.monto_credito,
                    detalle_credito:this.credito.detalle_credito,
                    id_proveedor:this.credito.id_proveedor,
                }
                axios.post(api_url + '/creditos', params).then(
                    (response) => {
                        this.error = showStatusModal(response.data['message']);
                        this.showMessageError = !response.data['status'];
                        this.showMessageSuccess = response.data['status'];
                        this.scroll();
                    }
                )
            }
        },
        scroll() {
            let submitMessage = document.getElementById('submitMessage');
            submitMessage.scrollIntoView(false);
        },
        clearForm() {
            this.showMessageSuccess = false;
            this.showMessageError = false;
            this.$refs.creditoForm.resetForm(); // Usamos resetForm para limpiar el formulario
        }
    }
}
</script>

<style scope></style>
