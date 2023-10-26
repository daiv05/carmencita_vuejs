
<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate';
import {showMessages} from '../../components/functions.js'
</script>

<template>
  <Transition name="modal">
    <div class="modal-mask bg-white">
      <div class="modal-container">
        <div>
          <Form @submit="enviarFormulario($event)">
            <h1 class="text-2xl font-bold mb-6 text-left text-indigo-600">Agregar Lote</h1>

            <div class="grid grid-cols-2 gap-4 mb-[1%]">
              <div class="">
                <label for="" class="block mb-[1%] font-semibold">Fecha Ingreso</label>
                <input type="date" class="rounded-md border-slate-400 text-slate-500 w-[100%]" v-model="fechaIngreso"
                  disabled />
              </div>
              <div class="">
                <label for="" class="block mb-[1%] font-semibold">Fecha Vencimiento</label>
                <Field type="date" class="rounded-md border-slate-400 text-slate-500 w-[100%]" v-model="fechaVencimiento"
                  :rules="validarFecha" name="fecha_vencimiento" />
                <ErrorMessage name="fecha_vencimiento" class="error" />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="">
                <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seleccione
                  el producto</label>
                <select id="countries"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  v-model="idProducto" @change="cargarListaCantidadUnidadesProducto()">
                  <option v-for="producto in listaProductos" :key="producto.codigo_barra_producto"
                    :value="producto.codigo_barra_producto">
                    {{ producto.nombre_producto }}
                  </option>
                </select>
              </div>
              <div class="">
                <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seleccione la
                  unidad
                  de los lotes</label>
                <select id="countries"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  v-model="cantidadUnidadMedida">
                  <option v-for="precioUnidadMedida in listaUnidadesMedida"
                    :key="precioUnidadMedida.id_precio_unidad_de_medida" :value="precioUnidadMedida.cantidad_producto">
                    {{ precioUnidadMedida.unidad_de_medida.nombre_unidad_de_medida + ":" +
                      precioUnidadMedida.cantidad_producto + "unidades" }}

                  </option>
                </select>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4 mb-[1%]">
              <div class="">
                <label for="" class="block mb-[1%] font-semibold">Cantidad a ingresar</label>
                <Field type="number" class="rounded-md border-slate-400 text-slate-500 w-[100%]"
                  v-model="cantidadIngresar" name="cantidad_lotes" :rules="validarCantidadLotes" />
                <ErrorMessage name="cantidad_lotes" class="error" />
              </div>
              <div class="">
                <label for="" class="block mb-[1%] font-semibold">Unidades totales a ingresar</label>
                <input type="number" class="rounded-md border-slate-400 text-slate-500 w-[100%]" disabled
                  v-model="unidadesTotalesIngresadas" />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4 mb-[1%]">
              <div class="">
                <label for="" class="block mb-[1%] font-semibold">Precio Unitario</label>
                <Field type="number" class="rounded-md border-slate-400 text-slate-500 w-[100%]"
                  v-model="nuevoPrecioUnitarioProducto" :rules="validarPrecioUnitario" name="precio_unitario" />
                <ErrorMessage name="precio_unitario" class="error" />
              </div>
              <div class="">
                <label for="" class="block mb-[1%] font-semibold">Costo del lote</label>
                <Field type="number" class="rounded-md border-slate-400 text-slate-500 w-[100%]" v-model="costoLote"
                  :rules="validarCostoDeLote" name="costo_lote" />
                <ErrorMessage name="costo_lote" class="error" />
              </div>
            </div>
            <div class="flex justify-center align-center mt-[3%] gap-4">
              <input type="submit" value="Guardar"
                class="text-white bg-indigo-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 cursor-pointer text-center" />
              <button @click="cerrarModal" type="button"
                class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 text-center">Cancelar</button>
            </div>

          </Form>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import axios from 'axios';
import '../../assets/modal_default.css';

