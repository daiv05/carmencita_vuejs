<template>
    <main class="relative">
        <NavBar />
        <div class="w-full h-[60px]">
            <div class="flex justify-between px-16 w-full h-[60px] absolute left-0 bg-white" 
                style="box-shadow: 0px 1.11px 3.329166889190674px 0 rgba(0, 0, 0, 0.1),
                0px 1.11px 2.219444513320923px 0 rgba(0, 0, 0, 0.06);">
                <p class="mt-2 flex-grow-0 flex-shrink-0 w-[80%] text-[30px] font-semibold text-left text-[#3056d3]">
                    Informe de productos menos vendidos
                </p>
            </div>
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