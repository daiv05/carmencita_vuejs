<script setup>

</script>
<template>

    <main>
        <article class=" w-[90%] flex flex-wrap mt-[10%] flex-row justify-center md:w-[50%] lg:w-[40%] m-auto">                    
                <form action="" method="post" class="" @submit="autenticarUsuario($event)">
                    <div>
                        <div class="flex justify-center mb-[2%]">
                            <img src="../../assets/img/Seguridad/login1.png" alt="Icono de user login" class="w-[10%] ">
                        </div>

                        <div class="text-[2em] font-bold text-center mb-[5%]">
                            Inicio de Sesión
                        </div>
                    </div>
                <div>
                    <Field type="email" name="email" id="email"
                     class=" w-[100%] border border-gray-300 text-gray-900 sm:text-sm rounded-[5px] focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-[5%]" 
                     placeholder="blackmore@gmail.com" required=""  v-model="email" :rules="isRequired"/>
                     <ErrorMessage name="email" />
                </div>
                <div>
                    <Field type="password" name="password" id="pass"
                     class="w-[100%] border border-gray-300 text-gray-900 sm:text-sm 
                     rounded-[5px] focus:ring-primary-600 focus:border-primary-600 blockp-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-[5%]"
                      placeholder="Contraseña" required=""  v-model="password" :rules="isRequired"/>
                      <ErrorMessage name="password" />
                </div>
                <div class="flex justify-between mb-[5%]">
                </div>
                <input type="submit" value="Iniciar sesion" name="login" id = "login" class="bg-indigo-600 block w-[100%] p-[1%] text-white text-[1em] rounded-[5px] hover:cursor-pointer">
            </form>
        </article>
    </main>

</template >
<script >
import { Field, Form, ErrorMessage } from 'vee-validate';


export default {
    components: {
    Form,
    Field,
    ErrorMessage,
  },

    data(){
        return{
            "email":"",
            "password":"",
        }
    },
    methods:{
        autenticarUsuario(event){
            event.preventDefault();
            const payload = {"email":this.email,"password":this.password};
            this.$store.dispatch("login",payload);
        },
        isRequired(value){
            if(value === ""){
                return "Este campo es obligatorio";
            }
        }
    }

}

</script>
