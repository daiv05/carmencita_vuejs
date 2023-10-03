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
          Gestión Avisos
        </p>
            </div>
        </div>
        <p class="font-bold ml-[7%] mt-[1%] text-[25px]">
            Consultar Avisos
        </p>
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
              v-model="valorListaOpciones"
              class="w-[11%] border-slate-400 rounded"
              @change="obtenerDatosFiltrados()"
            >
              <option v-for="opcion in listaOpcionesFiltro" :value="opcion.valor">
                {{ opcion.opcion }}
              </option>
            </select>
          </div>
        </td>
      </tr>
      <tr class="text-gray-400 bg-gray-50 border-b">
        <th class="p-[1%] font-semibold">TITULO</th>
        <th class="p-[1%] font-semibold">FECHA DE CREACION</th>
        <th class="p-[1%] font-semibold">FECHA DE FINALIZACION</th>
        <th class="p-[1%] font-semibold">ACCIONES</th>
      </tr>
      <tbody>
        <tr
          class="border-b"
          v-for="aviso in controlPagina.datosPagina"
          :key="aviso.id"
          @click="verDetallePlanilla(planilla.id)"
        >
          <td class="text-center p-[1%]">{{ aviso.titulo_aviso }}</td>
          <td class="text-center p-[1%]">
            {{ formatearFecha(aviso.fecha_creacion) }}
          </td>
          <td class="text-center p-[1%]">{{ formatearFecha(aviso.fecha_finalizacion) }}</td>
          <td class="text-center p-[1%]">
           <div class="grid grid-cols-10">
            <div class="col-span-2 mt-[12%]"><BotonConsultar url=""></BotonConsultar></div>
            <div class="col-span-2 mt-[12%]"><BotonEditar url=""></BotonEditar></div>
            <div class="col-span-2"><BotonEliminar url=""></BotonEliminar></div>
            <div class="col-span-4"><BotonDesactivar :id="1" :estado="false"></BotonDesactivar></div>
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
    </main>
</template>
<script>
import NavBar from '../../components/NavBar.vue';
import ControladorPagina from '../../helpers/ControlPagina';
import BotonConsultar from '../../components/Helpers/BotonConsultar.vue';
import BotonEditar from '../../components/Helpers/BotonEditar.vue';
import BotonEliminar from '../../components/Helpers/BotonEliminar.vue';
import BotonDesactivar from '../../components/Helpers/BotonDesactivar.vue'
import axios from 'axios';
import moment from 'moment';
import BotonDesactivarVue from '../../components/Helpers/BotonDesactivar.vue';

export default {
    components:{
        NavBar,
        BotonConsultar,
        BotonEditar,
        BotonEliminar,
        BotonDesactivar,
    },
    data(){
        return{
            controlPagina: new ControladorPagina("/api/avisos",axios),
            listaOpcionesFiltro:[{"opcion":"ocultos","valor":0},{"opcion":"no ocultos","valor":1},{"opcion":"todos","valor":2}],
            valorListaOpciones:2
        }
    },
    mounted(){
        this.controlPagina.cargarPaginas();
    },
    methods:{
        construirFiltros(){
            let parametrosFiltro = {};
            if(this.valorListaOpciones === 1 || this.valorListaOpciones === 0){
                parametrosFiltro.estado_aviso = this.valorListaOpciones;
            }
            return parametrosFiltro;
        },
        obtenerDatosFiltrados(){
            let parametrosFiltro = this.construirFiltros();
            this.controlPagina = new ControladorPagina("/api/avisos",axios);
            this.controlPagina.setParametrosFiltro(parametrosFiltro);
            this.controlPagina.cargarPaginas();
        },
        formatearFecha(fecha){
            return moment(fecha).format("DD-MM-YY");
        }
    }
}
</script>
