<script setup>
import NavBar from '@/components/NavBar.vue';
</script>

<template>
    <NavBar />
    <div class="h-screen">
        <div class="w-full bg-slate-100">
            <div>
                <div class="flex bg-white mx-auto p-5 shadow-md justify-between">
                    <h1 class="font-bold text-blue-700 text-xl">Ventas</h1>
                </div>
                <div class="flex justify-start items-center mt-4 ml-4">
                    <a href="#" @click="$router.go(-1)" class="text-sm text-black font-medium flex items-center">
                        <img src="../../assets/icons/arrow.svg" alt="Regresar" class="h-6 w-6 mr-1"> Regresar
                    </a>
                </div>
            </div>


            <!-- Tabs para Consumidor Final y Credito Fiscal-->
            <div class="flex flex-col h-full mt-6 ml-2 pl-2 pr-4">
                <div class="flex justify-start items-center border-b-2 border-b-indigo-500">
                    <div class="tab" :class="{ 'active': activeTab === 0 }" @click="activeTab = 0">
                        Consumidor Final
                    </div>
                </div>
                <!-- Contenido de los tabs -->

                <div class="tab-content flex-grow">



                    <!-- Contenido del formulario para Consumidor Final -->
                    <div v-if="activeTab === 0" class="p-4 bg-white">
                        <div class="flex max-h-[300px] overflow-y-auto pb-36">


                            <div class="w-3/4 pr-4 h-full pt-4">


                                <!-- Contenido del bloque de espacio izquierdo (3/4 del espacio) -->

                                <!-- Tabla de DetalleVenta -->
                                <table v-if="ventaCF" class="table-fixed w-full shadow-lg">
                                    <thead>
                                        <tr class="border-b-2 border-black-400 h-[40px] bg-slate-100">
                                            <th class="font-bold">Item</th>
                                            <th class="font-bold">Nombre del Producto</th>
                                            <th class="font-bold">Cantidad</th>
                                            <th class="font-bold">Precio Unitario ($)</th>
                                            <th class="font-bold">Subtotal ($)</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="item, i in ventaCF.ventaCF.detalle_venta" :key="item.id_venta"
                                            class="border-b-2 border-black-400 h-[40px] bg-black-300">
                                            <td v-text="(i + 1)" class="text-center"></td>
                                            <td class="text-center">{{ item.producto.nombre_producto }}</td>
                                            <td class="text-center">{{ item.cantidad_producto }}</td>
                                            <td class="text-center">$ {{ item.producto.precio_unitario }}</td>
                                            <td class="text-center">$ {{ Number(item.subtotal_detalle_venta).toFixed(2) }}</td>

                                        </tr>
                                    </tbody>
                                </table>

                            </div>



                            <!-- Contenido del bloque de espacio derecho (1/4 del espacio) -->

                            <div class="w-1/4 border-l border-gray-300 pl-2 flex-shrink-0 min-w-[1/8px]">
                                <div class="flex md:flex-row flex-col items-center py-4 px-4">
                                    <!-- Input para ingresar Fecha -->
                                    <div class="flex flex-col md:mr-16">
                                        <label for="fecha_venta"
                                            class="text-black-800 text-sm font-bold leading-tight tracking-normal mb-2">
                                            Fecha de Venta
                                        </label>
                                        <input id="fecha_venta" type="text" name="fecha_venta"
                                            class="text-slate-600 focus:outline-none focus:border focus:border-indigo-700 bg-white font-normal w-36 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                            disabled v-for="detalle in ventaCF" v-model="detalle.fecha_venta" />
                                    </div>
                                </div>

                                <div class="flex flex-shrink-0 min-w-[8px] md:flex-row flex-col items-center py-4 px-4">
                                    <!-- Input para ingresar Cliente -->
                                    <div class="flex flex-col md:mr-16">
                                        <label for="nombre_cliente"
                                            class="text-black-800 text-sm font-bold leading-tight tracking-normal mb-2">
                                            Cliente
                                        </label>
                                        <input id="nombre_cliente" type="text" name="nombre_cliente"
                                            class="text-slate-600 focus:outline-none focus:border focus:border-indigo-700 bg-white font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                            v-for="detalle in ventaCF" v-model="detalle.nombre_cliente_venta" disabled />
                                    </div>
                                </div>
                            </div>
                        </div>


                        <!-- Resumen de la Venta -->
                        <hr>
                        <div class="flex pl-8">
                            <table class="table-fixed">
                                <thead>
                                    <tr class="border-b-2 border-black-400 h-[40px]">
                                        <th class="font-bold">Resumen</th>
                                        <th class="font-bold"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="h-[40px] bg-black-300">
                                        <td class="text-right">
                                            <label class="mb-3 pt-3 text-sm font-normal text-black pr-4">
                                                Subtotal:
                                            </label>
                                        </td>
                                        <td class="text-center">
                                            <div class="flex items-center">
                                                <span
                                                    class="inline-block align-middle h-[40px] rounded-tl-md rounded-bl-md border border-r-0 bg-gray-100 py-2 px-3 text-base">
                                                    $
                                                </span>
                                                <input
                                                    class="text-slate-600 bg-white font-normal h-[40px] pl-3 flex items-center border-l-0 text-sm border-gray-100 rounded-tr-md rounded-br-md border"
                                                    placeholder="0.00" disabled v-model="subTotal" type="text" readonly>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr class="border-b-2 border-black-400 h-[40px] bg-black-300">
                                        <td class="text-right">
                                            <label class="mb-3 pt-3 text-sm font-normal text-black pr-4">
                                                Impuestos (+):
                                            </label>
                                        </td>
                                        <td class="text-center">
                                            <div class="flex items-center">
                                                <span
                                                    class="inline-block align-middle h-[40px] rounded-tl-md rounded-bl-md border border-r-0 bg-gray-100 py-2 px-3 text-base">
                                                    $
                                                </span>
                                                <input
                                                    class="text-slate-600 bg-white font-normal h-[40px] pl-3 flex items-center border-l-0 text-sm border-gray-100 rounded-tr-md rounded-br-md border"
                                                    placeholder="0.00" disabled v-for="detalle in ventaCF"
                                                    v-model="detalle.total_iva">
                                            </div>
                                        </td>
                                    </tr>
                                    <tr class="border-b-2 border-black-400 h-[40px] bg-black-300">
                                        <td class="text-right">
                                            <label class="mb-3 pt-3 text-sm font-normal text-black pr-4">
                                                Descuentos (-):
                                            </label>
                                        </td>
                                        <td class="text-center">
                                            <div class="flex items-center">
                                                <span
                                                    class="inline-block align-middle h-[40px] rounded-tl-md rounded-bl-md border border-r-0 bg-gray-100 py-2 px-3 text-base">
                                                    $
                                                </span>
                                                <label
                                                    class="text-slate-600 bg-white font-normal h-[40px] pl-3 flex items-center border-l-0 text-sm border-gray-100 rounded-tr-md rounded-br-md border"
                                                    placeholder="0.00" disabled>
                                                    {{ Number(total_descuentos).toFixed(2) }}
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr class="border-b-2 border-black-400 h-[50px] bg-black-300">
                                        <td class="text-right">
                                            <label class="mb-3 pt-3 text-sm font-bold text-black pr-4">
                                                TOTAL (USD):
                                            </label>
                                        </td>
                                        <td class="text-center">
                                            <div class="flex items-center">
                                                <input
                                                    class="text-slate-600 bg-white font-bold h-[40px] pl-3 flex items-center text-sm  rounded-tr-md rounded-br-md"
                                                    placeholder="0.00" disabled v-for="detalle in ventaCF"
                                                    v-model="detalle.total_venta">
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
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
            //Tab activo (0 = Consumidor Final, 1 = Credito Fiscal)
            activeTab: 0,
            //Datos de la venta
            ventaCF: null,
            subTotal: '',
            total_descuentos: 0,
        };
    },

    created() {
        this.getDetalleVenta(this.$route.params.id_venta);
    },

    mounted() {

    },

    methods: {
        getDetalleVenta(id_venta) {
            axios.get(api_url + '/ventasCF_detalle/' + id_venta + '/')
                .then(response => {
                    this.ventaCF = response.data;
                    this.ventaCF.ventaCF.total_venta = Number(this.ventaCF.ventaCF.total_venta).toFixed(2);
                    this.ventaCF.ventaCF.total_iva = Number(this.ventaCF.ventaCF.total_iva).toFixed(2);
                    this.ventaCF.ventaCF.detalle_venta.forEach(element => {
                        this.total_descuentos += Number(element.descuentos);
                    });
                    this.calcularSubTotal();
                    console.log(this.ventaCF);
                }).catch(error => {
                    console.log(error);
                });
        },

        calcularSubTotal() {
            const totalVenta = Number(this.ventaCF.ventaCF.total_venta);
            const totalIva = Number(this.ventaCF.ventaCF.total_iva);
            this.subTotal = Number(totalVenta - totalIva + this.total_descuentos).toFixed(2);
            console.log('subtotal' + this.subTotal + 'total venta' + totalVenta + 'total iva' + totalIva + 'total descuentos' + this.total_descuentos)
        }
    },
};
</script>

<style scoped>
/* Estilos para los TAB */
.tab {
    position: relative;
    padding: 0.5rem 1rem;
    cursor: pointer;
    background-color: #edf1fc;
    border: none;
    border-radius: 4px 4px 0 0;
    color: #3056d3;
}

.tab.active {
    background-color: #cfddfc;
    font-weight: bold;
}

.active-indicator {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #3056d3;
}

.tab.active .active-indicator {
    display: block;
}

.tab-content {
    padding: 1rem;
}

form {
    width: 100%;
    height: 100%;
}


/* Estilos para Sugerencias en el input de ingresar producto */
.sugerencias-container {
    position: relative;
}

.sugerencias-lista {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 999;
    background-color: #fff;
}
</style>