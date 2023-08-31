<template>
  <div>
    <div class="w-[80%]">
      <apexchart
        width="100%"
        height="250%"
        type="bar"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {

  data() {
    return {
      chartOptions: {
        chart: {
          id: 'vuechart-example',
          stackType: '100%'
        },
        xaxis: {
          categories: ["1","2"],
        },
        colors: "#4338CA",
        plotOptions: {
          bar: {
            columnWidth: '76%' // Cambia este valor para ajustar el ancho de las barras
          }
        }
      },
      series: [
        {
          name: 'valor monetario producto',
          data: []
        }
      ]
    }
  },
  mounted(){
    this.cargarDatosGrafico();
  },
  methods:{
    cargarDatosGrafico(){
        axios.get("/api/datos_inventario_valorado")
        .then(
            (response)=>{
                console.log(response.data.categories);
                this.chartOptions.xaxis.categories.splice(0,this.chartOptions.xaxis.categories.length);
                this.chartOptions.xaxis.categories = response.data.categories;
                this.series[0].data = response.data.data;
            }
        )
        .catch(
            (err)=>{
                console.log(err);
            }
        );
    }
  }
}
</script>
