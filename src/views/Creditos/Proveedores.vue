<template>
    <NavBar />
    <div class="mb-8">
        <div>
            <div class="flex bg-white mx-auto p-5 shadow-md justify-between">
                <h1 class="font-bold text-blue-700 text-xl">Gestión de Proveedores</h1>
                <div class="items-center rounded-[4.44px] bg-[#637381]">
                    <button id="show-modal" class="w-auto h-auto m-2 text-[13px] font-medium text-center text-white"
                        @click="show_modal_agregar = true">
                        Registrar Nuevo Proveedor
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
            <h2 class="font-bold text-lg mb-8">Listado de Proveedores</h2>
        </div>
        <div class="md:w-[90%] w-auto p-4 mx-auto bg-slate-50 shadow rounded-md overflow-auto">
            <table v-if="proveedores" class="table w-full max-h-screen rounded-md">
                <thead class="border-b bg-slate-100">
                    <tr class="text-center">
                        <td scope="col" class="px-6 py-4 text-xs text-gray-500 font-semibold">#</td>
                        <td scope="col" class="px-6 py-4 text-xs text-gray-500 font-semibold">PROVEEDOR</td>
                        <td scope="col" class="px-6 py-4 text-xs text-gray-500 font-semibold">NIT</td>
                        <td scope="col" class="px-6 py-4 text-xs text-gray-500 font-semibold">NRC</td>
                        <td scope="col" class="px-6 py-4 text-xs text-gray-500 font-semibold">ESTADO</td>
                        <td scope="col" class="px-6 py-4 text-xs text-gray-500 font-semibold">ACCIONES</td>
                    </tr>
                </thead>
                <tbody class="text-center">
                    <tr v-for="(proveedor, index) in proveedores" class="border-b hover:bg-slate-100 hover:shadow">
                        <td class="whitespace-nowrap px-2 py-4">{{ index + 1 }}</td>
                        <td class="whitespace-nowrap px-4 py-4">{{ proveedor.nombre_proveedor }}</td>
                        <td class="whitespace-nowrap px-4 py-4">{{ proveedor.nit_pr }}</td>
                        <td class="whitespace-nowrap px-4 py-4">{{ proveedor.nrc_pr }}</td>
                        <td v-if="proveedor.estado_pr == 1" class="whitespace-nowrap px-4 py-4">
                            <p class="rounded-full bg-emerald-700 text-white px-1 py-1 font-semibold">Activo</p>
                        </td>
                        <td v-else class="whitespace-nowrap px-4 py-4">
                            <p class="rounded-full bg-red-700 text-white px-2 py-1 font-semibold">Inactivo</p>
                        </td>
                        <td class="whitespace-nowrap px-4 py-4">
                            <button @click="modal_editar_proveedor(proveedor)"
                                class="text-sm bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full m-1">Editar</button>
                            <button @click="modal_estado_proveedor(proveedor)" v-if="proveedor.estado_pr == 1"
                                class="text-sm bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded-full m-1">Desactivar</button>
                            <button @click="modal_estado_proveedor(proveedor)" v-else
                                class="text-sm bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded-full m-1">Activar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-else class="flex justify-center py-6 m-auto">
                <span class="text-slate-500">No se encontraron proveedores </span>
            </div>
        </div>
    </div>


    <Teleport to="body">
        <ModalAgregarProveedor :show="show_modal_agregar" @close="getproveedores(); show_modal_agregar = false;">
        </ModalAgregarProveedor>
    </Teleport>
    <Teleport to="body">
        <ModalModificarProveedor :show="show_modal_modificar" :proveedor="proveedor_seleccionado"
            @close="getproveedores(); show_modal_modificar = false;">
        </ModalModificarProveedor>
    </Teleport>
    <Teleport to="body">
        <ProveedorDesactivar :show="show_modal_estado" :proveedor="proveedor_seleccionado"
            @close="getproveedores(); show_modal_estado = false;">
        </ProveedorDesactivar>
    </Teleport>
</template>

<script>
import axios from 'axios';
import API_URL from '../../config';
import NavBar from '../../components/NavBar.vue';
import ModalAgregarProveedor from '@/components/Credito/ModalAgregarProveedor.vue';
import ModalModificarProveedor from '@/components/Credito/ModalModificarProveedor.vue';
import ProveedorDesactivar from '@/components/Credito/ProveedorDesactivar.vue';
import '../../assets/modal_default.css'
export default {
    name: 'ProveedoresList',
    data() {
        return {
            proveedores: [],
            show_modal_agregar: false,
            show_modal_modificar: false,
            show_modal_estado: false,
            proveedor_seleccionado: null,
        }
    },
    components: {
        NavBar,
        ModalAgregarProveedor,
        ModalModificarProveedor,
        ProveedorDesactivar
    },
    created() {
        this.getproveedores()
    },
    methods: {
        getproveedores() {
            axios.get(API_URL + '/proveedor')
                .then(res => {
                    this.proveedores = res.data.data;
                })
                .catch(err => {
                    console.log(err)
                })
        },
        modal_editar_proveedor(proveedor) {
            this.proveedor_seleccionado = proveedor;
            this.show_modal_modificar = true;
        },
        modal_estado_proveedor(proveedor) {
            this.proveedor_seleccionado = proveedor;
            this.show_modal_estado = true;
        },
    }
}

</script>