<script setup>
import NavBar from '@/components/NavBar.vue'
import { CalendarIcon } from '@heroicons/vue/24/outline'
import { RouterLink } from 'vue-router'
</script>

<template>
  <main>
    <NavBar></NavBar>
    <div class="bg-slate-100 pb-4 min-h-screen grid">
      <div>
        <div class="flex bg-white mx-auto p-5 shadow-md justify-between">
          <h1 class="font-bold text-blue-700 text-xl">Control de asistencia</h1>
        </div>
        <div class="flex justify-start items-center mt-4 ml-4">
          <a
            href="#"
            @click="$router.go(-1)"
            class="text-sm text-black font-medium flex items-center"
          >
            <img src="@/assets/icons/arrow.svg" alt="Regresar" class="h-6 w-6 mr-1" /> Regresar
          </a>
        </div>
      </div>
      <div class="grid place-items-center h-max w-full">
        <div class="container grid grid-cols-12 m-auto py-4">
          <div class="col-span-12 md:col-span-4 w-full m-4 px-8">
            <div class="pa-4">
              <div class="mb-4">
                <h3 class="text-center text-2xl">Usuario</h3>
              </div>
              <div class="bg-white text-center rounded-md shadow p-6">
                <div>
                  <span class="font-bold text-lg"
                    >{{ empleado.nombre }} {{ empleado.apellido }}</span
                  >
                </div>
                <div class="">
                  <span>{{ empleado.cargo }}</span>
                </div>
                <div class="flex flex-col px-4 py-6">
                  <div class="flex flex-col text-center justify-center align-middle mb-4">
                    <div class="w-full justify-center">
                      <CalendarIcon class="inline-block h-8 w-8"></CalendarIcon>
                    </div>
                    <span class="font-semibold">{{ getFechaSpanish(fecha) }}</span>
                  </div>
                  <button
                    v-if="!asistenciaMarcada && !isGerente"
                    type="button"
                    @click="marcarAsistencia"
                    class="bg-blue-500 hover:bg-blue-700 text-white rounded px-2 py-2 my-2"
                  >
                    Marcar asistencia
                  </button>
                  <div v-if="asistenciaMarcada && !isGerente" class="text-center justify-center text-green-500">
                    <div class="flex justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-8 h-8"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <span class="text-black">Ya has marcado asistencia para este día.</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="px-4 py-16 justify-center w-full text-center flex flex-col">
              <div class="justify-items-center grid w-full text-center">
                <RouterLink
                  to="/gestion-de-incapacidades"
                  class="bg-emerald-500 hover:bg-emerald-700 text-white w-36 rounded px-2 py-2 my-2"
                >
                  Incapacidades
                </RouterLink>
                <RouterLink
                  to="/gestion-de-ausencias"
                  class="bg-indigo-700 hover:bg-indigo-900 text-white w-36 rounded px-2 py-2 my-2"
                >
                  Justificaciones
                </RouterLink>
              </div>
            </div>
          </div>

          <div class="col-span-12 md:col-span-8 px-8 w-full m-auto">
            <div class="mb-4">
              <h3 class="text-center text-2xl">Historial de asistencias</h3>
            </div>
            <div class="bg-white text-center p-4 rounded-md shadow">
              <FullCalendar :options="calendarOptions"></FullCalendar>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ModalJustificar v-if="showModal" @recargar="getAsistencias" titulo="Justificar ausencia" v-model="showModal" :ausencia="ausenciaSelected"></ModalJustificar>

  </main>
</template>

<script>
import axios from 'axios'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import esLocale from '@fullcalendar/core/locales/es'
import { useToast } from 'vue-toastification'
import moment from 'moment'
import ModalJustificar from '@/components/RecursosHumanos/JustificacionAusencias/ModalJustificar.vue'

const toast = useToast()

