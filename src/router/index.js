import { createRouter, createWebHistory, routerKey } from 'vue-router';
import store from '../store/auth';
import showMessages from '../components/functions';
import HomeView from '../views/HomeView.vue'
import HojaDeRutaAgregar from '../views/PedidosDomicilio/HojaDeRutaAgregar.vue'
import PedidosDomicilio from '../views/PedidosDomicilio/ListarPedidosDomicilio.vue'
import AsistenciaAgregar from '../views/RecursosHumanos/AsistenciaAgregar.vue'
import HistorialAsistencia from '../views/RecursosHumanos/HistorialAsistencia.vue'
import ConsultarAsistencia from '../views/RecursosHumanos/ConsultarAsistencia.vue';
import EmpleadoAgregar from '../views/RecursosHumanos/EmpleadoAgregar.vue';
import EmpleadoModificar from '../views/RecursosHumanos/EmpleadoModificar.vue';
import GestionCargo from '../views/RecursosHumanos/GestionCargo.vue';
import GestionUsuario from '../views/RecursosHumanos/GestionUsuario.vue';
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
import HojaDeRutaModificar from '../views/PedidosDomicilio/HojaDeRutaModificar.vue';
import ListarHojasDeRuta from '../views/PedidosDomicilio/ListarHojasDeRuta.vue';
import InformeDeProductosPorVencer from '../views/Estadisticas/InformeDeProductosPorVencer.vue';
import Creditos from '../views/Creditos/Creditos.vue';
import CreditosListar from '../views/Creditos/CreditosListar.vue';
import CreditoMostrar from '../views/Creditos/CreditosMostrar.vue';
import HistorialPlanillas from '../views/RecursosHumanos/HistorialPlanillas.vue'
import ConsultarDetallePlanilla from '../views/RecursosHumanos/ConsultarDetallePlanilla.vue'
import ModificarAviso from '../views/Marketing/ModificarAviso.vue'
import ConsultarAvisos from '../views/Marketing/ConsultarAvisos.vue'
import Promociones from '../views/Marketing/Promociones.vue';
import ClientesList from '../views/Ventas/ClientesList.vue';
import ProveedoresList from '../views/Creditos/Proveedores.vue';
import PanelInformes from '../views/Estadisticas/PanelInformes.vue';
import not_found from '../views/not_found.vue';
import Blog from '../views/Marketing/Blog.vue'
import ConsultarOfertas from '../views/Marketing/ConsultarOfertas.vue';
import CrearAviso from '../views/Marketing/CrearAviso.vue';
import ComponenteBaseVentasInventario from '../views/ComponenteBaseVentasInventario.vue';
import ComponenteBaseFacturacion from '../views/ComponenteBaseFacturacion.vue';
import ComponenteBaseGerencia from '../views/ComponenteBaseGerencia.vue';
import ComponenteBaseMarketing from '../views/ComponenteBaseMarketing.vue';
import ModificarOferta from '../views/Marketing/ModificarOferta.vue';
import BlogPublico from '../views/Marketing/BlogPublico.vue';
import axios from 'axios';

let puedeEntrar = false;
function tienePermisos(permisosRequeridos,permisosDeUsuario){
  permisosDeUsuario.forEach(
    (permiso)=>{
      if(permisosRequeridos.includes(permiso)){
        puedeEntrar = true;
      }
    }
  );
}



