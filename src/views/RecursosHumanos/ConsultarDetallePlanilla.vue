<template>
  <main>
    <Navbar></Navbar>
    <div class="flex justify-between px-16 w-full bg-white" style="
        box-shadow: 0px 1.11px 3.329166889190674px 0 rgba(0, 0, 0, 0.1),
          0px 1.11px 2.219444513320923px 0 rgba(0, 0, 0, 0.06);
      ">
      <p class="mt-2 flex-grow-0 flex-shrink-0 w-[80%] text-[30px] font-semibold text-left text-[#3056d3]">
        Gestion Empleados
      </p>
    </div>

    <div
      class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 z-999 fixed top-20"
      role="alert" v-if="listaErrores" v-for="error in listaErrores">
      <span class="font-medium">Error:</span> {{ error }}
    </div>

    <div class=" w-11/12 my-4 mx-auto card bg-white border roundedm p-4">
      <div class="text-center m-4" v-if="listaDetallesPlanilla">
        <div v-if="listaDetallesPlanilla.detalles_planilla">
          <p class="font-bold text-xl">TIENDA Y DEPÓSITO CARMENCITA</p>
          <p class="text-lg flex justify-center align-middle items-center">
            PLANILLA DE SUELDO
            {{
              obtenerFechaFormateada(
                listaDetallesPlanilla.fecha_inicio,
                listaDetallesPlanilla.fecha_fin
              )
            }}
            DE
            {{ obtenerAnioFecha(listaDetallesPlanilla.fecha_fin) }}

            <span v-if="listaDetallesPlanilla.date_emision_boleta" style="color:green;">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-10" style="width: 20px;">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12" />
              </svg>
            </span>
          </p>

        </div>
        <div v-if="!listaDetallesPlanilla.date_emision_boleta">
          <button v-if="!habilitarEdicion" @click="habilitarEdicion = !habilitarEdicion"
            class="btn rounded border p-1 bg-indigo-600 text-white">Editar</button>
          <button v-if="habilitarEdicion" @click="cancelarEdicion()"
            class="btn rounded border p-1 bg-red-500 text-white">Cancelar</button>
          <button v-if="habilitarEdicion" @click="editarPlanilla"
            class="btn rounded border p-1 bg-indigo-600 text-white">Guardar</button>
          <button v-if="!habilitarEdicion" @click="emitirPlanilla"
            class="btn rounded border p-1 bg-emerald-500 text-white">Emitir</button>
        </div>
      </div>

      <div class="relative overflow-x-auto" style="">
        <table class="table border bg-white w-full m-auto">
          <tr class="text-gray-400 bg-gray-50 border-b">
            <th class="mx-2 font-semibold gap-2">EMPLEADO</th>
            <th class="mx-2 font-semibold">DIAS LABORADOS</th>
            <th class="mx-2 font-semibold">SUELDO QUINCENAL</th>
            <th class="mx-2 font-semibold">VACACIONES</th>
            <th class="mx-2 font-semibold">AGUINALDO</th>
            <th class="mx-2 font-semibold">BONO</th>
            <th class="mx-2 font-semibold">MONTO GRAVABLE COTIZABLE</th>
            <th class="mx-2 font-semibold">ISSS (3%)</th>
            <th class="mx-2 font-semibold">AFP (7.25%)</th>
            <th class="mx-2 font-semibold">ISSS PATRONAL</th>
            <th class="mx-2 font-semibold">AFP PATRONAL</th>
            <th class="mx-2 font-semibold">TOTAL A PAGAR AL EMPLEADO</th>
            <th class="mx-2 font-semibold">TOTAL A DEPOSITAR EN LA PLANILLA UNICA</th>
            <th v-if="listaDetallesPlanilla.date_emision_boleta" class="mx-2 p-2 font-semibold">ACCION</th>
          </tr>
          <tbody>
            <tr v-for="detallePlanilla in listaDetallesPlanilla.detalles_planilla" :key="detallePlanilla.id"
              class="border-b detalle-planilla">
              <input type="hidden" :name="'detalle_planilla_' + detallePlanilla.id" class="id-detalle-planilla"
                :value="detallePlanilla.id">
              <td class="text-center p-[1%]">{{ detallePlanilla.empleado.primer_nombre }}</td>
              <td class="text-center p-[1%]">
                {{ detallePlanilla.dias_laborados }}
              </td>
              <td class="text-center p-[1%]">{{ Number(detallePlanilla.base).toFixed(2) || 0 }}</td>
              <td class="text-center p-[1%]">
                <button
                  v-if="habilitarEdicion && (!detallePlanilla.date_emision_boleta && detallePlanilla.monto_vacaciones < 1 && !presionados.includes(detallePlanilla.id) && detallePlanilla.vacaciones)"
                  type="number" :name="'bono_' + detallePlanilla.id"
                  class="border-slate-200 bg-indigo-500 text-white rounded-lg w-24" :value="detallePlanilla.monto_bonos"
                  @click="aplicarVacaciones(detallePlanilla.id)">
                  Aplicar
                </button>
                <span v-else="">{{ Number(detallePlanilla.monto_vacaciones).toFixed(2) || 0 }}</span>
                <input type="hidden" :value="detallePlanilla.monto_vacaciones" :id="'vacaciones_' + detallePlanilla.id"
                  class="monto-vacaciones">
              </td>
              <td class="text-center p-[1%]">{{ Number(detallePlanilla.monto_aguinaldo).toFixed(2) || 0 }}</td>
              <td class="text-center p-[1%]">
                <input v-if="habilitarEdicion && !detallePlanilla.date_emision_boleta" type="number"
                  :model="detallePlanilla.monto_bonos" :name="'bono_' + detallePlanilla.id"
                  :id="'bono_' + detallePlanilla.id" class="border-slate-200 rounded-lg w-24"
                  :value="detallePlanilla.monto_bonos" @input="aplicarBono(detallePlanilla)" min="0">
                <span v-else>{{ Number(detallePlanilla.monto_bonos).toFixed(2) || 0 }} <input type="hidden"
                    :value="detallePlanilla.monto_bonos" :id="'bono_' + detallePlanilla.id" class="monto-bonos"></span>
              </td>
              <td class="text-center p-[1%]">{{ Number(detallePlanilla.monto_gravable_cotizable).toFixed(2) || 0 }}</td>
              <td class="text-center p-[1%]">{{ Number(detallePlanilla.monto_isss).toFixed(2) || 0 }}</td>
              <td class="text-center p-[1%]">{{ Number(detallePlanilla.monto_afp).toFixed(2) || 0 }}</td>
              <td class="text-center p-[1%]">{{ Number(detallePlanilla.monto_isss_patronal).toFixed(2) || 0 }}</td>
              <td class="text-center p-[1%]">{{ Number(detallePlanilla.monto_afp_patronal).toFixed(2) || 0 }}</td>
              <td class="text-center p-[1%]">{{ Number(detallePlanilla.monto_pago_empleado).toFixed(2) || 0 }}</td>
              <td class="text-center p-[1%]">{{ Number(detallePlanilla.monto_planilla_unica).toFixed(2) || 0 }}</td>
              <td v-if="listaDetallesPlanilla.date_emision_boleta" class="text-center mx-2">
                <router-link :to="{ name: 'boleta_pago', params: { idDetallePlanilla: detallePlanilla.id } }"
                  class="w-auto h-auto p-2 rounded bg-emerald-500 tex-sm font-medium text-center text-white">
                  Boleta
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="listaDetallesPlanilla.date_emision_boleta" class="text-center">
          <button @click="downloadPdf" class="bg-blue-500 text-white p-2 m-2 rounded">
           Descargar PDF
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import Navbar from '../../components/NavBar.vue'
import axios from 'axios'
import moment from 'moment'
import { showMessages } from '../../components/functions.js'

