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
  CModal, CModalBody, CModalContent, CModalDialog, CModalFooter, CModalHeader, CModalTitle, CBadge
} from '@coreui/react'
import {GlobalContext} from "../../services/Global";
import {CSmartTable} from "@coreui/react-pro";
import useToken from "../../utils/UseToken";
import {useLocation, useNavigate} from "react-router";
import CIcon from "@coreui/icons-react";
import {cilFolderOpen} from "@coreui/icons";
import Formatter from "../../utils/Formatter";


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


  const getBadge = (status) => {
    switch (status) {
      case 'Acceptee':
        return 'success'
      case 'Refusee':
        return 'danger'
      default:
        return 'warning'
    }
  }
  const handleSubmit = (event) => {
    let x = context.state.candidats.filter(i => i.owner === token.user._id);
    console.log(x, "d")
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
      key: 'statut',
      label: 'Statut',
      filter: false,
      sorter: true,
      _style: {width: '10%'},
    },
    {
      key: 'createdAt',
      label: 'Crée le',
      filter: false,
      sorter: false,
      _style: {width: '10%'},
    },
    {
      key: 'updatedAt',
      label: 'Modifié le',
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
                          'date': (item) => (
                            <td>{Formatter.date(item.date)}</td>
                          ),
                          'createdAt': (item) => (
                            <td>{Formatter.date(item.createdAt)}</td>
                          ),
                          'updatedAt': (item) => (
                            <td>{Formatter.date(item.updatedAt)}</td>
                          ),
                          'statut':
                            (item) => (
                              <td>
                                <CBadge color={getBadge(item.statut)}>
                                  {item.statut}
                                </CBadge>
                              </td>
                            ),
                          actions: (item) => {
                            return (
                              <td className="py-2">
                                {token.user.userType === 'CD' ?
                                  <CDropdown>
                                    <CDropdownToggle color="secondary">Actions</CDropdownToggle>
                                    <CDropdownMenu>
                                      <CDropdownItem
                                        onClick={() => {
                                          handleUpdate(item);
                                          setOpen(true);
                                        }}>Ouvrir
                                      </CDropdownItem>
                                    </CDropdownMenu>
                                  </CDropdown>
                                  :
                                  <CDropdown>
                                    <CDropdownToggle color="secondary">Actions</CDropdownToggle>
                                    <CDropdownMenu>
                                      <CDropdownItem
                                        onClick={() => {
                                          handleUpdate(item);
                                          setOpen(true);
                                        }}>Ouvrir
                                      </CDropdownItem>
                                      <CDropdownItem
                                        onClick={() => {
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
                                        }}>Accepter</CDropdownItem>
                                      <CDropdownItem
                                        onClick={() => {
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
                                        }}>Refuser</CDropdownItem>
                                    </CDropdownMenu>
                                  </CDropdown>
                                }
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
                      {token.user.userType === 'CD' && data?.observation ?
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
                        <CButton onClick={() => handleClose()}>Fermer</CButton>
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
