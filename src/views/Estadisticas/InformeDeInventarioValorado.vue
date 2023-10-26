<template>
    <main>
        <NavBar></NavBar>
        <!-- Encabezado -->
        <div>
            <div class="flex bg-white mx-auto p-5 shadow-md justify-between">
                <h1 class="font-bold text-blue-700 text-xl">Informe de Inventario Valorado</h1>
            </div>
            <div class="flex justify-start items-center mt-4 ml-4">
                <a href="#" @click="$router.go(-1)" class="text-sm text-black font-medium flex items-center">
                    <img src="../../assets/icons/arrow.svg" alt="Regresar" class="h-6 w-6 mr-1"> Regresar
                </a>
            </div>
        </div>

        <div class="grid grid-cols-1 gap-2 w-[90%] m-auto mt-[2%] mb-4">
            <div>
                <ComponenteGraficaInventarioValorado></ComponenteGraficaInventarioValorado>
            </div>
            
            <div>
                <ComponenteListaInventarioValorado></ComponenteListaInventarioValorado>
            </div>
        </div>
    </main>
</template>
<script>
import ComponenteGraficaInventarioValorado from '../../components/Inventario/ComponenteGraficaInventarioValorado.vue';
import ComponenteListaInventarioValorado from "../../components/Inventario/ComponenteListaInventarioValorado.vue";
import NavBar from "../../components/NavBar.vue";

export default {
    components: {
        ComponenteListaInventarioValorado,
        ComponenteGraficaInventarioValorado,
        NavBar,
    },
    data() {
        return {

        }
    },

}
</script>
