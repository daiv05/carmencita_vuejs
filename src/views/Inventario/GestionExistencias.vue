<template>
  <main>
    <NavBar></NavBar>
  
    <table class="w-[95%] lg:w-[75%] m-auto mt-[2%]">
      <tr class="text-gray-400 bg-gray-50 border-b">
        <th class="p-[1%] font-semibold">ID DE LOTE</th>
        <th class="p-[1%] font-semibold">PRODUCTO</th>
        <th class="p-[1%] font-semibold">FECHA DE INGRESO</th>
        <th class="p-[1%] font-semibold">CANTIDAD INGRESADA</th>
        <th class="p-[1%] font-semibold">ACCIONES</th>
      </tr>
      <tbody>
        <tr class="border-b" v-for="lote in listaLotes" :key="lote.id_lote">
          <td class="p-[1.5%] text-center">{{ lote.id_lote }}</td>
          <td class="text-center">{{ lote.producto.nombre_producto }}</td>
          <td class="text-center">{{ lote.fecha_ingreso }}</td>
          <td class="text-center">{{ lote.cantidad_total_unidades }} Unidades</td>
          <td>
            <div class="flex justify-between content-center">
              <button class="">Consultar</button>
              <button @click="abrirModalEditar(lote)">Editar</button>
              <button>Eliminar</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex justify-center mt-[2%] mb-[2%]">
      <nav aria-label="Page navigation example">
        <ul class="flex items-center -space-x-px h-8 text-sm">
          <li @click="cargarPaginaPrevia(prev)">
            <a
              href="#"
              class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
              <span class="sr-only">Previous</span>
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
          <li v-for="pageLink in pagesLinks" @click="cargarPagina(pageLink)">
            <a
              href="#"
              :class="{pageActivate : pageLink.active === true }"
              class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
               >{{ pageLink.label }}</a
            >
          </li>
          <li @click="cargarPaginaSiguiente(next)">
          <a
            href="#"
            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span class="sr-only">Next</span>
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
    <Teleport to="body">
          <ModalEditarLote :tempLote="loteParametroComponente" v-if="controlModalEditarLote" @cerrarModalEditar="cerrarModalEditar" @guardarLoteModificado="guardarLoteModificado"></ModalEditarLote>
    </Teleport>
  </main>
</template>

<script>
import NavBar from '../../components/NavBar.vue'
import ModalEditarLote from '../../components/Inventario/ModalEditarLote.vue'
import axios from 'axios'

export default {
  components: {
    NavBar,
    ModalEditarLote
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
      controlModalEditarLote:false,
      loteParametroComponente:null,
    }
  },
  mounted() {
    this.obtenerListaLotes(this.urlPeticion);
  },
  methods: {
    obtenerListaLotes(urlPeticion) {
      axios
        .get(urlPeticion)
        .then((response) => {
            this.setConfiguracionPaginacion(response);
            console.log("El valor de previo");
            console.log(this.prev);
        })
        .catch()
    },
    setConfiguracionPaginacion(response){
          this.listaLotes = response.data.data
          this.pagesLinks = response.data.meta.links.slice(1, response.data.meta.links.length-1)
          this.temResponseData = response.data;
          this.setParametrosPaginacion()
          this.setCurrentPage()
    },
    cargarPaginaSiguiente(paqueteUrl){
      if(paqueteUrl.url!=null){
        axios.get(paqueteUrl.url)
        .then( (response)=>{
            this.listaLotes = [];
            this.setConfiguracionPaginacion(response);
        } )
        .catch(
          (response)=>{
            console.log(response);
          }
        );
      }
    },
    cargarPaginaPrevia(paqueteUrl){
      if(paqueteUrl.url!=null){
        axios.get(paqueteUrl.url)
        .then((response)=>{
          this.listaLotes = [];
          this.setConfiguracionPaginacion(response);
        })
        .catch(
          (response)=>{
            console.log(response);
          }
        );
      }
    },
    cargarPagina(paqueteUrl) {
      axios.get(paqueteUrl.url)
      .then((response)=>{
        this.listaLotes = [];
        this.setConfiguracionPaginacion(response);
      })
      .catch(
        (response)=>{
          console.log(response.response.data);
        }
      );
    },
    setNextPage() {
      console.log(this.temResponseData)
      this.next = this.temResponseData.meta.links[this.temResponseData.meta.links.length - 1]
    },
    setPrevPage() {
      this.prev = this.temResponseData.meta.links[0];
    },
    setPagesList() {
      this.pagesLinks = this.temResponseData.data.meta.links.slice(
        0,
        this.temResponseData.data.meta.links.length - 2
      )
    },
    setCurrentPage() {
      this.localCurrentPage = this.temResponseData.meta.current_pages;
    },
    setParametrosPaginacion() {
      this.setNextPage()
      this.setPrevPage()
      //this.setPagesList();
    },
    cerrarModalEditar(){
      this.controlModalEditarLote = false;
    },
    abrirModalEditar(lote){
      this.loteParametroComponente = lote;
      this.controlModalEditarLote = true;
    },
    guardarLoteModificado(tempLote){
      /*agregar mensaje de alerta*/
      let copyListaLotes = [...this.listaLotes];
      this.listaLotes = [];
      console.log("la copia del arreglo es: ",copyListaLotes);
      copyListaLotes.forEach((element,index)=>{
        if(element.id_lote===tempLote.id_lote){
          copyListaLotes[index] = tempLote;
        }
      });
      this.listaLotes = [...copyListaLotes];
      this.controlModalEditarLote = false;
    }
  }
}
</script>
<style scoped>
.pageActivate{
  font-weight: 900;
  color: black;
}
</style>