import React, {useState} from 'react';
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
import {GlobalContext} from "../../../services/Global";
import {DocsExample} from "../../../components";
import {CSmartTable} from "@coreui/react-pro";


const Demandeur = () => {
  const [commune, setCommune] = useState('');
  const [departement, setDepartement] = useState('');
  const [region, setRegion] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState(false);
  const [file, setFile] = useState(null);
  const [id, setId] = useState(null);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
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
      key: 'telephone',
      label: 'telephone',
      filter: false,
      sorter: false,
      _style: {width: '50%'},
    },
    {
      key: 'commune',
      label: 'commune',
      filter: false,
      sorter: false,
      _style: {width: '50%'},
    },
    {
      key: 'dateNaissance',
      label: 'date de naissance',
      filter: false,
      sorter: false,
      _style: {width: '50%'},
    },
    {
      key: 'type',
      label: 'type',
      filter: false,
      sorter: false,
      _style: {width: '50%'},
    },
    {
      key: 'Status',
      label: 'Statut',
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
                    <h3>Demandeurs</h3>
                  </CCardHeader>
                  <CCardBody>
                    <CForm className="row g-3 needs-validation" validated={validated} onSubmit={handleSubmit}>

                      <CCol md={3} className="position-relative">
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
                      <CCol md={3} className="position-relative">
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
                          Veuillez selectionner le département.
                        </CFormFeedback>
                      </CCol>
                      <CCol md={3} className="position-relative">
                        <CFormLabel htmlFor="validationTooltip04">Type</CFormLabel>
                        <CFormSelect id="validationTooltip04" value={type}
                                     onChange={(e) => setType(e.target.value)} required>
                          <option disabled defaultValue="">
                            Choisissez...
                          </option>
                          <option>...</option>
                          <option value="CM">Conseiller municipal</option>
                          <option value="CT">Chef traditionnel</option>
                        </CFormSelect>
                        <CFormFeedback tooltip invalid>
                          Veuillez selectionner le Type d'electeur.
                        </CFormFeedback>
                      </CCol>

                      <CCol md={3}>
                        <div className="mb-3">
                          <CFormLabel htmlFor="formFileSm">Charger un fichier exel</CFormLabel>
                          <CFormInput type="file" size="sm" id="formFileSm" onChange={e=>setFile(e)} />
                        </div>
                      </CCol>
                      <CCol xs={12}>
                        <CButton color="primary" type="submit" onClick={()=>context.chargerDemandeur({file,commune,type,status})} >
                          Ajouter
                        </CButton>
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
                      items={context.state.demandeurs}
                      itemsPerPageSelect
                      itemsPerPage={5}
                      pagination
                      scopedColumns={{
                        _id: (item) => (
                          <td>{item._id + 1}</td>
                        ),
                        actions: (item) => {
                          return (
                            <td className="py-2">
                              <CDropdown>
                                <CDropdownToggle color="secondary">Actions</CDropdownToggle>
                                <CDropdownMenu>
                                  <CDropdownItem>Supprimer</CDropdownItem>
                                  <CDropdownItem>Modifier</CDropdownItem>
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
};

export default Demandeur;
