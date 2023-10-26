<template>
  <main>
    <Form>
      <div class="flex justify-center mt-4 mb-2">
        <div class="grid grid-row-2 gap-2 justify-items-center">
          <p>Valor minímo</p>
          <Field type="number" name="valor_minimo" placeholder="0.00" step="0.05" class="block w-[90%] rounded" min="0.00"
            v-model="valorMinimo" :rules="validarValorMinimo" />
          <ErrorMessage name="valor_minimo"></ErrorMessage>
        </div>
        <div class="grid grid-row-2 gap-2 justify-items-center">
          <p>Valor máximo</p>
          <Field type="number" name="valor_maximo" placeholder="150.00" step="0.05" class="block w-[90%] rounded"
            min="0.00" v-model="valorMaximo" :rules="validarValorMaximo" />
          <ErrorMessage name="valor_maximo"></ErrorMessage>
        </div>
        <div class="flex justify-center align-center">
          <button @click="obtenerDatosFiltrados($event)"
            class="bg-indigo-700 text-white font-medium rounded-[5px] h-[50%] mt-[19%] p-[5px]">Aplicar filtro</button>
        </div>
      </div>
    </Form>
    <div class="w-full overflow-auto bg-white rounded-md shadow-md p-4">
      <table class="w-[100%] mt-[2%]">
        <tr class="border-b-2 border-black-400 h-[40px] bg-slate-100">
          <th class="p-[1%] font-semibold">ID PRODUCTO</th>
          <th class="p-[1%] font-semibold w-[40%]">PRODUCTO</th>
          <th class="p-[1%] font-semibold">CANTIDAD PRODUCTO</th>
          <th class="p-[1%] font-semibold">VALOR EN DOLARES</th>
        </tr>
        <tbody>
          <tr class="border-b" v-for="producto in controlPagina.getDatosPagina()" :key="producto.codigo_barra_producto">
            <td class="p-[1.5%] text-center">{{ producto.codigo_barra_producto }}</td>
            <td class="text-center">{{ producto.nombre_producto }}</td>
            <td class="text-center">{{ producto.cantidad_producto }} Unidades</td>
            <td class="text-center">$ {{ producto.valor_en_dolares }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex justify-center align-center mt-[5%]">
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
              <span class="sr-only">
              </span>
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
import ControlPaginas from '../../helpers/ControlPagina.js'
import { Form, Field, ErrorMessage } from 'vee-validate';

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      controlPagina: new ControlPaginas('/api/informe_inventario_valorado', axios),
      valorMinimo: 0.00,
      valorMaximo: 0.00,
      urlEndpointFiltro: "/api/filtro_datos_producto_valorado",
    }
  },
  mounted() {
    this.controlPagina.cargarPaginas()
  },
  methods: {
    validarValorMinimo(value) {

      return true;
    },
    validarValorMaximo(value) {

      return true;
    },
    obtenerDatosFiltrados(event) {
      event.preventDefault();
      this.controlPagina = null;
      this.controlPagina = new ControlPaginas(this.urlEndpointFiltro + this.obtenerParmetrosFiltro(), axios);
      this.controlPagina.cargarPaginas();
    },
    obtenerParmetrosFiltro() {
      if (this.valorMinimo != 0 && this.valorMaximo != 0) {
        //return `?valorMinimo=${this.valorMinimo}&valorMaximo=${this.valorMaximo}`;
        //return {"valorMinimo":this.valorMinimo,"valorMaximo":this.valorMaximo};
        return `/${this.valorMinimo}/${this.valorMaximo}`;
      }
      else if (this.valorMinimo != 0) {
        //return `?valorMinimo=${this.valorMinimo}`;
        //return {"valorMinimo":this.valorMinimo};
        return `/${this.valorMinimo}`;
      }
      else if (this.valorMaximo != 0) {
        //return `?valorMinimo=${this.valorMinimo}&valorMaximo=${this.valorMaximo}`;
        //return {"valorMaximo":this.valorMaximo};
        return `/${this.valorMinimo}/${this.valorMaximo}`;
      }
      else {
        return "";
      }
    }
  }
}
</script>
<style>
.pageActivate {
  font-weight: 1000;
  color: black;
}
</style>
