<template>
  <main>
    <NavBar></NavBar>
    <div>
      <div class="flex bg-white mx-auto p-5 shadow-md justify-between">
        <h1 class="font-bold text-blue-700 text-xl">Gestión de Existencias de Productos</h1>
        <div class="flex items-center rounded-[4.44px] bg-[#637381]">
          <button class="w-auto h-auto my-2 mx-4 text-[13px] font-medium text-center text-white"
            @click="abrirModalAgregar()">
            Agregar Lote
          </button>
        </div>
      </div>
      <div class="flex justify-start items-center mt-4 ml-4">
        <a href="#" @click="$router.go(-1)" class="text-sm text-black font-medium flex items-center">
          <img src="../../assets/icons/arrow.svg" alt="Regresar" class="h-6 w-6 mr-1"> Regresar
        </a>
      </div>
    </div>

    <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert"
      v-if="isSucces">
      <span class="font-medium">{{ mensajeResultado }}</span>
    </div>
    <div class="mt-8 md:w-[85%] w-auto p-4 mx-auto bg-slate-50 shadow rounded-md overflow-auto">
      <table class="table w-full max-h-screen rounded-md">
      <tr class="border-b bg-slate-100">
        <th class="p-[1%] font-semibold">ID</th>
        <th class="p-[1%] font-semibold w-[30%]">Producto</th>
        <th class="p-[1%] font-semibold">Fecha de Ingreso</th>
        <th class="p-[1%] font-semibold">Cant. Ingresada</th>
        <th class="p-[1%] font-semibold">Acciones</th>
      </tr>
      <tbody>
        <tr class="border-b" v-for="lote in listaLotes" :key="lote.id_lote">
          <td class="p-[1.5%] text-center">{{ lote.id_lote }}</td>
          <td class="text-center">{{ lote.producto.nombre_producto }}</td>
          <td class="text-center">{{ convertirFecha(lote.fecha_ingreso) }}</td>
          <td class="text-center">{{ lote.cantidad_total_unidades }} Unidades</td>
          <td>
            <div class="flex justify-center content-center">
              <button
                class="my-2 mx-2 px-4 py-2 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white border border-green-500 hover:border-transparent rounded-full"
                @click="abrirModalConsultar(lote)">Consultar</button>
              <button
                class="my-2 mx-2 px-4 py-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent rounded-full"
                @click="abrirModalEditar(lote)">Editar</button>
              <button
                class="my-2 mx-2 px-4 py-2 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white border border-red-500 hover:border-transparent rounded-full"
                @click="abrirModalEliminacion(lote)">Eliminar</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    
  </div>
    <div class="flex justify-center mt-[2%] mb-[2%]">
      <nav aria-label="Page navigation example">
        <ul class="flex items-center -space-x-px h-8 text-sm">
          <li @click="cargarPaginaPrevia(prev)">
            <a href="#"
              class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              
              <svg class="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M5 1 1 5l4 4" />
              </svg>
              <span class="mx-2">Anterior</span>
            </a>
          </li>
          <li v-for="pageLink in pagesLinks" @click="cargarPagina(pageLink)">
            <a href="#" :class="{ pageActivate: pageLink.active === true }"
              class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">{{
                pageLink.label }}</a>
          </li>
          <li @click="cargarPaginaSiguiente(next)">
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

    <Teleport to="body">
      <ModalEditarLote :tempLote="loteParametroComponente" v-if="controlModalEditarLote"
        @cerrarModalEditar="cerrarModalEditar" @guardarLoteModificado="guardarLoteModificado"></ModalEditarLote>
    </Teleport>
    <Teleport to="body">
      <ModalAgregarLote v-if="controlModalAgregarLote" @cerrarModalAgregar="cerrarModalAgregar"
        @guardarLoteNuevo="guardarLoteNuevo"></ModalAgregarLote>
    </Teleport>
    <Teleport to="body">
      <ModalConsultarLote v-if="controlModalConsultar" :lote="loteParametroComponente"
        @cerrarModalConsultar="cerrarModalConsultar" @abrirModalConsultar="abrirModalConsultar"></ModalConsultarLote>
    </Teleport>
    <Teleport to="body">
      <ModalConfirmarEliminacionVue v-if="controlModalEliminacion" :urlEndpoint="urlEndpoint" :mensaje="mensaje"
        @cerrarModalEliminacion="cerrarModalEliminacion"></ModalConfirmarEliminacionVue>
    </Teleport>
  </main>
</template>

<script>
import NavBar from '../../components/NavBar.vue';
import ModalEditarLote from '../../components/Inventario/ModalEditarLote.vue';
import ModalAgregarLote from '../../components/Inventario/ModalAgregarLote.vue';
import ModalConsultarLote from '../../components/Inventario/ModalConsultarLote.vue';
import ModalConfirmarEliminacionVue from '../../components/Inventario/ModalConfirmarEliminacion.vue';
import moment from 'moment'
import axios from 'axios'

