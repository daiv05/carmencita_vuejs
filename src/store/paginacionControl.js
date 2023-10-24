import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

const paginacionStore = createStore(
    {
        state(){
            return {
                listaProductos: null,
                next_page_url: "",
                prev_page_url:"",
                controlPagina:0,
                exitenDatos:false,
            }
        },
        mutations:{
            setListaProductos(state,payload){   
                //payload es un objeto de js
                state.listaProductos = payload.listaProductos;
                state.exitenDatos = true;
            },
            setNextPageUrl(state,payload){
                state.next_page_url = payload.next_page_url;
            },
            setPrevPageUrl(state,payload){
                state.prev_page_url = payload.prev_page_url;
            },
            setControlPagina(state,payload){
                state.controlPagina = payload.controlPagina;
            }
        },
        plugins:[createPersistedState(
            {
                key:"controlPagina",
                paths:["listaProductos","next_page_url","prev_page_url","controlPagina","exitenDatos"],
            }
        )]
    }
);

export default paginacionStore;