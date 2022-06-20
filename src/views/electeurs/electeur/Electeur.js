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


const Electeur = () => {
  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
  }


  return (
    <GlobalContext.Consumer>
      {
        context => {
          return (
            <CRow>
              <CCol>

                <CCard>
                  <CCardHeader>
                    <h3>Electeurs</h3>
                  </CCardHeader>
                  <CCardBody>
                    <CForm className="row g-3 needs-validation" validated={validated} onSubmit={handleSubmit}>

                      <CCol md={3} className="position-relative">
                        <CFormLabel htmlFor="validationTooltip04">Region</CFormLabel>
                        <CFormSelect id="validationTooltip04" required>
                          <option disabled defaultValue="">
                            Choisissez...
                          </option>
                          <option>...</option>
                        </CFormSelect>
                        <CFormFeedback tooltip invalid>
                          Veuillez selectionner une region.
                        </CFormFeedback>
                      </CCol>

                      <CCol md={3} className="position-relative">
                        <CFormLabel htmlFor="validationTooltip04">Departement</CFormLabel>
                        <CFormSelect id="validationTooltip04" required>
                          <option disabled defaultValue="">
                            Choisissez...
                          </option>
                          <option>...</option>
                        </CFormSelect>
                        <CFormFeedback tooltip invalid>
                          Veuillez selectionner un Departeur.
                        </CFormFeedback>
                      </CCol>

                      <CCol md={3} className="position-relative">
                        <CFormLabel htmlFor="validationTooltip04">Commune</CFormLabel>
                        <CFormSelect id="validationTooltip04" required>
                          <option disabled defaultValue="">
                            Choisissez...
                          </option>
                          <option>...</option>
                        </CFormSelect>
                        <CFormFeedback tooltip invalid>
                          Veuillez selectionner une commune.
                        </CFormFeedback>
                      </CCol>

                      <CCol md={3} className="position-relative">
                        <CFormLabel htmlFor="validationTooltip04">College</CFormLabel>
                        <CFormSelect id="validationTooltip04" required>
                          <option disabled defaultValue="">
                            Choisissez...
                          </option>
                          <option>...</option>
                        </CFormSelect>
                        <CFormFeedback tooltip invalid>
                          Veuillez selectionner un college electoral.
                        </CFormFeedback>
                      </CCol>

                    </CForm>
                  </CCardBody>
                  <CCardFooter>
                    <CTable>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell scope="col">#</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Nom</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Prenom</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Sexe</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Profession</CTableHeaderCell>
                          <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        <CTableRow>
                          <CTableHeaderCell scope="row">1</CTableHeaderCell>
                          <CTableDataCell>Mark</CTableDataCell>
                          <CTableDataCell>Mark</CTableDataCell>
                          <CTableDataCell>Mark</CTableDataCell>
                          <CTableDataCell>Mark</CTableDataCell>
                          <CTableDataCell>Mark</CTableDataCell>
                          <CTableDataCell>
                            <CDropdown>
                              <CDropdownToggle color="secondary">Dropdown button</CDropdownToggle>
                              <CDropdownMenu>
                                <CDropdownItem href="#">Action</CDropdownItem>
                                <CDropdownItem href="#">Another action</CDropdownItem>
                                <CDropdownItem href="#">Something else here</CDropdownItem>
                              </CDropdownMenu>
                            </CDropdown>
                          </CTableDataCell>
                        </CTableRow>
                      </CTableBody>
                    </CTable>
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

export default Electeur;
