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
                    <p class="mt-2 flex-grow-0 flex-shrink-0 w-[500px] text-[31px] font-semibold text-left text-[#3056d3]">
                        Listado de Ventas
                    </p>
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



                    <!-- Contenido del las ventas para Consumidor Final -->
                    <div v-if="activeTab === 0" class="p-4 bg-white">
                        <div class="flex max-h-[400px] overflow-y-auto pb-36">


                            <div class="w-4/4 pr-4 h-full pt-4">


                                <!-- Contenido del bloque de espacio izquierdo (3/4 del espacio) -->

                                <p class="mt-2 flex-grow-0 flex-shrink-0 w-[700px] text-[20px] font-semibold text-right text-[#3056d3]">
                                  Buscar ventas
                                </p>
                                <!-- Input para buscar venta -->
                                <div id="appWrapper">
                                    <div class="container">
                                        <div class="search-box">
                                            <input 
                                            class="search-input" 
                                            type="text" name="q" 
                                            placeholder="Escriba el codigo o fecha de la venta"
                                            v-model="query"
                                            @input="buscarVentaCF">       
                                            <ul class="result-list" :class="resultsVisibility">
                                                <li v-for="venta in ventas" class="result-item">
                                                    <a href="#" class="result-link">
                                                    <div class="result-title">{{venta.id_venta}}</div>
                                                    <div class="result-content">{{venta.total_venta}}</div>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <!-- Tabla de Ventas -->
                                <div class="row">
                                    <div class="col-lg-8 offset-lg-2">
                                        <div class="table-responsive">
                                            <table class="table-fixed w-full shadow-lg">
                                                <thead>
                                                    <tr class="border-b-2 border-black-400 h-[40px] bg-slate-100">
                                                        <th class="font-bold">N°</th>
                                                        <th class="font-bold">Cod Venta</th>
                                                        <th class="font-bold">Fecha Venta</th>
                                                        <th class="font-bold">Tipo</th>
                                                        <th class="font-bold">Total Venta</th>
                                                        <th class="font-bold">Opciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody class="table-group-divider" id="contenido">
                                                    <tr v-if="cargando">
                                                        <td colspan="6"><h3>Cargando</h3></td>
                                                    </tr>
                                                    <tr v-else v-for="venta, i in ventasCF" :key="venta.id_venta" class="border-b-2 border-black-400 h-[40px] bg-black-300">
                                                        <td v-text="(i+1)" class="text-center"></td>
                                                        <td v-text="(venta.id_venta)" class="text-center"></td>
                                                        <td v-text="(venta.fecha_venta)" class="text-center"></td>
                                                        <td class="text-center">Consumidor Final</td>
                                                        <td v-text="(venta.total_venta)" class="text-center"></td>
                                                        <td class="text-center">
                                                          
                                                          <button class="text-blue-400 inline-block p-2 bg-blue-800 rounded">
                                                          <router-link :to="'/detail_sales/' + venta.id_venta" class="text-blue-500">Detalle</router-link>
                                                          </button>                                                            <button type="button" class="font-medium text-center text-white rounded ml-4 bg-red-600 h-[25px] w-[100px]" style="background-color: #555;"
                                                            @click="eleminarVentaCF(venta, id_venta)">Eliminar</button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                            </div>



                            <!-- Contenido del bloque de espacio derecho (1/4 del espacio) -->
                        </div>


                        <!-- Resumen de la Venta -->
                    </div>


                    <!-- Contenido de las ventas de credito fiscal -->
                    <div v-if="activeTab === 1" class="p-4 bg-white">
                      <div class="flex max-h-[400px] overflow-y-auto pb-36">


<div class="w-4/4 pr-4 h-full pt-4">


    <!-- Contenido del bloque de espacio izquierdo (3/4 del espacio) -->

    <p class="mt-2 flex-grow-0 flex-shrink-0 w-[700px] text-[20px] font-semibold text-right text-[#3056d3]">
      Buscar credito fiscal
    </p>
    <!-- Input para buscar venta -->
    <div id="appWrapper">
        <div class="container">
            <div class="search-box">
                <input 
                class="search-input" 
                type="text" name="qu" 
                placeholder="Escriba el NRC del cliente o la fecha de la venta"
                v-model="query"
                @input="buscarCF">       
                <ul class="result-list" :class="resultsVisibility">
                    <li v-for="venta in CF" class="result-item">
                        <a href="#" class="result-link">
                        <div class="result-title">{{venta.id_creditofiscal}}</div>
                        <div class="result-content">{{venta.total_credito}}</div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <!-- Tabla de Ventas -->
    <div class="row">
        <div class="col-lg-8 offset-lg-2">
            <div class="table-responsive">
                <table class="table-fixed w-full shadow-lg">
                    <thead>
                        <tr class="border-b-2 border-black-400 h-[40px] bg-slate-100">
                            <th class="font-bold">N°</th>
                            <th class="font-bold">NRC</th>
                            <th class="font-bold">Fecha Venta</th>
                            <th class="font-bold">Tipo</th>
                            <th class="font-bold">Total Venta</th>
                            <th class="font-bold">Opciones</th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider" id="contenido">
                        <tr v-if="cargando">
                            <td colspan="6"><h3>Cargando</h3></td>
                        </tr>
                        <tr v-else v-for="venta, i in CFSales" :key="venta.id_creditofiscal" class="border-b-2 border-black-400 h-[40px] bg-black-300">
                            <td v-text="(i+1)" class="text-center"></td>
                            <td v-text="(venta.cliente.nrc_cliente)" class="text-center"></td>
                            <td v-text="(venta.fecha_credito)" class="text-center"></td>
                            <td class="text-center">Credito Fiscal</td>
                            <td v-text="(venta.total_credito)" class="text-center"></td>
                            <td class="text-center">
                                
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

