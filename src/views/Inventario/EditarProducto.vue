<script setup>

</script>
<template>
     <main>
        <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 fixed top-20 left-0 right-0" 
        role="alert"
        v-if="activarAlerta==true">
        <span class="font-medium">{{ this.mensajeExito }}</span>
        </div>
        <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400 fixed top-10 left-0 right-0" role="alert"
        v-if="activarAlertaError==true">
        <span class="font-medium">{{ this.mensajeExito }}</span>
        </div>
        <NavBar></NavBar>
        <div class = "container mx-auto p-6 ">
               <h1 class="font-bold text-blue-700 text-2xl " >Gestión de productos</h1>
          </div>
       <div class = "w-[80%] mx-auto">
        <div class = "container" >DETALLES DEL PRODUCTO</div>

        <Form @submit="guradarCambiosProducto($event)">
            <div class="grid grid-cols-5">

                <div class = "col-span-3 mt-[2%]">
                    
                  <div class="mb-[4%]">
                    <label for="nombre_producto" class="block mb-[0.5%]">Nombre</label>
                    <Field type = "text" class = "w-[100%] border-1 rounded border-slate-300" name = "nombre_producto" placeholder = "Sopita maggi" v-model="producto.nombreProducto"
                    :rules="validarCampoTexto"/>
                    <ErrorMessage name = "nombre_producto" class = "mensajeDeError"/>
                  </div>  
        
                  <div class="mb-[4%]">
                    <label for="codigo_barra" class="block mb-[0.5%]">Código de barra</label>
                    <Field type = "text" class = "w-[100%] border-1 rounded border-slate-300" name = "codigo_barra_producto" placeholder = "Codigo barra" v-model="producto.codigoBarraProducto" 
                    :rules="validarCodigoBarra"/>
                    <ErrorMessage name = "codigo_barra_producto" class = "mensajeDeError"/>
                  </div>  

                  <div class="mb-[4%] flex flex-wrap">
                    <div class="">
                        <label for="cantidad_disponible" class="block mb-[0.5%]">Cantidad Disponible</label>
                        <Field type = "text" class = "w-[90%] border-1 rounded border-slate-300" name = "cantidad_disponible" placeholder = "Cantidad" v-model = "producto.cantidadProductoDisponible"
                        :rules="validarCantidadDisponible"/>
                        <ErrorMessage name = "cantidad_disponible" class = "mensajeDeError corregirLongitud" />
                    </div>
                    <div class="">
                        <label for="precio_unitario" class="block mb-[0.5%]">Precio Unitario</label>
                        <Field type = "text" class = "w-[80%] border-1 rounded border-slate-300" name = "precio_unitario" 
                        placeholder = "Precio" v-model = "producto.precioUnitarioProducto" :rules = "validarPrecioUnitario"/>
                        <ErrorMessage name = "precio_unitario" class = "mensajeDeError corregirLongitud" />
                    </div>
                    <div class="grow">
                        <label for="activo" class="block mb-[0.5%]">Activo</label>
                        <div class="my-[5%]">
                        <Field type = "checkbox" class = "border-1 rounded border-slate-300" name = "activo" value = "activo" v-model="producto.estaActivoProducto"/>
                        <label for = "activo"  class=" inline-block text-slate-500 ml-[1%]">Disponible para la venta</label>
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
                        <svg class="h-28 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" v-if="this.urlFotoProducto == ' '">
                        <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" />
                        </svg>
                        <img  class="h-28 w-28 text-gray-300 rounded-full mb-[1%]" v-bind:src="this.urlFotoProducto" alt="Foto del producto" v-if="this.urlFotoProducto!= ' ' ">
                    </div>    

                     <div>
                        <div class="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-2 py-2 hover:border-indigo-800" @drop="cargarImagenDrop($event)" @dragover="detenerCargaPorEventoArrastre($event)">
                        <div class="text-center">
                        <svg class="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
                        </svg>
                        <div class="mt-4 flex text-sm leading-6 text-gray-600">
                            <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                            <span>Upload a file</span>
                            <Field id="file-upload"  v-value="producto.fotoProducto" name="file-upload" type="file" accept = "image/*" class="sr-only"  @change="cargarImagen($event)"/>
                            </label>
                            <p class="pl-1">or drag and drop</p>
                            </div>
                            <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </div>
                      </div>
                    </div>
            </div>
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
                                <p class="bg-slate-50 p-2 border-b-2 w-[90%]">Editar</p>
                            </th>
                            <th>
                                <p class="bg-slate-50 p-2 border-b-2 w-[90%]" >Eliminar</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    
                        <tr class="border-b-2" v-for="precioExtra in listaPrecios" :key="precioExtra.id">
                            <td class="p-3">{{ precioExtra.nombreUnidadDeMedida }}</td>
                            <td> {{precioExtra.cantidad }} </td>
                            <td>{{ precioExtra.precio }}</td>
                            <td class="flex justify-center items-center p-3">
                                <button class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-[30px] text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 cursor-pointer">Editar</button>
                            </td>
                            <td class="flex justify-center items-center p-3">
                                <p> 
                                    <button type="button" class="focus:outline-none text-red-800 bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 hover:text-white dark:focus:ring-red-900 px-2 py-1 text-sm font-bold" @click="eliminarPrecioExtra(precioExtra.idUnidadMedida)">X</button>
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        <div class = "col-span-2">
            <button type="button" class="bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300" @click="controlModalPrecioExtra=true">Agregar Precio extra</button>
        </div>
        </div>
        <div class="mr-[25%]">
            <button type="button" class = "inline-block ml-[20%] w-[20%] focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 rounded-lg text-sm px-5 py-2 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 font-bold">Cancelar</button>
            <button type="submit" class=" w-[20%] mt-[2%] bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300">Guardar Cambios</button>
        </div>
    </Form>
    </div>
        <Teleport to = "body">
            <ModalPrecioExtra v-if="controlModalPrecioExtra" @controlEventoModal="controlEventoModal"></ModalPrecioExtra>
        </Teleport>
    </main>
