<template>
  <main class="relative">

    <NavBar />

    <!-- Encabezado -->
    <div>
      <div class="flex bg-white mx-auto p-5 shadow-md justify-between">
        <h1 class="font-bold text-blue-700 text-xl">Informe de ventas Totales</h1>
      </div>
      <div class="flex justify-start items-center mt-4 ml-4">
        <a href="#" @click="$router.go(-1)" class="text-sm text-black font-medium flex items-center">
          <img src="../../assets/icons/arrow.svg" alt="Regresar" class="h-6 w-6 mr-1"> Regresar
        </a>
      </div>
    </div>

    <div class="grid grid-cols-6 gap-4 w-[45%] ml-[10%] mt-[4%]">
      <div v-for="mes in opcionesFiltroMeses" :key="mes.mes">
        <input type="checkbox" class="inline-block rounded-[3px]" :id="mes.mes" v-model="mes.estaActivo" />
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
      <button type="button"
        class="text-white bg-indigo-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        @click="obtenerDatosFiltrados">Aplicar</button>
    </div>
    <div class="absolute left-[81.5%] bottom-[62%]">
      <select name="filtroAnio" id="filtroAnio" class="border-slate-300 rounded text-slate-400 bg-slate-50"
        v-model="fechaFiltro">
        <option v-for="anio in datosAniosFiltros" :value="anio" :key="anio">{{ anio }}</option>
      </select>
    </div>
    <div class="w-[80%] col-span-6 m-auto border mt-[1%] mb-16">
      <apexchart width="100%" height="250%" type="bar" :options="chartOptions" :series="series"></apexchart>
    </div>
  </main>
</template>
<script>

import axios from 'axios';
import NavBar from '@/components/NavBar.vue';
export default {
  components: {
    NavBar,
  },
  mounted() {
    this.obtenerFechasFiltro();
  },
  data() {
    return {
      opcionesFiltroMeses: [
        { mes: 'ene', estaActivo: false, numMes: 1 },
        { mes: 'feb', estaActivo: false, numMes: 2 },
        { mes: 'mar', estaActivo: false, numMes: 3 },
        { mes: 'abr', estaActivo: false, numMes: 4 },
        { mes: 'may', estaActivo: false, numMes: 5 },
        { mes: 'jun', estaActivo: false, numMes: 6 },
        { mes: 'jul', estaActivo: false, numMes: 7 },
        { mes: 'ago', estaActivo: false, numMes: 8 },
        { mes: 'sep', estaActivo: false, numMes: 9 },
        { mes: 'oct', estaActivo: false, numMes: 10 },
        { mes: 'nov', estaActivo: false, numMes: 11 },
        { mes: 'dic', estaActivo: false, numMes: 12 },
      ],
      fechaFiltro: new Date().getFullYear(),
      datosAniosFiltros: [],
      chartOptions: {
        chart: {
          id: 'vuechart-example',
          stackType: "100%",
        },
        xaxis: {
          categories: []
        },
        colors: "#13C296",
        plotOptions: {
          bar: {
            columnWidth: "30%", // Cambia este valor para ajustar el ancho de las barras
          },
        }
      },
      series: [
        {
          name: 'Ventas totales',
          data: []
        }
      ]
    }
  },
  methods: {
    obtenerFechasFiltro() {
      axios.get("/api/fechas_filtro")
        .then(
          (response) => {
            this.datosAniosFiltros = response.data.lista_fechas_filtro;
            //this.obtenerDatosFiltrados();
          }
        )
        .catch(
          (response) => {
            alert(response.response.data);
          }
        );
    },
    construirEstructuraFiltro() {
      let filtro_meses = [];
      this.opcionesFiltroMeses.forEach((filtroMes) => {
        if (filtroMes.estaActivo === true) {
          filtro_meses.push(filtroMes.numMes);
        }
      });
      return filtro_meses;
    },
    obtenerDatosFiltrados() {
      const filtro_meses = this.construirEstructuraFiltro();
      //const parametros = {"filtro_meses":filtro_meses,"anio_filtro":this.fechaFiltro};
      axios.get("/api/filtro_ventas_totales", {
        params: {
          anio_filtro: this.fechaFiltro,
          filtro_meses: filtro_meses,
        }
      })
        .then(
          (response) => {
            let datos_filtrados = response.data.datos_filtrados;
            this.chartOptions.xaxis.categories.splice(0, this.chartOptions.xaxis.categories.length);
            this.series[0].data.splice(0, this.series[0].data.length);
            datos_filtrados.forEach(
              (totalMes) => {
                this.chartOptions.xaxis.categories.push(totalMes.nombre_mes);
                this.series[0].data.push(totalMes.total_venta);
              }
            );
          }
        )
        .catch(
          (response) => {
            console.log(response);
          }
        );
    }
  }
}
</script>
