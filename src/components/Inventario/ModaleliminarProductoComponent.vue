<script setup>
</script>

<template>

    <main class="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md z-999 fixed top-20 left-0 right-0">

        <div class="mb-4">
            <h1 class="text-2xl font-bold mb-6 text-left">Desactivar Producto</h1>
            <p class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" id="nombre_producto" name="nombre_producto"> {{ productoModificado.nombre_producto }}</p>
        </div>
        <div class="mb-4">
            <p class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" id="codigo_barra_producto" name="codigo_barra_producto" > {{ productoModificado.codigo_barra_producto }}</p>
        </div>
        <div class="mb-4">
            <p class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" id="precio_unitario" name="precio_unitario" > {{ productoModificado.precio_unitario }}</p>            
        </div>
        <div class="mb-4">
            <p class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" id="cantidad_producto_disponible" name="cantidad_producto_disponible" > {{ productoModificado.cantidad_producto_disponible }}</p>
        </div>
        <div class="mb-4">
            <p class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" id="esta_disponible" name="esta_disponible" > {{ productoModificado.esta_disponible }}</p>
        </div>
        <div class="text-center">
            <button class="bg-red-600 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300" @click="desactivarProducto">Desactivar</button>
            <button id="btnCancelar" class=" ml-4 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" @click="cancelar"> Cancelar</button>
        </div>

    </main>

</template>

<script>
import axios from 'axios';
import API_URL from '../../config';
export default {
    data(){
        return{
            productoModificado: {},
        }
    },
    props:["producto"],
    mounted(){
        this.cargarProductoModificado();
    },
    methods:{
        cargarProductoModificado(){
            this.productoModificado = this.producto;
        },
        desactivarProducto(){
            axios.delete(API_URL + '/api/productos/'+this.productoModificado.codigo_barra_producto).then(
                response=>{
                    console.log(response.data.respuesta)
                    if(response.data.respuesta){
                        this.$emit("cerrarModalEliminar",true,this.productoModificado);
                    }
                    else{
                        this.$emit("cerrarModalEliminar",false,null);
                    }
                }
            ).catch(
                error=>{
                    console.log(error);
                    this.$emit("cerrarModalEliminar",false,null);
                }
            );
        },
        cancelar(){
            this.$emit("cerrarModalEliminar",false,null);
        }
    }
}

</script>