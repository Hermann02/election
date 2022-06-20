import React from "react";
import StaticService from "./StaticService";
import {read, utils} from 'xlsx';

const Context = React.createContext();

class Global extends React.Component {

  state = {
    regions: [],
    departements: [],
    communes: [],
    json: [],
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


  readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = read(data, {type: "array"});
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        let json = utils.sheet_to_json(worksheet);
        this.setState({json: json});
      };
      console.log(this.state.json);
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  componentDidMount() {
    this.getRegion();
    this.getDepartement();
    this.getCommune();
  }


  render() {
    return (
      <Context.Provider
        value={{
          createRegion: this.createRegion,
          createDepartement: this.createDepartement,
          createCommune: this.createCommune,
          getRegion: this.getRegion,
          getDepartement: this.getDepartement,
          getCommune: this.getCommune,
          deleteRegion: this.deleteRegion,
          deleteDepartement: this.deleteDepartement,
          deleteCommune: this.deleteCommune,
          updateRegion: this.updateRegion,
          updateDepartement: this.updateDepartement,
          updateCommune: this.updateCommune,
          state: this.state
        }}>
        {this.props.children}
      </Context.Provider>
    )
  }

}


export {Global, Context as GlobalContext}
