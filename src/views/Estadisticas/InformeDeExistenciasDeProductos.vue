<template>
    <main>
        <NavBar></NavBar>
        <div>
            <div class="flex bg-white mx-auto p-5 shadow-md justify-between">
                <h1 class="font-bold text-blue-700 text-xl">Informe de existencias de productos</h1>
            </div>
            <div class="flex justify-start items-center mt-4 ml-4">
                <a href="#" @click="$router.go(-1)" class="text-sm text-black font-medium flex items-center">
                    <img src="../../assets/icons/arrow.svg" alt="Regresar" class="h-6 w-6 mr-1"> Regresar
                </a>
            </div>
        </div>
        <div class="m-8">
            <div class=" flex w-full ml-8 mt-4">
                <div>
                    <label for="" class="font-bold text-sm">Resaltar productos con stock menor a</label>
                    <input type="number" class="rounded mx-3 mr-3 w-auto max-w-[100px]" min="1" v-model="limite">
                </div>
                <div>
                    <label for="sort_by_disponibles" class="font-bold text-sm">Ordenar por </label>
                    <select name="sort_by_disponibles" v-model="sort_by" id="" @change="obtenerProductos"
                    class="rounded mx-3 mr-3 w-fit max-w-[300px]"
                    >
                        <option value="0">Menos existencias</option>
                        <option value="1">Más existencias</option>
                    </select>
                </div>
            </div>
            <div class="mt-4">
                <!-- Apartado para Listado de Productos  -->
                <div class="m-8">
                    <div class="w-full overflow-auto bg-white rounded-md shadow-md p-4">
                        <table class="table w-full overflow-auto">
                            <thead>
                                <tr class="border-b-2 border-black-400 h-[40px] bg-slate-100">
                                    <th class="font-bold text-sm">Código de Barras</th>
                                    <th class="font-bold text-sm">Producto</th>
                                    <th class="font-bold text-sm">Cantidad Disponible</th>
                                    <th class="font-bold text-sm">Precio Unitario</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="border-b-2 border-black-400 h-[40px] bg-black-300"
                                    v-bind:class="{ 'text-red-500': producto.cantidad_producto_disponible <= limite }"
                                    v-for="producto in listaProductos" v-bind:key="producto.codigo_barra_producto">
                                    <td class="px-4 py-3 text-ms font-semibold text-center">
                                        {{ producto.codigo_barra_producto }}
                                    </td>
                                    <td class="px-4 py-3 text-ms font-semibold text-center">{{
                                        producto.nombre_producto }}</td>
                                    <td class="px-4 py-3 text-ms font-semibold text-center">{{
                                        producto.cantidad_producto_disponible }}</td>
                                    <td class="px-4 py-3 text-ms font-semibold text-center">$ {{
                                        producto.precio_unitario }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <!--Apartado para paginacion-->
            <nav aria-label="Page navigation example" class="flex py-4 w-full mt-[2%]">
                <ul class="inline-flex -space-x-px text-base h-10 mx-auto">
                    <li v-for="page in listaPaginas">
                        <button type="button" @click="linksPagination(page.url)"
                            v-bind:class="{ 'text-black font-bold': page.active == true, 'rounded-l-lg': page == listaPaginas[0], 'rounded-r-lg': page == listaPaginas[listaPaginas.length - 1], 'cursor-not-allowed': !page.url }"
                            v-bind:disabled="!page.url"
                            class="flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            v-html="page.label"></button>
                    </li>
                </ul>
            </nav>
        </div>
    </main>
</template>

<script>
import NavBar from '../../components/NavBar.vue'
import api_url from "../../config";
import axios from 'axios'

export default {
    data() {
        return {
            sort_by:0,
            listaProductos: [],
            limite: 100,
            listaPaginas: [],
        }
    },
    created() {
        //this.obtenerDatosPaginado();
        this.obtenerProductos();
    },
    components: {
        NavBar
    },
    methods: {
        obtenerProductos() {
            axios.get(api_url + '/productos/paginacion/5?sort_by='+this.sort_by)
                .then(response => {
                    this.listaProductos = response.data.productos.data;
                    this.listaPaginas = response.data.productos.links;
                    //console.log(this.listaPaginas);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        linksPagination(url) {
            axios.get(url)
                .then(response => {
                    this.listaProductos = response.data.productos.data;
                    this.listaPaginas = response.data.productos.links;
                })
                .catch(error => {
                    console.log(error);
                });
        },
    }
}
</script>