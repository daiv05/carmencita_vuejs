<script setup>
import NavBar from "../../components/NavBar.vue";
import DesactivarProducto from "../../components/Inventario/ProductoDesactivar.vue";
import api_url from "../../config";

const agregar_producto = "/agregar_producto";
//const editar_producto = "/editar_producto/:id_producto";

</script>

<template>
    
    <main>
        <!--  NavBar component  -->
        <NavBar />

        <!-- Encabezado -->
        <div class="w-full h-[60px]">
            <div class="flex justify-between px-16 w-full h-[60px] absolute left-0 bg-white"
                style="box-shadow: 0px 1.11px 3.329166889190674px 0 rgba(0,0,0,0.1), 0px 1.11px 2.219444513320923px 0 rgba(0,0,0,0.06);">
                <p class="mt-2 flex-grow-0 flex-shrink-0 w-[80%] text-[30px] font-semibold text-left text-[#3056d3]">
                    Gestión de Productos
                </p>
                <div
                    class="flex items-center mt-4 flex-grow-0 flex-shrink-0 h-[31px] py-[16px] rounded-[4.44px] bg-[#637381]">
                    <a :href="agregar_producto" class="flex-grow-0 flex-shrink-0 w-[225px] text-[13px] font-medium text-center text-white">
                        Agregar Producto
                    </a>
                </div>
            </div>
        </div>       

        <section class="container mx-auto p-6 z-900">

            <div class="grid grid-cols-1 sm:grid-cols-6">

                <!-- Apartado para Filtro  -->
                <div class="sm:col-span-1">
                    <div class="flex">
                        <div class="w-[100%] pr-4">
                            <div class="mb-4">

                                <table class="table-auto">
                                    <thead class="text-xl font-bold mb-2">
                                        <tr>
                                            <th class="px-4 py-3 font-semibold">Filtros</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <input type="radio" v-model="filtro" value="activos" class="mr-2">
                                            <span class="text-gray-700">Activos</span>
                                        </tr>
                                        <tr>
                                            <input type="radio" v-model="filtro" value="inactivos" class="mr-2">
                                            <span class="text-gray-700">Inactivos</span>
                                        </tr>
                                        <tr>
                                            <input type="radio" v-model="filtro" value="all" class="mr-2">
                                            <span class="text-gray-700">Todos</span>
                                        </tr>
                                        <tr>
                                            <button @click="aplicarFiltro" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-sky-700">Aplicar Filtro</button>
                                        </tr>
                                    </tbody>
                                </table>
                                
                            </div>
                            
                        </div>
                    </div>
                </div>
                
                <!-- Apartado para Listado de Productos  -->

                <section class="grid-cols-1 sm:col-span-5">           
                    <section class="container mx-auto p-6 z-900">
                        
                        <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                            <div class="w-full overflow-x-auto">
                                
                                <table class="w-full">
                                    
                                    <thead>
                                        <tr class="border-b-2 border-black-400 h-[40px] bg-slate-100">
                                            <th class="font-bold">Producto</th>
                                            <th class="font-bold">Código de Barras</th>
                                            <th class="font-bold">Precio Unitario</th>
                                            <th class="font-bold">Cantidad Disponible</th>
                                            <th></th>
                                        </tr>
                                    </thead>

                                    <tbody class="bg-white">
                                        <tr class="border-b-2 border-black-400 h-[40px] bg-black-300" v-for="producto in even(listaProductos, this.estado)" v-bind:key="producto.codigo_barra_producto">
                                            <td class="cursor-pointer px-4 py-3 text-center casillaClick hover:bg-gray-100" @click="mostrarProducto(producto.codigo_barra_producto)">
                                                <div class="">
                                                    <p class="font-semibold text-black">{{ producto.nombre_producto }}</p>
                                                </div>
                                            </td>
                                            <td class="px-4 py-3 text-ms font-semibold text-center">{{ producto.codigo_barra_producto }}</td>
                                            <td class="px-4 py-3 text-ms font-semibold text-center">${{ producto.precio_unitario }}</td>
                                            <td class="px-4 py-3 text-ms font-semibold text-center">{{ producto.cantidad_producto_disponible }}</td>                                        
                                            <td class="px-4 py-3 text-xs text-center">
                                                <button type="button" class="w-[70%] rounded-full focus:outline-none text-white hover:bg-cyan-500 focus:ring-4 focus:ring-cyan-300 font-medium text-sm px-5 py-2.5 mr-2 mb-2 bg-cyan-500 dark:hover:bg-cyan-700 dark:focus:ring-cyan-500" @click="modificarProducto(producto.codigo_barra_producto)">Editar</button>
                                                <DesactivarProducto  :estado="producto.esta_disponible" :id="producto.codigo_barra_producto" />
                                            </td>
                                        </tr>                                
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </section>

                </section>

            </div>


        </section>

        

    </main>
</template>

<script>

import axios from 'axios';
//import {ref} from 'vue';

export default {
    data() {
        return {
            listaProductos: [],
            estado: null,
            filtro: "activos",
            listaProductosFiltrados: [],
            productoSeleccionado: {},
            exitoTransaccion: false,
            mensajeTransaccion: "",
        };
    },
    mounted() {
        this.obtenerProductos();
    },
    methods: {
        obtenerProductos() {
            axios.get(api_url + '/productos')
                .then(response => {
                this.listaProductos = response.data;
                this.listaProductosFiltrados = response.data;
            })
                .catch(error => {
                console.log(error);
            });
        },
        aplicarFiltro() {
            if (this.filtro == "activos") {
                this.estado = 1;
            }
            else if (this.filtro == "inactivos") {
                this.estado = 0;
            }
            else if(this.filtro == "all"){
                this.estado = null;
            }
        },
        even: function(listaProductos,estado){
            if(estado == null){
                return listaProductos.filter(function(producto){
                return producto
            })
            }
            return listaProductos.filter(function(producto){
                return producto.esta_disponible == estado
            })
            
        },

        mostrarProducto(id_producto) {
            this.$router.push({ name: "editar_producto", params: { id_producto: id_producto } });
        },
        modificarProducto(id_producto) {
            // Esto es para que se redirija a la ruta de editar producto
            this.$router.push({ name: "editar_producto", params: { id_producto: id_producto } });
        }
    }

}

</script>