import axios from 'axios'
import { createStore } from 'vuex'
import API_URL from '../config.js'

// Create a new store instance.
const store = createStore({
    state: {
        authToken: 1,
        authUser: 1,
    },
    mutations: {
        setAuthUser(state, user) {
            state.authUser = user;
        },
        setAuthToken(state, token) {
            state.authToken = token;
        },
    },
    // actions: {
    //   updateAuthUser({ commit }, user) {
    //     commit('setAuthUser', user);
    //   },
    //   updateAuthToken({ commit }, token) {
    //     commit('setAuthToken', token);
    //   },
    // },
})

export default store;