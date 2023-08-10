<script setup>
import NavBar from '../../components/NavBar.vue'
import empleadoForm from '../../components/RecursosHumanos/EmpleadoForm.vue'
import api_url from '../../config.js'
</script>

<template>
<main>
    <NavBar></NavBar>
    <div class="bg-slate-100 pb-2">
    <div class = "bg-white w-full mx-auto p-5 shadow-md">
        <h1 class="font-bold text-blue-700 text-2xl " >Gestión de Pedidos a Domicilio</h1>
    </div>

        <div class="container m-auto p-1 pb-0 pt-4 w-4/5">
            <h2 class="font-bold text-lg">Crear  Hoja de Ruta</h2>
        </div>
        
        <!--datos de la hoja de ruta-->
        <Form>
            <div class="container grid lg:grid-cols-6 rounded-md m-auto p-6 pt-4 w-4/5 bg-white">
                <div class="lg:col-span-1">
                    <div>
                        <label for="fecha_entrega" class="block text-sm font-medium leading-6 text-gray-900">Fecha de entrega</label>
                        <div class="mt-2">
                            <Field @input="actualizarPedidos" v-model="hoja_de_ruta.fecha_entrega" name="fecha_entrega" id="fecha_entrega" type="Date"  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            <ErrorMessage name="fecha_entrega" class="text-red-500 text-xs"/>
                        </div>
                    </div>
                    <div>
                        <label for="repartidor" class="block text-sm font-medium leading-6 text-gray-900">Repartidor</label>
                        <div class="mt-2">
                            <Field as="select" required name="repartidor" id="sexo" v-model="hoja_de_ruta.id_empleado" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                <option value="" selected>Seleccionar...</option>
                                <option v-for="repartidor in empleados" :key="repartidor.id_empleado" :value="repartidor.id_empleado">{{ repartidor.primer_nombre}}</option>
                            </Field>
                            <ErrorMessage name="repartidor" class="text-red-500"/>
                        </div>
                    </div>
                    <div>
                        <label for="total" class="block text-sm font-medium leading-6 text-gray-900">Total</label>
                        <div class="mt-2">
                            <Field name="total" id="total" v-model="hoja_de_ruta.total" type="number" disabled class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" />
                            <ErrorMessage name="total" class="text-red-500"/>
                        </div>
                    </div>
                    <div class="p-4">
                        <div class="w-full grid justify-items-center">
                            <button @click="showModal" type="button" class="btn bg-green-500 hover:bg-green-600 py-2 px-4 rounded text-white">Agregar Pedidos</button>
                        </div>
                    </div>
                </div>
                <div class="p-4 lg:col-span-5 overflow-scroll">
                    <table class="w-full max-h-screen shadow rounded-md">
                        <thead class="border-b bg-slate-100">
                            <tr class="text-center">
                                <td scope="col" class="px-6 py-4 text-xs text-gray-500 font-semibold">CODIGO</td>
                                <td scope="col" class="px-6 py-4 text-xs text-gray-500 font-semibold">CLIENTE</td>
                                <td scope="col" class="px-6 py-4 text-xs text-gray-500 font-semibold">TOTAL</td>
                                <td scope="col" class="px-6 py-4 text-xs text-gray-500 font-semibold">TIPO</td>
                                <td scope="col" class="px-6 py-4 text-xs text-gray-500 font-semibold">ACCIÓN</td>
                            </tr>
                        </thead>
                        <tbody class="text-center">
                            <tr v-for="pedido in pedidos_factura" class="border-b ">
                                <td class="whitespace-nowrap px-6 py-4">{{ pedido.id_venta }}</td>
                                <td class="whitespace-nowrap px-6 py-4">{{ pedido.nombre_cliente_venta }}</td>
                                <td class="whitespace-nowrap px-6 py-4">{{ pedido.total_venta }}</td>
                                <td class="whitespace-nowrap px-6 py-4">Factura</td>
                                <td class="whitespace-nowrap px-6 py-4">
                                    <button class="bg-transparent hover:bg-blue-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded-full m-1">ver</button>
                                    <button type="button" @click="quitarFacturasDomicilio(pedido.id_venta)" class="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded-full m-1">Quitar</button>
                                </td>
                            </tr>
                            <tr v-for="pedido in pedidos_fiscal" class="border-b ">
                                <td class="whitespace-nowrap px-6 py-4">{{ pedido.id_creditofiscal }}</td>
                                <td class="whitespace-nowrap px-6 py-4">{{ pedido.id_cliente }}</td>
                                <td class="whitespace-nowrap px-6 py-4">{{ pedido.total_credito }}</td>
                                <td class="whitespace-nowrap px-6 py-4">Credito Fiscal</td>
                                <td class="whitespace-nowrap px-6 py-4">
                                    <button class="bg-transparent hover:bg-blue-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded-full m-1">ver</button>
                                    <button type="button" @click="quitarCreditoFiscalDomicilio(pedido.id_credito)" class="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded-full m-1">Quitar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="w-min-full flex items-center justify-center col-span-1 lg:col-span-6">
                    <button class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mx-2">Cancelar</button>
                    <button @click="saveHojaDeRuta" type="button" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mx-2">Guardar</button>
                </div>
            </div>
        </Form>
        <!--Modal de lista de pedidos-->
        <div v-if="isShowModal" class="h-screen w-screen" id="backgroud-modal" style="position:fixed; top:0; background-color:rgba(0,0,0,0.3);display: flex; align-items: center; justify-content: center;">
            <div class="w-11/12 md:w-10/12 mx-auto my-2 rounded-lg bg-slate-50" id="card">
                <div class="p-4 flex items-center text-lg">
                <h2>Lista de pedidos {{ fechaFormateada }}</h2>
                </div>
                <div class="overflow-y-scroll max-h-3/12" id="body" style="max-height: 70vh;">
                    <table class="min-w-full">
                        <thead class="border-b bg-slate-100">
                            <tr class="text-center">
                                <td scope="col" class="px-6 py-4 text-xs text-gray-500 font-semibold">CODIGO</td>
                                <td scope="col" class="px-6 py-4 text-xs text-gray-500 font-semibold">CLIENTE</td>
                                <td scope="col" class="px-6 py-4 text-xs text-gray-500 font-semibold">TOTAL</td>
                                <td scope="col" class="px-6 py-4 text-xs text-gray-500 font-semibold">TIPO</td>
                                <td scope="col" class="px-6 py-4 text-xs text-gray-500 font-semibold">ACCIÓN</td>
                            </tr>
                        </thead>
                        <tbody class="text-center">
                            <tr v-for="pedido in facturas" class="border-b ">
                                <td class="whitespace-nowrap px-6 py-4">{{ pedido.id_venta }}</td>
                                <td class="whitespace-nowrap px-6 py-4">{{ pedido.nombre_cliente_venta }}</td>
                                <td class="whitespace-nowrap px-6 py-4">{{ pedido.total_venta }}</td>
                                <td class="whitespace-nowrap px-6 py-4">Factura</td>
                                <td class="whitespace-nowrap px-6 py-4">
                                    <button class="mx-1 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded-full">ver</button>
                                    <button type="button" @click="addFacturasDomicilio(pedido.id_venta)" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full">agregar</button>
                                </td>
                            </tr>
                            <tr v-for="pedido in creditosFiscales" class="border-b ">
                                <td class="whitespace-nowrap px-6 py-4">{{ pedido.id_creditofiscal }}</td>
                                <td class="whitespace-nowrap px-6 py-4">{{ pedido.id_cliente }}</td>
                                <td class="whitespace-nowrap px-6 py-4">{{ pedido.total_credito }}</td>
                                <td class="whitespace-nowrap px-6 py-4">Credito Fiscal</td>
                                <td class="whitespace-nowrap px-6 py-4">
                                    <button class="mx-1 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded-full">ver</button>
                                    <button type=" mx-1 button" @click="addCreditoFiscalDomicilio(pedido.id_creditofiscal)" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full">agregar</button>
                                </td>    
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="p-4" id="footer">
                    <div class="flex justify-between">
                        
                        <button @click="closeModal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Aceptar
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!--modal de mensajes-->
        <div v-if="isShowMessages" class="h-screen w-screen" id="backgroud-modal" style="position:fixed; top:0; background-color:rgba(0,0,0,0.3);display: flex; align-items: center; justify-content: center;">
            <div class="w-9/12 max-w-sm mx-auto my-2 rounded-lg bg-slate-50" id="card">
                <div class="p-4 flex items-center text-lg text-center justify-center">
                    <div v-if="!typeMessages">
                        <span class="text-red-400 my-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-12 h-12">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                            </svg>
                        </span>
                    </div>
                    <div v-if="typeMessages">
                        <span class="text-green-400 my-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </span>
                    </div>
                </div>
                <div class="overflow-y-scroll max-h-3/12 p-4" id="body" style="max-height: 70vh;">
                    <ul class="text-center">
                        <li v-for="message in messages">{{ message }}</li>
                    </ul>
                </div>
                <div class="p-4" id="footer">
                    <div class="flex justify-center">
                        <button @click="closeMessages" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Aceptar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

