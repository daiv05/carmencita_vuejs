import store from "../store/auth";
export default class ControladorPagina {
  constructor(urlEndpoint, axios) {
    this.paginaActual = 1;
    this.listaEnlaces = [];
    this.urlEndpoint = urlEndpoint;
    this.axios = axios;
    this.totalResultados = 0;
    this.resultadosPorPagina = 0;
    this.listaPaginas = [];
    this.totalPaginas = 0;
    this.paginaSiguiente = null;
    this.paginaPrevia = null;
    this.datosPagina = [];
    this.parametrosFiltro = {};
    this.urlActual = "";
  }

  configurarListaEnlacePaginas() {
    this.paginaPrevia = this.listaEnlaces[0]
    this.paginaSiguiente = this.listaEnlaces[this.listaEnlaces.length - 1]
    this.listaEnlaces = this.listaEnlaces.slice(1, this.listaEnlaces.length - 1)
  }

  async cargarPaginas() {
    let res = await this.axios.get(this.urlEndpoint,
      {"params":this.parametrosFiltro}
      ).catch((response) => {
      //console.log(response.data.data.mensaje)
    })
    if (!res) {
      return false
    } else {
      this.configurarParametrosPaginacion(res)
      this.configurarListaEnlacePaginas()
      return true
    }
  }

  setParametrosFiltro(parametrosFiltro){
    this.parametrosFiltro = parametrosFiltro;
  }

  configurarParametrosPaginacion(res) {
    if (res.data.meta) {
      this.listaEnlaces = res.data.meta.links;
      this.totalResultados = res.data.meta.per_page;
      this.resultadosPorPagina = res.data.meta.total;
      this.listaEnlaces[0].label = 'Prev';
      this.listaEnlaces[this.listaEnlaces.length - 1].label = 'Next';
      this.datosPagina = res.data.data;
    } else {
      console.log(res);
      this.listaEnlaces = res.data.links;
      this.totalResultados = res.data.total;
      this.resultadosPorPagina = res.data.per_page;
      this.listaEnlaces[0].label = "Prev";
      this.listaEnlaces[this.listaEnlaces.length - 1].label = 'Next';
      this.datosPagina = res.data.data;
    }
    this.obtenerEnlacePaginaActual();
  }

  obtenerEnlacePaginaActual(){
    this.listaEnlaces.forEach((link)=>{
      if(link.active == true){
        this.urlActual = link.url;
      }
  });
  }

  getDatosPagina() {
    return this.datosPagina
  }

  obtenerPaginaSiguiente(pageLink) {}

  obtenerPaginaPrevia() {}

  getPaginaSiguiente() {
    return this.paginaSiguiente
  }

  getPaginaPrevia() {
    return this.paginaPrevia
  }

  obtenerPagina(pageLink) {
    this.urlActual = pageLink.url;
    store.commit("setUrlPaginaActualHR",this.urlActual);
    if (pageLink.url) {
      this.axios
        .get(pageLink.url,{
          "params":this.parametrosFiltro,
        })
        .then((response) => {
          this.configurarParametrosPaginacion(response)
          this.configurarListaEnlacePaginas()
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  getUrlPaginaActual(){
    return this.urlActual;
  }

  obtenerListadoEnlaces() {
    return this.listaEnlaces
  }

  setUrlEndpoint() {}

  obtenerTotalPaginas() {
    this.totalPaginas = Math.ceil(this.totalResultados / this.resultadosPorPagina)
  }

  getTotalPaginas() {
    return this.totalPaginas
  }

  getListaPaginas() {
    return this.listaPaginas
  }

  llenarListaPaginas() {
    this.listaPaginas = new Array(this.totalPaginas).fill(0).map((_, index) => index + 1)
  }

  /**/
 obtenerListaResultadoPorPagina(){
    return this.datosPagina;
 }

 obtenerPosicionElemento(elemento){
    return  this.datosPagina.indexOf(elemento);
 }
}
