<template>
  <main class="relative"> 
    
    <div class="w-full h-[60px]">
      <div
        class="flex justify-between px-16 w-full h-[60px] absolute left-0 bg-white"
        style="
          box-shadow: 0px 1.11px 3.329166889190674px 0 rgba(0, 0, 0, 0.1),
            0px 1.11px 2.219444513320923px 0 rgba(0, 0, 0, 0.06);
        "
      >
        <p
          class="mt-2 flex-grow-0 flex-shrink-0 w-[80%] text-[30px] font-semibold text-left text-[#3056d3]"
        >
          Informe de ventas totales
        </p>
      </div>
    </div>

    <div class="grid grid-cols-6 gap-4 w-[45%] ml-[10%] mt-[4%]">
      <div v-for="mes in opcionesFiltroMeses" :key="mes.mes">
        <input
          type="checkbox"
          class="inline-block rounded-[3px]"
          :id="mes.mes"
          v-model="mes.estaActivo"
        />
        <label :for="mes.mes" class="inline-block ml-[10px]">{{ mes.mes }}</label>
      </div>
      <!-- <div class="flex justify-between align-center">
            <div v-for="mes in opcionesFiltroSegundoSemestre" :key="mes.mes">
                <input type="checkbox" class="inline-block rounded-[3px]" :id="mes.mes" v-model="mes.estaActivo">
                <label :for="mes.mes" class="inline-block">{{ mes.mes }}</label>
            </div>
        </div> -->
    </div>
    <div class="absolute left-[81.5%] bottom-[70%]"> 
      <button type="button" class="text-white bg-indigo-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      @click="obtenerDatosFiltrados">Aplicar</button>
    </div>
    <div class="absolute left-[81.5%] bottom-[62%]">
      <select name="filtroAnio" id="filtroAnio" class="border-slate-300 rounded text-slate-400 bg-slate-50"
      v-model="fechaFiltro">
        <option v-for="anio in datosAniosFiltros" :value="anio" :key="anio">{{ anio }}</option>
      </select>
    </div>
    <div class="w-[80%] col-span-6 m-auto border mt-[1%]">
        <apexchart width="100%" height="250%" type="bar" :options="chartOptions" :series="series"></apexchart>
    </div>
  </main>
</template>
<script>

import axios from 'axios';
export default {
  mounted(){
    this.obtenerFechasFiltro();
  },
  data() {
    return {
      opcionesFiltroMeses: [
        { mes: 'ene', estaActivo: false ,numMes:1},
        { mes: 'feb', estaActivo: false ,numMes:2},
        { mes: 'mar', estaActivo: false ,numMes:3},
        { mes: 'abr', estaActivo: false ,numMes:4},
        { mes: 'may', estaActivo: false ,numMes:5},
        { mes: 'jun', estaActivo: false ,numMes:6},
        { mes: 'jul', estaActivo: false ,numMes:7},
        { mes: 'ago', estaActivo: false ,numMes:8},
        { mes: 'sep', estaActivo: false ,numMes:9},
        { mes: 'oct', estaActivo: false ,numMes:10},
        { mes: 'nov', estaActivo: false ,numMes:11},
        { mes: 'dic', estaActivo: false ,numMes:12},
      ],
      fechaFiltro:new Date().getFullYear(),
      datosAniosFiltros:[],
      chartOptions: {
        chart: {
          id: 'vuechart-example',
          stackType: "100%",
        },
        xaxis: {
          categories: [
          'ene',
          'feb',
          'mar',
          'abr',
          'may',
          'jun',
          'jul',
          'ago',
          'sep',
          'oct',
          'nov',
          'dic',]
        },
        colors: "#13C296",
        plotOptions: {
          bar: {
            columnWidth: "20%", // Cambia este valor para ajustar el ancho de las barras
          }, 
        }
      },
      series: [
        {
          name: 'series-1',
          data: [30, 40, 35, 50, 49, 60, 70, 91]
        }
      ]
    }
  },
  methods:{
    obtenerFechasFiltro(){
      axios.get("/api/fechas_filtro")
      .then(
        (response)=>{
          this.datosAniosFiltros = response.data.lista_fechas_filtro;
        }
      )
      .catch(
        (response)=>{
          alert(response.response.data);
        }
      );
    },
    construirEstructuraFiltro(){
      let filtro_meses = [];
      this.opcionesFiltroMeses.forEach((filtroMes)=>{
        if(filtroMes.estaActivo === true){
          filtro_meses.push(filtroMes.numMes);
        }
      });
      return filtro_meses;
    },
    obtenerDatosFiltrados(){
      const filtro_meses = this.construirEstructuraFiltro();
      const parametros = {"filtro_meses":filtro_meses,"anio_filtro":this.fechaFiltro};
      //console.log("Los parametros que se envian a laravel son: ",parametros);
      //axiox.get("/api/")
    }
  }
}
</script>
