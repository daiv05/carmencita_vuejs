<template>
    <Transition name="modal">
        <div class="modal-mask bg-white">
            <div class="modal-container">
                <main>
                    <div class="mb-4">
                        <h1 class="text-2xl font-bold mb-6 text-left">Consultar Usuario</h1>
                        <p>Nombre de Usuario</p>
                        <p class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            id="name" name="name"> {{ usuarioModificado.name }}</p>
                    </div>
                    <div class="mb-4">
                        <p>E-mail</p>
                        <p class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            id="email" name="email"> {{ usuarioModificado.email }}</p>
                    </div>
                    <div class="mb-4">
                        <p>Cargo</p>
                        <p class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            id="password" name="password"> {{ usuarioModificado.cargo }}</p>
                    </div>
                    
                    <div class="text-center">
                        <button
                            class="bg-indigo-700 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
                            @click="cerrarModal">Aceptar</button>
                    </div>
                </main>

            </div>
        </div>
    </Transition>
</template>

<script>
import '../../assets/modal_default.css';
export default {
    components: {
        
    },
    data() {
        return {
            usuarioModificado: {},
            
        }
    },
    props: {usuario: null},
    mounted() {
        this.cargarUsuarioModificado();
    },
    methods: {
        cargarUsuarioModificado() {
            this.usuarioModificado = this.usuario;
            console.log(this.usuarioModificado);
        },
        cerrarModal() {
            this.$emit("cerrarModalConsultar");
        }
    }
}
</script>
