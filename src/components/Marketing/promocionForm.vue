<script setup>
//import NavBar from '../../components/NavBar.vue'
import api_url from '../../config.js'
</script>

<template>
    <Form :validation-schema="schema" ref="promocionForm" id="promocionForm" class="w-auto m-4" @submit="savePromocion">
        <!--Mensajes de validacion-->
        <div id="submitMessage" class="m-0 w-full h-fit p-0">
            <div class="container bg-white shadow m-auto w-4/5 my-4 max-w-md rounded-lg" v-if="showMessageError">
                <div class="modal bg-gray-800 text-white rounded-lg p-2 w-full max-w-2xl max-h-full m-auto">
                    <div name="modalHeader" class="text-red-400 flex m-2">
                        <span class="text-red-400 my-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                            </svg>
                        </span>
                        <h1 class="m-2">Se han identificado los siguientes errores:</h1>
                    </div>
                    <div name="modalBody" class="mx-5 my-3">
                        <ul class="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                            <li v-for="err in error">{{ err }}</li>
                        </ul>
                    </div>
                    <div class="w-full flex justify-center items-center my-2">
                        <button type="button" @click="showMessageError = false"
                            class="w-3/4 focus:outline-none text-white bg-red-400 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                            Aceptar
                        </button>
                    </div>
                </div>
            </div>

            <div class="container bg-white shadow w-4/5 my-4 max-w-md rounded-lg fixed" v-if="showMessageSuccess"
                style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1;">
                <div class="modal bg-gray-800 text-white rounded-lg p-2 w-full max-w-2xl max-h-full m-auto">
                    <div name="modalHeader" class="text-green-400 flex m-2">
                        <span class="text-green-400 my-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </span>
                        <h1 class="m-2">Promocion registrada correctamente</h1>
                    </div>
                    <div class="w-full flex justify-center items-center my-2">
                        <button type="button" @click="clearForm"
                            class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                            Aceptar
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!--Contenedor de inputs-->
        <div class="container bg-white shadow m-auto p-6 w-4/5 my-4">
            <div class="border-b border-gray-900/10 pb-12">
                <div class="w-full text-center">
                    <h2 class="mt-2 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
                        Información de la Promoción
                    </h2>
                </div>

                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="sm:col-span-3">
                        <label for="fecha_inicio_oferta" class="block text-sm font-medium leading-6 text-gray-900">
                            Fecha de inicio
                        </label>
                        <div class="mt-2">
                            <Field v-model="promocion.fecha_inicio_oferta" name="fecha_inicio_oferta" rules="required"
                                id="fecha_inicio_oferta" type="Date" placeholder="Ingresa tu primer nombre"
                                autocomplete="given-name"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            <ErrorMessage name="fecha_inicio_oferta" class="text-red-500 text-xs" />
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label for="fecha_fin_oferta" class="block text-sm font-medium leading-6 text-gray-900">
                            Fecha de finalización
                        </label>
                        <div class="mt-2">
                            <Field v-model="promocion.fecha_fin_oferta" name="fecha_fin_oferta" rules="required"
                                id="fecha_fin_oferta" type="Date" placeholder="Ingresa tu primer nombre"
                                autocomplete="given-name"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            <ErrorMessage name="fecha_fin_oferta" class="text-red-500 text-xs" />
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label for="nombre_oferta" class="block text-sm font-medium leading-6 text-gray-900">
                            Nombre de la promoción
                        </label>
                        <div class="mt-2">
                            <Field v-model="promocion.nombre_oferta" name="nombre_oferta" rules="required"
                                id="nombre_oferta" type="text" placeholder="Ingresa el nombre de la promoción"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                style="resize: vertical !important" />
                            <ErrorMessage name="nombre_oferta" class="text-red-500 text-xs" />
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label for="precio_oferta" class="block text-sm font-medium leading-6 text-gray-900">Precio de
                            promoción</label>
                        <div class="mt-2">
                            <div class="mt-2 relative rounded-md shadow-sm">
                                <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    $
                                </span>
                                <Field name="precio_oferta" rules="required" v-model="promocion.precio_oferta"
                                    id="precio_oferta" type="number" min="0" placeholder="Ingresa el precio de la promoción"
                                    class="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <span class="text-gray-700 sm:text-sm sm:leading-5"> USD </span>
                                </div>
                            </div>
                            <ErrorMessage name="precio_oferta" class="text-red-500 text-xs" />
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label for="cantidad_producto" class="block text-sm font-medium leading-6 text-gray-900">Cantidad
                            del
                            producto</label>
                        <div class="mt-2">
                            <div class="mt-2 relative rounded-md shadow-sm">
                                <Field name="cantidad_producto" rules="required" v-model="promocion.cantidad_producto"
                                    id="cantidad_producto" type="number" min="0"
                                    placeholder="Ingresa la cantidad de productos"
                                    class="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <span class="text-gray-700 sm:text-sm sm:leading-5"> UNI </span>
                                </div>
                            </div>
                            <ErrorMessage name="cantidad_producto" class="text-red-500 text-xs" />
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label for="codigo_barra_producto"
                            class="block text-sm font-medium leading-6 text-gray-900">Producto en promoción</label>
                        <div class="mt-2">
                            <Field as="select" required name="codigo_barra_producto" id="codigo_barra_producto"
                                v-model="promocion.codigo_barra_producto"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                <option value="" selected disabled>Seleccionar...</option>
                                <option v-for="producto in productos" :key="producto.codigo_barra_producto"
                                    :value="producto.codigo_barra_producto">
                                    {{ producto.nombre_producto }} - ${{ producto.precio_unitario }}
                                </option>
                            </Field>
                            <ErrorMessage name="codigo_barra_producto" class="text-red-500 text-xs" />
                        </div>
                    </div>


                    <div class="sm:col-span-3">
                        <label for="monto_rebaja" class="block text-sm font-medium leading-6 text-gray-900">
                            Monto de Rebaja
                        </label>
                        <div class="mt-2">
                            <div class="relative rounded-md shadow-sm">
                                <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    $
                                </span>
                                <input id="monto_rebaja" type="text"
                                    class="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    :value="promocion.monto_rebaja" readonly />
                                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <span class="text-gray-700 sm:text-sm sm:leading-5"> USD </span>
                                </div>
                            </div>
                        </div>
                    </div>





                </div>
            </div>
        </div>

        <!--submit button-->
        <div class="flex items-center justify-center">
            <router-link to="/marketing/consultar_ofertas"
                class=" m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Cancelar
            </router-link>
            <button v-if="createForm" type="submit"
                class=" m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Registrar Oferta
            </button>
            <button v-else type="submit"
                class=" m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Guardar Cambios
            </button>
        </div>
    </Form>
