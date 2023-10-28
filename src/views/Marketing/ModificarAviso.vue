<template>
    <main class="bg-slate-50">
        <NavBar></NavBar>
        <div class="w-full">

            <div>
                <div class="flex bg-white mx-auto p-5 shadow-md justify-between">
                    <h1 class="font-bold text-blue-700 text-xl">Gestión de Avisos</h1>
                </div>
                <div class="flex justify-start items-center mt-4 ml-4">
                    <a href="#" @click="$router.go(-1)" class="text-sm text-black font-medium flex items-center">
                        <img src="../../assets/icons/arrow.svg" alt="Regresar" class="h-6 w-6 mr-1"> Regresar
                    </a>
                </div>
            </div>

        </div>

        <div class="m-auto p-1 pb-0 pt-4 w-4/5">
            <h2 class="font-bold text-lg mb-8">Modificar Aviso</h2>
        </div>

        <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 z-999 fixed top-20"
            role="alert" v-if="mensajeExito != ' '">
            <span class="font-medium">Mensaje de éxito!</span> {{ mensajeExito }}
        </div>
        <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 z-999 fixed top-20"
            role="alert" v-if="listaErrores">
            <p v-for="error in listaErrores">
                <span class="font-medium">Error</span> {{ error }}
            </p>
        </div>
        <Form @submit="enviarDatos($event)">
            <div class="grid grid-cols-10 gap-1 w-[80%] m-auto bg-white p-[2%] rounded-[2px] mt-[1%]" style="box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.1),
          0px 1px 2px 0 rgba(0, 0, 0, 0.06);">

                <div class="col-span-3 h-[100%]">
                    <div>
                        <label for="fecha_creacion" class="font-semibold ">Fecha Creacion</label>
                        <input type="date" id="fecha_creacion"
                            class="p-[5px] rounded-[5px] border border-slate-300 w-[100%]" disabled
                            v-model="fecha_creacion">
                    </div>
                    <div class="mt-[5%]">
                        <label for="fecha_finalizacion" class="font-semibold ">Fecha Finalización</label>
                        <Field type="date" name="fecha_finalizacion" id="fecha_finalizacion"
                            class="p-[5px] rounded-[5px] border border-slate-300 w-[100%]" :rules="validarFecha"
                            v-model="fecha_finalizacion" />
                        <ErrorMessage name="fecha_finalizacion" class="text-red-600" />
                    </div>
                    <div class="mt-[5%]">
                        <p class="text-[15px] font-semibold mt-[1%]">Estado del aviso</p>
                        <div class="mt-[5%]">
                            <input type="radio" name="oculto" value="0" v-model="estado_de_aviso" id="oculto">
                            <label for="oculto" class="font-semibold"> Oculto</label>
                        </div>
                        <div class="mt-[3%]">
                            <input type="radio" name="noOculto" value="1" v-model="estado_de_aviso" id="noOculto">
                            <label for="noOculto" class="font-semibold"> No oculto</label>
                        </div>
                    </div>
                </div>
                <div class="col-span-7">
                    <div class="ml-[10%]">
                        <p class="text-[20px] font-semibold">Titulo del aviso</p>
                        <Field type="text" class="border border-slate-200 block w-[100%] rounded-[5px] shadow-md"
                            name="titulo" :rules="validarTexto" v-model="titulo_aviso" />
                        <ErrorMessage name="titulo" class="text-red-600" />
                    </div>
                    <div class="ml-[10%] mt-[3%]">
                        <p class="text-[20px] font-semibold">Cuerpo del aviso</p>
                        <!--<Field type="" class="border border-slate-200 block w-[100%] rounded-[5px]" name="cuerpo"
                    :rules="validarTexto"/>-->
                        <Field as="textarea" name="cuerpo" id="description" cols="30" rows="7"
                            class="border border-slate-200 block w-[100%] rounded-[5px] shadow-md" :rules="validarTexto"
                            v-model="cuerpo_aviso" />
                        <ErrorMessage name="cuerpo" class="text-red-600" />
                    </div>

                    <div class="mt-[5%]">
                        <button type="button" @click="cancelarEdicion()"
                            class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Cancelar</button>
                        <input type="submit" id="btnEnviar"
                            class="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            value="Guardar Cambios">
                    </div>

                </div>
            </div>
        </Form>
    </main>
