import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EmpleadoAgregar from '../views/RecursosHumanos/EmpleadoAgregar.vue'
import EmpleadoModificar from '../views/RecursosHumanos/EmpleadoModificar.vue'
import GestionCargo from '../views/RecursosHumanos/GestionCargo.vue'
import AgregarProducto from '../views/Inventario/AgregarProducto.vue'
import GestionProducto from '../views/Inventario/GestionProducto.vue'
import RegistrarVenta from '../views/Ventas/RegistrarVenta.vue'
import ListarEmpleados from '../views/RecursosHumanos/ListarEmpleados.vue'
import EditarProducto from '../views/Inventario/EditarProducto.vue'
import SalesList from '../views/Ventas/SalesList.vue'
import DetailSales from '../views/Ventas/DetailSales.vue'
import DetailCF from '../views/Ventas/DetailCF.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/registrar_nueva_venta',
      name: 'registrar_nueva_venta',
      component: RegistrarVenta
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
      path: '/listar_empleados',
      name: 'listar_empleados',
      component: ListarEmpleados
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
    name: "Detalle de venta",
    component : DetailSales
   },   {
    path : "/detail_cf/:id_creditofiscal",
    name: "Detalle Credito Fiscal",
    component : DetailCF
   },
    {
      path: "/gestion_productos",
      name : "gestion_productos",
      component : GestionProducto
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
