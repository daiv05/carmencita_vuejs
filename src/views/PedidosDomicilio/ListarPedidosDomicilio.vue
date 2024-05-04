<script setup>
import { RouterLink } from 'vue-router';
import NavBar from '../../components/NavBar.vue'
import api_url from '../../config.js'
import btnConsultar from '../../components/Helpers/BotonConsultar.vue'
import btnEditar from '../../components/Helpers/BotonEditar.vue'
import btnEliminar from '../../components/Helpers/BotonEliminar.vue'
</script>

<template>
    <main>
        <NavBar></NavBar>
        <div class="bg-slate-100 pb-4">
            <div>
                <div class="flex bg-white mx-auto p-5 shadow-md justify-between">
                    <h1 class="font-bold text-blue-700 text-xl">Gestión de Pedidos a Domicilio</h1>
                    <div class="flex items-center rounded-[4.44px] bg-[#637381]">
                        <router-link to="/facturacion/registrar_nueva_venta"
                        class="w-auto h-auto m-2 text-[13px] font-medium text-center text-white">
                        Nuevo pedido
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
                <h2 class="font-bold text-lg">Listado de Pedidos</h2>
            </div>
            <!--Controles para filtros-->
            <div class="grid grid-cols-4 p-6 pt-4 w-4/5 mx-auto">
                <div class="col-span-1 flex flex-col justify-center p-2">
                    <label class="block text-sm font-medium leading-6 text-gray-900" for="estado">Estado</label>
                    <div class="">
                        <select v-model="estado" name="estado" id="estado"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                            <option disabled>Seleccione...</option>
                            <option value="asignadas">Asignadas</option>
                            <option value="no_asignadas">Sin asignar</option>
                            <option value="">Todos</option>
                        </select>
                    </div>
                </div>
                <div class="col-span-1 flex flex-col justify-center p-2">
                    <label class="block text-sm font-medium leading-6 text-gray-900" for="tipo">Tipo</label>
                    <div>
                        <select v-model="tipo" name="tipo" id="tipo"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                            <option disabled>Seleccione...</option>
                            <option value="all">Todos</option>
                            <option value="factura">Factura</option>
                            <option value="credito">Credito Fiscal</option>
                        </select>
                    </div>
                </div>
                <div class="col-span-1 flex flex-col justify-center p-2">
                    <label class="block text-sm font-medium leading-6 text-gray-900" for="fecha">Fecha</label>
                    <div><input v-model="fecha" type="Date"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                </div>
                <div class="col-span-1 flex justify-center align-middle">
                    <button @click="filtrarPedidos"
                        class="bg-blue-500 px-3 py-2 rounded text-slate-50 h-fit flex m-auto">Aplicar filtros</button>
                </div>
            </div>
            <!--Tabla de pedidos-->
            <div
                class="md:w-[85%] w-auto p-4 mx-auto bg-slate-50 shadow rounded-md overflow-auto">
                <table class="table w-full max-h-screen rounded-md">
                    <thead class="border-b bg-slate-100">
                        <tr class="text-center">
                            <td scope="col" class="px-6 py-4 text-xs text-gray-500 font-semibold">CODIGO</td>
                            <td scope="col" class="px-6 py-4 text-xs text-gray-500 font-semibold">CLIENTE</td>
                            <td scope="col" class="px-6 py-4 text-xs text-gray-500 font-semibold">FECHA</td>
                            <td scope="col" class="px-6 py-4 text-xs text-gray-500 font-semibold">TOTAL</td>
                            <td scope="col" class="px-6 py-4 text-xs text-gray-500 font-semibold">TIPO</td>
                            <td scope="col" class="px-6 py-4 text-xs text-gray-500 font-semibold">ESTADO</td>
                            <td scope="col" class="px-6 py-4 text-xs text-gray-500 font-semibold">ACCIÓN</td>
                        </tr>
                    </thead>
                    <tbody class="text-center">
                        <tr v-for="(pedido, index) in pedidos" class="border-b hover:bg-slate-100 hover:shadow">
                            <td class="whitespace-nowrap px-2 py-4">{{ pedido.id }}</td>
                            <td class="whitespace-nowrap px-4 py-4">{{ pedido.cliente }}</td>
                            <td class="whitespace-nowrap px-4 py-4">{{ formatFecha(pedido.fecha) }}</td>
                            <td class="whitespace-nowrap px-4 py-4">${{ Number(pedido.total).toFixed(2) }}</td>
                            <td class="whitespace-nowrap px-4 py-4">{{ pedido.tipo }}</td>
                            <td v-if="pedido.hr" class="whitespace-nowrap px-4 py-4">HR-{{ pedido.hr }}</td>
                            <td v-if="!pedido.hr" class="whitespace-nowrap px-4 py-4">Sin asignar</td>
                            <td v-if="pedido.tipo == 'Factura'" class="whitespace-nowrap px-4 py-4">
                                <!--<RouterLink v-bind:to="'/detail_sales/'+pedido.id" target="_blank" class="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded-full m-1">ver</RouterLink>
                                    <RouterLink v-bind:to="'/edit_sales/'+pedido.id" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full m-1">Editar</RouterLink>
                                    <RouterLink v-bind:to="'/delete_sales/'+pedido.id" class="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded-full m-1">Eliminar</RouterLink>
                                    -->
                                <btnConsultar :url="'/facturacion/detail_sales/' + pedido.id"></btnConsultar>
                                <!--<RouterLink v-bind:to="'/edit_cf/'+pedido.id" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full m-1">Editar</RouterLink>-->
                                <btnEditar :url="'/facturacion/modificar_pedido/factura/' + pedido.id"></btnEditar>
                                <!--<RouterLink v-bind:to="'/delete_cf/'+pedido.id" class="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded-full m-1">Eliminar</RouterLink>-->
                                <btnEliminar :url="'/delete_pedido/factura/' + pedido.id"
                                    :titulo="'Eliminar Pedido' + pedido.id"
                                    :mensaje="'El pedido ' + pedido.id + ' se eliminara de la base de datos'"
                                    :lista="pedidos" :index="index">
                                </btnEliminar>
                            </td>
                            <td v-if="pedido.tipo == 'Credito Fiscal'" class="whitespace-nowrap px-4 py-4">
                                <!--<RouterLink v-bind:to="'/detail_cf/'+pedido.id" target="_blank" class="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded-full m-1">ver</RouterLink>-->
                                <btnConsultar :url="'/facturacion/detail_cf/' + pedido.id"></btnConsultar>
                                <!--<RouterLink v-bind:to="'/edit_cf/'+pedido.id" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full m-1">Editar</RouterLink>-->
                                <btnEditar :url="'/facturacion/modificar_pedido/credito_fiscal/' + pedido.id"></btnEditar>
                                <!--<RouterLink v-bind:to="'/delete_cf/'+pedido.id" class="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded-full m-1">Eliminar</RouterLink>-->
                                <btnEliminar :url="'/delete_pedido/credito_fiscal/' + pedido.id"
                                    :titulo="'Eliminar Pedido' + pedido.id"
                                    :mensaje="'El pedido ' + pedido.id + ' se eliminara de la base de datos'"
                                    :lista="pedidos" :index="index">
                                </btnEliminar>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-if="vacio" class="flex justify-center py-6 m-auto">
                    <span class="text-slate-500">No se encontraron pedidos </span>
                </div>
            </div>
            <!--PAGINACION -->
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

