<template>
    <NavBar />
    <div class="mb-8">
        <div>
            <div class="flex bg-white mx-auto p-5 shadow-md justify-between">
                <h1 class="font-bold text-blue-700 text-xl">Panel de Informes</h1>
                <div class="items-center rounded-[4.44px] bg-[#637381]">
                </div>
            </div>
            <div class="flex justify-start items-center mt-4 ml-4">
                <a href="#" @click="$router.go(-1)" class="text-sm text-black font-medium flex items-center">
                    <img src="../../assets/icons/arrow.svg" alt="Regresar" class="h-6 w-6 mr-1"> Regresar
                </a>
            </div>
        </div>

        <div class="md:w-[90%] w-auto p-4 mx-auto bg-slate-50 shadow rounded-md overflow-auto">


            <!-- TITULO SECCION -->
            <div class="m-auto p-1 pt-4 w-4/5 pb-8">
                <h2 class="font-bold text-lg">Informes de Ventas</h2>
                <hr>
            </div>

            <!-- CARD 1 -->
            <router-link to="/informes/informe_ventas_totales" class="flex flex-col items-center mb-4 bg-white rounded-lg shadow md:flex-row hover:bg-gray-100">
                <img class="object-cover rounded-t-lg h-auto w-32 rounded-l-lg"
                    src="../../assets/img-informes/1.report_10063539.png" alt="">
                <div class="flex flex-col justify-between p-4 leading-normal">
                    <h1 class="mb-2 text-base font-bold tracking-tight text-gray-900 dark:text-white">Informes de Ventas
                        Totales</h1>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Visualiza las ganancias anuales y
                        mensuales. Selecciona un año y filtra los meses que quieres consultar.</p>
                </div>
            </router-link>
            <!-- CARD 2 -->
            <router-link to="/informes/informe_ventas_productos" class="flex flex-col items-center mb-4 bg-white rounded-lg shadow md:flex-row hover:bg-gray-100">
                <img class="object-cover rounded-t-lg h-auto w-32 rounded-l-lg"
                    src="../../assets/img-informes/2.trading_9362307.png" alt="">
                <div class="flex flex-col justify-between p-4 leading-normal">
                    <h1 class="mb-2 text-base font-bold tracking-tight text-gray-900 dark:text-white">Informe de Ventas por
                        Producto</h1>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Consulta las ventas de todos los productos
                        de la tienda, filtra por fechas, ingresos o unidades vendidas.</p>
                </div>
            </router-link>
            <!-- CARD 3 -->
            <router-link to="/informes/informe_productos_mas_vendidos" class="flex flex-col items-center mb-4 bg-white rounded-lg shadow md:flex-row hover:bg-gray-100">
                <img class="object-cover rounded-t-lg h-auto w-32 rounded-l-lg"
                    src="../../assets/img-informes/3.reward_1162356.png" alt="">
                <div class="flex flex-col justify-between p-4 leading-normal">
                    <h1 class="mb-2 text-base font-bold tracking-tight text-gray-900 dark:text-white">Informe de Productos +/-
                        vendidos</h1>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Consulta cuáles son los productos que mayor
                        o menor ganancia han generado. Filtra por fecha y especifica la cantidad max. de productos que
                        quieres ver.</p>
                </div>
            </router-link>


            <!-- ------------------------------------------------------------------------------ -->


            <!-- TITULO SECCION -->
            <div class="m-auto p-1 pt-4 w-4/5 pb-8">
                <h2 class="font-bold text-lg">Informes de Inventario</h2>
                <hr>
            </div>

            <!-- CARD 1 -->
            <router-link to="/informes/informe_inventario_valorado" class="flex flex-col items-center mb-4 bg-white rounded-lg shadow md:flex-row hover:bg-gray-100">
                <img class="object-cover rounded-t-lg h-auto w-32 rounded-l-lg"
                    src="../../assets/img-informes/4.order_10614619.png" alt="">
                <div class="flex flex-col justify-between p-4 leading-normal">
                    <h1 class="mb-2 text-base font-bold tracking-tight text-gray-900 dark:text-white">Informe de Inventario
                        Valorado</h1>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Consulta los productos con mayor valor en
                        inventario (en dólares). Establece el rango de valores que quieres visualizar.</p>
                </div>
            </router-link>
            <!-- CARD 2 -->
            <router-link to="/informes/informe_existencias_de_productos" class="flex flex-col items-center mb-4 bg-white rounded-lg shadow md:flex-row hover:bg-gray-100">
                <img class="object-cover rounded-t-lg h-auto w-32 rounded-l-lg"
                    src="../../assets/img-informes/5.inventory_2897785.png" alt="">
                <div class="flex flex-col justify-between p-4 leading-normal">
                    <h1 class="mb-2 text-base font-bold tracking-tight text-gray-900 dark:text-white">Informe de Existencias
                    </h1>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Consulta las existencias de todos los
                        productos en inventario. Establece un limite de stock y resalta los registros menores.</p>
                </div>
            </router-link>
            <!-- CARD 3 -->
            <router-link to="/informes/informe_productos_por_vencer" class="flex flex-col items-center mb-4 bg-white rounded-lg shadow md:flex-row hover:bg-gray-100">
                <img class="object-cover rounded-t-lg h-auto w-32 rounded-l-lg"
                    src="../../assets/img-informes/6.time_3575441.png" alt="">
                <div class="flex flex-col justify-between p-4 leading-normal">
                    <h1 class="mb-2 text-base font-bold tracking-tight text-gray-900 dark:text-white">Informe de Lotes
                        Próximos a Caducar</h1>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Consulta los lotes con fecha de caducidad
                        mas próxima.</p>
                </div>
            </router-link>


        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
export default {
    name: 'PanelInformes',
    data() {
        return {
        }
    },
    components: {
        NavBar,
    },
    created() {
    },
    methods: {
    }
}

</script>