</template>
<script>
import axios from 'axios';
import {Field,Form,ErrorMessage} from 'vee-validate';
import { useRoute } from 'vue-router';
export default {
    components:{
        Field,
        Form,
        ErrorMessage,
    },
    data(){
        return{
            idProducto : "",
            mensajeExito:"",
            activarAlertaError:false,
            activarAlerta:false,
            listaPrecios: [],
            producto : {
                nombreProducto : null,
                codigoBarraProducto : null,
                cantidadProductoDisponible : null,
                precioUnitarioProducto : null,
                estaActivoProducto : "activo",
                fotoProducto : null
            },
            urlFotoProducto:" ",
            imagenProductoServidor:null
        }
    },
    mounted(){
        let route = useRoute();
        this.idProducto = route.params.id_producto;
        console.log(this.idProducto);
        this.cargarProducto();
    },
    methods:{
        asignarEstadoProducto(estadoProductoServidor){
            console.log("");
            if(estadoProductoServidor === 1){
                this.producto.estaActivoProducto = "activo";
            }else{
                this.producto.estaActivoProducto = "desactivado";
            }
        },
        cargarFoto(nombreFoto){
            if(nombreFoto != ""){
                axios.get("http://127.0.0.1:8000/api/productos/"+this.idProducto+"/foto",{ responseType: 'arraybuffer' })
                .then(
                    response=>{
                        let blob = new Blob([response.data],{type:"image/*"});
                        let imageUrl = URL.createObjectURL(blob);
                        this.urlFotoProducto = imageUrl;
                        console.log(response.data);
                        console.log("El valor de la url de la imagen es: ");
                        console.log(imageUrl);
                    }
                )
                .catch(
                    response=>{
                        console.log("Error al recuperar la foto del servidor");
                    }
                );
            }else{

            }
        },
        cargarProducto(){
            let url = "http://127.0.0.1:8000/api/productos/"+this.idProducto;
            axios.get(url).
            then(
                (response)=>{
                    let tempProducto = response.data.producto;
                    this.producto.cantidadProductoDisponible = tempProducto.cantidad_producto_disponible;
                    this.producto.codigoBarraProducto = tempProducto.codigo_barra_producto;
                    this.producto.nombreProducto = tempProducto.nombre_producto;
                    this.producto.precioUnitarioProducto = tempProducto.precio_unitario;
                    
                    this.asignarEstadoProducto(tempProducto.esta_disponible);
                    this.cargarFoto(tempProducto.foto);
                    console.log(response.data.producto);
                }
            )
            .catch(
                response=>{
                    if(response.response.data.status === false){
                        this.mensajeExito = "El codigo de barra de producto que envio de parametro no se encuentar en la base de datos";
                        console.log(this.mensajeExito);
                        this.controlAlertaError();
                    }
                }
            );
        },
        guardarCambiosProductos(event){
            event.preventDefault;
            console.log("Se va a guardar los cambios del producto");
        },
        validarCampoTexto(){
            return true;
        },
        validarCantidadDisponible(){
            return true;
        },
        validarCodigoBarra(){
            return true;
        },
        validarPrecioUnitario(){
            return true;
        },
        cargarImagen(e){
            /*Retorna un tipo de dato blob el e.target.files[0]*/
            e.preventDefault();
            this.producto.fotoProducto = e.target.files[0];
            let url = URL.createObjectURL(this.producto.fotoProducto);
            this.urlFotoProducto = url;
            console.log(url);
        },
        cargarImagenDrop(event){
            event.preventDefault();
            this.producto.fotoProducto = event.dataTransfer.files[0];
            let url = URL.createObjectURL(this.producto.fotoProducto);
            this.urlFotoProducto = url;
        },
        detenerCargaPorEventoArrastre(event){
            event.preventDefault();
        },
        contorlAlerta(){
            this.activarAlerta = true;
            setTimeout(()=>{
                this.activarAlerta = false;
            },3000);
        },
        controlAlertaError(){
            this.activarAlertaError = true;
            setTimeout(()=>{
                this.activarAlertaError = false;
            },5000);
        },
    }
}
</script>