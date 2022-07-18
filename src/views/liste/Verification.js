import React, {useContext, useState} from 'react';
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
  CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CFormTextarea,
  CModal, CModalBody, CModalContent, CModalDialog, CModalFooter, CModalHeader, CModalTitle
} from '@coreui/react'
import {GlobalContext} from "../../services/Global";
import {CSmartTable} from "@coreui/react-pro";
import useToken from "../../utils/UseToken";
import {useLocation, useNavigate} from "react-router";
import CIcon from "@coreui/icons-react";
import {cilFolderOpen} from "@coreui/icons";


const Verification = props => {
  const [validated, setValidated] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [data, setData] = useState(null);
  const [nom, setNom] = useState('');
  const [status, setStatus] = useState('');
  const [observation, setObservation] = useState('');
  const [owner, setOwner] = useState('');
  const [departement, setDepartement] = useState('');
  const [region, setRegion] = useState('');
  const [urls, setUrls] = useState('');
  const [collegeType, setcollegeType] = useState('');
  const [id, setId] = useState('');
  const context = useContext(GlobalContext);
  const {token, setToken} = useToken();
  const navigate = useNavigate();
  const {state} = useLocation();

  const handleSubmit = (event) => {
    let x = context.state.candidats.filter(i => i.owner === token.user._id);
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
    setData(item);
    setObservation(item.observation)
    setNom(item.nom);
    setId(item.id);
    console.log(item);
    setcollegeType(item.collegeType);
  };


  const columns = [
    {
      key: 'ordre',
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
      _style: {width: '10%'},
    },
    {
      key: 'prenom',
      label: 'prenom',
      filter: false,
      sorter: false,
      _style: {width: '10%'},
    },
    {
      key: 'sexe',
      label: 'sexe',
      filter: false,
      sorter: false,
      _style: {width: '10%'},
    },
    {
      key: 'date',
      label: 'Né le',
      filter: false,
      sorter: false,
      _style: {width: '10%'},
    },
    {
      key: 'lieu',
      label: 'A',
      filter: false,
      sorter: false,
      _style: {width: '10%'},
    },
    {
      key: 'actions',
      label: '',
      _style: {width: '50%'},
      filter: false,
      sorter: false,
    },
  ];
  console.log(state, 'location');
  return (
    <GlobalContext.Consumer>
      {
        context => {
          return (
            <>
              <CRow>
                <CCol>

                  <CCard>
                    <CCardHeader>
                      <h3>LISTE {state.nom} {context.state.departements.filter(i => i._id === state.departement)[0]?.nom}</h3>
                    </CCardHeader>
                    <CCardBody>
                      <CSmartTable
                        activePage={1}
                        cleaner
                        clickableRows
                        columns={columns}
                        columnFilter
                        columnSorter
                        items={context.state.candidats.filter(i => i.owner === state.owner)}
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
                                <CIcon icon={cilFolderOpen} customClassName=" modal-toggle nav-icon"
                                       onClick={() => {
                                         handleUpdate(item);
                                         setOpen(true);
                                       }}/>
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

                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>

              <CModal
                visible={open}
                onClose={handleClose}
              >
                <CModalDialog>
                  <CModalContent>
                    <CModalHeader>
                      <CModalTitle>
                        Candidat
                      </CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <CRow>
                        <CCol>
                          <p>Nom : {data?.nom}</p>
                          <p>Prenom : {data?.prenom}</p>
                          <p>Sexe : {data?.sexe}</p>
                          <p>Profession : {data?.profession}</p>
                        </CCol>
                        <CCol>
                          <p>Commune : {context.state.communes.filter(i => i._id === data?.commune)[0]?.nom}</p>
                          <p>Date de naissance : {data?.date}</p>
                          <p>Lieu : {data?.lieu}</p>
                          <p>Ordre sur la liste : {data?.ordre}</p>
                        </CCol>
                        {token.user.userType === 'CD' ?
                          <CCol>
                            <CCol md={4}>
                              <CFormLabel htmlFor="validationDefaultUsername">Observation</CFormLabel>
                              <CInputGroup className="has-validation">
                                <CFormTextarea
                                  type="text"
                                  id="validationDefaultUsername"
                                  defaultValue=""
                                  aria-describedby="inputGroupPrepend02"
                                  required
                                  value={observation}
                                  onChange={(e) => setObservation(e.target.value)}
                                />
                                <CFormFeedback invalid>Veuillez emettre une observation.</CFormFeedback>
                              </CInputGroup>
                            </CCol>

                          </CCol>
                          :
                          <CCol>
                            <p>Observation : {data?.observation}</p>
                          </CCol>
                        }
                      </CRow>

                    </CModalBody>
                    <CModalFooter>
                      {token.user.userType === 'CD' && data.observation?
                        <CButton color="primary" type="submit" onClick={() => {
                          context.updateCandidat({
                            commune: data.commune,
                            prenom: data.prenom,
                            profession: data.profession,
                            ordre: data.ordre,
                            nom: data.nom,
                            date: data.date,
                            lieu: data.lieu,
                            sexe: data.sexe,
                            dossier: data.dossier,
                            status: data.status,
                            id: data.id,
                            owner: data.owner,
                            observation
                          });
                          handleClose()
                        }
                        }>
                          Valider
                        </CButton>
                        :
                        <CRow>
                          <CCol>
                            <CButton color="success" type="submit" onClick={() => {
                              context.updateCandidat({
                                commune: data.commune,
                                prenom: data.prenom,
                                profession: data.profession,
                                ordre: data.ordre,
                                nom: data.nom,
                                date: data.date,
                                lieu: data.lieu,
                                sexe: data.sexe,
                                dossier: data.dossier,
                                status: "Acceptee",
                                id: data.id,
                                owner: data.owner,
                                observation: data.observation
                              });
                              handleClose()
                            }
                            }>
                              Accepter
                            </CButton>
                          </CCol>
                          <CCol>
                            <CButton color="danger" type="submit" onClick={() => {
                              context.updateCandidat({
                                commune: data.commune,
                                prenom: data.prenom,
                                profession: data.profession,
                                ordre: data.ordre,
                                nom: data.nom,
                                date: data.date,
                                lieu: data.lieu,
                                sexe: data.sexe,
                                dossier: data.dossier,
                                status: "Rejetee",
                                id: data.id,
                                owner: data.owner,
                                observation: data.observation
                              });
                              handleClose()
                            }
                            }>
                              Rejeter
                            </CButton>
                          </CCol>
                        </CRow>
                      }
                    </CModalFooter>
                  </CModalContent>
                </CModalDialog>
              </CModal>
            </>
          )
        }
      }
    </GlobalContext.Consumer>
  )
}

export default Verification;
