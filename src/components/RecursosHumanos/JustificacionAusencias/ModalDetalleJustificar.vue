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
          <p v-if="!isGerente" class="text-center text-slate-400">
            Fecha: {{ $moment().format('DD/MM/YYYY') }}
          </p>
          <p v-if="isGerente" class="text-center mt-4 font-bold text-slate-700">
            {{ nombreEmpleado }}
          </p>
          <p class="text-left text-slate-600 font-semibold mt-4">
            Ausencia: {{ $moment(ausenciaData.ausencia.fecha_ausencia).format('DD/MM/YYYY') }}
          </p>
          <!-- Textarea Justificacion -->
          <div class="mt-4">
            <label for="justificacion" class="block text-sm text-slate-600"
              >Justificación <span class="text-red-800">*</span></label
            >
            <textarea
              :readonly="isGerente || ausenciaData?.estado?.nombre != 'Pendiente'"
              v-model="ausenciaData.justificacion"
              id="justificacion"
              name="justificacion"
              rows="3"
              class="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border border-slate-300 rounded-md"
            ></textarea>
          </div>
          <!-- File Upload -->

          <div v-if="!isGerente">
            <div
              v-if="!editMode || (changeArchive && ausenciaData?.estado?.nombre == 'Pendiente')"
              class="mt-4"
            >
              <label for="comprobante" class="block text-sm text-slate-600">Comprobante</label>
              <input
                ref="fileComprobante"
                @change="handleFileUpload"
                id="comprobante"
                :disabled="ausenciaData?.estado?.nombre != 'Pendiente'"
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
                  @click="ausenciaData.comprobante ? verComprobante() : null"
                  class="mt-1 block md:w-[30%] w-[90%] shadow-sm sm:text-sm rounded-md cursor-pointer underline"
                >
                  {{ ausenciaData.comprobante ? 'Ver comprobante' : 'Sin comprobante' }}
                </label>
                <XCircleIcon @click="changeArchive = true" class="h-6 w-6 cursor-pointer" />
              </div>
            </div>
          </div>

          <div v-if="isGerente">
            <div class="w-full grid my-8">
              <label for="comprobanteVer" class="block text-sm text-slate-600">Comprobante</label>
              <div class="w-full flex flex-row items-center">
                <label
                  @click="ausenciaData.comprobante ? verComprobante() : null"
                  class="mt-1 block md:w-[30%] w-[90%] shadow-sm sm:text-sm rounded-md cursor-pointer underline"
                >
                  {{ ausenciaData.comprobante ? 'Ver comprobante' : 'Sin comprobante' }}
                </label>
              </div>
            </div>
            <!-- Select para aprobar/rechazar solicitud -->
            <div class="mt-4 flex flex-col justify-center text-center md:mx-16">
              <label for="estado" class="block text-sm text-slate-600">Estado</label>
              <select
                v-model="estadoUpdate"
                id="estado"
                name="estado"
                class="mt-1 block w-full py-2 border border-slate-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option selected disabled value="1">Pendiente</option>
                <option value="2">Aprobar</option>
                <option value="3">Rechazar</option>
              </select>
            </div>
          </div>
        </div>
      </template>
      <template #acciones>
        <div class="justify-center flex flex-row">
          <button
            v-if="!isGerente && ausenciaData?.estado?.nombre == 'Pendiente'"
            @click="enviarSolicitud"
            class="ma-4 bg-indigo-700 hover:bg-indigo-900 text-white w-32 rounded-lg px-2 py-2 mx-2 mt-4"
          >
            Actualizar
          </button>
          <button
            v-if="isGerente"
            @click="cambiarEstadoSolicitud"
            class="ma-4 bg-indigo-700 hover:bg-indigo-900 text-white w-32 rounded-lg px-2 py-2 mx-2 mt-4"
          >
            Enviar
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
    justificacion: {
      type: Object,
      default: () => ({})
    },
    isGerente: {
      type: Boolean,
      default: false
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
      estadoUpdate: 1,
      nombreEmpleado: ''
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
            comprobante: this.ausenciaData.comprobante
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
          this.urlComprobante = url
          this.showComprobante = true
        })
        .catch((error) => {
          this.watchLoader(false)
          console.error(error)
        })
        .finally(() => {
          this.watchLoader(false)
        })
    },
    enviarSolicitud() {
      this.watchLoader(true)
      if (this.ausenciaData.justificacion === '') {
        this.watchToast('error', 'La justificación es requerida')
        this.watchLoader(false)
        return
      }
      const formData = new FormData()
      formData.append('justificacion', this.ausenciaData.justificacion)
      this.changeArchive ? formData.append('comprobante', this.fileComprobante) : null
      axios
        .post(`/api/ausencias/justificar/` + this.ausenciaData.id, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
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
    },
    cambiarEstadoSolicitud() {
      this.watchLoader(true)
      axios
        .post(`/api/ausencias/justificaciones/cambiar-estado`, {
          id_estado: this.estadoUpdate,
          id: this.ausenciaData.id
        })
        .then((response) => {
          console.log(response, 'response')
          this.$emit('recargar')
          this.$emit('update:modelValue', false)
          const mensaje =
            this.estadoUpdate == 2
              ? 'Solicitud aprobada correctamente'
              : 'Solicitud rechazada correctamente'
          this.watchToast('success', mensaje)
        })
        .catch((error) => {
          console.error(error)
          this.watchToast('error', 'Error al actualizar la solicitud')
        })
        .finally(() => {
          this.watchLoader(false)
        })
    }
  },
  created() {
    this.editMode = true
    this.ausenciaData = this.justificacion
    if (this.isGerente) {
      this.nombreEmpleado =
        this.justificacion.ausencia.empleado.primer_nombre +
        ' ' +
        this.justificacion.ausencia.empleado.primer_apellido
    }
    this.estadoUpdate = this.justificacion.estado.id
    console.log(this.justificacion)
  }
}
</script>