</template>

<script>
import axios from 'axios';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { defineRule } from 'vee-validate';
import { useRoute } from 'vue-router';
import { Modal } from 'flowbite-vue'
import { ref } from 'vue'
import moment from 'moment';

//Para el modal
const isShowModal = ref(false)
const isShowMessages = ref(false)

function showMessages(){
    isShowMessages.value = true;
}
function closeMessages(){
    isShowMessages.value = false;
}

function closeModal() {
  isShowModal.value = false
}
function showModal() {
  isShowModal.value = true
}
//

export default {
  data() {
    return {
        fechaFormateada:null,
        hoja_de_ruta:{
            fecha_entrega:"",
            id_empleado:"",
            total:0
        },
        pedidos_factura:[],
        pedidos_fiscal:[],
        empleados:null,
        facturas:null,
        creditosFiscales:null,
        messages:[],
        typeMessages:null,
    }
  }, 
  mounted(){
    this.getRepartidores();
    this.setFechaActual();
    this.getCreditosFiscales();
    this.getFacturas();
  },
  methods:{
    setFechaActual(){
        const date = moment().format('yyyy-MM-DD')
        this.fechaFormateada = date;
        this.hoja_de_ruta.fecha_entrega = date;
    },  
    getRepartidores(){
        axios.get(api_url+'/empleados')
        .then(
        response => (
        this.empleados = response.data.data
        ));
    },
    getCreditosFiscales(){
        let params = {
            fecha: this.hoja_de_ruta.fecha_entrega
        }
        axios.post(api_url+'/creditos_fiscales_domicilio',params)
        .then(
            response => (
                this.creditosFiscales = response.data.creditos
            )
        );
    },
    getFacturas(){
        let params = {
            fecha: this.hoja_de_ruta.fecha_entrega
        }
        axios.post(api_url+'/facturas_domicilio',params)
        .then(
            response => (
                this.facturas = response.data.facturas
            )
        );
    },
    actualizarPedidos(){
        //Para actualizar la lista de pedidos al cambiar la fecha de la hr
        this.getFacturas();
        this.getCreditosFiscales();
        this.pedidos_factura = [];
        this.pedidos_fiscal = [];
        this.calcularTotal();
    },
    addFacturasDomicilio(id){
        let pedido = this.facturas.find((factura)=>factura.id_venta == id);
        let index = this.facturas.indexOf(pedido);
        this.facturas.splice(index,1);
        this.pedidos_factura.push(pedido);
        this.calcularTotal();
    },
    quitarFacturasDomicilio(id){
        let pedido = this.pedidos_factura.find((factura)=>factura.id_venta == id);
        let index = this.pedidos_factura.indexOf(pedido);
        this.pedidos_factura.splice(index,1);
        this.facturas.push(pedido);
        this.calcularTotal();
    },
    addCreditoFiscalDomicilio(id){
        let pedido = this.creditosFiscales.find((fiscal)=>fiscal.id_creditofiscal == id);
        let index = this.creditosFiscales.indexOf(pedido);
        this.creditosFiscales.splice(index,1);
        this.pedidos_fiscal.push(pedido);
        this.calcularTotal();
    },
    quitarCreditoFiscalDomicilio(id){
        let pedido = this.pedidos_fiscal.find((factura)=>factura.id_venta == id);
        let index = this.pedidos_fiscal.indexOf(pedido);
        this.pedidos_fiscal.splice(index,1);
        this.creditosFiscales.push(pedido);
        this.calcularTotal();
    },
    calcularTotal(){
        let sumaFacturas = 0;
        let sumaCreditosFiscales = 0;
        
        this.pedidos_factura.forEach(pedido => {
            sumaFacturas += Number(pedido.total_venta);
        });

        this.pedidos_fiscal.forEach(pedido => {
            sumaCreditosFiscales +=  Number(pedido.total_credito);
        });

        this.hoja_de_ruta.total = sumaFacturas + sumaCreditosFiscales;
    },
    clearData(){
        this.pedidos_factura = [];
        this.pedidos_fiscal = [];
        this.actualizarPedidos();
    },
    saveHojaDeRuta(){
        const params = {
            hoja_de_ruta: this.hoja_de_ruta,
            pedidos_factura:this.pedidos_factura,
            pedidos_fiscal:this.pedidos_fiscal
        };
        console.log(params)

        axios.post(api_url+'/hoja_de_ruta',params)
        .then(
            response =>{
                this.messages = response.data['mensaje'];
                this.typeMessages = response.data['respuesta'];
                console.log(this.messages);
                showMessages();
                this.clearData();
            }
        );
    }

  }
}

</script>