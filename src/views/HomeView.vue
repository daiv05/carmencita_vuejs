<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import NavBar from '@/components/NavBar.vue'
import BarraTitulo from '../components/BarraTitulo.vue';
import { Dropdown, ListGroup, ListGroupItem, TheCard } from 'flowbite-vue'
import { DocumentPlusIcon,QueueListIcon, SquaresPlusIcon, DocumentCheckIcon  } from '@heroicons/vue/24/outline'

</script>

<template>
  <NavBar></NavBar>
  <BarraTitulo :titulo="titulo"></BarraTitulo>
  <main class="mb-5">
    <div class="container flex justify-center py-5">
      <h1 class="font-bold text-lg">¡Bienvenido!</h1>
    </div>
    <!--Cards-->
    <div class="container max-w-4xl mx-auto px-10 py-2 grid grid-cols-1 sm:grid-cols-3 gap-5">
      <!--Facturacion-->
      <the-card  variant="image"  img-src="src/assets/img/facturacion.jpg" img-alt="Desk">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Facturación</h5>
        <dropdown text="Facturación">
          <list-group>
            <list-group-item>
              <a href="/registrar_nueva_venta" class="w-full h-full">
                <div class="flex items-center">
                  <DocumentPlusIcon class="h-4 w-4 mr-2 text-gray-500" />
                  <p>Registrar Ventas</p>
                </div>
              </a>
            </list-group-item>
            <list-group-item>
              <a href="/registrar_nueva_venta">
                <div class="flex items-center">
                  <QueueListIcon class="h-4 w-4 mr-2 text-gray-500" />
                  <p>Historial de ventas</p>
                </div>
              </a>
            </list-group-item>
          </list-group>
        </dropdown>
      </the-card>

      <!--Inventario-->
      <the-card  variant="image"  img-src="src/assets/img/inventario.jpg" img-alt="Desk">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Inventario</h5>
        <dropdown text="Inventario">
          <list-group>
            <list-group-item>
              <a href="/gestion_productos" class="w-full h-full">
                <div class="flex items-center">
                  <SquaresPlusIcon class="h-4 w-4 mr-2 text-gray-500" />
                  <p>Gestión de productos</p>
                </div>
              </a>
            </list-group-item>
            <list-group-item>
              <a href="/registrar_nueva_venta">
                <div class="flex items-center">
                  <DocumentCheckIcon class="h-4 w-4 mr-2 text-gray-500" />
                  <p>Gestión de existencias</p>
                </div>
              </a>
            </list-group-item>
          </list-group>
        </dropdown>
      </the-card>

      <!--Empleados-->
      <the-card  variant="image"  img-src="src/assets/img/empleados.jpg" img-alt="Desk">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Empleados</h5>
        <dropdown text="Empleados">
          <list-group>
            <list-group-item>
              <a href="/empleado_agregar" class="w-full h-full">
                <div class="flex items-center">
                  <DocumentPlusIcon class="h-4 w-4 mr-2 text-gray-500" />
                  <p>Registrar empleado</p>
                </div>
              </a>
            </list-group-item>
            <list-group-item>
              <a href="/listar_empleados">
                <div class="flex items-center">
                  <QueueListIcon class="h-4 w-4 mr-2 text-gray-500" />
                  <p>Lista de empleados</p>
                </div>
              </a>
            </list-group-item>
            <list-group-item>
              <a href="/gestion_cargos">
                <div class="flex items-center">
                  <SquaresPlusIcon class="h-4 w-4 mr-2 text-gray-500" />
                  <p>Gestión de cargos</p>
                </div>
              </a>
            </list-group-item>
          </list-group>
        </dropdown>
      </the-card>

      <!--Asistencia-->
      <the-card  variant="image"  img-src="src/assets/img/asistencia.jpg" img-alt="Desk">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Registro de asistencias</h5>
        <dropdown text="Asistencia">
          <list-group>
            <list-group-item>
              <a href="/registrar_nueva_venta" class="w-full h-full">
                <div class="flex items-center">
                  <DocumentPlusIcon class="h-4 w-4 mr-2 text-gray-500" />
                  <p>Registrar asistencia</p>
                </div>
              </a>
            </list-group-item>
            <list-group-item>
              <a href="/registrar_nueva_venta">
                <div class="flex items-center">
                  <QueueListIcon class="h-4 w-4 mr-2 text-gray-500" />
                  <p>Historial de asistencia</p>
                </div>
              </a>
            </list-group-item>
          </list-group>
        </dropdown>
      </the-card>

      <!--Usuarios-->
      <the-card  variant="image"  img-src="src/assets/img/usuarios.jpg" img-alt="Desk">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Usuarios</h5>
        <dropdown text="Usuarios">
          <list-group>
            <list-group-item>
              <a href="/registrar_nueva_venta" class="w-full h-full">
                <div class="flex items-center">
                  <DocumentPlusIcon class="h-4 w-4 mr-2 text-gray-500" />
                  <p>Registrar usuario</p>
                </div>
              </a>
            </list-group-item>
            <list-group-item>
              <a href="/registrar_nueva_venta">
                <div class="flex items-center">
                  <QueueListIcon class="h-4 w-4 mr-2 text-gray-500" />
                  <p>Lista de usuarios</p>
                </div>
              </a>
            </list-group-item>
          </list-group>
        </dropdown>
      </the-card>

      <!--Informes y estadisticas-->
      <the-card  variant="image"  img-src="src/assets/img/estadisticas.jpg" img-alt="Desk">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Informes y Estadisticas</h5>
        <dropdown text="Informes">
          <list-group>
            <list-group-item>
              <a href="/registrar_nueva_venta" class="w-full h-full">
                <div class="flex items-center">
                  <DocumentPlusIcon class="h-4 w-4 mr-2 text-gray-500" />
                  <p>Informe de ventas</p>
                </div>
              </a>
            </list-group-item>
            <list-group-item>
              <a href="/registrar_nueva_venta">
                <div class="flex items-center">
                  <QueueListIcon class="h-4 w-4 mr-2 text-gray-500" />
                  <p>Informe de inventarios</p>
                </div>
              </a>
            </list-group-item>
          </list-group>
        </dropdown>
      </the-card>

    </div> 
  </main>
  
</template>

<script>

const navigationVentas = [
  { name: 'Registrar Ventas', href: '#', current: true },
  { name: 'Historial de ventas', href: '#', current: false },
]
  export default {
    data(){
      return{
        titulo:'Panel de Control',
      }
    }
  }
</script>
