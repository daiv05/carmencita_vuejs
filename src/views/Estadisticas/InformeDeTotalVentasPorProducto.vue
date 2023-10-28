<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate';
</script>
<template>
  <main>
    <NavBar></NavBar>
    <!-- Encabezado -->
    <div class="mb-8">
      <div class="flex bg-white mx-auto p-5 shadow-md justify-between">
        <h1 class="font-bold text-blue-700 text-xl">Informe de Ventas por Producto</h1>
      </div>
      <div class="flex justify-start items-center mt-4 ml-4">
        <a href="#" @click="$router.go(-1)" class="text-sm text-black font-medium flex items-center">
          <img src="../../assets/icons/arrow.svg" alt="Regresar" class="h-6 w-6 mr-1"> Regresar
        </a>
      </div>
    </div>
    <Form @submit="obtenerDatosFiltrados($event)">
      <section class="grid grid-row-2 gap-5 w-[90%] m-auto">
        <article class=" grid grid-cols-7 gap-1">
          <div class="grid grid-rows-3 gap-1 col-span-1 mr-2">
            <label for="fechaInicio" class="font-bold">Desde</label>
            <Field type="date" class="rounded p-2 h-[40px]" v-model="fechaInicioVenta" name="fecha_inicio"
              :rules="validarFecha" />
            <ErrorMessage name="fecha_inicio" class="mensajeDeError" />
          </div>
          <div class="grid grid-rows-3 gap-1 col-span-1 mr-2">
            <label for="fechaFin" class="font-bold">Hasta</label>
            <Field type="date" class="rounded p-2 h-[40px]" v-model="fechaFinVenta" :rules="validarFecha"
              name="fecha_fin" />
            <ErrorMessage name="fecha_fin" class="mensajeDeError" />
          </div>
          <div class="grid grid-cols-2 gap-2 col-span-2">
            <div class="grid grid-rows-3 gap-1 mr-2">
              <label for="" class="font-bold">Mín. Ingresos ($)</label>
              <Field type="number" step="0.15" class="rounded p-2 h-[40px] w-[80%]" name="min_total" min="0"
                id="minTotal" v-model="minTotal" :rules="validarMinTotal" />
              <ErrorMessage name="min_total" class="mensajeDeError" />
            </div>
            <div class="grid grid-rows-3 gap-1 font-bold mr-2">
              <label for="" class="font-bold">Máx. Ingresos ($)</label>
              <Field type="number" step="0.15" class="rounded p-2 h-[40px] w-[80%]" name="max_total" v-model="maxTotal"
                :rules="validarMaxTotal" min="0" />
              <ErrorMessage name="max_total" class="mensajeDeError" />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-1 col-span-2">
            <div class="grid grid-rows-3 gap-1 mr-2">
              <label for="" class="font-bold">Unid. Mínimas</label>
              <Field type="number" step="0.15" class="rounded p-2 h-[40px] w-[60%]" name="min_total_producto"
                v-model="minTotalProducto" :rules="validarMinTotalProducto" min="0" />
              <ErrorMessage name="min_total_producto" class="mensajeDeError" />
            </div>
            <div class="grid grid-rows-3 gap-1 font-bold mr-2">
              <label for="" class="font-bold">Unid. Máximas</label>
              <Field type="number" step="0.15" class="rounded p-2 h-[40px] w-[60%]" :rules="validarMaxTotalProducto"
                name="max_total_producto" v-model="maxTotalProducto" min="0" />
              <ErrorMessage name="max_total_producto" class="mensajeDeError" />
            </div>
          </div>
          <div class="flex justify-center align-center">
            <button class="bg-indigo-700 text-white h-[30%] rounded mt-[28%] p-[5px]"> Aplicar Filtro </button>
          </div>
        </article>
      </section>
    </Form>
    <ComponenteTablaInformesVue :controlPagina="controlPagina"></ComponenteTablaInformesVue>
    
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
import axios from 'axios';
import ControlPaginas from '../../helpers/ControlPagina.js';
import ComponenteTablaInformesVue from '../../components/Inventario/ComponenteTablaInformes.vue';
import NavBar from "../../components/NavBar.vue";

