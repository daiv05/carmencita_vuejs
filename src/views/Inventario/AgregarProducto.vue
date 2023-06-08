<script setup>
import ModalPrecioExtra from "../../components/Inventario/ModalPrecioExtra.vue";
import NavBar from "../../components/NavBar.vue";
import {Form,Field,ErrorMessage} from 'vee-validate';
</script>
<template>
    <main>
        <NavBar></NavBar>
        <div class = "container mx-auto p-6 ">
               <h1 class="font-bold text-blue-700 text-2xl " >Gestión de productos</h1>
          </div>
       <div class = "w-[80%] mx-auto">
        <div class = "container" >DETALLES DEL PRODUCTO</div>
            <div class="grid grid-cols-5">

                <div class = "col-span-3 mt-[2%]">
                    
                  <div class="mb-[4%]">
                    <label for="nombre_producto" class="block mb-[0.5%]">Nombre</label>
                    <Field type = "text" class = "w-[100%] border-1 rounded border-slate-300" name = "nombre_producto" placeholder = "Sopita maggi"/>
                  </div>  

                  <div class="mb-[4%]">
                    <label for="codigo_barra" class="block mb-[0.5%]">Código de barra</label>
                    <Field type = "text" class = "w-[100%] border-1 rounded border-slate-300" name = "nombre_producto" placeholder = "Codigo barra" />
                  </div>  

                  <div class="mb-[4%] flex flex-wrap">
                    <div class="">
                        <label for="cantidad_disponible" class="block mb-[0.5%]">Cantidad Disponible</label>
                        <Field type = "text" class = "w-[90%] border-1 rounded border-slate-300" name = "cantidad_disponible" placeholder = "Cantidad"/>
                    </div>
                    <div class="">
                        <label for="precio_unitario" class="block mb-[0.5%]">Precio Unitario</label>
                        <Field type = "text" class = "w-[80%] border-1 rounded border-slate-300" name = "precio_unitario" placeholder = "Precio"/>
                    </div>
                    <div class="grow">
                        <label for="nombre_producto" class="block mb-[0.5%]">Activo</label>
                        <div class="my-[5%]">
                        <Field type = "checkbox" class = "border-1 rounded border-slate-300" name = "activo"/>
                        <label for = "activo"  class=" inline-block text-slate-500 ml-[1%] ">Disponible para la venta</label>
                        </div>
                    </div>
                  </div>  

                <!--Columna dos contenedor de foto-->
                </div>

                <div class = "col-span-2 ml-[5%]">
                    <div class="mt-[3%] ml-[2%]">
                        Imagen del producto
                    </div>
                
                    <div class="flex justify-center ">
                        <svg class="h-28 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" />
                        </svg>
                    </div>    

                     <div>
                        <div class="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-2 py-2">
                        <div class="text-center">
                        <svg class="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
                        </svg>
                        <div class="mt-4 flex text-sm leading-6 text-gray-600">
                            <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                            <span>Upload a file</span>
                            <input id="file-upload" name="file-upload" type="file" class="sr-only">
                            </label>
                            <p class="pl-1">or drag and drop</p>
                            </div>
                            <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </div>
                    </div>
                    </div>
    </div>

    <!--Tabla de precios extra-->

    <div class="grid grid-cols-6">
        <div class="col-span-4 mr-[2%]">
                <table class="w-[100%]">
                    <thead>
                        <tr class="uppercase text-slate-500">
                            <th>
                                <p class="bg-slate-50 p-2 border-b-2 w-[90%]">
                                    Medida
                                </p>
                            </th>
                            <th>
                                <p class="bg-slate-50 p-2 border-b-2 w-[90%]" >Cantidad</p>
                            </th>
                            <th>
                                <p class="bg-slate-50 p-2 border-b-2 w-[90%]">Precio($)</p>
                            </th>
                            <th>
                                <p class="bg-slate-50 p-2 border-b-2 w-[90%]" >Eliminar</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    
                        <tr class="border-b-2">
                            <td class="p-3">Bolsa</td>
                            <td>10</td>
                            <td>10.20</td>
                            <td class="flex justify-center items-center p-3">
                                <p> 
                                    <button type="button" class="focus:outline-none text-red-800 bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 hover:text-white dark:focus:ring-red-900 px-2 py-1 text-sm font-bold" >X</button>
                                </p>
                            </td>
                        </tr>

                    </tbody>
                </table>
        </div>
        <div class = "col-span-2">
            <button type="button" class="bg-indigo-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded bg-customColor">Agregar Precio extra</button>
        </div>
    </div>
    <button type="button" class="bg-indigo-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded bg-customColor">Guardar Producto</button>
 </div>
                  
        <Teleport to = "body">
            <ModalPrecioExtra v-if="controlModalPrecioExtra" @controlEventoModal="controlEventoModal"></ModalPrecioExtra>
        </Teleport>
    </main>
</template>

<script>

export default {
    components:{
        
    },
    data(){
        return{
            controlModalPrecioExtra:false,
        }
    },
    methods:{
        controlEventoModal(precioExtra){
            if(precioExtra){
                console.log(" Se tiene que agregar un precio extra a las listas de precios extra ");
                console.log(precioExtra);
            }
            this.controlModalPrecioExtra = false;
        }
    }
}
</script>
<style scoped>
.bg-customColor{
    background-color:#4F46E5;
}

</style>