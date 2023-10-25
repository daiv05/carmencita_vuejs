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
      <the-card variant="image" img-src="assets/img/facturacion.jpg" img-alt="Desk">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Facturación</h5>
        <dropdown text="Facturación">
          <list-group>
            <list-group-item>
              <router-link to="/registrar_nueva_venta" class="w-full h-full">
                <div class="flex items-center">
                  <DocumentPlusIcon class="h-4 w-4 mr-2 text-gray-500" />
                  <p>Registrar Ventas</p>
                </div>
              </router-link>
            </list-group-item>
            <list-group-item>
              <router-link to="/sales_list">
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
      <the-card variant="image" img-src="assets/img/domicilio.jpg" img-alt="Desk">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Pedidos a Domicilio</h5>
        <dropdown text="Pedidos">
          <list-group>
            <list-group-item>
              <router-link to="/listar_hojas_de_ruta">
                <div class="flex items-center">
                  <DocumentPlusIcon class="h-4 w-4 mr-2 text-gray-500" />
                  <p>Hojas de Ruta</p>
                </div>
              </router-link>
            </list-group-item>
            <list-group-item>
              <router-link to="/listar_pedidos_domicilio">
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
      <the-card variant="image" img-src="assets/img/inventario.jpg" img-alt="Desk">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Inventario</h5>
        <dropdown text="Inventario">
          <list-group>
            <list-group-item>
              <router-link to="/gestion_productos" class="w-full h-full">
                <div class="flex items-center">
                  <SquaresPlusIcon class="h-4 w-4 mr-2 text-gray-500" />
                  <p>Gestión de productos</p>
                </div>
              </router-link>
            </list-group-item>
            <list-group-item>
              <router-link to="/registrar_nueva_venta">
                <div class="flex items-center">
                  <DocumentCheckIcon class="h-4 w-4 mr-2 text-gray-500" />
                  <p>Gestión de existencias</p>
                </div>
              </router-link>
            </list-group-item>
          </list-group>
        </dropdown>
      </the-card>

      <!--Empleados-->
      <the-card variant="image" img-src="assets/img/empleados.jpg" img-alt="Desk">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Empleados</h5>
        <dropdown text="Empleados">
          <list-group>
            <list-group-item>
              <router-link to="/empleado_agregar" class="w-full h-full">
                <div class="flex items-center">
                  <DocumentPlusIcon class="h-4 w-4 mr-2 text-gray-500" />
                  <p>Registrar empleado</p>
                </div>
              </router-link>
            </list-group-item>
            <list-group-item>
              <router-link to="/listar_empleados">
                <div class="flex items-center">
                  <QueueListIcon class="h-4 w-4 mr-2 text-gray-500" />
                  <p>Lista de empleados</p>
                </div>
              </router-link>
            </list-group-item>
            <list-group-item>
              <router-link to="/gestion_cargos">
                <div class="flex items-center">
                  <SquaresPlusIcon class="h-4 w-4 mr-2 text-gray-500" />
                  <p>Gestión de cargos</p>
                </div>
              </router-link>
            </list-group-item>
            <list-group-item>
              <router-link to="/historial_planillas">
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
            <list-group-item>
              <router-link to="/historial_asistencia">
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
      <the-card variant="image" img-src="assets/img/usuarios.jpg" img-alt="Desk">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Usuarios</h5>
        <dropdown text="Usuarios">
          <list-group>
            <list-group-item>
              <router-link to="/registrar_nueva_venta" class="w-full h-full">
                <div class="flex items-center">
                  <DocumentPlusIcon class="h-4 w-4 mr-2 text-gray-500" />
                  <p>Registrar usuario</p>
                </div>
              </router-link>
            </list-group-item>
            <list-group-item>
              <router-link to="/gestion_usuarios">
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
      <the-card variant="image" img-src="assets/img/estadisticas.jpg" img-alt="Desk">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Informes de Ventas</h5>
        <dropdown text="Informes">
          <list-group>
            <list-group-item>
              <router-link to="/informe_ventas_totales" class="w-full h-full">
                <div class="flex items-center">
                  <DocumentPlusIcon class="h-4 w-4 mr-2 text-gray-500" />
                  <p>Informe de Ventas Totales</p>
                </div>
              </router-link>
            </list-group-item>
            <list-group-item>
              <router-link to="/informe_productos_mas_vendidos">
                <div class="flex items-center">
                  <QueueListIcon class="h-4 w-4 mr-2 text-gray-500" />
                  <p>Informe de Productos +/- Vendidos</p>
                </div>
              </router-link>
            </list-group-item>
            <list-group-item>
              <router-link to="/informe_ventas_productos">
                <div class="flex items-center">
                  <QueueListIcon class="h-4 w-4 mr-2 text-gray-500" />
                  <p>Informe de Ventas por Producto</p>
                </div>
              </router-link>
            </list-group-item>
          </list-group>
        </dropdown>
      </the-card>


      <!--Informes de Inventario-->
      <the-card variant="image" img-src="assets/img/inf_inventario.jpg" img-alt="Desk">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Informes de Inventario</h5>
        <dropdown text="Informes">
          <list-group>
            <list-group-item>
              <router-link to="/informe_productos_por_vencer" class="w-full h-full">
                <div class="flex items-center">
                  <DocumentPlusIcon class="h-4 w-4 mr-2 text-gray-500" />
                  <p>Informe de Productos Próx. a caducar</p>
                </div>
              </router-link>
            </list-group-item>
            <list-group-item>
              <router-link to="/informe_inventario_valorado">
                <div class="flex items-center">
                  <QueueListIcon class="h-4 w-4 mr-2 text-gray-500" />
                  <p>Informe de Inventario Valorado</p>
                </div>
              </router-link>
            </list-group-item>
            <list-group-item>
              <router-link to="/informe_existencias_de_productos">
                <div class="flex items-center">
                  <QueueListIcon class="h-4 w-4 mr-2 text-gray-500" />
                  <p>Informe de Existencias de Productos</p>
                </div>
              </router-link>
            </list-group-item>
          </list-group>
        </dropdown>
      </the-card>


      <!--Proveedores y Creditos-->
      <the-card variant="image" img-src="assets/img/proveedor.jpg" img-alt="Desk">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Creditos y Proveedores</h5>
        <dropdown text="Proveedores">
          <list-group>
            <list-group-item>
              <router-link to="/">
                <div class="flex items-center">
                  <DocumentPlusIcon class="h-4 w-4 mr-2 text-gray-500" />
                  <p>Listado de proveedores</p>
                </div>
              </router-link>
            </list-group-item>
            <list-group-item>
              <router-link to="/registrar_credito_proveedor">
                <div class="flex items-center">
                  <QueueListIcon class="h-4 w-4 mr-2 text-gray-500" />
                  <p>Registrar nuevo Crédito</p>
                </div>
              </router-link>
            </list-group-item>
          </list-group>
        </dropdown>
      </the-card>



      <!--Ofertas-->
      <the-card variant="image" img-src="assets/img/ofertas.jpg" img-alt="Desk">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Ofertas</h5>
        <dropdown text="Proveedores">
          <list-group>
            <list-group-item>
              <router-link to="/registrar_promociones">
                <div class="flex items-center">
                  <DocumentPlusIcon class="h-4 w-4 mr-2 text-gray-500" />
                  <p>Crear nueva oferta</p>
                </div>
              </router-link>
            </list-group-item>
            <list-group-item>
              <router-link to="/registrar_credito_proveedor">
                <div class="flex items-center">
                  <QueueListIcon class="h-4 w-4 mr-2 text-gray-500" />
                  <p>Listado de Ofertas y Promociones</p>
                </div>
              </router-link>
            </list-group-item>
          </list-group>
        </dropdown>
      </the-card>

      <!--Avisos-->
      <the-card variant="image" img-src="assets/img/ofertas.jpg" img-alt="Avisos">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Avisos</h5>
        <dropdown text="Avisos">
          <list-group>
            <list-group-item>
              <router-link to="/consultar_avisos">
                <div class="flex items-center">
                  <DocumentPlusIcon class="h-4 w-4 mr-2 text-gray-500" />
                  <p>Consultar Avisos</p>
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
export default {
  data() {
    return {
      titulo: 'Panel de Control',
    }
  },
}
</script>

