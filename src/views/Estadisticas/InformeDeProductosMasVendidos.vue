<template>
    <main class="relative">
        <NavBar />
        <div class="w-full h-[60px]">
            <div class="flex justify-between px-16 w-full h-[60px] absolute left-0 bg-white" style="box-shadow: 0px 1.11px 3.329166889190674px 0 rgba(0, 0, 0, 0.1),
                0px 1.11px 2.219444513320923px 0 rgba(0, 0, 0, 0.06);">
                <p class="mt-2 flex-grow-0 flex-shrink-0 w-[80%] text-[30px] font-semibold text-left text-[#3056d3]">
                    Informe de productos más y menos vendidos
                </p>
            </div>
        </div>

        <div class="flex justify-evenly align-center w-[90%] m-auto mt-[2%]">

            <div class="align-middle">
                <label for="" class="block font-semibold">Desde:</label>
                <input type="date" v-model="fechaInicio" class="rounded-md block" />
                <p v-if="mensajeError != '' " class="text-red-500 W-[50%]">{{ mensajeError }}</p>
            </div>

            <div class="align-middle">
                <label for="" class="font-semibold">Hasta:</label>
                <input type="date" @change="validarFechaFin()" v-model="fechaFin" class="rounded-md block" />
            </div>

            <div class="">
                <label for="" class="block font-semibold">Cantidad a mostrar (Máx 50):</label>
                <input type="number" v-model="cantidadAMostrar" class="rounded-md" name="" id="">
            </div>

            <div class="flex">
                <div class="self-center">
                    <label for="" class="font-semibold">Productos más vendidos: </label>
                    <input type="radio" class="rounded-md" value="desc" v-model="tipoOrden" name="" id="desc">
                </div>
            </div>

            <div class="flex">
                <div class="self-center">
                    <label for="" class="font-semibold">Productos menos vendidos: </label>
                <input type="radio" class="rounded-md" value="asc" v-model="tipoOrden" name="" id="asc">
                </div>
            </div>

            <div>
                <button type="button"
                    class="text-white bg-indigo-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mt-[5%] dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    @click="obtenerDatosFiltrados($event)" >Aplicar</button>
            </div>

        </div>

        <div>
            <ComponenteTablaInformesVue :controlPagina="controlPagina" />
        </div>

        <div class="flex justify-center align-center mt-[2%]">
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
                    <li v-for="pageLink in controlPagina.obtenerListadoEnlaces()" :key="pageLink.label"
                        @click="controlPagina.obtenerPagina(pageLink)">
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
import NavBar from '../../components/NavBar.vue'
import ControlPagina from '../../helpers/ControlPagina.js'
import axios from 'axios'
import ComponenteTablaInformesVue from '../../components/Inventario/ComponenteTablaInformes.vue';
export default {
    components: {
        NavBar,
        ComponenteTablaInformesVue,
    },
    data() {
        return {
            controlPagina: new ControlPagina('/api/productos_mas_vendidos/', axios),
            fechaInicio: '',
            fechaFin: '',
            cantidadAMostrar: 10,
            tipoOrden: 'desc',
            mensajeError: '',
        }
    },
    methods: {
        construirDatosfiltro(){
            let datosFiltro = {};
            if (this.fechaInicio != '') {
                datosFiltro.fechaInicio = this.fechaInicio;
            }
            if (this.fechaFin != '') {
                datosFiltro.fechaFin = this.fechaFin;
            }
            if (this.cantidadAMostrar > 0) {
                datosFiltro.cantidadAMostrar = this.cantidadAMostrar;
            }
            if (this.tipoOrden != '') {
                datosFiltro.tipoOrden = this.tipoOrden;
            }
            return datosFiltro;
        },
        obtenerDatosFiltrados(event){
            event.preventDefault();
            this.controlPagina = new ControlPagina('/api/productos_mas_vendidos/', axios);
            this.controlPagina.setParametrosFiltro(this.construirDatosfiltro());
            this.controlPagina.cargarPaginas();
        },
        validarFechaFin(){
            if (this.fechaInicio != '' && this.fechaFin != '') {
                if (Date.parse(this.fechaInicio) > Date.parse(this.fechaFin)) {
                    this.mensajeError = 'La fecha de inicio no puede ser mayor a la fecha de fin';
                }
                else{
                    this.mensajeError = '';
                }
            }
        },
    },
    mounted() {
        this.controlPagina.setParametrosFiltro(this.construirDatosfiltro());
        this.controlPagina.cargarPaginas();
    },
}

</script>

<style scoped>

.isSelected{
    background-color: #3056d3;
    color: white;
}

</style>