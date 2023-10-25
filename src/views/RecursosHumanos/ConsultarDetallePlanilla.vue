<template>
    <main>
        <Navbar></Navbar>
        <div
        class="flex justify-between px-16 w-full bg-white"
        style="
          box-shadow: 0px 1.11px 3.329166889190674px 0 rgba(0, 0, 0, 0.1),
            0px 1.11px 2.219444513320923px 0 rgba(0, 0, 0, 0.06);
        "
      >
        <p
          class="mt-2 flex-grow-0 flex-shrink-0 w-[80%] text-[30px] font-semibold text-left text-[#3056d3]"
        >
          Gestion Empleados
        </p>
      </div>

      <div>
        <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 z-999 fixed top-20" role="alert" v-if="listaErrores"
        v-for="error in listaErrores">
            <span class="font-medium">Error:</span> {{error}}
        </div>
        <table class="w-[90%] m-auto">
        <tr v-if="listaDetallesPlanilla">
            <th colspan="6" v-if="listaDetallesPlanilla.detalles_planilla">
                <p class="font-bold text-xl">Tienda y Depósito Carmencita</p>
                <p class="text-lg">{{  obtenerFechaFormateada(listaDetallesPlanilla.fecha_inicio,listaDetallesPlanilla.fecha_fin) }}</p>
                <p class="text-center text-lg"> {{obtenerAnioFecha(listaDetallesPlanilla.fecha_fin)}} </p>
            </th>
        </tr>
      <tr class="text-gray-400 bg-gray-50 border-b">
        <th class="p-[1%] font-semibold">NOMBRE EMPLEADO</th>
        <th class="p-[1%] font-semibold">DIAS LABORADOS</th>
        <th class="p-[1%] font-semibold">SUELDO BASE</th>
        <th class="p-[1%] font-semibold">SEGURO SOCIAL 3%</th>
        <th class="p-[1%] font-semibold">AFP 7.25%</th>
        <th class="p-[1%] font-semibold">TOTAL A PAGAR</th>
      </tr>
      <tbody>
        <tr 
          v-for="detallePlanilla in listaDetallesPlanilla.detalles_planilla"
          :key="detallePlanilla.id"
          class="border-b"
        >
          <td class="text-center p-[1%]">{{ detallePlanilla.empleado.primer_nombre }}</td>
          <td class="text-center p-[1%]">
            {{ detallePlanilla.dias_laborados }}
          </td>
          <td class="text-center p-[1%]">{{ detallePlanilla.base }}</td>
          <td class="text-center p-[1%]">{{ detallePlanilla.monto_isss }}</td>
          <td class="text-center p-[1%]">{{ detallePlanilla.monto_afp }}</td>
          <td class="text-center p-[1%]">{{ detallePlanilla.monto_pago }}</td>
        </tr>
      </tbody>
    </table>
            
      </div>
    </main>

</template>
<script>
import Navbar from '../../components/NavBar.vue';
import axios from 'axios';
import moment from 'moment';

export default {

    components:{
        Navbar
    },
    data(){
        return{
            listaDetallesPlanilla:[],
            listaErrores:null
        }
    },
    created(){
        moment.defineLocale('es-sv', {
  months: [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ],
  monthsShort: [
    'ene', 'feb', 'mar', 'abr', 'may', 'jun',
    'jul', 'ago', 'sep', 'oct', 'nov', 'dic'
  ],
  weekdays: [
    'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'
  ],
  weekdaysShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
  weekdaysMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
});
moment.locale("es-sv");
        this.cargarDetallesPlanillas();
    },
    methods:{
        cargarDetallesPlanillas(){
            axios.get('/api/obtener_detalles_planilla/'+this.$route.params.idPlanilla)
            .then((response)=>{
                this.listaDetallesPlanilla = response.data;
            })
            .catch(
                (response)=>{
                    this.listaErrores = [];
                    console.log(response);
                    if(response.response.status === 500){
                    this.listaErrores.push("El servidor no respondio. Pongase en contacto con el proveedor");
                    setTimeout(()=>{
                        this.listaErrores = [];
                    },6000);
            }
                }
            );
        },
        obtenerFechaFormateada(fechaInicio,fechaFin){
            return "Del "+moment(fechaInicio).format("DD [de] MMMM")+" al "+moment(fechaFin).format("DD [de] MMMM");
        },
        obtenerAnioFecha(fechaFin){
            return moment(fechaFin).format("YYYY");
        }
    },


}

</script>
