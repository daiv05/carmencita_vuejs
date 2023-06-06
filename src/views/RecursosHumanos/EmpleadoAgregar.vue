<script setup>
import NavBar from '../../components/NavBar.vue'
//import empleadoForm from '../../components/RecursosHumanos/EmpleadoForm.vue'
</script>

<template>
    <NavBar></NavBar>
<Form ref="empleadoForm" class="w-auto m-4" @submit="saveEmpleado">
<div id="submitMessage" class="m-0 w-full h-fit p-0">
    <div class="container bg-white shadow m-auto w-4/5 my-4 max-w-md rounded-lg" v-if="showMessageError">
        <div class="modal bg-gray-800 text-white rounded-lg p-2  w-full max-w-2xl max-h-full m-auto" >
            <div name="modalHeader" class="text-red-400 flex m-2">
                <span class="text-red-400 my-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
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
                <button type="button" @click="showMessageSuccess = false" class="w-3/4 focus:outline-none text-white bg-red-400 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Aceptar</button>
            </div>
        </div>
    </div>

    <div class="container bg-white shadow m-auto w-4/5 my-4 max-w-md rounded-lg" v-if="showMessageSuccess">
        <div class="modal bg-gray-800 text-white rounded-lg p-2  w-full max-w-2xl max-h-full m-auto" >
            <div name="modalHeader" class="text-green-400 flex m-2">
                <span class="text-green-400 my-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </span>
                <h1 class="m-2">Registro guardado correctamente</h1>
            </div>
            <div class="w-full flex justify-center items-center my-2">
                <button type="button" @click="clearForm" class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Aceptar</button>
            </div>
        </div>
    </div>
