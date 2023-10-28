<template>
    <NavBar></NavBar>
    <div class="h-screen">
        <div class="w-full bg-slate-100">

            <!-- Encabezado -->
            <div>
                <div class="flex bg-white mx-auto p-5 shadow-md justify-between">
                    <h1 class="font-bold text-blue-700 text-xl">Gestión de Pedidos a Domicilio</h1>
                    <div class="flex items-center rounded-[4.44px] bg-[#637381]">
                        <RouterLink v-if="hoja_ruta" :to="'/facturacion/hoja_de_ruta/update/' + hoja_ruta.id_hr" id="show-modal" class="w-auto h-auto m-2 text-[13px] font-medium text-center text-white">
                            Editar Hoja de Ruta
                        </RouterLink>
                    </div>
                </div>
                <div class="flex justify-start items-center mt-4 ml-4">
                    <a href="#" @click="$router.go(-1)" class="text-sm text-black font-medium flex items-center">
                        <img src="../../assets/icons/arrow.svg" alt="Regresar" class="h-6 w-6 mr-1"> Regresar
                    </a>
                </div>
            </div>

            <!-- Tabs para Consumidor Final y Credito Fiscal-->
            <div v-if="hoja_ruta != null" class="flex flex-col h-full mt-2 ml-2 pl-2 pr-4">
                <div class="tab-content flex-grow">
                    <div class="p-4 bg-white">
                        <div class="flex pb-36">
                            <div class="w-full h-full pt-4 overflow-auto">
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
                                <div class="flex justify-center w-full">
                                    <table class="table-striped w-full shadow-lg">
                                        <thead>
                                            <tr class="border-b-2 border-black-400 h-[40px] items-center bg-slate-100">
                                                <th class="font-bold w-[5%]">No.</th>
                                                <th class="font-bold w-[18%]">Cliente</th>
                                                <th class="font-bold w-[15%]">Registrado</th>
                                                <th class="font-bold w-[17%]">Monto ($)</th>
                                                <th class="font-bold w-[15%]">Tipo</th>
                                                <th class="font-bold w-[32%]">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="fila, index in hoja_ruta.venta_domicilio" :key="fila.id_hr"
                                                class="border-b-2 border-black-400 bg-black-300">
                                                <td class="text-center">{{ index + 1 }}</td>
                                                <td class="text-center">{{ fila.venta.nombre_cliente_venta }}</td>
                                                <td class="text-center">{{ fila.venta.fecha_venta }}</td>
                                                <td class="text-center">$ {{ Number(fila.venta.total_venta).toFixed(2) }}
                                                </td>
                                                <td class="text-center">Consumidor Final</td>
                                                <td class="flex justify-end py-2 items-center">
                                                    <button @click="imprimir_venta_domicilio(fila)"
                                                        class="text-center bg-emerald-600 hover:bg-emerald-800 md:text-sm text-xs text-white font-medium py-2 px-2 mx-2 rounded">
                                                        Imprimir
                                                    </button>
                                                    <router-link v-if="fila.esta_cancelada == 0"
                                                        :to="{ name: 'modificar_pedido', params: { id: fila.id_venta } }"
                                                        class="text-center bg-indigo-600 hover:bg-indigo-800 md:text-sm text-xs text-white font-medium py-2 px-2 mx-2 rounded">
                                                        Editar Pedido
                                                    </router-link>
                                                    <button v-else disabled
                                                        class="text-center bg-indigo-400 md:text-sm text-xs text-white font-medium py-2 px-2 mx-2 rounded">
                                                        Editar Pedido
                                                    </button>
                                                    <button v-if="fila.esta_cancelada == 0"
                                                        @click="registrar_pago_venta(fila)"
                                                        class="text-center bg-cyan-600 hover:bg-cyan-800 md:text-sm text-xs text-white font-medium py-2 px-2 mx-2 rounded">
                                                        Confirm. pago
                                                    </button>
                                                    <button v-else disabled
                                                        class="text-center bg-sky-300 md:text-sm text-xs text-white font-medium py-2 px-2 mx-2 rounded">
                                                        Confirm. pago
                                                    </button>
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
                                                        class="text-center bg-emerald-600 hover:bg-emerald-800 md:text-sm text-xs text-white font-medium py-2 px-2 mx-2 rounded">
                                                        Imprimir
                                                    </button>
                                                    <router-link v-if="fila.esta_cancelado == 0"
                                                        :to="{ name: 'modificar_pedido_credito', params: { id: fila.id_creditofiscal } }"
                                                        class="text-center bg-indigo-600 hover:bg-indigo-800 md:text-sm text-xs text-white font-medium py-2 px-2 mx-2 rounded">
                                                        Editar Pedido
                                                    </router-link>
                                                    <button v-else disabled
                                                        class="text-center bg-indigo-400 md:text-sm text-xs text-white font-medium py-2 px-2 mx-2 rounded">
                                                        Editar Pedido
                                                    </button>
                                                    <button v-if="fila.esta_cancelado == 0"
                                                        @click="registrar_pago_credito(fila)"
                                                        class="text-center bg-cyan-600 hover:bg-cyan-800 md:text-sm text-xs text-white font-medium py-2 px-2 mx-2 rounded">
                                                        Confirm. pago
                                                    </button>
                                                    <button v-else disabled
                                                        class="text-center bg-sky-300 md:text-sm text-xs text-white font-medium py-2 px-2 mx-2 rounded">
                                                        Confirm. pago
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                        <hr>
                        <div class="flex pl-8 justify-between">
                            <table class="table-fixed">
                                <thead>
                                    <tr>
                                        <th class="font-bold"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="bg-black-300">
                                        <td class="text-right">
                                            <label class="mb-3 pt-3 text-md font-bold text-black pr-4">
                                                Monto total:
                                            </label>
                                        </td>
                                        <td class="text-center">
                                            <div class="flex items-center">
                                                <span
                                                    class="inline-block align-middle h-[40px] rounded-tl-md rounded-bl-md border border-r-0 bg-gray-100 py-2 px-3 font-bold text-base">
                                                    $
                                                </span>
                                                <input
                                                    class="text-slate-600 bg-white font-bold h-[40px] pl-3 flex items-center border-l-0 text-lg border-gray-100 rounded-tr-md rounded-br-md border w-[50%]"
                                                    placeholder="0.00" :value="total_hoja" disabled>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="flex md:justify-center">
                                <button @click="imprimir_resumen_hr()"
                                    class="bg-indigo-600 hover:bg-indigo-800 h-auto text-base text-white font-bold py-2 my-2 px-4 rounded">
                                    Generar resumen
                                </button>
                            </div>
                            <button v-if="!hoja_ruta.esta_entregado" @click="marcar_hr_entregada()"
                                class="bg-red-700 hover:bg-red-800 h-auto text-white text-xs font-medium py-2 my-2 px-4 rounded">
                                Marcar todo como entregado
                            </button>
                            <button v-else
                                class="bg-red-300 h-auto text-white text-xs font-medium py-2 my-2 px-4 rounded">
                                Marcar todo como entregado
                            </button>
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
        <ModalConfirmarPagoDomicilio :show="showModal_pago_individual" :factura="factura_modal" :total="total_factura_modal"
            @confirmed="pago_realizado()" @close="showModal_pago_individual = false" :is_credito="is_credito">
        </ModalConfirmarPagoDomicilio>
    </Teleport>
    <Teleport to="body" v-if="hoja_ruta != null">
        <ModalConfirmarEntregasHoja @close="showModal_entregas_all = false" :show="showModal_entregas_all"
            :id_hoja="hoja_ruta.id_hr" @confirmed="confirmacion_entregas()">
        </ModalConfirmarEntregasHoja>
    </Teleport>