</template>

<script>
import axios from 'axios'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { defineRule } from 'vee-validate'
import { useRoute } from 'vue-router'
import { showMessages } from '../../components/functions.js'

function requerido(value) {
    if (value) { return true }
    return "*Campo requerido"
}
function seleccione(value) {
    if (value) { return true }
    return "Seleccione una opción"
}
const schema = {
    fecha_inicio_oferta: (value) => {
        return requerido(value)
    },
    fecha_fin_oferta: (value) => {
        return requerido(value)
    },
    nombre_oferta: (value) => {
        return requerido(value)
    },
    precio_oferta: (value) => {
        return requerido(value)
    },
    codigo_barra_producto: (value) => {
        return seleccione(value)
    }

}

export default {
    props: {
        createForm: null
    },
    components: {
        Form,
        Field,
        ErrorMessage
    },
    data() {
        return {
            id: 0,
            showMessageError: false,
            showMessageSuccess: false,
            productos: null,
            promocion: {
                fecha_inicio_oferta: '',
                fecha_fin_oferta: '',
                nombre_oferta: '',
                precio_oferta: '',
                codigo_barra_producto: '',
                cantidad_producto: '',
                monto_rebaja: '',
                precio_unitario: 0,
            },
            error: []
        }
    },
    mounted() {
        const route = useRoute()
        this.id = route.params.id
        this.getProductos()
    },
    watch: {
        promocion: {
            handler: function (val, oldVal) {
                this.calcularDescuento();
            },
            deep: true
        }
    },
    methods: {
        getProductos() {
            axios.get(api_url + '/productoProm')
                .then((response) => (
                        this.productos = response.data,
                        this.createForm == false ? this.getOferta() : null
                    ))
        },
        getOferta() {
            axios.get('api/oferta/' + this.id).then(
                response => (
                    this.promocion.codigo_barra_producto = response.data['codigo_barra_producto'],
                    this.promocion.fecha_inicio_oferta = response.data['fecha_inicio_oferta'],
                    this.promocion.fecha_fin_oferta = response.data['fecha_fin_oferta'],
                    this.promocion.nombre_oferta = response.data['nombre_oferta'],
                    this.promocion.precio_oferta = response.data['precio_oferta'],
                    this.promocion.cantidad_producto = response.data['cantidad_producto'],
                    this.promocion.monto_rebaja = response.data['monto_rebaja'],
                    this.calcularDescuento()
                )
            )
                .catch((error) => {
                    if (error.response.status === 404) {
                        // La solicitud no fue encontrada (404)
                        console.log('La solicitud no ha sido encontrada.')
                        this.error[0] = 'Oferta no encontrada'
                        showStatusModal(this.error)
                        this.showMessageError = true
                        // O puedes mostrar un mensaje en tu interfaz de usuario
                    } else {
                        // Ocurrió otro tipo de error
                        console.log('Ocurrió un error:', error.message)
                    }
                })
        },
        savePromocion(values) {
            if (this.createForm == true) {
                const params = {
                    fecha_inicio_oferta: this.promocion.fecha_inicio_oferta,
                    fecha_fin_oferta: this.promocion.fecha_fin_oferta,
                    precio_oferta: this.promocion.precio_oferta,
                    nombre_oferta: this.promocion.nombre_oferta,
                    codigo_barra_producto: this.promocion.codigo_barra_producto,
                    cantidad_producto: this.promocion.cantidad_producto,
                    monto_rebaja: this.promocion.monto_rebaja,
                }
                axios.post(api_url + '/promociones', params).then(
                    (response) => {
                        response.data.message.forEach(mensaje => {
                            showMessages(response.data.status, mensaje);
                        });
                        this.$router.push('/marketing/consultar_ofertas')
                        this.$router.go(1);
                    }
                ).catch(
                    (error) => {
                        error.response.data.message.forEach(mensaje => {
                            showMessages(error.response.data.status, mensaje);
                        })
                    }
                )
            } else {
                const params = {
                    fecha_inicio_oferta: this.promocion.fecha_inicio_oferta,
                    fecha_fin_oferta: this.promocion.fecha_fin_oferta,
                    precio_oferta: this.promocion.precio_oferta,
                    nombre_oferta: this.promocion.nombre_oferta,
                    codigo_barra_producto: this.promocion.codigo_barra_producto,
                    cantidad_producto: this.promocion.cantidad_producto,
                    monto_rebaja: this.promocion.monto_rebaja,
                }
                axios.put(api_url + '/ofertaUpdate/' + this.id, params).then(
                    (response) => {
                        response.data.message.forEach(mensaje => {
                            showMessages(response.data.status, mensaje);
                        });
                        this.$router.push('/marketing/consultar_ofertas')
                        this.$router.go(1);
                    }
                ).catch(
                    (error) => {
                        error.response.data.message.forEach(mensaje => {
                            showMessages(error.response.data.status, mensaje);
                        })
                    }
                )
            }
        },
        scroll() {
            let submitMessage = document.getElementById('submitMessage');
            submitMessage.scrollIntoView(false);
        },
        clearForm() {
            this.showMessageSuccess = false;
            this.showMessageError = false;
            this.$refs.promocionForm.resetForm(); // Usamos resetForm para limpiar el formulario
        },
        calcularDescuento() {
            this.obtenerPrecioUnitario().then((res) => {
                const precioOferta = Number(this.promocion.precio_oferta);
                const precioUnitario = Number(this.promocion.precio_unitario);
                const cantidadProducto = Number(this.promocion.cantidad_producto);
                const montoRebaja = Number((precioUnitario * cantidadProducto) - precioOferta).toFixed(2);

                this.promocion.monto_rebaja = montoRebaja;

                console.log(precioOferta, precioUnitario, cantidadProducto, montoRebaja);
            });

        },
        obtenerPrecioUnitario() {
            return new Promise((resolve, reject) => {
                const codigoBarraSeleccionado = this.promocion.codigo_barra_producto;
                console.log('Codigo de barra seleccionado:', codigoBarraSeleccionado)
                console.log('Lista de productos:', this.productos)
                // Busca el producto seleccionado en la lista de productos
                const productoSeleccionado = this.productos.find(producto => producto.codigo_barra_producto == codigoBarraSeleccionado);
                if (productoSeleccionado) {
                    // Si el producto se encuentra, actualiza el precio_unitario
                    this.promocion.precio_unitario = productoSeleccionado.precio_unitario;
                    // Imprime el precio unitario en la consola
                    console.log('Precio Unitario:', productoSeleccionado.precio_unitario);
                } else {
                    console.log('Producto no encontrado');
                }
                resolve();
            });

        }
    }
}
</script>

<style scope></style>
