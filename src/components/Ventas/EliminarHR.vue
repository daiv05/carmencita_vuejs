<template>
  <div>
    <div class="flex justify-center">
      <button
        @click="isOpen = true"
        class="w-[100%] text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-[30px] text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-800"
        type="button"
      >
        Eliminar HR
      </button>
      <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
        <div class="max-w-2xl p-6 bg-white rounded-md shadow-xl">
          <div class="flex justify-end">
            <svg
              @click="isOpen = false"
              xmlns="http://www.w3.org/2000/svg"
              class="w-8 h-8 text-red-900 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <!-- ... (ícono de cierre del modal) ... -->
            </svg>
          </div>
          <div class="flex items-center justify-between">
            <div class="w-full flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <!-- ... (ícono relacionado con eliminar) ... -->
              </svg>
            </div>
          </div>
          <div class="text-center flex justify-center">
            <!-- ... (contenido opcional) ... -->
          </div>
          <div class="mt-4 text-center">
            <p class="mb-4 text-lg text-center">
              ¿Estás seguro de que deseas eliminar esta hoja de ruta? Esta acción no se puede
              deshacer.
            </p>
            <div>
              <button
                @click="isOpen = false"
                class="px-6 py-2 text-red-800 border border-red-500 rounded"
              >
                Cancelar
              </button>
              <button
                class="px-6 py-2 ml-2 text-white bg-red-500 rounded"
                @click="eliminarHojaDeRuta()"
                type="button"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import api_url from '../../config.js'

export default {
  props: {
    id: null
  },
  data() {
    return {
      error: [],
      isOpen: false
    }
  },
  methods: {
    eliminarHojaDeRuta() {
      axios
        .delete(api_url + '/hojaruta_delete/' + this.id)
        .then((response) => {
          this.error = response.data
          if (response.data.status) {
            // Acciones después de una eliminación exitosa
          }
          this.isOpen = false
          window.location.reload()
        })
        .catch((error) => {
          console.error('Error al eliminar hoja de ruta:', error)
          // Puedes mostrar un mensaje al usuario o tomar alguna otra acción aquí
          // Por ejemplo: this.errorMessage = 'Hubo un error al eliminar la hoja de ruta.';
        })
    }
  }
}
</script>