</div>

        <div class="container bg-white shadow m-auto p-2 w-4/5 my-4">
            <h1 class="text-center font-bold">Datos personales</h1>
            <div class="flex">
                <div class="w-1/2 m-4">
                    <div class="mb-4">
                        <label class="font-bold text-gray-700 block mb-2" for="primer_nombre">Primer nombre:</label>
                        <Field name="primer_nombre" rules="required" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="empleado.primer_nombre" id="primer_nombre" type="text" placeholder="Ingresa tu primer nombre" />
                        <ErrorMessage name="primer_nombre" class="text-red-500 text-xs"/>
                    </div>
                    <div class="mb-4">
                        <label class="font-bold text-gray-700 block mb-2" for="primer_apellido">Primer apellido:</label>
                        <Field name="primer_apellido" rules="required" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="empleado.primer_apellido" id="primer_apellido" type="text" placeholder="Ingresa tu primer apellido" />
                        <ErrorMessage name="primer_apellido" class="text-red-500 text-xs"/>
                    </div>
                    <div class="mb-4">
                        <label class="font-bold text-gray-700 block mb-2" for="sexo">Sexo</label>
                        <Field as="select" name="sexo"  rules="" id="sexo" v-model="empleado.id_sexo" class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value="" selected>Seleccionar...</option>
                            <option v-for="sexo in sexos" :key="sexo.id_sexo" :value=sexo.id_sexo >{{ sexo.nombre_sexo }}</option>
                        </Field> 
                        <ErrorMessage name="sexo" class="text-red-500 text-xs"/>   
                    </div>
                    <div class="mb-4">
                        <label class="font-bold text-gray-700 block mb-2" for="estado_familiar">Estado familiar:</label>
                        <Field as="select" name="estado_familiar" rules="" id="estado_familiar" v-model="empleado.id_estado_familiar" class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value="" selected>Seleccione...</option>
                            <option v-for="est in estado_familiar" :key="est.id_estado_familiar" :value=est.id_estado_familiar >{{ est.nombre_estado_familiar }}</option>
                        </Field>
                        <ErrorMessage name="estado_familiar" class="text-red-500 text-xs"/>    
                    </div>
                    <div class="mb-4">
                        <label class="font-bold text-gray-700 block mb-2" for="domicilio">Domicilio</label>
                        <Field name="domicilio" rules="required" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="empleado.domicilio" id="domicilio" type="text" placeholder="Ingresa tu domicilio" />
                        <ErrorMessage name="domicilio" class="text-red-500 text-xs"/>
                    </div>
                </div>
                <div class="w-1/2 m-4">
                    <div class="mb-4">
                        <label class="font-bold text-gray-700 block mb-2" for="segundo_nombre">Segundo nombre:</label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="empleado.segundo_nombre" id="segundo_nombre" type="text" placeholder="Ingresa tu segundo nombre">
                    </div>
                    <div class="mb-4">
                        <label class="font-bold text-gray-700 block mb-2" for="segundo_apellido">Segundo apellido:</label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="empleado.segundo_apellido" id="segundo_apellido" type="text" placeholder="Ingresa tu segundo apellido">
                    </div>
                    <div class="mb-4">
                        <label class="font-bold text-gray-700 block mb-2" for="fecha_nacimiento">Fecha de Nacimiento:</label>
                        <Field name="fecha_nacimiento" rules="required" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="empleado.fecha_nacimiento" id="fecha_nacimiento" type="date" />
                        <ErrorMessage name="fecha_nacimiento" class="text-red-500 text-xs"/>
                    </div>
                    <div class="mb-4">
                        <label class="font-bold text-gray-700 block mb-2" for="profesion">Profesión u oficio:</label>
                        <Field name="profesion_oficio" rules="required" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="empleado.profesion_oficio" id="profesion" type="text" placeholder="Ingresa profesion u oficio"/>
                        <ErrorMessage name="profesion_oficio" class="text-red-500 text-xs"/>
                    </div>
                    <div class="mb-4">
                        <label class="font-bold text-gray-700 block mb-2" for="residencia">Residencia:</label>
                        <Field name="residencia" rules="required" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="empleado.residencia" id="residencia" type="text" placeholder="Ingresa tu residencia"/>
                        <ErrorMessage name="residencia" class="text-red-500 text-xs"/>
                    </div>
                </div>
            </div>
            <div class="flex">
                <div class="w-1/3 m-2">
                    <div class="mb-4">
                        <label class="font-bold text-gray-700 block mb-2" for="nacionalidad">Nacionalidad:</label>
                        <Field as="select" name="nacionalidad" rules="" id="nacionalidad" v-model="empleado.id_nacionalidad" class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option selected>Choose a country</option>
                            <option v-for="nac in nacionalidades" :key="nac.id_nacionalidad" :value=nac.id_nacionalidad>{{nac.nombre_nacionalidad}}</option>
                        </Field>
                        <ErrorMessage name="nacionalidad" class="text-red-500 text-xs"/>
                    </div>
                </div>
                <div class="w-1/3 m-2">
                    <div class="mb-4">
                        <label class="font-bold text-gray-700 block mb-2" for="tipo_documento">Tipo de documento:</label>
                        <select id="tipo_documento" class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option selected>Seleccione...</option>
                            <option value="1">Pasaporte</option>
                            <option value="2">DUI</option>
                        </select>    
                    </div>
                </div>
                <div class="w-1/3 m-2">
                    <div class="mb-4">
                        <label class="font-bold text-gray-700 block mb-2" for="numero_documento">Numero de documento:</label>
                        <Field name="dui" rules="required|dui" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="empleado.dui_empleado" id="dui_empleado" type="text" :rules="validateDUI" placeholder="Ingresa tu documento de identidad" />
                        <ErrorMessage name="dui" class="text-red-500 text-xs"/>
                    </div>
                </div>
            </div>
            <div class="flex">
                <div class="w-1/2 m-2">
                    <div class="mb-4">
                        <label class="font-bold text-gray-700 block mb-2" for="cargo">Cargo:</label>
                        <Field as="select" name="cargo" rules="" id="cargo" v-model="empleado.id_cargo" class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option selected>Seleccione...</option>
                            <option v-for="cargo in cargos" :key="cargo.id_cargo" :value= cargo.id_cargo > {{ cargo.nombre_cargo }}</option>
                        </Field>
                        <ErrorMessage name="cargo" class="text-red-500 text-xs"/>
                    </div>
                </div>
                <div class="w-1/2 m-2">
                    <div class="mb-4">
                        <label class="font-bold text-gray-700 block mb-2" for="telefono">Telefono:</label>
                        <Field name="telefono" rules="required" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="empleado.telefono" id="telefono" type="text" placeholder="Ingresa tu numero de telefono"/>
                        <ErrorMessage name="telefono" class="text-red-500 text-xs"/>
                    </div>
                </div>
            </div>
            
        </div>
        <div class="container bg-white shadow m-auto p-2 w-4/5 my-4">
        <h1 class="text-center font-bold">Datos del usuario</h1>
            <div class="mb-4 max-w-md mx-auto">
                <label class="font-bold text-gray-700 block mb-2" for="usuario">Usuario:</label>
                <Field name="usuario" rules="required" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="empleado.email" id="usuario" type="text" placeholder="Ingresa nombre de usuario" />
                <ErrorMessage name="usuario" class="text-red-500 text-xs"/>
            </div>
            <div class="mb-4 max-w-md mx-auto">
                <label class="font-bold text-gray-700 block mb-2" for="password">Contraseña:</label>
                <Field name="password" type="password" rules="required" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="empleado.password" id="password" placeholder="Ingresa una contraseña" />
                <ErrorMessage name="password" class="text-red-500 text-xs"/>
            </div>
            <div class="mb-4 max-w-md mx-auto">
                <label class="font-bold text-gray-700 block mb-2" for="password_confirm">Confirmar contraseña:</label>
                <Field name="confirm_password" type="password" rules="required|confirmed:@password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  id="password_confirm" placeholder="Confirma tu contraseña"/>
                <ErrorMessage name="confirm_password" class="text-red-500 text-xs"/>
            </div>
        </div>
        <div class="flex items-center justify-center">
            <button class=" m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Cancelar
            </button>
            <button class=" m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Enviar
            </button>
            </div>
    </form>
