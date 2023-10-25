<script setup>
import ModalPrecioExtra from '../../components/Inventario/ModalPrecioExtra.vue'
import ModalEditarPrecioExtra from '../../components/Inventario/ModalEditarPrecioExtra.vue'
import NavBar from "../../components/NavBar.vue";
import api_url from '../../config';
import { showMessages } from '../../components/functions.js'
</script>
<style>
.mensajeDeError{
    display: block;
    color:red;
    font-size: small;
}
</style>
<template>
    <main>
        <NavBar></NavBar>
        <!-- Encabezado -->
        <div>
            <div class="flex bg-white mx-auto p-5 shadow-md justify-between">
                <h1 class="font-bold text-blue-700 text-xl">Gestión de Productos</h1>
            </div>
            <div class="flex justify-start items-center mt-4 ml-4">
                <a href="#" @click="$router.go(-1)" class="text-sm text-black font-medium flex items-center">
                    <img src="../../assets/icons/arrow.svg" alt="Regresar" class="h-6 w-6 mr-1"> Regresar
                </a>
            </div>
        </div>
        <div class="w-[80%] mx-auto mt-8">
            <p class="mb-8 text-gray-950 font-semibold text-xl">Detalles del producto</p>
            <Form @submit="guradarCambiosProducto($event)">
                <div class="bg-white p-4 rounded shadow-md">
                    <div class="grid grid-cols-5">
                        <div class="col-span-3">
                            <div class="mb-[4%]">
                                <label for="nombre_producto" class="block mb-[0.5%]">Nombre</label>
                                <Field type="text" class="w-[100%] border-1 rounded border-slate-300" name="nombre_producto"
                                    placeholder="Nombre del producto" v-model="producto.nombreProducto"
                                    :rules="validarCampoTexto" />
                                <ErrorMessage name="nombre_producto" class="mensajeDeError" />
                            </div>

                            <div class="mb-[4%]">
                                <label for="codigo_barra" class="block mb-[0.5%]">Código de Barras</label>
                                <Field type="text" class="w-[100%] border-1 rounded border-slate-300"
                                    name="codigo_barra_producto" placeholder="Código de Barras"
                                    v-model="producto.codigoBarraProducto" :rules="validarCodigoBarra" />
                                <ErrorMessage name="codigo_barra_producto" class="mensajeDeError" />
                            </div>

                  <div class="mb-[4%] flex flex-wrap">
                    <div class="">
                        <label for="cantidad_disponible" class="block mb-[0.5%]">Cantidad Disponible</label>
                        <Field type = "text" class = "w-[90%] border-1 rounded border-slate-300" name = "cantidad_disponible" placeholder = "Cantidad" v-model = "producto.cantidadProductoDisponible"
                        :rules="validarCantidadDisponible"/>
                        <ErrorMessage name = "cantidad_disponible" class = "mensajeDeError corregirLongitud" />
                    </div>
                    <div class="">
                        <label for="cantidad_fisica" class="block mb-[0.5%]">Cantidad Fisica</label>
                        <Field type = "text" class = "w-[90%] border-1 rounded border-slate-300" name = "cantidad_fisica" placeholder = "Cantidad Fisica" v-model = "producto.cantidadProductoFisico"
                        :rules="validarCantidadFisica"/>
                        <ErrorMessage name = "cantidad_fisica" class = "mensajeDeError corregirLongitud" />
                    </div>
                    <div class="mb-4">
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

                        <div class="col-span-2 ml-[5%]">

                            <div class="flex justify-center ">
                                <svg class="h-28 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                                    v-if="urlFotoProducto == ' '">
                                    <path fill-rule="evenodd"
                                        d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <img class="h-28 w-28 text-gray-300 rounded-full mb-[1%]" v-bind:src="urlFotoProducto"
                                    alt="Foto del producto" v-if="urlFotoProducto != ' '">
                            </div>

                            <div>
                                <div class="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-2 py-2 hover:border-indigo-800"
                                    @drop="cargarImagenDrop($event)" @dragover="detenerCargaPorEventoArrastre($event)">
                                    <div class="text-center">
                                        <svg class="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor"
                                            aria-hidden="true">
                                            <path fill-rule="evenodd"
                                                d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                                                clip-rule="evenodd" />
                                        </svg>
                                        <div class="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label for="file-upload"
                                                class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                                <span>Suba una imagen</span>
                                                <Field id="file-upload" v-value="producto.fotoProducto" name="file-upload"
                                                    type="file" accept="image/*" class="sr-only"
                                                    @change="cargarImagen($event)" />
                                            </label>
                                            <p class="pl-1">o arrastre y suelte</p>
                                        </div>
                                        <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF de hasta 10MB</p>
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
                                            <p class="bg-slate-50 p-2 border-b-2 w-[90%]">Cantidad</p>
                                        </th>
                                        <th>
                                            <p class="bg-slate-50 p-2 border-b-2 w-[90%]">Precio($)</p>
                                        </th>
                                        <th>
                                            <p class="bg-slate-50 p-2 border-b-2 w-[90%]">Editar</p>
                                        </th>
                                        <th>
                                            <p class="bg-slate-50 p-2 border-b-2 w-[90%]">Eliminar</p>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr class="border-b-2" v-for="precioExtra in listaPrecios"
                                        :key="precioExtra.id_precio_unidad_de_medida">
                                        <td class="p-3">{{ precioExtra.nombreUnidadDeMedida }}</td>
                                        <td> {{ precioExtra.cantidad }} </td>
                                        <td>{{ precioExtra.precio }}</td>
                                        <td class="text-center p-3">
                                            <button type="button"
                                                class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-[30px] text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 cursor-pointer"
                                                @click="editarPrecioExtra(precioExtra)">Editar</button>
                                        </td>
                                        <td class="text-center p-3">
                                            <div class="mt-[6%]">
                                                <button type="button"
                                                    class="focus:outline-none text-red-800 bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 rounded-full mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 hover:text-white dark:focus:ring-red-900 px-2 py-1 text-sm font-bold"
                                                    @click="eliminarPrecioExtra(precioExtra)">X
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                        <div class="col-span-2">
                            <button type="button"
                                class="bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
                                @click="controlModalPrecioExtra = true">Agregar Precio extra</button>
                        </div>
                    </div>
                </div>
                <div class="flex justify-center">
                    <button type="button"
                        class="inline-block focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 rounded-lg text-sm px-4 py-2 m-4 font-bold"
                        @click="cancelarModificacion">Regresar</button>
                    <button type="submit"
                        class="bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300 m-4">Guardar
                        Cambios</button>
                </div>
            </Form>
        </div>
        <Teleport to="body">
            <ModalPrecioExtra v-if="controlModalPrecioExtra" @controlEventoModal="controlEventoModal"></ModalPrecioExtra>
        </Teleport>
        <Teleport to="body">
            <ModalEditarPrecioExtra v-if="controlModalEditarPrecioExtra"
                @controlEventoModalEditarPrecioExtra="controlEventoModalEditarPrecioExtra"
                :precioExtraParametro="precioExtraParametro">

            </ModalEditarPrecioExtra>
        </Teleport>
    </main>
