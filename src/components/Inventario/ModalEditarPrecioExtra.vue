<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate';
import api_url from "../../config";
</script>

<template>
  <Transition name="modal">
    <div class="modal-mask bg-white">
      <div class="modal-container">
        <Form name="editPrecioExtra" @submit="agregarPrecioExtra()">

          <div class="grid grid-cols-1 md:grid-cols-4 gap-[2%]">
            <div class="col-span-3">
              <div>
                <label for="unidad-medida" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seleccione
                  una unidad de medida</label>

                <Field as="select" rules="required" name="unidad-medida"
                  class="max-w-[100%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-[5%]"
                  v-model="precioExtra.idUnidadMedida">
                  <option v-for="unidadDeMedida in listaUnidadDeMedida" :key="unidadDeMedida.id_unidad_de_medida"
                    :value="unidadDeMedida.id_unidad_de_medida">{{ unidadDeMedida.nombre_unidad_de_medida }}</option>
                </Field>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label for="Precio">Precio</label>
                  <Field rules="required|positivo" name="Precio" v-model="precioExtra.precio" type="number"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    step="0.05" />
                  <ErrorMessage name="Precio" class="text-red-500" />
                </div>
                <div>
                  <label for="cantidad">Cantidad</label>
                  <Field rules="required|positivo" name="cantidad" v-model="precioExtra.cantidad"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    type="number" />
                  <ErrorMessage name="cantidad" class="text-red-500" />
                </div>
              </div>
            </div>

            <div class="col-span=1">
              <button type="button"
                class="display:inline-block mt-[0%] md:mt-[12%]  md:w-full md:mb-[0%] lg:mt-[20%] md:block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                @click="guardarPrecioExtra">
                Guardar Cambios
              </button>
              <button type="button"
                class=" display:inline-block mt-[0%] md:mt-[26%]  md:w-full md:mb-[0%]  lg:mt-[28%] md:block focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                @click="cerrarModal">
                Cancelar
              </button>
            </div>
          </div>

        </Form>
      </div>
    </div>
  </Transition>
</template>
<script>
import axios from 'axios';
import '../../assets/modal_default.css';
import { Form, Field, ErrorMessage } from 'vee-validate'
import { defineRule } from 'vee-validate'

defineRule('required', (valor) => {
  if (valor === null || valor === undefined || valor.trim() === '') {
    return '*Campo requerido'
  }
  return true
})
defineRule('positivo', (value) => {
  if (value <= 0) {
    return '*Ingrese un valor mayor a cero.'
  }
  return true
})


export default {
  props: {
    precioExtraParametro: {},
  },
  data() {
    return {
      precioExtra: {
        nombreUnidadDeMedida: "",
        idUnidadMedida: 0,
        precio: 0,
        cantidad: 0,
        id_precio_unidad_de_medida: "",
      },
      listaUnidadDeMedida: [],
      errorUnidadMedida: "",
      errorPrecio: "",
      errorCantidad: "",
    }
  },
  mounted() {
    this.obtenerUnidadesDeMedida();
    this.precioExtra.nombreUnidadDeMedida = this.precioExtraParametro.nombreUnidadDeMedida;
    this.precioExtra.idUnidadMedida = this.precioExtraParametro.idUnidadMedida;
    this.precioExtra.precio = this.precioExtraParametro.precio;
    this.precioExtra.cantidad = this.precioExtraParametro.cantidad;
    this.precioExtra.id_precio_unidad_de_medida = this.precioExtraParametro.id_precio_unidad_de_medida;
  },
  methods: {
    cerrarModal() {
      this.$emit("controlEventoModalEditarPrecioExtra", null);
    },
    guardarPrecioExtra() {
      if (this.validarUnidadDeMedida()) {
        this.ponerNombreAUnidadDeMedida();
        this.$emit("controlEventoModalEditarPrecioExtra", this.precioExtra);
      }
    },
    ponerNombreAUnidadDeMedida() {
      this.listaUnidadDeMedida.forEach(
        (unidadMedida) => {
          if (unidadMedida.id_unidad_de_medida == this.precioExtra.idUnidadMedida) {
            this.precioExtra.nombreUnidadDeMedida = unidadMedida.nombre_unidad_de_medida;
            console.log(this.precioExtra.nombreUnidadDeMedida);
          }
        }
      );
    },
    agregarPrecioExtra() {
      console.log("Hola mundo");
    },
    obtenerUnidadesDeMedida() {
      axios.get(api_url + "/unidades_de_medida")
        .then(
          response => {
            this.listaUnidadDeMedida = response.data;
          }
        )
        .catch(
          error => {
            console.log(error);
          }
        )
    },
    validarUnidadDeMedida() {
      if (this.precioExtra.idUnidadMedida == 0 || this.precioExtra.idUnidadMedida == "") {
        this.errorUnidadMedida = "Seleccione una unidad de medida";
      }
      else {
        this.errorUnidadMedida = "";
      }
      if (this.precioExtra.cantidad == 0 || this.precioExtra.cantidad == "") {
        this.errorCantidad = "La cantidad tiene que ser mayor a 0";
      }
      else {
        this.errorCantidad = "";
      }
      if (this.precioExtra.precio == 0 || this.precioExtra.precio == 0) {
        this.errorPrecio = "El precio tiene que ser mayor a cero";
      } else {
        this.errorPrecio = "";
      }
      if (this.errorCantidad != "" || this.errorUnidadMedida != "" || this.errorPrecio != "") {
        return false;
      } else {
        return true;
      }
    }
  }
}

</script>
<style scoped>
.mensajeError {
  color: #dc2626;
}</style>
