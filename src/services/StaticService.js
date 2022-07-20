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

  uploadFiles(data) {
    return this.upload('/candidats/upload', data);
  }

  createCandidat({commune, token, prenom, profession, ordre, nom, dossier, sexe, date, lieu}) {
    return this.post('/candidats/create', {commune, token, prenom, profession, ordre, nom, dossier, sexe, date, lieu}, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
  }

  createListe({departement, token, nom, candidats, collegeType}) {
    return this.post('/listes/create', {departement, nom, candidats, collegeType}, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
  }

  createBV({nom, collegeType, listes, token, departement, electeurs,}) {
    return this.post('/bureauVote/create', {nom, collegeType, listes, departement, electeurs,}, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
  }

  chargerDemandeur({code, type, nom, prenom, sexe, telephone, profession, dateNaissance, pere, mere, dateInscription, commune, status,}) {
    return this.post('/demandeur/create', {
      code,
      nom,
      prenom,
      sexe,
      telephone,
      profession,
      dateNaissance,
      pere,
      mere,
      type,
      dateInscription,
      commune,
      status,
    });
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

  updateListe({departement, nom, id, status, owner, candidats, collegeType}) {
    return this.post('/listes/' + id + '/update', {departement, owner, collegeType, nom, status, candidats});
  }

  updateUser({nom, prenom, email, phone, departement, userType, id}) {
    return this.post('/users/' + id + '/update', {
      nom,
      prenom,
      email,
      phone,
      departement,
      userType,
    });
  }

  updateBV({nom, collegeType, owner, listes, departement, electeurs, id}) {
    return this.post('/bureauVote/' + id + '/update', {
      nom,
      collegeType,
      owner,
      listes,
      departement,
      electeurs,
    });
  }

  updateCandidat({commune, prenom, owner, observation, profession, ordre, nom, dossier, sexe, date, lieu, statut, id}) {
    return this.post('/candidats/' + id + '/update', {
      commune,
      prenom,
      owner,
      observation,
      profession,
      ordre,
      nom,
      dossier,
      statut,
      sexe,
      date,
      lieu
    });
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

  getCandidats() {
    return this.get('/candidats/list', {})
  }

  getDemandeur() {
    return this.get('/demandeur/list', {})
  }

  getListe() {
    return this.get('/listes/list', {})
  }

  getElecteur() {
    return this.get('/electeurs/list', {})
  }

  getBureauVote() {
    return this.get('/BureauVote/list', {})
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

  deleteCandiat(id) {
    return this.get('/candidats/' + id + '/delete', {})
  }

  deleteListe(id) {
    return this.get('/listes/' + id + '/delete', {})
  }

  deleteDemandeur(id) {
    return this.get('/demandeur/' + id + '/delete', {})
  }

  deleteUser(id) {
    return this.get('/users/' + id + '/delete', {})
  }

  deleteBV(id) {
    return this.get('/bureauVote/' + id + '/delete', {})
  }


  signup({nom, prenom, email, phone, departement, userType, confirmedPassword, password}) {
    return this.post('/users/signup', {
      nom,
      prenom,
      email,
      phone,
      departement,
      userType,
      confirmedPassword,
      password
    }, {})
  }

  signin({email, password}) {
    return this.post('/users/signin', {email, password}, {})
  }


  logout(token) {
    return this.post('/users/signout', {}, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
  }

  signUpE({code, userType, confirmedPassword, departement, password}) {
    return this.post('/electeurs/signup', {code, userType, departement, confirmedPassword, password}, {})
  }

  signInE({code, password}) {
    return this.post('/electeurs/signin', {code, password}, {})
  }


  logoutE(token) {
    return this.post('/electeurs/signout', {}, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
  }

  getUsers() {
    return this.get('/users/list', {});
  }


}