</template>
<script>
import axios from 'axios';
import { Field, Form, ErrorMessage } from 'vee-validate';
import { useRoute } from 'vue-router';
export default {
    components: {
        Field,
        Form,
        ErrorMessage,
    },
    data() {
        return {
            idProducto: "",
            mensajeExito: "",
            activarAlertaError: false,
            activarAlerta: false,
            listaPrecios: [],
            controlModalPrecioExtra:false,
            controlModalEditarPrecioExtra:false,
            precioExtraParametro:{},
            producto : {
                nombreProducto : null,
                codigoBarraProducto : null,
                cantidadProductoDisponible : null,
                cantidadProductoFisico : null,
                precioUnitarioProducto : null,
                estaActivoProducto : "activo",
                fotoProducto : null
            },
            urlFotoProducto: " ",
            imagenProductoServidor: null
        }
    },
    mounted() {
        const route = useRoute();
        this.idProducto = route.params.id_producto;
        console.log(this.idProducto);
        this.cargarProducto();
        console.log(route.fullPath);
    },
    methods: {
        eliminarPrecioExtra(precioExtra) {
            let n = 0;
            for (let precioExtraItem of this.listaPrecios) {
                if (precioExtra === precioExtraItem) {
                    this.listaPrecios.splice(n, 1);
                    break;
                }
                n++
            }
        },
        asignarEstadoProducto(estadoProductoServidor) {
            console.log("");
            if (estadoProductoServidor === 1) {
                this.producto.estaActivoProducto = "activo";
            } else {
                this.producto.estaActivoProducto = "desactivado";
            }
        },
        cargarFoto(nombreFoto) {
            if (nombreFoto != "") {
                axios.get(api_url + "/productos/" + this.idProducto + "/foto", { responseType: 'arraybuffer' })
                    .then(
                        response => {
                            let blob = new Blob([response.data], { type: "image/*" });
                            let imageUrl = URL.createObjectURL(blob);
                            this.urlFotoProducto = imageUrl;
                            console.log(response.data);
                            console.log("El valor de la url de la imagen es: ");
                            console.log(imageUrl);
                        }
                    )
                    .catch(
                        response => {
                            console.log("Error al recuperar la foto del servidor");
                        }
                    );
            } else {

            }
        },
        cargarProducto() {
            let url = api_url + "/productos/precios/" + this.idProducto;
            axios.get(url).
            then(
                (response)=>{
                    let tempProducto = response.data.producto[0];
                    this.producto.cantidadProductoDisponible = tempProducto.cantidad_producto_disponible;
                    this.producto.cantidadProductoFisico = tempProducto.cantidad_producto_fisico;
                    this.producto.codigoBarraProducto = tempProducto.codigo_barra_producto;
                    this.producto.nombreProducto = tempProducto.nombre_producto;
                    this.producto.precioUnitarioProducto = tempProducto.precio_unitario;
                    this.asignarEstadoProducto(tempProducto.esta_disponible);
                    this.cargarFoto(tempProducto.foto);
                    this.cargarPreciosExtra();
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
        cargarPreciosExtra(codigoBarraProducto) {
            axios.get(api_url + "/precio_lista_unidades/" + this.producto.codigoBarraProducto)
                .then(
                    response => {
                        let tempListaPreciosExtra = response.data.lista_precios_extra;
                        console.log(tempListaPreciosExtra);
                        for (let i = 0; i < tempListaPreciosExtra.length; i++) {
                            let tempPrecioExtra = {
                                id_precio_unidad_de_medida: "",
                                nombreUnidadDeMedida: "",
                                cantidad: "",
                                precio: "",
                                idUnidadMedida: "",
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
                    response => {
                        console.log(response);
                    }
                );
        },
        controlEventoModalEditarPrecioExtra(precioExtra) {
            if (precioExtra != null) {
                let n = 0;
                for (let itemPrecioExtra of this.listaPrecios) {
                    if (itemPrecioExtra.id_precio_unidad_de_medida == precioExtra.id_precio_unidad_de_medida) {
                        this.listaPrecios[n] = precioExtra;
                        break;
                    }
                    n++;
                }
            }
            this.controlModalEditarPrecioExtra = false;
        },
        editarPrecioExtra(precioExtra) {
            this.precioExtraParametro = precioExtra;
            this.controlModalEditarPrecioExtra = true;
        },
        controlEventoModal(precioExtra) {
            if (precioExtra) {
                this.listaPrecios.push(precioExtra);
            }
            this.controlModalPrecioExtra = false;
        },
        guardarCambiosProductos(event) {
            event.preventDefault;
            console.log("Se va a guardar los cambios del producto");
        },
        validarCampoTexto(value) {
            if (value == null) {
                return "Este campo no puede quedar vacio";
            }
            else {
                this.nombreEsValido = true;
            }
            this.nombreEsValido = true;
            return true;
        },
        validarCantidadDisponible(value) {
            let regExpresion = /^[0-9]{1,5}$/;
            if (value == null) {
                return "Este campo no puede quedar vacio";
            }
            else if (!regExpresion.test(value)) {
                return "La cantidad disponible solo debe contener números";
            }
            this.cantidadDisponibleEsValido = true;
            return true;
        },
        validarCantidadFisica(value){
            let regExpresion = /^[0-9]{1,5}$/;
            if(value == null){
                return "Este campo no puede quedar vacio";
            }
            else if(!regExpresion.test(value)){
                return "La cantidad fisica deben ser numeros";
            }
            this.cantidadFisicoEsValido = true;
            return true;
        },
        validarCodigoBarra(value){
            const expresionRegular = /^[0-9]{10,13}$/;
            const regExpresion = new RegExp(expresionRegular);
            if (value == null) {
                return "Este campo no puede quedar vacio";
            }
            else if (!regExpresion.test(value)) {
                return "El código de barras debe tener de 10 a 13 digitos.";
            }
            this.codigoBarraProductoEsValido = true;
            return true;
        },
        validarPrecioUnitario(value) {
            let regExpresion = /^[0-9]{1,5}\.?[0-9]{1,2}$/;
            if (value == null) {
                return "Este campo no puede quedar vacio"
            }
            else if (!regExpresion.test(value)) {
                return "El campo debe tener el formato ##.##"
            }
            this.precioUnitarioEsValido = true;
            return true;
        },
        guradarCambiosProducto() {
            let configuracionPut = "?_method=PUT";
            let bodyData = this.crearFormDataPutProducto();
            console.log(bodyData);
            axios.post(api_url + "/productos/" + this.idProducto + configuracionPut, bodyData)
                .then(
                    (response) => {
                        this.guardarCambiosListaPrecios();
                        showMessages(response.data.respuesta, response.data.mensaje);
                    }
                )
                .catch(
                    (error) => {
                        error.response.data.mensaje.forEach(mensaje => {
                            showMessages(error.response.data.respuesta, mensaje);
                        });
                    }
                );
        },
        guardarCambiosListaPrecios() {
            let configuracionUrlPut = "?_method=PUT";
            let dataBody = {
                "lista_precios_unidades": this.listaPrecios,
                "codigo_barra_actualizado": this.producto.codigoBarraProducto.toString(),
            };
            console.log(dataBody);
            axios.post(api_url + "/precio_lista_unidades/" + this.idProducto + configuracionUrlPut, dataBody)
                .then(
                    response => {
                        this.mensajeExito = response.data.mensaje;
                        this.contorlAlerta();
                        this.clearForm();
                    }
                )
                .catch(
                    response => {
                        console.log(response);
                        this.mensajeExito = response.response.data.mensaje[0];
                        this.controlAlertaError();
                    }
                );
        },
        crearFormDataPutProducto() {
            let bodyFormData = new FormData();
            bodyFormData.append("codigo_barra_producto",this.producto.codigoBarraProducto);
            bodyFormData.append("nombre_producto",this.producto.nombreProducto);
            bodyFormData.append("cantidad_producto_disponible",this.producto.cantidadProductoDisponible);
            bodyFormData.append("cantidad_producto_fisico",this.producto.cantidadProductoFisico);
            bodyFormData.append("precio_unitario",this.producto.precioUnitarioProducto);
            if(this.producto.estaActivoProducto){
                bodyFormData.append("esta_disponible",1);
            }
            else {
                bodyFormData.append("esta_disponible", 0);
            }
            if (this.producto.fotoProducto != null) {
                bodyFormData.append("foto", this.producto.fotoProducto);
            }

            return bodyFormData;
        },
        cargarImagen(e) {
            /*Retorna un tipo de dato blob el e.target.files[0]*/
            e.preventDefault();
            this.producto.fotoProducto = e.target.files[0];
            let url = URL.createObjectURL(this.producto.fotoProducto);
            this.urlFotoProducto = url;
            console.log(url);
        },
        cargarImagenDrop(event) {
            event.preventDefault();
            this.producto.fotoProducto = event.dataTransfer.files[0];
            let url = URL.createObjectURL(this.producto.fotoProducto);
            this.urlFotoProducto = url;
        },
        detenerCargaPorEventoArrastre(event) {
            event.preventDefault();
        },
        contorlAlerta() {
            this.activarAlerta = true;
            setTimeout(() => {
                this.activarAlerta = false;
            }, 3000);
        },
        controlAlertaError() {
            this.activarAlertaError = true;
            setTimeout(() => {
                this.activarAlertaError = false;
            }, 5000);
        },
        clearForm(){
            setTimeout(()=>{
                this.$store.commit("setFromAgregarEditarProducto",{fromAgregarEditarProducto:true});
                this.$router.push({ name: "gestion_productos" } );
                //this.$router.push({ name: 'editar_producto', params: { id_producto: this.producto.codigoBarraProducto.toString() } });
                //this.$router.push({ name: "editar_producto", params: { id_producto : this.producto.codigoBarraProducto.toString() } });
            }, 3000);
            URL.revokeObjectURL(this.urlFotoProducto);
        },
        cancelarModificacion(){
            this.$store.commit("setFromAgregarEditarProducto",{fromAgregarEditarProducto:true});
            this.$router.push({ name: "gestion_productos"});
            //this.$router.push({ name: "gestion_productos" } );
        }
    }
}
</script>