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
                                    <button @click="insertarDetalleTabla()"
                                        class="font-medium text-center text-white rounded ml-4 bg-indigo-600 h-[32px] w-[100px]">
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



                                        <tr v-for="fila in detalle_ventas_lista" :key="fila.id_venta"
                                            class="border-b-2 border-black-400 h-[40px] bg-black-300">
                                            <td class="text-center">{{ fila.id_venta }}</td>
                                            <td class="text-center">{{ fila.producto_detalle.nombre_producto }}</td>
                                            <td class="text-center">
                                                <input @change="watch_cantidad_producto(fila)"
                                                    class="w-[70px] h-[25px] text-center" type="number" min="1" max="100"
                                                    v-model="fila.cantidad_prod_venta">
                                            </td>
                                            <td class="text-center">{{ fila.producto_detalle.precio_unitario }}</td>
                                            <td class="text-center">{{ fila.subtotal_detalle_venta =
                                            Number(fila.producto_detalle.precio_unitario *
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
                                <button @click="register_new_venta()"
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
                                    <input @input="buscarCodigo()" ref="codigo_bp"
                                        class="ml-4 text-slate-600 focus:outline-none focus:border focus:border-emerald-700 bg-white font-normal w-40 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                        placeholder="Codigo del Producto" v-model="producto_codigo" />
                                    <div class="sugerencias-container">
                                        <!-- Campo de entrada -->
                                        <input @input="buscarProductos()" @focus="mostrarSugerencias = true"
                                            @blur.self="mostrarSugerencias = false"
                                            class="ml-4 text-slate-600 focus:outline-none focus:border focus:border-emerald-700 bg-white font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
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
                                    <button @click="insertarDetalleTabla()"
                                        class="font-medium text-center text-white rounded ml-4 bg-emerald-600 h-[32px] w-[100px]">
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
                                        <tr v-for="fila in detalle_ventas_lista" :key="fila.id_venta"
                                            class="border-b-2 border-black-400 h-[40px] bg-black-300">
                                            <td class="text-center">{{ fila.id_venta }}</td>
                                            <td class="text-center">{{ fila.producto_detalle.nombre_producto }}</td>
                                            <td class="text-center">
                                                <input @change="watch_cantidad_producto(fila)"
                                                    class="w-[70px] h-[25px] text-center" type="number" min="1" max="100"
                                                    v-model="fila.cantidad_prod_venta">
                                            </td>
                                            <td class="text-center">{{ fila.producto_detalle.precio_unitario }}</td>
                                            <td class="text-center">{{ fila.subtotal_detalle_venta =
                                            Number(fila.producto_detalle.precio_unitario *
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

                            <div class="w-1/4 pb-24 border-l border-gray-300 pl-2 flex-shrink-0 min-w-[1/8px]">
                                <div class="flex md:flex-row flex-col items-center py-4 px-4">
                                    <!-- Input para ingresar Fecha -->
                                    <div class="flex flex-col md:mr-16">
                                        <label for="fecha_credito"
                                            class="text-black-800 text-sm font-bold leading-tight tracking-normal mb-2">
                                            Fecha de Venta
                                        </label>
                                        <input id="fecha_credito" type="date" name="fecha_credito"
                                            v-model="venta_info.fecha_venta"
                                            class="text-slate-600 focus:outline-none focus:border focus:border-emerald-700 bg-white font-normal w-36 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" />
                                    </div>
                                </div>



                                <!-- aqui iba nrc antes -->

                                <div class="flex flex-shrink-0 min-w-[8px] md:flex-row flex-col items-center py-2 px-4">
                                    <div class="flex flex-col md:mr-16">
                                        <label for="identificador_cliente_credito"
                                            class="text-black-800 text-sm font-bold leading-tight tracking-normal mb-2">
                                            Buscar Cliente existente
                                        </label>
                                        <div class="sugerencias-container">
                                            <input @input="buscarClientesIdentificador()"
                                                @focus="mostrarSugerenciasCliente = true"
                                                @blur.self="mostrarSugerenciasCliente = false"
                                                id="identificador_cliente_credito" type="text"
                                                name="identificador_cliente_credito"
                                                class="text-slate-600 focus:outline-none focus:border focus:border-emerald-700 bg-white font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                                placeholder="Ingrese el identificador"
                                                v-model="campo_identificador_cliente" />
                                            <!--Lista de sugerencias -->
                                            <ul class="sugerencias-lista w-64 ml-4 border border-slate-500"
                                                v-if="mostrarSugerenciasCliente && sugerenciasCliente.length > 0">
                                                <li class="w-64 m-2" v-for="cliente in sugerenciasCliente"
                                                    :key="cliente.distintivo_cliente"
                                                    @mousedown.prevent="seleccionarSugerenciaCliente(cliente)">
                                                    {{ cliente.distintivo_cliente }}
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="flex justify-end pt-2 content-center">
                                            <button
                                                class="bg-emerald-600 flex justify-end h-[30px] w-[165px] hover:bg-emerald-800 text-white font-bold px-2 rounded">
                                                Registrar nuevo
                                                <!-- SVG de icono para enviar -->
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400"
                                                    fill="none" viewBox="0 0 24 24" stroke="white">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                            </button>
                                        </div>


                                    </div>
                                </div>



                                <div class="flex flex-shrink-0 min-w-[8px] md:flex-row flex-col items-center py-2 px-4">
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


                                <div class="flex flex-shrink-0 min-w-[8px] md:flex-row flex-col items-center py-2 px-4">
                                    <!-- Input para ingresar nit -->
                                    <div class="flex flex-col">
                                        <label for="nit_credito"
                                            class="text-black-800 text-sm font-bold leading-tight tracking-normal mb-2">
                                            NIT
                                        </label>
                                        <input id="nit_credito" type="text" name="nit_credito" disabled
                                            class="text-slate-600 w-40 h-10 focus:outline-none focus:border focus:border-emerald-700 bg-white font-normal flex items-center pl-3 text-sm border-gray-300 rounded border"
                                            placeholder="2999-299999-299-2" v-model="cliente_info.nit_cliente" />
                                    </div>

                                    <div class="flex flex-shrink-0 min-w-[8px] md:flex-row flex-col items-center py-2 px-4">
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

                                <div class="flex flex-shrink-0 min-w-[8px] md:flex-row flex-col items-center py-2 px-4">
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
                                        <select id="departamento_cliente_credito" type="select" disabled
                                            @change="buscarInfoDepartamento()" name="departamento_cliente_credito"
                                            v-model="departamento_seleccionado"
                                            class="text-slate-600 w-40 h-10 focus:outline-none focus:border focus:border-emerald-700 bg-white font-normal flex items-center pl-3 text-sm border-gray-300 rounded border">
                                            <option disabled selected>Seleccionar</option>
                                            <option>San Salvador</option>
                                            <option>La Libertad</option>
                                            <option>Santa Ana</option>
                                            <option>Sonsonate</option>
                                            <option>Usulutan</option>
                                            <option>San Miguel</option>
                                            <option>La Unión</option>
                                            <option>La Paz</option>
                                            <option>Cuscatlán</option>
                                            <option>Chalatenango</option>
                                            <option>Cabañas</option>
                                            <option>Ahuachapán</option>
                                            <option>Morazán</option>
                                        </select>
                                    </div>
                                </div>

                                <!-- <div class="flex flex-shrink-0 min-w-[8px] md:flex-row flex-col items-center py-2 px-4">
                                    

                                </div> -->

                                <div class="flex flex-shrink-0 min-w-[8px] md:flex-row flex-col items-center py-2 px-4">
                                    <!-- Input para ingresar Direccion -->
                                    <div class="flex flex-col md:mr-16">
                                        <label for="direccion_cliente_credito"
                                            class="text-black-800 text-sm font-bold leading-tight tracking-normal mb-2">
                                            Direccion
                                        </label>
                                        <input disabled id="direccion_cliente_credito" type="text"
                                            name="direccion_cliente_credito"
                                            class="text-slate-600 focus:outline-none focus:border focus:border-emerald-700 bg-white font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                            placeholder="Joaquin Perez" v-model="cliente_info.direccion_cliente" />
                                    </div>
                                </div>


                                <div class="flex flex-shrink-0 min-w-[8px] md:flex-row flex-col items-center py-2 px-4">

                                    <!-- Input para ingresar Municipio -->
                                    <div class="flex flex-col">
                                        <label for="municipio_cliente_credito"
                                            class="text-black-800 text-sm font-bold leading-tight tracking-normal mb-2">
                                            Municipio
                                        </label>
                                        <select id="municipio_cliente_credito" type="select" disabled
                                            name="municipio_cliente_credito" v-model="cliente_info.municipio_cliente"
                                            class="text-slate-600 w-64 h-10 focus:outline-none focus:border focus:border-emerald-700 bg-white font-normal flex items-center pl-3 text-sm border-gray-300 rounded border">
                                            <option disabled selected>Seleccionar</option>
                                            <option :value="muni.id_municipio" v-for="muni in listado_municipios">
                                                {{ muni.nombre_municipio }}
                                            </option>
                                        </select>
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
                                <button @click="register_new_venta()"
                                    class="bg-emerald-600 h-[40px] hover:bg-emerald-800 text-white font-bold py-2 px-4 rounded">
                                    Guardar Venta Consumidor Final
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
import { useToast } from 'vue-toastification'

const toast = useToast();

export default {
    components: {
        NavBar,
    },
    data() {
        return {
            mensaje_toast: "Success",
            text_toast: "Todo bien todo correcto",

            //Tab activo (0 = Consumidor Final, 1 = Credito Fiscal)
            activeTab: 0,

            // Objeto Producto
            producto_info: {},
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
            //Objeto Cliente
            cliente_info: {
                id_cliente: 0,
                nombre_cliente: "",
                nit_cliente: "",
                nrc_cliente: "",
                dui_cliente: "",
                direccion_cliente: "",
                municipio_cliente: 0,
                identificador_cliente: ""
            },
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
            contadorAutoincremental: 1,

            //Subtotal de la venta
            subtotal_venta: 0.00,

            //Codigo de Lector de Barras (para buscar producto)
            codigo_barra_lector: '',
            producto_codigo: '', //Para la busqueda de productos por filtro de codigo
            timer: null, //Para el timer del lector de barras

            //Para la busqueda de productos por filtro de nombre
            productos: [], // Lista de nombres de productos completa
            sugerencias: [], // Sugerencias de productos a partir del input de busqueda
            mostrarSugerencias: false, // Mostrar o no las sugerencias

            //Para la busqueda de Clientes por filtro de identificador o distintivo
            clientes: [], // Lista de info de clientes completa
            sugerenciasCliente: [], // Sugerencias de Clientes a partir del input de busqueda
            mostrarSugerenciasCliente: false, // Mostrar o no las sugerencias de Clientes
            campo_identificador_cliente: "", // Campo de identificador de cliente
            cliente_existente: false, // Para saber si el cliente es nuevo o existente

            //Para la seleccion de Departamentos y Municipios
            departamento_seleccionado: "",
            departamento: {
                id_departamento: 0,
                nombre_departamento: "",
            },
            listado_municipios: [],
        };
    },
    created() {
        this.actualizaFecha();
        this.getListaNombresProductos();
        this.getListaNombresClientes();
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
            var codigoBarras = this.producto_codigo;
            console.log("codigo barras: " + codigoBarras);

            // Reiniciar el temporizador si existe uno en ejecución
            if (this.timer) {
                clearTimeout(this.timer);
            }

            // Establecer un nuevo temporizador para ejecutar la búsqueda después de un cierto tiempo (por ejemplo, 500 ms)
            this.timer = setTimeout(() => {
                this.codigo_barra_lector = codigoBarras;
                this.getProductoSegunCodigo();
            }, 500);
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
        // --------------------- DEPARTAMENTO ---------------------
        //Buscar departamento segun nombre
        buscarInfoDepartamento() {
            return axios
                .get(api_url + '/departamentos/buscar/' + this.departamento_seleccionado)
                .then((response) => {
                    //this.departamento_info = response.data.departamento;
                    console.log(response.data.datos.municipios);
                    //Asignar lista de municipios
                    this.listado_municipios = response.data.datos.municipios;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        // --------------------- PRODUCTOS ---------------------
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
        // --------------------- PRODUCTOS ---------------------
        // --------------------- CLIENTES ---------------------
        //Obtener lista de todos los nombres de clientes en la bdd
        getListaNombresClientes() {
            return axios
                .get(api_url + '/clientes/identificador/lista')
                .then((response) => {
                    this.clientes = response.data.datos;
                    console.log(response.data.datos);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        //Buscar el nombre del Cliente mas cercano al texto ingresado
        buscarClientesIdentificador() {
            if (this.campo_identificador_cliente) {
                this.sugerenciasCliente = this.clientes.filter((cliente) => {
                    return cliente.distintivo_cliente.toLowerCase().includes(this.campo_identificador_cliente.toLowerCase());
                });
            } else {
                this.sugerenciasCliente = [];
            }
        },
        //Seleccionar sugerencia de Clientes en buscador
        seleccionarSugerenciaCliente(sugerencia_cliente) {
            this.campo_identificador_cliente = sugerencia_cliente.distintivo_cliente;
            const id_cliente = sugerencia_cliente.id_cliente;
            this.llenarDetalleCliente(id_cliente);
            this.sugerenciasCliente = [];
        },
        llenarDetalleCliente(cliente_id) {
            var muni_id = 0;
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
                        municipio_cliente: res.data.datos.municipio.id_municipio,
                        identificador_cliente: res.data.datos.distintivo_cliente,
                    },
                        muni_id = res.data.datos.municipio.id_municipio;
                    console.log(this.cliente_info);
                })
                .then(() => {
                    this.credito_fiscal_info.id_cliente = this.cliente_info.id_cliente
                    return this.buscarInfoMunicipioCliente();
                })
                .then(() => {
                    this.cliente_info.municipio_cliente = muni_id;
                    this.cliente_existente = true;
                    console.log("Cliente pegado");
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        //Buscar municipio y departamento para el Cliente
        buscarInfoMunicipioCliente() {
            return new Promise((resolve, reject) => {
                return axios
                    .get(api_url + '/municipios/' + this.cliente_info.municipio_cliente)
                    .then((response) => {
                        this.departamento_seleccionado = response.data.datos.departamento.nombre_departamento;
                        this.buscarInfoDepartamento();
                        console.log(response.data.datos.departamento.id_departamento);
                        resolve();
                    })
                    .catch((error) => {
                        console.log(error);
                        reject(error);
                    });
            });
        },
        // --------------------- CLIENTES ---------------------
        //Buscar Producto por codigo
        getProductoSegunCodigo() {
            return axios
                .get(api_url + '/productos/' + this.codigo_barra_lector)
                .then((res) => {
                    console.log(res.data.producto);
                    this.producto_info = res.data.producto
                    this.producto_info['precio_unitario_original'] = res.data.producto.precio_unitario;
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
            this.credito_fiscal_info.fecha_credito_fiscal = moment().format('yyyy-MM-DD');
        },
        //Registrar Nueva Venta
        register_new_venta() {
            if (this.activeTab == 0) {
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
            } else if (this.activeTab == 1) {
                axios.post(api_url + '/credito_fiscals/',
                    this.credito_fiscal_info = {
                        id_cliente: this.credito_fiscal_info.id_cliente,
                        fecha_credito: this.credito_fiscal_info.fecha_credito_fiscal,
                        total_credito: this.venta_info.total_venta,
                        total_iva_credito: this.venta_info.total_iva,
                    }
                ).then((res) => {
                    this.credito_fiscal_info = res.datos;
                });
            }

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
                        this.producto_info = res.data.producto[0]
                        this.producto_info['precio_unitario_original'] = res.data.producto[0].precio_unitario;
                        console.log(res.data.producto[0].codigo_barra_producto);
                        this.producto_nombre = ''; // Limpiar el campo de búsqueda
                        //this.watch_toast("success", "Producto agregado");
                        resolve(); // Resolver la promesa
                    })
                    .catch((err) => {
                        this.watch_toast("error", "Error al agregar el producto");
                        console.log(err.response.data);
                        reject(err.response.data); // Rechazar la promesa con el mensaje de error
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
        //Observar cambios en cantidad de producto, verificar unidad de medida, y actualizar subtotal
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
        //Para asignar nuevo precio unitario al producto segun la unidad de medida
        verificar_unidad_medida(fila) {
            return new Promise((resolve, reject) => {
                resolve();
                // console.log("Verificando unidad de medida: ");
                // console.log(fila);

                // // Recorrer this.detalle_ventas_lista para encontrar el detalle correspondiente a fila_detalle_venta.id_venta
                // var detalle = this.detalle_ventas_lista.find((detalle) => detalle.id_venta === fila.id_venta);

                // var cantidad_compra = detalle.cantidad_prod_venta;

                // // Ordenar el array de precio_unidad_de_medida por cantidad_producto de forma ascendente
                // var preciosOrdenados = detalle.producto_detalle.precio_unidad_de_medida.sort((a, b) => a.cantidad_producto - b.cantidad_producto);

                // console.log(preciosOrdenados[0]);
                // // Encontrar el objeto con cantidad_producto menor más cercana a cantidad_compra
                // let precioUnidadCercano = preciosOrdenados[0]; // Por defecto, tomar el primero

                // console.log(fila.cantidad_prod_venta + '<' + precioUnidadCercano.cantidad_producto);
                // if (fila.cantidad_prod_venta < precioUnidadCercano.cantidad_producto) {
                //     console.log("El precio unitario es menor al precio de la unidad de medida");
                //     detalle.producto_detalle.precio_unitario = detalle.producto_detalle.precio_unitario_original;
                //     resolve();
                // } else {
                //     for (let i = 0; i < preciosOrdenados.length; i++) {
                //         console.log(preciosOrdenados[i].cantidad_producto + '>=' + cantidad_compra);
                //         if (preciosOrdenados[i].cantidad_producto <= cantidad_compra) {
                //             precioUnidadCercano = preciosOrdenados[i];
                //         } else {
                //             break; // Detener el bucle al encontrar el primer valor mayor
                //         }
                //     }
                //     // Calcular el precio_producto basado en el promedio entre cantidad_producto y precio_unidad
                //     detalle.producto_detalle.precio_unitario = (parseFloat(precioUnidadCercano.precio_unidad_medida_producto) / parseFloat(precioUnidadCercano.cantidad_producto)).toFixed(2);
                //     console.log(detalle.producto_detalle.precio_unitario);
                //     resolve();
                // }

            });

        },
        //Subtotal de la venta RESUMEN
        calcular_subtotalventa() {
            new Promise((resolve, reject) => {
                this.subtotal_venta = this.detalle_ventas_lista.reduce(
                    (acc, obj) => acc + Number(obj.subtotal_detalle_venta),
                    0.00
                );
                this.subtotal_venta = Number(this.subtotal_venta).toFixed(2);
                resolve();
            });
        },
        //Registrar Venta y obtener el id de la venta registrada
        register_new_venta() {
            var venta = {};
            var credito = {};
            if (this.detalle_ventas_lista.length == 0) {
                this.watch_toast('error', 'No se ha agregado ningun producto');
                return;
            }
            if (this.activeTab == 0) {
                axios.post(api_url + '/ventas/',
                    venta = {
                        nombre_cliente_venta: this.venta_info.nombre_cliente_venta,
                        fecha_venta: this.venta_info.fecha_venta,
                        total_venta: Number(this.venta_info.total_venta),
                        total_iva: Number(this.venta_info.total_iva),
                    }
                ).then((res) => {
                    console.log("el id de la venta es: " + res.data.datos);
                    return this.registrarDetalleVenta(res.data.datos);
                }).then((resp) => {
                    this.watch_toast('success', 'Venta registrada correctamente');
                    this.detalle_ventas_lista = [];
                    this.cliente_info = {
                        id_cliente: 0,
                        nombre_cliente: "",
                        nit_cliente: "",
                        nrc_cliente: "",
                        dui_cliente: "",
                        direccion_cliente: "",
                        municipio_cliente: 0,
                        identificador_cliente: ""
                    },
                        this.contadorAutoincremental = 1;
                }).catch((error) => {
                    this.watch_toast('error', 'Ocurrió un error al registrar la Venta');
                    throw error;
                });
            } else if (this.activeTab == 1) {
                if (this.cliente_info.id_cliente == 0) {
                    this.watch_toast('error', 'Debe seleccionar un Cliente');
                    return;
                }
                axios.post(api_url + '/credito_fiscals/',
                    credito = {
                        id_cliente: this.credito_fiscal_info.id_cliente,
                        fecha_credito: this.credito_fiscal_info.fecha_credito_fiscal,
                        total_credito: Number(this.venta_info.total_venta),
                        total_iva_credito: Number(this.venta_info.total_iva),
                    }
                ).then((res) => {
                    console.log("el id del credito es: " + res.data.datos);
                    return this.registrarDetalleVenta(res.data.datos);
                }).then(() => {
                    this.watch_toast('success', 'Credito registrado correctamente');
                    this.detalle_ventas_lista = [];
                    this.cliente_info = {
                        id_cliente: 0,
                        nombre_cliente: "",
                        nit_cliente: "",
                        nrc_cliente: "",
                        dui_cliente: "",
                        direccion_cliente: "",
                        municipio_cliente: 0,
                        identificador_cliente: ""
                    },
                        this.contadorAutoincremental = 1;
                }).catch((error) => {
                    this.watch_toast('error', 'Ocurrió un error al registrar el Credito');
                    throw error;
                })
            }
        },
        //Registrar Detalle de la Venta
        registrarDetalleVenta(id_venta_registrada) {
            return new Promise((resolve, reject) => {
                if (id_venta_registrada == undefined) {
                    this.watch_toast('error', 'Venta no registrada');
                    reject();
                }

                if (this.activeTab == 0) {
                    const promises = this.detalle_ventas_lista.map((detalle) => {
                        return axios.post(api_url + '/detalle_ventas/', {
                            id_venta: id_venta_registrada,
                            codigo_barra_producto: String(detalle.producto_detalle.codigo_barra_producto),
                            cantidad_producto: detalle.cantidad_prod_venta,
                            subtotal_detalle_venta: Number(detalle.subtotal_detalle_venta),
                        });
                    });

                    Promise.all(promises)
                        .then(() => {
                            console.log("Detalles de venta registrados");
                            resolve();
                        })
                        .catch((err) => {
                            console.log("aaaaaaaaaaaaaa");
                            this.delete_venta_or_credito(id_venta_registrada);
                            this.watch_toast('error', err.response.data.mensaje);
                            reject(err);
                        });
                } else if (this.activeTab == 1) {
                    const promises = this.detalle_ventas_lista.map((detalle) => {
                        return axios.post(api_url + '/detalle_creditos/', {
                            id_creditofiscal: id_venta_registrada,
                            codigo_barra_producto: String(detalle.producto_detalle.codigo_barra_producto),
                            cantidad_producto_credito: detalle.cantidad_prod_venta,
                            subtotal_detalle_credito: Number(detalle.subtotal_detalle_venta),
                        });
                    });

                    Promise.all(promises)
                        .then(() => {
                            console.log("Detalles de crédito registrados");
                            resolve();
                        })
                        .catch((err) => {
                            this.delete_venta_or_credito(id_venta_registrada);
                            this.watch_toast('error', err.response.data.mensaje);
                            reject(err);
                        });
                }
            });
        },

        //Eliminar Venta o Credito en caso de problema al registrar el detalle
        delete_venta_or_credito(id_venta) {
            if (this.activeTab == 0) {
                axios.delete(api_url + '/ventas/' + id_venta).then((res) => {
                    console.log("Venta eliminada");
                }).catch((err) => {
                    console.log("Error al eliminar la venta: " + err.response.data.mensaje);
                })
            } else if (this.activeTab == 1) {
                axios.delete(api_url + '/credito_fiscals/' + id_venta).then((res) => {
                    console.log("Credito eliminado");
                }).catch((err) => {
                    console.log("Error al eliminar el credito: " + err.response.data.mensaje);
                })
            }
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