</template>


<script>
import axios from 'axios';
import api_url from '../../config.js';
import "../../assets/registrar_venta.css"
import moment from 'moment';
import { useToast } from 'vue-toastification'
import NavBar from '../../components/NavBar.vue';
import ModalConfirmarPagoDomicilio from '@/components/Ventas/ModalConfirmarPagoDomicilio.vue'
import ModalConfirmarEntregasHoja from '../../components/Ventas/ModalConfirmarEntregasHoja.vue';

const toast = useToast();

export default {
    props: ['ruta'],
    components: {
        ModalConfirmarPagoDomicilio: ModalConfirmarPagoDomicilio,
        ModalConfirmarEntregasHoja: ModalConfirmarEntregasHoja,
        NavBar: NavBar
    },
    data() {
        return {
            showModal_pago_individual: false,
            showModal_entregas_all: false,
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
            axios.get(api_url + '/impresion_hoja_de_ruta/' + this.hoja_ruta.id_hr)
                .then((res) => {
                    console.log(res);
                    this.watch_toast("success", "Imprimiendo...");
                })
                .catch((err) => {
                    console.log(err);
                    this.watch_toast("error", "Ocurrió un error, vuelva a intentar.");
                });
        },
        imprimir_credito_domicilio(fila) {
            axios.get(api_url + '/impresion_credito_fiscal/' + fila.id_creditofiscal)
                .then((res) => {
                    console.log(res);
                    this.watch_toast("success", "Imprimiendo...");
                })
                .catch((err) => {
                    console.log(err);
                    this.watch_toast("error", "Ocurrió un error, vuelva a intentar.");
                });
        },
        imprimir_venta_domicilio(fila) {
            console.log('Pedido a imprimir...');
            console.log(fila.id_venta);
            axios.get(api_url + '/impresion_consumidor_final/' + fila.id_venta)
                .then((res) => {
                    console.log(res);
                    this.watch_toast("success", "Imprimiendo...");
                })
                .catch((err) => {
                    console.log(err);
                    this.watch_toast("error", "Ocurrió un error, vuelva a intentar.");
                });
        },
        registrar_pago_credito(fila) {
            this.factura_modal = fila;
            this.total_factura_modal = Number(fila.credito_fiscal.total_credito);
            this.is_credito = true;
            this.showModal_pago_individual = true;
        },
        registrar_pago_venta(fila) {
            this.factura_modal = fila;
            this.total_factura_modal = Number(fila.venta.total_venta);
            this.is_credito = false;
            this.showModal_pago_individual = true;
        },
        pago_realizado() {
            this.showModal_pago_individual = false;
            this.obtener_detalles_ruta();
        },
        marcar_hr_entregada() {
            //this.hoja_ruta.entregada == 1 ? this.watch_toast('success', 'Todos los pedidos ya han sido entregados') : this.showModal_entregas_all = true;
            this.showModal_entregas_all = true;
        },
        confirmacion_entregas() {
            this.showModal_entregas_all = false;
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