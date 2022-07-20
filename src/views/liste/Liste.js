import React, {useContext, useState} from 'react';
import {
  CBadge,
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
import CIcon from '@coreui/icons-react'
import {useNavigate} from "react-router-dom";
import {cilFolderOpen, cilOpentype, cilSpeedometer} from "@coreui/icons";
import Formatter from "../../utils/Formatter";


const Liste = () => {
  const [validated, setValidated] = useState(false);
  const [nom, setNom] = useState('');
  const [departement, setDepartement] = useState('');
  const [region, setRegion] = useState('');
  const [urls, setUrls] = useState('');
  const [collegeType, setcollegeType] = useState('');
  const [id, setId] = useState('');
  const context = useContext(GlobalContext);
  const {token, setToken} = useToken();
  const navigate = useNavigate();
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
    setUpdate(true);
    setNom(item.nom);
    setId(item.id);
    console.log(item);
    setStatus(item.status);
    setcollegeType(item.collegeType);
  };


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
      label: 'Nom',
      filter: false,
      sorter: false,
      _style: {width: '50%'},
    },
    {
      key: 'candidats',
      label: 'Candidats',
      filter: false,
      sorter: false,
      _style: {width: '50%'},
    },
    {
      key: 'createdAt',
      label: 'Crée le',
      filter: false,
      sorter: false,
      _style: {width: '50%'},
    },
    {
      key: 'updatedAt',
      label: 'Modifié le',
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
                    <h3>Listes de candidature</h3>
                  </CCardHeader>
                  <CCardBody>
                    <CRow>
                      {token.user.userType === 'CD' ?
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
                        :
                        <CRow>
                          <CCol md={4} className="position-relative">
                            <CFormLabel htmlFor="validationTooltip04">Region</CFormLabel>
                            <CFormSelect id="validationTooltip04" value={region}
                                         onChange={(e) => setRegion(e.target.value)}
                                         required>
                              <option disabled defaultValue="">
                                Choisissez...
                              </option>
                              <option>...</option>
                              {context.state.regions.map(item =>
                                <option value={item._id}>{item.nom}</option>
                              )}

                            </CFormSelect>
                            <CFormFeedback tooltip invalid>
                              Veuillez selectionner une region.
                            </CFormFeedback>
                          </CCol>
                          < CCol md={4} className="position-relative">
                            <CFormLabel htmlFor="validationTooltip04">Departement</CFormLabel>
                            <CFormSelect id="validationTooltip04" value={departement}
                                         onChange={(e) => setDepartement(e.target.value)} required>
                              <option disabled defaultValue="">
                                Choisissez...
                              </option>
                              <option>...</option>
                              {context.state.departements.filter(i => i.region === region).map(item =>
                                <option value={item._id}>{item.nom}</option>
                              )}

                            </CFormSelect>
                            <CFormFeedback tooltip invalid>
                              Veuillez selectionner une region.
                            </CFormFeedback>
                          </CCol>
                        </CRow>
                      }
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
                    </CRow>

                  </CCardBody>

                  <CCardFooter>
                    <CSmartTable
                      activePage={1}
                      cleaner
                      clickableRows
                      columns={columns}
                      columnFilter
                      columnSorter
                      items={context.state.listes.filter(i => i.departement === departement && i.collegeType === collegeType)}
                      itemsPerPageSelect
                      itemsPerPage={5}
                      pagination
                      scopedColumns={{
                        '_id': (item) => (
                          <td>
                            {item._id + 1}
                          </td>
                        ),
                        'createdAt': (item) => (
                          <td>
                            {Formatter.date(item.createdAt)}
                          </td>
                        ),
                        'updatedAt': (item) => (
                          <td>
                            {Formatter.date(item.updatedAt)}
                          </td>
                        ),

                        'status':
                          (item) => (
                            <td>
                              <CBadge color={getBadge(item.status)}>
                                {item.status}
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
                                  <CDropdownItem onClick={() => navigate('/liste/verification', {state: item})}>
                                    Ouvrir
                                  </CDropdownItem>
                                </CDropdownMenu>
                              </CDropdown>
                                :
                                <CDropdown>
                                <CDropdownToggle color="secondary">Actions</CDropdownToggle>
                                <CDropdownMenu>
                                  <CDropdownItem onClick={() => navigate('/liste/verification', {state: item})}>
                                    Ouvrir
                                  </CDropdownItem>
                                  <CDropdownItem
                                    onClick={() => {
                                      context.updateListe({
                                        candidats: data.candidats,
                                        nom: data.nom,
                                        status: "Acceptee",
                                        id: data.id,
                                        owner: data.owner,
                                        collegeType: data.collegeType,
                                        departement: data.departement,
                                      });
                                    }}>Accepter</CDropdownItem>
                                  <CDropdownItem
                                    onClick={() => {
                                      context.updateListe({
                                        status: "Rejetee",
                                        candidats: data.candidats,
                                        nom: data.nom,
                                        id: data.id,
                                        owner: data.owner,
                                        collegeType: data.collegeType,
                                        departement: data.departement,
                                      });
                                    }}>Refuser</CDropdownItem>
                                </CDropdownMenu>
                              </CDropdown>  }

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

export default Liste;
