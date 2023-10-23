<template>
  <Transition name="modal">
    <div class="modal-mask bg-white">
      <div class="modal-container">
        <Form @submit="enviarFormulario($event)">
          <h1 class="text-2xl font-bold mb-6 text-left text-indigo-600">Consultar Lote</h1>
          <div class="grid grid-cols-2 gap-4 mb-[1%]">
            <div class="">
              <label for="" class="block mb-[1%] font-semibold">Fecha Ingreso</label>
              <input type="date" class="rounded-md border-slate-400 text-slate-500 w-[100%]" v-model="fechaIngreso"
                disabled />
            </div>
            <div class="">
              <label for="" class="block mb-[1%] font-semibold">Fecha Vencimiento</label>
              <input type="date" class="rounded-md border-slate-400 text-slate-500 w-[100%]" v-model="fechaVencimiento"
                name="fecha_vencimiento" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="">
              <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Producto
              </label>
              <input type="text" v-model="nombreProducto" class="rounded-md border-slate-400 text-slate-500 w-[100%]"
                disabled>
            </div>
            <div class="">
              <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Unidad de los lotes
              </label>
              <input type="text" class="rounded-md border-slate-400 text-slate-500 w-[100%]" disabled
                v-model="unidadMedidaLote">
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4 mb-[1%]">
            <div class="">
              <label for="" class="block mb-[1%] font-semibold">Cantidad a ingresar</label>
              <input type="number" class="rounded-md border-slate-400 text-slate-500 w-[100%]" v-model="cantidadAIngresar"
                name="cantidad_lotes" disabled />
            </div>
            <div class="">
              <label for="" class="block mb-[1%] font-semibold">Unidades totales a ingresar</label>
              <input type="number" class="rounded-md border-slate-400 text-slate-500 w-[100%]" disabled
                v-model="unidadesTotalesAIngresar" />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4 mb-[1%]">
            <div class="">
              <label for="" class="block mb-[1%] font-semibold">Precio Unitario</label>
              <input type="number" class="rounded-md border-slate-400 text-slate-500 w-[100%]" v-model="precioUnitario"
                name="precio_unitario" disabled />
            </div>
            <div class="">
              <label for="" class="block mb-[1%] font-semibold">Costo del lote</label>
              <input type="number" class="rounded-md border-slate-400 text-slate-500 w-[100%]" v-model="costoLote"
                name="costo_lote" disabled />
            </div>
          </div>
          <div class="flex justify-center align-center mt-[1%] gap-4 pt-4">
            <button @click="cerrarModal" type="button"
              class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Cerrar</button>
          </div>

        </Form>
      </div>
    </div>

  </Transition>
</template>
<script>
import axios from 'axios';
import '../../assets/modal_default.css';
export default {
  props: {
    lote: Object,
  },
  data() {
    return {
      unidadMedidaLote: "",
      fechaIngreso: null,
      fechaVencimiento: null,
      nombreProducto: null,
      cantidadAIngresar: null,
      unidadesTotalesAIngresar: null,
      precioUnitario: null,
      costoLote: null,
    }
  },
  mounted() {
    this.fechaIngreso = this.lote.fecha_ingreso;
    this.fechaVencimiento = this.lote.fecha_vencimiento;
    this.nombreProducto = this.lote.producto.nombre_producto;
    this.cantidadAIngresar = this.lote.cantidad;
    this.unidadesTotalesAIngresar = this.lote.cantidad_total_unidades;
    this.precioUnitario = this.lote.precio_unitario;
    this.costoLote = this.lote.costo_total;
    this.cargarUnidadesMedida();
  },
  methods: {
    convertirFecha(fechaEnFormatoUS) {
      const partes = fechaEnFormatoUS.split("/");
      const fechaEnFormatoISO = `${partes[2]}-${partes[0]}-${partes[1]}`;
      return fechaEnFormatoISO;
    },
    calcularTamanioUnidadMedida() {
      let cantidadUnidadMedida = this.unidadesTotalesAIngresar / this.cantidadAIngresar;
      return cantidadUnidadMedida;
    },
    cargarUnidadesMedida() {
      //let url = "api/productos/precios/"+this.lote.producto.codigo_barra_producto;
      let url = "api/precio_lista_unidades/" + this.lote.producto.codigo_barra_producto;
      axios.get(url)
        .then(
          (response) => {
            let listaPreciosExtra = response.data.lista_precios_extra;
            let tamanioUnidadMedida = this.calcularTamanioUnidadMedida();
            console.log("La lista de unidades de medida son: ", response.data);
            listaPreciosExtra.forEach(element => {
              if (element.cantidad_producto === tamanioUnidadMedida) {
                this.unidadMedidaLote = element.unidad_de_medida.nombre_unidad_de_medida + " : " + element.cantidad_producto.toString();
              }
            });
          }
        )
        .catch(
          (response) => {
            console.log(response);
            alert("El programador no quizo programar la exepción");
          }
        );
    },
    cerrarModal() {
      this.$emit("cerrarModalConsultar");
    }
  }
}

</script>
