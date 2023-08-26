<template>
    <NavBar />
    <div class="h-screen">
        <div class="w-full bg-slate-100">
            <!-- Encabezado -->
            <div class="w-full h-[60px]">
                <div class="flex justify-between px-16 w-full h-[60px] absolute left-0 bg-white"
                    style="box-shadow: 0px 1.11px 3.329166889190674px 0 rgba(0,0,0,0.1), 0px 1.11px 2.219444513320923px 0 rgba(0,0,0,0.06);">
                    <p class="mt-2 flex-grow-0 flex-shrink-0 w-[179px] text-[31px] font-semibold text-left text-[#3056d3]">
                        Ventas
                    </p>
                    <div
                        class="flex items-center mt-4 flex-grow-0 flex-shrink-0 h-[31px] py-[16px] rounded-[4.44px] bg-[#637381]">
                        <button class="flex-grow-0 flex-shrink-0 w-[225px] text-[13px] font-medium text-center text-white">
                            Registrar como Pedido a Domicilio
                        </button>
                    </div>
                </div>
            </div>

            <!-- Tabs para Consumidor Final y Credito Fiscal-->
            <div class="flex flex-col h-full mt-6 ml-2 pl-2 pr-4">
                <div class="flex justify-start items-center border-b-2 border-b-indigo-500">
                    <!--<div class="tab" :class="{ 'active': active_tab === 0 }" @click="active_tab = 0">
                        Consumidor Final
                    </div>-->
                    <div class="tab" :class="{ 'active': active_tab === 1 }" @click="active_tab = 1">
                        Crédito Fiscal
                    </div>
                </div>
                <!-- Contenido de los tabs -->
                <div class="tab-content flex-grow">

                    <!-- Contenido del formulario para Consumidor Final -->
                    <div class="p-4 bg-white">
                        <div class="flex max-h-[750px] overflow-y-auto pb-36">
                            <div class="w-3/4 pr-4 h-full pt-4">
                                <!-- Contenido del bloque de espacio izquierdo (3/4 del espacio) -->
                                <!-- Input para ingresar Producto -->
                                <div class="flex justify-start items-center pb-6">
                                    <label class="text-base font-bold">
                                        Producto
                                    </label>
                                    <input @input="listener_buscar_codigo_producto()" ref="codigo_bp"
                                        class="ml-4 text-slate-600 focus:outline-none focus:border focus:border-indigo-700 bg-white font-normal w-40 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                        placeholder="Codigo del Producto" v-model="producto_codigo" />
                                    <div class="sugerencias-container">
                                        <!-- Campo de entrada -->
                                        <input @input="listener_producto_nombre()" @focus="mostrar_sugerencias = true"
                                            @blur.self="mostrar_sugerencias = false"
                                            class="ml-4 text-slate-600 focus:outline-none focus:border focus:border-indigo-700 bg-white font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                            placeholder="Nombre del Producto" v-model="producto_nombre" />

                                        <!-- Lista de sugerencias -->
                                        <ul class="sugerencias-lista w-64 ml-4 border border-slate-500"
                                            v-if="mostrar_sugerencias && sugerencias.length > 0">
                                            <li class="w-64 m-2" v-for="sugerencia in sugerencias" :key="sugerencia.id"
                                                @mousedown.prevent="seleccionar_sugerencia_producto(sugerencia)">
                                                {{ sugerencia }}
                                            </li>
                                        </ul>
                                    </div>
                                    <button @click="agregar_producto_detalle()"
                                        :class="{ 'bg-emerald-600 hover:bg-emerald-800': active_tab == 1, 'bg-indigo-600 hover:bg-indigo-800': active_tab == 0 }"
                                        class="font-medium text-center text-white rounded ml-4 h-[32px] w-[100px]">
                                        Agregar
                                    </button>
                                </div>
                                <!-- Tabla de DetalleVenta -->
                                <table class="table-fixed w-full shadow-lg">
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
                                        <tr v-for="(fila,index) in detalle_ventas_lista" :key="fila.id_creditofiscal"
                                            class="border-b-2 border-black-400 h-[40px] bg-black-300">
                                            <td class="text-center">{{ index+1 }}</td>
                                            <td class="text-center">{{ fila.producto.nombre_producto }}</td>
                                            <td class="text-center">
                                                <input @change="watch_cantidad_producto(fila)"
                                                    class="w-[70px] h-[25px] text-center" type="number" min="1" max="100"
                                                    v-model="fila.cantidad_producto_credito">
                                            </td>
                                            <td class="text-center">{{ fila.producto.precio_unitario }}</td>
                                            <td class="text-center">{{ fila.subtotal_detalle_credito =
                                            Number(fila.producto.precio_unitario *
                                                fila.cantidad_producto_credito).toFixed(2) }}</td>
                                            <td class="flex justify-end pr-4 py-2">
                                                <button @click="eliminar_detalle_venta(fila.id_creditofiscal)"
                                                    class="font-medium text-center text-white rounded ml-4 bg-red-600 h-[25px] w-[25px]">
                                                    X
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <!-- Contenido del bloque de espacio derecho (1/4 del espacio) -->
                            <div class="w-1/4 border-l border-gray-300 pl-2 flex-shrink-0 min-w-[1/8px] min-h-[200px]">

                                <!--<div v-if="active_tab === 0">
                                    PARA CONSUMIDOR FINAL
                                    <div class="flex md:flex-row flex-col items-center py-4 px-4">
                                        {{ /* Input para ingresar fecha */ }} 
                                        <div class="flex flex-col md:mr-16">
                                            <label for="fecha_venta"
                                                class="text-black-800 text-sm font-bold leading-tight tracking-normal mb-2">
                                                Fecha de Venta
                                            </label>
                                            <input id="fecha_venta" type="date" name="fecha_venta"
                                                v-model="venta_info.fecha_venta"
                                                class="text-slate-600 focus:outline-none focus:border focus:border-indigo-700 bg-white font-normal w-36 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" />
                                        </div>
                                    </div>
                                    <div class="flex flex-shrink-0 min-w-[8px] md:flex-row flex-col items-center py-4 px-4">
                                        {{ /* Input para ingresar cliente */ }} 
                                        <div class="flex flex-col md:mr-16">
                                            <label for="nombre_cliente"
                                                class="text-black-800 text-sm font-bold leading-tight tracking-normal mb-2">
                                                Cliente
                                            </label>
                                            <input id="nombre_cliente" type="text" name="nombre_cliente"
                                                class="text-slate-600 focus:outline-none focus:border focus:border-indigo-700 bg-white font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                                placeholder="Joaquin Perez" v-model="venta_info.nombre_cliente_venta" />
                                        </div>
                                    </div>
                                </div>-->
                                <div v-if="active_tab === 1">
                                    <!-- PARA CREDITO FISCAL-->
                                    <div class="flex overflow-y-auto">
                                        <!-- Contenido del bloque de espacio derecho (1/4 del espacio) -->
                                        <div class="w-1/4 pb-24 pl-2 flex-shrink-0">
                                            <div class="flex md:flex-row flex-col items-center py-4 px-4">
                                                <!-- Input para ingresar Fecha -->
                                                <div class="flex flex-col md:mr-16">
                                                    <label for="fecha_credito"
                                                        class="text-black-800 text-sm font-bold leading-tight tracking-normal mb-2">
                                                        Fecha de Venta
                                                    </label>
                                                    <input id="fecha_credito" type="date" name="fecha_credito"
                                                        v-model="credito_fiscal_info.fecha_credito"
                                                        class="text-slate-600 focus:outline-none focus:border focus:border-emerald-700 bg-white font-normal w-36 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" />
                                                </div>
                                            </div>
                                            <!-- aqui iba nrc antes -->
                                            <div
                                                class="flex flex-shrink-0 min-w-[8px] md:flex-row flex-col items-center py-2 px-4">
                                                <div class="flex flex-col md:mr-16">
                                                    <label for="identificador_cliente_credito"
                                                        class="text-black-800 text-sm font-bold leading-tight tracking-normal mb-2">
                                                        Buscar Cliente existente
                                                    </label>
                                                    <div class="sugerencias-container">
                                                        <input @input="listener_cliente_identificador()"
                                                            @focus="mostrar_sugerencias_cliente = true"
                                                            @blur.self="mostrar_sugerencias_cliente = false"
                                                            id="identificador_cliente_credito" type="text"
                                                            name="identificador_cliente_credito"
                                                            class="text-slate-600 focus:outline-none focus:border focus:border-emerald-700 bg-white font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                                            placeholder="Ingrese el identificador"
                                                            v-model="campo_identificador_cliente" />
                                                        <!--Lista de sugerencias -->
                                                        <ul class="sugerencias-lista w-64 ml-4 border border-slate-500"
                                                            v-if="mostrar_sugerencias_cliente && sugerencias_cliente.length > 0">
                                                            <li class="w-64 m-2" v-for=" cliente  in  sugerencias_cliente "
                                                                :key="cliente.distintivo_cliente"
                                                                @mousedown.prevent="seleccionar_sugerencia_cliente(cliente)">
                                                                {{ cliente.distintivo_cliente }}
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div class="flex justify-end pt-2 text-align-center">
                                                        <button
                                                            class="bg-emerald-600 flex justify-center items-center h-[30px] w-[165px] hover:bg-emerald-800 text-white font-bold rounded">
                                                            Registrar nuevo
                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                class="h-6 w-6 text-gray-400" fill="none"
                                                                viewBox="0 0 24 24" stroke="white">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                class="flex flex-shrink-0 min-w-[8px] md:flex-row flex-col items-center py-2 px-4">
                                                <!-- Input para ingresar Cliente -->
                                                <div class="flex flex-col md:mr-16">
                                                    <label for="nombre_cliente_credito"
                                                        class="text-black-800 text-sm font-bold leading-tight tracking-normal mb-2">
                                                        Cliente
                                                    </label>
                                                    <input type="text" name="nombre_cliente_credito" disabled
                                                        class="text-slate-600 focus:outline-none focus:border focus:border-emerald-700 bg-white font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                                        placeholder="Joaquin Perez" v-model="cliente_info.nombre_cliente" />
                                                </div>
                                            </div>
                                            <div
                                                class="flex flex-shrink-0 min-w-[8px] md:flex-row flex-col items-center py-2 px-4">
                                                <!-- Input para ingresar nit -->
                                                <div class="flex flex-col">
                                                    <label for="nit_credito"
                                                        class="text-black-800 text-sm font-bold leading-tight tracking-normal mb-2">
                                                        NIT
                                                    </label>
                                                    <input id="nit_credito" type="text" name="nit_credito" disabled
                                                        class="text-slate-600 w-40 h-10 focus:outline-none focus:border focus:border-emerald-700 bg-white font-normal flex items-center pl-3 text-sm border-gray-300 rounded border"
                                                        placeholder="2999-299999-299-2"
                                                        v-model="cliente_info.nit_cliente" />
                                                </div>
                                                <div
                                                    class="flex flex-shrink-0 min-w-[8px] md:flex-row flex-col items-center py-2 px-4">
                                                    <!-- Input para ingresar nrc -->
                                                    <div class="flex flex-col">
                                                        <label for="nrc_credito"
                                                            class="text-black-800 text-sm font-bold leading-tight tracking-normal mb-2">
                                                            NRC
                                                        </label>
                                                        <input id="nrc_credito" type="text" name="nrc_credito" disabled
                                                            class="text-slate-600  w-[93px] h-10 focus:outline-none focus:border focus:border-emerald-700 bg-white font-normal flex items-center pl-3 text-sm border-gray-300 rounded border"
                                                            placeholder="299999-9" v-model="cliente_info.nrc_cliente" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                class="flex flex-shrink-0 min-w-[8px] md:flex-row flex-col items-center py-2 px-4">
                                                <!-- Input para ingresar dui -->
                                                <div class="flex flex-col mr-4">
                                                    <label for="dui_credito"
                                                        class="text-black-800 text-sm font-bold leading-tight tracking-normal mb-2">
                                                        DUI
                                                    </label>
                                                    <input id="dui_credito" type="text" name="dui_credito" disabled
                                                        class="text-slate-600 w-28 h-10 focus:outline-none focus:border focus:border-emerald-700 bg-white font-normal flex items-center pl-3 text-sm border-gray-300 rounded border"
                                                        placeholder="29999999-9" v-model="cliente_info.dui_cliente" />
                                                </div>
                                                <!-- Input para ingresar depa -->
                                                <div class="flex flex-col">
                                                    <label for="departamento_cliente_credito"
                                                        class="text-black-800 text-sm font-bold leading-tight tracking-normal mb-2">
                                                        Departamento
                                                    </label>
                                                    <input id="departamento_cliente_credito" type="text"
                                                        name="departamento_cliente_credito" disabled
                                                        class="text-slate-600 w-28 h-10 focus:outline-none focus:border focus:border-emerald-700 bg-white font-normal flex items-center pl-3 text-sm border-gray-300 rounded border"
                                                        placeholder="San Salvador" v-model="departamento_cliente" />
                                                </div>
                                            </div>
                                            <div
                                                class="flex flex-shrink-0 min-w-[8px] md:flex-row flex-col items-center py-2 px-4">
                                                <!-- Input para ingresar Direccion -->
                                                <div class="flex flex-col md:mr-16">
                                                    <label for="direccion_cliente_credito"
                                                        class="text-black-800 text-sm font-bold leading-tight tracking-normal mb-2">
                                                        Direccion
                                                    </label>
                                                    <input disabled id="direccion_cliente_credito" type="text"
                                                        name="direccion_cliente_credito"
                                                        class="text-slate-600 focus:outline-none focus:border focus:border-emerald-700 bg-white font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                                        placeholder="Joaquin Perez"
                                                        v-model="cliente_info.direccion_cliente" />
                                                </div>
                                            </div>
                                            <div
                                                class="flex flex-shrink-0 min-w-[8px] md:flex-row flex-col items-center py-2 px-4">
                                                <!-- Input para ingresar Municipio -->
                                                <div class="flex flex-col">
                                                    <label for="municipio_cliente_credito"
                                                        class="text-black-800 text-sm font-bold leading-tight tracking-normal mb-2">
                                                        Municipio
                                                    </label>
                                                    <input disabled id="municipio_cliente_credito" type="text"
                                                        name="municipio_cliente_credito" v-model="municipio_cliente"
                                                        class="text-slate-600 focus:outline-none focus:border focus:border-emerald-700 bg-white font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border">
                                                </div>
                                            </div>
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
                                                    placeholder="0.00" v-model="subtotal_venta" disabled>
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
                                                    placeholder="0.00" disabled
                                                    v-model="credito_fiscal_info.total_iva_credito">
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
                                                    placeholder="0.00" disabled v-model="credito_fiscal_info.total_credito">
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="flex justify-center py-4 px-4 pt-24 pl-36">
                                <!--<button v-if="active_tab === 0" @click="register_new_venta()"
                                    :class="{ 'bg-emerald-600 hover:bg-emerald-800': active_tab == 1, 'bg-indigo-600 hover:bg-indigo-800': active_tab == 0 }"
                                    class="h-[40px] text-white font-bold py-2 px-4 rounded">
                                    Guardar Venta Consumidor Final
                                </button>-->
                                <button v-if="active_tab === 1" @click="register_new_venta()"
                                    :class="{ 'bg-emerald-600 hover:bg-emerald-800': active_tab == 1, 'bg-indigo-600 hover:bg-indigo-800': active_tab == 0 }"
                                    class="h-[40px] text-white font-bold py-2 px-4 rounded">
                                    Actualizar Pedido (Credito Fiscal)
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
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
import { useRoute } from 'vue-router';

