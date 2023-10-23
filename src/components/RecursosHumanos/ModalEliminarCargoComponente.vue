<script setup>
import api_url from "../../config"
</script>

<template>
    <Transition name="modal">
        <div class="modal-mask bg-white">
            <div class="modal-container">
                <main>
                    <div class="mb-4">
                        <h1 class="text-2xl font-bold mb-6 text-left">Eliminar Cargo</h1>
                        <p class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            id="nombre_cargo" name="nombre_cargo"> {{ cargoModificado.nombre_cargo }}</p>
                    </div>
                    <div class="mb-4">
                        <p class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            id="salario_cargo" name="salario_cargo"> {{ cargoModificado.salario_cargo }}</p>
                    </div>
                    <div class="mb-4">
                        <Field as="textarea" name="descripcion_cargo" id="chat" v-model="cargoModificado.descripcion_cargo"
                            rows="1"
                            class="block mx-0 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 
        dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Descripción Cargo" disabled />
                    </div>
                    <div class="mb-4">
                        <p
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500">
                            Hora entrada: {{ jornada.hora_inicio }} Hora salida: {{ jornada.hora_fin }}
                        </p>
                    </div>
                    <div class="text-center">
                        <button
                            class="bg-red-600 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
                            @click="eliminarCargo">Eliminar</button>
                        <button id="btnCancelar"
                            class=" ml-4 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            @click="cancelar"> Cancelar</button>
                    </div>
                </main>
            </div>
        </div>
    </Transition>
</template>

<script>
import { Field } from 'vee-validate';
import axios from 'axios';
import '../../assets/modal_default.css';
//cambiar el nombre de las variables 
export default {
    components: {
        Field,
    },
    data() {
        return {
            cargoModificado: {},
            jornada: {},
        }
    },
    props: ["cargo"],
    mounted() {
        this.cargarCargoModificado();
        this.obtenerJornadaLaboral();
    },
    methods: {
        cargarCargoModificado() {
            this.cargoModificado = {
                id_cargo: this.cargo.id_cargo,
                nombre_cargo: this.cargo.nombre_cargo,
                salario_cargo: this.cargo.salario_cargo,
                descripcion_cargo: this.cargo.descripcion_cargo,
                id_jornada_laboral_diaria: this.cargo.id_jornada_laboral_diaria,
            };
        },
        cancelar() {
            this.$emit("cerrarModalEliminar", false, null);
        },
        obtenerJornadaLaboral() {
            axios.get(api_url + "/jornadas_laborales_diarias/" + this.cargo.id_jornada_laboral_diaria)
                .then(response => {
                    this.jornada = response.data.jornada
                })
                .catch(
                    error => {
                        console.log(error);
                    }
                );
        },
        eliminarCargo() {
            axios.delete(api_url + "/cargos/" + this.cargo.id_cargo).then(
                response => {
                    if (response.data.respuesta) {
                        this.$emit("cerrarModalEliminar", response.data.respuesta, this.cargo.id_cargo);
                    }
                }
            ).catch(
                error => {
                    console.log(error);
                }
            );
        }
    }
}
</script>