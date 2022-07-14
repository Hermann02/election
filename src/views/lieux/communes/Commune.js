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
  CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow
} from '@coreui/react'
import {GlobalContext} from "../../../services/Global";
import {CSmartTable} from '@coreui/react-pro';
import {DocsExample} from "../../../components";
import {log10} from "chart.js/helpers";


const Commune = () => {
  const [validated, setValidated] = useState(false);
  const [departement, setDepartement] = useState('');
  const [region, setRegion] = useState('');
  const [nom, setNom] = useState('');
  const [id, setId] = useState('');
  const [update, setUpdate] = useState(null);
  const context = useContext(GlobalContext);
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
    console.log(item);
    setNom(item.nom);
    setId(item.id);
    setRegion(context.state.departements.filter(i => i._id === item.departement)[0].region);
    setDepartement(item.departement);
  };
  const getRegion = (item) => {
    return context.state.departements.filter(i => i._id === item)[0].region;
  };
  const columns = [
    {
      key: 'numero',
      label: '#',
      filter: false,
      sorter: false,
      _style: {width: '1%'},
    },
    {
      key: 'nom',
      label: 'nom',
      filter: false,
      _style: {width: '30%'},
    },
    {
      key: 'departement',
      label: 'departement',
      filter: false,
      _style: {width: '30%'},
    },
    {
      key: 'region',
      label: 'region',
      filter: false,
      sorter: false,
      _style: {width: '30%'},
    },
    {
      key: 'actions',
      label: '',
      _style: {width: '10%'},
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
                    <h3>Communes</h3>
                  </CCardHeader>
                  <CCardBody>
                    <CForm className="row g-3 needs-validation" validated={validated} onSubmit={handleSubmit}>

                      <CCol md={4} className="position-relative">
                        <CFormLabel htmlFor="validationTooltip04">Region</CFormLabel>
                        <CFormSelect id="validationTooltip04" value={region} onChange={(e) => setRegion(e.target.value)}
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
                      <CCol md={4} className="position-relative">
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
                          <CFormFeedback invalid>Veuillez entrer le nom du département.</CFormFeedback>
                        </CInputGroup>
                      </CCol>
                      <CCol xs={12}>
                        {update ?
                          <CButton color="primary" type="submit"
                                   onClick={() => {
                                     setUpdate(false);
                                     context.updateCommune({departement, id, nom})
                                   }}>
                            Modifier
                          </CButton>
                          :
                          <CButton color="primary" type="submit"
                                   onClick={() => context.createCommune({departement, nom})}>
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
                      items={context.state.communes}
                      itemsPerPageSelect
                      itemsPerPage={5}
                      pagination
                      scopedColumns={{
                        numero: (item) => (
                          <td>
                            {item._id + 1}
                          </td>
                        ),
                        actions: (item) => {
                          return (
                            <td className="py-2">
                              <CDropdown>
                                <CDropdownToggle color="secondary">Actions</CDropdownToggle>
                                <CDropdownMenu>
                                  <CDropdownItem
                                    onClick={() => context.deleteCommune(item.id)}>Supprimer</CDropdownItem>
                                  <CDropdownItem
                                    onClick={() => handleUpdate(item)}>Modifier</CDropdownItem>
                                </CDropdownMenu>
                              </CDropdown>
                            </td>
                          )
                        },
                        departement: (item) => {
                          return (
                            <td className="py-2">
                              <td className="py-2">
                                {context.state.departements.filter(x => x._id === item.departement)[0].nom}
                              </td>
                            </td>
                          )
                        },
                        region: (item) => {
                          return (
                            <td className="py-2">
                              {context.state.regions.filter(x => x._id === getRegion(item.departement))[0].nom}
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

export default Commune;
