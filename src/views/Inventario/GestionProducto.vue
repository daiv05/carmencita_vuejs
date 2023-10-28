<script setup>
import NavBar from "../../components/NavBar.vue";
import DesactivarProducto from "../../components/Inventario/ProductoDesactivar.vue";
import api_url from "../../config";
import ModalConsultarProductoComponent from "../../components/Inventario/ModalConsultarProductoComponent.vue";
import notImg from '@/assets/producto_no_disponible.png'

const agregar_producto = "agregar_producto";
//const editar_producto = "/editar_producto/:id_producto";

</script>

<template>
    <main>
        <!--  NavBar component  -->
        <NavBar />

        <!-- Encabezado -->
        <div>
            <div class="flex bg-white mx-auto p-5 shadow-md justify-between">
                <h1 class="font-bold text-blue-700 text-xl">Gestión de Productos</h1>
                <div class="flex items-center rounded-[4.44px] bg-[#637381]">
                    <router-link to="/ventas_inventarios/agregar_producto"
                        class="w-auto h-auto m-2 text-[13px] font-medium text-center text-white">
                        Agregar Producto
                    </router-link>
                </div>
            </div>
            <div class="flex justify-start items-center mt-4 ml-4">
                <a href="#" @click="$router.go(-1)" class="text-sm text-black font-medium flex items-center">
                    <img src="../../assets/icons/arrow.svg" alt="Regresar" class="h-6 w-6 mr-1"> Regresar
                </a>
            </div>
        </div>

        <!-- <div class="w-full h-[60px]">
            <div class="flex justify-between px-16 w-full h-[60px] absolute left-0 bg-white"
                style="box-shadow: 0px 1.11px 3.329166889190674px 0 rgba(0,0,0,0.1), 0px 1.11px 2.219444513320923px 0 rgba(0,0,0,0.06);">
                <p class="mt-2 flex-grow-0 flex-shrink-0 w-[80%] text-[30px] font-semibold text-left text-[#3056d3]">
                    Productos
                </p>
                <div
                    class="flex items-center mt-4 flex-grow-0 flex-shrink-0 h-[31px] py-[16px] rounded-[4.44px] bg-[#637381]">
                    <router-link to="/agregar_producto"
                        class="flex-grow-0 flex-shrink-0 w-[225px] text-[13px] font-medium text-center text-white">
                        Agregar Producto
                    </router-link>
                </div>
            </div>
        </div> -->

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
                                            <div class="my-1">
                                                <input type="radio" v-model="filtro" value="activos" class="mr-2">
                                                <span class="text-gray-700">Activos</span>
                                            </div>
                                        </tr>
                                        <tr>
                                            <div class="my-1">
                                                <input type="radio" v-model="filtro" value="inactivos" class="mr-2">
                                                <span class="text-gray-700">Inactivos</span>
                                            </div>
                                        </tr>
                                        <tr>
                                            <div class="my-1">
                                                <input type="radio" v-model="filtro" value="all" class="mr-2">
                                                <span class="text-gray-700">Todos</span>
                                            </div>
                                        </tr>
                                        <tr>
                                            <button @click="aplicarFiltro"
                                                class="bg-blue-500 my-1 text-white px-4 py-2 rounded-lg hover:bg-sky-700">Aplicar
                                                Filtro</button>
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
                                        <tr class="border-b-2 border-black-400 h-[40px] bg-black-300"
                                            v-for="producto in even(listaProductos, estado)"
                                            v-bind:key="producto.codigo_barra_producto">
                                            <td class="cursor-pointer px-4 py-3 text-center casillaClick hover:bg-gray-100"
                                                @click="mostrarProducto(producto.codigo_barra_producto)">
                                                <div class="flex items-center">
                                                    <img class="w-10 h-10 rounded-full mr-4"
                                                        v-bind:src="api_url + '/productos/' + producto.codigo_barra_producto + '/foto'"
                                                        v-if="producto.foto != ''" alt="Avatar of Jonathan Reinink" />
                                                    <img :src="notImg" v-if="producto.foto == ''" alt=""
                                                        class="w-10 h-10 rounded-full mr-4">
                                                    <p class="font-semibold text-black">{{ producto.nombre_producto }}</p>
                                                </div>
                                            </td>
                                            <td class="px-4 py-3 text-ms font-semibold text-center">{{
                                                producto.codigo_barra_producto }}</td>
                                            <td class="px-4 py-3 text-ms font-semibold text-center">{{
                                                producto.precio_unitario }}</td>
                                            <td class="px-4 py-3 text-ms font-semibold text-center">{{
                                                producto.cantidad_producto_disponible }}</td>
                                            <td class="px-4 py-3 text-xs text-center">
                                                <button type="button"
                                                    class="rounded-full focus:outline-none text-white hover:bg-cyan-500 focus:ring-4 focus:ring-cyan-300 font-medium text-sm px-5 py-2.5 mr-2 mb-2 bg-cyan-500 dark:hover:bg-cyan-700 dark:focus:ring-cyan-500"
                                                    @click="modificarProducto(producto.codigo_barra_producto)">Editar</button>
                                                <DesactivarProducto :estado="producto.esta_disponible"
                                                    :id="producto.codigo_barra_producto" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>


                            </div>
                        </div>
                    </section>

                </section>

            </div>

            <!--Apartado para paginacion-->
            <div class="">

                <div class="max-w-2xl mx-auto">

                    <nav class="flex justify-center text-center">
                        <ul class="inline-flex -space-x-px">
                            <li @click="obtenerPaginaAnterior()">
                                <a href="#"
                                    class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                            </li>
                            <li v-if="calcularNumeroPaginas() > 0" v-for="page in calcularNumeroPaginas()"
                                @click="obtenerPaginaProducto(page)" :id="crearIdPaginacion(page)">
                                <a href="#" :class="{ pageActivate: page === controlPagina }"
                                    class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{{
                                        page }}</a>
                            </li>
                            <li @click="obtenerPaginaSiguiente()">
                                <a href="#"
                                    class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                            </li>
                        </ul>
                    </nav>

                </div>
            </div>


        </section>

        <Teleport to="body">
            <ModalConsultarProductoComponent :productoParametro="productoSeleccionado" v-if="controlModalProducto"
                @cerrarModal="cerrarModal"></ModalConsultarProductoComponent>
        </Teleport>

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
            filtro: "all",
            listaProductosFiltrados: [],
            productoSeleccionado: {},
            exitoTransaccion: false,
            mensajeTransaccion: "",
            controlModalProducto: false,
            ModalConsultarProductoComponent: false,
            ulrFoto: "",
            productoPaginado: {},
            total: 0,
            registrosPorPagina: 0,
            enlacesPaginaProducto: [],
            prev_page_url: "",
            next_page_url: "",
            controlPagina: 0,
        };
    },
    beforeMount() {
        if(this.$store.state.existenDatos == true && this.$store.state.fromAgregarEditarProducto == true){
            this.obtenerDatosPaginado(this.$store.state.urlPaginaActual);
            this.$store.commit("setFromAgregarEditarProducto",{fromAgregarEditarProducto:false});
        }
        else{
            this.obtenerDatosPaginado();
            this.obtenerProductos();
        }
    },
    mounted() {

    },
    methods: {
        obtenerProductos() {
            axios.get(api_url + '/productos')
                .then(response => {
                    //this.listaProductos = response.data;
                    this.listaProductosFiltrados = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        obtenerDatosPaginado(url=null) {
            let enlaceConsulta = api_url + '/productos/paginacion/' + 5;
            if (url!=null && url!=""){
                enlaceConsulta = url;
            }
            axios.get(enlaceConsulta).then(response => {
                this.productoPaginado = response.data.productos;
                this.listaProductos = this.productoPaginado.data;
                this.total = this.productoPaginado.total;
                this.registrosPorPagina = this.productoPaginado.per_page;
                this.enlacesPaginaProducto = this.productoPaginado.links;
                this.prev_page_url = this.productoPaginado.prev_page_url;
                this.next_page_url = this.productoPaginado.next_page_url;
                this.controlPagina = this.productoPaginado.current_page;
                console.log(this.productoPaginado.links);
                console.log(this.productoPaginado.data);
                this.obtenerProductos();
                this.setEstadoPaginacion(this.obtenerPaginaActualProducto());
            })
                .catch(error => {
                    console.log(error);
                });
        },
        obtenerPaginaActualProducto(){
            let urlActual = "";
            this.enlacesPaginaProducto.forEach((page)=>{
                if(page.active == true){
                    urlActual = page.url;
                }
            });
            return urlActual;
        },
        calcularNumeroPaginas() {
            return Math.ceil(this.total / this.registrosPorPagina);
        },
        obtenerPaginaProducto(page) {
            axios.get(this.enlacesPaginaProducto[page].url).then(response => {
                //this.productoPaginado = response.data.productos;
                this.listaProductos = [];
                this.listaProductos = response.data.productos.data;
                this.prev_page_url = response.data.productos.prev_page_url;
                this.next_page_url = response.data.productos.next_page_url;
                this.controlPagina = page;
                this.setEstadoPaginacion(this.enlacesPaginaProducto[page].url);
                console.log(response);
                //this.total = this.productoPaginado.total;
                //this.registrosPorPagina = this.productoPaginado.per_page;
                //this.enlacesPaginaProducto = this.productoPaginado.links;
                //console.log(this.productoPaginado.data);
            })
                .catch(error => {
                    console.log('msj');
                    console.log(error);
                });
        },
        setEstadoPaginacion(urlPaginaActual){
            this.$store.commit("setExistenDatos",{existenDatos:true});
            this.$store.commit("setUrlPaginaActual",{urlPaginaActual:urlPaginaActual});
        },
        obtenerPaginaSiguiente() {
            if (this.next_page_url != null && this.next_page_url != "") {
                axios.get(this.next_page_url).then(response => {
                    this.setEstadoPaginacion(this.next_page_url);
                    this.listaProductos = [];
                    this.listaProductos = response.data.productos.data;
                    this.next_page_url = response.data.productos.next_page_url;
                    this.prev_page_url = response.data.productos.prev_page_url;
                    this.controlPagina++;
                });
            }
            else {
                console.log('No hay siguiente');
            }
        },
        obtenerPaginaAnterior() {
            if (this.prev_page_url != null && this.prev_page_url != "") {
                axios.get(this.prev_page_url).then(response => {
                    this.setEstadoPaginacion(this.prev_page_url);
                    this.listaProductos = [];
                    this.listaProductos = response.data.productos.data;
                    this.prev_page_url = response.data.productos.prev_page_url;
                    this.next_page_url = response.data.productos.next_page_url;
                    this.controlPagina--;
                });
            }
            else {
                console.log('No hay anterior');
            }
        },
        crearIdPaginacion(page) {
            return 'pagina' + page.toString();
        },
        aplicarFiltro() {
            if (this.filtro == "activos") {
                this.estado = 1;
            }
            else if (this.filtro == "inactivos") {
                this.estado = 0;
            }
            else if (this.filtro == "all") {
                this.estado = null;
            }
        },
        even: function (listaProductos, estado) {
            if (estado == null) {
                return listaProductos.filter(function (producto) {
                    return producto
                })
            }
            return listaProductos.filter(function (producto) {
                return producto.esta_disponible == estado
            })

        },
        mostrarProducto(id_producto) {
            // Mostrar el modal de consultar producto
            for (let index = 0; index < this.listaProductos.length; index++) {
                if (this.listaProductos[index].codigo_barra_producto == id_producto) {
                    this.productoSeleccionado = this.listaProductos[index];
                    this.controlModalProducto = true;
                    break;
                }
            }
        },
        cerrarModal() {
            this.controlModalProducto = false;
        },
        modificarProducto(id_producto) {
            // Esto es para que se redirija a la ruta de editar producto
            this.$router.push({ name: "editar_producto", params: { id_producto: id_producto } });
        },

        cargarFoto(producto) {
            if (producto.foto != "") {
                axios.get(api_url + "/productos/" + producto.codigo_barra_producto + "/foto", { responseType: 'arraybuffer' })
                    .then(
                        response => {
                            let blob = new Blob([response.data], { type: "image/*" });
                            let imageUrl = URL.createObjectURL(blob);
                            this.ulrFoto = imageUrl;
                            console.log(imageUrl);
                            //return imageUrl;
                            //return 'https://i.pinimg.com/550x/64/b7/35/64b735fe92c580cad36351a26d4b13c9.jpg';
                        });
            }
        },


    }
}

</script>

<style scoped>.pageActivate {
    font-weight: 900;
    color: #000;
}</style>