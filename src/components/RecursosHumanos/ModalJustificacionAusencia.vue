<template>
  <v-modal-dialog
    v-if="modelValue"
    :show="modelValue"
    :titulo="titulo"
    @cerrar="$emit('update:modelValue', false)"
  >
    <template #contenido>
      <div v-if="ausenciaData">
        <p class="text-center text-slate-400">Fecha: {{ $moment().format('DD/MM/YYYY') }}</p>
        <p class="text-left text-slate-600 font-semibold mt-4">
          Ausencia: {{ $moment(ausenciaData.fecha_ausencia).format('DD/MM/YYYY') }}
        </p>
        <!-- Textarea Justificacion -->
        <div class="mt-4">
          <label for="justificacion" class="block text-sm text-slate-600">Justificación</label>
          <textarea
            v-model="ausenciaData.justificacion_ausencia.justificacion"
            id="justificacion"
            name="justificacion"
            rows="3"
            class="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border border-slate-300 rounded-md"
          ></textarea>
        </div>
        <!-- File Upload -->
        <div v-if="!editMode || changeArchive" class="mt-4">
          <label for="comprobante" class="block text-sm text-slate-600">Comprobante</label>
          <input
            ref="fileComprobante"
            @change="handleFileUpload"
            id="comprobante"
            name="comprobante"
            type="file"
            accept="application/pdf"
            class="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border border-slate-300 rounded-md"
          />
        </div>
        <div v-else class="w-full grid my-8">
          <label for="comprobanteVer" class="block text-sm text-slate-600">Comprobante</label>
          <div class="w-full flex flex-row items-center">
            <input
              @click="verComprobante"
              id="comprobanteVer"
              name="comprobanteVer"
              value="Ver archivo"
              type="text"
              class="mt-1 block md:w-[60%] w-[90%] shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border border-slate-300 rounded-md cursor-pointer"
              readonly
            />
            <XMarkIcon @click="changeArchive = true" class="h-6 w-6 cursor-pointer" />
          </div>
        </div>
      </div>
    </template>
    <template #acciones>
      <div class="justify-center flex flex-row">
        <button
          @click="enviarSolicitud"
          class="ma-4 bg-indigo-700 hover:bg-indigo-900 text-white w-32 rounded-lg px-2 py-2 mx-2 mt-4"
        >
          Guardar
        </button>
        <button
          class="ma-4 bg-red-700 hover:bg-red-900 text-white w-32 rounded-lg px-2 py-2 mx-2 mt-4"
          @click="$emit('update:modelValue', false)"
        >
          Cerrar
        </button>
      </div>
    </template>
  </v-modal-dialog>
</template>

<script>
import VModalDialog from '@/components/VModalDialog.vue'
import moment from 'moment'
import axios from 'axios'
import { XMarkIcon } from '@heroicons/vue/24/solid'
export default {
  components: {
    VModalDialog,
    XMarkIcon
  },
  props: {
    modelValue: Boolean,
    titulo: {
      type: String,
      default: ''
    },
    ausencia: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      ausenciaData: {
        fecha_ausencia: moment().format('YYYY-MM-DD'),
        justificacion_ausencia: {
          justificacion: '',
          comprobante: ''
        }
      },
      editMode: false,
      changeArchive: false,
      fileComprobante: null
    }
  },
  methods: {
    handleFileUpload(e) {
      this.fileComprobante = e.target.files[0]
    },
    verComprobante() {
      this.watchLoader(true)
      axios
        .post(
          '/api/ausencias/comprobante',
          {
            comprobante: this.ausencia.justificacion_ausencia.comprobante
          },
          {
            responseType: 'blob'
          }
        )
        .then((response) => {
          console.log(response)
          const url = window.URL.createObjectURL(
            new Blob([response.data], { type: 'application/pdf' })
          )
          // Abrir pdf en nueva pesta;a
          window.open(url)
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          this.watchLoader(false)
        })
    },
    enviarSolicitud() {
      this.watchLoader(true)
      if (this.ausenciaData.justificacion_ausencia.justificacion === '') {
        this.watchToast('error', 'La justificación es requerida')
        this.watchLoader(false)
        return
      }
      const formData = new FormData()
      formData.append('justificacion', this.ausenciaData.justificacion_ausencia.justificacion)
      formData.append('id_ausencia', this.ausencia.id)
      formData.append('fecha_solicitud', moment().format('YYYY-MM-DD'))
      formData.append('comprobante', this.fileComprobante)
      axios
        .post('/api/ausencias/justificar', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(() => {
          this.$emit('recargar')
          this.$emit('update:modelValue', false)
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          this.watchLoader(false)
        })
    }
  },
  created() {
    if (this.ausencia?.justificacion_ausencia?.justificacion) {
      this.editMode = true
      this.ausenciaData = this.ausencia
    }
  }
}
</script>
