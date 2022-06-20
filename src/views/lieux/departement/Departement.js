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
  CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CPagination
} from '@coreui/react'
import {GlobalContext} from "../../../services/Global";
import {DocsExample} from "../../../components";
import {CSmartTable} from "@coreui/react-pro";


const Departement = () => {
  const [validated, setValidated] = useState(false);
  const [region, setRegion] = useState('');
  const [update, setUpdate] = useState(null);
  const [nom, setNom] = useState('');
  const [id, setId] = useState('');
  // const value = useContext(GlobalContext);
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
    setId(item._id);
    setRegion(item.region);
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
                    <h3>Departements</h3>
                  </CCardHeader>
                  <CCardBody>
                    <CForm className="row g-3 needs-validation" validated={validated} onSubmit={handleSubmit}>

                      <CCol md={6} className="position-relative">
                        <CFormLabel htmlFor="validationTooltip04">Region</CFormLabel>
                        <CFormSelect id="validationTooltip04" value={region}
                                     onChange={(e) => setRegion(e.target.value)} required>
                          <option disabled defaultValue="">
                            Choisissez...
                          </option>
                          {context.state.regions.map(region =>
                            <option value={region._id}>{region.nom}</option>
                          )}
                        </CFormSelect>
                        <CFormFeedback tooltip invalid>
                          Veuillez selectionner une region.
                        </CFormFeedback>
                      </CCol>
                      <CCol md={6}>
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
                        <CButton color="primary" type="submit" onClick={update ? () => {
                          context.updateDepartement({
                            region,
                            id,
                            nom
                          });
                          setUpdate(false);
                        } : () => context.createDepartement({region, nom})}>
                          {update ? 'Modifier' : 'Ajouter'}
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
                      items={context.state.departements}
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
                                    onClick={() => context.deleteDepartement(item._id)}>Supprimer</CDropdownItem>
                                  <CDropdownItem
                                    onClick={() => handleUpdate(item)}>Modifier</CDropdownItem>
                                </CDropdownMenu>
                              </CDropdown>
                            </td>
                          )
                        },
                        region: (item) => {
                          return (
                            <td className="py-2">
                              <td className="py-2">
                                {context.state.regions.filter(x => x._id === item.region)[0].nom}
                              </td>
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

export default Departement;
