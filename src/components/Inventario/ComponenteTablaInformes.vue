<template>
    <table class="w-[100%] m-auto mt-[2%] w-[85%] m-auto">
      <tr class="text-gray-400 bg-gray-50 border-b">
        <th class="p-[1%] font-semibold">CÓDIGO PRODUCTO</th>
        <th class="p-[1%] font-semibold">NOMBRE PRODUCTO</th>
        <th class="p-[1%] font-semibold">CANTIDAD VENDIDA</th>
        <th class="p-[1%] font-semibold">INGRESOS GENERADOS</th>
      </tr>
      <tbody>
        <tr
          class="border-b"
          v-for="datosProducto in controlPagina.getDatosPagina()"
          :key="datosProducto.codigo_barra_producto"
        >
          <td class="p-[1.5%] text-center">{{datosProducto.codigo_barra_producto }}</td>
          <td class="text-center">{{ datosProducto.nombre_producto }}</td>
          <td class="text-center">{{ datosProducto.total_producto_vendido }} Unidades</td>
          <td class="text-center">$ {{ datosProducto.total }}</td>
        </tr>
      </tbody>
    </table>
</template>

<script>


export default {

    props:{
        controlPagina:Object,
    }

}
</script>
