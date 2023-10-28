<script setup>
import { RouterLink } from 'vue-router';
import NavBar from '../../components/NavBar.vue'
import api_url from '../../config.js'
import btnConsultar from '../../components/Helpers/BotonConsultar.vue'
import btnEditar from '../../components/Helpers/BotonEditar.vue'
import btnAgregarAbono from '../../components/Credito/AbonoAgregar.vue'
import VueAxios from 'vue-axios';
</script>

<template>
    <main>
        <NavBar></NavBar>
        <div class="bg-slate-100 pb-4">
            <div>
                <div class="flex bg-white mx-auto p-5 shadow-md justify-between">
                    <h1 class="font-bold text-blue-700 text-xl">Gestión de Creditos</h1>
                    <div class="flex items-center rounded-[4.44px] bg-[#637381]">
                        <router-link to="/registrar_credito_proveedor"
                            class="w-auto h-auto m-2 text-[13px] font-medium text-center text-white">
                            Nuevo Credito
                        </router-link>
                    </div>
                </div>
                <div class="flex justify-start items-center mt-4 ml-4">
                    <a href="#" @click="$router.go(-1)" class="text-sm text-black font-medium flex items-center">
                        <img src="../../assets/icons/arrow.svg" alt="Regresar" class="h-6 w-6 mr-1"> Regresar
                    </a>
                </div>
            </div>

            <div class="m-auto p-1 pb-0 pt-4 w-4/5">
                <h2 class="font-bold text-lg">Listado de Creditos</h2>
            </div>

            <!--Controles para filtros-->
            <div class="grid grid-cols-3 p-6 pt-4 w-4/5 mx-auto">
                <div class="col-span-1 flex flex-col justify-center p-2">
                    <label class="block text-sm font-medium leading-6 text-gray-900" for="estado">Estado</label>
                    <div class="">
                        <select v-model="estado" name="estado" id="estado"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                            <option disabled selected>Seleccione...</option>
                            <option value="true">Pagados</option>
                            <option value="false">Pendientes</option>
                            <option value="all">Todos</option>
                        </select>
                    </div>
                </div>
                <div class="col-span-1 flex flex-col justify-center p-2">
                    <label class="block text-sm font-medium leading-6 text-gray-900" for="proveedor">Proveedor</label>
                    <div>
                        <select v-model="proveedor" name="proveedor" id="proveedor"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                            <option disabled>Seleccione...</option>
                            <option value="all">Todos</option>
                            <option v-for="proveedor in proveedores" :value="proveedor.id">{{ proveedor.nombre_proveedor }}
                            </option>
                        </select>
                    </div>
                </div>
                
                <div class="col-span-1 flex justify-center align-middle">
                    <button @click="getCreditos()"
                        class="bg-blue-500 px-3 py-2 rounded text-slate-50 h-fit flex m-auto">Aplicar filtros</button>
                </div>
            </div>

            <!--Tabla de creditos-->
            <div class="md:w-[85%] w-auto p-4 mx-auto bg-slate-50 shadow rounded-md overflow-auto">
                <table class="table w-full max-h-screen rounded-md">
                    <thead class="border-b bg-slate-100">
                        <tr class="text-center">
                            <td scope="col" class="px-6 py-4 text-xs text-gray-500 font-semibold">CODIGO</td>
                            <td scope="col" class="px-6 py-4 text-xs text-gray-500 font-semibold">PROVEEDOR</td>
                            <td scope="col" class="px-6 py-4 text-xs text-gray-500 font-semibold">TOTAL</td>
                            <td scope="col" class="px-6 py-4 text-xs text-gray-500 font-semibold">FECHA LIMITE</td>
                            <td scope="col" class="px-6 py-4 text-xs text-gray-500 font-semibold">ESTADO</td>
                            <td scope="col" class="px-6 py-4 text-xs text-gray-500 font-semibold">ACCIÓN</td>
                        </tr>
                    </thead>
                    <tbody class="text-center">
                        <tr v-for="(credito, index) in creditos" class="border-b hover:bg-slate-100 hover:shadow">
                            <td class="whitespace-nowrap px-2 py-4">{{ credito.id }}</td>
                            <td class="whitespace-nowrap px-4 py-4">{{ credito.proveedor.nombre_proveedor }}</td>
                            <td class="whitespace-nowrap px-4 py-4">${{ Number(credito.monto_credito).toFixed(2) }}</td>
                            <td class="whitespace-nowrap px-4 py-4">{{ moment(credito.fecha_limite_pago ).format('DD/MM/yyyy')}}</td>
                            <td v-if="credito.pendiente > 0" class="whitespace-nowrap px-4 py-4">Pendiente: ${{
                                credito.pendiente }}</td>
                            <td v-if="credito.pendiente == 0" class="whitespace-nowrap px-4 py-4">Pagado</td>
                            <td class="whitespace-nowrap px-4 py-4">
                                <btnConsultar :url="'/detalle_credito_proveedor/' + credito.id"></btnConsultar>
                                <!--<RouterLink v-bind:to="'/edit_cf/'+pedido.id" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full m-1">Editar</RouterLink>-->

                                <btnAgregarAbono :credito="credito"></btnAgregarAbono>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-if="vacio" class="flex justify-center py-6 m-auto">
                    <span class="text-slate-500">No se encontraron creditos</span>
                </div>
            </div>
            <!--PAGINACION-->
            <nav aria-label="Page navigation example" class="flex py-4 w-full">
                <ul class="inline-flex -space-x-px text-base h-10 mx-auto">
                    <li v-for="page in paginas">
                        <button type="button" @click="linksPagination(page.url)"
                            v-bind:class="{ 'bg-blue-600 text-white': page.active == true, 'rounded-l-lg': page == paginas[0], 'rounded-r-lg': page == paginas[paginas.length - 1], 'cursor-not-allowed': !page.url }"
                            v-bind:disabled="!page.url"
                            class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500  border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            v-html="page.label"></button>
                    </li>
                </ul>
            </nav>

        </div>
    </main>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {

    data() {
        return {
            proveedor:"all",
            estado: "all",
            creditos: [],
            proveedores: [],
            paginas: []
        }
    },

    methods: {
        getCreditos() {
            const params = {
                estado: this.estado,
                proveedor: this.proveedor
            }
            axios.post(api_url + '/lista_creditos_proveedores',params).then(
                response => (
                    this.creditos = response.data.pagination.data,
                    this.paginas = response.data.pagination.links
                )
            )
        },
        linksPagination(url) {
            const params = {
                estado: this.estado,
                proveedor: this.proveedor
            }
            axios.post(url,params)
                .then(
                    response => (
                        this.creditos = response.data.pagination.data,
                        this.paginas = response.data.pagination.links
                    )
                )
        },
        getProveedores() {
            axios.get(api_url + '/proveedores').then(
                (response) => (this.proveedores = response.data))
        },
    },

    mounted() {
        this.getCreditos();
        this.getProveedores();
    }

}

</script>