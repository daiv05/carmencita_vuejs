<script setup>
import { CalendarIcon, CheckCircleIcon } from '@heroicons/vue/24/outline';
</script>
<template>
    <main>
        <NavBar></NavBar>
        <div class="bg-slate-100 pb-4">
            <div>
                <div class="flex bg-white mx-auto p-5 shadow-md justify-between">
                    <h1 class="font-bold text-blue-700 text-xl">Gestión de Creditos</h1>
                    <div class="flex items-center rounded-[4.44px] bg-[#637381]">
                        <router-link to="/ventas_inventarios/registrar_credito_proveedor"
                            class="w-auto h-auto m-2 text-[13px] font-medium text-center text-white">
                            Abono
                        </router-link>
                    </div>
                </div>
                <div class="flex justify-start items-center mt-4 ml-4">
                    <a href="#" @click="$router.go(-1)" class="text-sm text-black font-medium flex items-center">
                        <img src="../../assets/icons/arrow.svg" alt="Regresar" class="h-6 w-6 mr-1"> Regresar
                    </a>
                </div>
            </div>
            <div class="flex m-auto p-1 pb-0 pt-4 mb-2 w-4/5 items-center">
                <CheckCircleIcon v-if="credito.pendiente == 0" class="text-green-500 w-5 h-5 m-1"/>
                <h2 class="font-bold text-lg">Credito {{ credito.id }} - {{ credito.proveedor.nombre_proveedor }} </h2>
                <span v-if="credito.pendiente == 0" class="font-bold text-lg mx-2">(Pagado)</span>
                <span v-if="credito.pendiente > 0" class="font-bold text-lg mx-2">(Pendiente)</span>
            </div>
            <!--CARD DATOS DEL CREDITO-->
            <div class="md:w-[85%] w-auto p-4 mx-auto bg-slate-50 shadow rounded-md overflow-auto">
                <div class="grid grid-cols-1 md:grid-cols-8">
                    <div class="col-span-3">
                        <div class="mb-4 font-semibold">
                            Fecha de registro:
                            <div class="flex border border-slate-300 rounded w-10/12 px-2 py-1">
                                <CalendarIcon class="m-0 h-5 w-5 font-bold"/> {{ formatFecha(credito.fecha_credito) }}
                            </div>
                        </div>
                        <div class="mb-4 font-semibold">
                            Fecha maxima de pago:
                            <div class="flex border border-slate-300 rounded w-10/12 px-2 py-1">
                                <CalendarIcon class="m-0 h-5 w-5 font-bold"/> {{ formatFecha(credito.fecha_limite_pago) }}
                            </div>
                        </div>
                        <div class="mb-4 font-semibold">
                            Credito inicial:
                            <div class="border border-slate-300 rounded w-10/12 px-2 py-1">
                                $ {{ Number(credito.monto_credito).toFixed(2) }}
                            </div>
                        </div>
                        <div class="mb-4 font-semibold">
                            Saldo pendiente:
                            <div class="border border-slate-300 rounded w-10/12 px-2 py-1">
                                $ {{ Number(credito.pendiente).toFixed(2) }}
                            </div>
                        </div>

                    </div>
                    <div class="col-span-5 mx-2">
                        <div class="m-0 mb-4">
                            <span class="text-lg font-semibold">Detalle (En concepto de)</span>
                            <div class="m-0 shadow p-2">
                                <p class="text-gray-500 font-semibold">
                                    {{ credito.detalle_credito }}
                                </p>
                            </div>
                        </div>
                        <div class="m-0 mb-4">
                            <span class="text-lg font-semibold">Abonos Registrados</span>
                            <div class="m-0 shadow p-2 rounded">
                                <table v-if="credito.abonos.length > 0" class="table w-full rounded">
                                    <thead class="border-b bg-slate-100 rounded-t-md text-center">
                                        <tr>
                                            <td scope="col" class="px-6 py-4 text-xs text-gray-500 font-semibold">N</td>
                                            <td scope="col" class="px-6 py-4 text-xs text-gray-500 font-semibold">TOTAL ABONADO</td>
                                            <td scope="col" class="px-6 py-4 text-xs text-gray-500 font-semibold">FECHA</td>
                                        </tr>
                                    </thead>
                                    <tbody class="text-center">
                                        <tr v-for="(abono,index) in credito.abonos" class="border-b hover:bg-slate-100 hover:shadow">
                                            <td class="whitespace-nowrap px-2 py-4">{{ index+1 }}</td>
                                            <td class="whitespace-nowrap px-2 py-4">${{ abono.monto }}</td>
                                            <td class="whitespace-nowrap ">{{ formatFecha(abono.fecha) }}</td>
                                        </tr>
                                        <tr>
                                            <td class="px-2 py-4 font-semibold" colspan="3">Total abonado: $ {{ Number(getTotalAbonado()).toFixed(2) }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <span v-if="credito.abonos.length == 0" class="text-md text-slate-400">No se han registrado abonos para este crédito</span>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="mb-4 mt-1 flex items-center justify-center">
                    <AbonoAgregar :credito="credito" :stilo="'green'"></AbonoAgregar>
                </div>
            </div>
        </div>

    </main>
</template>

<script>
import NavBar from '../../components/NavBar.vue'
import btnAgregarAbono from '../../components/Credito/AbonoAgregar.vue'
import axios from 'axios';
import API_URL from '../../config';
import { useRoute } from 'vue-router';
import moment from 'moment';
import AbonoAgregar from '../../components/Credito/AbonoAgregar.vue';


export default {
    data() {
        return {
            id_credito: null,
            credito: {
                abonos:[],
                proveedor: {}
            },
            abonos: []
        };
    },
    mounted() {
        const router = useRoute();
        this.id_credito = router.params.id;
        this.getCredito();
    },
    methods: {
        formatFecha(fecha) {
            return moment(fecha).format('DD/MM/yyyy');
        },
        getCredito() {
            axios.get(API_URL + '/credito_proveedor/' + this.id_credito).then(response => {
                this.credito = response.data.credito;
                this.getTotalAbonado();
            });
        },
        getTotalAbonado(){
            if(this.credito.abonos.length > 0){
                
                return this.credito.monto_credito - this.credito.pendiente;
            }else{
                return 0;
            }
        }
    },
    components: { AbonoAgregar }
}

</script>