<template>
  <div>
    <h1 class="text-xl font-semibold mb-1 text-center ml-[5%]">Productos con mayor valor en inventario</h1>
    <div>
      <apexchart
        width="100%"
        height="350%"
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
        yaxis: {
          title: {
            text: 'Valor en inventario ($)'
          }
        },
        xaxis: {
          categories: ["1","2"],
        },
        colors: "#4338CA",
        plotOptions: {
          bar: {
            columnWidth: '76%' // Cambia este valor para ajustar el ancho de las barras
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return "$" + val;
          },
        }
      },
      series: [
        {
          name: 'valor monetario producto ($)',
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
                this.series[0].data = response.data.data;
                response.data.categories.forEach((element)=>{
                    console.log(element);
                    this.chartOptions.xaxis.categories.push(element);
                });
            }
        )
        .catch(
            (response)=>{
                console.log(response);
            }
        );
    }
  }
}
</script>
