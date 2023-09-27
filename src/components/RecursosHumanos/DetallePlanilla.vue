<template>
    <div class="modal-mask" @click="cerrarModal()">
       <div class="h-[70%] p-[5%] max-w-[100%] mx-auto lg:max-w-[90%] bg-white p-3 rounded-md shadow-md z-999 fixed top-[15%] left-0 right-0 modal-content">
        <table class="w-[100%]">
        <tr>
            <th colspan="6">
                <p class="font-bold text-xl">Tienda y Depósito Carmencita</p>
                <p class="text-lg">Del 01 de mayo al 15 de mayo</p>
                <p class="text-center text-lg"> 2023 </p>
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
    </div>
</template>
<script>
import axios from 'axios'

export default {
    props:{
        idPlanilla:Number
    },
    data(){
        return{
            listaDetallesPlanilla:[]
        }
    },
    created(){
      this.cargarDetallesPlanillas();
    },
    mounted(){
  
    },
    methods:{
        imprimirMensaje(){
            alert("hola mundo");
        },
        cargarDetallesPlanillas(){
            axios.get('/api/obtener_detalles_planilla/'+this.idPlanilla)
            .then((response)=>{
                this.listaDetallesPlanilla = response.data;
            })
            .catch(
                (response)=>{
                    console.log("Ocurrio un error");
                    console.log(response);
                }
            );
        },
        cerrarModal(){
            this.$emit("cerrarModal");
        }
    }

}
</script>
<style scoped>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    transition: opacity 0.3s ease;
}
.modal-content{
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  border-radius: 10px;
  transition: all 0.3s ease;
}
</style>