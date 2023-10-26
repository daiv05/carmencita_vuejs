<template>
    <main>
      <NavBar></NavBar>
      <div class="w-full h-[60px]">
        <div
          class="flex justify-between px-16 w-full h-[60px] absolute left-0 bg-white"
          style="
            box-shadow: 0px 1.11px 3.329166889190674px 0 rgba(0, 0, 0, 0.1),
              0px 1.11px 2.219444513320923px 0 rgba(0, 0, 0, 0.06);
          "
        >
          <p
            class="mt-2 flex-grow-0 flex-shrink-0 w-[80%] text-[30px] font-semibold text-left text-[#3056d3]"
          >
            Gestión Ofertas
          </p>
          <div
            class="flex items-center mt-4 flex-grow-0 flex-shrink-0 h-[31px] py-[16px] rounded-[4.44px] bg-[#637381]"
          >
            <router-link
              to="/registrar_promociones"
              class="flex-grow-0 flex-shrink-0 w-[225px] text-[13px] font-medium text-center text-white"
            >
              Agregar Oferta
            </router-link>
          </div>
        </div>
      </div>
      <p class="font-bold ml-[7%] mt-[1%] text-[25px]">Consultar Ofertas</p>
      <div class="flex justify-start items-center mt-4 ml-4">
                      <a href="#" @click="$router.go(-1)" class="text-sm text-black font-medium flex items-center">
                          <img src="../../assets/icons/arrow.svg" alt="Regresar" class="h-6 w-6 mr-1"> Regresar
                      </a>
      </div>
      <table class="w-full lg:w-[75%] m-auto mt-2">
  <tr class="text-gray-400 bg-gray-50 border-b">
    <th class="p-1 font-semibold">CODIGO</th>
    <th class="p-1 font-semibold">PRODUCTO</th>
    <th class="p-1 font-semibold">FECHA DE INICIO</th>
    <th class="p-1 font-semibold">FECHA DE FINALIZACION</th>
    <th class="p-1 font-semibold">PRECIO DE OFERTA</th>
    <th class="p-1 font-semibold">NOMBRE DE LA OFERTA</th>
    <th class="p-1 font-semibold">ACCIONES</th>
  </tr>
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
          
          <BotonEliminarAviso :url="obtenerUrlEliminarOferta(oferta.id)" titulo="Eliminar Oferta" mensaje="¿Desea eliminar la oferta?" :index="controlPagina.obtenerPosicionElemento(oferta)" :lista="controlPagina.obtenerListaResultadoPorPagina()"></BotonEliminarAviso>
        </div>
      </td>
    </tr>
  </tbody>
</table>

      <div class="flex justify-center align-center mt-[2%] mb-[1%]">
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
        return '/modificar_aviso/' + id
      },
      obtenerUrlEliminarOferta(id) {
        return "/ofertaDelete/"+id;
      },
    }
  }
  </script>
  