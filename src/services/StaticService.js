import DataService from "./DataService";


export default class StaticService extends DataService {

  createRegions({nom}) {
    return this.post('/regions/create', {nom});
  }

  createDeparement({region, nom}) {
    return this.post('/departements/create', {region, nom});
  }

  createCommune({departement, nom}) {
    return this.post('/communes/create', {departement, nom});
  }

  updateRegion({nom, id}) {
    return this.post('/regions/' + id + '/update', {nom});
  }

  updateDepartement({region, nom, id}) {
    return this.post('/departements/' + id + '/update', {region, nom});
  }

  updateCommune({departement, nom, id}) {
    return this.post('/communes/' + id + '/update', {departement, nom});
  }


  getRegions() {
    return this.get('/regions/list', {})
  }

  getDepartements() {
    return this.get('/departements/list', {})
  }

  getCommunes() {
    return this.get('/communes/list', {})
  }

  getDemandeur() {
    return this.get('/demandeur/list', {})
  }


  deleteRegion(id) {
    return this.get('/regions/' + id + '/delete', {})
  }

  deleteDepartement(id) {
    return this.get('/departements/' + id + '/delete', {})
  }

  deleteCommune(id) {
    return this.get('/communes/' + id + '/delete', {})
  }


}
