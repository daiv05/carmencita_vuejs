<script setup>
import { RouterLink } from 'vue-router'
import NavBar from '../../components/NavBar.vue'
import api_url from '../../config.js'
import btnConsultar from '../../components/Helpers/BotonConsultar.vue'
import btnEditar from '../../components/Helpers/BotonEditar.vue'
import btnEliminar from '../../components/Helpers/BotonEliminar.vue'
</script>

<template>
  <main class="h-screen">
    <NavBar></NavBar>
    <div class="bg-slate-100 h-screen">
      <div>
        <div class="flex bg-white mx-auto p-5 shadow-md justify-between">
          <h1 class="font-bold text-blue-700 text-xl">Gestión de Ausencias</h1>
        </div>
        <div class="flex justify-start items-center mt-4 ml-4">
          <a
            href="#"
            @click="$router.go(-1)"
            class="text-sm text-black font-medium flex items-center"
          >
            <img src="../../assets/icons/arrow.svg" alt="Regresar" class="h-6 w-6 mr-1" /> Regresar
          </a>
        </div>
      </div>

      <div class="m-auto p-1 pb-0 pt-4 w-4/5">
        <h2 class="font-bold text-lg">Listado de Justificaciones</h2>
      </div>
      <!--Controles para filtros-->
      <div class="grid grid-cols-4 p-6 pt-4 w-4/5 mx-auto">
        <div class="col-span-1 flex flex-row py-2">
          <div class="mx-2">
            <label class="block text-sm font-medium leading-6 text-gray-900" for="fecha"
              >Fecha de ausencia</label
            >
            <input
              v-model="fechaFiltro"
              type="date"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div class="mx-4 mt-6">
            <button
              @click="limpiarFiltros"
              class="bg-blue-500 px-3 py-2 rounded text-slate-50 w-24 text-center"
            >
              Limpiar
            </button>
          </div>
        </div>
      </div>
      <!--Tabla de pedidos-->
      <v-table :headers="headersTabla" :items="itemsTabla">
        <template #fecha_solicitud="{ item }">{{
          $moment(item.fecha_solicitud).format('DD/MM/YYYY')
        }}</template>
        <template #empleado="{ item }">{{
          item.ausencia.empleado.primer_nombre + ' ' + item.ausencia.empleado.primer_apellido
        }}</template>
        <template #fecha_ausencia="{ item }">{{
          $moment(item.ausencia.fecha_ausencia).format('DD/MM/YYYY')
        }}</template>
        <template #estado="{ item }">
          <span
            :class="{
              'bg-red-500 text-white': item.estado.nombre == 'Rechazado',
              'bg-yellow-500 text-white': item.estado.nombre == 'Pendiente',
              'bg-green-500 text-white': item.estado.nombre == 'Aprobado'
            }"
            class="px-4 py-2 rounded-full"
            >{{ item.estado.nombre }}</span
          >
        </template>
        <template #acciones="{ item }">
          <div class="justify-center flex flex-row">
            <button
              @click="verDetalleSolicitud(item)"
              class="text-sm bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full m-1"
            >
              Detalle
            </button>
            <button
            v-if="!isGerente"
              :style="item.estado.nombre == 'Pendiente' ? '' : 'visibility: hidden'"
              @click="eliminarSolicitud(item)"
              class="text-sm bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded-full m-1"
            >
              Eliminar
            </button>
          </div>
        </template>
      </v-table>
      <!-- Paginacion -->
      <VPagination :totalPages="totalPages" v-model="page" :currentPage="page"> </VPagination>
    </div>

    <ModalDetalleJustificar
      :isGerente="isGerente"
      v-if="showModalDetalle"
      @recargar="getJustificaciones"
      titulo="Detalle de justificacion"
      v-model="showModalDetalle"
      :justificacion="justificacionSelected"
    ></ModalDetalleJustificar>

    <ModalEliminar
      v-if="showModalEliminar"
      @cerrar="showModalEliminar = false"
      @recargar="getJustificaciones"
      :id="idJustificacionEliminar"
    ></ModalEliminar>


  </main>
</template>

<script>
import axios from 'axios'
import VTable from '@/components/VTable.vue'
import VPagination from '@/components/VPagination.vue'
import ModalDetalleJustificar from '@/components/RecursosHumanos/JustificacionAusencias/ModalDetalleJustificar.vue'
import ModalEliminar from '../../components/RecursosHumanos/JustificacionAusencias/ModalEliminar.vue'
export default {
  components: {
    VTable,
    VPagination,
    ModalDetalleJustificar
  },
  data() {
    return {
      page: 1,
      totalPages: 1,
      fechaFiltro: null,
      headersTabla: [
        { nombre: 'Fecha de solicitud', valor: 'fecha_solicitud' },
        { nombre: 'Empleado', valor: 'empleado' },
        { nombre: 'Fecha de ausencia', valor: 'fecha_ausencia' },
        { nombre: 'Estado', valor: 'estado' },
        { nombre: 'Acciones', valor: 'acciones' }
      ],
      itemsTabla: [],
      datosAuth: {},
      isGerente: false,
      justificacionSelected: {},
      showModalDetalle: false,
      idJustificacionEliminar: null,
      showModalEliminar: false
    }
  },
  created() {
    this.datosAuth = JSON.parse(localStorage.authUser)
    this.isGerente = this.datosAuth.user.roles[0].name == 'Gerente'
    this.getJustificaciones()
  },
  methods: {
    getJustificaciones() {
      this.watchLoader(true)
      const id_empleado = this.datosAuth.user.id_empleado
      //Obtiene todos los pedidos sin filtros
      const filtros = {
        fechaAusencia: this.fechaFiltro,
        page: this.page
      }
      if (!this.isGerente) {
        filtros.id_empleado = id_empleado
        this.headersTabla = this.headersTabla.filter((header) => header.valor != 'empleado')
      }
      axios
        .post('api/ausencias/justificaciones/listado-gestion', filtros)
        .then((response) => {
          console.log(response)
          this.itemsTabla = response.data.data
          this.totalPages = response.data.totalPages
        })
        .catch((error) => console.log(error))
        .finally(() => {
          this.watchLoader(false)
        })
    },
    limpiarFiltros() {
      this.fechaFiltro = null
      this.getJustificaciones()
    },
    verDetalleSolicitud(item) {
      this.justificacionSelected = item
      this.showModalDetalle = true
    },
    eliminarSolicitud(item) {
    }
  },
  watch: {
    fechaFiltro() {
      this.getJustificaciones()
    }
  }
}
</script>
