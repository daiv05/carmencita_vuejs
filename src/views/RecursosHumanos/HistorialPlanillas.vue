<template>
  <main>
    <Navbar></Navbar>
    <!-- component -->
    <div class="max-w-4xl mx-auto z-999 absolute top-10px" v-if="listaErrores.length > 0">
      <div class="bg-red-50 border-l-8 border-red-900">
        <div class="flex items-center">
          <div class="p-2">
            <div class="flex items-center">
              <div class="ml-2">
                <svg
                  class="h-8 w-8 text-red-900 mr-2 cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p class="px-6 py-4 text-red-900 font-semibold text-lg">
                Ocurrieron los siguientes errores
              </p>
            </div>
            <div class="px-16 mb-4">
              <li class="text-md font-bold text-red-500 text-sm" v-for="error in listaErrores">
                {{ error }}
              </li>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full">
      <div
        class="flex justify-between px-16 w-full bg-white"
        style="
          box-shadow: 0px 1.11px 3.329166889190674px 0 rgba(0, 0, 0, 0.1),
            0px 1.11px 2.219444513320923px 0 rgba(0, 0, 0, 0.06);
        "
      >
        <p
          class="mt-2 flex-grow-0 flex-shrink-0 w-[80%] text-[30px] font-semibold text-left text-[#3056d3]"
        >
          Gestion Empleados
        </p>
      </div>
      <div class="text-[21px] mt-[1%]">
        <p class="font-semibold ml-[5%]">Historial Planillas de Pago</p>
      </div>
      <generarPlanilla></generarPlanilla>
    </div>
    <div class="w-full text-center text-[18px]">
      <span>Planillas año: </span>
      <p v-if="controlPagina.datosPagina[0]" class="font-semibold">
        {{ obtenerAnio(controlPagina.datosPagina[0].fecha_fin) }}
      </p>
    </div>
    <table class="w-[95%] lg:w-[75%] m-auto mt-[2px]">
      <tr>
        <td colspan="5">
          <div class="w-[100%] m-auto p-[1%] text-right">
            <div>
              <label for="opcionFiltro" class="font-bold">Seleccion el año</label>
            </div>
            <select
              name=""
              id=""
              v-model="anioFiltro"
              class="w-[11%] border-slate-400 rounded"
              @change="obtenerDatosFiltrados()"
            >
              <option v-for="anio in listaAniosDisponibles" :value="anio.anio">
                {{ anio.anio }}
              </option>
            </select>
          </div>
        </td>
      </tr>
      <tr class="text-gray-400 bg-gray-50 border-b">
        <th class="p-[1%] font-semibold">Nº</th>
        <th class="p-[1%] font-semibold">PERIODO DE PLANILLA</th>
        <th class="p-[1%] font-semibold">TOTAL SEGURO</th>
        <th class="p-[1%] font-semibold">TOTAL AFP</th>
        <th class="p-[1%] font-semibold">TOTAL CANCELADO</th>
      </tr>
      <tbody>
        <tr
          class="border-b cursor-pointer hover:bg-slate-50"
          v-for="planilla in controlPagina.datosPagina"
          :key="planilla.id"
          @click="verDetallePlanilla(planilla.id)"
        >
          <td class="text-center p-[1%]">{{ planilla.id }}</td>
          <td class="text-center p-[1%]">
            {{ obtnerPeriodoFechas(planilla.fecha_inicio, planilla.fecha_fin) }}
          </td>
          <td class="text-center p-[1%]">${{ planilla.total_seguro }}</td>
          <td class="text-center p-[1%]">${{ planilla.total_afp }}</td>
          <td class="text-center p-[1%]">${{ planilla.total }}</td>
        </tr>
      </tbody>
    </table>
    <div class="flex justify-center align-center mt-[5%] mb-4">
      <nav aria-label="Page navigation example">
        <ul class="flex items-center -space-x-px h-8 text-sm">
          <li @click="controlPagina.obtenerPagina(controlPagina.paginaPrevia)">
            <a
              href="#"
              class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span class="sr-only">{{}}</span>
              <svg
                class="w-2.5 h-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </a>
          </li>
          <li
            v-for="pageLink in controlPagina.obtenerListadoEnlaces()"
            @click="controlPagina.obtenerPagina(pageLink)"
          >
            <a
              href="#"
              :class="{ pageActivate: pageLink.active === true }"
              class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >{{ pageLink.label }}</a
            >
          </li>
          <li @click="controlPagina.obtenerPagina(controlPagina.getPaginaSiguiente())">
            <a
              href="#"
              class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span class="sr-only">
              </span>
              <svg
                class="w-2.5 h-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <Teleport to="body">
          <DetallePlanilla v-if="controlModal" @cerrarModal = "cerrarModal" :idPlanilla = "idPlanilla"></DetallePlanilla>
    </Teleport>
  </main>
