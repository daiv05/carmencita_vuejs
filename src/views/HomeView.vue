<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import NavBar from '@/components/NavBar.vue';
import BarraTitulo from '../components/BarraTitulo.vue';
import { Dropdown, ListGroup, ListGroupItem, TheCard } from 'flowbite-vue'
import { DocumentPlusIcon, QueueListIcon, SquaresPlusIcon, DocumentCheckIcon } from '@heroicons/vue/24/outline'

</script>

<template>
  <main class="mb-36">
    <NavBar></NavBar>
    <BarraTitulo class="bg-white" :titulo="titulo"></BarraTitulo>
    <div class="flex justify-center py-5">
      <h1 class="font-bold text-lg">¡Bienvenido!</h1>
    </div>
    <!--Cards-->
    <div class="container max-w-4xl mx-auto px-10 py-2 grid grid-cols-1 sm:grid-cols-3 gap-5">
      <!--Facturacion-->
      <the-card v-if="rolCurrenUser == GERENTE || rolCurrenUser == SUB_GERENTE" variant="image" img-src="assets/img/facturacion.jpg" img-alt="Desk">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Facturación</h5>
        <dropdown text="Facturación">
          <list-group>
            <list-group-item>
              <router-link to="/facturacion/registrar_nueva_venta" class="w-full h-full">
                <div class="flex items-center">
                  <DocumentPlusIcon class="h-4 w-4 mr-2 text-gray-500" />
                  <p>Registrar Ventas</p>
                </div>
              </router-link>
            </list-group-item>
            <list-group-item>
              <router-link to="/facturacion/sales_list">
                <div class="flex items-center">
                  <QueueListIcon class="h-4 w-4 mr-2 text-gray-500" />
                  <p>Historial de ventas</p>
                </div>
              </router-link>
            </list-group-item>
          </list-group>
        </dropdown>
      </the-card>


      <!--Pedidos a Domicilio y Hojas de Ruta-->
      <the-card v-if="rolCurrenUser == GERENTE || rolCurrenUser == SUB_GERENTE" variant="image" img-src="assets/img/domicilio.jpg" img-alt="Desk">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Pedidos a Domicilio</h5>
        <dropdown text="Pedidos">
          <list-group>
            <list-group-item>
              <router-link to="/facturacion/listar_hojas_de_ruta">
                <div class="flex items-center">
                  <DocumentPlusIcon class="h-4 w-4 mr-2 text-gray-500" />
                  <p>Hojas de Ruta</p>
                </div>
              </router-link>
            </list-group-item>
            <list-group-item>
              <router-link to="/facturacion/listar_pedidos_domicilio">
                <div class="flex items-center">
                  <QueueListIcon class="h-4 w-4 mr-2 text-gray-500" />
                  <p>Pedidos a Domicilio</p>
                </div>
              </router-link>
            </list-group-item>
          </list-group>
        </dropdown>
      </the-card>



      <!--Inventario-->
      <the-card v-if="rolCurrenUser == GERENTE || rolCurrenUser == SUB_GERENTE" variant="image" img-src="assets/img/inventario.jpg" img-alt="Desk">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Inventario</h5>
        <dropdown text="Inventario">
          <list-group>
            <list-group-item>
              <router-link to="/ventas_inventarios/gestion_productos" class="w-full h-full">
                <div class="flex items-center">
                  <SquaresPlusIcon class="h-4 w-4 mr-2 text-gray-500" />
                  <p>Productos</p>
                </div>
              </router-link>
            </list-group-item>
            <list-group-item>
              <router-link to="/gestion_existencias">
                <div class="flex items-center">
                  <DocumentCheckIcon class="h-4 w-4 mr-2 text-gray-500" />
                  <p>Existencias</p>
                </div>
              </router-link>
            </list-group-item>
          </list-group>
        </dropdown>
      </the-card>

      <!--Empleados-->
      <the-card v-if="rolCurrenUser == GERENTE" variant="image" img-src="assets/img/empleados.jpg" img-alt="Desk">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Empleados</h5>
        <dropdown text="Empleados">
          <list-group>
            <list-group-item>
              <router-link to="/recursos_humanos/empleado_agregar" class="w-full h-full">
                <div class="flex items-center">
                  <DocumentPlusIcon class="h-4 w-4 mr-2 text-gray-500" />
                  <p>Registrar empleado</p>
                </div>
              </router-link>
            </list-group-item>
            <list-group-item>
              <router-link to="/recursos_humanos/listar_empleados">
                <div class="flex items-center">
                  <QueueListIcon class="h-4 w-4 mr-2 text-gray-500" />
                  <p>Empleados</p>
                </div>
              </router-link>
            </list-group-item>
            <list-group-item>
              <router-link to="/recursos_humanos/gestion_cargos">
                <div class="flex items-center">
                  <SquaresPlusIcon class="h-4 w-4 mr-2 text-gray-500" />
                  <p>Cargos</p>
                </div>
              </router-link>
            </list-group-item>
            <list-group-item>
              <router-link to="/recursos_humanos/historial_planillas">
                <div class="flex items-center">
                  <QueueListIcon class="h-4 w-4 mr-2 text-gray-500" />
                  <p>Historial Planillas</p>
                </div>
              </router-link>
            </list-group-item>
          </list-group>
        </dropdown>
      </the-card>

      <!--Asistencia-->
      <the-card variant="image" img-src="assets/img/asistencia.jpg" img-alt="Desk">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Registro de asistencias</h5>
        <dropdown text="Asistencia">
          <list-group>
            <list-group-item>
              <router-link to="/registrar_asistencia" class="w-full h-full">
                <div class="flex items-center">
                  <DocumentPlusIcon class="h-4 w-4 mr-2 text-gray-500" />
                  <p>Registrar asistencia</p>
                </div>
              </router-link>
            </list-group-item>
            <list-group-item v-if="rolCurrenUser == GERENTE">
              <router-link to="/recursos_humanos/historial_asistencia">

                <div class="flex items-center">
                  <QueueListIcon class="h-4 w-4 mr-2 text-gray-500" />
                  <p>Historial de asistencia</p>
                </div>
              </router-link>
            </list-group-item>
          </list-group>
        </dropdown>
      </the-card>

      <!--Usuarios-->
      <the-card v-if="rolCurrenUser == GERENTE" variant="image" img-src="assets/img/usuarios.jpg" img-alt="Desk">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Usuarios</h5>
        <dropdown text="Usuarios">
          <list-group>
            <list-group-item>
              <router-link to="/recursos_humanos/gestion_usuarios">
                <div class="flex items-center">
                  <!--<QueueListIcon class="h-4 w-4 mr-2 text-gray-500" />-->
                  <SquaresPlusIcon class="h-4 w-4 mr-2 text-gray-500" />
                  <p>Gestión de usuarios</p>
                </div>
              </router-link>
            </list-group-item>
          </list-group>
        </dropdown>
      </the-card>

      <!--Informes de Ventas-->
      <the-card v-if="rolCurrenUser == GERENTE" variant="image" img-src="assets/img/estadisticas.jpg" img-alt="Desk">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Informes</h5>
        <dropdown text="Informes">
          <list-group>
            <list-group-item>
              <router-link to="/informes/panel_informes" class="w-full h-full">
                <div class="flex items-center">
                  <DocumentPlusIcon class="h-4 w-4 mr-2 text-gray-500" />
                  <p>Informes de Ventas / Inventario</p>
                </div>
              </router-link>
            </list-group-item>
          </list-group>
        </dropdown>
      </the-card>

      <!-- Proveedores - Creditos - Clientes -->
      <the-card v-if="rolCurrenUser == GERENTE || rolCurrenUser == SUB_GERENTE" variant="image" img-src="assets/img/proveedor.jpg" img-alt="Desk">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Creditos y Stakeholders</h5>
        <dropdown text="Proveedores">
          <list-group>
            <list-group-item v-if="rolCurrenUser == GERENTE">
              <router-link to="/gestionar_proveedores">
                <div class="flex items-center">
                  <DocumentPlusIcon class="h-4 w-4 mr-2 text-gray-500" />
                  <p>Proveedores</p>
                </div>
              </router-link>
            </list-group-item>
            <list-group-item v-if="rolCurrenUser == GERENTE || rolCurrenUser == SUB_GERENTE">
              <router-link to="/gestionar_clientes">
                <div class="flex items-center">
                  <DocumentPlusIcon class="h-4 w-4 mr-2 text-gray-500" />
                  <p>Clientes</p>
                </div>
              </router-link>
            </list-group-item>
            <list-group-item v-if="rolCurrenUser == GERENTE">
              <router-link to="/listar_creditos_proveedor">
                <div class="flex items-center">
                  <QueueListIcon class="h-4 w-4 mr-2 text-gray-500" />
                  <p>Administrar créditos</p>
                </div>
              </router-link>
            </list-group-item>
          </list-group>
        </dropdown>
      </the-card>



      <!--Ofertas y Avisos-->
      <the-card v-if="rolCurrenUser == GERENTE" variant="image" img-src="assets/img/ofertas.jpg" img-alt="Desk">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Ofertas y Avisos</h5>
        <dropdown text="Promociones">
          <list-group>
            <list-group-item>
              <router-link to="/marketing/consultar_ofertas">
                <div class="flex items-center">
                  <QueueListIcon class="h-4 w-4 mr-2 text-gray-500" />
                  <p>Ofertas</p>
                </div>
              </router-link>
            </list-group-item>
            <list-group-item>
              <router-link to="/marketing/consultar_avisos">
                <div class="flex items-center">
                  <DocumentPlusIcon class="h-4 w-4 mr-2 text-gray-500" />
                  <p>Avisos</p>
                </div>
              </router-link>
            </list-group-item>
            <list-group-item>
              <router-link to="/blog">
                <div class="flex items-center">
                  <DocumentPlusIcon class="h-4 w-4 mr-2 text-gray-500" />
                  <p>Blog</p>
                </div>
              </router-link>
            </list-group-item>
          </list-group>
        </dropdown>
      </the-card>

    </div>
  </main>
</template>

<script>
import axios from 'axios';
import API_URL from '../config.js';

const navigationVentas = [
  { name: 'Registrar Ventas', href: '#', current: true },
  { name: 'Historial de ventas', href: '#', current: false },
]

const GERENTE = "Gerente"
const SUB_GERENTE = "Sub-Gerente"
const COLABORADOR = "Colaborador"

export default {
  data() {
    return {
      titulo: 'Panel de Control',
      datosAuth:null,
      rolCurrenUser:null,
    }
  },
  methods: {

  },
  mounted() {
    if (localStorage.authUser) {
      this.datosAuth = JSON.parse(localStorage.authUser);
      this.rolCurrenUser = this.datosAuth.user.roles[0].name
    }
    console.log(this.datosAuth.user)

  }
}
</script>

