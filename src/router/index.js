import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EmpleadoAgregar from '../views/RecursosHumanos/EmpleadoAgregar.vue'
import GestionCargo from '../views/RecursosHumanos/GestionCargo.vue'
import RegistrarVenta from '../views/Ventas/RegistrarVenta.vue'

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
