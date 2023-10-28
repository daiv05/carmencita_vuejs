<script setup>
import NavBar from '../../components/NavBar.vue'
import api_url from '../../config.js'
</script>

<template>
    <main>
        <NavBar></NavBar>
        <div class="bg-slate-100 pb-4 min-h-screen grid">

            <div>
                <div class="flex bg-white mx-auto p-5 shadow-md justify-between">
                    <h1 class="font-bold text-blue-700 text-xl">Historial de asistencia</h1>
                </div>
                <div class="flex justify-start items-center mt-4 ml-4">
                    <a href="#" @click="$router.go(-1)" class="text-sm text-black font-medium flex items-center">
                        <img src="../../assets/icons/arrow.svg" alt="Regresar" class="h-6 w-6 mr-1"> Regresar
                    </a>
                </div>
            </div>

            <section class="bg-gray-100">
                <section class="container mx-auto p-6 z-900">
                    <Teleport to="body">
                        <div class="z-999 fixed top-36 left-0 right-0  p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                            role="alert" v-if="exitoTransaccion">
                            {{ mensajeTransaccion }}
                        </div>
                    </Teleport>
                    <div class="md:w-[85%] w-auto p-4 mx-auto bg-white shadow rounded-md overflow-auto">
                        <table class="table w-full max-h-screen rounded-md">
                            <thead class="border-b bg-slate-100">
                                <tr class="text-center uppercase">
                                    <th class="px-6 py-4 text-xs text-gray-500 font-semibold">Nombre</th>
                                    <th class="px-6 py-4 text-xs text-gray-500 font-semibold">Cargo</th>
                                    <th class="px-6 py-4 text-xs text-gray-500 font-semibold">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="text-center" v-for="empleado in listaEmpleados"
                                    v-bind:key="empleado.id_empleado">
                                    <td class="px-4 py-3 text-ms font-semibold text-center">{{ empleado.primer_nombre }} {{ empleado.segundo_nombre }}</td>
                                    <td class="px-4 py-3 text-ms font-semibold text-center">{{ empleado.cargo }}</td>
                                    <td class="px-4 py-3 text-xs text-center">
                                        <RouterLink class="bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
                                        v-bind:to=" '/consultar_asistencia/' + empleado.id_empleado ">Consultar Asistencia
                                        </RouterLink>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </section>

        </div>
    </main>
</template>

<script>
import axios from 'axios';
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import esLocale from "@fullcalendar/core/locales/es";
import { useToast } from 'vue-toastification'

const toast = useToast();

export default {
    components: {
        FullCalendar
    },
    data() {
        return {
            listaEmpleados: [],
            fecha: new Date(),
            datosAuth: null,
            id_empleado: null,
            empleado: {},
            asistencias: [],
            mensajes: [],
            calendarOptions: {
                plugins: [dayGridPlugin],
                initialView: 'dayGridMonth',
                weekends: true,
                locale: esLocale,
                events: [
                    { title: 'Meeting', start: new Date() }
                ]
            }
        }
    },
    mounted() {
        if (localStorage.authUser) {
            this.datosAuth = JSON.parse(localStorage.authUser);
            this.id_empleado = this.datosAuth.user.id_empleado;
        }
        this.getAsistencias();
    },
    created() {
        this.obtenerListaEmpleados();
    },
    methods: {
        obtenerListaEmpleados() {
            axios.get(api_url + "/empleados")
                .then(
                    (response) => {

                        this.listaEmpleados = response.data.data;
                        console.log(this.listaEmpleados)
                    }
                )
                .catch((response) => {
                    console.log("Ocurrio un error al obtener los registros del servidor");
                    console.log(response);
                    if (response.response.data.tienePermiso === false) {
                        //alert(response.response.data.mensaje +" "+"este es el mensaje que se muestr");
                        this.showMessages(null,response.response.data.mensaje);
                        setTimeout(() => { this.$router.push("/") }, 2000);
                    }
                });
        },
        getFechaSpanish(fecha) {
            const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
            const dias_semana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
            return dias_semana[fecha.getDay()] + ', ' + fecha.getDate() + ' de ' + meses[fecha.getMonth()] + ' de ' + fecha.getUTCFullYear();
        },
        getAsistencias() {
            this.asistencias.splice(0, this.asistencias.length);
            axios.get(api_url + '/asistencia')
                .then(
                    response => (
                        this.empleado = response.data.empleado,
                        this.asistencias = response.data.asistencias,
                        this.setAsistenciasInCalendar()
                    )
                )
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