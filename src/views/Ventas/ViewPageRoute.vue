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
                            Editar Hoja de Ruta
                        </button>
                    </div>
                </div>
            </div>

            <!-- Tabs para Consumidor Final y Credito Fiscal-->
            <div v-if="hoja_ruta != null" class="flex flex-col h-full mt-6 ml-2 pl-2 pr-4">
                <!-- Boton Regresar -->
                <div class="flex justify-start items-center">
                    <a href="#" @click="$router.go(-1)" class="text-sm text-black font-medium flex items-center">
                        <img src="../../assets/icons/arrow.svg" alt="Regresar" class="h-6 w-6 mr-1"> Regresar
                    </a>
                </div>
                <!-- Contenido de los tabs -->
                <div class="tab-content flex-grow">
                    <!-- Contenido del formulario para Consumidor Final -->
                    <div class="p-4 bg-white">
                        <div class="flex pb-36">
                            <div class="w-full pr-4 h-full pt-4">
                                <!-- Contenido del bloque de espacio izquierdo (3/4 del espacio) -->
                                <!-- Input para ingresar Producto -->
                                <div class="flex justify-start items-center pb-6">
                                    <label class="text-base font-bold">
                                        Fecha de reparto:
                                    </label>
                                    <input type="date" name="fecha_hoja_ruta" v-model="hoja_ruta.fecha_entrega" disabled
                                        class="ml-4 text-slate-600 focus:outline-none focus:border focus:border-indigo-700 bg-white font-normal w-40 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" />
                                    <label for="nombre_cliente" class="text-base font-bold px-4">
                                        Repartidor asignado:
                                    </label>
                                    <input id="nombre_cliente" type="text" name="nombre_cliente" disabled
                                        class="text-slate-600 focus:outline-none focus:border focus:border-indigo-700 bg-white font-normal h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                        placeholder="David Deras"
                                        :value="hoja_ruta.empleado.primer_nombre + ' ' + hoja_ruta.empleado.primer_apellido" />
                                </div>
                                <div class="flex justify-start items-center pb-6">

                                </div>
                                <!-- Tabla de DetalleVenta -->
                                <table class="table-fixed w-full shadow-lg">
                                    <thead>
                                        <tr class="border-b-2 border-black-400 h-[40px] items-center bg-slate-100">
                                            <th class="font-bold w-[5%]">No.</th>
                                            <th class="font-bold w-[18%]">Cliente</th>
                                            <th class="font-bold w-[15%]">Registrado</th>
                                            <th class="font-bold w-[17%]">Monto ($)</th>
                                            <th class="font-bold w-[17%]">Tipo</th>
                                            <th class="font-bold w-[30%]">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="fila, index in hoja_ruta.venta_domicilio" :key="fila.id_hr"
                                            class="border-b-2 border-black-400 bg-black-300">
                                            <td class="text-center">{{ index + 1 }}</td>
                                            <td class="text-center">{{ fila.venta.nombre_cliente_venta }}</td>
                                            <td class="text-center">{{ fila.venta.fecha_venta }}</td>
                                            <td class="text-center">$ {{ Number(fila.venta.total_venta).toFixed(2) }}</td>
                                            <td class="text-center">Consumidor Final</td>
                                            <td class="flex justify-end py-2 items-center">
                                                <button @click="imprimir_venta_domicilio(fila)"
                                                    class="bg-emerald-600 hover:bg-emerald-800 text-sm text-white font-medium py-2 px-2 mx-2 rounded">
                                                    Imprimir
                                                </button>
                                                <button @click="editar_venta_domicilio(fila)"
                                                    class="bg-indigo-600 hover:bg-indigo-800 text-sm text-white font-medium py-2 px-2 mx-2 rounded">
                                                    Editar Pedido
                                                </button>
                                                <button @click="registrar_pago_venta(fila)"
                                                    class="bg-cyan-600 hover:bg-cyan-800 text-sm text-white font-medium py-2 px-2 mx-2 rounded">
                                                    Confirm. pago
                                                </button>
                                                <!-- <button @click="eliminar_venta_de_hr(index + 1)"
                                                    class="font-medium text-center text-white rounded ml-4 bg-red-600 h-[25px] w-[25px] mx-2">
                                                    X
                                                </button> -->
                                            </td>
                                        </tr>
                                        <tr v-for="fila, index in hoja_ruta.credito_fiscal_domicilio" :key="fila.id_hr"
                                            class="border-b-2 border-black-400 bg-black-300">
                                            <td class="text-center">{{ count + index + 1 }}</td>
                                            <td class="text-center">{{ fila.credito_fiscal.cliente.distintivo_cliente }}
                                            </td>
                                            <td class="text-center">{{ fila.credito_fiscal.fecha_credito }}</td>
                                            <td class="text-center">$ {{
                                                Number(fila.credito_fiscal.total_credito).toFixed(2) }}</td>
                                            <td class="text-center">Crédito Fiscal</td>
                                            <td class="flex justify-end py-2 items-center">
                                                <button @click="imprimir_credito_domicilio(fila)"
                                                    class="bg-emerald-600 hover:bg-emerald-800 text-sm text-white font-medium py-2 px-2 mx-2 rounded">
                                                    Imprimir
                                                </button>
                                                <button @click="editar_credito_domicilio(fila)"
                                                    class="bg-indigo-600 hover:bg-indigo-800 text-sm text-white font-medium py-2 px-2 mx-2 rounded">
                                                    Editar Pedido
                                                </button>
                                                <button @click="registrar_pago_credito(fila)"
                                                    class="bg-cyan-600 hover:bg-cyan-800 text-sm text-white font-medium py-2 px-2 mx-2 rounded">
                                                    Confirm. pago
                                                </button>
                                                <!-- <button @click="eliminar_credito_de_hr(index + 1)"
                                                    class="font-medium text-center text-white rounded ml-4 bg-red-600 h-[25px] w-[25px] mx-2">
                                                    X
                                                </button> -->
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <!-- Resumen de la Venta -->
                        <hr>
                        <div class="flex pl-8">
                            <table class="table-fixed">
                                <thead>
                                    <tr>
                                        <!-- <th class="font-bold h-[40px] text-lg">Resumen</th> -->
                                        <th class="font-bold"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="bg-black-300">
                                        <td class="text-right">
                                            <label class="mb-3 pt-3 text-md font-bold text-black pr-4">
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
                                                    class="text-slate-600 bg-white font-normal h-[40px] pl-3 flex items-center border-l-0 text-lg border-gray-100 rounded-tr-md rounded-br-md border"
                                                    placeholder="0.00" :value="total_hoja" disabled>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="flex justify-center py-4 px-4 pl-36">
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

    <Teleport to="body">
        <ModalConfirmarPagoDomicilio :show="showModal" :factura="factura_modal" :total="total_factura_modal"
            @confirmed="pago_realizado()" @close="showModal = false" :is_credito="is_credito"></ModalConfirmarPagoDomicilio>
    </Teleport>
