<template>
  <main>
    <NavBar></NavBar>
    <div class="w-full">

      <div>
        <div class="flex bg-white mx-auto p-5 shadow-md justify-between">
          <h1 class="font-bold text-blue-700 text-xl">Gestión de Ofertas</h1>
          <div class="flex items-center rounded-[4.44px] bg-[#637381]">
            <router-link to="/marketing/registrar_promociones"
              class="w-auto h-auto m-2 text-[13px] font-medium text-center text-white">
              Agregar Oferta
            </router-link>
          </div>
        </div>
        <div class="flex justify-start items-center mt-4 ml-4">
          <a href="#" @click="$router.go(-1)" class="text-sm text-black font-medium flex items-center">
            <img src="../../assets/icons/arrow.svg" alt="Regresar" class="h-6 w-6 mr-1"> Regresar
          </a>
        </div>
      </div>

    </div>

    <div class="m-auto p-1 pb-0 pt-4 w-4/5">
      <h2 class="font-bold text-lg mb-8">Consultar Ofertas</h2>
    </div>

    <div class="md:w-[90%] w-auto p-4 mx-auto bg-slate-50 shadow rounded-md overflow-auto">
      <table class="table w-full max-h-screen rounded-md">
        <thead class="border-b bg-slate-100">
          <tr class="text-center">
            <th class="px-6 py-4 text-xs text-gray-500 font-semibold">CODIGO</th>
            <th class="px-6 py-4 text-xs text-gray-500 font-semibold">PRODUCTO</th>
            <th class="px-6 py-4 text-xs text-gray-500 font-semibold">FECHA DE INICIO</th>
            <th class="px-6 py-4 text-xs text-gray-500 font-semibold">FECHA DE FINALIZACION</th>
            <th class="px-6 py-4 text-xs text-gray-500 font-semibold">PRECIO DE OFERTA</th>
            <th class="px-6 py-4 text-xs text-gray-500 font-semibold">NOMBRE DE LA OFERTA</th>
            <th class="px-6 py-4 text-xs text-gray-500 font-semibold">ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="oferta in controlPagina.datosPagina" :key="oferta.id" class="border-b">
            <td class="text-center p-1">{{ oferta.codigo_barra_producto }}</td>
            <td class="text-center p-1">{{ oferta.nombre_producto }}</td>
            <td class="text-center p-1">{{ formatearFecha(oferta.fecha_inicio_oferta) }}</td>
            <td class="text-center p-1">{{ formatearFecha(oferta.fecha_fin_oferta) }}</td>
            <td class="text-center p-1">${{ oferta.precio_oferta }}</td>
            <td class="text-center p-1">{{ oferta.nombre_oferta }}</td>
            <td class="text-center p-1">
              <div class="grid grid-cols-2">

                <BotonEditar :url="obtenerUrlEditarOferta(oferta.id)"></BotonEditar>

                <BotonEliminarAviso :url="obtenerUrlEliminarOferta(oferta.id)" titulo="Eliminar Oferta"
                  mensaje="¿Desea eliminar la oferta?" :index="controlPagina.obtenerPosicionElemento(oferta)"
                  :lista="controlPagina.obtenerListaResultadoPorPagina()"></BotonEliminarAviso>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

    </div>

    <div class="flex justify-center align-center mt-[2%] mb-[1%]">
      <nav aria-label="Page navigation example">
        <ul class="flex items-center -space-x-px h-8 text-sm">
          <li @click="controlPagina.obtenerPagina(controlPagina.paginaPrevia)">
            <a href="#"
              class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <span class="sr-only">{{}}</span>
              <svg class="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M5 1 1 5l4 4" />
              </svg>
            </a>
          </li>
          <li v-for="pageLink in controlPagina.obtenerListadoEnlaces()" @click="controlPagina.obtenerPagina(pageLink)">
            <a href="#" :class="{ pageActivate: pageLink.active === true }"
              class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{{
                pageLink.label }}</a>
          </li>
          <li @click="controlPagina.obtenerPagina(controlPagina.getPaginaSiguiente())">
            <a href="#"
              class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <span class="sr-only"> </span>
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
import NavBar from '../../components/NavBar.vue'
import ControladorPagina from '../../helpers/ControlPagina'
import BotonConsultar from '../../components/Helpers/BotonConsultar.vue'
import BotonEditar from '../../components/Helpers/BotonEditar.vue'
import BotonEliminarAviso from '../../components/Helpers/BotonEliminarAviso.vue'
import BotonDesactivarAviso from '../../components/Helpers/BotonDesactivarAviso.vue'
import RegresarPagina from '../../components/RegresarPagina.vue'
import axios from 'axios'
import moment from 'moment'

export default {
  components: {
    NavBar,
    BotonConsultar,
    BotonEditar,
    BotonEliminarAviso,
    BotonDesactivarAviso,
    RegresarPagina,
  },
  data() {
    return {
      controlPagina: new ControladorPagina('/api/ofertasList', axios),
    }
  },
  mounted() {
    this.controlPagina.cargarPaginas()
  },
  methods: {
    formatearFecha(fecha) {
      return moment(fecha).format('DD-MM-YY')
    },
    obtenerUrlEditarOferta(id) {
      return '/marketing/modificar_oferta/' + id
    },
    obtenerUrlEliminarOferta(id) {
      return "/marketing/ofertaDelete/" + id;
    },
  }
}
</script>
  