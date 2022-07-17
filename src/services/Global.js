import React from "react";
import StaticService from "./StaticService";
import {read, utils} from 'xlsx';

const Context = React.createContext();

class Global extends React.Component {

  state = {
    regions: [],
    departements: [],
    communes: [],
    candidats: [],
    demandeurs: [],
    file: "",
    users: [],
    user: [],
    json: [],
    listes: [],
    _id: "",
  };


  createRegion = ({nom}) => {
    console.log(nom);
    new StaticService().createRegions({nom}).then(res => {
      if (res.data.success === true) {
        this.getRegion();
      }
    }, err => {
      console.error(err);
    });
  };

  createDepartement = ({region, nom}) => {
    console.log(nom, region);

    new StaticService().createDeparement({region, nom}).then(res => {
      if (res.data.success === true) {
        this.getDepartement();
      }
    }, err => {
      console.error(err);
    });
  };

  createCommune = ({departement, nom}) => {
    console.log(nom, departement);
    new StaticService().createCommune({departement, nom}).then(res => {
      if (res.data.success === true) {
        this.getCommune();
      }
    }, err => {
      console.error(err);
    });
  };

  createListe = ({departement, token, nom, candidats, collegeType}) => {
    console.log(nom, departement,candidats,collegeType);
    new StaticService().createListe({departement, token, nom, candidats, collegeType}).then(res => {
      if (res.data.success === true) {
        this.getListe();
      }
    }, err => {
      console.error(err);
    });
  };

  createCandidat = ({token, commune, prenom, profession, ordre, nom, sexe, date, lieu}) => {
    // console.log(nom, departement);
    const dossier = this.state.file;
    console.log('tok', dossier);
    new StaticService().createCandidat({
      commune,
      token,
      prenom,
      profession,
      ordre,
      nom,
      dossier,
      sexe,
      date,
      lieu
    }).then(res => {
      if (res.data.success === true) {
        this.getCandidat();
      }
    }, err => {
      console.error(err);
    });
  };

  createDemandeur = async ({file, type, departement, status}) => {
    // console.log(nom, departement);
    let ok = true;
    const propertiesArray = ['code', 'nom', 'prenom', 'sexe', 'telephone', 'profession', 'dateNaissance', 'pere', 'mere', 'dateInscription', 'commune'];
    this.state.json.forEach((item) => {
      console.log(Object.keys(item));
      for (const prop of Object.keys(item)) {
        if (!propertiesArray.includes(prop)) {
          console.log('erreur');
          ok = false;
        }

      }
      if (ok) {

        this.state.communes.filter(e => e.departement === departement).forEach((i) => {
          if (i.nom === item.commune) {
            new StaticService().chargerDemandeur({
              code: item.code,
              nom: item.nom,
              prenom: item.prenom,
              sexe: item.sexe,
              telephone: item.telephone,
              profession: item.profession,
              dateNaissance: item.dateNaissance,
              pere: item.pere,
              mere: item.mere,
              dateInscription: item.dateInscription,
              commune: item.commune,
              type,
              status,
            }).then(res => {
              if (res.data.success === true) {
                this.getDemandeur();
              }
            }, err => {
              console.error(err);
            });
          }
        })
      }

    })


  };


  create = ({file}) => {

    if (file) {
      this.readUploadFile(file);

      const propertiesArray = ['commune', 'departement'];
      this.state.json.forEach((item) => {
        // console.log(Object.keys(item).toString().toLowerCase());
        for (const prop of Object.keys(item)) {
          if (propertiesArray.includes(prop.toLowerCase())) {
            this.state.departements.forEach((i) => {
              if (i.nom === item.departement) {
                new StaticService().createCommune({
                  departement: i._id,
                  nom: item.commune
                }).then(res => {
                  if (res.data.success === true) {
                    this.getCommune();
                  }
                }, err => {
                  console.error(err);
                });
              }
            });

          }
        }
      })
    }
  }

  getRegion = () => {
    new StaticService().getRegions().then(res => {
      if (res.data.success === true) {
        this.setState({regions: res.data.data});
        console.log("OK", this.state.regions)
      }
    }, err => {
      console.error(err);
      this.setState({regions: []});
    });
  };

  getIdentifiant = (id) => {
    console.log("g", id);
    this.setState({...id});
    console.log("test", this.state.num);
  };

  getDepartement = () => {
    new StaticService().getDepartements().then(res => {
      console.log("departement", res.data);
      if (res.data.success === true) {
        this.setState({departements: res.data.data});
      }
    }, err => {
      console.error(err);
      this.setState({departements: []});
    });
  };

  setDeptCode = (code) => {
    console.log("code", code);
    this.setState({codeDept: code});
  };


  getCommune = () => {
    new StaticService().getCommunes().then(res => {
      console.log("commune", res.data);
      if (res.data.success === true) {
        this.setState({communes: res.data.data});
      }
    }, err => {
      console.error(err);
      this.setState({communes: []});
    });
  };

  getListe = () => {
    new StaticService().getListe().then(res => {
      console.log("liste", res.data);
      if (res.data.success === true) {
        this.setState({listes: res.data.data});
      }
    }, err => {
      console.error(err);
      this.setState({listes: []});
    });
  };

  getCandidat = () => {
    new StaticService().getCandidats().then(res => {
      console.log("candidats", res.data);
      if (res.data.success === true) {
        this.setState({candidats: res.data.data});
      }
    }, err => {
      console.error(err);
      this.setState({candidats: []});
    });
  };

  getDemandeur = () => {
    new StaticService().getDemandeur().then(res => {
      console.log("demandeurs", res.data);
      if (res.data.success === true) {
        this.setState({demandeurs: res.data.data});
      }
    }, err => {
      console.error(err);
      this.setState({demandeur: []});
    });
  };