import moment from 'moment';

export default {

  components: {
    ComponenteTablaInformesVue,
    NavBar,
  },
  data() {
    return {
      fechaInicioVenta: null,
      fechaFinVenta: null,
      controlPagina: new ControlPaginas("/api/ventas_por_producto", axios),
      minTotal: null,
      maxTotal: null,
      minTotalProducto: null,
      maxTotalProducto: null,
    }
  },
  mounted() {
    this.controlPagina.cargarPaginas();
  },
  methods: {
    validarFecha(values) {
      if (this.fechaFinVenta != null && this.fechaInicioVenta != null) {
        if (Date.parse(this.fechaInicioVenta) > Date.parse(this.fechaFinVenta)) {
          return "La fecha de inicio debe ser menor a la fecha fin";
        }
      }
      return true;
    },
    validarMinTotal(value) {
      if (value < 0) {
        return "El parametro debe ser un numero real positivo";
      }
      else if (this.maxTotal != null && (this.minTotal > this.maxTotal)) {
        return "Mín.Total debe ser menor a Máx.Total";
      }
      return true;
    },
    validarMaxTotal(value) {
      if (value < 0) {
        return "El parametro debe ser un numero real positivo";
      }
      else if ((this.minTotal != null && this.maxTotal != null) && (this.minTotal > this.maxTotal)) {
        return "Máx.Total debe ser mayor a Mín.Total";
      }
      return true;
    },
    validarMinTotalProducto(value) {
      if (value < 0) {
        return "El parametro debe ser un numero real positivo";
      }
      else if (this.minTotalProducto != null && (this.minTotalProducto >= this.maxTotalProducto)) {
        return "Mín.Cantidad debe ser menor a Máx.Total";
      }
      return true;
    },
    validarMaxTotalProducto(value) {
      if (value < 0) {
        return "El parametro debe ser un numero real positivo";
      }
      else if ((this.minTotalProducto != null && this.maxTotalProducto != null) && (this.maxTotalProducto >= this.minTotalProducto)) {
        return "Máx.Cantidad debe ser mayor a Mín.Total";
      }
      return true;
    },
    validarNumerosRalesPositivos(numero) {
      let regExpresion = /^\d+(\.\d{1,2})?$/;
      if (!regExpresion.test(numero)) {
        return false;
      }
      return true;
    },
    validarNumeroEnterosPositivos(numero) {
      let regExpresion = /^\d+$/;
      if (!regExpresion.test(numero)) {
        return false
      }
      return true;
    },
    obtenerDatosFiltrados(event) {
      event.preventDefault;
      let parametrosFiltro = this.construirDataFiltro();
      console.log(parametrosFiltro);
      this.controlPagina = new ControlPaginas("/api/ventas_por_producto", axios);
      this.controlPagina.setParametrosFiltro(
        parametrosFiltro
      );
      //console.log(parametrosFiltro);
      this.controlPagina.cargarPaginas();
    },
    construirDataFiltro() {
      let parametrosFiltro = {};
      if (this.fechaInicioVenta) {
        parametrosFiltro.fechaInicioVenta = this.fechaInicioVenta;
        this.fechaInicioVenta = null;
      }
      if (this.fechaFinVenta) {
        parametrosFiltro.fechaFinVenta = this.fechaFinVenta;
        this.fechaFinVenta = null;
      }
      if (this.minTotal) {
        parametrosFiltro.minTotal = this.minTotal;
        this.minTotal = null;
      }
      if (this.maxTotal) {
        parametrosFiltro.maxTotal = this.maxTotal;
        this.maxTotal = null;
      }
      if (this.minTotalProducto) {
        parametrosFiltro.minTotalProducto = this.minTotalProducto;
        this.minTotalProducto = null;
      }
      if (this.maxTotalProducto) {
        parametrosFiltro.maxTotalProducto = this.maxTotalProducto;
        this.maxTotal = null;
      }
      if (Object.entries(parametrosFiltro).length === 0) {
        return {};
      }
      return parametrosFiltro;
    }
  }
}

</script>
<style scoped>
.mensajeDeError {
  color: #dc2626;
}
</style>
