<template>

<!-- component -->

    <form class="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md z-999 fixed top-20 left-0 right-0">
        <h1 class="text-2xl font-bold mb-6 text-left">Editar cargo</h1>
      <div class="mb-4">
        <input class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          type="text" id="name" name="name" placeholder="Nombre Cargo" v-model="cargo.nombre_cargo">
      </div>
      <div class="mb-4">
        <input class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          type="number" id="email" name="email" placeholder="Sueldo del cargo" step="0.01" v-model = "cargo.salario_cargo">
      </div>
      <div class="mb-4">
        <textarea id="chat" v-model="cargo.descripcion_cargo" rows="1"  class="block mx-0 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Descripción Cargo">
        </textarea>
      </div>
      <div class="mb-4">
        <label for="horario" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select un horario</label>
        <select id="horario" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="valorSelect">
        <option v-for="jornada in listaHorarioLaboral" v-bind:key="jornada.id_jornada_laboral_diaria"  :value="jornada.id_jornada_laboral_diaria">Hora entrada: {{ jornada.hora_inicio }} Hora salida: {{ jornada.hora_fin }}</option>
        </select>
      </div>
      <div class="text-center">
        <button
        class="bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
         >Guardar</button>
        <button id="btnCancelar" class=" ml-4 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"> Cancelar</button>
      </div>
      {{ valorSelect }}
      {{ cargo.nombre_cargo }}
    </form>
</template>

<script>
import axios from 'axios';
export default {
        data(){
            return{
                btnCancelar:null,
                valorSelect : "Seleccione un horario para el cargo",
                listaHorarioLaboral : [],
            }
        },  
        props:["cargo"],
        mounted(){
            this.obtenerListaHorariosLaboral();
            this.obtenerBtnCancelar();
            this.cancelar();
        },
        methods:{
            cancelar(){
                this.btnCancelar.addEventListener("click",(event)=>{
                    event.preventDefault();
                    console.log("Si funciona el click");
                    this.$emit("cerrarModal");
                });
            },
            obtenerBtnCancelar(){
                this.btnCancelar = document.getElementById("btnCancelar");
            },
            obtenerListaHorariosLaboral(){
                axios.get("http://127.0.0.1:8000/api/jornadas_laborales")
                .then(response=>{
                    this.listaHorarioLaboral = response.data;
                });
            },
        }
}
</script>