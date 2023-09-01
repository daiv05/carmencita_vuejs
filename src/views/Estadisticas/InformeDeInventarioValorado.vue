<template>
    <main>
        <h1 class="text-2xl font-bold mb-6 text-left text-indigo-600 ml-[5%] mt-[2%]">Informe de Inventario Valorado</h1>
        <div class="grid grid-cols-2 grid-row-1 gap-2 w-[90%] m-auto mt-[2%]">
            <div>
                <ComponenteListaInventarioValorado></ComponenteListaInventarioValorado>
            </div>
            <div>
                <ComponenteGraficaInventarioValorado></ComponenteGraficaInventarioValorado>
            </div>
        </div>
    </main>

</template>
<script>
import ComponenteGraficaInventarioValorado from '../../components/Inventario/ComponenteGraficaInventarioValorado.vue';
import ComponenteListaInventarioValorado from "../../components/Inventario/ComponenteListaInventarioValorado.vue";
export default {
    components:{
        ComponenteListaInventarioValorado,
        ComponenteGraficaInventarioValorado,
    },  
    data(){
        return {

        }
    },

}
</script>
