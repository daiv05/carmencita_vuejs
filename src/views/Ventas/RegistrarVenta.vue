<template>
    <NavBar />
    <div class="h-screen">
        <div class="w-full bg-slate-100">
            <div>
                <div class="flex bg-white mx-auto p-5 shadow-md justify-between">
                    <h1 class="font-bold text-blue-700 text-xl">Ventas</h1>
                    <div class="items-center rounded-[4.44px] bg-[#637381]">
                        <button id="show-modal" class="w-auto h-auto m-2 text-[13px] font-medium text-center text-white"
                            @click="showModal = true">
                            Registrar como Pedido a Domicilio
                        </button>
                    </div>
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
                    <div class="tab" :class="{ 'active': active_tab === 0 }" @click="active_tab = 0">
                        Consumidor Final
                    </div>
                    <div class="tab" :class="{ 'active': active_tab === 1 }" @click="active_tab = 1">
                        Crédito Fiscal
                    </div>
                </div>
                <!-- Contenido de los tabs -->
                <div class="tab-content flex-grow">
                    <!-- Contenido del formulario para Consumidor Final -->
                    <div class="p-4 bg-white">
                        <div class="flex pb-36">
                            <div class="w-3/4 pr-4 h-full min-h-screen pt-4 overflow-auto">
                                <!-- Contenido del bloque de espacio izquierdo (3/4 del espacio) -->
                                <!-- Input para ingresar Producto -->
                                <div class="flex justify-start items-center pb-6">
                                    <label class="text-base font-bold">
                                        Producto
                                    </label>
                                    <input @input="listener_buscar_codigo_producto()" ref="codigo_bp"
                                        class="mx-4 text-slate-600 focus:outline-none focus:border focus:border-indigo-700 bg-white font-normal w-40 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                        placeholder="Codigo del Producto" v-model="producto_codigo" />
                                    <div class="sugerencias-container md:col-span-3">
                                        <!-- Campo de entrada -->
                                        <input @input="listener_producto_nombre()" @focus="mostrar_sugerencias = true"
                                            @blur.self="mostrar_sugerencias = false"
                                            class="md:col-span-3 text-slate-600 focus:outline-none focus:border focus:border-indigo-700 bg-white font-normal h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                            placeholder="Nombre del Producto" v-model="producto_nombre" />
                                        <!-- Lista de sugerencias -->
                                        <ul class="sugerencias-lista border border-slate-500"
                                            v-if="mostrar_sugerencias && sugerencias.length > 0">
                                            <li class="m-2" href="#" v-for="sugerencia in sugerencias" :key="sugerencia.id"
                                                @mousedown.prevent="seleccionar_sugerencia_producto(sugerencia)">
                                                <button class="w-full text-left">
                                                    {{ sugerencia }}
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
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
                                        <tr v-for="fila, index in detalle_ventas_lista" :key="fila.id_venta"
                                            class="border-b-2 border-black-400 h-[40px] bg-black-300">
                                            <td class="text-center">{{ index + 1 }}</td>
                                            <td class="text-center">{{ fila.producto_detalle.nombre_producto }}</td>
                                            <td class="text-center">
                                                <input @change="verificar_precios_y_ofertas(fila)"
                                                    class="w-auto h-[25px] text-center" type="number" min="1" max="100"
                                                    v-model="fila.cantidad_prod_venta">
                                            </td>
                                            <td class="text-center">$ {{ fila.producto_detalle.precio_unitario }}</td>
                                            <td class="text-center">$ {{ fila.subtotal_detalle_venta =
                                            Number(fila.producto_detalle.precio_unitario *
                                                fila.cantidad_prod_venta).toFixed(2) }}</td>
                                            <td class="flex justify-end pr-4 py-2">
                                                <button @click="eliminar_detalle_venta(index + 1)"
                                                    class="font-medium text-center text-white rounded ml-4 bg-red-600 h-[25px] w-[25px]">
                                                    X
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <!-- Contenido del bloque de espacio derecho (1/4 del espacio) -->
                            <div class="w-1/4 border-l border-gray-300 pl-2 flex-shrink-0 min-h-[200px] overflow-x-auto">
                                <div v-if="active_tab === 0">
                                    <!-- PARA CONSUMIDOR FINAL-->
                                    <div class="flex md:flex-row flex-col items-center py-4 px-4">
                                        <!-- Input para ingresar Fecha -->
                                        <div class="flex flex-col md:mr-16">
                                            <label for="fecha_venta"
                                                class="text-black-800 text-sm font-bold leading-tight tracking-normal mb-2">
                                                Fecha de Venta
                                            </label>
                                            <input id="fecha_venta" type="date" name="fecha_venta"
                                                v-model="venta_info.fecha_venta"
                                                class="w-full text-slate-600 focus:outline-none focus:border focus:border-indigo-700 bg-white font-normal h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" />
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
                                                class="w-full text-slate-600 focus:outline-none focus:border focus:border-indigo-700 bg-white font-normal h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                                v-model="venta_info.nombre_cliente_venta" />
                                        </div>
                                    </div>
                                </div>
                                <div v-if="active_tab === 1">
                                    <!-- PARA CREDITO FISCAL-->
                                    <div class="flex pl-2">
                                        <!-- Contenido del bloque de espacio derecho (1/4 del espacio) -->
                                        <div>
                                            <div class="flex md:flex-row flex-col items-center py-4">
                                                <!-- Input para ingresar Fecha -->
                                                <div class="flex flex-col md:mr-16">
                                                    <label for="fecha_credito"
                                                        class="text-black-800 text-sm font-bold leading-tight tracking-normal mb-2">
                                                        Fecha de Venta
                                                    </label>
                                                    <input id="fecha_credito" type="date" name="fecha_credito"
                                                        v-model="venta_info.fecha_venta"
                                                        class="text-slate-600 focus:outline-none focus:border focus:border-emerald-700 bg-white font-normal w-auto h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" />
                                                </div>
                                            </div>
                                            <div class="flex md:flex-row flex-col items-center py-2">
                                                <div class="flex flex-col">
                                                    <label for="identificador_cliente_credito"
                                                        class="text-black-800 text-sm font-bold leading-tight tracking-normal mb-2 flex">
                                                        Seleccionar Cliente
                                                    </label>
                                                    <div class="sugerencias-container">
                                                        <input @input="listener_cliente_identificador()"
                                                            @focus="mostrar_sugerencias_cliente = true"
                                                            @blur.self="mostrar_sugerencias_cliente = false"
                                                            id="identificador_cliente_credito" type="text"
                                                            name="identificador_cliente_credito"
                                                            class="text-slate-600 focus:outline-none focus:border focus:border-indigo-700 bg-white font-normal h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                                            placeholder="Ingrese el identificador"
                                                            v-model="campo_identificador_cliente" />
                                                        <!--Lista de sugerencias -->
                                                        <ul class="sugerencias-lista border border-slate-500"
                                                            v-if="mostrar_sugerencias_cliente && sugerencias_cliente.length > 0">
                                                            <li class="m-2" href="#"
                                                                v-for=" cliente  in  sugerencias_cliente"
                                                                :key="cliente.distintivo_cliente"
                                                                @mousedown.prevent="seleccionar_sugerencia_cliente(cliente)">
                                                                <button class="w-full text-left">
                                                                    {{ cliente.distintivo_cliente }}
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </div>

                                                    <div class="flex justify-end pt-2 text-align-center">
                                                        <button @click="show_modal_agregar = true"
                                                            class="py-2 px-4 bg-emerald-600 flex justify-center items-center h-[30px] w-auto hover:bg-emerald-800 text-white font-bold rounded">
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
                                            <div class="flex md:flex-row flex-col items-center py-2">
                                                <!-- Input para ingresar Cliente -->
                                                <div class="flex flex-col md:mr-16">
                                                    <label for="nombre_cliente_credito"
                                                        class="text-black-800 text-sm font-bold leading-tight tracking-normal mb-2">
                                                        Cliente
                                                    </label>
                                                    <input type="text" name="nombre_cliente_credito" disabled
                                                        class="text-slate-600 bg-white font-normal w-auto h-10 flex items-center pl-3 text-sm rounded border-gray-300 border"
                                                        v-model="cliente_info.nombre_cliente" />
                                                </div>
                                            </div>
                                            <div class="flex md:flex-row flex-col items-center py-2">
                                                <div class="flex flex-col mr-2">
                                                    <label for="nit_credito"
                                                        class="text-black-800 text-sm font-bold leading-tight tracking-normal mb-2">
                                                        NIT
                                                    </label>
                                                    <input id="nit_credito" type="text" name="nit_credito" disabled
                                                        class="text-slate-600 w-auto max-w-[150px] h-10 bg-white font-normal flex items-center pl-3 text-sm border-gray-300 rounded border"
                                                        v-model="cliente_info.nit_cliente" />
                                                </div>
                                                <div class="flex md:flex-row flex-col items-center py-2">
                                                    <div class="flex flex-col">
                                                        <label for="nrc_credito"
                                                            class="text-black-800 text-sm font-bold leading-tight tracking-normal mb-2">
                                                            NRC
                                                        </label>
                                                        <input id="nrc_credito" type="text" name="nrc_credito" disabled
                                                            class="text-slate-600 w-auto max-w-[90px] h-10 focus:outline-none focus:border focus:border-emerald-700 bg-white font-normal flex items-center pl-3 text-sm border-gray-300 rounded border"
                                                            v-model="cliente_info.nrc_cliente" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="flex md:flex-row flex-col items-center py-2">
                                                <!-- Input para ingresar dui -->
                                                <div class="flex flex-col mr-4">
                                                    <label for="dui_credito"
                                                        class="text-black-800 text-sm font-bold leading-tight tracking-normal mb-2">
                                                        DUI
                                                    </label>
                                                    <input id="dui_credito" type="text" name="dui_credito" disabled
                                                        class="text-slate-600 w-auto max-w-[110px] h-10 focus:outline-none focus:border focus:border-emerald-700 bg-white font-normal flex items-center pl-3 text-sm border-gray-300 rounded border"
                                                        v-model="cliente_info.dui_cliente" />
                                                </div>
                                                <!-- Input para ingresar depa -->
                                                <div class="flex flex-col">
                                                    <label for="departamento_cliente_credito"
                                                        class="text-black-800 text-sm font-bold leading-tight tracking-normal mb-2">
                                                        Departamento
                                                    </label>
                                                    <input id="departamento_cliente_credito" type="text"
                                                        name="departamento_cliente_credito" disabled
                                                        class="text-slate-600 w-auto max-w-[110px] h-10 focus:outline-none focus:border focus:border-emerald-700 bg-white font-normal flex items-center pl-3 text-sm border-gray-300 rounded border"
                                                        v-model="departamento_cliente" />
                                                </div>
                                            </div>
                                            <div class="flex md:flex-row flex-col items-center py-2">
                                                <!-- Input para ingresar Direccion -->
                                                <div class="flex flex-col md:mr-16">
                                                    <label for="direccion_cliente_credito"
                                                        class="text-black-800 text-sm font-bold leading-tight tracking-normal mb-2">
                                                        Direccion
                                                    </label>
                                                    <input disabled id="direccion_cliente_credito" type="text"
                                                        name="direccion_cliente_credito"
                                                        class="text-slate-600 focus:outline-none focus:border focus:border-emerald-700 bg-white font-normal w-auto h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                                        v-model="cliente_info.direccion_cliente" />
                                                </div>
                                            </div>
                                            <div class="flex md:flex-row flex-col items-center py-2">
                                                <!-- Input para ingresar Municipio -->
                                                <div class="flex flex-col">
                                                    <label for="municipio_cliente_credito"
                                                        class="text-black-800 text-sm font-bold leading-tight tracking-normal mb-2">
                                                        Municipio
                                                    </label>
                                                    <input disabled id="municipio_cliente_credito" type="text"
                                                        name="municipio_cliente_credito" v-model="municipio_cliente"
                                                        class="text-slate-600 focus:outline-none focus:border focus:border-emerald-700 bg-white font-normal w-auto h-10 flex items-center pl-3 text-sm border-gray-300 rounded border">
                                                </div>
                                            </div>
                                            <div class="flex md:flex-row flex-col items-center pt-8">
                                                <a href="#" @click="reset_seleccion_cliente()"
                                                    class="underline text-xs font-light text-blue-950 w-full text-end">
                                                    (Quitar selección)
                                                </a>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Resumen de la Venta -->
                        <hr>
                        <div class="grid grid-cols-12 pl-8">
                            <table class="table col-span-4">
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
                                                <label
                                                    class="text-slate-600 bg-white font-normal h-[40px] pl-3 flex items-center border-l-0 text-sm border-gray-100 rounded-tr-md rounded-br-md border">
                                                    {{ Number(Number(subtotal_venta) + Number(venta_info.total_descuentos)).toFixed(2) }}
                                                </label>
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
                                                    placeholder="0.00" disabled v-model="venta_info.total_iva">
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
                                                <input
                                                    class="text-slate-600 bg-white font-normal h-[40px] pl-3 flex items-center border-l-0 text-sm border-gray-100 rounded-tr-md rounded-br-md border"
                                                    placeholder="0.00" disabled v-model="venta_info.total_descuentos">
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
                                                    class="text-slate-600 bg-white font-bold h-[40px] pl-3 flex items-center text-md  rounded-tr-md rounded-br-md"
                                                    placeholder="0.00" disabled v-model="venta_info.total_venta">
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="grid grid-cols-12 col-span-8 justify-center items-center py-4 px-4 w-full mt-10">
                                <div class="flex justify-end col-span-6">
                                    <button v-if="active_tab === 0" @click="register_new_venta(false)"
                                        :class="{ 'bg-emerald-600 hover:bg-emerald-800': active_tab == 1, 'bg-indigo-600 hover:bg-indigo-800': active_tab == 0 }"
                                        class="h-auto text-white font-bold py-2 px-4 rounded justify-end">
                                        Guardar Venta Consumidor Final
                                    </button>
                                    <button v-if="active_tab === 1" @click="register_new_venta(false)"
                                        :class="{ 'bg-emerald-600 hover:bg-emerald-800': active_tab == 1, 'bg-indigo-600 hover:bg-indigo-800': active_tab == 0 }"
                                        class="h-auto text-white font-bold py-2 px-4 rounded justify-end">
                                        Guardar Venta Crédito Fiscal
                                    </button>
                                </div>
                                <div class="flex justify-end align-bottom col-span-6">
                                    <a @click="restaurar_ultima_factura()" class="text-sm font-light underline"
                                        href="#">Restaurar última venta</a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Teleport to="body">
        <ModalVentaDomicilio :show="showModal" :activeTab="active_tab" :fecha="venta_info.fecha_venta"
            @close="showModal = false" @save="register_new_venta(true)"></ModalVentaDomicilio>
    </Teleport>

    <Teleport to="body">
        <ModalAgregarCliente :show="show_modal_agregar" @close="get_lista_nombres_clientes(); show_modal_agregar = false;">
        </ModalAgregarCliente>
    </Teleport>
