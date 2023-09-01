<template>
    <main>
        <h1 class="text-2xl font-bold mb-6 text-left text-indigo-600 ml-[5%] mt-[2%]">Informe de historial de ventas por producto</h1>
        <section class="grid grid-row-2 gap-5 w-[90%] m-auto">
            <article class=" grid grid-cols-7 gap-1">
                <div class="grid grid-rows-2 gap-1 col-span-1">
                    <label for="fechaInicio" class="font-bold">Fecha Inicio</label>
                    <input type="date" class="rounded padding-[5px]" v-model="fechaInicioVenta">
                </div>
                <div class="grid grid-rows-2 gap-1 col-span-1">
                    <label for="fechaFin" class="font-bold">Fecha Fin</label>
                    <input type="date" class="rounded padding-[5px]" v-model="fechaFinVenta">
                </div>
                <div class="grid grid-cols-2 gap-2 col-span-2">
                    <div class="grid grid-rows-2 gap-1">
                        <label for="" class="font-bold">Mín.Ingresos</label>
                        <input type="number" step="0.15" class="rounded padding-[5px] w-[100%]">
                    </div>
                    <div class="grid grid-rows-2 gap-1 font-bold">
                        <label for="" class="font-bold">Máx.Ingresos</label>
                        <input type="number" step="0.15" class="rounded padding-[5px] w-[100%]">
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-1 col-span-2">
                    <div class="grid grid-rows-2 gap-1">
                        <label for="" class="font-bold">Mín.Cantidad</label>
                        <input type="number" step="0.15" class="rounded padding-[5px] w-[100%]">
                    </div>
                    <div class="grid grid-rows-2 gap-1 font-bold">
                        <label for="" class="font-bold">Máx.Cantidad</label>
                        <input type="number" step="0.15" class="rounded padding-[5px] w-[100%]">
                    </div>
                </div>
                <div class="flex justify-center align-center">
                    <button class="bg-indigo-700 text-white h-[45%] rounded mt-[25%] p-[5px]" @click="obtenerDatosFiltrados($event)"> Aplicar Filtro </button>
                </div>
            </article>
        </section>
        <table class="w-[100%] m-auto mt-[2%] w-[85%] m-auto">
      <tr class="text-gray-400 bg-gray-50 border-b">
        <th class="p-[1%] font-semibold">CÓDIGO PRODUCTO</th>
        <th class="p-[1%] font-semibold">NOMBRE PRODUCTO</th>
        <th class="p-[1%] font-semibold">CANTIDAD VENDIDA</th>
        <th class="p-[1%] font-semibold">INGRESOS GENERADOS</th>
      </tr>
      <tbody>
        <tr
          class="border-b"
          v-for="datosProducto in controlPagina.getDatosPagina()"
          :key="datosProducto.codigo_barra_producto"
        >
          <td class="p-[1.5%] text-center">{{datosProducto.codigo_barra_producto }}</td>
          <td class="text-center">{{ datosProducto.nombre_producto }}</td>
          <td class="text-center">{{ datosProducto.total_producto_vendido }} Unidades</td>
          <td class="text-center">$ {{ datosProducto.total }}</td>
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
import axios from 'axios';
import ControlPaginas from '../../helpers/ControlPagina.js';

export default {
    data(){
        return {
            fechaInicioVenta:null,
            fechaFinVenta:null,
            controlPagina: new ControlPaginas("/api/ventas_por_producto",axios),
            minTotal:0,
            maxTotal:0,
            minTotalProducto:0,
            maxTotalProducto:0,
        }
    },
    mounted(){
        this.controlPagina.cargarPaginas();
    }
}

</script>
