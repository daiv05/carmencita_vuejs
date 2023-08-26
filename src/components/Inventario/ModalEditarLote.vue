<template>
  <Form
    class="h-[63%] max-w-[100%] mx-auto lg:max-w-[45%] bg-white p-3 rounded-md shadow-md z-999 fixed top-[15%] left-0 right-0"
  >
    <h1 class="text-2xl font-bold mb-6 text-left text-indigo-600">Editar Lote</h1>

    <div class="grid grid-cols-2 gap-4 mb-[1%]">
      <div class="">
        <label for="" class="block mb-[1%] font-semibold">Fecha Ingreso</label>
        <input type="date" class="rounded-md border-slate-400 text-slate-500 w-[100%]" v-model="lote.fecha_ingreso" disabled/>
      </div>
      <div class="">
        <label for="" class="block mb-[1%] font-semibold">Fecha Vencimiento</label>
        <input type="date" class="rounded-md border-slate-400 text-slate-500 w-[100%]" v-model="lote.fecha_vencimiento"/>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div class="">
        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white mb-[1%]"
          >Seleccione el producto</label
        >
        <select
          id="countries"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          v-model="idProducto"
        >
          <option v-for="producto in listaProductos" :key="producto.codigo_barra_producto" :value="producto.codigo_barra_producto"> 
            {{ producto.nombre_producto }} 
          </option>
        </select>
      </div>
      <div class="">
        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"

          >Seleccione la unidad de los lotes</label
        >
        <select
          id="countries"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          v-model="cantidadUnidadMedida"
        >
          <option v-for="precioUnidadMedida in listaUnidadesMedida" 
          :key="precioUnidadMedida.id_precio_unidad_de_medida"
          :value="precioUnidadMedida.cantidad_producto"
          >
            {{ precioUnidadMedida.unidad_de_medida.nombre_unidad_de_medida+":"+precioUnidadMedida.cantidad_producto +" unidades"}}

        </option>
        </select>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4 mb-[1%]">
      <div class="">
        <label for="" class="block mb-[1%] font-semibold">Cantidad a ingresar</label>
        <input type="number" class="rounded-md border-slate-400 text-slate-500 w-[100%]" v-model="cantidadIngresar">
      </div>
      <div class="">
        <label for="" class="block mb-[1%] font-semibold">Unidades totales a ingresar</label>
        <input type="number" class="rounded-md border-slate-400 text-slate-500 w-[100%]" disabled v-model="unidadesTotalesIngresadas">
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4 mb-[1%]">
      <div class="">
        <label for="" class="block mb-[1%] font-semibold">Precio Unitario</label>
        <input type="number" class="rounded-md border-slate-400 text-slate-500 w-[100%]" v-model="lote.precio_unitario">
      </div>
      <div class="">
        <label for="" class="block mb-[1%] font-semibold">Costo del lote</label>
        <input type="number" class="rounded-md border-slate-400 text-slate-500 w-[100%]" v-model="lote.costo_total">
      </div>
    </div>
    <div class="flex justify-center align-center mt-[1%] gap-4">
        <button type="button" class=" w-[15%] text-white bg-indigo-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >Guardar</button>
        <button @click="cerrarModal" type="button" class=" w-[15%] focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Cancelar</button>
    </div>
  </Form>
</template>

<script>
import axios from 'axios';

export default {
  props:{
    lote:Object,
  },
    data(){
        return{
          listaUnidadesMedida:[],
          cantidadUnidadMedida:0,
          idProducto:"",
          fechaIngreso:  null,//this.convertirFecha(lote.fechaIngreso),
          fechaVencimiento: null,
          cantidadIngresar:0,
          unidadesTotalesIngresadas:0,
          nuevoPrecioUnitarioProducto:0,
          costoLote:0,
          listaProductos:[],
        }
    },
    mounted(){
      this.cargarUnidadesMedida();
      this.cargarProductos();
      this.idProducto = this.lote.producto.codigo_barra_producto;
      this.configurarFechasLote();
      this.cantidadIngresar = this.lote.cantidad;
      this.unidadesTotalesIngresadas = this.lote.cantida_total_unidades;
      this.calcularTipoDeUnidadDeMedida();
    },
    methods:{
       configurarFechasLote(){
        this.fechaIngreso = this.convertirFecha(this.lote.fecha_ingreso);
        this.fechaVencimiento = this.convertirFecha(this.lote.fecha_vencimiento);
       },
       cerrarModal(){
        this.$emit("cerrarModalEditar");
       },
       cargarUnidadesMedida(){
        //let url = "api/productos/precios/"+this.lote.producto.codigo_barra_producto;
        let url = "api/precio_lista_unidades/"+this.lote.producto.codigo_barra_producto;
        axios.get(url)
        .then(
          (response)=>{
            console.log("La lista de unidades de medida son: ",response.data);
            this.listaUnidadesMedida = response.data.lista_precios_extra;
          }
        )
        .catch(
          (response)=>{
            console.log(response);
            alert("El programador no quizo programar la exepción");
          }
        );
       },
       obtenerFechaFormateada() {
      const fechaActual = new Date();
      const opciones = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return fechaActual.toLocaleDateString("en-US", opciones);
    },
    convertirFecha(fechaEnFormatoUS) {
      const partes = fechaEnFormatoUS.split("/");
      const fechaEnFormatoISO = `${partes[2]}-${partes[0]}-${partes[1]}`;
      return fechaEnFormatoISO;
    },
    cargarProductos(){
      axios.get("/api/productos")
      .then(
        (response)=>{
          this.listaProductos = response.data;    
        }
      )
      .catch(
        (response)=>{
          alert("Ocurrio un problema");
        }
      );
    },
    calcularTipoDeUnidadDeMedida(){
      this.cantidadUnidadMedida = this.lote.cantidad_total_unidades/this.lote.cantidad;
      console.log(this.cantidadUnidadMedida);
    }
    },
    watch:{
     cantidadUnidadMedida(newValue,oldValue){
        this.unidadesTotalesIngresadas = newValue * this.cantidadIngresar;
     },
     cantidadIngresar(newValue,oldValue){
        this.unidadesTotalesIngresadas = newValue * this.cantidadUnidadMedida;
     }
    }
}
</script>