export default {
  components: {
    FullCalendar,
    ModalJustificar
  },
  data() {
    return {
      fecha: new Date(),
      datosAuth: null,
      id_empleado: null,
      empleado: {},
      asistencias: [],
      ausencias: [],
      asistenciaMarcada: false,
      mensajes: [],
      calendarOptions: {
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth',
        weekends: true,
        locale: esLocale,
        events: [],
        datesSet: this.handleRangeChange,
        eventClick: this.handleEventClick
      },
      fechaInicio: moment().format('YYYY-MM-01'),
      fechaFin: moment().format('YYYY-MM-31'),
      showModal: false,
      ausenciaSelected: null,
      isGerente: false
    }
  },
  created() {
    if (localStorage.authUser) {
      this.datosAuth = JSON.parse(localStorage.authUser)
      this.id_empleado = this.datosAuth.user.id_empleado
      this.isGerente = this.datosAuth.user.roles[0].name == 'Gerente'
    }
  },
  methods: {
    getFechaSpanish(fecha) {
      const meses = [
        'enero',
        'febrero',
        'marzo',
        'abril',
        'mayo',
        'junio',
        'julio',
        'agosto',
        'septiembre',
        'octubre',
        'noviembre',
        'diciembre'
      ]
      const dias_semana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
      return (
        dias_semana[fecha.getDay()] +
        ', ' +
        fecha.getDate() +
        ' de ' +
        meses[fecha.getMonth()] +
        ' de ' +
        fecha.getUTCFullYear()
      )
    },
    marcarAsistencia() {
      axios
        .post('/api/asistencia')
        .then(
          (response) => (
            (this.mensajes = response.data.mensaje),
            this.watchToast('success', response.data.mensaje),
            this.getAsistencias()
          )
        )
    },
    getAsistencias() {
      this.watchLoader(true)
      this.asistencias.splice(0, this.asistencias.length)
      axios
        .get('/api/asistencia?fechaInicio=' + this.fechaInicio + '&fechaFin=' + this.fechaFin)
        .then(
          (response) => (
            (this.empleado = response.data.empleado),
            (this.asistencias = response.data.asistencias),
            console.log(this.asistencias),
            this.setAsistenciasInCalendar()
          )
        )
        .catch((error) => {
          console.log(error)
          this.watchToast('error', 'Ocurrió un error al obtener los registros de asistencia')
        })
        .finally(() => {
          this.getAusencias()
        })
    },
    getAusencias() {
      this.ausencias = []
      axios
        .get(
            '/api/ausencias/empleado?fechaInicio=' +
            this.fechaInicio +
            '&fechaFin=' +
            this.fechaFin
        )
        .then(
          (response) => (
            console.log(response.data, 'ausencias'),
            (this.ausencias = response.data.data),
            this.setAusenciasInCalendar()
          )
        )
        .catch((error) => {
          console.log(error)
          this.watchToast('error', 'Ocurrió un error al obtener los registros de ausencias')
        })
        .finally(() => {
          this.watchLoader(false)
        })
    },
    setAsistenciasInCalendar() {
      let today = moment().format('YYYY-MM-D')
      let calendario = this.calendarOptions
      calendario.events.splice(0, calendario.events.length)
      this.asistencias.forEach((element) => {
        let fecha = {
          title: '',
          start: element.fecha,
          color: '#7233D9'
        }
        calendario.events.push(fecha)
        if (today == element.fecha) {
          this.asistenciaMarcada = true
        }
      })
    },
    setAusenciasInCalendar() {
      let calendario = this.calendarOptions
      this.ausencias.forEach((element) => {
        let title = ''
        let color = ''
        if (element?.justificacion_ausencia) {
          const estado = element?.justificacion_ausencia?.estado?.nombre
          estado == 'Aprobado'
            ? (color = '#3CA745')
            : estado == 'Rechazado'
            ? (color = 'red')
            : (color = '#30A2D3')
          title = estado
        } else {
          title = 'Ausencia'
          color = '#FEBD15'
        }
        let ausencia = {
          title: title,
          start: element.fecha_ausencia,
          ausencia: element,
          color: color
        }
        calendario.events.push(ausencia)
      })
    },
    handleEventClick(info) {
      if (info.event.extendedProps.ausencia) {
        let ausencia = info.event.extendedProps.ausencia
        this.ausenciaSelected = ausencia
        this.showModal = true
        console.log('Es ausencia')
      } else {
        console.log('No es ausencia')
      }
    },
    handleRangeChange(info) {
      this.fechaInicio = moment(info.startStr).format('YYYY-MM-DD')
      this.fechaFin = moment(info.endStr).format('YYYY-MM-DD')
      this.getAsistencias()
      console.log(this.fechaInicio, this.fechaFin)
    }
  },
  watch: {
  }
}
</script>
