<template>
  <main>
    <NavBar />
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

    <div class="grid grid-cols-6 gap-4 w-[45%] ml-[10%] mt-[5%]">
      <div v-for="mes in opcionesFiltroPrimerSemestre" :key="mes.mes">
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
    <div class="w-[80%] col-span-6 m-auto border mt-[1%]">
        <apexchart width="100%" height="250%" type="bar" :options="chartOptions" :series="series"></apexchart>
    </div>
  </main>
</template>
<script>
import NavBar from '../../components/NavBar.vue'
import axios from 'axios'
export default {
  components: {
    NavBar
  },
  data() {
    return {
      opcionesFiltroPrimerSemestre: [
        { mes: 'ene', estaActivo: false },
        { mes: 'feb', estaActivo: false },
        { mes: 'mar', estaActivo: true },
        { mes: 'abr', estaActivo: false },
        { mes: 'may', estaActivo: false },
        { mes: 'jun', estaActivo: false },
        { mes: 'jul', estaActivo: false },
        { mes: 'ago', estaActivo: false },
        { mes: 'sep', estaActivo: false },
        { mes: 'oct', estaActivo: false },
        { mes: 'nov', estaActivo: false },
        { mes: 'dic', estaActivo: false }
      ],
      chartOptions: {
        chart: {
          id: 'vuechart-example',
          stackType: "100%",
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        },
        colors: "#13C296",
      },
      series: [
        {
          name: 'series-1',
          data: [30, 40, 35, 50, 49, 60, 70, 91]
        }
      ]
    }
  }
}
</script>
