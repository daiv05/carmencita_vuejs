<script setup>
import NavBar from '@/components/NavBar.vue'
</script>

<template>
  <main>
    <NavBar></NavBar>
    <div class="bg-slate-100 pb-4 min-h-screen grid">
      <div>
        <div class="flex bg-white mx-auto p-5 shadow-md justify-between">
          <h1 class="font-bold text-blue-700 text-xl">Historial de asistencia</h1>
        </div>
        <div class="flex justify-start items-center mt-4 ml-4">
          <a
            href="#"
            @click="$router.go(-1)"
            class="text-sm text-black font-medium flex items-center"
          >
            <img src="@/assets/icons/arrow.svg" alt="Regresar" class="h-6 w-6 mr-1" /> Regresar
          </a>
        </div>
      </div>

      <section class="bg-gray-100">
        <section class="container mx-auto p-6 z-900">
          <div class="md:w-[85%] w-auto p-4 mx-auto bg-white shadow rounded-md overflow-auto">
            <table class="table w-full max-h-screen rounded-md">
              <thead class="border-b bg-slate-100">
                <tr class="text-center uppercase">
                  <th class="px-6 py-4 text-xs text-gray-500 font-semibold">Nombre</th>
                  <th class="px-6 py-4 text-xs text-gray-500 font-semibold">Cargo</th>
                  <th class="px-6 py-4 text-xs text-gray-500 font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="text-center"
                  v-for="empleado in listaEmpleados"
                  v-bind:key="empleado.id_empleado"
                >
                  <td class="px-4 py-3 text-ms font-semibold text-center">
                    {{ empleado.primer_nombre }} {{ empleado.segundo_nombre }}
                  </td>
                  <td class="px-4 py-3 text-ms font-semibold text-center">{{ empleado.cargo }}</td>
                  <td class="px-4 py-3 text-xs text-center">
                    <RouterLink
                      class="bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
                      v-bind:to="'/consultar_asistencia/' + empleado.id_empleado"
                      >Consultar Asistencia
                    </RouterLink>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </div>
  </main>
</template>

<script>
import axios from 'axios'
export default {
  components: {
  },
  data() {
    return {
      listaEmpleados: [],
    }
  },
  mounted() {
  },
  created() {
    this.obtenerListaEmpleados()
  },
  methods: {
    obtenerListaEmpleados() {
      this.watchLoader(true)
      axios
        .get('/api/empleados')
        .then((response) => {
          this.listaEmpleados = response.data.data
          console.log(this.listaEmpleados)
          this.watchLoader(false)
        })
        .catch((response) => {
          console.log(response)
          this.watchLoader(false)
        })
    }
  }
}
</script>
