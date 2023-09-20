<script setup>
import NavBar from "../../components/NavBar.vue";

const agregar_producto = "agregar_producto";
//const editar_producto = "/editar_producto/:id_producto";

</script>

<template>
    
    <main>
        <!--  NavBar component  -->
        <NavBar />

        <!-- Encabezado -->
        <div class="w-full h-[60px]">
            <div class="flex justify-between px-16 w-full h-[60px] absolute left-0 bg-white"
                style="box-shadow: 0px 1.11px 3.329166889190674px 0 rgba(0,0,0,0.1), 0px 1.11px 2.219444513320923px 0 rgba(0,0,0,0.06);">
                <p class="mt-2 flex-grow-0 flex-shrink-0 w-[80%] text-[30px] font-semibold text-left text-[#3056d3]">
                    Informe de Productos por Vencer
                </p>
                <div
                    class="flex items-center mt-4 flex-grow-0 flex-shrink-0 h-[31px] py-[16px] rounded-[4.44px] bg-[#637381]">
                </div>
            </div>
        </div>       

        <section class="container mx-auto p-6 z-900">

            <div class="grid grid-cols-1 sm:grid-cols-6">

                                
                <!-- Apartado para Listado de Productos  -->

                <section class="grid-cols-1 sm:col-span-5">           
                    <section class="container mx-auto p-6 z-900">
                        <p class="mt-2 flex-grow-0 flex-shrink-0 w-[80%] text-[20px] font-semibold text-left text-[#727171]">
                                    Los productos mostrados vencen en los proximos 15 dias a partir de la fecha actual
                                </p>
                                <br>
                        <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                            <div class="w-full overflow-x-auto">
                                
                                
                                <table class="table-fixed w-full shadow-lg">
                                                <thead>
                                                    <tr class="border-b-2 border-black-400 h-[40px] bg-slate-100">
                                                        <th class="font-bold">N°</th>
                                                        <th class="font-bold">Codigo de Barra</th>
                                                        <th class="font-bold">Producto</th>
                                                        <th class="font-bold">Fecha de Ingreso</th>
                                                        <th class="font-bold">Fecha de Vencimiento</th>
                                                        <th class="font-bold">Cantidad disponible</th>
                                                    </tr>
                                                </thead>
                                                <tbody class="table-group-divider" id="contenido">
                                                    <tr v-if="cargando">
                                                        <td colspan="6"><h3>Cargando</h3></td>
                                                    </tr>
                                                    <tr v-else v-for="lote, i in productosPV" :key="lote.id_lote" class="border-b-2 border-black-400 h-[40px] bg-black-300">
                                                        <td v-text="(i+1)" class="text-center"></td>
                                                        <td v-text="(lote.codigo_barra_producto)" class="text-center"></td>
                                                        <td v-text="(lote.producto.nombre_producto)" class="text-center"></td>
                                                        <td v-text="formatearFechas(lote.fecha_ingreso)" class="text-center"></td>
                                                        <td v-text="formatearFechas(lote.fecha_vencimiento)" class="text-center"></td>
                                                        <td v-text="(lote.cantidad)" class="text-center"></td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                
                            </div>
                        </div>
                    </section>

                </section>

            </div>

            <!--Apartado para paginacion-->
            <div class="">

            </div>


        </section>

    </main>
</template>

<script>
//Importar axios
import axios from 'axios';
import api_url from '../../config.js';
import moment from 'moment'


export default {
    components: {
        NavBar
    },
    data() {
        return {
            cargando: false,
            query:'',
            productosPV: [],
        };
    },
    mounted() {
        this.getProductosPV();
    },
    computed:{
      resultsVisibility(){
        return (this.query.length > 0) ? 'show' : 'hide';
      }
    },
    methods: {
      getProductosPV(){
        this.cargando = true;
        this.productosPV = null;
        axios.get(api_url+'/productosXVenecer/')
        .then(res => {
          this.productosPV = res.data.productosPV;
          this.cargando = false;
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
          this.cargando = false;
        })
      },

      actualizarTabla: function(){
        this.getProductosPV();
      },

      formatearFechas(fecha) {
      return moment(fecha).format('DD/MM/YYYY')
      },
    },
};
</script>

<style scoped>

    .pageActivate{
    font-weight:900;
    color : #000;
    }

</style>