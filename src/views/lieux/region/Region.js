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
import {GlobalContext} from "../../../services/Global";
import {DocsExample} from "../../../components";
import {CSmartTable} from "@coreui/react-pro";


const Region = () => {
  const [validated, setValidated] = useState(false);
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
    setNom(item.nom);
    setId(item.id);
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
                    <h3>Regions</h3>
                  </CCardHeader>
                  <CCardBody>
                    <CForm className="row g-3 needs-validation" validated={validated} onSubmit={handleSubmit}>
                      <CCol md={12}>
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
                          <CFormFeedback invalid>Veuillez entrer le nom de la région.</CFormFeedback>
                        </CInputGroup>
                      </CCol>
                      <CCol xs={12}>{
                        update ?
                          <CButton color="primary" type="submit" onClick={() => {
                            setUpdate(false);
                            context.updateRegion({nom, id})
                          }}>
                            Modifier
                          </CButton>
                          :
                          <CButton color="primary" type="submit" onClick={() => context.createRegion({nom})}>
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
                      items={context.state.regions}
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
                                    onClick={() => context.deleteRegion(item.id)}>Supprimer</CDropdownItem>
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

export default Region;