export default {
  data() {
    return {
      listaUnidadesMedida: [],
      cantidadUnidadMedida: 0,
      idProducto: "",
      fechaIngreso: null,//this.convertirFecha(lote.fechaIngreso),
      fechaVencimiento: null,
      cantidadIngresar: null,
      unidadesTotalesIngresadas: null,
      nuevoPrecioUnitarioProducto: null,
      costoLote: null,
      listaProductos: [],
      lote: null,
    }
  },
  mounted() {
    this.configurarFechasLote();
    this.cargarProductos();
  },
  methods: {
    configurarFechasLote() {
      this.fechaIngreso = this.convertirFecha(this.obtenerFechaFormateada());
      //this.fechaVencimiento = this.convertirFecha(this.lote.fecha_vencimiento);
    },
    cerrarModal() {
      this.$emit("cerrarModalAgregar");
    },
    cargarUnidadesMedida() {
      //let url = "api/productos/precios/"+this.lote.producto.codigo_barra_producto;
      let url = "api/precio_lista_unidades/" + this.idProducto;
      axios.get(url)
        .then(
          (response) => {
            this.listaUnidadesMedida = response.data.lista_precios_extra;
            if (this.listaUnidadesMedida.length > 0) {
              this.cantidadUnidadMedida = this.listaUnidadesMedida[0].cantidad_producto;
            }
          }
        )
        .catch(
          (response) => {
            console.log(response);
            alert("El programador no quizo programar la exepción");
          }
        );
    },
    obtenerFechaFormateada() {
      const fechaActual = new Date();
      const opciones = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return fechaActual.toLocaleDateString("en-US", opciones);
    },
    convertirFecha(fechaEnFormatoUS) {
      const partes = fechaEnFormatoUS.split("/");
      const fechaEnFormatoISO = `${partes[2]}-${partes[0]}-${partes[1]}`;
      return fechaEnFormatoISO;
    },
    cargarProductos() {
      axios.get("/api/productos")
        .then(
          (response) => {
            this.listaProductos = response.data;
            if (this.listaProductos.length > 0) {
              this.idProducto = this.listaProductos[0].codigo_barra_producto;
              this.cargarListaCantidadUnidadesProducto();
            }
          }
        )
        .catch(
          (response) => {
            alert("Ocurrio un problema");
          }
        );
    },
    calcularTipoDeUnidadDeMedida() {
      this.cantidadUnidadMedida = this.lote.cantidad_total_unidades / this.lote.cantidad;
      console.log(this.cantidadUnidadMedida);
    },
    enviarFormulario(event, values) {
      event.preventDefault;
      let dataForm = {
        fecha_vencimiento: this.fechaVencimiento,
        codigo_barra_producto: this.idProducto,
        cantidad_total_unidades: this.unidadesTotalesIngresadas,
        cantidad: this.cantidadIngresar,
        precio_unitario: this.nuevoPrecioUnitarioProducto,
        costo_total: this.costoLote,
        fecha_ingreso: this.fechaIngreso,
      };
      axios.post("/api/gestion_existencias/", dataForm)
        .then(
          (response) => {
            let lote = response.data.lote;
            console.log(lote);
            this.$emit("guardarLoteNuevo", { lote: response.data.lote, mensaje: `Se agrego el lote ${lote.id_lote} con éxito` });
            showMessages(response.data.status, response.data.mensaje)
          }
        )
        .catch(
          (error) => {
            error.response.data.errores.forEach(mensaje=>{
            showMessages(error.response.data.status, mensaje);
          })
          }
        );
    },
    validarFecha(value) {
      if (!value) {
        return "La fecha no debe quedar vacía. Seleccione una fecha";
      }
      if (Date.parse(this.fechaIngreso) > Date.parse(this.fechaVencimiento)) {
        return "La fecha de vencimiento debe ser mayor a la fecha de ingreso";
      }
      return true;
    },
    validarCantidadLotes(values) {
      if (values <= 0) {
        return "Cantidad de lotes debe ser mayor a 0";
      }
      return true;
    },
    validarPrecioUnitario(values) {
      if (values <= 0) {
        return "El precio unitario debe ser mayor a 0";
      }
      return true;
    },
    validarCostoDeLote(values) {
      if (values <= 0) {
        return "El costo de el lote debe ser mayor a 0"
      }
      return true;
    },
    cargarListaCantidadUnidadesProducto() {
      this.cargarUnidadesMedida();
    }
  },
  watch: {
    cantidadUnidadMedida(newValue, oldValue) {
      this.unidadesTotalesIngresadas = newValue * this.cantidadIngresar;
    },
    cantidadIngresar(newValue, oldValue) {
      this.unidadesTotalesIngresadas = newValue * this.cantidadUnidadMedida;
    }
  }
}
</script>
<style scoped>
.error {
  color: red;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-content {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  border-radius: 10px;
  transition: all 0.3s ease;
}</style>