<template>
  <main>
    <NavBar></NavBar>

    <div>
      <div class="flex bg-white mx-auto p-5 shadow-md justify-between">
        <h1 class="font-bold text-blue-700 text-xl">Gestión de Pedidos a Domicilio</h1>
        <div class="flex items-center rounded-[4.44px] bg-[#637381]">
          <router-link to="/facturacion/crear_hoja_de_ruta" class="w-auto h-auto m-2 text-[13px] font-medium text-center text-white">
            Nueva Hoja de Ruta
          </router-link>
        </div>
      </div>
      <div class="flex justify-start items-center mt-4 ml-4">
        <a href="#" @click="$router.go(-1)" class="text-sm text-black font-medium flex items-center">
          <img src="../../assets/icons/arrow.svg" alt="Regresar" class="h-6 w-6 mr-1"> Regresar
        </a>
      </div>
    </div>

    <table class="m-auto mt-8 w-[85%]">
      <tr>
        <td colspan="4" class="text-gray-950">
          <p class="mb-8 font-semibold text-2xl">Lista de Hojas de Ruta</p>
        </td>
      </tr>
      <tr>
        <td colspan="5">
          <section class="flex justify-evenly algin-center mb-8">
            <div class="">
              <div>
                <label for="text-bold" class="inline-block mr-[10px] font-bold">Estado</label>
                <select name="" id="" v-model="estado" class="rounded-[5px] border border-slate-200 bg-slate-50">
                  <option v-for="estado in listaEstados" :value="estado.valor">{{ estado.estado }}</option>
                </select>
              </div>
            </div>
            <div class="">
              <label for="text-bold" class="inline-block mr-[10px] font-bold">Fecha</label>
              <input type="date" v-model="fechaEntrega" class="rounded-[5px] border border-slate-200 bg-slate-50" />
            </div>
            <div class="">
              <button class="bg-indigo-700 text-white rounded py-1.5 px-3.5" @click="aplicarFiltros()">
                Aplicar Filtro
              </button>
            </div>
          </section>
        </td>
      </tr>
      <tr class="bg-slate-100 border-b">
        <th class="px-6 py-4 text-xs text-gray-500 font-semibold">CÓDIGO</th>
        <th class="px-6 py-4 text-xs text-gray-500 font-semibold">ESTADO</th>
        <th class="px-6 py-4 text-xs text-gray-500 font-semibold">FECHA ENTREGA</th>
        <th class="px-6 py-4 text-xs text-gray-500 font-semibold">REPARTIDOR ASIGNADO</th>
        <th class="px-6 py-4 text-xs text-gray-500 font-semibold">TOTAL</th>
        <th class="px-6 py-4 text-xs text-gray-500 font-semibold">ACCIONES</th>
      </tr>
      <tbody>
        <tr class="border-b bg-white" v-for="datosHojaDeRuta in controlPagina.getDatosPagina()"
          :key="datosHojaDeRuta.id_hr">
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
          <td class="text-center">${{ datosHojaDeRuta.total }}</td>
          <td class="text-center">
            <div class="flex justify-center align-center">
              <BotonConsultar :url="urlConsultar + datosHojaDeRuta.id_hr"></BotonConsultar>
              <BotonEditar :url="'hoja_de_ruta/update/' + datosHojaDeRuta.id_hr" :deshabilitado="datosHojaDeRuta.esta_entregado" :class="{ 'cursor-not-allowed': datosHojaDeRuta.esta_entregado}"></BotonEditar>
              <EliminarHR :id="datosHojaDeRuta.id_hr"></EliminarHR>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="flex justify-center align-center mt-[5%] mb-4">
      <nav aria-label="Page navigation example">
        <ul class="flex items-center -space-x-px h-8 text-sm">
          <li @click="controlPagina.obtenerPagina(controlPagina.paginaPrevia)">
            <a href="#"
              class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
              <svg class="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M5 1 1 5l4 4" />
              </svg>
              <span class="mx-2">Anterior</span>
            </a>
          </li>
          <li v-for="pageLink in controlPagina.obtenerListadoEnlaces()" @click="controlPagina.obtenerPagina(pageLink)">
            <a href="#" :class="{ pageActivate: pageLink.active === true }"
              class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">{{
                pageLink.label }}</a>
          </li>
          <li @click="controlPagina.obtenerPagina(controlPagina.getPaginaSiguiente())">
            <a href="#"
              class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
              <span class="mx-2">Siguiente</span>
              <svg class="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 9 4-4-4-4" />
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
      urlConsultar: 'hoja_de_ruta/detalles/',
      urlEditar: '',
      urlEliminar: '',
      fechaEntrega: null,
      estado: '',
      listaEstados: [{'estado':'Todos','valor':null},{ 'estado': 'Entregados', 'valor': 1 }, { 'estado': 'No entregados', 'valor': 0 }]
    }
  },
  mounted() {
    if(this.$store.state.existenDatos == true && this.$store.state.fromAgregarEditarHR == true){
      this.controlPagina = new ControladorPagina(this.$store.state.urlPaginaActualHR);
      this.$store.commit("setFromAgregarEditarHR",false);
    }
    this.controlPagina.cargarPaginas();
    this.$store.commit("setExistenDatos",true);
    this.$store.commit("setUrlPaginaActualHR",this.controlPagina.getUrlPaginaActual());
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
      if (this.estado != null) {
        parametrosFiltro.estaEntregado = this.estado;
      }
      return parametrosFiltro
    },
    obtenerEstadoEnTexto(estadoLote) {
      return estadoLote === 1 ? "Entregado" : "No entregado";
    }
  }
}
</script>
