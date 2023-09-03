<template>
  <main>
    <NavBar></NavBar>
    <EncabezadoGenerico :mensajeCabecera="mensajeCabecera" :mensajeBoton="mensajeBoton" class="h-[100px]">
    </EncabezadoGenerico>
    <table class=" w-[90%]  sm:w-[85%] md:w-[61%] m-auto mt-[2%]">
      <tr class="text-gray-400 bg-gray-50 border-b">
        <th class="p-[1%] font-semibold">Nº DE LOTE</th>
        <th class="p-[1%] font-semibold">PRODUCTO</th>
        <th class="p-[1%] font-semibold">FECHA DE INGRESO</th>
        <th class="p-[1%] font-semibold">CANTIDAD INGRESADA</th>
        <th class="p-[1%] font-semibold">ACCIONES</th>
      </tr>
      <tbody>
        <tr class="border-b">
          <th class="p-[1.5%]">1</th>
          <th>Producto 1</th>
          <th>27/07/2023</th>
          <th>60 unidades</th>
          <th>
            <div class="flex justify-between">
                <button class="">Consultar</button>
                <button>Editar</button>
                <button>Eliminar</button>
            </div>
          </th>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<script>
import NavBar from '../../components/NavBar.vue'
import EncabezadoGenerico from '../../components/Inventario/EncabezadoGenerico.vue'
export default {
  components: {
    NavBar,
    EncabezadoGenerico
  },
  data() {
    return {
      mensajeCabecera: 'Gestion de existencia de productos',
      mensajeBoton: 'Agregar Lote'
    }
  }
}
</script>
