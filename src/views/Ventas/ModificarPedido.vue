<template>
    <NavBar />
    <div class="h-screen">

        <div class="w-full bg-slate-100">
            <div>
                <div class="flex bg-white mx-auto p-5 shadow-md justify-between">
                    <h1 class="font-bold text-blue-700 text-xl">Modificar Pedido</h1>
                </div>
                <div class="flex justify-start items-center mt-4 ml-4">
                    <a href="#" @click="$router.go(-1)" class="text-sm text-black font-medium flex items-center">
                        <img src="../../assets/icons/arrow.svg" alt="Regresar" class="h-6 w-6 mr-1"> Regresar
                    </a>
                </div>
            </div>

            <!-- Tabs para Consumidor Final y Credito Fiscal-->
            <div class="flex flex-col h-full mt-6 ml-2 pl-2 pr-4">
                <div class="flex justify-start items-center border-b-2 border-b-indigo-500">
                    <div class="tab" :class="{ 'active': active_tab === 0 }" @click="active_tab = 0">
                        Consumidor Final
                    </div>
                </div>
                <!-- Contenido de los tabs -->
                <div class="tab-content flex-grow">

                    <!-- Contenido del formulario para Consumidor Final -->
                    <div class="p-4 bg-white">
                        <div class="flex pb-36">
                            <div class="w-3/4 pr-4 h-full min-h-screen pt-4 overflow-auto">
                                <!-- Contenido del bloque de espacio izquierdo (3/4 del espacio) -->
                                <!-- Input para ingresar Producto -->
                                <div class="flex justify-start items-center pb-6">
                                    <label class="text-base font-bold">
                                        Producto
                                    </label>
                                    <input @input="listener_buscar_codigo_producto()" ref="codigo_bp"
                                        class="mx-4 text-slate-600 focus:outline-none focus:border focus:border-indigo-700 bg-white font-normal w-40 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                        placeholder="Codigo del Producto" v-model="producto_codigo" />
                                    <div class="sugerencias-container md:col-span-3">
                                        <!-- Campo de entrada -->
                                        <input @input="listener_producto_nombre()" @focus="mostrar_sugerencias = true"
                                            @blur.self="mostrar_sugerencias = false"
                                            class="md:col-span-3 text-slate-600 focus:outline-none focus:border focus:border-indigo-700 bg-white font-normal h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                            placeholder="Nombre del Producto" v-model="producto_nombre" />

                                        <!-- Lista de sugerencias -->
                                        <ul class="sugerencias-lista border border-slate-500"
                                            v-if="mostrar_sugerencias && sugerencias.length > 0">
                                            <li class="m-2" href="#" v-for="sugerencia in sugerencias" :key="sugerencia.id"
                                                @mousedown.prevent="seleccionar_sugerencia_producto(sugerencia)">
                                                <button class="w-full text-left">
                                                    {{ sugerencia }}
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <!-- Tabla de DetalleVenta -->
                                <table class="table-fixed w-full shadow-lg">
                                    <thead>
                                        <tr class="border-b-2 border-black-400 h-[40px] bg-slate-100">
                                            <th class="font-bold">Item</th>
                                            <th class="font-bold">Nombre del Producto</th>
                                            <th class="font-bold">Cantidad</th>
                                            <th class="font-bold">Precio Unitario ($)</th>
                                            <th class="font-bold">Subtotal ($)</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(fila, index) in detalle_ventas_lista" :key="fila.id_venta"
                                            class="border-b-2 border-black-400 h-[40px] bg-black-300">
                                            <td class="text-center">{{ index + 1 }}</td>
                                            <td class="text-center">{{ fila.producto.nombre_producto }}</td>
                                            <td class="text-center">
                                                <input @change="watch_cantidad_producto(fila)"
                                                    class="w-auto h-[25px] text-center" type="number" min="1" max="100"
                                                    v-model="fila.cantidad_producto">
                                            </td>
                                            <td class="text-center">${{ fila.producto.precio_unitario_mostrar ?
                                                fila.producto.precio_unitario_mostrar : fila.producto.precio }}</td>
                                            <td class="text-center">${{ fila.subtotal_detalle_venta }}</td>
                                            <td class="flex justify-end pr-4 py-2">
                                                <button @click="eliminar_detalle_venta(index + 1)"
                                                    class="font-medium text-center text-white rounded ml-4 bg-red-600 h-[25px] w-[25px]">
                                                    X
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <!-- Contenido del bloque de espacio derecho (1/4 del espacio) -->
                            <div class="w-1/4 border-l border-gray-300 pl-2 flex-shrink-0 min-h-[200px] overflow-x-auto">

                                <div v-if="active_tab === 0">
                                    <!-- PARA CONSUMIDOR FINAL-->
                                    <div class="flex md:flex-row flex-col items-center py-4 px-4">
                                        <!-- Input para ingresar Fecha -->
                                        <div class="flex flex-col md:mr-16">
                                            <label for="fecha_venta"
                                                class="text-black-800 text-sm font-bold leading-tight tracking-normal mb-2">
                                                Fecha de Venta
                                            </label>
                                            <input id="fecha_venta" type="date" name="fecha_venta"
                                                v-bind:disabled="fechaEditable" v-model="venta_info.fecha_venta"
                                                class="w-full text-slate-600 focus:outline-none focus:border focus:border-indigo-700 bg-white font-normal h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" />
                                        </div>
                                    </div>
                                    <div class="flex flex-shrink-0 md:flex-row flex-col items-center py-4 px-4">
                                        <!-- Input para ingresar Cliente -->
                                        <div class="flex flex-col">
                                            <label for="nombre_cliente"
                                                class="text-black-800 text-sm font-bold leading-tight tracking-normal mb-2">
                                                Cliente
                                            </label>
                                            <input id="nombre_cliente" type="text" name="nombre_cliente"
                                                class="w-full text-slate-600 focus:outline-none focus:border focus:border-indigo-700 bg-white font-normal h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                                                placeholder="Joaquin Perez" v-model="venta_info.nombre_cliente_venta" />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <!-- Resumen de la Venta -->
                        <hr>
                        <div class="grid grid-cols-12 pl-8">
                            <table class="table col-span-4">
                                <thead>
                                    <tr class="border-b-2 border-black-400 h-[40px]">
                                        <th class="font-bold">Resumen</th>
                                        <th class="font-bold"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="h-[40px] bg-black-300">
                                        <td class="text-right">
                                            <label class="mb-3 pt-3 text-sm font-normal text-black pr-4">
                                                Subtotal:
                                            </label>
                                        </td>
                                        <td class="text-center">
                                            <div class="flex items-center">
                                                <span
                                                    class="inline-block align-middle h-[40px] rounded-tl-md rounded-bl-md border border-r-0 bg-gray-100 py-2 px-3 text-base">
                                                    $
                                                </span>
                                                <label
                                                    class="text-slate-600 bg-white font-normal h-[40px] pl-3 flex items-center border-l-0 text-sm border-gray-100 rounded-tr-md rounded-br-md border">
                                                    {{ Number(Number(subtotal_venta) + Number(venta_info.total_descuentos)).toFixed(2) }}
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr class="border-b-2 border-black-400 h-[40px] bg-black-300">
                                        <td class="text-right">
                                            <label class="mb-3 pt-3 text-sm font-normal text-black pr-4">
                                                Impuestos (+):
                                            </label>
                                        </td>
                                        <td class="text-center">
                                            <div class="flex items-center">
                                                <span
                                                    class="inline-block align-middle h-[40px] rounded-tl-md rounded-bl-md border border-r-0 bg-gray-100 py-2 px-3 text-base">
                                                    $
                                                </span>
                                                <input
                                                    class="text-slate-600 bg-white font-normal h-[40px] pl-3 flex items-center border-l-0 text-sm border-gray-100 rounded-tr-md rounded-br-md border"
                                                    placeholder="0.00" disabled v-model="venta_info.total_iva">
                                            </div>
                                        </td>
                                    </tr>
                                    <tr class="border-b-2 border-black-400 h-[40px] bg-black-300">
                                        <td class="text-right">
                                            <label class="mb-3 pt-3 text-sm font-normal text-black pr-4">
                                                Descuentos (-):
                                            </label>
                                        </td>
                                        <td class="text-center">
                                            <div class="flex items-center">
                                                <span
                                                    class="inline-block align-middle h-[40px] rounded-tl-md rounded-bl-md border border-r-0 bg-gray-100 py-2 px-3 text-base">
                                                    $
                                                </span>
                                                <input
                                                    class="text-slate-600 bg-white font-normal h-[40px] pl-3 flex items-center border-l-0 text-sm border-gray-100 rounded-tr-md rounded-br-md border"
                                                    placeholder="0.00" disabled v-model="venta_info.total_descuentos">
                                            </div>
                                        </td>
                                    </tr>
                                    <tr class="border-b-2 border-black-400 h-[50px] bg-black-300">
                                        <td class="text-right">
                                            <label class="mb-3 pt-3 text-sm font-bold text-black pr-4">
                                                TOTAL (USD):
                                            </label>
                                        </td>
                                        <td class="text-center">
                                            <div class="flex items-center">
                                                <input
                                                    class="text-slate-600 bg-white font-bold h-[40px] pl-3 flex items-center text-sm  rounded-tr-md rounded-br-md"
                                                    placeholder="0.00" disabled v-model="venta_info.total_venta">
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="grid grid-cols-12 col-span-8 justify-center items-center py-4 px-4 w-full mt-10">
                                <div class="flex justify-end col-span-6">
                                    <button v-if="active_tab === 0" @click="register_new_venta()"
                                        :class="{ 'bg-emerald-600 hover:bg-emerald-800': active_tab == 1, 'bg-indigo-600 hover:bg-indigo-800': active_tab == 0 }"
                                        class="h-auto text-white font-bold py-2 px-4 rounded">
                                        Actualizar Pedido (Factura)
                                    </button>
                                </div>

                            </div>
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
import "../../assets/registrar_venta.css";
import moment from 'moment';
import { useToast } from 'vue-toastification';
import { useRoute } from 'vue-router';
import { createElementBlock } from 'vue';
import NavBar from '@/components/NavBar.vue';

