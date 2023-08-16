import {createStore} from "vuex";
import axios from "axios";
import router from "../router";

//create a instance to handle user state

const  store = createStore({
    state(){
        return{
            user:null,
            estaAutenticado:false,
            tokenUser:"",
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
        }
    },
    actions:{
        async getToken(){
            axios.get('/sanctum/csrf-cookie').then(
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
            await this.getToken();
            try{
                await axios.post("login",payload.userForm)
                .then(
                    (response)=>{
                       context.commit("setEstaAutenticado",{"seAutentico":response.data.state});
                       context.commit("setUser",{"user":response.data.user});
                       context.commit("setTokenUser",{"tokenUser":response.data.tokenUser});
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
        }
    }
})

export default store;