</template>

<script>
    import axios from 'axios';
    import { Form, Field, ErrorMessage } from 'vee-validate';
    import { defineRule } from 'vee-validate';

    //var showMessageError = false;
    //var showMessageSuccess = false;

    var submitMessage = document.getElementById('submitMessage');

    defineRule('required', value => {
        if (!value || !value.length) {
            return '*Campo requerido';
        }
        return true;
    });
    defineRule('dui', value=>{
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

    function showStatusModal(message){
        if(message.length == 0){
            return "Registro guardado correctamente";
        }
        else{
            return message;
        }
    }

    export default {
        components: {
            Form, 
            Field,
            ErrorMessage,
        },
        data(){
            return{
                showMessageError:null,
                showMessageSuccess:null,
                cargos:null,
                nacionalidades:null,
                sexos:null,
                estado_familiar:null,
                empleado:{
                    segundo_nombre:"",
                    primer_apellido:"",
                    segundo_apellido:"",
                    id_sexo:"",
                    primer_nombre:"",
                    fecha_nacimiento:"",
                    id_estado_familiar:"",
                    profesion_oficio:"",
                    domicilio:"",
                    residencia:"",
                    id_nacionalidad:"",
                    dui_empleado:"",
                    id_cargo:"",
                    telefono:"",
                    email:"",
                    password:""
                },
                error:[]
            }
        },
        mounted(){
            this.getNacionalidades();
            this.getCargos();
            this.getSexos();
            this.getEstadoFamiliar();
            //this.saveEmpleado();
        },
        methods:{
            getCargos(){
                axios.get('http://127.0.0.1:8000/api/cargos').then(
                    response => (
                        this.cargos = response.data
                    )
                );
            },

            getNacionalidades(){
                axios.get('http://127.0.0.1:8000/api/nacionalidades').then(
                    response => (
                        this.nacionalidades = response.data
                    )
                );
            },
            getSexos(){
                axios.get('http://127.0.0.1:8000/api/sexos').then(
                    response => (
                        this.sexos = response.data
                    )
                );
            },
            getEstadoFamiliar(){
                axios.get('http://127.0.0.1:8000/api/estado_familiar').then(
                    response => (
                        this.estado_familiar = response.data
                    )
                );
            },
            saveEmpleado(values){
                const params = {
                    segundo_nombre:this.empleado.segundo_nombre,
                    primer_apellido:this.empleado.primer_apellido,
                    segundo_apellido:this.empleado.segundo_apellido,
                    id_sexo:this.empleado.id_sexo,
                    primer_nombre:this.empleado.primer_nombre,
                    fecha_nacimiento:this.empleado.fecha_nacimiento,
                    id_estado_familiar:this.empleado.id_estado_familiar,
                    profesion_oficio:this.empleado.profesion_oficio,
                    domicilio:this.empleado.domicilio,
                    residencia:this.empleado.residencia,
                    id_nacionalidad:this.empleado.id_nacionalidad,
                    dui_empleado:this.empleado.dui_empleado,
                    id_cargo:this.empleado.id_cargo,
                    telefono:this.empleado.telefono,
                    email:this.empleado.email,
                    password:this.empleado.password
                }
                
                console.log(values,null,2);
                axios.post('http://127.0.0.1:8000/api/empleado',params).then(
                    response=> (
                       // console.log(response.data),
                        //alert(response.data['message']),
                        this.error = showStatusModal(response.data['message']),
                        this.showMessageError = !response.data['status'],
                        this.showMessageSuccess = response.data['status'],
                        this.scroll()
                    )
                )
            },
            scroll(){
                submitMessage = document.getElementById('submitMessage');
                submitMessage.scrollIntoView(false);
            },
            clearForm(){
                this.showMessageSuccess = false;
                document.location.reload();
            }
        }
    }
</script>

