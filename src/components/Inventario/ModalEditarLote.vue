<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate';
</script>

<template>
  <Transition name="modal">
    <div class="modal-mask bg-white">
      <div class="modal-container">
        <Form @submit="enviarFormulario($event)">
          <h1 class="text-2xl font-bold mb-6 text-left text-indigo-600">Editar Lote</h1>

          <div class="grid grid-cols-2 gap-4 mb-[1%]">
            <div class="">
              <label for="" class="block mb-[1%] font-semibold">Fecha Ingreso</label>
              <input type="date" class="rounded-md border-slate-400 text-slate-500 w-[100%]" v-model="lote.fecha_ingreso"
                disabled />
            </div>
            <div class="">
              <label for="" class="block mb-[1%] font-semibold">Fecha Vencimiento</label>
              <Field type="date" class="rounded-md border-slate-400 text-slate-500 w-[100%]"
                v-model="lote.fecha_vencimiento" :rules="validarFecha" name="fecha_vencimiento" />
              <ErrorMessage name="fecha_vencimiento" class="mensajeDeError" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="">
              <label for="countries" class="block text-sm font-medium text-gray-900 dark:text-white mb-[1%]">Seleccione el
                producto</label>
              <select id="countries"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                v-model="idProducto">
                <option v-for="producto in listaProductos" :key="producto.codigo_barra_producto"
                  :value="producto.codigo_barra_producto">
                  {{ producto.nombre_producto }}
                </option>
              </select>
            </div>
            <div class="">
              <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seleccione la
                unidad de los lotes</label>
              <select id="countries"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                v-model="cantidadUnidadMedida">
                <option v-for="precioUnidadMedida in listaUnidadesMedida"
                  :key="precioUnidadMedida.id_precio_unidad_de_medida" :value="precioUnidadMedida.cantidad_producto">
                  {{ precioUnidadMedida.unidad_de_medida.nombre_unidad_de_medida + ":" + precioUnidadMedida.cantidad_producto
                    + " unidades" }}

                </option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4 mb-[1%]">
            <div class="">
              <label for="" class="block mb-[1%] font-semibold">Cantidad a ingresar</label>
              <Field type="number" class="rounded-md border-slate-400 text-slate-500 w-[100%]" v-model="cantidadIngresar"
                name="cantidad_lotes" :rules="validarCantidadLotes" />
              <ErrorMessage name="cantidad_lotes" class="mensajeDeError" />
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
                v-model="lote.precio_unitario" :rules="validarPrecioUnitario" name="precio_unitario" />
              <ErrorMessage name="precio_unitario" />
            </div>
            <div class="">
              <label for="" class="block mb-[1%] font-semibold">Costo del lote</label>
              <Field type="number" class="rounded-md border-slate-400 text-slate-500 w-[100%]" v-model="lote.costo_total"
                :rules="validarCostoDeLote" name="costo_lote" />
              <ErrorMessage name="costo_lote" />
            </div>
          </div>
          <div class="flex justify-center align-center mt-[1%] gap-4 pt-4">
            <input type="submit" value="Guardar"
              class="text-white bg-indigo-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 cursor-pointer" />
            <button @click="cerrarModal" type="button"
              class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Cancelar</button>
          </div>

        </Form>
      </div>
    </div>
  </Transition>
</template>

