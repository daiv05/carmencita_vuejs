<template>
  <div class="card flex justify-content-center">
    <Dialog v-model:visible="visible" modal :style="{ width: width}" :draggable="false"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" :closable="false"
            class="bg-white rounded-lg border border-black">
      <div class=" flex items-center justify-center mb-2 mt-3">
        <h1 class="text-[1.4em] font-bold text-primary-300 text-center  md:leading-[60px]">
          {{ accionAprobar ? '¿Desea aprobar la incapacidad?' : '¿Desea rechazar la incapacidad?' }}
        </h1>
      </div>
      <slot name="contenido">
        <p class="flex justify-center text-[100px]">
      <span :style="accionAprobar ? 'color: green' : 'color: red'">
        {{ accionAprobar ? '✔️' : '❌' }}
      </span>
        </p>
      </slot>
      <div class="flex justify-center items-center space-x-0 lg:space-x-5 flex-col lg:flex-row mt-8 mb-3">
        <slot name="footer">
          <button class="border bg-white px-20 py-2 rounded mb-5" @click="$emit('close')">Cerrar</button>
          <button v-if="accionAprobar" class="border bg-green-500 px-20 py-2 rounded mb-5 text-white"
                  @click="cambiarEstadoIncapacidad(2)">Aprobar
          </button>
          <button v-else class="border bg-red-500 px-20 py-2 rounded mb-5 text-white"
                  @click="cambiarEstadoIncapacidad(3)">
            Rechazar
          </button>
        </slot>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue'
import Dialog from 'primevue/dialog'
import axios from 'axios'

const visible = ref(false)
const emit = defineEmits(['actualizarIncapacidades'])

const props = defineProps({
  width: {
    type: String,
    default: '60rem'
  },
  show: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object,
    // eslint-disable-next-line vue/require-valid-default-prop
    default: {},
    required: false
  },
  accionAprobar: {
    type: Function,
    default: false
  }
})
onMounted(() => {
  visible.value = props.show
})

const cambiarEstadoIncapacidad = (estadoCambiar) => {
  axios.post('api/incapacidades/estado', { id_estado: estadoCambiar, id: props.data.id }, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      console.log(response.data)
      emit('actualizarIncapacidades')  // Emitir el evento
    })
    .catch(error => {
      console.error(error)
    })
}


</script>

<style>
.p-dialog-mask {
  background-color: rgba(0, 0, 0, 0.5) !important; /* Ajusta el último valor para cambiar la transparencia */
}

#modal-content .p-datepicker {
  top: 0px !important;
  left: 7% !important;
}

.p-overflow-hidden {
  overflow: hidden !important;
}

@media screen and (max-width: 450px) {
  #modal-content .p-datepicker {
    top: 0px !important;
    left: 0px !important;
  }
}
</style>