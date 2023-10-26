<script setup>
//import NavBar from '../../components/NavBar.vue'
import api_url from '../../config.js'
</script>

<template>
    <Form ref="promocionForm" id="promocionForm" class="w-auto m-4" @submit="saveAviso">
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
                style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1">
                <div class="modal bg-gray-800 text-white rounded-lg p-2 w-full max-w-2xl max-h-full m-auto">
                    <div name="modalHeader" class="text-green-400 flex m-2">
                        <span class="text-green-400 my-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </span>
                        <h1 class="m-2">Aviso registrado correctamente</h1>
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
                <div class="w-full text-center">
                    <h2 class="mt-2 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
                        Información del Aviso
                    </h2>
                </div>

                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="sm:col-span-3">
                        <label for="fecha_creacion" class="block text-sm font-medium leading-6 text-gray-900">
                            Fecha de inicio
                        </label>
                        <div class="mt-2">
                            <Field v-model="aviso.fecha_creacion" name="fecha_creacion" rules="required" id="fecha_creacion"
                                type="Date" placeholder="Ingresa tu primer nombre" autocomplete="given-name"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            <ErrorMessage name="fecha_creacion" class="text-red-500 text-xs" />
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label for="fecha_finalizacion" class="block text-sm font-medium leading-6 text-gray-900">
                            Fecha de finalización
                        </label>
                        <div class="mt-2">
                            <Field v-model="aviso.fecha_finalizacion" name="fecha_finalizacion" rules="required"
                                id="fecha_finalizacion" type="Date" placeholder="Ingresa tu primer nombre"
                                autocomplete="given-name"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            <ErrorMessage name="fecha_finalizacion" class="text-red-500 text-xs" />
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label for="titulo_aviso" class="block text-sm font-medium leading-6 text-gray-900">
                            Titulo del aviso
                        </label>
                        <div class="mt-2">
                            <Field v-model="aviso.titulo_aviso" name="titulo_aviso" rules="required" id="titulo_aviso"
                                type="text" placeholder="Ingresa el titulo del aviso"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                style="resize: vertical !important" />
                            <ErrorMessage name="titulo_aviso" class="text-red-500 text-xs" />
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label for="cuerpo_aviso" class="block text-sm font-medium leading-6 text-gray-900">
                            Cuerpo del aviso
                        </label>
                        <!--<Field type="" class="border border-slate-200 block w-[100%] rounded-[5px]" name="cuerpo"
                    :rules="validarTexto"/>-->
                        <Field as="textarea" name="cuerpo_aviso" id="cuerpo_aviso" cols="30" rows="1"
                            class="border border-slate-200 block w-[100%] rounded-[5px] shadow-md"
                            v-model="aviso.cuerpo_aviso" />
                        <ErrorMessage name="cuerpo_aviso" class="text-red-600" />
                    </div>

                    <div class="sm:col-span-3">
                        <label for="estado_aviso" class="block text-sm font-medium leading-6 text-gray-900">
                            Estado del aviso
                        </label>
                        <div class="mt-2">
                            <input type="radio" name="oculto" value="0" v-model="aviso.estado_aviso" id="oculto">
                            <label for="oculto" class="font-semibold">Oculto: </label>
                        </div>
                        <div class="mt-2">
                            <input type="radio" name="noOculto" value="1" v-model="aviso.estado_aviso" id="noOculto">
                            <label for="noOculto" class="font-semibold">No Oculto: </label>
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
                Guardar Aviso
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
            aviso: {
                fecha_creacion: '',
                fecha_finalizacion: '',
                titulo_aviso: '',
                cuerpo_aviso: '',
                estado_aviso: '1'
            },
            error: []
        }
    },
    mounted() {
        
        const route = useRoute()
        this.id = route.params.id
        
    },
    methods: {
        saveAviso(values) {
            if (this.createForm != null) {
                const params = {
                    fecha_creacion: this.aviso.fecha_creacion,
                    fecha_finalizacion: this.aviso.fecha_finalizacion,
                    titulo_aviso: this.aviso.titulo_aviso,
                    cuerpo_aviso: this.aviso.cuerpo_aviso,
                    estado_aviso: this.aviso.estado_aviso
                }
                axios.post(api_url + '/avisos', params).then((response) => {
                    this.error = showStatusModal(response.data['message'])
                    this.showMessageError = !response.data['status']
                    this.showMessageSuccess = response.data['status']
                    this.scroll()
                })
            }
        },
        scroll() {
            let submitMessage = document.getElementById('submitMessage')
            submitMessage.scrollIntoView(false)
        },
        clearForm() {
            this.showMessageSuccess = false
            this.showMessageError = false
            this.$refs.promocionForm.resetForm() // Usamos resetForm para limpiar el formulario
        }
    }
}
</script>

<style scope></style>
