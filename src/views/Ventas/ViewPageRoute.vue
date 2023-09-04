<template>
    <NavBar />
    <div class="h-screen">
        <div class="w-full bg-slate-100">
            <!-- Encabezado -->
            <div class="w-full h-[60px]">
                <div class="flex justify-between px-16 w-full h-[60px] absolute left-0 bg-white"
                    style="box-shadow: 0px 1.11px 3.329166889190674px 0 rgba(0,0,0,0.1), 0px 1.11px 2.219444513320923px 0 rgba(0,0,0,0.06);">
                    <p class="mt-2 flex-grow-0 flex-shrink-0 text-[25px] font-semibold text-left text-[#3056d3]">
                        Hojas de Ruta
                    </p>
                    <div
                        class="flex items-center mt-4 flex-grow-0 flex-shrink-0 h-[31px] py-[16px] rounded-[4.44px] bg-[#637381]">
                        <button id="show-modal"
                            class="flex-grow-0 flex-shrink-0 w-[225px] text-[13px] font-medium text-center text-white">
                            Agregar Pedido a esta Hoja de Ruta
                        </button>
                    </div>
                </div>
            </div>

            <!-- Tabs para Consumidor Final y Credito Fiscal-->
            <div v-if="id_ruta != undefined" class="flex flex-col h-full mt-6 ml-2 pl-2 pr-4">
                <!-- Contenido de los tabs -->
                <div class="tab-content flex-grow">
                    <!-- Contenido del formulario para Consumidor Final -->
                    <div class="p-4 bg-white">
                        <div class="flex max-h-[750px] pb-36">
                            <div class="w-3/4 pr-4 h-full pt-4">
                                <!-- Contenido del bloque de espacio izquierdo (3/4 del espacio) -->
                                <!-- Input para ingresar Producto -->
                                <div class="flex justify-start items-center pb-6">
                                    <label class="text-base font-bold">
                                        Fecha de reparto:
                                    </label>
                                    <input type="date" name="fecha_hoja_ruta" v-model="hoja_ruta.fecha_entrega"
                                        class="ml-4 text-slate-600 focus:outline-none focus:border focus:border-indigo-700 bg-white font-normal w-40 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" />
                                </div>
                                <!-- Tabla de DetalleVenta -->
                                <table class="table-fixed w-full shadow-lg">
                                    <thead>
                                        <tr class="border-b-2 border-black-400 h-[40px] bg-slate-100">
                                            <th class="font-bold">No.</th>
                                            <th class="font-bold">Cliente</th>
                                            <th class="font-bold">Registrado</th>
                                            <th class="font-bold">Monto total ($)</th>
                                            <th class="font-bold">Tipo</th>
                                            <th class="font-bold">Acciones</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="fila, index in hoja_ruta.venta_domicilio" :key="fila.id_hr"
                                            class="border-b-2 border-black-400 h-[40px] bg-black-300">
                                            <td class="text-center">{{ index + 1 }}</td>
                                            <td class="text-center">{{ fila.venta.nombre_cliente_venta }}</td>
                                            <td class="text-center">{{ fila.venta.fecha_venta }}</td>
                                            <td class="text-center">$ {{ fila.venta.total_venta }}</td>
                                            <td class="text-center">Consumidor Final</td>
                                            <td class="flex justify-end pr-4 py-2">
                                                <button @click="imprimir_venta_domicilio(fila)"
                                                    class="bg-indigo-600 hover:bg-indigo-800 h-[40px] text-white font-bold py-2 px-4 rounded">
                                                    Emitir Factura
                                                </button>
                                                <button @click="editar_venta_domicilio(fila)"
                                                    class="bg-indigo-600 hover:bg-indigo-800 h-[40px] text-white font-bold py-2 px-4 rounded">
                                                    Editar Pedido
                                                </button>
                                                <button @click="eliminar_venta_de_hr(index + 1)"
                                                    class="font-medium text-center text-white rounded ml-4 bg-red-600 h-[25px] w-[25px]">
                                                    X
                                                </button>
                                            </td>
                                        </tr>
                                        <tr v-for="fila, index in hoja_ruta.credito_fiscal_domicilio" :key="fila.id_hr"
                                            class="border-b-2 border-black-400 h-[40px] bg-black-300">
                                            <td class="text-center">{{ index + 1 }}</td>
                                            <td class="text-center">{{ fila.credito_fiscal.cliente.distintivo_cliente }}</td>
                                            <td class="text-center">{{ fila.credito_fiscal.fecha_credito }}</td>
                                            <td class="text-center">$ {{ fila.credito_fiscal.total_credito }}</td>
                                            <td class="text-center">Consumidor Final</td>
                                            <td class="flex justify-end pr-4 py-2">
                                                <button @click="imprimir_credito_domicilio(fila)"
                                                    class="bg-indigo-600 hover:bg-indigo-800 h-[40px] text-white font-bold py-2 px-4 rounded">
                                                    Emitir Factura
                                                </button>
                                                <button @click="editar_credito_domicilio(fila)"
                                                    class="bg-indigo-600 hover:bg-indigo-800 h-[40px] text-white font-bold py-2 px-4 rounded">
                                                    Editar Pedido
                                                </button>
                                                <button @click="eliminar_credito_de_hr(index + 1)"
                                                    class="font-medium text-center text-white rounded ml-4 bg-red-600 h-[25px] w-[25px]">
                                                    X
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <!-- Contenido del bloque de espacio derecho (1/4 del espacio) -->
                            <div class="w-1/4 border-l border-gray-300 pl-2 flex-shrink-0 min-h-[200px]">

                                <div>
                                    <!-- PARA CONSUMIDOR FINAL-->
                                    <div class="flex md:flex-row flex-col items-center py-4 px-4">
                                        <!-- Input para ingresar Fecha -->
                                        <div class="flex flex-col md:mr-16">
                                            <label for="nombre_cliente"
                                                class="text-black-800 text-sm font-bold leading-tight tracking-normal mb-2">
                                                Repartidor
                                            </label>
                                            <input id="nombre_cliente" type="text" name="nombre_cliente"
                                                class="text-slate-600 focus:outline-none focus:border focus:border-indigo-700 bg-white font-normal h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                                placeholder="David Deras" v-model="venta_info.nombre_cliente_venta" />
                                        </div>
                                    </div>
                                    <div class="flex flex-shrink-0 md:flex-row flex-col items-center py-4 px-4">
                                        <!-- Input para ingresar Cliente -->
                                        <div class="flex flex-col">
                                            <label for="nombre_cliente"
                                                class="text-black-800 text-sm font-bold leading-tight tracking-normal mb-2">
                                                Cliente
                                            </label>
                                            <input id="nombre_cliente" type="text" name="nombre_cliente"
                                                class="text-slate-600 focus:outline-none focus:border focus:border-indigo-700 bg-white font-normal h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                                placeholder="Joaquin Perez" v-model="venta_info.nombre_cliente_venta" />
                                        </div>
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
                                                Monto total ($):
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
                                                    placeholder="0.00" v-model="subtotal_venta" disabled>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="flex justify-center py-4 px-4 pt-24 pl-36">
                                <button @click="imprimir_resumen_hr()"
                                    class="bg-indigo-600 hover:bg-indigo-800 h-[40px] text-white font-bold py-2 px-4 rounded">
                                    Imprimir Resumen
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="">
                <p class="text-center text-2xl font-bold mt-20">
                    Obteniendo detalles de la Hoja de Ruta...
                </p>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios';