export default {
  components: {
    NavBar,
    ModalEditarLote,
    ModalAgregarLote,
    ModalConsultarLote,
    ModalConfirmarEliminacionVue
  },
  data() {
    return {
      mensajeCabecera: 'Gestion de existencia de productos',
      mensajeBoton: 'Agregar Lote',
      urlPeticion: '/api/gestion_existencias',
      listaLotes: [],
      pagesLinks: [],
      localCurrentPage: 1,
      prev: '',
      next: '',
      prev: '',
      next: '',
      temResponseData: null,
      controlModalEditarLote: false,
      controlModalAgregarLote: false,
      loteParametroComponente: null,
      mensajeResultado: '',
      isSucces: false,
      controlModalConsultar: false,
      controlModalEliminacion: false,
      mensaje: '',
      urlEndpoint: ''
    }
  },
  mounted() {
    this.obtenerListaLotes(this.urlPeticion)
  },
  methods: {
    obtenerListaLotes(urlPeticion) {
      axios
        .get(urlPeticion)
        .then((response) => {
          this.setConfiguracionPaginacion(response)
          console.log('El valor de previo')
          console.log(this.prev)
        })
        .catch()
    },
    setConfiguracionPaginacion(response) {
      this.listaLotes = response.data.data
      this.pagesLinks = response.data.meta.links.slice(1, response.data.meta.links.length - 1)
      this.temResponseData = response.data
      this.setParametrosPaginacion()
      this.setCurrentPage()
    },
    cargarPaginaSiguiente(paqueteUrl) {
      if (paqueteUrl.url != null) {
        axios
          .get(paqueteUrl.url)
          .then((response) => {
            this.listaLotes = []
            this.setConfiguracionPaginacion(response)
          })
          .catch((response) => {
            console.log(response)
          })
      }
    },
    cargarPaginaPrevia(paqueteUrl) {
      if (paqueteUrl.url != null) {
        axios
          .get(paqueteUrl.url)
          .then((response) => {
            this.listaLotes = []
            this.setConfiguracionPaginacion(response)
          })
          .catch((response) => {
            console.log(response)
          })
      }
    },
    cargarPagina(paqueteUrl) {
      axios
        .get(paqueteUrl.url)
        .then((response) => {
          this.listaLotes = []
          this.setConfiguracionPaginacion(response)
        })
        .catch((response) => {
          console.log(response.response.data)
        })
    },
    setNextPage() {
      console.log(this.temResponseData)
      this.next = this.temResponseData.meta.links[this.temResponseData.meta.links.length - 1]
    },
    setPrevPage() {
      this.prev = this.temResponseData.meta.links[0]
    },
    setPagesList() {
      this.pagesLinks = this.temResponseData.data.meta.links.slice(
        0,
        this.temResponseData.data.meta.links.length - 2
      )
    },
    setCurrentPage() {
      this.localCurrentPage = this.temResponseData.meta.current_pages
    },
    setParametrosPaginacion() {
      this.setNextPage()
      this.setPrevPage()
      //this.setPagesList();
    },
    cerrarModalEditar() {
      this.controlModalEditarLote = false
    },
    abrirModalEditar(lote) {
      this.loteParametroComponente = lote
      this.controlModalEditarLote = true
    },
    activarMensajeExito(mensajeExito) {
      this.mensajeResultado = mensajeExito
      this.isSucces = true
      setTimeout(() => {
        this.isSucces = false
      }, 3000)
    },
    guardarLoteModificado(tempLote) {
      /*agregar mensaje de alerta*/
      /*let copyListaLotes = [...this.listaLotes]
      this.listaLotes = []
      console.log('la copia del arreglo es: ', copyListaLotes)
      copyListaLotes.forEach((element, index) => {
        if (element.id_lote === tempLote.dataForm.id_lote) {
          copyListaLotes[index] = tempLote.dataForm
          this.activarMensajeExito(tempLote.mensaje)
        }
      })
      this.listaLotes = [...copyListaLotes]*/
      this.obtenerListaLotes(this.urlPeticion);
      this.controlModalEditarLote = false;
    },
    cerrarModalAgregar() {
      this.controlModalAgregarLote = false
    },
    abrirModalAgregar() {
      this.controlModalAgregarLote = true
    },
    guardarLoteNuevo(nuevoLote) {
      /*this.listaLotes.push(nuevoLote.lote);
      this.mensajeResultado = nuevoLote.mensaje;
      this.isSucces = true;
      this.controlModalAgregarLote = false;
      setTimeout(()=>{
        this.isSucces = false;
      },2000);*/
      this.mensajeResultado = nuevoLote.mensaje
      this.isSucces = true
      this.controlModalAgregarLote = false
      setTimeout(() => {
        this.isSucces = false
        location.reload()
      }, 3000)
    },
    cerrarModalConsultar() {
      this.controlModalConsultar = false
    },
    abrirModalConsultar(lote) {
      this.loteParametroComponente = lote
      this.controlModalConsultar = true
    },
    abrirModalEliminacion(lote) {
      this.urlEndpoint = '/api/gestion_existencias/' + lote.id_lote
      this.mensaje = '¿Esta seguro que desea eliminar el lote?'
      this.controlModalEliminacion = true
    },
    cerrarModalEliminacion(mensaje) {
      if (mensaje) {
        this.mensajeResultado = mensaje
        this.isSucces = true
        setTimeout(() => {
          this.isSucces = false
          location.reload()
        }, 3000)
      }
      this.controlModalEliminacion = false
    },
    convertirFecha(fecha) {
      return moment(fecha).format("DD/MM/YY");
    }
  }
}
</script>
<style scoped>
.pageActivate {
  font-weight: 900;
  color: black;
}

.loteModificado {
  border: 2px solid rgb(156 163 175);
}
</style>
