<template>
  <div>
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
            <label for="justificacion" class="block text-sm text-slate-600"
              >Justificación <span class="text-red-800">*</span></label
            >
            <textarea
              :readonly="!isNoJustificacion && ausencia?.justificacion_ausencia?.estado?.nombre != 'Pendiente'"
              v-model="ausenciaData.justificacion_ausencia.justificacion"
              id="justificacion"
              name="justificacion"
              rows="3"
              class="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border border-slate-300 rounded-md"
            ></textarea>
          </div>
          <!-- File Upload -->
          <div
            v-if="
              isNoJustificacion || (changeArchive && ausencia?.justificacion_ausencia?.estado?.nombre == 'Pendiente')
            "
            class="mt-4"
          >
            <label for="comprobante" class="block text-sm text-slate-600">Comprobante</label>
            <input
              ref="fileComprobante"
              @change="handleFileUpload"
              id="comprobante"
              :disabled="!isNoJustificacion && ausencia.justificacion_ausencia?.estado?.nombre != 'Pendiente'"
              name="comprobante"
              type="file"
              accept="application/pdf"
              class="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border border-slate-300 rounded-md"
            />
          </div>
          <div v-else class="w-full grid my-8">
            <label for="comprobanteVer" class="block text-sm text-slate-600">Comprobante</label>
            <div class="w-full flex flex-row items-center">
              <label
                @click="ausencia?.justificacion_ausencia?.comprobante ? verComprobante() : null"
                class="mt-1 block md:w-[30%] w-[90%] shadow-sm sm:text-sm rounded-md cursor-pointer underline"
              >
                {{ ausencia?.justificacion_ausencia?.comprobante ? 'Ver comprobante' : 'Sin comprobante' }}
              </label>
              <XCircleIcon @click="changeArchive = true" class="h-6 w-6 cursor-pointer" />
            </div>
          </div>
        </div>
      </template>
      <template #acciones>
        <div class="text-center">
          <button
            v-if="isNoJustificacion || ausencia?.justificacion_ausencia?.estado?.nombre == 'Pendiente'"
            @click="enviarSolicitud"
            class="ma-4 bg-indigo-700 hover:bg-indigo-900 text-white w-32 rounded-lg px-2 py-2 mx-2 mt-4"
          >
            {{ editMode ? 'Actualizar' : 'Solicitar' }}
          </button>
          <button
            class="ml-4 py-2 px-8 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
            @click="$emit('update:modelValue', false)"
          >
            Cerrar
          </button>
        </div>
      </template>
    </v-modal-dialog>
    <VPdfViewer v-if="showComprobante" :url="urlComprobante" @cerrar="showComprobante = false" />
  </div>
</template>

<script>
import VModalDialog from '@/components/VModalDialog.vue'
import VPdfViewer from '@/components/VPdfViewer.vue'
import moment from 'moment'
import axios from 'axios'
import { XCircleIcon } from '@heroicons/vue/24/outline'
export default {
  components: {
    VModalDialog,
    VPdfViewer,
    XCircleIcon
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
      fileComprobante: null,
      showComprobante: false,
      urlComprobante: '',
      isNoJustificacion: false
    }
  },
  methods: {
    handleFileUpload(e) {
      this.fileComprobante = e.target.files[0]
      this.changeArchive = true
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
          this.urlComprobante = url
          this.showComprobante = true
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

      if (this.editMode) {
        const formData = new FormData()
        formData.append('justificacion', this.ausenciaData.justificacion_ausencia.justificacion)
        this.changeArchive ? formData.append('comprobante', this.fileComprobante) : null
        axios
          .post(
            `/api/ausencias/justificar/` + this.ausenciaData.justificacion_ausencia.id,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
          )
          .then((response) => {
            console.log(response, 'response')
            this.$emit('recargar')
            this.$emit('update:modelValue', false)
            this.watchToast('success', 'Solicitud actualizada correctamente')
          })
          .catch((error) => {
            console.error(error)
            this.watchToast('error', 'Error al actualizar la solicitud')
          })
          .finally(() => {
            this.watchLoader(false)
          })
      } else {
        const formData = new FormData()
        console.log('ssssss')
        formData.append('justificacion', this.ausenciaData.justificacion_ausencia.justificacion)
        formData.append('id_ausencia', this.ausencia.id)
        formData.append('fecha_solicitud', moment().format('YYYY-MM-DD'))
        formData.append('comprobante', this.fileComprobante)
        console.log(formData)
        axios
          .post('/api/ausencias/justificar', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then((response) => {
            console.log(response, 'response')
            this.$emit('recargar')
            this.$emit('update:modelValue', false)
            this.watchToast('success', 'Solicitud enviada correctamente')
          })
          .catch((error) => {
            console.error(error)
            this.watchToast('error', 'Error al enviar la solicitud')
          })
          .finally(() => {
            this.watchLoader(false)
          })
      }
    }
  },
  created() {
    if (this.ausencia.justificacion_ausencia == null) {
      this.isNoJustificacion = true
    } else {
      this.editMode = true
      this.ausenciaData = this.ausencia
    }
  }
}
</script>
