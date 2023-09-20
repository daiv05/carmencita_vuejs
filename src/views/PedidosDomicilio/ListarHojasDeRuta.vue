<template>
  <main>
    <NavBar></NavBar>
    <h1 class="text-2xl font-bold mb-6 text-left text-indigo-600 ml-[5%] mt-[2%]">
      Gestión de pedidos a domicilio
    </h1>
    <table class="w-[100%] m-auto mt-[2%] w-[85%] m-auto">
      <tr>
        <td colspan="4" class="text-2xl text-gray-950 font-semibold">Lista de pedidos</td>
      </tr>
      <tr>
        <td colspan="5">
          <section class="flex justify-evenly algin-center mb-[5px] 2-">
            <div class="">
              <div>
                <label for="text-bold" class="inline-block mr-[10px] font-bold">Estado</label>
                <select
                  name=""
                  id=""
                  v-model="estado"
                  class="rounded-[5px] border border-slate-200 bg-slate-50"
                >
                  <option v-for="estado in listaEstados" :value="estado.valor">{{ estado.estado }}</option>
                </select>
              </div>
            </div>
            <div class="">
              <label for="text-bold" class="inline-block mr-[10px] font-bold">Fecha</label>
              <input
                type="date"
                v-model="fechaEntrega"
                class="rounded-[5px] border border-slate-200 bg-slate-50"
              />
            </div>
            <div class="">
              <button class="bg-indigo-700 text-white rounded p-[5px]" @click="aplicarFiltros()">
                Aplicar Filtro
              </button>
            </div>
          </section>
        </td>
      </tr>
      <tr class="text-gray-400 bg-gray-50 border-b">
        <th class="p-[1%] font-semibold">CÓDIGO</th>
        <th class="p-[1%] font-semibold">ESTADO</th>
        <th class="p-[1%] font-semibold">FECHA ENTREGA</th>
        <th class="p-[1%] font-semibold">REPARTIDOR ASIGNADO</th>
        <th class="p-[1%] font-semibold">TOTAL</th>
        <th class="p-[1%] font-semibold">ACCIONES</th>
      </tr>
      <tbody>
        <tr
          class="border-b"
          v-for="datosHojaDeRuta in controlPagina.getDatosPagina()"
          :key="datosHojaDeRuta.id_hr"
        >
          <td class="p-[1.5%] text-center">{{ datosHojaDeRuta.id_hr }}</td>
          <td class="p-[1.5%] text-center">{{ obtenerEstadoEnTexto(datosHojaDeRuta.esta_entregado) }}</td>
          <td class="text-center">{{ formatearFechas(datosHojaDeRuta.fecha_entrega) }}</td>
          <td class="text-center">
            {{
              datosHojaDeRuta.empleado.primer_nombre +
              ' ' +
              datosHojaDeRuta.empleado.primer_apellido
            }}
          </td>
          <td class="text-center">{{ datosHojaDeRuta.total }}</td>
          <td class="text-center">
            <div class="flex justify-center align-center">
              <BotonConsultar :url="urlConsultar + datosHojaDeRuta.id_hr"></BotonConsultar>
              <BotonEditar :url="urlEditar + datosHojaDeRuta.id_hr"></BotonEditar>
              <EliminarHR :id="datosHojaDeRuta.id_hr"></EliminarHR>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="flex justify-center align-center mt-[5%]">
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
              <span class="sr-only"> </span>
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
  </main>
</template>
<script>
import axios from 'axios'
import ControladorPagina from '../../helpers/ControlPagina'
import NavBar from '../../components/NavBar.vue'
import BotonConsultar from '../../components/Helpers/BotonConsultar.vue'
import BotonEditar from '../../components/Helpers/BotonEditar.vue'
import BotonEliminar from '../../components/Helpers/BotonEliminar.vue'
import moment from 'moment'
import EliminarHR from '../../components/Ventas/EliminarHR.vue'


export default {
  components: {
    NavBar,
    BotonConsultar,
    BotonEditar,
    BotonEliminar,
    EliminarHR
  },
  data() {
    return {
      urlEndpoint: '/api/hoja_de_ruta_paginadas',
      controlPagina: new ControladorPagina('/api/hoja_de_ruta_paginadas', axios),
      urlConsultar: '',
      urlEditar: '',
      urlEliminar: '',
      fechaEntrega: null,
      estado: '',
      listaEstados: [{'estado':'Entregados','valor':1}, {'estado':'No entregados','valor':0}]
    }
  },
  mounted() {
    this.controlPagina.setParametrosFiltro({ tipo: 'Consumidor final' })
    this.controlPagina.cargarPaginas()
  },
  methods: {
    formatearFechas(fecha) {
      return moment(fecha).format('DD/MM/YYYY')
    },
    aplicarFiltros() {
      let parametrosFiltro = this.construirDatosParametrosFiltro()
      this.controlPagina = new ControladorPagina(this.urlEndpoint, axios)
      this.controlPagina.setParametrosFiltro(parametrosFiltro)
      this.controlPagina.cargarPaginas()
    },
    construirDatosParametrosFiltro() {
      let parametrosFiltro = {}
      if (this.fechaEntrega != null) {
        parametrosFiltro.fechaEntrega = this.fechaEntrega
      }
      if (this.estado!=null) {
        parametrosFiltro.estaEntregado = this.estado;
      }
      return parametrosFiltro
    },
    obtenerEstadoEnTexto(estadoLote){
        return estadoLote === 1?"Entregado":"No entregado";
    }
  }
}
</script>
