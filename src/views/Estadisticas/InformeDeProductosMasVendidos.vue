<template>
    <main class="relative">
        <NavBar />
        <div class="w-full h-[60px]">
            <div class="flex justify-between px-16 w-full h-[60px] absolute left-0 bg-white" style="box-shadow: 0px 1.11px 3.329166889190674px 0 rgba(0, 0, 0, 0.1),
                0px 1.11px 2.219444513320923px 0 rgba(0, 0, 0, 0.06);">
                <p class="mt-2 flex-grow-0 flex-shrink-0 w-[80%] text-[30px] font-semibold text-left text-[#3056d3]">
                    Informe de productos más vendidos
                </p>
            </div>
        </div>

        <div class="absolute right-[80%] top-[120%]">
            <input type="date" value="2017-06-01" />
            <input type="date" value="2017-06-01" />
        </div>

        <div class="absolute left-[81.5%] top-[120%]">
            <button type="button" class="text-white bg-indigo-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Aplicar</button>
        </div>

    </main>
</template>

<script>
import NavBar from '../../components/NavBar.vue'
//import axios from 'axios'
export default {
    components: {
        NavBar
    },
}
</script>i