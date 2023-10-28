<script setup>
//import NavBar from '../../components/NavBar.vue'
import api_url from '../../config.js'
import { showMessages } from '../../components/functions.js'
</script>

<template>
    <Form :validation-schema="schema" ref="creditoForm" id="creditoForm" class="w-auto m-4" @submit="saveCredito">
        <!--Contenedor de inputs-->
        <div class="container bg-white shadow m-auto p-6 w-4/5 my-4">
            <div class="border-b border-gray-900/10 pb-12">
                <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 class="mt-2 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
                        Información del Crédito
                    </h2>
                </div>

                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="sm:col-span-3">
                        <label for="fecha_credito" class="block text-sm font-medium leading-6 text-gray-900">Fecha del
                            crédito</label>
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
                            crédito</label>
                        <div class="mt-2">
                            <Field v-model="credito.detalle_credito" name="detalle_credito" rules="required"
                                id="detalle_credito" type="text" placeholder="Ingresa los detalles del crédito"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                style="resize: vertical !important" />
                            <ErrorMessage name="detalle_credito" class="text-red-500 text-xs" />
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label for="monto_credito" class="block text-sm font-medium leading-6 text-gray-900">Monto</label>
                        <div class="mt-2">
                            <div class="mt-2 relative rounded-md shadow-sm">
                                <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    $
                                </span>
                                <Field name="monto_credito" rules="required" v-model="credito.monto_credito"
                                    id="monto_credito" type="number" min="0" placeholder="Ingresa el monto del crédito"
                                    class="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <span class="text-gray-700 sm:text-sm sm:leading-5"> USD </span>
                                </div>
                            </div>
                            <ErrorMessage name="monto_credito" class="text-red-500 text-xs" />
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label for="id_proveedor"
                            class="block text-sm font-medium leading-6 text-gray-900">Proveedor</label>
                        <div class="mt-2">
                            <Field as="select" required name="id_proveedor" id="id_proveedor" v-model="credito.id_proveedor"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                <option value="" selected disabled>Seleccionar...</option>
                                <option v-for="proveedor in proveedores" :key="proveedor.id" :value="proveedor.id">
                                    {{ proveedor.nombre_proveedor }}
                                </option>
                            </Field>
                            <ErrorMessage name="id_proveedor" class="text-red-500 text-xs" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--submit button-->
        <div class="flex items-center justify-center">
            <router-link to="/listar_creditos_proveedor"
                class="m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Cancelar
            </router-link>
            <button type="submit"
                class="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Registrar Crédito
            </button>
        </div>
    </Form>
</template>

<script>
import axios from 'axios'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { defineRule } from 'vee-validate'
import { useRoute } from 'vue-router'

function requerido(value){
    if(value){return true}
        return "*Campo requerido"
}
function seleccione(value){
    if(value){return true}
        return "Seleccione una opción"
}
const schema={
    fecha_credito: (value)=>{
        return requerido(value)
    },
    fecha_limite_pago:(value)=>{
        return requerido(value)
    },
    detalle_credito:(value)=>{
        return requerido(value)
    },
    monto_credito:(value)=>{
        return requerido(value)
    },
    id_proveedor:(value)=>{
        return seleccione(value)
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
                    fecha_credito: this.credito.fecha_credito,
                    fecha_limite_pago: this.credito.fecha_limite_pago,
                    monto_credito: this.credito.monto_credito,
                    detalle_credito: this.credito.detalle_credito,
                    id_proveedor: this.credito.id_proveedor,
                }
                axios.post(api_url + '/creditosProveedores', params).then(
                    (response) => {
                        response.data.message.forEach(mensaje => {
                            showMessages(response.data.status, mensaje);
                        });
                        this.$router.push('/listar_creditos_proveedor')
                        this.$router.go(1);
                    }
                ).catch((error) => {
                    error.response.data.message.forEach(mensaje => {
                        showMessages(error.response.data.status, mensaje);
                    });
                });
            }
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
