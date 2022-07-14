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
import useToken from "../../utils/UseToken";
import {useNavigate} from "react-router-dom";
import {CSmartTable} from "@coreui/react-pro";


const BureauVote = () => {
  const [validated, setValidated] = useState(false);
  const [nom, setNom] = useState('');
  const [departement, setDepartement] = useState('');
  const [college, setCollege] = useState('');
  const {token, setToken} = useToken();
  const context = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation()
    }
    setValidated(true)
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
      key: 'electeurs',
      label: 'electeurs',
      filter: false,
      sorter: false,
      _style: {width: '50%'},
    },
    {
      key: 'listes',
      label: 'listes',
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
                    <h3>Bureaux de Vote</h3>
                  </CCardHeader>
                  <CCardBody>
                    <CForm className="row g-3 needs-validation" validated={validated} onSubmit={handleSubmit}>

                      <CCol md={4} className="position-relative">
                        <CFormLabel htmlFor="validationTooltip04">Departement</CFormLabel>
                        <CFormSelect value={departement} onChange={e => setDepartement(e.target.value)}
                                     id="validationTooltip04" required>
                          <option value={token.user.departement}>
                            {context.state.communes.filter(item => item._id === token.user.departement)[0]?.nom}
                          </option>
                        </CFormSelect>
                        <CFormFeedback tooltip invalid>
                          Veuillez selectionner un Departement.
                        </CFormFeedback>
                      </CCol>

                      <CCol md={4} className="position-relative">
                        <CFormLabel htmlFor="validationTooltip04">College</CFormLabel>
                        <CFormSelect value={college} onChange={e => setCollege(e.target.value)} id="validationTooltip04"
                                     required>
                          <option disabled defaultValue="">
                            Choisissez...
                          </option>
                          <option value="CD">chef de departement</option>
                          <option value="CT">chef traditionnel</option>
                        </CFormSelect>
                        <CFormFeedback tooltip invalid>
                          Veuillez selectionner un college electoral.
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
                          />
                          <CFormFeedback invalid>Veuillez entrer le nom du bureau de vote.</CFormFeedback>
                        </CInputGroup>
                      </CCol>
                      <CCol xs={12}>
                        <CButton color="primary" type="submit" onClick={e=>context.a} >
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
                      items={context.state.communes}
                      itemsPerPageSelect
                      itemsPerPage={5}
                      pagination
                      scopedColumns={{
                        _id: (item) => (
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
                                  <CDropdownItem>Supprimer</CDropdownItem>
                                  <CDropdownItem>Modifier</CDropdownItem>
                                </CDropdownMenu>
                              </CDropdown>
                            </td>
                          )
                        },
                        electeurs: (item) => {
                          return (
                              <td className="py-2">
                                {/*{item.electeurs.length}*/}
                              </td>
                          )
                        },
                        listes: (item) => {
                          return (
                            <td className="py-2">
                              {/*{item.listes.length}*/}
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

export default BureauVote;
