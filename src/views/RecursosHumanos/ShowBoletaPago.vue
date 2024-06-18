<template>
    <main>
        <Navbar></Navbar>
        <div class="flex justify-between px-16 w-full bg-white" style="
          box-shadow: 0px 1.11px 3.329166889190674px 0 rgba(0, 0, 0, 0.1),
            0px 1.11px 2.219444513320923px 0 rgba(0, 0, 0, 0.06);
        ">
            <p class="mt-2 flex-grow-0 flex-shrink-0 w-[80%] text-[30px] font-semibold text-left text-[#3056d3]">
                Gestion Empleados
            </p>
        </div>
        <div class="boleta-pago bg-white py-6 px-24 rounded-lg shadow-md max-w-4xl mx-auto my-8">
            <h1 class="text-2xl font-bold text-center mb-4">Tienda y Depósito Carmencita</h1>
            <h1 class="text-2xl font-bold text-center mb-0">Boleta de Pago</h1>
            <div class="text-center mt-0 mb-4"><span>{{ periodo }}</span></div>
            <div class="grid grid-cols-2 gap-4">
                <div class="col-span-2 text-xl font-semibold mb-2">
                    <p><strong>Información del empleado:</strong></p>
                </div>
                <div class="mb-6">
                    <p class="mb-1"><strong>Nombre:</strong> {{ empleado.primer_nombre }} {{ empleado.segundo_nombre }}
                        {{ empleado.primer_apellido }} {{ empleado.segundo_apellido }}</p>
                    <p class="mb-1"><strong>DUI:</strong> {{ empleado.dui_empleado }}</p>
                    <p class="mb-1"><strong>Teléfono:</strong> {{ empleado.telefono }}</p>
                </div>
                <div class="mb-6">
                    <p class="mb-1"><strong>Residencia:</strong> {{ empleado.residencia }}</p>
                    <p class="mb-1"><strong>Domicilio:</strong> {{ empleado.domicilio }}</p>
                    <p class="mb-1"><strong>Profesión:</strong> {{ empleado.profesion_oficio }}</p>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div class="col-span-2 mb-2 text-xl font-semibold">
                    <p><strong>Días trabajados:</strong> {{ detallePlanilla.dias_laborados }}</p>
                </div>
                <div>
                    <h2 class="text-xl font-semibold mb-2">(+ ) Ingresos percibidos</h2>
                    <p class="mb-1"><strong>Salario devengado:</strong> ${{ detallePlanilla.base }}</p>
                    <!--<p class="mb-1"><strong>Horas extras:</strong> $0.00</p>
                    <p class="mb-1"><strong>Nocturnidad:</strong> $0.00</p>-->
                    <p class="mb-1"><strong>Aguinaldo:</strong> $0.00</p>
                    <p class="mb-1"><strong>Bonificaciones:</strong> ${{ detallePlanilla.monto_bonos }}</p>
                    <!--<p class="mb-1"><strong>Vacación devengada:</strong> $0.00</p>-->
                    <p class="mb-1"><strong>Vacación 30%:</strong> ${{ detallePlanilla.monto_vacaciones }}</p>
                    <!--<p class="mb-1"><strong>Viáticos:</strong> $0.00</p>
                    <p class="mb-1"><strong>Premios:</strong> $0.00</p>
                    <p class="mb-1"><strong>Dietas:</strong> $0.00</p>
                    <p class="mb-1"><strong>Otros ingresos:</strong> $0.00</p>-->
                    <p class="mt-4"><strong>Total ingresos:</strong> ${{ detallePlanilla.monto_gravable_cotizable }}</p>
                </div>
                <div>
                    <h2 class="text-xl font-semibold mb-2">(-) Egresos y deducciones</h2>
                    <p class="mb-1"><strong>ISSS:</strong> ${{ detallePlanilla.monto_isss }}</p>
                    <p class="mb-1"><strong>AFP:</strong> ${{ detallePlanilla.monto_afp }}</p>
                    <!--<p class="mb-1"><strong>FSPV:</strong> $0.00</p>
                    <p class="mb-1"><strong>Imp. Sobre / renta:</strong> $0.00</p>
                    <p class="mb-1"><strong>Anticipos:</strong> $0.00</p>
                    <p class="mb-1"><strong>Prestamos:</strong> $0.00</p>
                    <p class="mb-1"><strong>Otros descuentos:</strong> $0.00</p>
                    <p class="mb-1"><strong>Prestamos bancarios:</strong> $0.00</p>
                    <p class="mb-1"><strong>Seguros:</strong> $0.00</p>
                    <p class="mb-1"><strong>Descuentos p/equipo:</strong> $0.00</p>
                    <p class="mb-1"><strong>Liquidación:</strong> $0.00</p>-->
                    <p class="mt-4"><strong>Total egresos:</strong> ${{ Number(parseFloat(detallePlanilla.monto_isss) +
                        parseFloat(detallePlanilla.monto_afp)).toFixed(2) }}</p>
                </div>
                <div class="col-span-2 text-center mt-6">
                    <p class="text-lg font-bold"><strong>Total Neto a recibir:</strong> ${{
                        Number(detallePlanilla.monto_pago_empleado).toFixed(2) }}</p>
                </div>
                <div class="col-span-2 text-center mt-6">
                    <div class="w-full">
                        <p class="text-sm"><strong>F._______________________</strong></p>
                        <p class="text-sm text-center">{{ empleado.cargo.nombre_cargo }}</p>
                        <p class="text-sm">{{ empleado.primer_nombre }} {{ empleado.segundo_nombre }} {{
                            empleado.primer_apellido }} {{ empleado.segundo_apellido }}</p>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<script>
import Navbar from '../../components/NavBar.vue'
import axios from 'axios'
import moment from 'moment'
import { showMessages } from '../../components/functions.js'

export default {
    components: {
        Navbar
    },
    data() {
        return {
            idDetallePlanilla: null,
            detallePlanilla: null,
            empleado: null,
            periodo: null
        }
    },
    created() {
        // Acceder al parámetro de la ruta
        this.idDetallePlanilla = this.$route.params.idDetallePlanilla;
        // Aquí puedes hacer una llamada a la API o realizar alguna lógica adicional
        this.getBoletaPago(this.idDetallePlanilla);
    },
    methods: {
        getBoletaPago(id_detalle_planilla) {

            axios.get('/api/get_boleta_pago/' + id_detalle_planilla).then(
                (response) => {
                    this.detallePlanilla = response.data.detalle_planilla
                    this.empleado = response.data.empleado
                    this.periodo = response.data.periodo
                    //showMessages(true,)
                }
            ).catch(
                (error) => {
                    showMessages(false, 'Error al obtener los datos')
                }
            )
        }
    }
}
</script>