</template>

<script>
import axios from 'axios';
import api_url from '../../config.js';
import "../../assets/registrar_venta.css";
import moment from 'moment';
import { useToast } from 'vue-toastification';
import NavBar from '@/components/NavBar.vue';

import ModalVentaDomicilio from '@/components/Ventas/ModalVentaDomicilio.vue';
import ModalAgregarCliente from '@/components/Ventas/ModalAgregarCliente.vue';

const toast = useToast();

export default {
    components: {
        ModalVentaDomicilio,
        NavBar: NavBar,
        ModalAgregarCliente
    },
    data() {
        return {
            showModal: false,
            show_modal_agregar: false,
            //Tab activo (0 = Consumidor Final, 1 = Credito Fiscal)
            active_tab: 0,
            // Objeto Producto
            producto_info: {},
            // Listado de Detalles (para tabla) y objeto Detalle
            detalle_ventas_lista: [],
            detalle_venta: {
                id_venta: 0,
                producto_detalle: [],
                cantidad_prod_venta: 0,
                subtotal_detalle_venta: 0.00,
                descuentos_detalle: 0.00,
            },
            //Objeto Venta
            venta_info: {
                id_venta: 0,
                nombre_cliente_venta: "",
                fecha_venta: null,
                total_venta: 0,
                total_iva: 0,
                total_descuentos: 0.00,
            },
            //Objeto Cliente
            cliente_info: {
                id_cliente: 0,
                nombre_cliente: "",
                nit_cliente: "",
                nrc_cliente: "",
                dui_cliente: "",
                direccion_cliente: "",
                municipio_cliente: {},
                identificador_cliente: ""
            },
            departamento_cliente: "",
            municipio_cliente: "",

            //Objeto Creditos Fiscales
            credito_fiscal_info: {
                id_credito_fiscal: 0,
                id_cliente: 0,
                fecha_credito_fiscal: null,
                total_credito_fiscal: 0,
                total_iva_credito_fiscal: 0,
            },
            //Producto busqueda por nombre
            producto_nombre: '',
            //Contador Autoincremental para la tabla Detalle
            contador_tabla: 0,
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


            // Copia de seguridad para restaurar los valores de los campos
            detalle_ventas_lista_COPIA: [],
            cliente_info_COPIA: {},
            venta_info_COPIA: {},
            credito_fiscal_info_COPIA: {},
            campo_identificador_cliente_COPIA: "",
            contador_tabla_COPIA: 1,
        };
    },
    created() {
        this.asignar_fecha_actual();
        this.get_lista_nombres_productos();
        this.get_lista_nombres_clientes();
    },
    mounted() {
        document.addEventListener('keydown', this.redirigir_entrada_input);
    },
    watch: {
        //Calculos en cada cambio de detalle de venta
        detalle_ventas_lista: {
            handler() {
                this.subtotal_venta = 0;
                this.venta_info.total_venta = 0;
                this.venta_info.total_descuentos = 0;
                this.detalle_ventas_lista.forEach((detalle) => {
                    this.venta_info.total_venta += Number(detalle.subtotal_detalle_venta);
                    this.venta_info.total_descuentos += Number(detalle.descuentos_detalle);
                });
                this.venta_info.total_venta = this.venta_info.total_venta - this.venta_info.total_descuentos;
                this.subtotal_venta = (this.venta_info.total_venta / (1 + 0.13)).toFixed(4);
                this.venta_info.total_iva = Number(this.subtotal_venta * 0.13).toFixed(2);
                this.venta_info.total_venta = Number(this.venta_info.total_venta).toFixed(2);
                this.subtotal_venta = Number(this.subtotal_venta).toFixed(2);
                this.venta_info.total_descuentos = Number(this.venta_info.total_descuentos).toFixed(2);
            },
            deep: true,
        },
        active_tab: {
            handler() {
                if (this.active_tab === 1 && this.detalle_ventas_lista.length >= 13) {
                    this.detalle_ventas_lista.slice(0, 11);
                    this.contador_tabla = 12;
                    this.watch_toast('error', 'Limite de productos por factura (Crédito) alcanzado.');
                }
            },
            deep: true,
        },
    },
    methods: {
        redirigir_entrada_input() {
            if (!(document.activeElement.tagName == "INPUT")) {
                // No hay ningún campo activo, enfocar al input de busqueda por codigo
                this.$refs.codigo_bp?.focus();
            }
        },
        listener_buscar_codigo_producto() {
            var codigoBarras = this.producto_codigo;
            console.log("codigo barras: " + codigoBarras);
            // Reiniciar el temporizador
            this.timer ? clearTimeout(this.timer) : null;
            // Si llegamos al limite de 20 detalles, return
            if (this.contador_tabla >= 20) {
                console.log("Limite de 20 detalles");
                this.watch_toast('error', 'Limite de productos por factura alcanzado.');
                return;
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
                this.contador_tabla = 0;
            } else {
                this.detalle_ventas_lista.splice(index - 1, 1); //Index-1 porque el index empieza en 1
                this.contador_tabla = this.contador_tabla - 1;
            }
        },
        //Obtener lista de todos los nombres de productos en la bdd
        get_lista_nombres_productos() {
            return axios
                .get(api_url + '/productos/nombres/lista')
                .then((response) => {
                    this.productos = response.data.nombres_productos;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
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
        //Obtener lista de todos los nombres de clientes en la bdd
        get_lista_nombres_clientes() {
            return axios
                .get(api_url + '/clientes/identificador/lista')
                .then((response) => {
                    this.clientes = response.data.datos;
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
            this.venta_info.fecha_venta = moment().format('yyyy-MM-DD');
            this.credito_fiscal_info.fecha_credito_fiscal = moment().format('yyyy-MM-DD');
        },
        //Anadir registro en tabla DETALLE
        agregar_producto_detalle() {
            if (this.active_tab === 0 && this.contador_tabla >= 20) {
                console.log("Limite de 20 detalles, consumidor final");
                this.watch_toast('error', 'Limite de productos por factura (cons. final) alcanzado.');
                return;
            } else if (this.active_tab === 1 && this.contador_tabla >= 12) {
                console.log("Limite de 12 detalles, credito fiscal");
                this.watch_toast('error', 'Limite de productos por factura (crédito) alcanzado.');
                return;
            }
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
            if (this.contador_tabla >= 20) {
                console.log("Limite de 20 detalles");
                this.watch_toast('error', 'Limite de productos por factura alcanzado.');
                return;
            }
            //Habian problemas con el objeto, toca hacer una copia
            const producto_copia = JSON.parse(JSON.stringify(this.producto_info));
            // Verificar que el producto no esté ya en la tabla
            const producto_ya_agregado = this.detalle_ventas_lista.find((detalle) => {
                return detalle.producto_detalle.codigo_barra_producto === producto_copia.codigo_barra_producto;
            });
            if (producto_ya_agregado) {
                // Si el producto ya está en la tabla, aumentar la cantidad a ese detalle
                producto_ya_agregado.cantidad_prod_venta++;
                return new Promise((resolve, reject) => {
                    resolve();
                });
            }
            return new Promise((resolve, reject) => {
                const detalle = {
                    id_venta: 1, //Este valor es solo para usarlo en la tabla
                    producto_detalle: producto_copia,
                    cantidad_prod_venta: 1,
                    subtotal_detalle_venta: this.producto_info.precio_producto,
                    descuentos_detalle: 0.00,
                };
                this.detalle_ventas_lista.push(detalle);
                this.producto_nombre = '';
                this.contador_tabla++;
                resolve();
            });
        },

        verificar_precios_y_ofertas(detalle) {
            return new Promise((resolve, reject) => {
                var cantidad_compra = detalle.cantidad_prod_venta;
                if (detalle.producto_detalle.ofertas_vigentes.length > 0) {
                    var ofertasOrdenadas = detalle.producto_detalle.ofertas_vigentes.sort((a, b) => a.cantidad_producto - b.cantidad_producto);
                    let ofertaCercana = ofertasOrdenadas[0];
                    if (detalle.cantidad_prod_venta < ofertaCercana.cantidad_producto) {
                        detalle.descuentos_detalle = 0;
                    } else {
                        for (let i = 0; i < ofertasOrdenadas.length; i++) {
                            if (ofertasOrdenadas[i].cantidad_producto <= cantidad_compra) {
                                ofertaCercana = ofertasOrdenadas[i];
                            } else {
                                break;
                            }
                        }
                        detalle.descuentos_detalle = ofertaCercana.monto_rebaja;
                    }
                }

                // Ordenar el array de precio_unidad_de_medida por cantidad_producto de forma ascendente
                var preciosOrdenados = detalle.producto_detalle.precio_unidad_de_medida.sort((a, b) => a.cantidad_producto - b.cantidad_producto);
                // Encontrar el objeto con cantidad_producto menor más cercana a cantidad_compra
                let precioUnidadCercano = preciosOrdenados[0]; // Por defecto, tomar el primero

                precioUnidadCercano ? console.log('Verificando precios extras...') : resolve();
                if (detalle.cantidad_prod_venta < precioUnidadCercano.cantidad_producto) {
                    detalle.producto_detalle.precio_unitario = detalle.producto_detalle.precio_unitario_original;
                    resolve();
                } else {
                    for (let i = 0; i < preciosOrdenados.length; i++) {
                        if (preciosOrdenados[i].cantidad_producto <= cantidad_compra) {
                            precioUnidadCercano = preciosOrdenados[i];
                        } else {
                            break; // Detener el bucle al encontrar el primer valor mayor
                        }
                    }
                    // Calcular el precio_producto basado en el promedio entre cantidad_producto y precio_unidad
                    detalle.producto_detalle.precio_unitario = (parseFloat(precioUnidadCercano.precio_unidad_medida_producto) / parseFloat(precioUnidadCercano.cantidad_producto)).toFixed(4);
                    console.log(detalle.producto_detalle.precio_unitario);
                    resolve();
                }
            });
        },
        //Registrar Venta y obtener el id de la venta registrada
        register_new_venta(is_domicilio) {
            if (this.detalle_ventas_lista.length === 0) {
                this.watch_toast('error', 'No se ha agregado ningún producto');
                return;
            }
            const detalles_listado_limpio = this.prepare_detalles_listado_limpio();
            if (this.active_tab === 0) {
                this.register_venta(detalles_listado_limpio, is_domicilio);
            } else if (this.active_tab === 1) {
                this.register_credito(detalles_listado_limpio, is_domicilio);
            }
        },

        prepare_detalles_listado_limpio() {
            return this.detalle_ventas_lista.map(detalle => {
                if (this.active_tab === 0) {
                    return {
                        id_venta: 1,
                        codigo_barra_producto: String(detalle.producto_detalle.codigo_barra_producto),
                        cantidad_producto: detalle.cantidad_prod_venta,
                        subtotal_detalle_venta: Number(detalle.subtotal_detalle_venta),
                        descuentos: Number(detalle.descuentos_detalle),
                    };
                } else {
                    return {
                        id_creditofiscal: 1,
                        codigo_barra_producto: String(detalle.producto_detalle.codigo_barra_producto),
                        cantidad_producto_credito: detalle.cantidad_prod_venta,
                        subtotal_detalle_credito: Number(detalle.subtotal_detalle_venta),
                        descuentos: Number(detalle.descuentos_detalle),
                    };
                }
            });
        },

        register_venta(detalles_listado_limpio, is_domicilio) {
            console.log('listado limpio:')
            console.log(detalles_listado_limpio);
            if (is_domicilio == true && this.venta_info.nombre_cliente_venta == '') {
                this.watch_toast('error', 'Ingresar el nombre del cliente para el pedido');
                return;
            }
            const datos_ventas = {
                venta: {
                    nombre_cliente_venta: this.venta_info.nombre_cliente_venta,
                    fecha_venta: this.venta_info.fecha_venta,
                    total_venta: Number(this.venta_info.total_venta),
                    total_iva: Number(this.venta_info.total_iva)
                },
                detalles: detalles_listado_limpio,
                domicilio: is_domicilio
            };

            axios.post(api_url + '/ventas/registrar/', datos_ventas)
                .then((response) => {
                    console.log(response);
                    is_domicilio ? this.watch_toast('success', 'Pedido a domicilio registrado') : this.watch_toast('success', 'Venta registrada correctamente');
                    this.limpiar_campos();

                })
                .catch(error => {
                    this.handle_error(error, 'Venta');
                });
        },

        register_credito(detalles_listado_limpio, is_domicilio) {
            if (this.cliente_info.id_cliente === 0) {
                this.watch_toast('error', 'Debe seleccionar un Cliente');
                return;
            }

            const datos_ventas = {
                credito: {
                    id_cliente: this.cliente_info.id_cliente,
                    fecha_credito: this.credito_fiscal_info.fecha_credito_fiscal,
                    total_credito: Number(this.venta_info.total_venta),
                    total_iva_credito: Number(this.venta_info.total_iva),
                },
                detalles: detalles_listado_limpio,
                domicilio: is_domicilio,
            };

            console.log('credito va?');
            console.log(is_domicilio);

            axios.post(api_url + '/creditos/registrar/', datos_ventas)
                .then((response) => {
                    console.log(response);
                    is_domicilio ? this.watch_toast('success', 'Pedido a domicilio registrado') : this.watch_toast('success', 'Crédito registrado correctamente');
                    this.limpiar_campos();
                })
                .catch(error => {
                    this.handle_error(error, 'Crédito');
                });
        },

        handle_error(error, operation) {
            this.watch_toast('error', error.response?.data.mensaje || `Ocurrió un error al registrar el ${operation}`);
            throw error;
        },

        limpiar_campos() {
            // Copia de seguridad para restaurar los valores de los campos en caso de error
            this.detalle_ventas_lista_COPIA = this.detalle_ventas_lista;
            this.cliente_info_COPIA = this.cliente_info;
            this.venta_info_COPIA = this.venta_info;
            this.credito_fiscal_info_COPIA = this.credito_fiscal_info;
            this.campo_identificador_cliente_COPIA = this.campo_identificador_cliente;
            this.contador_tabla_COPIA = this.contador_tabla;

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
            this.venta_info = {
                id_venta: 0,
                nombre_cliente_venta: "",
                fecha_venta: this.venta_info.fecha_venta,
                total_venta: 0,
                total_iva: 0,
            };
            this.credito_fiscal_info = {
                id_credito_fiscal: 0,
                id_cliente: 0,
                fecha_credito_fiscal: this.venta_info.fecha_venta,
                total_credito_fiscal: 0,
                total_iva_credito_fiscal: 0,
            };
            this.campo_identificador_cliente = "";
            this.contador_tabla = 0;

            this.departamento_cliente = "";
            this.municipio_cliente = "";

            this.asignar_fecha_actual();
        },
        restaurar_ultima_factura() {
            // Restaurar los valores de los campos en caso de error (recuperar ultima venta enviada)
            this.detalle_ventas_lista = this.detalle_ventas_lista_COPIA;
            this.cliente_info = this.cliente_info_COPIA;
            this.municipio_cliente = this.cliente_info.municipio_cliente.nombre_municipio;
            this.obtener_departamento_cliente();
            this.venta_info = this.venta_info_COPIA;
            this.credito_fiscal_info = this.credito_fiscal_info_COPIA;
            this.campo_identificador_cliente = this.campo_identificador_cliente_COPIA;
            this.contador_tabla = this.contador_tabla_COPIA;
        },
        reset_seleccion_cliente() {
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
            this.campo_identificador_cliente = "";
            this.departamento_cliente = "";
            this.municipio_cliente = "";
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
        // Modal registrar venta domicilio
        nuevo_venta_domicilio() {
            this.venta_domicilio_info = {
                id_venta_domicilio: 0,
                nombre_cliente_venta_domicilio: "",
                direccion_venta_domicilio: "",
                telefono_venta_domicilio: "",
                total_venta_domicilio: 0,
                total_iva_venta_domicilio: 0,
                fecha_venta_domicilio: this.venta_info.fecha_venta,
            };
            this.detalle_ventas_domicilio_lista = [];
            this.campo_identificador_cliente = "";
            this.contador_tabla = 1;
            this.$refs.modal_venta_domicilio.show();
        },
    }
};
</script>