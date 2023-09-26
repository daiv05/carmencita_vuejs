<template>
    <NavBar />
    <div>
        <div class="flex bg-white mx-auto p-5 shadow-md justify-between">
            <h1 class="font-bold text-blue-700 text-xl">Gestión de Clientes</h1>
            <div class="items-center rounded-[4.44px] bg-[#637381]">
                <button id="show-modal" class="w-auto h-auto m-2 text-[13px] font-medium text-center text-white"
                    @click="showModal_addCliente = true">
                    Registrar Nuevo Cliente
                </button>
            </div>
        </div>
        <div class="flex justify-start items-center mt-4 ml-4">
            <a href="#" @click="$router.go(-1)" class="text-sm text-black font-medium flex items-center">
                <img src="../../assets/icons/arrow.svg" alt="Regresar" class="h-6 w-6 mr-1"> Regresar
            </a>
        </div>
    </div>

    <div class="m-auto p-1 pb-0 pt-4 w-4/5">
        <h2 class="font-bold text-lg mb-8">Listado de Clientes</h2>
    </div>
    <!--Controles para filtros-->
    <!-- <div class="grid grid-cols-4 p-6 pt-4 w-4/5 mx-auto">
        <div class="col-span-1 flex flex-col justify-center p-2">
            <label class="block text-sm font-medium leading-6 text-gray-900" for="estado">Estado</label>
            <div class="">
                <select v-model="estado" name="estado" id="estado"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <option disabled>Seleccione...</option>
                    <option value="asignadas">Asignadas</option>
                    <option value="no_asignadas">Sin asignar</option>
                    <option value="">Todos</option>
                </select>
            </div>
        </div>
        <div class="col-span-1 flex flex-col justify-center p-2">
            <label class="block text-sm font-medium leading-6 text-gray-900" for="tipo">Tipo</label>
            <div>
                <select v-model="tipo" name="tipo" id="tipo"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <option disabled>Seleccione...</option>
                    <option value="all">Todos</option>
                    <option value="factura">Factura</option>
                    <option value="credito">Credito Fiscal</option>
                </select>
            </div>
        </div>
        <div class="col-span-1 flex flex-col justify-center p-2">
            <label class="block text-sm font-medium leading-6 text-gray-900" for="fecha">Fecha</label>
            <div><input v-model="fecha" type="Date"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
        </div>
        <div class="col-span-1 flex justify-center align-middle">
            <button @click="filtrarPedidos" class="bg-blue-500 px-3 py-2 rounded text-slate-50 h-fit flex m-auto">Aplicar
                filtros</button>
        </div>
    </div> -->
    <!--Tabla de pedidos-->
    <div class="md:w-[85%] w-auto p-4 mx-auto bg-slate-50 shadow rounded-md overflow-auto">
        <table class="table w-full max-h-screen rounded-md">
            <thead class="border-b bg-slate-100">
                <tr class="text-center">
                    <td scope="col" class="px-6 py-4 text-xs text-gray-500 font-semibold">#</td>
                    <td scope="col" class="px-6 py-4 text-xs text-gray-500 font-semibold">IDENTIFICADOR</td>
                    <td scope="col" class="px-6 py-4 text-xs text-gray-500 font-semibold">CLIENTE</td>
                    <td scope="col" class="px-6 py-4 text-xs text-gray-500 font-semibold">DUI/NIT</td>
                    <td scope="col" class="px-6 py-4 text-xs text-gray-500 font-semibold">DIRECCIÓN</td>
                    <td scope="col" class="px-6 py-4 text-xs text-gray-500 font-semibold">NRC</td>
                    <td scope="col" class="px-6 py-4 text-xs text-gray-500 font-semibold">ESTADO</td>
                    <td scope="col" class="px-6 py-4 text-xs text-gray-500 font-semibold">ACCIONES</td>
                </tr>
            </thead>
            <tbody class="text-center">
                <tr v-for="(cliente, index) in clientes" class="border-b hover:bg-slate-100 hover:shadow">
                    <td class="whitespace-nowrap px-2 py-4">{{ index + 1 }}</td>
                    <td class="whitespace-nowrap px-4 py-4">{{ cliente.distintivo_cliente }}</td>
                    <td class="whitespace-nowrap px-4 py-4">{{ cliente.nombre_cliente }}</td>
                    <td class="whitespace-nowrap px-4 py-4">DUI: {{ cliente.dui_cliente }} <br> NIT: {{ cliente.nit_cliente }}</td>
                    <td class="whitespace-nowrap px-4 py-4">{{ cliente.direccion_cliente + ', ' + cliente.municipio.nombre_municipio + ', ' + cliente.municipio.departamento.nombre_departamento }} </td>
                    <td class="whitespace-nowrap px-4 py-4">{{ cliente.nrc_cliente }}</td>
                    <td v-if="cliente.estado_cliente == 1" class="whitespace-nowrap px-4 py-4"><p class="rounded-full bg-emerald-700 text-white font-semibold">Activo</p></td>
                    <td v-else class="whitespace-nowrap px-4 py-4"><p class="rounded-full bg-red-700 text-white font-semibold">Inactivo</p></td>


                    <!-- <td class="whitespace-nowrap px-4 py-4">${{ Number(pedido.total).toFixed(2) }}</td>
                    <td class="whitespace-nowrap px-4 py-4">{{ pedido.tipo }}</td>
                    <td v-if="pedido.hr" class="whitespace-nowrap px-4 py-4">HR-{{ pedido.hr }}</td>
                    <td v-if="pedido.tipo == 'Factura'" class="whitespace-nowrap px-4 py-4">
                        <btnConsultar :url="'/detail_sales/' + pedido.id"></btnConsultar>
                        <btnEditar :url="'/modificar_pedido/factura/' + pedido.id"></btnEditar>
                        <btnEliminar :url="'/delete_pedido/factura/' + pedido.id" :titulo="'Eliminar Pedido' + pedido.id"
                            :mensaje="'El pedido ' + pedido.id + ' se eliminara de la base de datos'" :lista="pedidos"
                            :index="index">
                        </btnEliminar>
                    </td> -->
                </tr>
            </tbody>
        </table>
        <div v-if="vacio" class="flex justify-center py-6 m-auto">
            <span class="text-slate-500">No se encontraron pedidos </span>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import API_URL from '../../config';
import NavBar from '@/components/NavBar.vue';
import '../../assets/modal_default.css'
export default {
    name: 'ClientesList',
    data() {
        return {
            clientes: []
        }
    },
    components: {
        NavBar
    },
    created() {
        this.getClientes()
    },
    methods: {
        getClientes() {
            axios.get(API_URL + '/clientes')
                .then(res => {
                    this.clientes = res.data.datos;
                })
                .catch(err => {
                    console.log(err)
                })
        },
        // eliminarCliente(id) {
        //     axios.delete(`http://localhost:3000/clientes/${id}`)
        //         .then(res => {
        //             this.getClientes()
        //         })
        //         .catch(err => {
        //             console.log(err)
        //         })
        // }
    }
}

</script>