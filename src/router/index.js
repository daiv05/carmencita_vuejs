import { createRouter, createWebHistory, routerKey } from 'vue-router';
import store from '../store/auth';
import HomeView from '../views/HomeView.vue'
import HojaDeRutaAgregar from '../views/PedidosDomicilio/HojaDeRutaAgregar.vue'
import PedidosDomicilio from '../views/PedidosDomicilio/ListarPedidosDomicilio.vue'
import AsistenciaAgregar from '../views/RecursosHumanos/AsistenciaAgregar.vue'
import EmpleadoAgregar from '../views/RecursosHumanos/EmpleadoAgregar.vue';
import EmpleadoModificar from '../views/RecursosHumanos/EmpleadoModificar.vue';
import GestionCargo from '../views/RecursosHumanos/GestionCargo.vue';
import AgregarProducto from '../views/Inventario/AgregarProducto.vue';
import GestionProducto from '../views/Inventario/GestionProducto.vue';
import RegistrarVenta from '../views/Ventas/RegistrarVenta.vue';
import ModificarPedido from '../views/Ventas/ModificarPedido.vue';
import ModificarPedidoCredito from '../views/Ventas/ModificarPedidoCredito.vue';
import ListarEmpleados from '../views/RecursosHumanos/ListarEmpleados.vue';
import EditarProducto from '../views/Inventario/EditarProducto.vue';
import SalesList from '../views/Ventas/SalesList.vue';
import DetailSales from '../views/Ventas/DetailSales.vue';
import DetailCF from '../views/Ventas/DetailCF.vue';
import IniciarSesion from '../views/Seguridad/IniciarSesion.vue';
import ComponenteBaseRH from '../views/RecursosHumanos/ComponenteBaseRH.vue';
import GestionExistencias from '../views/Inventario/GestionExistencias.vue';
import EditarLote from '../components/Inventario/ModalEditarLote.vue';
import InformeDeVentasTotales from '../views/Estadisticas/InformeDeVentasTotales.vue';
import InformeDeProductosMasVendidos from '../views/Estadisticas/InformeDeProductosMasVendidos.vue';
import InformeDeProductosMenosVendidos from '../views/Estadisticas/InformeDeProductosMenosVendidos.vue';
import InformeDeExistenciasDeProductos from '../views/Estadisticas/InformeDeExistenciasDeProductos.vue';
import InformeDeInventarioValorado from '../views/Estadisticas/InformeDeInventarioValorado.vue';
import InformeDeTotalVentasPorProducto from '../views/Estadisticas/InformeDeTotalVentasPorProducto.vue';
import DetalleHojaRuta from '../views/PedidosDomicilio/DetalleHojaRuta.vue';
import ListarHojasDeRuta from '../views/PedidosDomicilio/ListarHojasDeRuta.vue';
import InformeDeProductosPorVencer from '../views/Estadisticas/InformeDeProductosPorVencer.vue';
import Creditos from '../views/Creditos/Creditos.vue';
import Promociones from '../views/Marketing/Promociones.vue';
import axios from 'axios';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    //Ruta de prueba...
    {
      path:'/recursos_humanos',
      component:ComponenteBaseRH,
      meta:{permisosRequeridos : ["all","Ventas","Empleado"]},
      children:[
        {
          path: 'listar_empleados',
          name: 'listar_empleados',
          component: ListarEmpleados
        },
      ],
      beforeEnter:(to,from)=>{
        let puedeEntrar = false;
        let tienePermisos = (permisosRequeridos,permisosDeUsuario)=>{
          console.log("Revisando permisos");
            permisosDeUsuario.forEach(
              (permiso)=>{
                console.log(permisosRequeridos);
                if(permisosRequeridos.includes(permiso)){
                  console.log(permiso);
                  //  return true;
                  puedeEntrar = true;
                }
              }
            );
        };
        tienePermisos(to.meta.permisosRequeridos,store.state.permisos);
        console.log("valor de la bandera: ",puedeEntrar);
        if(!puedeEntrar){
          alert("No tiene permisos para ingresar a este contenido");
          setTimeout(()=>{router.push("/")},2000);
          return false;
        }

      },
    },

    {
      path: '/listar_empleados',
      name: 'listar_empleados',
      component: ListarEmpleados
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/registrar_nueva_venta',
      name: 'registrar_nueva_venta',
      component: RegistrarVenta,
    },
    {
      path: '/modificar_pedido/factura/:id',
      name: 'modificar_pedido',
      component: ModificarPedido,
    },
    {
      path: '/modificar_pedido/credito_fiscal/:id',
      name: 'modificar_pedido_credito',
      component: ModificarPedidoCredito,
    },
    {
      path: '/empleado_agregar',
      name: 'empleado_agregar',
      component: EmpleadoAgregar
    },
    {
      path: '/empleado_modificar/:id',
      name: 'empleado_modificar',
      component: EmpleadoModificar
    },
    {
      path: "/gestion_cargos",
      name : "gestion_cargos",
      component : GestionCargo
    },
    {
      path: "/editar_producto/:id_producto",
      name: "editar_producto",
      component: EditarProducto
     },
   {
    path : "/agregar_producto",
    name: "agregar_producto",
    component : AgregarProducto
   },
   {
    path : "/sales_list",
    name: "Lista de ventas",
    component : SalesList
   },
   {
    path : "/detail_sales/:id_venta",
    name: "sales_list",
    component : DetailSales
   },   {
    path : "/detail_cf/:id_creditofiscal",
    name: "detail_cf",
    component : DetailCF
   },
    {
      path: "/gestion_productos",
      name : "gestion_productos",
      component : GestionProducto
    },
    {
      path: "/crear_hoja_de_ruta",
      name : "crear_hoja_de_ruta",
      component : HojaDeRutaAgregar
    },
    {
      path: "/listar_pedidos_domicilio",
      name : "Pedidos_domicilio",
      component : PedidosDomicilio
    },
    {
      path: "/registrar_asistencia",
      name : "Registrar_asistencia",
      component : AsistenciaAgregar
    },
    {
      path:"/iniciar_sesion",
      name:"iniciar_sesion",
      component: IniciarSesion
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path:'/gestion_existencias',
      name:'gestion_existencias',
      component:GestionExistencias
    },
    {
      path:'/editar_lote',
      name:'editar_lote',
      component:EditarLote,
    },
    {
      path:'/informe_ventas_totales',
      name:'informe_ventas_totales',
      component:InformeDeVentasTotales
    },
    {
      path:'/informe_productos_mas_vendidos',
      name:'informe_productos_mas_vendidos',
      component:InformeDeProductosMasVendidos
    },
    {
      path:'/informe_productos_menos_vendidos',
      name:'informe_productos_menos_vendidos',
      component:InformeDeProductosMenosVendidos
    },
    {
      path:'/informe_existencias_de_productos',
      name:'informe_existencias_de_productos',
      component:InformeDeExistenciasDeProductos
    },
    {
      path:"/informe_inventario_valorado",
      name:"informe_inventario_valorado",
      component:InformeDeInventarioValorado
    },
    {
      path:"/informe_ventas_productos",
      name:"informe_ventas_productos",
      component:InformeDeTotalVentasPorProducto,
    },  
    {
      path: '/hoja_de_ruta/detalles/:ruta',
      name: 'hoja_de_ruta',
      component: DetalleHojaRuta,
      props: true
    },
    {
      path:'/listar_hojas_de_ruta',
      name:'listar_hojas_de_ruta',
      component:ListarHojasDeRuta
    },
    },
    // {
    //   path: '/:pathMatch(.*)*',
    //   name: 'not_found',
    //   component: ViewPageRoute
    // }
    {
      path:'/informe_productos_por_vencer',
      name:'informe_productos_por_vencer',
      component:InformeDeProductosPorVencer
    },
    {
      path:'/registrar_credito_proveedor',
      name:'registrar_credito_proveedor',
      component:Creditos
    },
    {
      path:'/registrar_promociones',
      name:'registrar_promociones',
      component:Promociones,
    }
  ]
})


router.beforeEach((to,from)=>{
const rutasPublicas = ["/iniciar_sesion"];
const urlProtegida = !rutasPublicas.includes(to.path);
//console.log(store.state.estaAutenticado);
  if(urlProtegida && !store.state.estaAutenticado ){
      router.push("/iniciar_sesion");
    }
  else if(store.state.estaAutenticado && to.path === "/iniciar_sesion"){
      router.push(from.path);
  }
    //evalua cuando se recarga la pagina pero tambien se deberia
  if(store.state.estaAutenticado){
    axios.defaults.headers.common = {"Authorization": "Bearer " + store.state.tokenUser };
  }
})

export default router