export default {
  components: {
    Navbar
  },
  data() {
    return {
      listaDetallesPlanilla: [],
      listaErrores: null,
      presionados: [],
      habilitarEdicion: false
    }
  },
  created() {
    moment.defineLocale('es-sv', {
      months: [
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
      ],
      monthsShort: [
        'ene',
        'feb',
        'mar',
        'abr',
        'may',
        'jun',
        'jul',
        'ago',
        'sep',
        'oct',
        'nov',
        'dic'
      ],
      weekdays: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
      weekdaysShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
      weekdaysMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá']
    })
    moment.locale('es-sv')
    this.cargarDetallesPlanillas()
  },
  methods: {
    async downloadPdf() {
      try {
        const response = await axios.get(`/api/detalle_planilla/${this.listaDetallesPlanilla.id}/download_pdf`, {
          responseType: 'blob' // Especifica que el tipo de respuesta es un blob
        });

        // Crear un enlace para descargar el archivo
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'detalle_planilla.pdf'); // Nombre del archivo a descargar
        document.body.appendChild(link);
        link.click();

        // Limpieza
        window.URL.revokeObjectURL(url);
        link.remove();
      } catch (error) {
        console.error('Error descargando el PDF:', error);
      }
    },
    cancelarEdicion() {
      this.habilitarEdicion = !this.habilitarEdicion;
      this.cargarDetallesPlanillas();
      this.presionados = [];
    },
    cargarDetallesPlanillas() {
      this.presionados = [];
      axios
        .get('/api/obtener_detalles_planilla/' + this.$route.params.idPlanilla)
        .then((response) => {
          this.listaDetallesPlanilla = response.data
        })
        .catch((response) => {
          this.listaErrores = []
          console.log(response)
          if (response.response.status === 500) {
            this.listaErrores.push('El servidor no respondio. Pongase en contacto con el proveedor')
            setTimeout(() => {
              this.listaErrores = []
            }, 6000)
          }
        })
    },
    obtenerFechaFormateada(fechaInicio, fechaFin) {
      return (
        'DEL ' +
        moment(fechaInicio).format('DD') +
        ' AL ' +
        moment(fechaFin).format('DD [DE] MMMM').toUpperCase()
      )
    },
    obtenerAnioFecha(fechaFin) {
      return moment(fechaFin).format('YYYY')
    },
    editarPlanilla() {
      this.habilitarEdicion = !this.habilitarEdicion;
      let params = { 'detalle_planillas': [] };

      let detalles_planilla = this.listaDetallesPlanilla.detalles_planilla;

      detalles_planilla.forEach(detalle => {
        if (detalle.monto_vacaciones !== 0 || detalle.monto_bonos != 0) {
          params.detalle_planillas.push({ 'detalle_planilla': detalle.id, 'monto_bonos': detalle.monto_bonos, 'monto_vacaciones': detalle.monto_vacaciones })
        }
      });

      console.log(params);

      axios.post('/api/updatePlanilla/' + this.listaDetallesPlanilla.detalles_planilla, params)
        .then((response) => {
          showMessages(true, response.data.message,);
          this.cargarDetallesPlanillas();
        }).catch((error) => {

        })

    },

    emitirPlanilla() {
      let params = {
        emitir: true,
        planilla: this.listaDetallesPlanilla.id
      }
      console.log(params)
      axios.post('/api/updatePlanilla/' + this.listaDetallesPlanilla.id, params)
        .then((response) => {
          showMessages(true, response.data.message,);
          this.cargarDetallesPlanillas();
        }).catch((error) => {
          showMessages(false, error.data.message,);
        })
    },

    aplicarBono(detallePlanilla) {
      let inputBono = document.querySelector('#bono_' + detallePlanilla.id);
      if (isNaN(inputBono.value) || inputBono.value == '') {
        inputBono.value = 0;
      }
      detallePlanilla.monto_bonos = parseFloat(inputBono.value)
      this.actualizarMontoGravable(detallePlanilla);
    },

    aplicarVacaciones(idDetallePlanilla) {

      this.presionados.push(idDetallePlanilla);

      // Usar el método find para buscar el elemento con el id especificado
      let detallePlanilla = this.listaDetallesPlanilla.detalles_planilla.find(
        detalle => detalle.id === idDetallePlanilla
      );

      if (detallePlanilla) {
        let salarioDiario = detallePlanilla.base / detallePlanilla.dias_laborados;
        detallePlanilla.monto_vacaciones = (salarioDiario * 15) * 0.3;

        //actualizar el monto gravable de la tabla
        this.actualizarMontoGravable(detallePlanilla);
        return 1; // Suponiendo que quieres retornar 1 si el elemento fue encontrado
      }

      return 0; // Retornar 0 si no se encontró el elemento
    }

    ,
    actualizarMontoGravable(detallePlanilla) {

      let montoGravable = parseFloat(detallePlanilla.monto_vacaciones) + parseFloat(detallePlanilla.base) + parseFloat(detallePlanilla.monto_bonos);

      if (detallePlanilla.monto_aguinaldo > 1200) {
        montoGravable += (1200 - detallePlanilla.monto_aguinaldo);
      }

      detallePlanilla.monto_gravable_cotizable = montoGravable;

      this.actualizar_isss_afp(detallePlanilla);
    },

    actualizar_isss_afp(detallePlanilla) {
      let afp = parseFloat(detallePlanilla.monto_gravable_cotizable) * 0.0725;
      let isss = parseFloat(detallePlanilla.monto_gravable_cotizable) * 0.03;
      let afp_patronal = parseFloat(detallePlanilla.monto_gravable_cotizable) * 0.0875;
      let isss_patronal = parseFloat(detallePlanilla.monto_gravable_cotizable) * 0.075;

      detallePlanilla.monto_isss = isss;
      detallePlanilla.monto_afp = afp;
      detallePlanilla.monto_isss_patronal = isss_patronal;
      detallePlanilla.monto_afp_patronal = afp_patronal;

      detallePlanilla.monto_pago_empleado = detallePlanilla.monto_gravable_cotizable - afp - isss;
      detallePlanilla.monto_planilla_unica = afp + isss + afp_patronal + isss_patronal;
    }
  }
}
</script>
