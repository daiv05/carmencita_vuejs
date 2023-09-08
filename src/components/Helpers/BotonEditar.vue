<template>
    <RouterLink v-bind:to="url" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full m-1">Editar</RouterLink>
</template>
<script>
import { RouterLink } from 'vue-router';

export default {
    props:{
        url:null
    },
    data(){

    },
    methods:{

    }
}

</script>