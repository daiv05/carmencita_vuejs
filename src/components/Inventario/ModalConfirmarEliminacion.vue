<template>
    <div class="modal-mask">
    <main class="z-999 fixed top-[20%] left-0 right-0 modal-content w-[30%] m-auto">
    <div class="bg-white p-8 rounded shadow-md m-auto">
        <h2 class="text-lg font-semibold mb-4">Confirmar Eliminación</h2>
        <p class="mb-4">{{ mensaje }}</p>
        <div class="flex justify-end">
            <button id="cancelButton" @click="cancelarEliminacion" class="px-4 py-2 text-gray-500 hover:text-gray-700">Cancelar</button>
            <button id="confirmButton" @click="eliminarLote"  class="px-4 py-2 ml-2 bg-red-500 text-white rounded hover:bg-red-600">Eliminar</button>
        </div>
    </div>
</main>
</div>
</template>
<script>
import axios from "axios";
export default {
    props:{
        urlEndpoint:String,
        mensaje:String,
    },   
    data(){
        return{

        }
    },
    methods:{
        eliminarLote(){
            axios.delete(this.urlEndpoint)
            .then(
              (response)=>{
                this.$emit("cerrarModalEliminacion",response.data.mensaje);
              }
            )
            .catch(
                (response)=>{
                    console.log(response);
                }
            );
        },
        cancelarEliminacion(){
            this.$emit("cerrarModalEliminacion");
        }
    }
}
</script>

<style scoped>
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
.modal-content{
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  border-radius: 10px;
  transition: all 0.3s ease;
}
</style>