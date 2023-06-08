<script setup>
import {Field,ErrorMessage} from 'vee-validate';
</script>

<template>

<Form class="max-w-[100%]  mx-auto lg:max-w-[45%] bg-white p-3 rounded-md shadow-md z-999 fixed top-20 left-0 right-0" @submit="agregarPrecioExtra()">

  <div class="grid grid-cols-1 md:grid-cols-4 gap-[2%]">
      <div class="col-span-3">
        <div>
          <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seleccione una unidad de medida</label>

      <Field as = "select" 
      class="max-w-[100%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-[5%]"
      v-model="precioExtra.idUnidadMedida">
        <option selected>Choose a country</option>
        <option value="1">United States</option>
        <option value="2">Canada</option>
        <option value="3">France</option>
        <option value="4">Germany</option>
      </Field>

        </div>
        <div class = "grid grid-cols-2 gap-4">
            <div>
              <label for="Precio">Precio</label>
              <Field name="Precio" v-model = "precioExtra.precio" type = "number" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" />
            </div>
            <div>
              <label for="canitdad">Cantidad</label>
              <Field v-model = "precioExtra.cantidad" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" type="number"/>
            </div>
        </div>
      </div>

    <div class="col-span=1">
        <button type="button" 
        class="display:inline-block mt-[0%] mb-[5%]  md:mt-[12%]  md:w-full md:mb-[0%] lg:mt-[20%] md:block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        @click="guardarPrecioExtra">
            Guardar Medida
        </button>
        <button type="button" 
        class=" display:inline-block mt-[0%] mb-[5%]  md:mt-[26%]  md:w-full md:mb-[0%]  lg:mt-[28%] md:block focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        @click="cerrarModal">
            Cancelar
        </button>
    </div>
  </div>

</Form>

</template>
<script>

export default {
 
  data(){
    return{
      precioExtra:{
        idUnidadMedida: 0,
        precio : 0,
        cantidad: 0,
      },
    }
  },
  methods:{
    cerrarModal(){
      this.$emit("controlEventoModal",null);
    },
    guardarPrecioExtra(){
      this.$emit("controlEventoModal",this.precioExtra);
    },
    agregarPrecioExtra(){
      console.log("Hola mundo");
    }
  }
}

</script>
