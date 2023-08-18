import {createStore} from "vuex";
import axios from "axios";
import router from "../router/index";
import createPersistedState from 'vuex-persistedstate';

//create a instance to handle user state

const  store = createStore({
    state(){
        return{
            user:null,
            estaAutenticado:false,
            tokenUser:"",
            permisos:[],
        }
    },
    mutations:{
        setEstaAutenticado(state,payload){
            state.estaAutenticado = payload.seAutentico;
        },
        setUser(state,payload){
            state.user = payload.user;
        },
        setTokenUser(state,payload){
            state.tokenUser = payload.tokenUser;
        },
        setPermisos(state,payload){
            state.permisos = [];
            payload.permisos.forEach(element => {
                state.permisos.push(element.name);
            });
        }
    },
    actions:{
        async getToken(){
            await axios.get('/sanctum/csrf-cookie').then(
                (response)=>{
                    console.log(response);
                }
            ).catch(
                (response)=>{
                    console.log(response);
                }
            );
        },
        async login(context,payload){
            await context.dispatch("getToken");
            try{
                await axios.post("/api/login",payload)
                .then(
                    (response)=>{
                       console.log(response);
                       context.commit("setEstaAutenticado",{"seAutentico":response.data.result});
                       context.commit("setUser",{"user":response.data.user});
                       context.commit("setTokenUser",{"tokenUser":response.data.token});
                       context.commit("setPermisos",{"permisos":response.data.permisos});
                       axios.defaults.headers.common = {'Authorization': "Bearer " + context.state.tokenUser};
                       router.push("/");
                    }
                )
                .catch(
                    (response)=>{
                        console.log(response);
                    }
                );
            }catch(error){
                console.log(error);
            }
        },
        imprimirMensaje(context){
            console.log("Hola mundo desde mi store");
            console.log(context.user);
        },
        logout(context){
            axios.post("/api/logout").then(
                (response)=>{
                    console.log(response);
                    context.dispatch("cleanStore");
                    alert("Cerro su cuenta");
                    setTimeout(()=>{
                        router.push("/iniciar_sesion");
                    },2000);
                }
            ).catch(
                (response)=>{
                    console.log(response);
                }
            )
        },
        setTokenUserOnAxios(context){
            axios.defaults.headers.common["Authorization"] = "Bearer "+context.state.tokenUser;
        },
        cleanStore(context){
            context.state.estaAutenticado = false;
            context.state.tokenUser = "";
            context.state.user = null;
            /*you must changed alert for other kind of pop up*/
            alert("Has cerrado sesión correctamente");
            localStorage.removeItem("authUser");
        }
    },
    plugins: [createPersistedState(
        {
            key:"authUser",
            paths:["user","estaAutenticado","tokenUser","permisos"]
        }
    )]
})

export default store;