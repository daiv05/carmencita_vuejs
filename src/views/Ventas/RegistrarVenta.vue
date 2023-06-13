<script setup>
import NavBar from '@/components/NavBar.vue'
</script>

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
                    <div class="tab" :class="{ 'active': activeTab === 0 }" @click="activeTab = 0">
                        Consumidor Final
                    </div>
                    <div class="tab" :class="{ 'active': activeTab === 1 }" @click="activeTab = 1">
                        Crédito Fiscal
                    </div>
                </div>


                <!-- Contenido de los tabs -->

                <div class="tab-content flex-grow">



                    <!-- Contenido del formulario para Consumidor Final -->
                    <div v-if="activeTab === 0" class="p-4 bg-white">
                        <div class="flex max-h-[400px] overflow-y-auto pb-36">


                            <div class="w-3/4 pr-4 h-full pt-4">


                                <!-- Contenido del bloque de espacio izquierdo (3/4 del espacio) -->

                                <!-- Input para ingresar Producto -->
                                <div class="flex justify-start items-center pb-6">
                                    <label class="text-base font-bold">
                                        Producto
                                    </label>
                                    <input @input="buscarCodigo()" ref="codigo_bp"
                                        class="ml-4 text-slate-600 focus:outline-none focus:border focus:border-indigo-700 bg-white font-normal w-40 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                        placeholder="Codigo del Producto" v-model="producto_codigo" />
                                    <div class="sugerencias-container">
                                        <!-- Campo de entrada -->
                                        <input @input="buscarProductos()" @focus="mostrarSugerencias = true"
                                            @blur.self="mostrarSugerencias = false"
                                            class="ml-4 text-slate-600 focus:outline-none focus:border focus:border-indigo-700 bg-white font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                            placeholder="Nombre del Producto" v-model="producto_nombre" />

                                        <!-- Lista de sugerencias -->
                                        <ul class="sugerencias-lista w-64 ml-4 border border-slate-500"
                                            v-if="mostrarSugerencias && sugerencias.length > 0">
                                            <li class="w-64 m-2" v-for="sugerencia in sugerencias" :key="sugerencia.id"
                                                @mousedown.prevent="seleccionarSugerencia(sugerencia)">
                                                {{ sugerencia }}
                                            </li>
                                        </ul>
                                    </div>
                                    <!-- <input @keydown.enter.prevent="insertarDetalleTabla()"
                                        class="ml-4 text-slate-600 focus:outline-none focus:border focus:border-indigo-700 bg-white font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                        placeholder="Nombre del Producto" v-model="producto_nombre"
                                        @input="buscarProductos"> -->
                                    <button @click="insertarDetalleTabla()"
                                        class="font-medium text-center text-white rounded ml-4 bg-indigo-600 h-[32px] w-[100px]">
                                        Agregar
                                    </button>
                                </div>
                                <!-- Lista de sugerencias de productos
                                <ul v-if="sugerencias.length > 0" class="border border-gray-300 rounded mt-2 p-2">
                                    <li v-for="sugerencia in sugerencias" :key="sugerencia.id"
                                        @click="seleccionarSugerencia(sugerencia)">
                                        {{ sugerencia }}
                                    </li>
                                </ul> -->

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
                                        <tr v-for="fila in detalle_ventas_lista" :key="fila.id_venta"
                                            class="border-b-2 border-black-400 h-[40px] bg-black-300">
                                            <td class="text-center">{{ fila.id_venta }}</td>
                                            <td class="text-center">{{ fila.producto_detalle.nombre_producto }}</td>
                                            <td class="text-center">
                                                <input @change="calcular_subtotalventa()"
                                                    class="w-[70px] h-[25px] text-center" type="number" min="1" max="100"
                                                    v-model="fila.cantidad_prod_venta">
                                            </td>
                                            <td class="text-center">{{ fila.producto_detalle.precio_producto }}</td>
                                            <td class="text-center">{{ fila.subtotal_detalle_venta =
                                            Number(fila.producto_detalle.precio_producto *
                                                fila.cantidad_prod_venta).toFixed(2) }}</td>
                                            <td class="flex justify-end pr-4 py-2">
                                                <button @click="eliminarDetalleVenta(fila.id_venta)"
                                                    class="font-medium text-center text-white rounded ml-4 bg-red-600 h-[25px] w-[25px]">
                                                    X
                                                </button>
                                            </td>
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
                                        <input id="fecha_venta" type="date" name="fecha_venta"
                                            v-model="venta_info.fecha_venta"
                                            class="text-slate-600 focus:outline-none focus:border focus:border-indigo-700 bg-white font-normal w-36 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" />
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
                                            placeholder="Joaquin Perez" v-model="venta_info.nombre_cliente_venta" />
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
                                    <tr class="h-[40px] bg-black-300">
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
                                                    placeholder="0.00" disabled v-model="descuentos_venta">
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
                                                    placeholder="0.00" disabled v-model="venta_info.total_venta">
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <div class="flex justify-center py-4 px-4 pt-24 pl-36">
                                <button @click="registrarNuevaVenta()"
                                    class="bg-indigo-700 h-[40px] hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded">
                                    Guardar Venta Consumidor Final
                                </button>
                            </div>
                        </div>
                    </div>































                    <!-- Contenido del formulario para Crédito Fiscal -->
                    <div v-if="activeTab === 1" class="p-4 bg-white">
                        <div class="flex max-h-[800px] overflow-y-auto">


                            <div class="w-3/4 pr-4 h-full pt-4">


                                <!-- Contenido del bloque de espacio izquierdo (3/4 del espacio) -->

                                <!-- Input para ingresar Producto -->
                                <div class="flex justify-start items-center pb-6">
                                    <label class="text-base font-bold">
                                        Producto
                                    </label>
                                    <input
                                        class="ml-4 text-slate-600 focus:outline-none focus:border focus:border-indigo-700 bg-white font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                        placeholder="Nombre del Producto">
                                    <button
                                        class="font-medium text-center text-white rounded ml-4 hover:bg-[#11A983] h-[32px] w-[100px] bg-[#13C296]">
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
                                        <tr class="border-b-2 border-black-400 h-[40px] bg-black-300">
                                            <td class="text-center">1</td>
                                            <td class="text-center">Coca Cola 1 Litro</td>
                                            <td class="text-center">
                                                <input class="w-[70px] h-[25px] text-center" type="number" min="1" max="100"
                                                    value="1">
                                            </td>
                                            <td class="text-center">1.50</td>
                                            <td class="text-center">5.00</td>
                                            <td class="flex justify-end pr-4 py-2">
                                                <button
                                                    class="font-medium text-center text-white rounded ml-4 bg-red-600 h-[25px] w-[25px]">
                                                    X
                                                </button>
                                            </td>
                                        </tr>
                                        <tr class="border-b-2 border-black-400 h-[40px] bg-black-300">
                                            <td class="text-center">2</td>
                                            <td class="text-center">Camisa Polo XL</td>
                                            <td class="text-center">
                                                <input class="w-[70px] h-[25px] text-center" type="number" min="1" max="100"
                                                    value="1">
                                            </td>
                                            <td class="text-center">20.30</td>
                                            <td class="text-center">20.30</td>
                                            <td class="flex justify-end pr-4 py-2">
                                                <button
                                                    class="font-medium text-center text-white rounded ml-4 bg-red-600 h-[25px] w-[25px]">
                                                    X
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>



                            <!-- Contenido del bloque de espacio derecho (1/4 del espacio) -->

                            <div class="w-1/4 pb-24 border-l border-gray-300 pl-2 flex-shrink-0 min-w-[1/8px]">
                                <div class="flex md:flex-row flex-col items-center py-4 px-4">
                                    <!-- Input para ingresar Fecha -->
                                    <div class="flex flex-col md:mr-16">
                                        <label for="fecha_credito"
                                            class="text-black-800 text-sm font-bold leading-tight tracking-normal mb-2">
                                            Fecha de Venta
                                        </label>
                                        <input id="fecha_credito" type="date" name="fecha_credito"
                                            class="text-slate-600 focus:outline-none focus:border focus:border-indigo-700 bg-white font-normal w-36 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" />
                                    </div>
                                </div>


                                <!-- aqui iba nrc antes -->

                                <div class="flex flex-shrink-0 min-w-[8px] md:flex-row flex-col items-center py-2 px-4">
                                    <!-- Input para ingresar Cliente -->
                                    <div class="flex flex-col md:mr-16">
                                        <label for="nombre_cliente_credito"
                                            class="text-black-800 text-sm font-bold leading-tight tracking-normal mb-2">
                                            Cliente
                                        </label>
                                        <input id="nombre_cliente_credito" type="text" name="nombre_cliente_credito"
                                            class="text-slate-600 focus:outline-none focus:border focus:border-indigo-700 bg-white font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                            placeholder="Joaquin Perez" />
                                    </div>
                                </div>

                                <div class="flex flex-shrink-0 min-w-[8px] md:flex-row flex-col items-center py-2 px-4">
                                    <!-- Input para ingresar nit -->
                                    <div class="flex flex-col">
                                        <label for="nit_credito"
                                            class="text-black-800 text-sm font-bold leading-tight tracking-normal mb-2">
                                            NIT
                                        </label>
                                        <input id="nit_credito" type="text" name="nit_credito"
                                            class="text-slate-600 w-40 h-10 focus:outline-none focus:border focus:border-indigo-700 bg-white font-normal flex items-center pl-3 text-sm border-gray-300 rounded border"
                                            placeholder="2999-299999-299-2" />
                                    </div>

                                    <div class="flex flex-shrink-0 min-w-[8px] md:flex-row flex-col items-center py-2 px-4">
                                        <!-- Input para ingresar nrc -->
                                        <div class="flex flex-col">
                                            <label for="nrc_credito"
                                                class="text-black-800 text-sm font-bold leading-tight tracking-normal mb-2">
                                                NRC
                                            </label>
                                            <input id="nrc_credito" type="text" name="nrc_credito"
                                                class="text-slate-600  w-[93px] h-10 focus:outline-none focus:border focus:border-indigo-700 bg-white font-normal flex items-center pl-3 text-sm border-gray-300 rounded border"
                                                placeholder="299999-9" />
                                        </div>
                                    </div>

                                </div>

                                <div class="flex flex-shrink-0 min-w-[8px] md:flex-row flex-col items-center py-2 px-4">
                                    <!-- Input para ingresar dui -->
                                    <div class="flex flex-col mr-4">
                                        <label for="dui_credito"
                                            class="text-black-800 text-sm font-bold leading-tight tracking-normal mb-2">
                                            DUI
                                        </label>
                                        <input id="dui_credito" type="text" name="dui_credito"
                                            class="text-slate-600 w-28 h-10 focus:outline-none focus:border focus:border-indigo-700 bg-white font-normal flex items-center pl-3 text-sm border-gray-300 rounded border"
                                            placeholder="29999999-9" />
                                    </div>
                                    <!-- Input para ingresar depa -->
                                    <div class="flex flex-col">
                                        <label for="departamento_cliente_credito"
                                            class="text-black-800 text-sm font-bold leading-tight tracking-normal mb-2">
                                            Departamento
                                        </label>
                                        <select id="departamento_cliente_credito" type="select"
                                            name="departamento_cliente_credito"
                                            class="text-slate-600 w-40 h-10 focus:outline-none focus:border focus:border-indigo-700 bg-white font-normal flex items-center pl-3 text-sm border-gray-300 rounded border">
                                            <option disabled selected>Seleccionar</option>
                                            <option value="1">San Salvador</option>
                                            <option value="2">La Libertad</option>
                                            <option value="3">Santa Ana</option>
                                            <option value="4">Sonsonate</option>
                                            <option value="5">Usulutan</option>
                                            <option value="6">San Miguel</option>
                                            <option value="7">La Union</option>
                                            <option value="8">La Paz</option>
                                            <option value="9">Cuscatlan</option>
                                            <option value="10">Chalatenango</option>
                                            <option value="11">Cabañas</option>
                                            <option value="12">Ahuachapan</option>
                                            <option value="13">Morazan</option>
                                        </select>
                                    </div>
                                </div>

                                <!-- <div class="flex flex-shrink-0 min-w-[8px] md:flex-row flex-col items-center py-2 px-4">
                                    

                                </div> -->

                                <div class="flex flex-shrink-0 min-w-[8px] md:flex-row flex-col items-center py-2 px-4">
                                    <!-- Input para ingresar Cliente -->
                                    <div class="flex flex-col md:mr-16">
                                        <label for="direccion_cliente_credito"
                                            class="text-black-800 text-sm font-bold leading-tight tracking-normal mb-2">
                                            Direccion
                                        </label>
                                        <input id="direccion_cliente_credito" type="text" name="direccion_cliente_credito"
                                            class="text-slate-600 focus:outline-none focus:border focus:border-indigo-700 bg-white font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                            placeholder="Joaquin Perez" />
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
                                                    placeholder="0.00" disabled>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr class="h-[40px] bg-black-300">
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
                                                    placeholder="0.00" disabled>
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
                                                    placeholder="0.00" disabled>
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
                                                    placeholder="0.00" disabled>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <div class="flex justify-center py-4 px-4 pt-24 pl-36">
                                <button
                                    class="bg-[#13C296] h-[40px] hover:bg-[#11A983] text-white font-bold py-2 px-4 rounded">
                                    Guardar Venta Credito Fiscal
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
//Importar axios
import axios from 'axios';
import api_url from '../../config.js';
import moment from 'moment';

