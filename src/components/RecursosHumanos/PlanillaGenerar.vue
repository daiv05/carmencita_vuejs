<template>
    <div class="">
      <div class="flex justify-center">
        <button @click="isOpen = true" class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-[30px] text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800" type="button">
          Generar Planilla
        </button>
        <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
          <div class="max-w-2xl w-xl p-6 bg-white rounded-md shadow-xl">
            <div class="text-center text-xl font-bold">
              <span>Generar Planilla de Pagos</span>
            </div>
            <div class="col-span-1 flex flex-col justify-center p-2">
                <label class="block text-sm font-medium leading-6 text-gray-900" for="fecha">Periodo</label>
                <div>
                  <input @input="console.log(yearMonth)" v-model="yearMonth" type="month" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 py-4">
                  <div class="col-span-1">
                    <input class="p-2 m-1" type="radio" id="q1" name="periodo" value="01" v-model="dia">
                    <label for="q1">Primer Quincena</label><br>
                  </div>
                  <div class="col-span-1">
                    <input class="p-2 m-1" type="radio" id="q2" name="periodo" value="16" v-model="dia">
                    <label for="q2">Segunda Quincena</label><br>
                  </div>
                </div>
            </div>
            <div class="flex justify-center">
              <button @click="generarPlanilla" class="bg-blue-500 hover:bg-blue-700 border-2 border-blue-500 hover:border-blue-700 text-white px-4 py-2 rounded-lg mx-1">Generar</button>
              <button @click="cerrarModal" class="bg-transparent hover:bg-slate-300 border-2 border-slate-300 text-slate-500 px-4 py-2 rounded-lg mx-1" >Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
  import axios from 'axios';
  import api_url from '../../config.js';
  import { useToast } from 'vue-toastification';

  const toast = useToast();
  const fechaActual = new Date();

  export default{
    props:{
            id:null,
            estado:null,
    },
    data() {
      return {
        fecha:new Date(),
        mensaje:null,
        dia:null,
        yearMonth:new Date(),
        error:[],
        isOpen: false,
        estatus: false,
      };
    },
    mounted(){
      this.setPeriodoActual();
    },
    methods:{
      cerrarModal(){
        this.isOpen = false;
        this.setPeriodoActual();
      },  
        setPeriodoActual(){
          if(fechaActual.getDate()<=15){
            this.dia=1;
          }else{
            this.dia=16;
          }
          let mes = Number(fechaActual.getMonth()+1);
          if(mes<10){
            mes='0'+String(mes);
          }
          this.yearMonth = fechaActual.getFullYear()+'-'+mes;
        },
        generarPlanilla(){
          this.fecha = this.yearMonth+'-'+this.dia;
          console.log(this.fecha)
          const params = {
            fecha: this.fecha
          }
            axios.post(api_url+'/planilla',params).then(
                    response => {
                        this.mensaje = response.data.mensaje,
                        this.showMessages(response.data.status,this.mensaje)
                    }
                );
           this.cerrarModal();
        },
        showMessages(tipo, mensaje){

          if (tipo) {
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
              toast.info(mensaje, {
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

}
    }
  };
  </script>