<template>
    <Transition name="modal">
        <div v-if="show" class="modal-mask bg-white">
            <div class="modal-container">
                <h1 class="text-2xl font-bold mb-6 text-center">Confirmar Desvincular</h1>
                <div class="mb-4 flex flex-row items-center justify-center">
                    <p for="fecha_pedido text-center">¿Está seguro que desea desvincular este Pedido de la Hoja de Ruta?</p>
                </div>
                <div class="mb-4 flex flex-row items-center justify-center">
                    <p v-if="!is_credito" class="text-center font-bold text-blue-950">------- Cliente: {{ factura.venta.nombre_cliente_venta }} -------</p>
                    <p v-else class="text-center">------- Cliente: {{ factura.credito_fiscal.cliente.distintivo_cliente }} -------</p>
                
                    <p v-if="!is_credito" class="text-center font-bold text-blue-950">------- Fecha: {{ factura.venta.fecha_venta }} -------</p>
                    <p v-else class="text-center">------- Fecha: {{ factura.credito_fiscal.fecha_credito }} -------</p>

                    <p v-if="!is_credito" for="fecha_pedido" class="text-center font-bold text-blue-950">Cliente: {{ factura.venta.nombre_cliente_venta }} -------</p>
                    <p v-else for="fecha_pedido" class="text-center">------- Monto Cancelado: ${{ total.toFixed(2)}} -------</p>
                
                </div>
                <div>
                    <div class="mb-4">
                        <h3 class="text-xl text-blue-950 font-bold mb-6 text-center">El pedido podrá asignarse a otra Hoja de Ruta</h3>
                    </div>
                    <div class="text-center">
                        <button @click="desvincular_pago()"
                            class="bg-red-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300">Confirmar</button>
                        <button id="btnCancelar" @click="$emit('close')"
                            class="ml-4 py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200">
                            Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>
<script>
import api_url from "../../config";
import axios from 'axios';
import { useToast } from 'vue-toastification'

const toast = useToast();

export default {
    data() {
        return {
        }
    },
    props: ['show', 'factura', 'total', 'is_credito'],
    mounted() {
    },
    methods: {
        confirmar_pago() {
            console.log(this.factura);
            if (this.is_credito) {
                axios.post(api_url + '/creditos/desvincular_hr/' + this.factura.id_vd)
                    .then(response => {
                        if (response.data.success) {
                            this.watch_toast("success", "Pedido desvinculado.");
                            this.$emit('confirmed');
                        }
                    }).catch(error => {
                        this.watch_toast("error", "Ocurrió un error, vuelva a intentar");
                        console.log(error);
                    });
            } else {
                axios.post(api_url + '/ventas/desvincular_hr/' + this.factura.id_vd)
                    .then(response => {
                        if (response.data.success) {
                            this.watch_toast("success", "Pedido desvinculado.");
                            this.$emit('confirmed');
                        }
                    }).catch(error => {
                        this.watch_toast("error", "Ocurrió un error, vuelva a intentar");
                        console.log(error);
                    });
            }

        },
        //Mostrar Toast de exito o error
        watch_toast(tipo, mensaje) {
            if (tipo == "success") {
                toast.success(mensaje, {
                    position: "bottom-left",
                    timeout: 2994,
                    closeOnClick: true,
                    pauseOnFocusLoss: false,
                    pauseOnHover: false,
                    draggable: true,
                    draggablePercent: 0.27,
                    showCloseButtonOnHover: false,
                    hideProgressBar: true,
                    closeButton: "button",
                    icon: true,
                    rtl: false
                });
            } else {
                toast.error(mensaje, {
                    position: "bottom-left",
                    timeout: 2994,
                    closeOnClick: true,
                    pauseOnFocusLoss: false,
                    pauseOnHover: false,
                    draggable: true,
                    draggablePercent: 0.27,
                    showCloseButtonOnHover: false,
                    hideProgressBar: true,
                    closeButton: "button",
                    icon: true,
                    rtl: false
                });
            }
        }
    }
}
</script>

<style scoped>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    transition: opacity 0.3s ease;
}

.modal-container {
    width: 500px;
    margin: auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
}

.modal-default-button {
    float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
    opacity: 0;
}

.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>
