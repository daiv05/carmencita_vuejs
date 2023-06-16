<template>
    <div class="">
      <div class="flex justify-center">
        <button @click="isOpen = true" class="w-[100%] text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-[30px] text-sm px-5 py-2.5 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800" type="button" v-if="estado==0">
          Activar
        </button>
        <button @click="isOpen = true" class="w-[100%] text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-[30px] text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-800" type="button" v-if="estado==1">
          Anular
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
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div class="flex items-center justify-between">
                <div class="w-full flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                </div>
            </div>
            <div class="text-center flex justify-center">
                
            </div>
            <div class="flex items-center justify-between">
              <h3 class="text-2xl text-center w-full" v-if="estado">Anular venta de credito fiscal?</h3>
              <h3 class="text-2xl text-center w-full" v-if="!estado">¿Activar venta de credito fiscal?</h3>
            </div>
            <div class="mt-4 text-center">
              <p class="mb-4 text-lg text-center" v-if="estado">
                La venta de credito fiscal se anulara y no se podrá recuperar. Los detalles asociados a esta venta serán desactivados.
              </p>
              <p class="mb-4 text-lg text-center" v-if="!estado">
                La venta de credito fiscal se activara y se podrá recuperar. Los detalles asociados a esta venta serán activados.
              </p>
                <div v-if="estado">
                    <button @click="isOpen = false" class="px-6 py-2 text-red-800 border border-red-500 rounded">
                        Cancelar
                    </button>
                    <button class="px-6 py-2 ml-2 text-white bg-red-500 rounded" @click="desactivarVenta()" type="button">
                        Anular
                    </button>
                </div>
                <div v-if="!estado">
                    <button @click="isOpen = false" class="px-6 py-2 text-blue-800 border border-blue-500 rounded">
                        Cancelar
                    </button> 
                    <button class="px-6 py-2 ml-2 text-white bg-blue-500 rounded" type="button" @click="desactivarVenta()">
                        Activar
                    </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

  <script>
  import axios from 'axios';
  import api_url from '../../config.js';

  export default{
    props:{
            id:null,
            estado:null,
    },
    data() {
      return {
        error:[],
        isOpen: false,
        estatus: false,
      };
    },
    methods:{
        desactivarVenta(){
            //alert('http://127.0.0.1:8000/api/empleado_activo/'+this.id);
            axios.put(api_url+'/creditos/updateEstado/'+this.id).then(
                    response => {
                        this.error = response.data;
                        this.estatus = response.data['status'];
                        if (this.estatus){
                            document.location.reload();

                            // Recargar la página automáticamente
                            //window.location.reload(true);
                        }
                    }
                );
           this.isOpen = false;
        }
    }
  };
  </script>