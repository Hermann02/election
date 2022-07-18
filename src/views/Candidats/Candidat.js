import React, {useContext, useEffect, useState} from 'react';
import {
  CButton,
  CCard,
  CCardBody, CCardFooter,
  CCardHeader,
  CCol, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle,
  CForm, CFormCheck,
  CFormFeedback,
  CFormInput,
  CFormLabel, CFormSelect,
  CInputGroup, CInputGroupText,
  CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow,
} from '@coreui/react'
import {GlobalContext} from "../../services/Global";
import {CSmartTable} from "@coreui/react-pro";
import useToken from "../../utils/UseToken";
import {useNavigate} from "react-router-dom";


const Candidat = () => {
  const [validated, setValidated] = useState(false);
  const [nom, setNom] = useState('');
  const [owner, setOwner] = useState('');
  const [prenom, setPrenom] = useState('');
  const [profession, setProfession] = useState('');
  const [sexe, setSexe] = useState('');
  const [commune, setCommune] = useState('');
  const [lieu, setLieu] = useState('');
  const [date, setDate] = useState('');
  const [dossier, setDossier] = useState('');
  const [ordre, setOrdre] = useState(0);
  const [departement, setDepartement] = useState('');
  const [urls, setUrls] = useState('');
  const [college, setCollege] = useState('');
  const [id, setId] = useState('');
  const [status, setStatus] = useState('');
  const [update, setUpdate] = useState(null);
  const context = useContext(GlobalContext);
  const {token, setToken} = useToken();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation()
    }
    setValidated(true)
  };
  const handleUpdate = (item) => {
    setUpdate(true);
    setNom(item.nom);
    setPrenom(item.prenom);
    setId(item.id);
    console.log(item)
    setStatus(item.status);
    setProfession(item.profession);
    setLieu(item.lieu);
    setDate(item.date);
    setOrdre(item.ordre);
    setCommune(item.commune);
    setSexe(item.sexe);
    setOwner(item.owner);
    setDossier(item.dossier);
  };


  const exist = context.state.listes.filter(i=>i.owner === token.user._id);

  console.log(token.user.id)
  useEffect(() => {
    if (exist.length === 0) {
      console.log(exist)
      navigate('/liste/creer',{replace:true});
    }
  }, [exist]);

  const columns = [
    {
      key: 'ordre',
      label: '#',
      filter: false,
      sorter: true,
      _style: {width: '1%'},
    },
    {
      key: 'nom',
      label: 'nom',
      filter: false,
      sorter: false,
      _style: {width: '50%'},
    },
    {
      key: 'prenom',
      label: 'prenom',
      filter: false,
      sorter: false,
      _style: {width: '50%'},
    },
    {
      key: 'sexe',
      label: 'sexe',
      filter: false,
      sorter: false,
      _style: {width: '50%'},
    },
    {
      key: 'date',
      label: 'Né le',
      filter: false,
      sorter: false,
      _style: {width: '50%'},
    },
    {
      key: 'lieu',
      label: 'A',
      filter: false,
      sorter: false,
      _style: {width: '50%'},
    },
    {
      key: 'profession',
      label: 'profession',
      filter: false,
      sorter: false,
      _style: {width: '50%'},
    },
    {
      key: 'actions',
      label: '',
      _style: {width: '50%'},
      filter: false,
      sorter: false,
    },
  ];

  return (
    <GlobalContext.Consumer>
      {
        context => {
          return (
            <CRow>
              <CCol>

                <CCard>
                  <CCardHeader>
                    <h3>Candidats</h3>
                  </CCardHeader>
                  <CCardBody>
                    <CForm className="row g-3 needs-validation" validated={validated} onSubmit={handleSubmit}>

                      <CRow>
                        <CCol md={4} className="position-relative">
                          <CFormLabel htmlFor="validationTooltip04">Departement</CFormLabel>
                          <CFormSelect id="validationTooltip04" value={departement}
                                       onChange={(e) => setDepartement(e.target.value)} required>
                            <option disabled defaultValue="">
                              Choisissez...
                            </option>
                            <option>...</option>
                            <option
                              value={token.user.departement}>{context.state.departements.filter(i => i._id === token.user.departement)[0]?.nom}</option>
                            {/*{context.state.departements.filter(i => i.region === region).map(item =>*/}
                            {/*  <option value={item._id}>{item.nom}</option>*/}
                            {/*)}*/}

                          </CFormSelect>
                          <CFormFeedback tooltip invalid>
                            Veuillez selectionner le département.
                          </CFormFeedback>
                        </CCol>
                        <CCol md={4} className="position-relative">
                          <CFormLabel htmlFor="validationTooltip04">Commune</CFormLabel>
                          <CFormSelect id="validationTooltip04" value={commune}
                                       onChange={(e) => setCommune(e.target.value)} required>
                            <option disabled defaultValue="">
                              Choisissez...
                            </option>
                            <option>...</option>
                            {context.state.communes.filter(i => i.departement === departement).map(item =>
                              <option value={item._id}>{item.nom}</option>
                            )}

                          </CFormSelect>
                          <CFormFeedback tooltip invalid>
                            Veuillez selectionner la commune du candidat.
                          </CFormFeedback>
                        </CCol>

                        <CCol md={4} className="position-relative">
                          <CFormLabel htmlFor="validationTooltip04">College</CFormLabel>
                          <CFormSelect value={college} onChange={e => setCollege(e.target.value)}
                                       id="validationTooltip04"
                                       required>
                            <option disabled defaultValue="">
                              Choisissez...
                            </option>
                            <option value="CD">chef de departement</option>
                            <option value="CT">chef traditionnel</option>
                          </CFormSelect>
                          <CFormFeedback tooltip invalid>
                            Veuillez selectionner un college electoral.
                          </CFormFeedback>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol md={4}>
                          <CFormLabel htmlFor="validationDefaultUsername">Nom</CFormLabel>
                          <CInputGroup className="has-validation">
                            <CFormInput
                              type="text"
                              id="validationDefaultUsername"
                              defaultValue=""
                              aria-describedby="inputGroupPrepend02"
                              required
                              value={nom}
                              onChange={(e) => setNom(e.target.value)}
                            />
                            <CFormFeedback invalid>Veuillez entrer le nom du candidat.</CFormFeedback>
                          </CInputGroup>
                        </CCol>

                        <CCol md={4}>
                          <CFormLabel htmlFor="validationDefaultUsername">Prenom</CFormLabel>
                          <CInputGroup className="has-validation">
                            <CFormInput
                              type="text"
                              id="validationDefaultUsername"
                              defaultValue=""
                              aria-describedby="inputGroupPrepend02"
                              required
                              value={prenom}
                              onChange={(e) => setPrenom(e.target.value)}
                            />
                            <CFormFeedback invalid>Veuillez entrer le prenom du candidat.</CFormFeedback>
                          </CInputGroup>
                        </CCol>

                        <CCol md={4} className="position-relative">
                          <CFormLabel htmlFor="validationTooltip04">Sexe</CFormLabel>
                          <CFormSelect id="validationTooltip04" value={sexe}
                                       onChange={(e) => setSexe(e.target.value)} required>
                            <option disabled defaultValue="">
                              Choisissez...
                            </option>
                            <option>...</option>
                            <option value="Feminin">Feminin</option>
                            <option value="Masculin">Masculin</option>

                          </CFormSelect>
                          <CFormFeedback tooltip invalid>
                            Veuillez selectionner le sexe du candidat.
                          </CFormFeedback>
                        </CCol>
                      </CRow>

                      <CRow>

                        <CCol md={4}>
                          <CFormLabel htmlFor="validationDefaultUsername">Date de naissance</CFormLabel>
                          <CInputGroup className="has-validation">
                            <CFormInput
                              type="date"
                              id="validationDefaultUsername"
                              defaultValue=""
                              aria-describedby="inputGroupPrepend02"
                              required
                              value={date}
                              onChange={(e) => setDate(e.target.value)}
                            />
                            <CFormFeedback invalid>Veuillez selectionner la date de naissance du
                              candidat.</CFormFeedback>
                          </CInputGroup>
                        </CCol>

                        <CCol md={4}>
                          <CFormLabel htmlFor="validationDefaultUsername">Lieu de naissance</CFormLabel>
                          <CInputGroup className="has-validation">
                            <CFormInput
                              type="text"
                              id="validationDefaultUsername"
                              defaultValue=""
                              aria-describedby="inputGroupPrepend02"
                              required
                              value={lieu}
                              onChange={(e) => setLieu(e.target.value)}
                            />
                            <CFormFeedback invalid>Veuillez entrer le lieu de naissance du candidat.</CFormFeedback>
                          </CInputGroup>
                        </CCol>

                        <CCol md={4}>
                          <CFormLabel htmlFor="validationDefaultUsername">Ordre sur la liste</CFormLabel>
                          <CInputGroup className="has-validation">
                            <CFormInput
                              type="number"
                              id="validationDefaultUsername"
                              defaultValue=""
                              aria-describedby="inputGroupPrepend02"
                              required
                              value={ordre}
                              onChange={(e) => setOrdre(e.target.value)}
                            />
                            <CFormFeedback invalid>Veuillez entrer l'ordre du candidat sur la liste.</CFormFeedback>
                          </CInputGroup>
                        </CCol>
                      </CRow>
                      <CCol md={4}>
                        <CFormLabel htmlFor="validationDefaultUsername">Profession</CFormLabel>
                        <CInputGroup className="has-validation">
                          <CFormInput
                            type="text"
                            id="validationDefaultUsername"
                            defaultValue=""
                            aria-describedby="inputGroupPrepend02"
                            required
                            value={profession}
                            onChange={(e) => setProfession(e.target.value)}
                          />
                          <CFormFeedback invalid>Veuillez entrer la profession du candidat.</CFormFeedback>
                        </CInputGroup>
                      </CCol>

                      <CCol md={4}>
                        <div className="mb-3">
                          <CFormLabel htmlFor="formFileSm">Dossier</CFormLabel>
                          <CFormInput type="file" size="sm" id="formFileSm"
                                      onChange={e => context.uploadFile(e)}/>
                        </div>
                      </CCol>
                      <CRow>


                      </CRow>

                      <CCol xs={4}>{
                        update ?
                          <CButton color="primary" type="submit" onClick={() => {
                            setUpdate(false);
                            context.updateCandidat({
                              commune,
                              prenom,
                              owner,
                              profession,
                              ordre,
                              nom,
                              date,
                              lieu,
                              sexe,
                              dossier,
                              status,
                              id
                            })
                          }}>
                            Modifier
                          </CButton>
                          :
                          <CButton color="primary" type="submit" onClick={() => context.createCandidat({
                            commune,
                            prenom,
                            profession,
                            ordre,
                            nom,
                            date,
                            lieu,
                            sexe,
                            dossier,
                            token: token.token
                          })}>
                            Ajouter
                          </CButton>
                      }
                      </CCol>
                    </CForm>
                  </CCardBody>

                  <CCardFooter>
                    <CSmartTable
                      activePage={1}
                      cleaner
                      clickableRows
                      columns={columns}
                      columnFilter
                      columnSorter
                      items={context.state.candidats.filter(i => i.owner === token.user._id)}
                      itemsPerPageSelect
                      itemsPerPage={5}
                      pagination
                      scopedColumns={{
                        numero: (item) => (
                          <td>
                            {item.ordre}
                          </td>
                        ),
                        actions: (item) => {
                          return (
                            <td className="py-2">
                              <CDropdown>
                                <CDropdownToggle color="secondary">Actions</CDropdownToggle>
                                <CDropdownMenu>
                                  <CDropdownItem
                                    onClick={() => context.deleteCandidat(item.id)}>Supprimer</CDropdownItem>
                                  <CDropdownItem
                                    onClick={() => handleUpdate(item)}>Modifier</CDropdownItem>
                                </CDropdownMenu>
                              </CDropdown>
                            </td>
                          )
                        },
                      }}
                      tableFilter
                      tableProps={{
                        striped: true,
                        hover: true,
                      }}
                    />
                  </CCardFooter>
                </CCard>
              </CCol>
            </CRow>
          )
        }
      }
    </GlobalContext.Consumer>
  )
}

export default Candidat;
