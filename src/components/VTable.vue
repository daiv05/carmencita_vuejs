<template>
    <div class="md:w-[85%] w-auto p-4 mx-auto bg-slate-50 shadow rounded-md overflow-auto">
        <table class="table w-full max-h-screen rounded-md">
            <thead class="border-b bg-slate-100">
                <tr class="text-center">
                    <td v-for="header in headers" scope="col" class="px-6 py-4 text-xs text-gray-500 font-semibold">{{
                        header.nombre }}</td>
                </tr>
            </thead>
            <tbody class="text-center">
                <!-- Contenido de la tabla, con slots por si desde el padre se requiere modificar como aparece -->
                <tr v-for="item in items" :key="item.id">
                    <td v-for="header in headers" :key="header.nombre"
                        class="px-6 py-4 text-sm text-gray-500 font-semibold">
                        <slot :name="header.valor" v-bind="{ item }">{{ obtenerValor(item, header.valor) }}</slot>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        headers: {
            type: Array,
            required: true,
        },
        items: {
            type: Array,
            required: true,
        },
    },
    methods: {
        obtenerValor(objeto, cadenaAcceso) {
            try {
                const propiedades = cadenaAcceso.split('.');
                let valor = objeto;

                for (const propiedad of propiedades) {
                    if (propiedad.includes('[')) {
                        const [nombrePropiedad, indice] = propiedad.split(/[\[\]]/).filter(Boolean);
                        valor = valor[nombrePropiedad][parseInt(indice)];
                    } else {
                        valor = valor[propiedad];
                    }
                }
                return valor;
            } catch (error) {
                return 'Error al acceder a la propiedad' + cadenaAcceso + ' del objeto';
            }
        }
    },
};
</script>