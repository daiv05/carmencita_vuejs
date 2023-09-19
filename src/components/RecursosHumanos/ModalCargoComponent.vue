<script setup>
import api_url from "../../config";
</script>

<template>
  <Transition name="modal">
    <div class="modal-mask bg-white">
      <div class="modal-container">
        <Form @submit="guardarModificacionEmpleado()">
          <div class=" bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert"
            v-if="errorConsulta">
            <strong class="font-bold">Error a modificar Cargo</strong>
            <span class="block sm:inline">{{ mensajeConsulta }}</span>
            <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg @click="errorConsulta = false" class="fill-current h-6 w-6 text-red-500" role="button"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <title>Close</title>
                <path
                  d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </span>
          </div>

          <h1 class="text-2xl font-bold mb-6 text-left">Editar cargo</h1>
          <div class="mb-4">
            <Field class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="text" id="name" name="nombre_cargo" placeholder="Nombre Cargo" v-model="cargoModificado.nombre_cargo"
              :rules="validarCamposDeTexto" />
            <ErrorMessage name="nombre_cargo" />
          </div>
          <div class="mb-4">
            <Field class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="number" id="email" name="salario_cargo" placeholder="Sueldo del cargo" step="0.01"
              v-model="cargoModificado.salario_cargo" :rules="validarSalario" />
            <ErrorMessage name="salario_cargo" />
          </div>
          <div class="mb-4">
            <Field as="textarea" name="descripcion_cargo" id="chat" v-model="cargoModificado.descripcion_cargo" rows="1"
              class="block mx-0 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 
  dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Descripción Cargo" :rules="validarCamposDeTexto" />
            <ErrorMessage name="descripcion_cargo" />
          </div>
          <div class="mb-4">
            <Field as="select" name="horario" id="horario"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              v-model="cargoModificado.id_jornada_laboral_diaria">
              <option v-for="jornada in listaHorarioLaboral" v-bind:key="jornada.id_jornada_laboral_diaria"
                :value="jornada.id_jornada_laboral_diaria">Hora entrada: {{ jornada.hora_inicio }} Hora salida: {{
                  jornada.hora_fin }}</option>
            </Field>
          </div>
          <div class="text-center">
            <button
              class="bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300">Guardar</button>
            <button id="btnCancelar"
              class=" ml-4 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
              Cancelar</button>
          </div>
        </Form>
      </div>
    </div>
  </Transition>
</template>

<script>
import axios from 'axios';
import { Form, Field, ErrorMessage } from 'vee-validate';
import '../../assets/modal_default.css';
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      btnCancelar: null,
      valorSelect: "Seleccione un horario para el cargo",
      listaHorarioLaboral: [],
      cargoModificado: {},
      estadoConsulta: false,
      mensajeConsulta: "",
      errorConsulta: false,
    }
  },
  props: ["cargo"],
  mounted() {
    this.obtenerListaHorariosLaboral();
    this.obtenerBtnCancelar();
    this.cancelar();
    this.cargarCargoModificado();
  },
  methods: {
    cancelar() {
      this.btnCancelar.addEventListener("click", (event) => {
        event.preventDefault();
        console.log("Si funciona el click");
        this.$emit("cerrarModal", false);
      });
    },
    obtenerBtnCancelar() {
      this.btnCancelar = document.getElementById("btnCancelar");
    },
    obtenerListaHorariosLaboral() {
      axios.get(api_url + "/jornadas_laborales_diarias")
        .then(response => {
          this.listaHorarioLaboral = response.data;
        });
    },
    cargarCargoModificado() {
      this.cargoModificado = {
        id_cargo: this.cargo.id_cargo,
        nombre_cargo: this.cargo.nombre_cargo,
        salario_cargo: this.cargo.salario_cargo,
        descripcion_cargo: this.cargo.descripcion_cargo,
        id_jornada_laboral_diaria: this.cargo.id_jornada_laboral_diaria,
      };
    },
    guardarModificacionEmpleado(values) {
      console.log("El cargo es : " + this.cargoModificado);
      axios.put(api_url + "/cargos/" + this.cargoModificado.id_cargo, this.cargoModificado)
        .then((response) => {
          console.log(response.data);
          this.estadoConsulta = response.data.respuesta;

          if (this.estadoConsulta) {
            this.$emit("cerrarModal", true);
          }
          else {
            this.errorConsulta = true;
          }
        }).catch(
          response => {
            this.errorConsulta = true;
            this.mensajeConsulta = response.data;
          }

        );
    },
    validarCamposDeTexto(value) {
      if (!value) {
        return "Este campo no puede quedar vacío";
      }
      return true;
    },
    validarSalario(value) {
      if (!value) {
        console.log(isNaN(value));
        return "Ingrese un valor válido para el salario";
      }
      if (isNaN(value)) {
        return "Debe ingresar un dato de tipo numerico";
      }
      if (parseFloat(value) < 365) {
        return "No puede ingresar un dato menor al salario minimo";
      }

      return true;
    }
  }
}
</script>