const toast = useToast();

export default {
    components: {
        NavBar: NavBar,
    },
    data() {
        return {
            id: null,
            //Tab activo (0 = Consumidor Final, 1 = Credito Fiscal)
            active_tab: 1,

            // Objeto Producto
            producto_info: {},
            // Listado de Detalles (para tabla) y objeto Detalle
            detalle_ventas_lista: [],
            detalle_venta: {
                id_venta: 0,
                producto: [],
                cantidad_producto: 0,
                subtotal_detalle_venta: 0.00,
            },
            //Objeto Venta
            /*venta_info: {
                id_venta: 0,
                nombre_cliente_venta: "",
                fecha_venta: null,
                total_venta: 0,
                total_iva: 0,
            },*/
            //Objeto Cliente
            cliente_info: {
                id_cliente: 0,
                nombre_cliente: "",
                nit_cliente: "",
                nrc_cliente: "",
                dui_cliente: "",
                direccion_cliente: "",
                id_municipio: "",
                municipio: {},
                distintivo_cliente: ""
            },
            departamento_cliente: "La Paz",
            municipio_cliente: "San Luis la Herradura",

            //Objeto Creditos Fiscales
            credito_fiscal_info: {
                id_creditofiscal: 0,
                id_cliente: 0,
                fecha_credito: null,
                total_credito: 0,
                total_iva_credito: 0,
            },

            //Producto busqueda por nombre
            producto_nombre: '',

            //Contador Autoincremental para la tabla Detalle
            contador_tabla: 1,

            //Subtotal de la venta
            subtotal_venta: 0.00,

            //Codigo de Lector de Barras (para buscar producto)
            codigo_barra_lector: '',
            producto_codigo: '', //Para la busqueda de productos por filtro de codigo
            timer: null, //Para el timer del lector de barras

            //Para la busqueda de productos por filtro de nombre
            productos: [], // Lista de nombres de productos completa
            sugerencias: [], // Sugerencias de productos a partir del input de busqueda
            mostrar_sugerencias: false, // Mostrar o no las sugerencias

            //Para la busqueda de Clientes por filtro de identificador o distintivo
            clientes: [], // Lista de info de clientes completa
            sugerencias_cliente: [], // Sugerencias de Clientes a partir del input de busqueda
            mostrar_sugerencias_cliente: false, // Mostrar o no las sugerencias de Clientes
            campo_identificador_cliente: "", // Campo de identificador de cliente
        };
    },
    created() {
        this.asignar_fecha_actual();
        this.get_lista_nombres_productos();
        this.get_lista_nombres_clientes();
    },
    mounted() {
        document.addEventListener('keydown', this.redirigir_entrada_input);
        const route = useRoute();
        this.id = route.params.id;
        this.getCreditoFiscal();
    },
    watch: {
        //Calculos en cada cambio de detalle de venta
        detalle_ventas_lista: {
            handler() {
                this.subtotal_venta = 0;
                this.credito_fiscal_info.total_credito = 0;

                this.detalle_ventas_lista.forEach((detalle) => {
                    this.credito_fiscal_info.total_credito += Number(detalle.subtotal_detalle_credito);
                });

                // Convertidos a texto con toFixed(2) para que siempre tenga 2 decimales

                this.subtotal_venta = (this.credito_fiscal_info.total_credito / (1 + 0.13)).toFixed(2);

                this.credito_fiscal_info.total_iva_credito = Number(this.subtotal_venta * 0.13).toFixed(2);

                this.credito_fiscal_info.total_credito = Number(this.credito_fiscal_info.total_credito).toFixed(2);
            },
            deep: true,
        },
    },
    methods: {
        getCreditoFiscal() {
            axios.get(api_url + '/creditos_detalle/' + this.id).then(
                response => {
                    this.credito_fiscal_info = response.data,
                        this.detalle_ventas_lista = response.data.detallecredito,
                        this.cliente_info = response.data.cliente,
                        this.calcular_subtotalventa()
                });
        },
        redirigir_entrada_input() {
            if (!(document.activeElement.tagName == "INPUT")) {
                // No hay ningún campo activo, enfocar al input de busqueda por codigo
                this.$refs.codigo_bp.focus();
            }
        },
        listener_buscar_codigo_producto() {
            var codigoBarras = this.producto_codigo;
            console.log("codigo barras: " + codigoBarras);

            // Reiniciar el temporizador
            if (this.timer) {
                clearTimeout(this.timer);
            }

            // Establecer un nuevo temporizador para ejecutar la búsqueda después de un cierto tiempo (por ejemplo, 500 ms)
            this.timer = setTimeout(() => {
                this.codigo_barra_lector = codigoBarras;
                this.get_producto_segun_codigo();
            }, 500);
        },
        //Eliminar detalle de venta de la tabla
        eliminar_detalle_venta(index) {
            console.log("index: " + index);
            if (this.detalle_ventas_lista.length === 1) {
                // Si solo queda un detalle, restablecer los valores en lugar de eliminarlo
                this.detalle_ventas_lista = []
                this.contador_tabla = 1;
            } else {
                this.detalle_ventas_lista.splice(index - 1, 1); //Index-1 porque el index empieza en 1
                this.contador_tabla = 1;
                // Actualizar el contador de los detalles restantes
                for (let i = 0; i < this.detalle_ventas_lista.length; i++) {
                    this.detalle_ventas_lista[i].id_venta = this.contador_tabla++;
                }
            }
        },
        //Obtener lista de todos los nombres de productos en la bdd
        get_lista_nombres_productos() {
            return axios
                .get(api_url + '/productos/nombres/lista')
                .then((response) => {
                    this.productos = response.data.nombres_productos;
                    //console.log("nombreees: " + response.data.nombres_productos);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        // --------------------- PRODUCTOS ---------------------
        //Buscar el nombre del producto mas cercano al texto ingresado
        listener_producto_nombre() {
            if (this.producto_nombre && this.mostrar_sugerencias) {
                this.sugerencias = this.productos.filter((producto) => {
                    return producto.toLowerCase().includes(this.producto_nombre.toLowerCase());
                });
            } else {
                this.sugerencias = [];
            }
        },
        //Seleccionar sugerencia de producto en buscador
        seleccionar_sugerencia_producto(sugerencia) {
            this.producto_nombre = sugerencia;
            this.agregar_producto_detalle();
            this.sugerencias = [];
        },
        // --------------------- CLIENTES ---------------------
        //Obtener lista de todos los nombres de clientes en la bdd
        get_lista_nombres_clientes() {
            return axios
                .get(api_url + '/clientes/identificador/lista')
                .then((response) => {
                    this.clientes = response.data.datos;
                    //console.log(response.data.datos);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        //Buscar el nombre del Cliente mas cercano al texto ingresado
        listener_cliente_identificador() {
            if (this.campo_identificador_cliente) {
                this.sugerencias_cliente = this.clientes.filter((cliente) => {
                    return cliente.distintivo_cliente.toLowerCase().includes(this.campo_identificador_cliente.toLowerCase());
                });
            } else {
                this.sugerencias_cliente = [];
            }
        },
        //Seleccionar sugerencia de Clientes en buscador
        seleccionar_sugerencia_cliente(sugerencia_cliente) {
            this.campo_identificador_cliente = sugerencia_cliente.distintivo_cliente;
            const id_cliente = sugerencia_cliente.id_cliente;
            this.llenar_detalle_cliente_credito(id_cliente);
            this.sugerencias_cliente = [];
        },
        llenar_detalle_cliente_credito(cliente_id) {
            return axios
                .get(api_url + '/clientes/' + cliente_id)
                .then((res) => {
                    console.log(res.data.datos);
                    this.cliente_info = {
                        id_cliente: res.data.datos.id_cliente,
                        nombre_cliente: res.data.datos.nombre_cliente,
                        direccion_cliente: res.data.datos.direccion_cliente,
                        dui_cliente: res.data.datos.dui_cliente,
                        nit_cliente: res.data.datos.nit_cliente,
                        nrc_cliente: res.data.datos.nrc_cliente,
                        municipio_cliente: res.data.datos.municipio,
                        identificador_cliente: res.data.datos.distintivo_cliente,
                    },
                        console.log(this.cliente_info);
                })
                .then(() => {
                    this.municipio_cliente = this.cliente_info.municipio_cliente.nombre_municipio;
                    return this.obtener_departamento_cliente();
                })
                .then(() => {
                    this.watch_toast("success", "Cliente agregado");
                })
                .catch((err) => {
                    console.log(err);
                    this.watch_toast("error", "Error al agregar cliente");
                });
        },
        obtener_departamento_cliente() {
            return axios
                .get(api_url + '/departamentos/' + this.cliente_info.municipio_cliente.id_departamento)
                .then((res) => {
                    console.log(res.data.datos);
                    this.departamento_cliente = res.data.datos.nombre_departamento;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        // --------------------- CLIENTES ---------------------
        //Buscar Producto por codigo
        get_producto_segun_codigo() {
            return axios
                .get(api_url + '/productos/' + this.codigo_barra_lector)
                .then((res) => {
                    if (res.data.producto == null) {
                        this.watch_toast("error", "Producto no encontrado");
                        return;
                    }
                    if (res.data.producto.esta_disponible == false) {
                        this.watch_toast("error", "Producto no disponible actualmente");
                        return;
                    }
                    console.log(res.data.producto);
                    this.producto_info = res.data.producto
                    this.producto_info['precio_unitario_original'] = res.data.producto.precio_unitario;
                    console.log(this.producto_info + "producto pegado");
                    return this.add_detalle_venta();
                })
                .then(() => {
                    console.log("Agregado a la tabla");
                    this.producto_codigo = '';
                })
                .catch((err) => {
                    this.watch_toast("error", "Producto no encontrado");
                    console.log(err);
                });
        },
        //Actualizar Fecha automaticamente
        asignar_fecha_actual() {
            //this.venta_info.fecha_venta = moment().format('yyyy-MM-DD');
            this.credito_fiscal_info.fecha_credito_fiscal = moment().format('yyyy-MM-DD');
        },
        //Anadir registro en tabla DETALLE
        agregar_producto_detalle() {
            this.get_producto_segun_nombre()
                .then(() => {
                    return this.add_detalle_venta();
                })
                .then(() => {
                    console.log("Todo bien todo correcto")
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        //Buscar Producto por Nombre
        get_producto_segun_nombre() {
            return new Promise((resolve, reject) => {
                // Verificar que el campo no esté vacío
                if (!this.producto_nombre) {
                    console.log('Campo vacío');
                    reject('Campo vacío');
                    return;
                }
                axios.get(api_url + '/productos/buscar/' + this.producto_nombre)
                    .then((res) => {
                        if (res.data.producto.esta_disponible == false) {
                            this.watch_toast("error", "Producto no disponible actualmente");
                            return;
                        }
                        this.producto_info = res.data.producto[0]
                        this.producto_info['precio_unitario_original'] = res.data.producto[0].precio_unitario;
                        console.log(res.data.producto[0].codigo_barra_producto);
                        this.producto_nombre = '';
                        //this.watch_toast("success", "Producto agregado");
                        resolve(); // Resolver la promesa
                    })
                    .catch((err) => {
                        this.watch_toast("error", err.response.data.mensaje);
                        console.log(err.response.data);
                        reject(err.response.data);
                    });
            });
        },
        //Metodos de Detalles
        add_detalle_venta() {
            //Habian problemas con el objeto, toca hacer una copia
            const producto_copia = JSON.parse(JSON.stringify(this.producto_info));
            // Verificar que el producto no esté ya en la tabla
            const producto_ya_agregado = this.detalle_ventas_lista.find((detalle) => {
                return detalle.producto.codigo_barra_producto === producto_copia.codigo_barra_producto;
            });
            if (producto_ya_agregado) {
                // Si el producto ya está en la tabla, aumentar la cantidad a ese detalle
                producto_ya_agregado.cantidad_producto_credito++;
                return this.calcular_subtotalventa();
            }
            return new Promise((resolve, reject) => {
                const detalle = {
                    id_detalle_credito: this.contador_tabla, //Este valor es solo para usarlo en la tabla
                    producto: producto_copia,
                    cantidad_producto_credito: 1,
                    subtotal_detalle_credito: this.producto_info.precio_producto,
                };
                this.detalle_ventas_lista.push(detalle);
                this.producto_nombre = '';
                this.contador_tabla++;
                resolve();
            });
        },
        //Observar cambios en cantidad de producto y actualizar subtotal
        watch_cantidad_producto(fila) {
            this.verificar_unidad_medida(fila)
                .then(() => {
                    return this.calcular_subtotalventa();
                })
                .then(() => {
                    console.log("Todo bien todo correcto")
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        verificar_unidad_medida(fila) {
            return new Promise((resolve, reject) => {
                resolve();
                // Aqui se agregará la logica para verificar la unidad de medida en cada cambio de cantidad
                // 2d sprint
            });

        },
        //Subtotal de la venta RESUMEN
        calcular_subtotalventa() {
            new Promise((resolve, reject) => {
                this.subtotal_venta = this.detalle_ventas_lista.reduce(
                    (acc, obj) => acc + Number(obj.subtotal_detalle_credito),
                    0.00
                );
                this.subtotal_venta = Number(this.subtotal_venta / 1.13).toFixed(2);
                resolve();
            });
        },
        //Registrar Venta y obtener el id de la venta registrada
        register_new_venta() {
            if (this.detalle_ventas_lista.length == 0) {
                this.watch_toast('error', 'No se ha agregado ningun producto');
                return;
            }
            var datos_ventas = {};
            var detalles_listado_limpio = [];
            var detalle_obj = {};
            /*if (this.active_tab == 0) {
                // Para obtener el listado de ventas limpio para la insercion en la base de datos
                this.detalle_ventas_lista.map((detalle) => {
                    detalle_obj = {
                        id_venta: 0,
                        codigo_barra_producto: String(detalle.producto.codigo_barra_producto),
                        cantidad_producto: detalle.cantidad_producto,
                        subtotal_detalle_venta: Number(detalle.subtotal_detalle_venta),
                    };
                    detalles_listado_limpio.push(detalle_obj);
                });
                axios.put(api_url + '/modificar_pedido_factura/'+this.id,
                    datos_ventas = {
                        venta: {
                            nombre_cliente_venta: this.venta_info.nombre_cliente_venta,
                            fecha_venta: this.venta_info.fecha_venta,
                            total_venta: Number(this.subtotal_venta),
                            total_iva: Number(this.venta_info.total_iva),
                        },
                        detalles: detalles_listado_limpio,
                    }).then((resp) => {
                        this.watch_toast('success', 'Venta actualizada correctamente');
                        this.limpiar_campos();
                    }).catch((error) => {
                        this.watch_toast('error', error.response.data.mensaje);
                        this.watch_toast('error', 'Ocurrió un error al registrar la Venta');
                        throw error;
                    });
            } else*/ if (this.active_tab == 1) {
                if (this.cliente_info.id_cliente == 0) {
                    this.watch_toast('error', 'Debe seleccionar un Cliente');
                    return;
                }
                this.detalle_ventas_lista.map((detalle) => {
                    detalle_obj = {
                        id_creditofiscal: 0,
                        codigo_barra_producto: String(detalle.producto.codigo_barra_producto),
                        cantidad_producto_credito: detalle.cantidad_producto_credito,
                        subtotal_detalle_credito: Number(detalle.subtotal_detalle_credito),
                    };
                    detalles_listado_limpio.push(detalle_obj);
                });
                axios.put(api_url + '/modificar_pedido_credito/' + this.id,
                    datos_ventas = {
                        credito: {
                            id_credito_fiscal: this.id,
                            id_cliente: this.cliente_info.id_cliente,
                            fecha_credito: this.credito_fiscal_info.fecha_credito,
                            total_credito: Number(this.credito_fiscal_info.total_credito),
                            total_iva_credito: Number(this.credito_fiscal_info.total_iva_credito),
                        },
                        detalles: detalles_listado_limpio,
                    }).then(() => {
                        this.watch_toast('success', 'Credito registrado correctamente');
                        this.limpiar_campos();
                    }).catch((error) => {
                        this.watch_toast('error', error.response.data.mensaje);
                        this.watch_toast('error', 'Ocurrió un error al registrar el Credito');
                        throw error;
                    })
            }
        },
        limpiar_campos() {
            this.detalle_ventas_lista = [];
            this.cliente_info = {
                id_cliente: 0,
                nombre_cliente: "",
                nit_cliente: "",
                nrc_cliente: "",
                dui_cliente: "",
                direccion_cliente: "",
                municipio_cliente: {},
                identificador_cliente: ""
            };
            /*this.venta_info = {
                id_venta: 0,
                nombre_cliente_venta: "",
                fecha_venta: this.venta_info.fecha_venta,
                total_venta: 0,
                total_iva: 0,
            };*/
            this.credito_fiscal_info = {
                id_credito_fiscal: 0,
                id_cliente: 0,
                fecha_credito: this.venta_info.fecha_venta,
                total_credito: 0,
                total_iva_credito: 0,
            };
            this.campo_identificador_cliente = "";
            this.contador_tabla = 1;
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
    }
};
</script>