const router = createRouter({
  history: createWebHistory(),
  routes: [
    //Ruta de prueba...
    {
      path:'/recursos_humanos',
      component:ComponenteBaseRH,
      meta:{permisosRequeridos : ["adm-rh"]},
      children:[
        {
          path: "gestion_cargos",
          name : "gestion_cargos",
          component : GestionCargo
        },
        {
          path: 'listar_empleados',
          name: 'listar_empleados',
          component: ListarEmpleados
        },
        {
          path: 'empleado_agregar',
          name: 'empleado_agregar',
          component: EmpleadoAgregar
        },
        {
          path: 'empleado_modificar/:id',
          name: 'empleado_modificar',
          component: EmpleadoModificar
        },
        {
          path: "gestion_usuarios",
          name : "gestion_usuarios",
          component : GestionUsuario
        },
        {
          path:'historial_planillas',
          name:'consultar_historial_planillas',
          component:HistorialPlanillas
        },
        {
          path:'detalle_planilla/:idPlanilla',
          name:'detalle_planilla',
          component:ConsultarDetallePlanilla
        },
        {
          path: "historial_asistencia",
          name : "historial_asistencia",
          component : HistorialAsistencia
        },
      ],
      beforeEnter:(to,from)=>{
        tienePermisos(to.meta.permisosRequeridos,store.state.permisos);
        if(!puedeEntrar){
          showMessages(false,"No tiene permisos para ver esta página");
          setTimeout(()=>{router.push("/")},1500);
          return false;
        }else{
          puedeEntrar = false;
        }
      },
    },
    {
      path:'/ventas_inventarios',
      component:ComponenteBaseVentasInventario,
      meta:{permisosRequeridos : ["adm-ventas"]},
      children:[
        {
          path : "agregar_producto",
          name: "agregar_producto",
          component : AgregarProducto
         },
         {
          path: "gestion_productos",
          name : "gestion_productos",
          component : GestionProducto
         },
         {
          path: "/editar_producto/:id_producto",
          name: "editar_producto",
          component: EditarProducto
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
          path:'/gestionar_proveedores',
          name:'Proveedores_list',
          component:ProveedoresList,
        },
        {
          path:'/registrar_credito_proveedor',
          name:'registrar_credito_proveedor',
          component:Creditos
        },
        {
          path:'/detalle_credito_proveedor/:id',
          name:'detalle_credito_proveedor',
          component:CreditoMostrar
        },
        {
          path:'/listar_creditos_proveedor',
          name:'listar_creditos_proveedor',
          component:CreditosListar
        },
      ],
      beforeEnter:(to,from)=>{
        tienePermisos(to.meta.permisosRequeridos,store.state.permisos);
        if(!puedeEntrar){
          showMessages(false,"No tiene permisos para ver esta página");
          setTimeout(()=>{router.push("/")},1500);
          return false;
        }else{
          puedeEntrar = false;
        }
      }
    },
    {
      path:"/facturacion",
      component:ComponenteBaseFacturacion,
      meta:{permisosRequeridos:["cajero"]},
      children:[
        {
          path: 'registrar_nueva_venta',
          name: 'registrar_nueva_venta',
          component: RegistrarVenta,
        },
        {
          path: 'modificar_pedido/factura/:id',
          name: 'modificar_pedido',
          component: ModificarPedido,
        },
        {
          path: 'modificar_pedido/credito_fiscal/:id',
          name: 'modificar_pedido_credito',
          component: ModificarPedidoCredito,
        },
       {
        path : "sales_list",
        name: "Lista de ventas",
        component : SalesList
       },
       {
        path : "detail_sales/:id_venta",
        name: "sales_list",
        component : DetailSales
       },   {
        path : "detail_cf/:id_creditofiscal",
        name: "detail_cf",
        component : DetailCF
       },
        {
          path: "crear_hoja_de_ruta",
          name : "crear_hoja_de_ruta",
          component : HojaDeRutaAgregar
        },
        {
          path: 'hoja_de_ruta/update/:id',
          name: 'hoja_de_ruta_modificar',
          component: HojaDeRutaModificar,
          props: true
        },
        //se agrego
        {
          path: 'hoja_de_ruta/detalles/:ruta',
          name: 'hoja_de_ruta_detalles',
          component: DetalleHojaRuta,
          props:true,
        },
        {
          path: "listar_pedidos_domicilio",
          name : "Pedidos_domicilio",
          component : PedidosDomicilio
        },
        {
          path:"listar_hojas_de_ruta",
          name:"listar_hojas_de_ruta",
          component: ListarHojasDeRuta
        },
        {
          path:'/gestionar_clientes',
          name:'clientes_list',
          component:ClientesList,
        },
      ],
      beforeEnter:(to,from)=>{
        tienePermisos(to.meta.permisosRequeridos,store.state.permisos);
        if(!puedeEntrar){
          ///alert("No tiene permisos para ver esta página");
          showMessages(false,"No tiene permisos para ver esta página");
          setTimeout(()=>{router.push("/")},1500);
          return false;
        }else{
          puedeEntrar = false;
        }
      }
    },
    {
      path:"/informes",
      component:ComponenteBaseGerencia,
      meta:{permisosRequeridos:["adm-gerencia"]},
      children:[
        {
          path:'panel_informes',
          name:'panel_informes',
          component:PanelInformes,
        },
        {
          path:'informe_ventas_totales',
          name:'informe_ventas_totales',
          component:InformeDeVentasTotales
        },
        {
          path:'informe_productos_mas_vendidos',
          name:'informe_productos_mas_vendidos',
          component:InformeDeProductosMasVendidos
        },
        {
          path:'informe_productos_menos_vendidos',
          name:'informe_productos_menos_vendidos',
          component:InformeDeProductosMenosVendidos
        },
        {
          path:'informe_existencias_de_productos',
          name:'informe_existencias_de_productos',
          component:InformeDeExistenciasDeProductos
        },
        {
          path:"informe_inventario_valorado",
          name:"informe_inventario_valorado",
          component:InformeDeInventarioValorado
        },
        {
          path:"informe_ventas_productos",
          name:"informe_ventas_productos",
          component:InformeDeTotalVentasPorProducto,
        },  
        {
          path:'informe_productos_por_vencer',
          name:'informe_productos_por_vencer',
          component:InformeDeProductosPorVencer
        },  
      ],
      beforeEnter:(to,from)=>{
          tienePermisos(to.meta.permisosRequeridos,store.state.permisos);
          if(!puedeEntrar){
            showMessages(false,"No tiene permisos para ver esta página");
            setTimeout(()=>{router.push("/")},1500);
            return false;
          }else{
            puedeEntrar = false;
          }
      }
    },
    {
      path:"/marketing",
      component:ComponenteBaseMarketing,
      meta:{permisosRequeridos:["adm-marketing"]},
      children:[
        {
          path:'modificar_aviso/:idAviso',
          name:'modificar_aviso',
          component:ModificarAviso
        },
        {
          path:'consultar_avisos',
          name:'consultar_avisos',
          component:ConsultarAvisos
        },
        {
          path:'registrar_promociones',
          name:'registrar_promociones',
          component:Promociones,
        },
        {
          path:'consultar_ofertas',
          name:'consultar_ofertas',
          component:ConsultarOfertas,
        },
        {
          path:'crear_aviso',
          name:'crear_aviso',
          component:CrearAviso,
        },
        {
          path:'modificar_oferta/:id',
          name:'modificar_oferta',
          component:ModificarOferta,
        },
      ],
      beforeEnter:(to,from)=>{
        tienePermisos(to.meta.permisosRequeridos,store.state.permisos);
        //tienePermisos(to.meta.permisosRequeridos,store.state.permisos);
        if(!puedeEntrar){
          showMessages(false,"No tiene permisos para ver esta página");
          setTimeout(()=>{router.push("/")},1500);
          return false;
        }else{
          puedeEntrar = false;
        }
      }
    },  
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: "/registrar_asistencia",
      name : "Registrar_asistencia",
      component : AsistenciaAgregar
    },
    {
      path: "/consultar_asistencia/:id_empleado",
      name : "consultar_asistencia",
      component : ConsultarAsistencia
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
      path: '/:pathMatch(.*)*',
      name: 'not_found',
      component: not_found
    },
    {
      path:'/blog',
      name:'blog',
      component:Blog
    },
    {
      path:'/blog_publico',
      name:'blog_publico',
      component:BlogPublico
    },
  ]
})


router.beforeEach((to,from)=>{
const rutasPublicas = ["/iniciar_sesion","/blog_publico"];
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
