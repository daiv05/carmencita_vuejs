<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon, BuildingStorefrontIcon, UserCircleIcon } from '@heroicons/vue/24/outline'
import { useRoute } from 'vue-router';
import { Dropdown, ListGroup, ListGroupItem, TheCard } from 'flowbite-vue'

const route = useRoute();

const rutasRRHH = [
  {
    nombre: 'Empleados',
    href: '/recursos_humanos/listar_empleados',
  },
  {
    nombre: 'Usuarios',
    href: '/recursos_humanos/gestion_usuarios',
  },
  {
    nombre: 'Asistencia',
    href: '/recursos_humanos/historial_asistencia',
  },
  {
    nombre: 'Planilla',
    href: '/recursos_humanos/historial_planillas',
  },
];
const rutasVentas = [
  {
    nombre: 'Facturacion',
    href: '/facturacion/sales_list',
  },
  {
    nombre: 'Clientes',
    href: '/gestionar_clientes',
  },
  {
    nombre: 'Pedidos a domicilio',
    href: '/facturacion/listar_pedidos_domicilio',
  },
  {
    nombre: 'Hojas de Ruta',
    href: '/facturacion/listar_hojas_de_ruta',
  },
];
const rutasInventario = [
  {
    nombre: 'Productos',
    href: '/ventas_inventarios/gestion_productos',
  },
  {
    nombre: 'Existencias',
    href: '/gestion_existencias',
  },
];
const rutasInformes = [
  {
    nombre: 'Informes de venta e inventario',
    href: '/informes/panel_informes',
  },
];
const rutasRegistrarAsistencia = [
  {
    nombre: 'Registrar Asistencia',
    href: '/registrar_asistencia',
  },
];

var navigation = [
  { name: 'Inicio', href: '/', current: true, roles: ['Gerente', 'Sub-Gerente', 'Colaborador'], claves: [] },
  { name: 'RRHH', rutas: rutasRRHH, current: false, roles: ['Gerente'], claves: ['recursos', 'asistencia'] },
  { name: 'Ventas', rutas: rutasVentas, current: false, roles: ['Gerente', 'Sub-Gerente'], claves: ['facturacion'] },
  { name: 'Inventario', rutas: rutasInventario, current: false, roles: ['Gerente', 'Sub-Gerente'], claves: ['existencias', 'producto'] },
  { name: 'Informes', rutas: rutasInformes, current: false, roles: ['Gerente'], claves: ['informes'] },
  { name: 'Registrar asistencia', rutas: rutasRegistrarAsistencia, current: false, roles: ['Sub-Gerente', 'Colaborador'], claves: ['registrar_asistencia'] },
]

var usuario = JSON.parse(localStorage.authUser).user;

function switchCurrentOptionNavBar(valor, lista) {
  let isPresent = false;
  lista.forEach(clave => {
    if (valor.includes(clave)) {
      isPresent = valor.includes(clave)
    }
  })
  return isPresent;
}

function quitarOpcionNavBar() {
  usuario.roles.forEach(rol => {
    let cantActivos = 0;
    navigation.forEach(opcion => {

      if (!opcion.roles.includes(rol.name)) {
        navigation = navigation.filter(item => item.roles.includes(rol.name));
      }

      if (opcion.claves) {
        opcion.current = switchCurrentOptionNavBar(route.fullPath, opcion.claves)
      }
      if(opcion.current){
        cantActivos++;
      }
    });
    if(cantActivos == 0){
      navigation[0].current = true;
    }
  });
}
quitarOpcionNavBar();

</script>

<template>
  <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
    <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton
            class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>

        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex flex-shrink-0 items-center">
            <BuildingStorefrontIcon class="h-8 w-8 text-blue-500 font-bold" />
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <div v-for="item, index in navigation" class="flex w-auto p-0 m-0">
                <router-link v-if="(index == 0)" :key="item.name" :to="item.href"
                  :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium']"
                  :aria-current="item.current ? 'page' : undefined">{{ item.name }}</router-link>

                <Menu v-if="index > 0 && index < navigation.length" as="div" class="relative ml-3 my-2">
                  <div>
                    <MenuButton class="p-0">
                      <span
                        :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium']"
                        :aria-current="item.current ? 'page' : undefined">{{ item.name }}</span>
                    </MenuButton>
                  </div>
                  <transition v-if="index > 0 && index < navigation.length"
                    enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95"
                    enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
                    leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                    <MenuItems
                      class="absolute z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <MenuItem v-slot="{ active }" v-for="ruta in item.rutas">
                      <router-link :to="ruta.href"
                        :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">
                        {{ ruta.nombre }}</router-link>
                      </MenuItem>
                    </MenuItems>
                  </transition>
                </Menu>
              </div>
            </div>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <div class="text-white">
            {{ usuario.name }}
          </div>

          <!-- Profile dropdown -->
          <Menu as="div" class="relative ml-3">
            <div>
              <MenuButton
                class="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span class="sr-only">Open user menu</span>
                <UserCircleIcon class="h-10 w-10 text-blue-500" />
              </MenuButton>
            </div>
            <transition enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95">
              <MenuItems
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <MenuItem v-slot="{ active }">
                <div class="font-bold hover:bg-gray-100 p-2 pb-0 text-center">{{ usuario.name }}</div>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <div class="font-semibold hover:bg-gray-100 py-0 text-center">{{ usuario.email }}</div>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <div class="font-semibold hover:bg-gray-100 p-2 text-center">{{ usuario.roles[0].name }}</div>
                </MenuItem>
                <hr>
                <MenuItem v-slot="{ active }">
                <button @click="logout" href="#" class="w-full"
                  :class="[active ? 'bg-gray-100 w-100' : '', 'block w-100 px-4 py-2 text-sm text-gray-700']">Cerrar
                  Sesión</button>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pb-3 pt-2">
        <router-link v-for="item in navigation" :key="item.name" :to="item.href"
          :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium']"
          :aria-current="item.current ? 'page' : undefined">{{ item.name }}</router-link>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>
<script>
import store from '../store/auth';
import { useToast } from 'vue-toastification';

const toast = useToast();

export default {
  components: {

  },
  data() {
    return {
      user: null,
    }
  },
  methods: {
    logout() {
      this.watch_toast("Cerrando sesión...");
      store.dispatch("logout");
    },
    watch_toast(mensaje) {
      toast.info(mensaje, {
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
    },
  },
  mounted() {
    if (localStorage.authUser) {
      this.user = JSON.parse(localStorage.authUser).user;
    }
  }
}
</script>