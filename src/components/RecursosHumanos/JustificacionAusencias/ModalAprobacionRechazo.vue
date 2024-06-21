<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask bg-white">
      <div class="modal-container">
        <h1 class="text-2xl font-bold mb-6 text-center">
          {{ isAprobacion ? 'Aprobar' : 'Rechazar' }} solicitud
        </h1>
        <div class="mb-4 flex flex-row items-center justify-center">
          <p for="fecha_pedido text-center">
            ¿Está seguro que desea {{ isAprobacion ? 'aprobar' : 'rechazar' }} la solicitud?
          </p>
        </div>
        <div class="mb-4 flex flex-row items-center justify-center">
          <p class="text-center font-bold text-blue-950">Esta acción no podrá deshacerse.</p>
        </div>
        <div>
          <div class="text-center">
            <button
              @click="resolverSolicitud()"
              :class=" !isAprobacion ? 'bg-red-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-red-600 transition duration-300' : 'bg-[#13C296] text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-[#13C296] transition duration-300'"
            >
              Confirmar
            </button>
            <button
              id="btnCancelar"
              @click="$emit('cerrar')"
              class="ml-4 py-2 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
<script>
import axios from 'axios'
export default {
  props: ['id', 'show', 'isAprobacion'],
  methods: {
    resolverSolicitud() {
      this.watchLoader(true)
      axios
        .post(`/api/ausencias/justificaciones/cambiar-estado`, {
          id_estado: this.isAprobacion ? 2 : 3,
          id: this.id
        })
        .then((response) => {
          console.log(response, 'response')
          this.$emit('recargar')
          this.$emit('cerrar')
          const mensaje = this.isAprobacion
            ? 'Solicitud aprobada correctamente'
            : 'Solicitud rechazada correctamente'
          this.watchToast('success', mensaje)
        })
        .catch((error) => {
          this.watchLoader(false)
          console.error(error)
          this.watchToast(
            'error',
            'Error al ' + isAprobacion ? 'aprobar' : 'rechazar' + ' la solicitud'
          )
        })
        .finally(() => {
          this.watchLoader(false)
        })
    }
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 500px;
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
