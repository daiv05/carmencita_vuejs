<script setup>
//
import api_url from '../../config.js';
</script>

<template>
    <Form ref="empleadoForm" id="empleadoForm" name="empleadoForm" class="w-auto m-4" @submit="saveEmpleado">
        <!--Mensajes de validacion-->
        <div id="submitMessage" class="m-0 w-full h-fit p-0">
            <div class="container bg-white shadow m-auto w-4/5 my-4 max-w-md rounded-lg" v-if="showMessageError">
                <div class="modal bg-gray-800 text-white rounded-lg p-2  w-full max-w-2xl max-h-full m-auto">
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
                            class="w-3/4 focus:outline-none text-white bg-red-400 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Aceptar</button>
                    </div>
                </div>
            </div>

            <div class="container bg-white shadow w-4/5 my-4 max-w-md rounded-lg fixed" v-if="showMessageSuccess"
                style="position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);">
                <div class="modal bg-gray-800 text-white rounded-lg p-2  w-full max-w-2xl max-h-full m-auto">
                    <div name="modalHeader" class="text-green-400 flex m-2">
                        <span class="text-green-400 my-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </span>
                        <h1 class="m-2">Registro guardado correctamente</h1>
                    </div>
                    <div class="w-full flex justify-center items-center my-2">
                        <button type="button" @click="clearForm"
                            class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Aceptar</button>
                    </div>
                </div>
            </div>
        </div>

        <!--Contenedor de inputs-->
        <div class="container bg-white shadow m-auto p-6 w-4/5 my-4">
            <div class="border-b border-gray-900/10 pb-12">
                <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 class="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Datos personales
                    </h2>
                </div>

                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="sm:col-span-3">
                        <label for="primer_nombre" class="block text-sm font-medium leading-6 text-gray-900">Primer
                            nombre</label>
                        <div class="mt-2">
                            <Field v-model="empleado.primer_nombre" name="primer_nombre" rules="required" id="primer_nombre"
                                type="text" placeholder="Ingresa tu primer nombre" autocomplete="given-name"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            <ErrorMessage name="primer_nombre" class="text-red-500 text-xs" />
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label for="segundo_nombre" class="block text-sm font-medium leading-6 text-gray-900">Segundo
                            nombre</label>
                        <div class="mt-2">
                            <Field v-model="empleado.segundo_nombre" name="segundo_nombre" id="segundo_nombre" type="text"
                                placeholder="Ingresa tu segundo nombre"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label for="primer_apellido" class="block text-sm font-medium leading-6 text-gray-900">Primer
                            apellido</label>
                        <div class="mt-2">
                            <Field v-model="empleado.primer_apellido" name="primer_apellido" rules="required"
                                id="primer_apellido" type="text" placeholder="Ingresa tu primer apellido"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            <ErrorMessage name="primer_apellido" class="text-red-500 text-xs" />
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label for="segundo_apellido" class="block text-sm font-medium leading-6 text-gray-900">Segundo
                            apellido</label>
                        <div class="mt-2">
                            <Field v-model="empleado.segundo_apellido" name="segundo_apellido" id="segundo_apellido"
                                type="text" placeholder="Ingresa tu segundo apellido" autocomplete="given-name"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label for="sexo" class="block text-sm font-medium leading-6 text-gray-900">Sexo</label>
                        <div class="mt-2">
                            <Field as="select" required name="sexo" id="sexo" v-model="empleado.id_sexo"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                <option value="" selected>Seleccionar...</option>
                                <option v-for="sexo in sexos" :key="sexo.id_sexo" :value="sexo.id_sexo">{{ sexo.nombre_sexo
                                }}</option>
                            </Field>
                            <ErrorMessage name="sexo" class="text-red-500" />
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label for="fecha_nacimiento" class="block text-sm font-medium leading-6 text-gray-900">Fecha de
                            nacimiento</label>
                        <div class="mt-2">
                            <Field v-model="empleado.fecha_nacimiento" name="fecha_nacimiento" rules="required"
                                id="fecha_nacimiento" type="Date" placeholder="Ingresa tu primer nombre"
                                autocomplete="given-name"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            <ErrorMessage name="fecha_nacimiento" class="text-red-500 text-xs" />
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label for="estado_familiar" class="block text-sm font-medium leading-6 text-gray-900">Estado
                            familiar</label>
                        <div class="mt-2">
                            <Field v-model="empleado.id_estado_familiar" as="select" name="estado_familiar"
                                id="estado_familiar"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                <option value="" selected>Seleccione...</option>
                                <option v-for="est in estado_familiar" :key="est.id_estado_familiar"
                                    :value=est.id_estado_familiar>{{ est.nombre_estado_familiar }}</option>
                            </Field>
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label for="profesion" class="block text-sm font-medium leading-6 text-gray-900">Profesión u
                            oficio</label>
                        <div class="mt-2">
                            <Field name="profesion_oficio" rules="required" v-model="empleado.profesion_oficio"
                                id="profesion" type="text" placeholder="Ingresa profesion u oficio"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            <ErrorMessage name="profesion_oficio" class="text-red-500 text-xs" />
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label for="domicilio" class="block text-sm font-medium leading-6 text-gray-900">Domicilio</label>
                        <div class="mt-2">
                            <Field name="domicilio" rules="required" v-model="empleado.domicilio" id="domicilio" type="text"
                                placeholder="Domicilio" autocomplete="given-name"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            <ErrorMessage name="domicilio" class="text-red-500 text-xs" />
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label for="residencia" class="block text-sm font-medium leading-6 text-gray-900">Residencia</label>
                        <div class="mt-2">
                            <Field name="residencia" rules="required" v-model="empleado.residencia" id="residencia"
                                type="text" placeholder="Ingresa tu residencia"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            <ErrorMessage name="residencia" class="text-red-500 text-xs" />
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label for="nacionalidad"
                            class="block text-sm font-medium leading-6 text-gray-900">Nacionalidad</label>
                        <div class="mt-2">
                            <Field v-model="empleado.id_nacionalidad" as="select" name="nacionalidad" id="nacionalidad"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                <option value="" selected>Seleccione...</option>
                                <option v-for="nac in nacionalidades" :key="nac.id_nacionalidad" :value=nac.id_nacionalidad>
                                    {{ nac.nombre_nacionalidad }}</option>
                            </Field>
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label for="dui_empleado" class="block text-sm font-medium leading-6 text-gray-900">DUI</label>
                        <div class="mt-2">
                            <Field type="text" maxlength="9" name="dui_empleado" rules="required|dui"
                                v-model="empleado.dui_empleado" id="dui_empleado"
                                placeholder="Ingresa tu numero de documento sin - "
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                oninput="this.value = this.value.replace(/[^0-9]/g, '')" />
                            <ErrorMessage name="dui_empleado" class="text-red-500 text-xs" />
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label for="cargo" class="block text-sm font-medium leading-6 text-gray-900">Cargo</label>
                        <div class="mt-2">
                            <Field as="select" name="cargo" id="cargo" v-model="empleado.id_cargo"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                <option value="" selected>Seleccione...</option>
                                <option v-for="cargo in cargos" :key="cargo.id_cargo" :value="cargo.id_cargo"> {{
                                    cargo.nombre_cargo }}</option>
                            </Field>
                            <ErrorMessage name="cargo" class="text-red-500 text-xs" />
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label for="telefono" class="block text-sm font-medium leading-6 text-gray-900">Teléfono</label>
                        <div class="mt-2">
                            <Field name="telefono" rules="required" v-model="empleado.telefono" id="telefono" type="text"
                                placeholder="Ingresa tu numero de telefono"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                maxlength="8" oninput="this.value = this.value.replace(/[^0-9]/g, '')" />
                            <ErrorMessage name="telefono" class="text-red-500 text-xs" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--Usuario-->
        <div class="container bg-white shadow m-auto w-4/5 my-4">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 class="pt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Datos del usuario
                </h2>
            </div>
            <div class="w-full text-center flex justify-center" v-if="!createForm">
                <router-link :to="{name:'gestion_usuarios'}"
                    class=" m-2 bg-purple-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Editar
                    usuarios</router-link>
            </div>
            <div class="w-full" v-if="createForm">
                <div class="flex min-h-full flex-col justify-center px-6 pt-4 pb-8 lg:px-8">
                    <div class="mt-auto sm:mx-auto sm:w-full sm:max-w-sm">
                        <div class="mb-4">
                            <label for="usuario" class="block text-sm font-medium leading-6 text-gray-900">Usuario</label>
                            <div class="mt-2">
                                <Field name="usuario" rules="required" v-model="empleado.email" id="usuario" type="text"
                                    placeholder="Ingresa nombre de usuario"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                <ErrorMessage name="usuario" class="text-red-500 text-xs" />
                            </div>
                        </div>

                        <div class="mb-4">
                            <div class="flex items-center justify-between">
                                <label for="password"
                                    class="block text-sm font-medium leading-6 text-gray-900">Contraseña</label>
                            </div>
                            <div class="mt-2">
                                <Field name="password" type="password" rules="required" v-model="empleado.password"
                                    id="password" placeholder="Ingresa una contraseña"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                <ErrorMessage name="password" class="text-red-500 text-xs" />
                            </div>
                        </div>

                        <div class="mb-4">
                            <div class="flex items-center justify-between">
                                <label for="password_confirm"
                                    class="block text-sm font-medium leading-6 text-gray-900">Confirmar contraseña</label>
                            </div>
                            <div class="mt-2">
                                <Field name="confirm_password" type="password" rules="required|confirmed:@password"
                                    id="confirm_password" placeholder="Confirma tu contraseña"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                <ErrorMessage name="confirm_password" class="text-red-500 text-xs" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--submit button-->
        <div class="flex items-center justify-center">
            <router-link to="/recursos_humanos/listar_empleados"
                class=" m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Cancelar
            </router-link>
            <button v-if="createForm" type="submit"
                class=" m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Registrar empleado
            </button>
            <button v-else type="submit"
                class=" m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Guardar Cambios
            </button>
        </div>

    </form>