export default {
    components: {
        NavBar
    },
    data() {
        return {
            //Tab activo (0 = Consumidor Final, 1 = Credito Fiscal)
            activeTab: 0,
            // Objeto Producto
            producto_info: {
                codigo_barra_producto: '',
                nombre_producto: '',
                precio_producto: 0,
            },
            // Listado de Detalles (para tabla) y objeto Detalle
            detalle_ventas_lista: [],
            detalle_venta: {
                id_venta: 0,
                producto_detalle: [],
                cantidad_prod_venta: 0,
                subtotal_detalle_venta: 0.00,
            },
            //Objeto Venta
            venta_info: {
                id_venta: 0,
                nombre_cliente_venta: "",
                fecha_venta: null,
                total_venta: 0,
                total_iva: 0,
            },
            //Producto busqueda por nombre
            producto_nombre: '',
            //Contador Autoincremental para la tabla Detalle
            contadorAutoincremental: 1,
            //Subtotal de la venta
            subtotal_venta: 0.00,

            //Codigo de Lector de Barras (para buscar producto)
            codigo_barra_lector: '',
            producto_codigo: '', //Para la busqueda de productos por filtro de codigo

            //Para la busqueda de productos por filtro de nombre
            productos: [], // Lista de nombres de productos completa
            sugerencias: [], // Sugerencias de productos a partir del input de busqueda
            mostrarSugerencias: false, // Mostrar o no las sugerencias
        };
    },
    created() {
        this.actualizaFecha();
        this.getListaNombresProductos();
    },
    mounted() {
        document.addEventListener('keydown', this.redirigirEntrada);
    },
    watch: {
        //Calculos en cada cambio de detalle de venta
        detalle_ventas_lista: {
            handler() {
                //Calcular subtotal
                this.subtotal_venta = 0;
                this.detalle_ventas_lista.forEach((detalle) => {
                    this.subtotal_venta += Number(detalle.subtotal_detalle_venta);
                });
                this.subtotal_venta = Number(this.subtotal_venta).toFixed(2);

                //Calcular total impuestos
                this.venta_info.total_iva = 0;
                this.venta_info.total_iva = Number(this.subtotal_venta * 0.13).toFixed(2);

                //Calcular total venta
                this.venta_info.total_venta = 0;
                this.venta_info.total_venta = Number(this.subtotal_venta * 1.13).toFixed(2);
            },
            deep: true,
        },
    },
    methods: {
        redirigirEntrada() {
            if (!(document.activeElement.tagName == "INPUT")) {
                // No hay ningún campo activo, enfocar al input de busqueda por codigo
                this.$refs.codigo_bp.focus(); // Enfoca el campo deseado
            }
        },
        buscarCodigo() {
            const codigoBarras = this.producto_codigo;
            if (codigoBarras.length > 11 && codigoBarras.length <= 13) {
                console.log("codigo barras: " + codigoBarras);
                this.codigo_barra_lector = codigoBarras;
                this.getProductoSegunCodigo();
            }
        },

        //Eliminar detalle de venta de la tabla
        eliminarDetalleVenta(index) {
            console.log("index: " + index);
            if (this.detalle_ventas_lista.length === 1) {
                // Si solo queda un detalle, restablecer los valores en lugar de eliminarlo
                this.detalle_ventas_lista = []
                this.contadorAutoincremental = 1;
            } else {
                this.detalle_ventas_lista.splice(index - 1, 1); //Index-1 porque el index empieza en 1
                this.contadorAutoincremental = 1;
                // Actualizar el contador de los detalles restantes
                for (let i = 0; i < this.detalle_ventas_lista.length; i++) {
                    this.detalle_ventas_lista[i].id_venta = this.contadorAutoincremental++;
                }
            }
        },
        //Obtener lista de todos los nombres de productos en la bdd
        getListaNombresProductos() {
            return axios
                .get(api_url + '/productos/nombres/lista')
                .then((response) => {
                    this.productos = response.data.nombres_productos;
                    console.log("nombreees: " + response.data.nombres_productos);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        //Buscar el nombre del producto mas cercano al texto ingresado
        buscarProductos() {
            if (this.producto_nombre && this.mostrarSugerencias) {
                this.sugerencias = this.productos.filter((producto) => {
                    return producto.toLowerCase().includes(this.producto_nombre.toLowerCase());
                });
            } else {
                this.sugerencias = [];
            }
        },
        //Seleccionar sugerencia de producto en buscador
        seleccionarSugerencia(sugerencia) {
            this.producto_nombre = sugerencia;
            this.insertarDetalleTabla();
            this.sugerencias = [];
        },
        //Manejar el evento pegar del lector de codigo de barras
        handlePaste(event) {
            // Obtener el texto pegado
            navigator.clipboard.readText()
                .then((pastedText) => {
                    // Establecer el valor en la propiedad codigoBarras
                    this.codigo_barra_lector = pastedText;

                    // Ejecutar el método agregarProducto()
                    this.getProductoSegunCodigo();
                })
                .catch((error) => {
                    console.log('Error al leer el portapapeles:', error);
                });
        },
        //Buscar Producto por codigo
        getProductoSegunCodigo() {
            return axios
                .get(api_url + '/productos/' + this.codigo_barra_lector)
                .then((res) => {
                    console.log(res.data.producto);
                    this.producto_info.codigo_barra_producto = res.data.producto.codigo_barra_producto;
                    this.producto_info.nombre_producto = res.data.producto.nombre_producto;
                    this.producto_info.precio_producto = res.data.producto.precio_unitario;
                    console.log(this.producto_info + "producto pegado");
                    return this.addDetalleVenta();
                })
                .then(() => {
                    console.log("Agregado a la tabla");
                    this.producto_codigo = '';
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        //Actualizar Fecha automaticamente
        actualizaFecha() {
            this.venta_info.fecha_venta = moment().format('yyyy-MM-DD');
        },
        //Registrar Nueva Venta
        registrarNuevaVenta() {
            axios.post(api_url + '/ventas/',
                this.venta_info = {
                    nombre_cliente_venta: '',
                    fecha_venta: this.venta_info.fecha_venta,
                    total_venta: this.subtotal_venta,
                    total_iva: this.venta_info.total_iva,
                }
            ).then((res) => {
                this.venta_info = res.datos;
            });
        },
        //Anadir registro en tabla DETALLE
        insertarDetalleTabla() {
            this.getProductoSegunNombre()
                .then(() => {
                    return this.addDetalleVenta();
                })
                .then(() => {
                    console.log("Todo bien todo correcto")
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        //Buscar Producto por Nombre
        getProductoSegunNombre() {
            return new Promise((resolve, reject) => {
                // Verificar que el campo no esté vacío
                if (!this.producto_nombre) {
                    console.log('Campo vacío');
                    reject('Campo vacío');
                    return;
                }
                axios.get(api_url + '/productos/buscar/' + this.producto_nombre)
                    .then((res) => {
                        this.producto_info.codigo_barra_producto = res.data.producto[0].codigo_barra_producto;
                        this.producto_info.nombre_producto = res.data.producto[0].nombre_producto;
                        this.producto_info.precio_producto = res.data.producto[0].precio_unitario;
                        console.log(res.data.producto[0].codigo_barra_producto);
                        this.producto_nombre = ''; // Limpiar el campo de búsqueda
                        resolve(); // Resolver la promesa
                    })
                    .catch((err) => {
                        console.log(err.response.data.mensaje);
                        reject(err.response.data.mensaje); // Rechazar la promesa con el mensaje de error
                    });
            });
        },

        //Metodos de Detalles
        addDetalleVenta() {
            return new Promise((resolve, reject) => {
                //Habian problemas con el objeto, toca hacer una copia
                const productoCopia = JSON.parse(JSON.stringify(this.producto_info));
                const detalle = {
                    id_venta: this.contadorAutoincremental, //Este valor es solo para usarlo en la tabla
                    producto_detalle: productoCopia,
                    cantidad_prod_venta: 1,
                    subtotal_detalle_venta: this.producto_info.precio_producto,
                };
                this.detalle_ventas_lista.push(detalle);
                this.producto_nombre = ''; // Limpiar el campo de búsqueda
                this.contadorAutoincremental++; // Incrementar el valor del contador
                resolve(); // Resolver la promesa
            });
        },
        //Subtotal de la venta RESUMEN
        calcular_subtotalventa() {
            this.subtotal_venta = this.detalle_ventas_lista.reduce(
                (acc, obj) => acc + Number(obj.subtotal_detalle_venta),
                0.00
            );
            this.subtotal_venta = Number(this.subtotal_venta).toFixed(2);
        },
        //Registrar Venta y obtener el id de la venta registrada
        registrarNuevaVenta() {
            var venta = {};
            //Primero se registra la venta, luego se obtiene el id de la venta registrada
            axios.post(api_url + '/ventas/',
                venta = {
                    nombre_cliente_venta: this.venta_info.nombre_cliente_venta,
                    fecha_venta: this.venta_info.fecha_venta,
                    total_venta: Number(this.venta_info.total_venta),
                    total_iva: Number(this.venta_info.total_iva),
                }
            ).then((res) => {
                console.log("el id de la venta es: " + res.data.datos);
                this.registrarDetalleVenta(res.data.datos);
            });
        },
        //Registrar Detalle de la Venta
        registrarDetalleVenta(id_venta_registrada) {
            this.detalle_ventas_lista.forEach((detalle) => {
                axios.post(api_url + '/detalle_ventas/',
                    detalle = {
                        id_venta: id_venta_registrada,
                        codigo_barra_producto: String(detalle.producto_detalle.codigo_barra_producto),
                        cantidad_producto: detalle.cantidad_prod_venta,
                        subtotal_detalle_venta: Number(detalle.subtotal_detalle_venta),
                    }
                ).then((res) => {
                    console.log("Detalle registrado");
                    this.detalle_ventas_lista = [];
                    this.contadorAutoincremental = 1;
                });
            });
        },
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
