<template>
    <div class="sm:w-full sm:h-[60px]">
            <div class="h-[100px] flex justify-between flex-col sm:px-16 w-full sm:h-[60px] absolute left-0 bg-white sm:flex-row"
                style="box-shadow: 0px 1.11px 3.329166889190674px 0 rgba(0,0,0,0.1), 0px 1.11px 2.219444513320923px 0 rgba(0,0,0,0.06);">
                <p class="text-[15px] md:text-[30px] mt-2 flex-grow-0 flex-shrink-0 w-[80%] sm:text-[20px] font-semibold text-left text-[#3056d3]">
                    {{ mensajeCabecera }}
                </p>
                <div
                    class="h-[40px] sm:flex items-center mt-4 flex-grow-0 flex-shrink-0 sm:h-[31px] py-[16px] rounded-[4.44px] bg-indigo-700">
                    <router-link to="/agregar_producto" class="flex-grow-0 flex-shrink-0 w-[225px] text-[13px] font-medium text-center text-white">
                        {{ mensajeBoton }}
                    </router-link>
                </div>
            </div>
        </div>      
</template>
<script>
export default {
    props:{
        mensajeCabecera:String,
        mensajeBoton:String,
    },
}
</script>
