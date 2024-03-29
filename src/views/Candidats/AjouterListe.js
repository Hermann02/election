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
import Formatter from "../../utils/Formatter";


const AjouterListe = () => {
  const [validated, setValidated] = useState(false);
  const [nom, setNom] = useState('');
  const [departement, setDepartement] = useState('');
  const [urls, setUrls] = useState('');
  const [collegeType, setcollegeType] = useState('');
  const [owner, setOwner] = useState('');
  const [id, setId] = useState('');
  const [candidats, setCandidats] = useState(0);
  const [taille, setTaille] = useState(true);
  const [status, setStatus] = useState(false);
  const [update, setUpdate] = useState(null);
  const context = useContext(GlobalContext);
  const {token, setToken} = useToken();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    let x = context.state.candidats.filter(i => i.owner === token.user._id).length;
    console.log(x, "d")
    setCandidats(x);
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
    setId(item.id);
    setOwner(item.owner);
    setDepartement(item.departement);
    setCandidats(item.candidats);
    console.log(item);
    setStatus(item.status);
    setcollegeType(item.collegeType);
  };

  const exist = context.state.listes.filter(i => i.owner === token.user._id);
  useEffect(() => {
    if (exist.length === 0) {
      console.log(exist,'exisy');
      setTaille(true)
    }else {
      console.log(exist,'exisy');
      setTaille(false)
    }
  }, [exist]);

  const columns = [
    {
      key: '_id',
      label: '#',
      filter: false,
      sorter: false,
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
      key: 'candidats',
      label: 'candidats',
      filter: false,
      sorter: false,
      _style: {width: '50%'},
    },
    {
      key: 'departement',
      label: 'departement',
      filter: false,
      sorter: false,
      _style: {width: '50%'},
    },
    {
      key: 'status',
      label: 'Status',
      filter: false,
      sorter: false,
      _style: {width: '50%'},
    },
    {
      key: 'createdAt',
      label: 'crée le',
      filter: false,
      sorter: false,
      _style: {width: '50%'},
    },
    {
      key: 'updatedAt',
      label: 'Dernière modification',
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
                    <h3>Créer la liste</h3>
                  </CCardHeader>
                  { taille ?
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

                              . </CFormSelect>
                            <CFormFeedback tooltip invalid>
                              Veuillez selectionner le département.
                            </CFormFeedback>
                          </CCol>

                          <CCol md={4} className="position-relative">
                            <CFormLabel htmlFor="validationTooltip04">college</CFormLabel>
                            <CFormSelect value={collegeType} onChange={e => setcollegeType(e.target.value)}
                                         id="validationTooltip04"
                                         required>
                              <option disabled defaultValue="">
                                Choisissez...
                              </option>
                              <option>...</option>
                              <option value="CD">chef de departement</option>
                              <option value="CT">chef traditionnel</option>
                            </CFormSelect>
                            <CFormFeedback tooltip invalid>
                              Veuillez selectionner un collegeType electoral.
                            </CFormFeedback>
                          </CCol>

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
                              <CFormFeedback invalid>Veuillez entrer le nom du AjouterListe.</CFormFeedback>
                            </CInputGroup>
                          </CCol>
                        </CRow>

                        <CCol xs={4}>{
                          update && context.state.listes.filter(i => i.owner === token.user._id).length === 0 ?
                            <CButton color="primary" type="submit" onClick={() => {
                              setUpdate(false);
                              context.updateListe({
                                departement,
                                owner,
                                nom,
                                status,
                                id,
                                candidats,
                                collegeType
                              })
                            }}>
                              Modifier
                            </CButton>
                            :
                            <CButton color="primary" type="submit" onClick={() => context.createListe({
                              departement, nom, candidats, collegeType,
                              token: token.token
                            })}>
                              Ajouter
                            </CButton>
                        }
                        </CCol>
                      </CForm>
                    </CCardBody>
                    :
                    <CCardFooter>
                      <CSmartTable
                        activePage={1}
                        cleaner
                        clickableRows
                        columns={columns}
                        columnFilter
                        columnSorter
                        items={context.state.listes.filter(i => i.owner === token.user._id)}
                        itemsPerPageSelect
                        itemsPerPage={5}
                        pagination
                        scopedColumns={{
                          '_id': (item) => (
                            <td>
                              {item._id + 1}
                            </td>
                          ),
                          'candidats': (item) => (
                            <td>
                              {context.state.candidats.filter(i=> i.owner === token.user._id).length}
                            </td>
                          ),
                          'updatedAt': (item) => (
                            <td>{Formatter.date(item.updatedAt)}</td>
                          ),

                          'createdAt': (item) => (
                            <td>{Formatter.date(item.createdAt)}</td>
                          ),
                          actions: (item) => {
                            return (
                              <td className="py-2">
                                <CDropdown>
                                  <CDropdownToggle color="secondary">Actions</CDropdownToggle>
                                  <CDropdownMenu>
                                    <CDropdownItem
                                      onClick={() => context.deleteListe(item.id)}>Supprimer</CDropdownItem>
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
                  }
                </CCard>
              </CCol>
            </CRow>
          )
        }
      }
    </GlobalContext.Consumer>
  )
}

export default AjouterListe;
