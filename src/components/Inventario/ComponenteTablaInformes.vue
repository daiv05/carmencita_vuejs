<template>
  
      <table class=" mt-[2%] w-[85%] m-auto rounded-lg shadow-lg">

        <thead>
          <!--<tr class="text-gray-400 bg-gray-50 border-b">-->
          <tr class="border-b-2 border-black-400 h-[40px] bg-slate-100">
            <th class="p-[1%] font-bold">CÓDIGO PRODUCTO</th>
            <th class="p-[1%] font-semibold">NOMBRE PRODUCTO</th>
            <th class="p-[1%] font-semibold">CANTIDAD VENDIDA</th>
            <th class="p-[1%] font-semibold">INGRESOS GENERADOS</th>
          </tr>
        </thead>

        <tbody class="bg-white">
          <tr class="border-b" v-for="datosProducto in controlPagina.getDatosPagina()"
            :key="datosProducto.codigo_barra_producto">
            <td class="p-[1.5%] text-center">{{ datosProducto.codigo_barra_producto }}</td>
            <td class="text-center">{{ datosProducto.nombre_producto }}</td>
            <td class="text-center">{{ datosProducto.total_producto_vendido }} Unidades</td>
            <td class="text-center">$ {{ Number(datosProducto.total).toFixed(2) }}</td>
          </tr>
        </tbody>

      </table>


  

</template>

<script>


export default {

  props: {
    controlPagina: Object,
  }

}
</script>
