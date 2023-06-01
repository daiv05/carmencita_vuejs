<script setup>
import ModalPrecioExtra from "../../components/Inventario/ModalPrecioExtra.vue";
</script>
<template>
    <main>
       <div>
        <button @click="controlModalPrecioExtra = true">
            Agregar Precion extra
        </button>
       </div>

        <Teleport to = "body">
            <ModalPrecioExtra v-if="controlModalPrecioExtra" @controlEventoModal="controlEventoModal"></ModalPrecioExtra>
        </Teleport>
    </main>
    
</template>

<script>

export default {
    components:{
        
    },
    data(){
        return{
            controlModalPrecioExtra:false,
        }
    },
    methods:{
        controlEventoModal(precioExtra){
            if(precioExtra){
                console.log(" Se tiene que agregar un precio extra a las listas de precios extra ");
                console.log(precioExtra);
            }
            this.controlModalPrecioExtra = false;
        }
    }
}
</script>
