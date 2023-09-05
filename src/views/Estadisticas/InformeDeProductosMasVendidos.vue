<template>
    <main class="relative">
        <NavBar />
        <div class="w-full h-[60px]">
            <div class="flex justify-between px-16 w-full h-[60px] absolute left-0 bg-white" style="box-shadow: 0px 1.11px 3.329166889190674px 0 rgba(0, 0, 0, 0.1),
                0px 1.11px 2.219444513320923px 0 rgba(0, 0, 0, 0.06);">
                <p class="mt-2 flex-grow-0 flex-shrink-0 w-[80%] text-[30px] font-semibold text-left text-[#3056d3]">
                    Informe de productos más vendidos
                </p>
            </div>
        </div>

        <div class="flex justify-evenly align-center w-[90%] m-auto mt-[1%]">

            <div class="align-middle">

                <label for="" class="block">Desde:</label>
                <input type="date" v-model="fechaInicio" class="rounded-md block"/>

            </div>

            <div class="align-middle">

                <label for="">Hasta:</label>

                <input type="date" v-model="fechaFin" class="rounded-md block" />

            </div>

            <div class="">
                
                <label for="" class="block">Cantidad a mostrar (Máx 50):</label>

                <input type="number" class="rounded-md" name="" id="">

            </div>

            <button type="button" class="text-white bg-indigo-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Aplicar</button>

        </div>

        <div>
            <ComponenteTablaInformesVue :controlPagina="controlPagina" />
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
            cantidadLimite: '',
        }
    },
    mounted() {
        this.controlPagina.cargarPaginas();
    },
}

</script>i