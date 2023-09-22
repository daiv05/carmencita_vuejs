<script setup>
import NavBar from "../../components/NavBar.vue";

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
                <h1 class="font-bold text-blue-700 text-xl">Informe de Productos por Vencer</h1>
            </div>
            <div class="flex justify-start items-center mt-4 ml-4">
                <a href="#" @click="$router.go(-1)" class="text-sm text-black font-medium flex items-center">
                    <img src="../../assets/icons/arrow.svg" alt="Regresar" class="h-6 w-6 mr-1"> Regresar
                </a>
            </div>
        </div>

        <section class="container mx-auto p-6 z-900">

            <div class="grid grid-cols-1 sm:grid-cols-6">


                <!-- Apartado para Listado de Productos  -->

                <section class="grid-cols-1 sm:col-span-5">
                    <section class="container mx-auto p-6 z-900">
                        <p
                            class="mt-2 flex-grow-0 flex-shrink-0 w-[80%] text-[20px] font-semibold text-left text-[#727171]">
                            Listado de producto a vencer en los proximos 15 dias.
                        </p>
                        <br>
                        <div class="w-auto p-4 mx-auto bg-slate-50 shadow rounded-md overflow-auto">


                            <table class="table w-full max-h-screen rounded-md">
                                <thead class="border-b bg-slate-100">
                                    <tr class="text-center">
                                        <th class="px-6 py-4 text-xs text-gray-500 font-semibold">N°</th>
                                        <th class="px-6 py-4 text-xs text-gray-500 font-semibold">Codigo de Barra</th>
                                        <th class="px-6 py-4 text-xs text-gray-500 font-semibold">Producto</th>
                                        <th class="px-6 py-4 text-xs text-gray-500 font-semibold">Fecha de Ingreso</th>
                                        <th class="px-6 py-4 text-xs text-gray-500 font-semibold">Fecha de Vencimiento</th>
                                        <th class="px-6 py-4 text-xs text-gray-500 font-semibold">Cantidad disponible</th>
                                    </tr>
                                </thead>
                                <tbody class="table-group-divider" id="contenido">
                                    <tr v-if="cargando">
                                        <td colspan="6">
                                            <h3>Cargando</h3>
                                        </td>
                                    </tr>
                                    <tr v-else v-for="lote, i in productosPV" :key="lote.id_lote"
                                        class="border-b-2 border-black-400 h-[40px] bg-black-300">
                                        <td v-text="(i + 1)" class="text-center"></td>
                                        <td v-text="(lote.codigo_barra_producto)" class="text-center"></td>
                                        <td v-text="(lote.producto.nombre_producto)" class="text-center"></td>
                                        <td v-text="(lote.fecha_ingreso)" class="text-center"></td>
                                        <td v-text="(lote.fecha_vencimiento)" class="text-center"></td>
                                        <td v-text="(lote.cantidad)" class="text-center"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                </section>
            </div>
            <!--Apartado para paginacion-->
            <div class="">

            </div>

        </section>

    </main>
</template>

<script>
//Importar axios
import axios from 'axios';
import api_url from '../../config.js';

export default {
    components: {
        NavBar
    },
    data() {
        return {
            cargando: false,
            query: '',
            productosPV: [],
        };
    },
    mounted() {
        this.getProductosPV();
    },
    computed: {
        resultsVisibility() {
            return (this.query.length > 0) ? 'show' : 'hide';
        }
    },
    methods: {
        getProductosPV() {
            this.cargando = true;
            this.productosPV = null;
            axios.get(api_url + '/productosXVenecer/')
                .then(res => {
                    this.productosPV = res.data.productosPV;
                    this.cargando = false;
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err);
                    this.cargando = false;
                })
        },

        actualizarTabla: function () {
            this.getProductosPV();
        }
    },
};
</script>

<style scoped>
.pageActivate {
    font-weight: 900;
    color: #000;
}
</style>