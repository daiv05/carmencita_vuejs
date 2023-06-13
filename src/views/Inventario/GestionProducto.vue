<script setup>
import NavBar from "../../components/NavBar.vue";
import DesactivarProducto from "../../components/Inventario/ProductoDesactivar.vue";

const agregar_producto = "/agregar_producto";

</script>

<template>
    
    <main>
        <!--  NavBar component  -->
        <NavBar />

        <!--  Titulo  -->
        <div class="container mx-auto p-10 ">
            <h1 class="font-bold text-blue-700 text-2xl ">Gestión de Productos</h1>
        </div>

        <section class="container mx-auto p-6 z-900">

            <div class="text-xl mb-6 text-left ml-4">Listado de Productos</div>

            <!-- component -->
            <div class="text-end">
                <a :href="agregar_producto" class="bg-indigo-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-20 mt-2 ">
                    Agregar Producto
                </a>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-6">

                <!-- Apartado para Filtro  -->
                <div class="sm:col-span-1">
                    <div class="flex">
                        <div class="w-1/4 pr-4">
                            <div class="mb-4">
                                <h2 class="text-xl font-bold mb-2">Filtros</h2>
                                <label class="flex items-center">
                                    <input type="radio" v-model="filtro" value="activos" class="mr-2">
                                    <span class="text-gray-700">Activos</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="radio" v-model="filtro" value="inactivos" class="mr-2">
                                    <span class="text-gray-700">Inactivos</span>
                                </label>
                            </div>
                            <button @click="aplicarFiltro" class="bg-blue-500 text-white px-4 py-2 rounded-md">Aplicar Filtro</button>
                        </div>
                    </div>
                </div>

                

                <section class="grid-cols-1 sm:col-span-5">           
                <section class="container mx-auto p-6 z-900">
                    
                    <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                        <div class="w-full overflow-x-auto">
                            
                            <table class="w-full">
                                
                                <thead>
                                    <tr
                                        class="text-md font-semibold tracking-wide text-gray-900 bg-gray-100 uppercase text-center">
                                        <th class="px-4 py-3">Producto</th>
                                        <th class="px-4 py-3">Código de Barras</th>
                                        <th class="px-4 py-3">Precio Unitario</th>
                                        <th class="px-4 py-3">Cantidad Disponible</th>
                                        <th class="px-4 py-3">Acciones</th>
                                    </tr>
                                </thead>

                                <tbody class="bg-white">
                                    <tr class=" text-gray-700" v-for="producto in listaProductos" v-bind:key="producto.codigo_barra_producto">
                                        <td class="cursor-pointer px-4 py-3 text-center casillaClick hover:bg-gray-100" @click="mostrarProducto(producto.codigo_barra_producto)">
                                            <div class="">
                                                <p class="font-semibold text-black">{{ producto.nombre_producto }}</p>
                                            </div>
                                        </td>
                                        <td class="px-4 py-3 text-ms font-semibold text-center">{{ producto.codigo_barra_producto }}</td>
                                        <td class="px-4 py-3 text-ms font-semibold text-center">${{ producto.precio_unitario }}</td>
                                        <td class="px-4 py-3 text-ms font-semibold text-center">{{ producto.cantidad_producto_disponible }}</td>                                        
                                        <td class="px-4 py-3 text-xs text-center">
                                            <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-emerald-500 dark:hover:bg-green-700 dark:focus:ring-green-800" @click="modificarProducto(producto.codigo_barra_producto)">Editar</button>
                                            <DesactivarProducto :estado="producto.esta_disponible" :id="producto.codigo_barra_producto" />
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
            axios.get("http://127.0.0.1:8000/api/productos")
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
                this.listaProductosFiltrados = this.listaProductos.filter(producto => producto.estado_producto == 1);
            }
            else if (this.filtro == "inactivos") {
                this.listaProductosFiltrados = this.listaProductos.filter(producto => producto.estado_producto == 0);
            }
        },

        agregarProducto() {
            this.$router.push({ name: "AgregarProducto" });
        },
        modificarProducto(id_producto) {
            this.$router.push({ name: "modificarProducto", params: { id_producto: id_producto } });
        },
        eliminarProducto(id_producto) {
            this.$router.push({ name: "eliminarProducto", params: { id_producto: id_producto } });
        },
        mostrarProducto(id_producto) {
            this.$router.push({ name: "mostrarProducto", params: { id_producto: id_producto } });
        },
    }

}

</script>