  getUsers = () => {
    new StaticService().getUsers().then(res => {
      console.log("users", res.data);
      if (res.data.success === true) {
        this.setState({users: res.data.data});
      }
    }, err => {
      console.error(err);
      this.setState({users: []});
    });
  };


  deleteRegion = (id) => {
    new StaticService().deleteRegion(id).then(res => {
      if (res.data.success === true) {
        this.getRegion();
      }
    }, err => {
      console.error(err);
    });
  };

  deleteDepartement = (id) => {
    new StaticService().deleteDepartement(id).then(res => {
      if (res.data.success === true) {
        this.getDepartement();
      }
    }, err => {
      console.error(err);
    });
  };


  deleteCommune = (id) => {
    new StaticService().deleteCommune(id).then(res => {
      if (res.data.success === true) {
        this.getCommune();
      }
    }, err => {
      console.error(err);
    });
  };

  deleteCandiat = (id) => {
    new StaticService().deleteCandiat(id).then(res => {
      if (res.data.success === true) {
        this.getCandidat();
      }
    }, err => {
      console.error(err);
    });
  };

  deleteDemandeur = (id) => {
    new StaticService().deleteDemandeur(id).then(res => {
      if (res.data.success === true) {
        this.getDemandeur();
      }
    }, err => {
      console.error(err);
    });
  };

  deleteUser = (id) => {
    new StaticService().deleteUser(id).then(res => {
      if (res.data.success === true) {
        this.getUsers();
      }
    }, err => {
      console.error(err);
    });
  };


  signup = ({nom, prenom, email, phone, departement, userType, confirmedPassword, password}) => {
    return new StaticService().signup({
      nom,
      prenom,
      email,
      phone,
      departement,
      userType,
      confirmedPassword,
      password
    }).then(res => {
      if (res.data.success === true) {
        this.getUsers();
      }
    }, err => {
      console.error(err);
    });
    ;
  };

  signin = ({email, password}) => {
    return new StaticService().signin({email, password});
  };


  logout = (token) => {
    return new StaticService().logout(token);
  };


  updateRegion = ({id, nom}) => {
    new StaticService().updateRegion({id, nom}).then(res => {
      if (res.data.success === true) {
        this.getRegion();
      }
    }, err => {
      console.error(err);
    });
  };

  updateDepartement = ({id, region, nom}) => {
    console.log({id, region, nom});
    new StaticService().updateDepartement({id, region, nom}).then(res => {
      if (res.data.success === true) {
        this.getDepartement();
      }
    }, err => {
      console.error(err);
    });
  };


  updateCommune = ({id, departement, nom}) => {
    new StaticService().updateCommune({id, departement, nom}).then(res => {
      if (res.data.success === true) {
        this.getCommune();
      }
    }, err => {
      console.error(err);
    });
  };


  updateUser = ({id, nom, prenom, email, phone, departement, userType}) => {
    new StaticService().updateUser({id, nom, prenom, email, phone, departement, userType}).then(res => {
      if (res.data.success === true) {
        this.getUsers();
      }
    }, err => {
      console.error(err);
    });
  };

  updateCandidat = ({id, commune, prenom, profession, ordre, nom, dossier, sexe, date, statut, lieu}) => {
    console.log("d", id)
    new StaticService().updateCandidat({
      id,
      commune,
      prenom,
      profession,
      ordre,
      nom,
      dossier,
      sexe,
      date,
      statut,
      lieu
    }).then(res => {
      if (res.data.success === true) {
        this.getCandidat();
      }
    }, err => {
      console.error(err);
    });
  };

  onSelectFile = (events) => {
    events.preventDefault();
    const formData = new FormData();
    formData.append('file', events.target.files[0]);
    console.log(events.target.files[0], 'doc');
    new StaticService().uploadFiles(formData).then(res => {
      if (res.data.success === true) {
        this.setState({file: res.data.data});
      }
    }, err => {
      console.error(err);
    });
  }


  readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(e.target.files[0]);
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = read(data, {type: "array"});
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        let json = utils.sheet_to_json(worksheet);
        this.setState({json: json});
        console.log(json);
      };
    }
  };

  componentDidMount() {
    this.getRegion();
    this.getDepartement();
    this.getCommune();
    this.getCandidat();
    this.getUsers();
    this.getDemandeur();
    this.getListe();
  }


  render() {
    return (
      <Context.Provider
        value={{
          createRegion: this.createRegion,
          createDepartement: this.createDepartement,
          createCommune: this.createCommune,
          createCandidat: this.createCandidat,
          createListe: this.createListe,
          chargerDemandeur: this.createDemandeur,
          getRegion: this.getRegion,
          getDepartement: this.getDepartement,
          getCommune: this.getCommune,
          getCandidat: this.getCandidat,
          getUsers: this.getUsers,
          getDemandeur: this.getDemandeur,
          deleteRegion: this.deleteRegion,
          deleteDepartement: this.deleteDepartement,
          deleteCommune: this.deleteCommune,
          deleteCandidat: this.deleteCandiat,
          deleteDemandeur: this.deleteDemandeur,
          deleteUser: this.deleteUser,
          updateRegion: this.updateRegion,
          updateDepartement: this.updateDepartement,
          updateCommune: this.updateCommune,
          updateCandidat: this.updateCandidat,
          updateListe: this.updateListe,
          updateUser: this.updateUser,
          addUser: this.signup,
          login: this.signin,
          logout: this.logout,
          readUploadFile: this.readUploadFile,
          uploadFile: this.onSelectFile,
          state: this.state
        }}>
        {this.props.children}
      </Context.Provider>
    )
  }

}


export {Global, Context as GlobalContext}
