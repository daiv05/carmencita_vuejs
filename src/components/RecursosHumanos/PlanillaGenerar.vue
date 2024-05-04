<template>
  <div class="my-4">
    <div class="flex justify-center">
      <button @click="isOpen = true"
        class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-[30px] text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
        type="button">
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
              <input v-model="yearMonth" type="month" @input="inputFecha()" 
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 py-4">
              <div class="col-span-1">
                <input v-model="dia" @input="inputFecha()" class="p-2 m-1" type="radio" id="q1" name="periodo" value="01" >
                <label for="q1">Primer Quincena</label><br>
              </div>
              <div class="col-span-1">
                <input v-model="dia" @input="inputFecha()" class="p-2 m-1" type="radio" id="q2" name="periodo" value="16" >
                <label for="q2">Segunda Quincena</label><br>
              </div>
            </div>
          </div>
          <div class="flex justify-center">
            <button @click="generarPlanilla" v-bind:disabled="isfechaPosterior" v-bind:class="{'bg-slate-400 cursor-not-allowed':isfechaPosterior, 'bg-blue-500 hover:bg-blue-700 border-2 border-blue-500 hover:border-blue-700 text-white ':!isfechaPosterior }"
              class="px-4 py-2 rounded-lg mx-1">Generar</button>
            <button @click="cerrarModal"
              class="bg-transparent hover:bg-slate-300 border-2 border-slate-300 text-slate-500 px-4 py-2 rounded-lg mx-1">Cancelar</button>
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

export default {
  props: {
    id: null,
    estado: null,
  },
  data() {
    return {
      fecha: new Date(),
      isfechaPosterior: false,
      mensaje: null,
      dia: null,
      yearMonth: new Date(),
      error: [],
      isOpen: false,
      estatus: false,
    };
  },
  mounted() {
    this.setPeriodoActual();
    //this.inputFecha();
  },
  methods: {
    cerrarModal() {
      this.isOpen = false;
      //this.setPeriodoActual();
    },
    inputFecha(){
      setTimeout(() => {
        this.fecha = this.yearMonth+'-'+this.dia;
        this.verificarFecha();
      }, 5);
    },
    verificarFecha(){
      let hoy = new Date()
      let fechaEspecificada = new Date(this.fecha);
      //a la fecha especificada le asignamos el fin de periodo
      if(fechaEspecificada.getUTCDate()==1){
        fechaEspecificada = new Date(this.yearMonth+'-15')
      }else{
        let ultimoDiaMes = new Date(fechaEspecificada.getUTCFullYear(),fechaEspecificada.getUTCMonth()+1, 0).getDate();
        fechaEspecificada = new Date(this.yearMonth+'-'+ultimoDiaMes);
      }

      if(fechaEspecificada >= hoy){
        this.isfechaPosterior = true;
      }else{
        this.isfechaPosterior = false;
      }

    },
    setPeriodoActual() {
      let mes = Number(fechaActual.getUTCMonth() + 1);
      if (fechaActual.getUTCDate() <= 15) {
        this.dia = 16;
        mes = Number(fechaActual.getUTCMonth(fechaActual.setUTCMonth(fechaActual.getUTCMonth() - 1)) + 1);
      } else {
        this.dia = '01';
      }

      if (mes < 10) {
        mes = '0' + String(mes);
      }
      this.yearMonth = fechaActual.getUTCFullYear() + '-' + mes;
      this.fecha = this.yearMonth + '-' + this.dia;
    },
    generarPlanilla() {
      this.fecha = this.yearMonth + '-' + this.dia;
      console.log(this.fecha)
      const params = {
        fecha: this.fecha
      }
      axios.post(api_url + '/planilla', params).then(
        response => {
          this.mensaje = response.data.mensaje,
          this.showMessages(response.data.status, this.mensaje)
          this.$router.push('/historial_planillas')
          //this.$router.go(0);
        }
      );
      this.cerrarModal();
    },
    showMessages(tipo, mensaje) {

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
          timeout: 3600,
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