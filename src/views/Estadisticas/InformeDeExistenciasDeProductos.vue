<template>
    <main class="relative">
        <NavBar />
        <div class="w-full h-[60px]">
            <div class="flex justify-between px-16 w-full h-[60px] absolute left-0 bg-white" style="box-shadow: 0px 1.11px 3.329166889190674px 0 rgba(0, 0, 0, 0.1),
                0px 1.11px 2.219444513320923px 0 rgba(0, 0, 0, 0.06);">
                <p class="mt-2 flex-grow-0 flex-shrink-0 w-[80%] text-[30px] font-semibold text-left text-[#3056d3]">
                    Informe de existencias de productos
                </p>
            </div>
        </div>



        <section class="container mx-auto p-6 z-900">

            <div class="w-full grid mt-[3%] justify-items-end">
                <div class="">
                    <label for="" class="font-bold">Cambiar límite stock: </label>
                    <input type="number" class="rounded mx-3 mr-3" min="0" v-model="limite">
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-6 mt-[3%]">

                <!-- Apartado para Listado de Productos  -->
                <section class="grid-cols-1 sm:col-span-5">
                    <section class="container mx-auto p-6 z-900">

                        <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                            <div class="w-full overflow-x-auto">

                                <table class="w-full">

                                    <thead>
                                        <tr class="border-b-2 border-black-400 h-[40px] bg-slate-100">
                                            <th class="font-bold">Código de Barras</th>
                                            <th class="font-bold">Producto</th>
                                            <th class="font-bold">Cantidad Disponible</th>
                                            <th class="font-bold">Precio Unitario</th>
                                            <th></th>
                                        </tr>
                                    </thead>

                                    <tbody class="bg-white">
                                        <tr class="border-b-2 border-black-400 h-[40px] bg-black-300"
                                            v-bind:class="{ 'text-red-500': producto.cantidad_producto_disponible <= limite }"
                                            v-for="producto in listaProductos" v-bind:key="producto.codigo_barra_producto">
                                            <td class="px-4 py-3 text-ms font-semibold text-center">
                                                {{ producto.codigo_barra_producto }}
                                            </td>
                                            <td class="px-4 py-3 text-ms font-semibold text-center">{{ producto.nombre_producto }}</td>
                                            <td class="px-4 py-3 text-ms font-semibold text-center">{{ producto.cantidad_producto_disponible }}</td>
                                            <td class="px-4 py-3 text-ms font-semibold text-center">$ {{ producto.precio_unitario }}</td>
                                        </tr>
                                    </tbody>
                                </table>


                            </div>
                        </div>
                    </section>

                </section>

            </div>

            <!--Apartado para paginacion-->
            <nav aria-label="Page navigation example" class="flex py-4 w-full mt-[2%]">
                <ul class="inline-flex -space-x-px text-base h-10 mx-auto">
                    <li v-for="page in listaPaginas">
                        <button type="button" @click="linksPagination(page.url)"
                            v-bind:class="{ 'bg-blue-600 text-white': page.active == true, 'rounded-l-lg': page == listaPaginas[0], 'rounded-r-lg': page == listaPaginas[listaPaginas.length - 1], 'cursor-not-allowed': !page.url }"
                            v-bind:disabled="!page.url"
                            class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500  border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            v-html="page.label"></button>
                    </li>
                </ul>
            </nav>

        </section>

    </main>
</template>

<script>
import NavBar from '../../components/NavBar.vue'
import api_url from "../../config";
import axios from 'axios'

export default {
    data() {
        return {
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
            axios.get(api_url + '/productos/paginacion/5')
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
</script>i