export default {
    data() {
        return {
            estado: '',
            tipo: 'all',
            fecha: null,
            pedidos: [],
            paginas: [],
            vacio: true, //si pedidos esta vacio,
        }
    },
    created() {
        this.getPedidos();
    },
    methods: {
        formatFecha(fecha) {
            let date = new Date(fecha);
            // Obtener día, mes y año
            let dia = date.getUTCDate();
            let mes = date.getUTCMonth() + 1; // Los meses van de 0 a 11, así que sumamos 1
            let year = date.getUTCFullYear();

            // Asegurarse de que el día y el mes tengan dos dígitos
            dia = dia < 10 ? '0' + dia : dia;
            mes = mes < 10 ? '0' + mes : mes;

            // Crear la fecha formateada
            return dia + '/' + mes + '/' + year;
        },
        pedidosVacio() {
            //Controla si la lista de pedidos esta vacia, se ocupa para mostrar el mensaje 'pedidos no encontrados'
            if (this.pedidos.length > 0) {
                this.vacio = false;
            } else {
                this.vacio = true;
            }
        },
        getPedidos() {
            //Obtiene todos los pedidos sin filtros
            const params = {
                tipo: 'all',
            }
            axios.post(api_url + '/pedidos_domicilio', params)
                .then(
                    response => (
                        this.pedidos = response.data.pagination.data,
                        this.paginas = response.data.pagination.links,
                        this.pedidosVacio()
                    )
                )
        },
        filtrarPedidos() {
            // filtra los pedidos de acuerdo a los parametros tipo, estado, fecha
            const params = {
                tipo: this.tipo,
                estado: this.estado,
                fecha: this.fecha
            }
            axios.post(api_url + '/pedidos_domicilio', params)
                .then(
                    response => (
                        this.pedidos = response.data.pagination.data,
                        this.paginas = response.data.pagination.links,
                        this.pedidosVacio()
                    )
                )
        },
        linksPagination(url) {
            //Esta funcion obtiene los datos de la pagina siguiente/anterior
            //manda los parametros de los filtros para que no se pierdan al llamar a la siguiente/anterior pagina
            const params = {
                tipo: this.tipo,
                estado: this.estado,
                fecha: this.fecha
            }
            axios.post(url, params)
                .then(
                    response => (
                        this.pedidos = response.data.pagination.data,
                        this.paginas = response.data.pagination.links,
                        this.pedidosVacio()
                    )
                )
        }

    }
}

</script>