import api_url from '../../config.js';
import "../../assets/registrar_venta.css"
import moment from 'moment';
import { useToast } from 'vue-toastification'
import NavBar from '@/components/NavBar.vue'

const toast = useToast();

export default {
    components: {
        NavBar: NavBar,
    },
    props: ['id_ruta'],
    data() {
        return {
            ventas_listado: null,
            creditos_listado: null,
            hoja_ruta: null,
        };
    },
    created() {
        this.obtener_detalles_ruta();
    },
    watch: {},
    methods: {
        obtener_detalles_ruta() {
            axios.get(api_url + '/hoja_de_ruta/' + this.id_ruta)
                .then((res) => {
                    this.hoja_ruta = res.data;
                    console.log(this.hoja_ruta);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        imprimir_resumen_hr() {
            window.print();
        },
        imprimir_credito_domicilio(fila) {
            window.open(api_url + `credito_fiscal/${fila.credito_fiscal.id_credito_fiscal}/imprimir`, '_blank');
        },
        imprimir_venta_domicilio(fila) {
            window.open(api_url + `venta/${fila.venta.id_venta}/imprimir`, '_blank');
        },
        editar_credito_domicilio(fila) {
            this.$router.push({
                name: 'EditarCreditoFiscal',
                params: {
                    id_credito_fiscal: fila.credito_fiscal.id_credito_fiscal
                }
            });
        },
        editar_venta_domicilio(fila) {
            this.$router.push({
                name: 'EditarVenta',
                params: {
                    id_venta: fila.venta.id_venta
                }
            });
        },
        eliminar_credito_de_hr(index) {
            this.hoja_ruta.credito_fiscal_domicilio.splice(index - 1, 1);
        },
        eliminar_venta_de_hr(index) {
            this.hoja_ruta.venta_domicilio.splice(index - 1, 1);
        },
        //Mostrar Toast de exito o error
        watch_toast(tipo, mensaje) {
            if (tipo == "success") {
                toast.success(mensaje, {
                    position: "bottom-left",
                    timeout: 2994,
                    closeOnClick: true,
                    pauseOnFocusLoss: false,
                    pauseOnHover: false,
                    draggable: true,
                    draggablePercent: 0.27,
                    showCloseButtonOnHover: false,
                    hideProgressBar: true,
                    closeButton: "button",
                    icon: true,
                    rtl: false
                });
            } else {
                toast.error(mensaje, {
                    position: "bottom-left",
                    timeout: 2994,
                    closeOnClick: true,
                    pauseOnFocusLoss: false,
                    pauseOnHover: false,
                    draggable: true,
                    draggablePercent: 0.27,
                    showCloseButtonOnHover: false,
                    hideProgressBar: true,
                    closeButton: "button",
                    icon: true,
                    rtl: false
                });
            }
        },
    },
};
</script>