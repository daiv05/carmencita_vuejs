<script setup>

import api_url from "../../config.js";
import notImg from '@/assets/producto_no_disponible.png'

</script>

<template>

<main class="w-[50%] mx-auto bg-white p-8 rounded-md shadow-md z-999 fixed top-20 left-0 right-0">
      
      <div class="grid grid-cols-5 gap-5">

        <div class="col-span-2 flex items-center">
          <img v-bind:src= "api_url + '/productos/' + producto.codigo_barra_producto + '/foto' " v-if="producto.foto!='' " alt="" class="w-[100%] h-[70%] rounded-md">
            <img v-else :src= "notImg" alt="" class="w-[100%] h-[70%] rounded-md">
        </div>
        <div class="col-span-3">

            <div class="mb-4">
        <h1 class="text-2xl font-bold mb-6 text-left">Consultar Producto</h1>
        <p class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
           id="nombre_producto" name="nombre_producto"
          > {{ producto.nombre_producto }}</p>
      </div>
      <div class="mb-4">
        <p class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
           id="codigo_barra_producto" name="codigo_barra_producto"
          > {{ producto.codigo_barra_producto }}</p>
      </div>
      <div class="mb-4">
        <p class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
           id="precio_unitario" name="precio_unitario"
          > {{ producto.precio_unitario }}</p>
      </div>
      <div class="mb-4">
        <p class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
           id="cantidad_producto_disponible" name="cantidad_producto_disponible"
          > {{ producto.cantidad_producto_disponible }}</p>
      </div>

        <div>

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
                    </tr>
                </thead>
                <tbody>
            
                    <tr class="border-b-2" v-for="precioExtra in listaPrecios" :key="precioExtra.id_precio_unidad_de_medida">
                        <td class="p-3">{{ precioExtra.nombreUnidadDeMedida }}</td>
                        <td> {{ precioExtra.cantidad }} </td>
                        <td>{{ precioExtra.precio }}</td>                        
                    </tr>
                </tbody>
            </table>

        </div>
          
        </div>
      </div>

      <div class="text-center mt-[2%]">
        <button
        class="bg-indigo-700 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
         @click="cerrarModal">Aceptar</button>
      </div>
</main>

</template>

<script>

import axios from 'axios';
//cambiar el nombre de las variables 
export default {
    
    data(){
        return{
            producto: {},
            listaPrecios: [],
        }
    },
    props:["productoParametro"],
    mounted(){
        this.cargarProducto();
        this.cargarPreciosExtra(this.productoParametro.codigo_barra_producto);
    },
    methods:{
        cargarProducto(){
              this.producto = {
                id_producto: this.productoParametro.codigo_barra_producto,
                nombre_producto: this.productoParametro.nombre_producto,
                codigo_barra_producto: this.productoParametro.codigo_barra_producto,
                precio_unitario: this.productoParametro.precio_unitario,
                cantidad_producto_disponible: this.productoParametro.cantidad_producto_disponible,
                foto: this.productoParametro.foto,
              };
            },
            cerrarModal(){
                this.$emit("cerrarModal");
            },

            cargarPreciosExtra(codigoBarraProducto){
            axios.get(api_url + "/precio_lista_unidades/" + codigoBarraProducto)
            .then(
                response=>{
                    let tempListaPreciosExtra = response.data.lista_precios_extra;
                    console.log(tempListaPreciosExtra);
                    for(let i = 0; i < tempListaPreciosExtra.length; i++){
                        let tempPrecioExtra = {
                            id_precio_unidad_de_medida:"",
                            nombreUnidadDeMedida:"",
                            cantidad:"",
                            precio:"",
                            idUnidadMedida:"",
                        };
                        tempPrecioExtra.id_precio_unidad_de_medida = tempListaPreciosExtra[i].id_precio_unidad_de_medida;
                        tempPrecioExtra.nombreUnidadDeMedida = tempListaPreciosExtra[i].unidad_de_medida.nombre_unidad_de_medida;
                        tempPrecioExtra.cantidad = tempListaPreciosExtra[i].cantidad_producto;
                        tempPrecioExtra.precio = tempListaPreciosExtra[i].precio_unidad_medida_producto;
                        tempPrecioExtra.idUnidadMedida = tempListaPreciosExtra[i].id_unidad_de_medida;
                        this.listaPrecios.push(tempPrecioExtra);
                    }
                    }
                )
                .catch(
                    response=>{
                        console.log(response);
                    }
                );
            },

    }
}
</script>