</div>



<!-- Contenido del bloque de espacio derecho (1/4 del espacio) -->
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

export default {
    components: {
        NavBar
    },
    data() {
        return {
            //Tab activo (0 = Consumidor Final, 1 = Credito Fiscal)
            activeTab: 0,
            ventasCF: null,
            cargando: false,
            query:'',
            ventasCF: [],
            CFSales: []
        };
    },
    mounted() {
        this.getVentasCF();
        this.getCF();
    },
    computed:{
      resultsVisibility(){
        return (this.query.length > 0) ? 'show' : 'hide';
      }
    },
    methods: {
        buscarVentaCF(){
        this.ventasCF = null;
        axios.post(api_url + '/ventasCF/buscar/', {
          q: this.query
        }).then(res =>{
          this.ventasCF = res.data.ventasCF;
        }).catch(err =>{
          console.log(err.response);
        })
        //console.log(this.query);
      },

      buscarCF(){
        this.CFSales = null;
        axios.post(api_url + '/creditos/buscar/', {
          q: this.query
        }).then(res =>{
          this.CFSales = res.data.CFSales;
        }).catch(err =>{
          console.log(err.response);
        })
        //console.log(this.query);
      },

      getVentasCF(){
        this.cargando = true;
        this.ventasCF = null;
        axios.get(api_url+'/ventasCF/')
        .then(res => {
          this.ventasCF = res.data.ventasCF;
          this.cargando = false;
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
          this.cargando = false;
        })
      },

      getCF(){
        this.cargando = true;
        this.CFSales = null;
        axios.get(api_url+'/creditos/')
        .then(res => {
          this.CFSales = res.data.CFSales;
          this.cargando = false;
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
          this.cargando = false;
        })
      },

      eleminarVentaCF : function(venta, id_venta){
        if (confirm("¿Está seguro que desea eliminar la venta?")) {
          axios.delete(api_url+'/ventasCF/'+venta.id_venta)
          .then(res => {
            console.log(res);
            this.ventasCF.data.splice(id_venta, 1)
            this.actualizarTabla();
            for(var i = 0; i < this.ventasCF.length; i++){
              if(this.ventasCF[i].id_venta == id_venta){
                this.ventasCF.splice(i, 1);
                break;
              }
            }
          })
          .catch(err => {
            console.log(err);
          })
        }
      },

      actualizarTabla: function(){
        this.getVentasCF();
      }
    },
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


/*Estilos del buscador*/
body{
    font-family: sans-serif;
  }

  ::-webkit-scrollbar{
    width: 10px;
  }

  ::-webkit-scrollbar-track{
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb{
    background: #888;
  }

  ::-webkit-scrollbar-thumb:hover{
    background: #555;
  }

  .container{
    padding: 30px;
  }
  .search-box{
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .search-input{
    width: 600px;
    height: 30px;
    border-radius: 10px;
    border: 0;
    background: #eeeeee;
    padding: 10px 20px;
    font-size: 18px;
    outline: none;
  }

  .result-list.show{
    position: absolute;
    width: 640px;
    max-height: 250px;
    overflow-y: auto;
    list-style: none;
    background: #fff;
    padding: 0;
    top: 40px;
    border-radius: 10px;
    box-shadow: 1px 2px 8px 0px #b5b5b5;
  }

  .result-list.hide{
    display: none;
  }

  .result-item{
    border-bottom: 1px solid #ececec;
  }

  .result-link{
    text-decoration: none;
    color: #333;
    display: block;
    padding: 10px 15px;
  }

  .result-link:hover{
    background: #f9f9f9;
  }

  .result-title{
    font-size: 20px;
    font-weight: 600;
  }

  .result-content{
    font-size: 18px;
  }
</style>