</template>

<script>
import axios from 'axios'
import Navbar from '../../components/NavBar.vue'
import ControladorPagina from '../../helpers/ControlPagina'
import moment from 'moment'
import DetallePlanilla from '../../components/RecursosHumanos/DetallePlanilla.vue'
import generarPlanilla from '../../components/RecursosHumanos/PlanillaGenerar.vue'

export default {
  components: {
    Navbar,
    DetallePlanilla,
    generarPlanilla
  },
  data() {
    return {
      listaPlanillas: [],
      urlEndpoint: 'api/filtroPlanillas',
      controlPagina: new ControladorPagina('api/filtroPlanillas', axios),
      listaAniosDisponibles: [],
      anioFiltro: '',
      listaErrores: [],
      controlModal:false,
      idPlanilla:0,
    }
  },
  created() {

    /*Definición personalizada para mostrar los meses en español*/
    moment.defineLocale('es-sv', {
  months: [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ],
  monthsShort: [
    'ene', 'feb', 'mar', 'abr', 'may', 'jun',
    'jul', 'ago', 'sep', 'oct', 'nov', 'dic'
  ],
  weekdays: [
    'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'
  ],
  weekdaysShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
  weekdaysMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
});
moment.locale("es-sv");
    this.controlPagina.cargarPaginas()
  },
  mounted() {
    axios
      .get('api/listaFechaPlanilla')
      .then((response) => {
        this.listaAniosDisponibles = response.data.resultado
        console.log(response.data.resultado)
      })
      .catch((response) => {
        console.log(response.response.status);
            if(response.response.status === 500){
                this.listaErrores.push("El servidor no respondio. Pongase en contacto con el proveedor");
                setTimeout(()=>{
                    this.listaErrores = [];
                },6000);
            }
      })
    //this.cargarPlanillas();
    // this.controlPagina.cargarPaginas();
  },
  methods: {
    obtnerPeriodoFechas(fechaInicio, fechaFin) {
      let periodoFecha =
        moment(fechaInicio).format('MMMM D') + ' - ' + moment(fechaFin).format('MMMM D')
      return periodoFecha
    },
    obtenerAnio(fechaInicio) {
      return moment(fechaInicio).year()
    },
    obtenerDatosFiltrados() {
      let datosFiltros = this.construirFiltros()
      this.controlPagina = new ControladorPagina(this.urlEndpoint, axios)
      this.controlPagina.setParametrosFiltro(datosFiltros)
      this.controlPagina.cargarPaginas()
    },
    construirFiltros() {
      let parametrosFiltro = {}
      if (this.anioFiltro) {
        parametrosFiltro.fechaFiltro = this.anioFiltro
      }

      return parametrosFiltro
    },
    verDetallePlanilla(idPlanilla){
      this.$router.push("detalle_planilla/"+idPlanilla);
    },
    abrirModal(idPlanilla){
      this.idPlanilla = idPlanilla;
      this.controlModal = true;
    },
    cerrarModal(){
      this.controlModal = false;
    }
  }
}
</script>
