<template>
  <main>
    <table class="w-[100%] m-auto mt-[2%]">
      <tr class="text-gray-400 bg-gray-50 border-b">
        <th class="p-[1%] font-semibold">ID PRODUCTO</th>
        <th class="p-[1%] font-semibold">PRODUCTO</th>
        <th class="p-[1%] font-semibold">CANTIDAD PRODUCTO</th>
        <th class="p-[1%] font-semibold">VALOR EN DOLARES</th>
      </tr>
      <tbody>
        <tr
          class="border-b"
          v-for="producto in controlPagina.getDatosPagina()"
          :key="producto.codigo_barra_producto"
        >
          <td class="p-[1.5%] text-center">{{ producto.codigo_barra_producto }}</td>
          <td class="text-center">{{ producto.nombre_producto }}</td>
          <td class="text-center">{{ producto.cantidad_producto }} Unidades</td>
          <td class="text-center">$ {{ producto.valor_en_dolares }}</td>
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
import axios from 'axios'
import ControlPaginas from '../../helpers/ControlPagina.js'

export default {
  data() {
    return {
      controlPagina: new ControlPaginas('/api/informe_inventario_valorado', axios)
    }
  },
  mounted() {
    this.controlPagina.cargarPaginas()
  },
  methods: {}
}
</script>
<style>
.pageActivate {
  font-weight: 1000;
  color: black;
}
</style>