<script>
import axios from 'axios';
import {showMessages} from '../../components/functions.js';
import { useToast } from 'vue-toastification';
const toast = useToast();
export default {
  props: {
    tempLote: Object,
  },
  data() {
    return {
      listaUnidadesMedida: [],
      cantidadUnidadMedida: 0,
      idProducto: "",
      fechaIngreso: null,//this.convertirFecha(lote.fechaIngreso),
      fechaVencimiento: null,
      cantidadIngresar: 0,
      unidadesTotalesIngresadas: 0,
      nuevoPrecioUnitarioProducto: 0,
      costoLote: 0,
      listaProductos: [],
      lote: this.tempLote,
    }
  },
  mounted() {
    this.idProducto = this.lote.producto.codigo_barra_producto;
    this.cargarUnidadesMedida();
    this.cargarProductos();
    this.configurarFechasLote();
    this.cantidadIngresar = this.lote.cantidad;
    this.unidadesTotalesIngresadas = this.lote.cantida_total_unidades;
    this.calcularTipoDeUnidadDeMedida();
  },
  methods: {
    configurarFechasLote() {
      this.fechaIngreso = this.convertirFecha(this.lote.fecha_ingreso);
      this.fechaVencimiento = this.convertirFecha(this.lote.fecha_vencimiento);
    },
    cerrarModal() {
      this.$emit("cerrarModalEditar");
    },
    cargarUnidadesMedida() {
      //let url = "api/productos/precios/"+this.lote.producto.codigo_barra_producto;
      let url = "api/precio_lista_unidades/" + this.idProducto;
      axios.get(url)
        .then(
          (response) => {
            console.log("La lista de unidades de medida son: ", response.data);
            this.listaUnidadesMedida = response.data.lista_precios_extra;
            console.log("id unidad medida");
            try{
              this.cantidadUnidadMedida = this.listaUnidadesMedida[0].cantidad_producto;
            }catch(error){
              toast.error("El producto no tiene lista de precios extra. Registre precios extra primero.");
            }
            //console.log(this.listaUnidadesMedida[0]);
          }
        )
        .catch(
          (response) => {
            console.log(response);
            toast.error("El producto no tiene lista de precios extra. Registre precios extra antes.");
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
      console.log(this.lote);
      let configuracionPut = "?_method=PUT";
      let dataForm = {
        id_lote: this.lote.id_lote,
        fecha_vencimiento: this.lote.fecha_vencimiento,
        codigo_barra_producto: this.idProducto,
        cantidad_total_unidades: this.unidadesTotalesIngresadas,
        cantidad: this.cantidadIngresar,
        precio_unitario: this.lote.precio_unitario,
        costo_total: this.lote.costo_total,
        fecha_ingreso: this.lote.fecha_ingreso,
      };

      axios.post("/api/gestion_existencias/"+this.lote.id_lote+configuracionPut,dataForm)
      .then(
        (response)=>{
          dataForm.producto = this.lote.producto;
          this.$emit("guardarLoteModificado",{dataForm:dataForm,mensaje:`Se edito el lote ${this.lote.id_lote} con éxito`});
          showMessages(response.data.status, response.data.mensaje);
        }
      )
      .catch(
        (error)=>{
          error.response.data.errores.forEach(mensaje=>{
            showMessages(error.response.data.status, error.response.data.errores);
          })
        }
      );
      /*
      axios.post("/api/gestion_existencias/" + this.lote.id_lote + configuracionPut, dataForm)
        .then(
          (response) => {
            alert(response.data.mensaje);
            dataForm.producto = this.lote.producto;
            this.$emit("guardarLoteModificado", { dataForm: dataForm, mensaje: `Se edito el lote ${this.lote.id_lote} con éxito` });
          }
        )
        .catch(
          (response) => {
            alert(response);
          }
        );*/
    },
    validarFecha(value) {
      if (!value) {
        return "La fecha no debe quedar vacía.Seleccione una fecha";
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
        return "El costo dle lote debe ser mayor a 0"
      }
      return true;
    }
  },
  watch: {
    cantidadUnidadMedida(newValue, oldValue) {
      this.unidadesTotalesIngresadas = newValue * this.cantidadIngresar;
    },
    cantidadIngresar(newValue, oldValue) {
      this.unidadesTotalesIngresadas = newValue * this.cantidadUnidadMedida;
    },
    idProducto(newIdProducto, oldIdProducto){
       this.cargarUnidadesMedida();
    }
  }
}
</script>