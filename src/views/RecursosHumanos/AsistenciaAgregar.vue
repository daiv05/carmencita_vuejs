<script setup>
import { RouterLink } from 'vue-router';
import NavBar from '../../components/NavBar.vue'
import api_url from '../../config.js'
import { CalendarIcon } from '@heroicons/vue/24/outline'
import generarPlanilla from '../../components/RecursosHumanos/PlanillaGenerar.vue'

</script>

<template>
    <main>
        <NavBar></NavBar>
        <div class="bg-slate-100 pb-4 min-h-screen grid">
            <div>
                <div class="flex bg-white mx-auto p-5 shadow-md justify-between">
                    <h1 class="font-bold text-blue-700 text-xl">Registro de asistencia</h1>
                </div>
                <div class="flex justify-start items-center mt-4 ml-4">
                    <a href="#" @click="$router.go(-1)" class="text-sm text-black font-medium flex items-center">
                        <img src="../../assets/icons/arrow.svg" alt="Regresar" class="h-6 w-6 mr-1"> Regresar
                    </a>
                </div>
            </div>
            <div class="grid place-items-center h-max w-full">
                <div class="container grid lg:grid-cols-2 gap-4 max-w-5xl m-auto py-4">
                    <div class="col-span-1 w-full m-auto">
                        <div class="mb-4">
                            <h3 class="text-center text-2xl">Usuario</h3>
                        </div>
                        <div class="bg-white text-center rounded-md shadow p-6">
                            <div><span class="font-bold text-lg">{{ empleado.nombre }} {{ empleado.apellido }}</span></div>
                            <div class=""><span>{{ empleado.cargo }}</span></div>
                            <div class="flex flex-col px-4 py-6">
                                <div class=" flex flex-col text-center justify-center align-middle mb-4">
                                    <div class="w-full justify-center">
                                        <CalendarIcon class="inline-block h-8 w-8"></CalendarIcon>
                                    </div>
                                    <span class="font-semibold">{{ getFechaSpanish(fecha) }}</span>
                                </div>
                                <button v-if="!asistenciaMarcada" type="button" @click="marcarAsistencia"
                                    class="bg-blue-500 hover:bg-blue-700 text-white rounded px-2 py-2 my-2">Marcar
                                    asistencia</button>
                                <div v-if="asistenciaMarcada" class="text-center justify-center text-green-500">
                                    <div class="flex justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <span class="text-black">Ya has marcado asistencia para este día.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-span-1 w-full m-auto">
                        <div class="mb-4">
                            <h3 class="text-center text-2xl">Historial de asistencias</h3>
                        </div>
                        <div class="bg-white text-center p-4 rounded-md shadow">
                            <FullCalendar :options='calendarOptions'>
                            </FullCalendar>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import axios from 'axios';
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import esLocale from "@fullcalendar/core/locales/es";
import { useToast } from 'vue-toastification'
import moment from 'moment';

const fechaActual = new Date();
const toast = useToast();

export default {
    components: {
        FullCalendar
    },
    data() {
        return {
            fecha: new Date(),
            datosAuth: null,
            id_empleado: null,
            empleado: {},
            asistencias: [],
            asistenciaMarcada: false,
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
    methods: {
        getFechaSpanish(fecha) {
            const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
            const dias_semana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'S ábado'];
            return dias_semana[fecha.getDay()] + ', ' + fecha.getDate() + ' de ' + meses[fecha.getMonth()] + ' de ' + fecha.getUTCFullYear();
        },
        marcarAsistencia() {
            axios.post(api_url + '/asistencia')
                .then(
                    response => (
                        this.mensajes = response.data.mensaje,
                        this.showMessages(response.data.status, response.data.mensaje),
                        this.getAsistencias()
                    )
                )
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
        setAsistenciasInCalendar() {
            let today = moment().format('YYYY-MM-D');
            let calendario = this.calendarOptions;
            calendario.events.splice(0, calendario.events.length);
            this.asistencias.forEach(element => {
                let fecha = {
                    title: '',
                    start: element.fecha
                }
                calendario.events.push(fecha);
                if (today == element.fecha) {
                    this.asistenciaMarcada = true;
                }
            });
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