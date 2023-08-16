<script setup>
import { RouterLink } from 'vue-router';
import NavBar from '../../components/NavBar.vue'
import api_url from '../../config.js'
import { CalendarIcon } from '@heroicons/vue/24/outline'

</script>

<template>
    <main>
        <NavBar></NavBar>
        <div class="bg-slate-100 pb-4 min-h-screen grid">
            <div class = "bg-white w-full mx-auto p-5 h-fit shadow-md">
                <h1 class="font-bold text-blue-700 text-2xl " >Registro de asistencia</h1>
            </div>
            <div class="grid place-items-center h-max w-full">
                <div class="container grid lg:grid-cols-2 gap-4 max-w-2xl m-auto">
                    <div class="col-span-1 w-full m-auto">
                        <div class="">
                            <h3 class="text-center">Usuario</h3>
                        </div>
                        <div class="bg-white text-center rounded-md shadow p-6">
                            <div><span class="font-bold text-lg">{{ nombre }} Luis Rivas</span></div>
                            <div class=""><span>Cajero</span></div>
                            <div class="flex flex-col px-4 py-6">
                                <div class=" flex flex-col text-center justify-center align-middle mb-4">
                                    <div class="w-full justify-center">
                                        <CalendarIcon class="inline-block h-8 w-8"></CalendarIcon>
                                    </div>
                                    <span class="font-semibold">{{ getFechaSpanish(fecha) }}</span>
                                </div>
                                <button type="button" @click="marcarAsistencia" class="bg-blue-500 hover:bg-blue-700 text-white rounded px-2 py-2 my-2">Marcar asistencia</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-span-1 w-full m-auto shadow-sm">
                        <div class="">
                            <h3 class="text-center">Historial de asistencias</h3>
                        </div>
                        <div class="bg-white text-center">
                            Hola
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import axios from 'axios';

const fechaActual = new Date();

export default {

    data(){
        return{
            fecha: new Date(),
            id_empleado: 2,
            mensajes:[]
        }
    }, 
    mounted(){

    },
    methods:{
        getFechaSpanish(fecha){
            const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
            const dias_semana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'S ábado'];
            return dias_semana[fecha.getDay()] +', ' + fecha.getDate() +' de '+meses[fecha.getMonth()] +' de '+fecha.getUTCFullYear(); 
        },
        marcarAsistencia(){
            const params = {
                id_empleado : this.id_empleado,
            }
            axios.post(api_url+'/asistencia',params)
            .then(
                this.mensajes = response.data.mensaje
            )
        }
    }

}

</script>