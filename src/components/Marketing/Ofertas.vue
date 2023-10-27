<template>
  <div>
    <div class="ofertas-container" ref="ofertasContainer">
      <div v-for="oferta in ofertasPaginadas" :key="oferta.id" class="oferta-card">
        <div class="imagen-container">
          <img v-bind:src="baseUrl + '/productos/' + oferta.codigo_barra_producto + '/foto'" v-if="oferta.foto != ''"
            :alt="oferta.codigo_barra_producto" class="oferta-imagen" />
          <img v-else src="https://opelgtsource.com/assets/default_product.png" :alt="oferta.codigo_barra_producto"
            class="oferta-imagen" />
        </div>
        <div class="oferta-info">
          <p data-v-73b5fa90=""
            class="mt-2 flex-grow-0 flex-shrink-0 text-[15px] font-semibold text-center text-[#3056d3]">
            {{ oferta.nombre_oferta }}
          </p>
          <h2 class="oferta-unitario">Precio por unid. ${{ oferta.precio_unitario }}</h2>
          <p class="oferta-precio">Precio de oferta ${{ oferta.precio_oferta }}</p>
          <p data-v-73b5fa90=""
            class="mt-2 flex-grow-0 flex-shrink-0 text-[15px] font-semibold text-center text-[#3056d3]">
            Ahorras ${{ oferta.monto_rebaja }}
          </p>
          <p data-v-73b5fa90=""
            class="mt-2 flex-grow-0 flex-shrink-0 text-[15px] font-semibold text-center text-[#1f2937ff]">
            Valido hasta el {{ formatearFechas(oferta.fecha_fin_oferta) }}
          </p>
        </div>
      </div>
    </div>

    <!-- Nuevo contenedor para los botones de paginación -->
    <div class="pagination-container">
      <div class="pagination">
        <button @click="cambiarPagina(paginaActual - 1)" :disabled="paginaActual === 1">Anterior</button>
        <button v-for="numeroPagina in totalPaginas" :key="numeroPagina" @click="cambiarPagina(numeroPagina)"
          :class="{ active: numeroPagina === paginaActual }">{{ numeroPagina }}</button>
        <button @click="cambiarPagina(paginaActual + 1)" :disabled="paginaActual === totalPaginas">Siguiente</button>
      </div>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios';
import api_url from '../../config.js';
import moment from 'moment'



export default {
  data() {
    return {
      ofertas: [],
      elementosPorPagina: 8,
      paginaActual: 1,
      ulrFoto: "",
      baseUrl: api_url,
    };
  },
  created() {
    this.fetchOfertas();
  },
  computed: {
    totalPaginas() {
      return Math.ceil(this.ofertas.length / this.elementosPorPagina);
    },
    ofertasPaginadas() {
      const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
      const fin = inicio + this.elementosPorPagina;
      return this.ofertas.slice(inicio, fin);
    },
  },
  methods: {
    fetchOfertas() {
      axios.get(api_url + '/ofertas_blog')
        .then(response => {
          this.ofertas = response.data;
          console.log(this.ofertas);
        })
        .catch(error => {
          console.error('Error al obtener las ofertas:', error);
        });
    },
    cambiarPagina(pagina) {
      if (pagina >= 1 && pagina <= this.totalPaginas) {
        this.paginaActual = pagina;
        this.$refs.ofertasContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    cargarFoto(oferta) {
      if (oferta.foto != "") {
        axios.get(api_url + "/productos/" + oferta.codigo_barra_producto + "/foto", { responseType: 'arraybuffer' })
          .then(
            response => {
              let blob = new Blob([response.data], { type: "image/*" });
              let imageUrl = URL.createObjectURL(blob);
              this.ulrFoto = imageUrl;
              console.log(imageUrl);

            });
      }
    },
    formatearFechas(fecha) {
      return moment(fecha).format('DD/MM/YYYY')
    },
  }
};
</script>
  
<style scoped>
.ofertas-container {
  display: flex;
  flex-wrap: wrap;
}

.oferta-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 10px;
  width: 250px;
  box-sizing: border-box;
  background-color: #f1f5f9ff;
  padding: 10px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.oferta-imagen {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto;
}

.oferta-imagen img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.oferta-nombre {
  font-size: 1.2em;
  margin: 10px 0;
}

.oferta-precio {
  font-size: 1.2em;
  font-weight: bold;
}

.pagination-container {
  position: relative;
  width: 100%;
  text-align: center;
}

.pagination {
  display: inline-block;
  margin-bottom: 20px;
}

.pagination button {
  background-color: #3056d3ff;
  color: #FFFFFF;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 1em;
  margin: 0 2px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.pagination button:hover {
  background-color: #233F9A;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination .active {
  background-color: #233F9A;
}
</style>
  