</template>


<script>
import axios from 'axios';
import api_url from '../../config.js';
import "../../assets/registrar_venta.css"
import moment from 'moment';
import { useToast } from 'vue-toastification'
import NavBar from '@/components/NavBar.vue'
import ModalConfirmarPagoDomicilio from '@/components/Ventas/ModalConfirmarPagoDomicilio.vue'

const toast = useToast();

export default {
    props: ['ruta'],
    components: {
        NavBar: NavBar,
        ModalConfirmarPagoDomicilio: ModalConfirmarPagoDomicilio,
    },
    data() {
        return {
            showModal: false,
            factura_modal: null,
            total_factura_modal: 0,
            is_credito: false,

            hoja_ruta: null,
            count: 0,
            total_hoja: 0,
        };
    },
    created() {
        this.obtener_detalles_ruta();
    },
    watch: {},
    methods: {
        obtener_detalles_ruta() {
            axios.get(api_url + '/hoja_de_ruta/' + this.ruta)
                .then((res) => {
                    this.hoja_ruta = res.data.hoja;
                    let subtotal = 0;
                    let count_venta = 0;
                    this.hoja_ruta.venta_domicilio.forEach(v => {
                        subtotal = subtotal + Number(v.venta.total_venta);
                        v.venta.fecha_venta = moment(v.venta.fecha_venta).format("DD/MM/YYYY");
                        count_venta++;
                    });
                    this.hoja_ruta.credito_fiscal_domicilio.forEach(c => {
                        subtotal = subtotal + Number(c.credito_fiscal.total_credito);
                        c.credito_fiscal.fecha_credito = moment(c.credito_fiscal.fecha_credito).format("DD/MM/YYYY");
                    });
                    this.count = count_venta;
                    this.total_hoja = subtotal.toFixed(2);
                    console.log(subtotal);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        imprimir_resumen_hr() {
            window.print();
        },
        imprimir_credito_domicilio(fila) {
            window.print();
        },
        imprimir_venta_domicilio(fila) {
            window.print();
        },
        editar_credito_domicilio(fila) {
            // REDIRIGIR fila.credito_fiscal.id_credito_fiscal
        },
        editar_venta_domicilio(fila) {
            // REDIRIGIR fila.venta.id_venta
        },
        registrar_pago_credito(fila) {
            this.factura_modal = fila;
            this.total_factura_modal = Number(fila.credito_fiscal.total_credito);
            this.is_credito = true;
            this.showModal = true;
        },
        registrar_pago_venta(fila) {
            this.factura_modal = fila;
            this.total_factura_modal = Number(fila.venta.total_venta);
            this.is_credito = false;
            this.showModal = true;
        },
        pago_realizado() {
            this.showModal = false;
            this.obtener_detalles_ruta();
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