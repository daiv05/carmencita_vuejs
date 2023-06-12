<script setup>
import NavBar from "../../components/NavBar.vue";
</script>

<template>
    <main>
        <!--  NavBar component  -->
        <NavBar />

        <!--  Titulo  -->
        <div class="container mx-auto p-10 ">
            <h1 class="font-bold text-blue-700 text-2xl ">Gestión de Productos</h1>
        </div>

        <section class="bg-gray-100">
            <!-- component -->
            <div class="text-end">
                <button @click="agregarProducto" class="bg-indigo-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-20 mt-2 ">
                    Agregar Producto
                </button>
            </div>

            <!-- Apartado para Filtro  -->
            <div class="">
                <div class="flex">
                    <div class="w-1/4 pr-4">
                        <div class="mb-4">
                            <h2 class="text-xl font-bold mb-2">Filtros</h2>
                            <label class="flex items-center">
                                <input type="radio" v-model="filtro" value="activos" class="mr-2">
                                <span class="text-gray-700">Activos</span>
                            </label>
                            <label class="flex items-center">
                                <input type="radio" v-model="filtro" value="inactivos" class="mr-2">
                                <span class="text-gray-700">Inactivos</span>
                            </label>
                        </div>
                        <button @click="aplicarFiltro" class="bg-blue-500 text-white px-4 py-2 rounded-md">Aplicar Filtro</button>
                    </div>
                </div>
            </div>

            <section class="container mx-auto p-6 z-900">
                
                <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                    <div class="w-full overflow-x-auto">
                        
                        <table class="w-full">
                            
                            <thead>
                                <tr
                                    class="text-md font-semibold tracking-wide text-gray-900 bg-gray-100 uppercase text-center">
                                    <th class="px-4 py-3">Nombre Producto</th>
                                    <th class="px-4 py-3">Código de Barras</th>
                                    <th class="px-4 py-3">Precio Unitario</th>
                                    <th class="px-4 py-3">Cantidad Disponible</th>
                                    <th class="px-4 py-3">Stock</th>
                                    <th class="px-4 py-3">Acciones</th>
                                </tr>
                            </thead>

                            <tbody class="bg-white">
                                
                            </tbody>
                        </table>

                    </div>
                </div>
            </section>
        </section>

        

    </main>
</template>

<script>

</script>