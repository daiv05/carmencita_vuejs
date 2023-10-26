<template>
    <Transition name="modal">
        <div class="modal-mask bg-white">
            <main class="modal-container">
                <h2 class="text-lg text-center font-semibold mb-4">Confirmar Eliminación</h2>
                <p class="mb-4 text-center">{{ mensaje }}</p>
                <div class="flex justify-end">
                    <button id="cancelButton" @click="cancelarEliminacion"
                        class="px-4 py-2 text-gray-500 hover:text-gray-700">Cancelar</button>
                    <button id="confirmButton" @click="eliminarLote"
                        class="px-4 py-2 ml-2 bg-red-500 text-white rounded hover:bg-red-600">Eliminar</button>
                </div>
            </main>
        </div>
    </Transition>
</template>
<script>
import axios from "axios";
import '../../assets/modal_default.css';
import {showMessages} from '../../components/functions.js'

export default {
    props: {
        urlEndpoint: String,
        mensaje: String,
    },
    data() {
        return {

        }
    },
    methods: {
        eliminarLote() {
            axios.delete(this.urlEndpoint)
                .then(
                    (response) => {
                        this.$emit("cerrarModalEliminacion", response.data.mensaje);
                        showMessages(response.data.status,response.data.mensaje)
                    }
                )
                .catch(
                    (error) => {
                        showMessages(error.response.data.status,error.response.data.mensaje)
                    }
                );
        },
        cancelarEliminacion() {
            this.$emit("cerrarModalEliminacion");
        }
    }
}
</script>

<style scoped>
.modal-container {
  width: 350px;
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}
</style>