</template>

<script>
import axios from 'axios';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { defineRule } from 'vee-validate';
import { useRoute } from 'vue-router';
import { showMessages } from '../../components/functions.js'
//var showMessageError = false;
//var showMessageSuccess = false;

var submitMessage = document.getElementById('submitMessage');

defineRule('required', (value) => {
    if (value) {
        return true
    }
    return "*Campo requerido"
});

defineRule('dui', value => {
    const regex = /^[0-9]{9}$/;
    if (!regex.test(value)) {
        return 'El DUI ingresado no es valido';
    }
    // All is good
    return true;
});

defineRule('confirmed', (value, [target]) => {
    if (value === target) {
        return true;
    }
    return 'Las contraseñas no coinciden';
});


export default {
    props: {
        createForm: null,
    },
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        return {
            id: 0,
            showMessageError: null,
            showMessageSuccess: null,
            cargos: null,
            nacionalidades: null,
            sexos: null,
            estado_familiar: null,
            empleado: {
                segundo_nombre: "",
                primer_apellido: "",
                segundo_apellido: "",
                id_sexo: "",
                primer_nombre: "",
                fecha_nacimiento: "",
                id_estado_familiar: "",
                profesion_oficio: "",
                domicilio: "",
                residencia: "",
                id_nacionalidad: "",
                dui_empleado: "",
                id_cargo: "",
                telefono: "",
                email: "",
                password: "",
                esta_activo: ""
            },
            error: []
        }
    },
    mounted() {
        this.getNacionalidades();
        this.getCargos();
        this.getSexos();
        this.getEstadoFamiliar();
        //this.saveEmpleado();
        const route = useRoute();
        this.id = route.params.id;
        if (this.createForm == null) {
            this.getEmpleado();
        }
    },
    methods: {
        getCargos() {
            axios.get(api_url + '/cargos').then(
                response => (
                    this.cargos = response.data
                )
            );
        },

        getNacionalidades() {
            axios.get(api_url + '/nacionalidades').then(
                response => (
                    this.nacionalidades = response.data
                )
            );
        },
        getSexos() {
            axios.get(api_url + '/sexos').then(
                response => (
                    this.sexos = response.data
                )
            );
        },
        getEstadoFamiliar() {
            axios.get(api_url + '/estado_familiar').then(
                response => (
                    this.estado_familiar = response.data
                )
            );
        },
        getEmpleado() {
            axios.get(api_url + '/empleado/' + this.id).then(
                response => (
                    this.empleado.segundo_nombre = response.data['segundo_nombre'],
                    this.empleado.primer_apellido = response.data['primer_apellido'],
                    this.empleado.segundo_apellido = response.data['segundo_apellido'],
                    this.empleado.id_sexo = response.data['id_sexo'],
                    this.empleado.primer_nombre = response.data['primer_nombre'],
                    this.empleado.fecha_nacimiento = response.data['fecha_nacimiento'],
                    this.empleado.id_estado_familiar = response.data['id_estado_familiar'],
                    this.empleado.profesion_oficio = response.data['profesion_oficio'],
                    this.empleado.domicilio = response.data['domicilio'],
                    this.empleado.residencia = response.data['residencia'],
                    this.empleado.id_nacionalidad = response.data['id_nacionalidad'],
                    this.empleado.dui_empleado = response.data['dui_empleado'],
                    this.empleado.id_cargo = response.data['id_cargo'],
                    this.empleado.telefono = response.data['telefono'],
                    this.empleado.esta_activo = response.data['esta_activo']
                )
            ).catch(error => {
                error.response.data.message.forEach(element => {
                    showMessages(error.response.data.status, element);
                });
            });
        },
        saveEmpleado(values) {
            //event.preventDefault(); 
            if (this.createForm != null) {
                //alert("Funcion de agregar");
                const params = {
                    segundo_nombre: this.empleado.segundo_nombre,
                    primer_apellido: this.empleado.primer_apellido,
                    segundo_apellido: this.empleado.segundo_apellido,
                    id_sexo: this.empleado.id_sexo,
                    primer_nombre: this.empleado.primer_nombre,
                    fecha_nacimiento: this.empleado.fecha_nacimiento,
                    id_estado_familiar: this.empleado.id_estado_familiar,
                    profesion_oficio: this.empleado.profesion_oficio,
                    domicilio: this.empleado.domicilio,
                    residencia: this.empleado.residencia,
                    id_nacionalidad: this.empleado.id_nacionalidad,
                    dui_empleado: this.empleado.dui_empleado,
                    id_cargo: this.empleado.id_cargo,
                    telefono: this.empleado.telefono,
                    email: this.empleado.email,
                    password: this.empleado.password
                }

                //console.log(values,null,2);
                axios.post(api_url + '/empleado', params).then(
                    (response) => {
                        response.data.message.forEach(mensaje => {
                            showMessages(response.data.status, mensaje);
                        });
                        this.$router.push('/recursos_humanos/listar_empleados')
                        this.$router.go(1);
                    }
                ).catch(
                    (error) => {
                        error.response.data.message.forEach(element => {
                            showMessages(error.response.data.status, element);
                        });
                    }
                )
            } else {
                //alert("Funcion de actualizar");

                const params = {
                    segundo_nombre: this.empleado.segundo_nombre,
                    primer_apellido: this.empleado.primer_apellido,
                    segundo_apellido: this.empleado.segundo_apellido,
                    id_sexo: this.empleado.id_sexo,
                    primer_nombre: this.empleado.primer_nombre,
                    fecha_nacimiento: this.empleado.fecha_nacimiento,
                    id_estado_familiar: this.empleado.id_estado_familiar,
                    profesion_oficio: this.empleado.profesion_oficio,
                    domicilio: this.empleado.domicilio,
                    residencia: this.empleado.residencia,
                    id_nacionalidad: this.empleado.id_nacionalidad,
                    dui_empleado: this.empleado.dui_empleado,
                    id_cargo: this.empleado.id_cargo,
                    telefono: this.empleado.telefono
                }

                //console.log(values,null,2);
                axios.put(api_url + '/empleado_update/' + this.id, params).then(
                    response => {
                        response.data.message.forEach(mensaje => {
                            showMessages(response.data.status, mensaje);
                        });
                        this.$router.push('/recursos_humanos/listar_empleados')
                        this.$router.go(1);
                    }
                ).catch((error) => {
                    error.response.data.message.forEach(element => {
                        showMessages(error.response.data.status, element);
                    });
                })
            }
        },
        scroll() {
            submitMessage = document.getElementById('submitMessage');
            submitMessage.scrollIntoView(false);
        },
        clearForm() {
            this.showMessageSuccess = false;
            this.showMessageError = false;
            //alert("hola")
            //document.location.reload();
            //this.$refs.empleadoForm.reset();
            document.getElementById("empleadoForm").reset();
        }
    }
}
</script>

<style scope></style>