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
  CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow,
} from '@coreui/react'
import {GlobalContext} from "../../services/Global";
import {CSmartTable} from "@coreui/react-pro";
import useToken from "../../utils/UseToken";


const AjouterListe = () => {
  const [validated, setValidated] = useState(false);
  const [nom, setNom] = useState('');
  const [departement, setDepartement] = useState('');
  const [urls, setUrls] = useState('');
  const [collegeType, setcollegeType] = useState('');
  const [id, setId] = useState('');
  const [candidats, setCandidats] = useState([]);
  const [status, setStatus] = useState(false);
  const [update, setUpdate] = useState(null);
  const context = useContext(GlobalContext);
  const {token, setToken} = useToken();
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
                        update ?
                          <CButton color="primary" type="submit" onClick={() => {
                            setUpdate(false);
                            context.updateListe({
                              departement,
                              nom,
                              status,
                              id
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
                            {item.candidats.length}
                          </td>
                        ),
                        actions: (item) => {
                          return (
                            <td className="py-2">
                              <CDropdown>
                                <CDropdownToggle color="secondary">Actions</CDropdownToggle>
                                <CDropdownMenu>
                                  <CDropdownItem>Supprimer</CDropdownItem>
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

export default AjouterListe;
