<script>
import { RouterView } from 'vue-router'
import { mapState } from 'vuex'
import VLoader from './components/VLoader.vue';

export default {
  components: {
    RouterView,
    VLoader
  },
  computed: {
    ...mapState( ['cargando'])
  }
}

</script>

<template>
  <v-loader v-if="cargando" />
  <router-view />
</template>