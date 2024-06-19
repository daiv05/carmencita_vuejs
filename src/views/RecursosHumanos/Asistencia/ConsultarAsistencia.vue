<script setup>
import NavBar from '@/components/NavBar.vue'
import { CalendarIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <main>
    <NavBar></NavBar>
    <div class="bg-slate-100 pb-4 min-h-screen grid">
      <div>
        <div class="flex bg-white mx-auto p-5 shadow-md justify-between">
          <h1 class="font-bold text-blue-700 text-xl">Consulta de asistencia</h1>
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
          <div class="col-span-4 w-full m-auto px-16">



            <div class="mb-4">
              <h3 class="text-center text-2xl">Empleado</h3>
            </div>
            <div class="bg-white text-center rounded-md shadow p-6">
              <div>
                <span class="font-bold text-lg">{{ empleado.nombre }} {{ empleado.apellido }}</span>
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
              </div>
            </div>



            <div class="mt-8 mb-4">
              <h3 class="text-center text-2xl"></h3>
            </div>
            <div class="bg-white text-center rounded-md shadow p-6">
              <div>
                <span class="font-bold text-xl">{{ asistencias.length }}</span>
              </div>
              <div>
                <span>Asistencias</span>
              </div>
              <div>
                <span class="font-bold text-xl">{{ ausencias.length }}</span>
              </div>
              <div>
                <span>Ausencias</span>
              </div><div>
                <span class="font-bold text-xl">{{ 2 }}</span>
              </div>
              <div>
                <span>Incapacidades</span>
              </div>
            </div>



          </div>
          <div class="col-span-8 w-full m-auto">
            <div class="mb-4">
              <h3 class="text-center text-2xl">Historial de asistencias</h3>
            </div>
            <div class="bg-white text-center p-4 rounded-md shadow">
              <FullCalendar :options="calendarOptions"> </FullCalendar>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import esLocale from '@fullcalendar/core/locales/es'
import moment from 'moment'

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
      mensajes: [],
      calendarOptions: {
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth',
        weekends: true,
        locale: esLocale,
        events: [],
        datesSet: this.handleRangeChange,
      },
      fechaInicio: moment().format('YYYY-MM-01'),
      fechaFin: moment().format('YYYY-MM-31'),
      datosAuth: null,
      id_empleado: null,
      isGerente: false,
      ausencias: []
    }
  },
  created() {
    if (localStorage.authUser) {
      this.datosAuth = JSON.parse(localStorage.authUser)
      this.isGerente = this.datosAuth.user.roles[0].name == 'Gerente'
    }
  },
  mounted() {
    this.id_empleado = this.$route.params.id_empleado
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
    getAsistencias() {
      this.watchLoader(true)
      this.asistencias.splice(0, this.asistencias.length)
      axios
        .get(
          '/api/asistencia?fechaInicio=' +
            this.fechaInicio +
            '&fechaFin=' +
            this.fechaFin +
            '&id_empleado=' +
            this.$route.params.id_empleado
        )
        .then(
          (response) => (
            (this.empleado = response.data.empleado),
            (this.asistencias = response.data.asistencias),
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
            this.fechaFin +
            '&id_empleado=' +
            this.$route.params.id_empleado
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
      let calendario = this.calendarOptions
      calendario.events.splice(0, calendario.events.length)
      this.asistencias.forEach((element) => {
        let fecha = {
          title: '',
          start: element.fecha,
          color: '#7233D9'
        }
        calendario.events.push(fecha)
      })
    },
    setAusenciasInCalendar() {
      let calendario = this.calendarOptions
      this.ausencias.forEach((element) => {
        let title = ''
        let color = ''
        if (element?.justificacion_ausencia) {
          const estado = element?.justificacion_ausencia?.estado?.nombre
          let estadoM = ''
          estado == 'Aprobado'
            ? (color = '#3CA745', (estadoM = 'AU Aprobado'))
            : estado == 'Rechazado'
            ? (color = 'red', estadoM = 'AU Rechazado')
            : (color = '#30A2D3', (estadoM = 'AU Pendiente'))
          title = estadoM
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

    handleRangeChange(info) {
      this.fechaInicio = moment(info.startStr).format('YYYY-MM-DD')
      this.fechaFin = moment(info.endStr).format('YYYY-MM-DD')
      this.getAsistencias()
      console.log(this.fechaInicio, this.fechaFin)
    }
  }
}
</script>