const toast = useToast();

export default {
    components: {
        NavBar: NavBar,
    },
    data() {
        return {
            id: null,
            fechaEditable: true,
            //Tab activo (0 = Consumidor Final, 1 = Credito Fiscal)
            active_tab: 0,

            // Objeto Producto
            producto_info: {},
            // Listado de Detalles (para tabla) y objeto Detalle
            detalle_ventas_lista: [],
            detalle_venta: {
                id_venta: 0,
                producto: [],
                cantidad_producto: 0,
                subtotal_detalle_venta: 0.00,
                descuentos_detalle: 0.00,
            },
            //Objeto Venta
            venta_info: {
                id_venta: 0,
                nombre_cliente_venta: "",
                fecha_venta: null,
                total_venta: 0,
                total_iva: 0,
                total_descuentos: 0.00,
            },

            //Producto busqueda por nombre
            producto_nombre: '',

            //Contador Autoincremental para la tabla Detalle
            contador_tabla: 0,

            //Subtotal de la venta
            subtotal_venta: 0.00,

            //Codigo de Lector de Barras (para buscar producto)
            codigo_barra_lector: '',
            producto_codigo: '', //Para la busqueda de productos por filtro de codigo
            timer: null, //Para el timer del lector de barras

            //Para la busqueda de productos por filtro de nombre
            productos: [], // Lista de nombres de productos completa
            sugerencias: [], // Sugerencias de productos a partir del input de busqueda
            mostrar_sugerencias: false, // Mostrar o no las sugerencias
        };
    },
    created() {
        this.asignar_fecha_actual();
        this.get_lista_nombres_productos();
        //this.get_lista_nombres_clientes();
    },
    mounted() {
        document.addEventListener('keydown', this.redirigir_entrada_input);
        const route = useRoute();
        this.id = route.params.id;
        this.getVenta();
    },
    watch: {
        //Calculos en cada cambio de detalle de venta
        detalle_ventas_lista: {
            handler() {
                this.subtotal_venta = 0;
                this.venta_info.total_venta = 0;
                this.venta_info.total_descuentos = 0;
                this.detalle_ventas_lista.forEach((detalle) => {
                    this.venta_info.total_venta += Number(detalle.subtotal_detalle_venta);
                    this.venta_info.total_descuentos += Number(detalle.descuentos);

                });
                this.venta_info.total_venta = this.venta_info.total_venta - this.venta_info.total_descuentos;
                this.subtotal_venta = (this.venta_info.total_venta / (1 + 0.13)).toFixed(4);
                this.venta_info.total_iva = Number(this.subtotal_venta * 0.13).toFixed(2);
                this.venta_info.total_venta = Number(this.venta_info.total_venta).toFixed(2);
                this.subtotal_venta = Number(this.subtotal_venta).toFixed(2);
                this.venta_info.total_descuentos = Number(this.venta_info.total_descuentos).toFixed(2);

            },
            deep: true,
        },
    },
    methods: {
        getVenta() {
            return new Promise((resolve, reject) => {
                resolve();
                axios.get(api_url + '/ventasCF_detalle/' + this.id).then(
                    response => {
                        console.log(response.data),
                            this.venta_info = response.data.ventaCF,
                            this.calcular_subtotalventa(),
                            this.detalle_ventas_lista = response.data.ventaCF.detalle_venta,
                            this.watch_cantidad_producto_load(),
                            (response.data.ventaCF.venta_domicilio == null ? this.fechaEditable = false : this.fechaEditable = true)
                    });
            });
        },
        calcularSubtotalDetalleVenta(element) {
            return new Promise((resolve, reject) => {


                console.log('que hay aqui:');
                console.log(element);
                try {
                    var cantidad_compra = element.cantidad_producto;
                    if (element.producto.ofertas_vigentes?.length > 0) {
                        var ofertasOrdenadas = element.producto.ofertas_vigentes.sort((a, b) => a.cantidad_producto - b.cantidad_producto);
                        let ofertaCercana = ofertasOrdenadas[0];
                        if (element.cantidad_producto < ofertaCercana.cantidad_producto) {
                            element.descuentos = 0;
                        } else {
                            for (let i = 0; i < ofertasOrdenadas.length; i++) {
                                if (ofertasOrdenadas[i].cantidad_producto <= cantidad_compra) {
                                    ofertaCercana = ofertasOrdenadas[i];
                                } else {
                                    break;
                                }
                            }
                            element.descuentos = ofertaCercana.monto_rebaja;
                        }
                    }
                } catch (error) {
                    console.log(error);
                }


                let precio = Number(element.producto.precio_unitario);
                let unidadesMedida = element.producto.precio_unidad_de_medida;
                unidadesMedida.sort((a, b) => a.cantidad_producto - b.cantidad_producto);
                if (unidadesMedida) {
                    unidadesMedida.forEach(unidadMedida => {
                        if (Number(element.cantidad_producto) >= Number(unidadMedida.cantidad_producto)) {
                            precio = Number(unidadMedida.precio_unidad_medida_producto / unidadMedida.cantidad_producto).toFixed(4);
                        }
                    });
                }
                element.subtotal_detalle_venta = Number(element.cantidad_producto * precio).toFixed(2);
                element.producto.precio_unitario_mostrar = Number(precio).toFixed(4);

                resolve();
            });
        },
        watch_cantidad_producto_load() {
            console.log("si entra al cargar")
            this.detalle_ventas_lista.forEach(element => {
                this.calcularSubtotalDetalleVenta(element);
            });
        },
        redirigir_entrada_input() {
            if (!(document.activeElement.tagName == "INPUT")) {
                // No hay ningún campo activo, enfocar al input de busqueda por codigo
                this.$refs.codigo_bp?.focus();
            }
        },
        listener_buscar_codigo_producto() {
            var codigoBarras = this.producto_codigo;
            console.log("codigo barras: " + codigoBarras);
            // Reiniciar el temporizador
            this.timer ? clearTimeout(this.timer) : null;
            // Si llegamos al limite de 20 detalles, return
            if (this.contador_tabla >= 20) {
                console.log("Limite de 20 detalles");
                this.watch_toast('error', 'Limite de productos por factura alcanzado.');
                return;
            }
            // Establecer un nuevo temporizador para ejecutar la búsqueda después de un cierto tiempo (por ejemplo, 500 ms)
            this.timer = setTimeout(() => {
                this.codigo_barra_lector = codigoBarras;
                this.get_producto_segun_codigo();
            }, 500);
        },
        //Eliminar detalle de venta de la tabla
        eliminar_detalle_venta(index) {
            console.log("index: " + index);
            if (this.detalle_ventas_lista.length === 1) {
                // Si solo queda un detalle, restablecer los valores en lugar de eliminarlo
                this.detalle_ventas_lista = []
                this.contador_tabla = 0;
            } else {
                this.detalle_ventas_lista.splice(index - 1, 1); //Index-1 porque el index empieza en 1
                this.contador_tabla = this.contador_tabla - 1;
            }
        },
        //Obtener lista de todos los nombres de productos en la bdd
        get_lista_nombres_productos() {
            return axios
                .get(api_url + '/productos/nombres/lista')
                .then((response) => {
                    this.productos = response.data.nombres_productos;
                    console.log("nombreees: " + response.data.nombres_productos);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        //Buscar el nombre del producto mas cercano al texto ingresado
        listener_producto_nombre() {
            if (this.producto_nombre && this.mostrar_sugerencias) {
                this.sugerencias = this.productos.filter((producto) => {
                    return producto.toLowerCase().includes(this.producto_nombre.toLowerCase());
                });
            } else {
                this.sugerencias = [];
            }
        },
        //Seleccionar sugerencia de producto en buscador
        seleccionar_sugerencia_producto(sugerencia) {
            this.producto_nombre = sugerencia;
            this.agregar_producto_detalle();
            this.sugerencias = [];
        },

        //Buscar Producto por codigo
        get_producto_segun_codigo() {
            return axios
                .get(api_url + '/productos/' + this.codigo_barra_lector)
                .then((res) => {
                    if (res.data.producto == null) {
                        this.watch_toast("error", "Producto no encontrado");
                        return;
                    }
                    if (res.data.producto.esta_disponible == false) {
                        this.watch_toast("error", "Producto no disponible actualmente");
                        return;
                    }
                    console.log(res.data.producto);
                    this.producto_info = res.data.producto
                    this.producto_info['precio_unitario_original'] = res.data.producto.precio_unitario;
                    console.log(this.producto_info + "producto pegado");
                    return this.add_detalle_venta();
                })
                .then(() => {
                    console.log("Agregado a la tabla");
                    this.producto_codigo = '';
                })
                .catch((err) => {
                    this.watch_toast("error", "Producto no encontrado");
                    console.log(err);
                });
        },
        //Actualizar Fecha automaticamente
        asignar_fecha_actual() {
            this.venta_info.fecha_venta = moment().format('yyyy-MM-DD');
        },
        //Anadir registro en tabla DETALLE
        agregar_producto_detalle() {
            if (this.contador_tabla >= 20) {
                console.log("Limite de 20 detalles, consumidor final");
                this.watch_toast('error', 'Limite de productos por factura (cons. final) alcanzado.');
                return;
            }
            this.get_producto_segun_nombre()
                .then(() => {
                    return this.add_detalle_venta();
                })
                .then(() => {
                    console.log("Todo bien todo correcto")
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        //Buscar Producto por Nombre
        get_producto_segun_nombre() {
            return new Promise((resolve, reject) => {
                // Verificar que el campo no esté vacío
                if (!this.producto_nombre) {
                    console.log('Campo vacío');
                    reject('Campo vacío');
                    return;
                }
                axios.get(api_url + '/productos/buscar/' + this.producto_nombre)
                    .then((res) => {
                        if (res.data.producto.esta_disponible == false) {
                            this.watch_toast("error", "Producto no disponible actualmente");
                            return;
                        }
                        this.producto_info = res.data.producto[0]
                        this.producto_info['precio_unitario_original'] = res.data.producto[0].precio_unitario;
                        console.log(res.data.producto[0].codigo_barra_producto);
                        this.producto_nombre = '';
                        //this.watch_toast("success", "Producto agregado");
                        resolve(); // Resolver la promesa
                    })
                    .catch((err) => {
                        this.watch_toast("error", err.response.data.mensaje);
                        console.log(err.response.data);
                        reject(err.response.data);
                    });
            });
        },
        //Metodos de Detalles
        add_detalle_venta() {
            if (this.contador_tabla >= 20) {
                console.log("Limite de 20 detalles");
                this.watch_toast('error', 'Limite de productos por factura alcanzado.');
                return;
            }
            //Habian problemas con el objeto, toca hacer una copia
            const producto_copia = JSON.parse(JSON.stringify(this.producto_info));
            // Verificar que el producto no esté ya en la tabla
            const producto_ya_agregado = this.detalle_ventas_lista.find((detalle) => {
                return detalle.producto.codigo_barra_producto === producto_copia.codigo_barra_producto;
            });
            if (producto_ya_agregado) {
                // Si el producto ya está en la tabla, aumentar la cantidad a ese detalle
                producto_ya_agregado.cantidad_producto++;
                this.calcularSubtotalDetalleVenta(producto_ya_agregado);
                return this.calcular_subtotalventa();
            }
            return new Promise((resolve, reject) => {
                const detalle = {
                    id_venta: this.contador_tabla, //Este valor es solo para usarlo en la tabla
                    producto: producto_copia,
                    cantidad_producto: 1,
                    subtotal_detalle_venta: this.producto_info.precio_producto,
                    descuentos: 0.00,
                };
                this.detalle_ventas_lista.push(detalle);
                this.producto_nombre = '';
                this.contador_tabla++;
                this.calcularSubtotalDetalleVenta(this.detalle_ventas_lista[this.detalle_ventas_lista.length - 1]);
                resolve();
            });
        },
        //Observar cambios en cantidad de producto y actualizar subtotal
        watch_cantidad_producto(fila) {
            //this.verificar_unidad_medida(fila)
            this.calcularSubtotalDetalleVenta(fila)
                .then(() => {
                    return this.calcular_subtotalventa();
                })
                .then(() => {
                    console.log("Todo bien todo correcto")
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        verificar_unidad_medida(detalle) {
            return new Promise((resolve, reject) => {
                var cantidad_compra = detalle.cantidad_producto;
                // Ordenar el array de precio_unidad_de_medida por cantidad_producto de forma ascendente
                var preciosOrdenados = detalle.producto.precio_unidad_de_medida.sort((a, b) => a.cantidad_producto - b.cantidad_producto);
                // Encontrar el objeto con cantidad_producto menor más cercana a cantidad_compra
                let precioUnidadCercano = preciosOrdenados[0]; // Por defecto, tomar el primero

                precioUnidadCercano ? console.log('Verificando precios extras...') : resolve();
                if (detalle.cantidad_producto < precioUnidadCercano.cantidad_producto) {
                    detalle.producto.precio_unitario = detalle.producto.precio_unitario_original;
                    resolve();
                } else {
                    for (let i = 0; i < preciosOrdenados.length; i++) {
                        if (preciosOrdenados[i].cantidad_producto <= cantidad_compra) {
                            precioUnidadCercano = preciosOrdenados[i];
                        } else {
                            break; // Detener el bucle al encontrar el primer valor mayor
                        }
                    }
                    // Calcular el precio_producto basado en el promedio entre cantidad_producto y precio_unidad
                    detalle.producto.precio_unitario = (parseFloat(precioUnidadCercano.precio_unidad_medida_producto) / parseFloat(precioUnidadCercano.cantidad_producto)).toFixed(4);
                    console.log(detalle.producto.precio_unitario);
                    resolve();
                }
            });

        },
        //Subtotal de la venta RESUMEN
        calcular_subtotalventa() {
            new Promise((resolve, reject) => {
                // this.subtotal_venta = this.detalle_ventas_lista.reduce(
                //     (acc, obj) => acc + Number(obj.subtotal_detalle_venta),
                //     0.0000
                // );
                // this.subtotal_venta = Number(this.subtotal_venta / 1.13).toFixed(2);
                resolve();
            });
        },
        //Registrar Venta y obtener el id de la venta registrada
        register_new_venta() {
            if (this.detalle_ventas_lista.length == 0) {
                this.watch_toast('error', 'No se ha agregado ningun producto');
                return;
            }
            var datos_ventas = {};
            var detalles_listado_limpio = [];
            var detalle_obj = {};
            if (this.active_tab == 0) {
                // Para obtener el listado de ventas limpio para la insercion en la base de datos
                this.detalle_ventas_lista.map((detalle) => {
                    detalle_obj = {
                        id_venta: 0,
                        codigo_barra_producto: String(detalle.producto.codigo_barra_producto),
                        cantidad_producto: detalle.cantidad_producto,
                        subtotal_detalle_venta: Number(detalle.subtotal_detalle_venta),
                        descuentos: Number(detalle.descuentos),
                    };
                    detalles_listado_limpio.push(detalle_obj);
                });
                axios.put(api_url + '/modificar_pedido_factura/' + this.id,
                    datos_ventas = {
                        venta: {
                            nombre_cliente_venta: this.venta_info.nombre_cliente_venta,
                            fecha_venta: this.venta_info.fecha_venta,
                            total_venta: Number(this.venta_info.total_venta),
                            total_iva: Number(this.venta_info.total_iva),
                        },
                        detalles: detalles_listado_limpio,
                    }).then((resp) => {
                        this.watch_toast(resp.data.respuesta, "Venta actualizada correctamente");
                        this.limpiar_campos();
                        this.$router.push('/facturacion/listar_pedidos_domicilio')
                        this.$router.go(1);
                        //router.replace('/listar_pedidos_domicilio')
                    }).catch((error) => {
                        this.watch_toast(error.response.data.respuesta, error.response.data.mensaje);
                        //this.watch_toast('error', 'Ocurrió un error al registrar la Venta');
                        throw error;
                    });
            }
        },
        limpiar_campos() {
            this.detalle_ventas_lista = [];

            this.venta_info = {
                id_venta: 0,
                nombre_cliente_venta: "",
                fecha_venta: this.venta_info.fecha_venta,
                total_venta: 0,
                total_iva: 0,
            };
            this.contador_tabla = 0;
        },
        //Mostrar Toast de exito o error
        watch_toast(tipo, mensaje) {
            if (tipo) {
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
        },
    }
};
</script>