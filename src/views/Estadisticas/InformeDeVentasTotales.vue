<template>
  <main class="relative">
    <NavBar />

    <!-- Encabezado -->
    <div>
      <div class="flex bg-white mx-auto p-5 shadow-md justify-between">
        <h1 class="font-bold text-blue-700 text-xl">Informe de ventas Totales</h1>
      </div>
      <div class="flex justify-start items-center mt-4 ml-4">
        <a
          href="#"
          @click="$router.go(-1)"
          class="text-sm text-black font-medium flex items-center"
        >
          <img src="../../assets/icons/arrow.svg" alt="Regresar" class="h-6 w-6 mr-1" /> Regresar
        </a>
      </div>
    </div>

    <div class="grid grid-cols-10 gap-4 w-[90%] m-auto">
      <div class="col-span-8">
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
        </div>
        </div>
        <div class="col-span-2">
          <div class="w-[100%] ">
            <div class="mt-[5%] ml-[7%]">
            <button
              type="button"
              class="text-white bg-indigo-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              @click="obtenerDatosFiltrados"
            >
              Aplicar
            </button>
          </div>
          <div class="p-4 mr-[10%]">
            <select
              name="filtroAnio"
              id="filtroAnio"
              class="border-slate-300 rounded text-slate-400 bg-slate-50"
              v-model="fechaFiltro"
            >
              <option v-for="anio in datosAniosFiltros" :value="anio" :key="anio">
                {{ anio }}
              </option>
            </select>
          </div>
          </div>
        </div>
      </div>
      <!-- <div class="flex justify-between align-center">
            <div v-for="mes in opcionesFiltroSegundoSemestre" :key="mes.mes">
                <input type="checkbox" class="inline-block rounded-[3px]" :id="mes.mes" v-model="mes.estaActivo">
                <label :for="mes.mes" class="inline-block">{{ mes.mes }}</label>
            </div>
        </div> -->

    <div class="p-4 w-[80%] col-span-6 m-auto border mt-[1%] mb-16">
      <apexchart
        width="100%"
        height="250%"
        type="bar"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
    <table class="mt-[2%] w-[50%] m-auto rounded-lg shadow-lg mt-[2%] mb-[2%]">
      <thead>
        <!--<tr class="text-gray-400 bg-gray-50 border-b">-->
        <tr class="">
          <th colspan="2" class="font-bold text-center text-black p-[1%] text-xl">
            Resumen de los datos
          </th>
        </tr>
        <tr class="border-b-2 border-black-400 h-[40px] bg-slate-100">
          <th class="p-[1%] font-bold">Mes</th>
          <th class="p-[1%] font-bold">Monto Total Mes</th>
        </tr>
      </thead>
      <tbody class="bg-white">
        <tr class="border-b" v-for="total_ventas in datos_filtrados" :key="total_ventas.nombre_mes">
          <td class="p-[1.5%] text-center">{{ total_ventas.nombre_mes }}</td>
          <td class="text-center">${{ formatearValorTotal(total_ventas.total_venta) }}</td>
        </tr>
      </tbody>
    </table>
  </main>
</template>
<script>
import axios from 'axios'
import NavBar from '@/components/NavBar.vue'
export default {
  components: {
    NavBar
  },
  mounted() {
    this.obtenerFechasFiltro()
    this.obtenerDatosFiltrados()
  },
  data() {
    return {
      opcionesFiltroMeses: [
        { mes: 'ene', estaActivo: true, numMes: 2 },
        { mes: 'feb', estaActivo: true, numMes: 1 },
        { mes: 'mar', estaActivo: true, numMes: 3 },
        { mes: 'abr', estaActivo: true, numMes: 4 },
        { mes: 'may', estaActivo: true, numMes: 5 },
        { mes: 'jun', estaActivo: true, numMes: 6 },
        { mes: 'jul', estaActivo: true, numMes: 7 },
        { mes: 'ago', estaActivo: true, numMes: 8 },
        { mes: 'sep', estaActivo: true, numMes: 9 },
        { mes: 'oct', estaActivo: true, numMes: 10 },
        { mes: 'nov', estaActivo: true, numMes: 11 },
        { mes: 'dic', estaActivo: true, numMes: 12 }
      ],
      datos_filtrados: null,
      fechaFiltro: new Date().getFullYear(),
      datosAniosFiltros: [],
      chartOptions: {
        chart: {
          id: 'vuechart-example',
          stackType: '100%'
        },
        yaxis: {
          title: {
            text: 'Total Ventas ($)'
          }
        },
        xaxis: {
          title: {
            text: 'Meses'
          },
          categories: []
        },
        colors: '#13C296',
        plotOptions: {
          bar: {
            columnWidth: '30%',
            horizontal: false
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return '$' + val
          },
          style: {
            fontSize: '12px',
            fontWeight: 1000,
            colors: ['#333', '#999']
          }
        }
      },
      series: [
        {
          name: 'Ventas totales ($)',
          data: []
        }
      ]
    }
  },
  methods: {
    obtenerFechasFiltro() {
      axios
        .get('/api/fechas_filtro')
        .then((response) => {
          this.datosAniosFiltros = response.data.lista_fechas_filtro
          //this.obtenerDatosFiltrados();
        })
        .catch((response) => {
          alert(response.response.data)
        })
    },
    construirEstructuraFiltro() {
      let filtro_meses = []
      this.opcionesFiltroMeses.forEach((filtroMes) => {
        if (filtroMes.estaActivo === true) {
          filtro_meses.push(filtroMes.numMes)
        }
      })
      return filtro_meses
    },
    obtenerDatosFiltrados() {
      const filtro_meses = this.construirEstructuraFiltro()
      //const parametros = {"filtro_meses":filtro_meses,"anio_filtro":this.fechaFiltro};
      axios
        .get('/api/filtro_ventas_totales', {
          params: {
            anio_filtro: this.fechaFiltro,
            filtro_meses: filtro_meses
          }
        })
        .then((response) => {
          this.datos_filtrados = response.data.datos_filtrados
          this.chartOptions.xaxis.categories.splice(0, this.chartOptions.xaxis.categories.length)
          this.series[0].data.splice(0, this.series[0].data.length)
          this.datos_filtrados.forEach((totalMes) => {
            this.chartOptions.xaxis.categories.push(totalMes.nombre_mes)
            this.series[0].data.push(totalMes.total_venta)
          })
          console.log(this.chartOptions)
        })
        .catch((response) => {
          console.log(response)
        })
    },
    formatearValorTotal(totalVenta) {
      return totalVenta.toString().replace('.', ',')
    }
  }
}
</script>
