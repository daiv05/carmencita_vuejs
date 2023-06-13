import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EmpleadoAgregar from '../views/RecursosHumanos/EmpleadoAgregar.vue'
import GestionCargo from '../views/RecursosHumanos/GestionCargo.vue'
import AgregarProducto from '../views/Inventario/AgregarProducto.vue'
import RegistrarVenta from '../views/Ventas/RegistrarVenta.vue'
import SalesList from '../views/Ventas/SalesList.vue'
import DetailSales from '../views/Ventas/DetailSales.vue'
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
      path: "/gestion_cargos",
      name : "gestion_cargos",
      component : GestionCargo
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
    path : "/detail_sales",
    name: "Detalle de venta",
    component : DetailSales
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