</template>
<script>
import axios from "axios";
import NavBar from '../../components/NavBar.vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import moment from 'moment';
import { DocumentIcon } from '@heroicons/vue/24/outline';

export default {
    components: {
        NavBar,
        Form,
        Field,
        ErrorMessage
    },
    data() {
        return {
            fecha_creacion: "",
            fecha_finalizacion: " ",
            estado_de_aviso: "1",
            titulo_aviso: " ",
            cuerpo_aviso: " ",
            mensajeExito: " ",
            listaErrores: null,
        }
    },
    created() {
        this.cargarDatos();
    },
    mounted() {
    },
    methods: {
        validarFecha(value) {
            if (!value) {
                return "Debe seleccionar una fecha de finalización";
            }
            if (moment(this.fecha_finalizacion).isBefore(moment(this.fecha_creacion))) {
                return "La fecha finalizacion debe ser mayor a la fecha de creación";
            }
            return true;
        },
        validarTexto(value) {
            if (!value) {
                return "Este campo no puede quedar vacio";
            }
            return true;
        },
        cargarDatos() {
            axios.get("/api/avisos/" + this.$route.params.idAviso).then(
                (response) => {
                    console.log(response);
                    this.fecha_creacion = response.data.fecha_creacion;
                    this.fecha_finalizacion = response.data.fecha_finalizacion;
                    this.estado_de_aviso = response.data.estado_aviso;
                    this.titulo_aviso = response.data.titulo_aviso;
                    this.cuerpo_aviso = response.data.cuerpo_aviso;
                }).catch((response) => {

                });
        },
        desactivarBotonEnviar() {
            let botonEnviar = document.getElementById("btnEnviar");
            botonEnviar.disabled = true;
        },
        activarBotonEnviar() {
            document.getElementById("btnEnviar").disabled = false;
        },
        parametrosConsulta() {
            let parametros = {};
            console.log("Fecha de finalizacion cuando entra:");
            console.log(this.fecha_finalizacion);
            parametros.fecha_finalizacion = this.fecha_finalizacion;
            console.log(this.fecha_finalizacion);
            parametros.estado_de_aviso = this.estado_de_aviso == "1" ? true : false;
            parametros.titulo_aviso = this.titulo_aviso;
            parametros.cuerpo_aviso = this.cuerpo_aviso;
            return parametros;
        },
        enviarDatos(event) {
            event.preventDefault;
            this.desactivarBotonEnviar();
            let parametros = this.parametrosConsulta();
            console.log(parametros);
            axios.put("/api/avisos/" + this.$route.params.idAviso, parametros)
                .then((response) => {
                    this.mensajeExito = response.data.message;
                    this.fecha_creacion = response.data.aviso.fecha_creacion;
                    this.fecha_finalizacion = response.data.aviso.fecha_finalizacion;
                    this.estado_de_aviso = response.data.aviso.estado_aviso ? "1" : "0";
                    this.titulo_aviso = response.data.aviso.titulo_aviso;
                    this.cuerpo_aviso = response.data.aviso.cuerpo_aviso;
                    console.log("Los resultados de la modificacion son: ");
                    console.log(response.data);
                    setTimeout(() => {
                        this.mensajeExito = " ";
                    }, 6000);
                    this.activarBotonEnviar();
                    console.log(this.estado_de_aviso);
                })
                .catch((response) => {
                    //                console.log(response.response.data.listaErrores);
                    this.listaErrores = response.response.data.listaErrores;
                    setTimeout(() => {
                        this.listaErrores = null;
                    }, 6000);
                    this.activarBotonEnviar();
                });
        },
        cancelarEdicion() {
            this.$router.push("/marketing/consultar_avisos");
        }

    }
}
</script>
<style>
body {
    background-color: rgb(248 250 252);
}
</style>