<template>
    <RouterLink v-bind:to="url" target="_blank" class="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded-full m-1">Ver</RouterLink>
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