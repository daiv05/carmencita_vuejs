import { createStore } from 'vuex'
import axios from 'axios'
import router from '../router/index'
import createPersistedState from 'vuex-persistedstate'
import { useToast } from 'vue-toastification'
//create a instance to handle user state

const store = createStore({
  state() {
    return {
      user: null,
      estaAutenticado: false,
      tokenUser: '',
      permisos: [],
      urlPaginaActual: 'url/por_defecto',
      urlPaginaActualHR: '',
      existenDatos: false,
      fromAgregarEditarProducto: false,
      fromAgregarEditarHR: false
    }
  },
  mutations: {
    setEstaAutenticado(state, payload) {
      state.estaAutenticado = payload.seAutentico
    },
    setUser(state, payload) {
      state.user = payload.user
    },
    setTokenUser(state, payload) {
      state.tokenUser = payload.tokenUser
    },
    setPermisos(state, payload) {
      state.permisos = []
      payload.permisos.forEach((element) => {
        state.permisos.push(element.name)
      })
    },
    setUrlPaginaActual(state, payload) {
      state.urlPaginaActual = payload.urlPaginaActual
    },
    setUrlPaginaActualHR(state, payload) {
      state.urlPaginaActualHR = payload.urlPaginaActualHR;
    },
    setFromAgregarEditarProducto(state, payload) {
      state.fromAgregarEditarProducto = payload.fromAgregarEditarProducto
    },
    setFromAgregarEditarHR(state, payload) {
      state.fromAgregarEditarHR = payload.fromAgregarEditarHR
    },
    setExistenDatos(state, payload) {
      state.existenDatos = payload.existenDatos
    }
  },
  actions: {
    async getToken() {
      await axios
        .get('/sanctum/csrf-cookie')
        .then((response) => {
          console.log(response)
        })
        .catch((response) => {
          console.log(response)
        })
    },
    async login(context, payload) {
      await context.dispatch('getToken')
      try {
        await axios
          .post('/api/login', payload)
          .then((response) => {
            console.log(response)
            context.commit('setEstaAutenticado', { seAutentico: response.data.result })
            context.commit('setUser', { user: response.data.user })
            context.commit('setTokenUser', { tokenUser: response.data.token })
            context.commit('setPermisos', { permisos: response.data.permisos })
            axios.defaults.headers.common = { Authorization: 'Bearer ' + context.state.tokenUser }
            router.push('/')
          })
          .catch((response) => {
            console.log(response)
            context.dispatch('showToast', { mensaje: response.response.data.message })
          })
      } catch (error) {
        console.log(error)
      }
    },
    imprimirMensaje(context) {
      console.log(context.user)
    },
    logout(context) {
      axios
        .post('/api/logout')
        .then((response) => {
          console.log(response)
          context.dispatch('cleanStore')

          setTimeout(() => {
            /*you must changed alert for other kind of pop up*/
            //alert("Has cerrado sesión correctamente");
            useToast().success('Cerro sesión correctamente', {
              timeout: 1000
            })
            router.push('/iniciar_sesion')
          }, 100)
        })
        .catch((response) => {
          console.log(response)
          context.dispatch('cleanStore')
          router.push('/iniciar_sesion')
        })
    },
    setTokenUserOnAxios(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.tokenUser
    },
    cleanStore(context) {
      context.state.estaAutenticado = false
      context.state.tokenUser = ''
      context.state.user = null
      localStorage.removeItem('authUser')
    },
    showToast(context, payload) {
      const toast = useToast()
      toast.error(payload.mensaje)
      //alert(payload.mensaje);
    }
  },
  plugins: [
    createPersistedState({
      key: 'authUser',
      paths: [
        'user',
        'estaAutenticado',
        'tokenUser',
        'permisos',
        'urlPaginaActual',
        'urlPaginaAcutalHR',
        'existenDatos',
        'fromAgregarEditarProducto',
        'fromAgregarEditarHR',
      ]
    })
  ]
})

export default store
