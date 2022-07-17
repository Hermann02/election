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


const Users = () => {
  const [validated, setValidated] = useState(false);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [departement, setDepartement] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [region, setRegion] = useState('');
  const [id, setId] = useState('');
  const [userType, setUserType] = useState('');
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
    setPrenom(item.prenom);
    setEmail(item.email);
    setPassword(item.password);
    setConfirmedPassword(item.password);
    setUserType(item.userType);
    setPhone(item.phone);
    setId(item.id);
    setRegion(context.state.departements.filter(i => i._id === item.departement)[0]?.region);
    setDepartement(item.departement);
  };
  const getRegion = (item) => {
    return context.state.departements.filter(i => i._id === item)[0].region;
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
      key: 'departement',
      label: 'departement',
      filter: false,
      sorter: false,
      _style: {width: '50%'},
    },
    {
      key: 'email',
      label: 'email',
      filter: false,
      sorter: false,
      _style: {width: '50%'},
    },
    {
      key: 'phone',
      label: 'telephone',
      filter: false,
      sorter: false,
      _style: {width: '50%'},
    },
    {
      key: 'userType',
      label: 'Type',
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
                    <h3>Utilisateurs</h3>
                  </CCardHeader>
                  <CCardBody>
                    <CForm className="row g-3 needs-validation" validated={validated} onSubmit={handleSubmit}>

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
                            Veuillez selectionner le département.
                          </CFormFeedback>
                        </CCol>

                        <CCol md={4}>
                          <CFormLabel htmlFor="validationDefaultUsername">Email</CFormLabel>
                          <CInputGroup className="has-validation">
                            <CFormInput
                              type="email"
                              id="validationDefaultEmail"
                              defaultValue=""
                              aria-describedby="inputGroupPrepend02"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            <CFormFeedback invalid>Veuillez entrer l'email .</CFormFeedback>
                          </CInputGroup>
                        </CCol>
                      </CRow>
                      <CRow>
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
                            <CFormFeedback invalid>Veuillez entrer le nom .</CFormFeedback>
                          </CInputGroup>
                        </CCol>

                        <CCol md={4}>
                          <CFormLabel htmlFor="validationDefaultUsername">Prenom</CFormLabel>
                          <CInputGroup className="has-validation">
                            <CFormInput
                              type="text"
                              id="validationDefaultUsername"
                              defaultValue=""
                              aria-describedby="inputGroupPrepend02"
                              required
                              value={prenom}
                              onChange={(e) => setPrenom(e.target.value)}
                            />
                            <CFormFeedback invalid>Veuillez entrer le prenom .</CFormFeedback>
                          </CInputGroup>
                        </CCol>

                        <CCol md={4}>
                          <CFormLabel htmlFor="validationDefaultUsername">Telephone</CFormLabel>
                          <CInputGroup className="has-validation">
                            <CFormInput
                              type="text"
                              id="validationDefaultUsername"
                              defaultValue=""
                              aria-describedby="inputGroupPrepend02"
                              required
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                            <CFormFeedback invalid>Veuillez entrer le numéro de télephone.</CFormFeedback>
                          </CInputGroup>
                        </CCol>
                      </CRow>

                      <CRow>

                        <CCol md={4}>
                          <CFormLabel htmlFor="validationDefaultUsername">Mot de passe</CFormLabel>
                          <CInputGroup className="has-validation">
                            <CFormInput
                              type="password"
                              id="validationDefaultUsername"
                              defaultValue=""
                              aria-describedby="inputGroupPrepend02"
                              required
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            <CFormFeedback invalid>Veuillez entrer le mot de passe.</CFormFeedback>
                          </CInputGroup>
                        </CCol>

                        <CCol md={4}>
                          <CFormLabel htmlFor="validationDefaultUsername">Confirmer le mot de passe</CFormLabel>
                          <CInputGroup className="has-validation">
                            <CFormInput
                              type="password"
                              id="validationDefaultUsername"
                              defaultValue=""
                              aria-describedby="inputGroupPrepend02"
                              required
                              onChange={(e) => setConfirmedPassword(e.target.value)}
                            />
                            <CFormFeedback invalid>Veuillez entrer à nouveau le mot de passe.</CFormFeedback>
                          </CInputGroup>
                        </CCol>

                        <CCol md={4}>
                          <CFormLabel htmlFor="validationTooltip04">Type</CFormLabel>
                          <CFormSelect id="validationTooltip04" value={userType}
                                       onChange={(e) => setUserType(e.target.value)} required>
                            <option disabled defaultValue="">
                              Choisissez...
                            </option>
                            <option>...</option>
                            <option value="CD">Chef de departement</option>
                            <option value="CE">Conseiller electoral</option>
                            <option value="MD">Mandataire</option>
                          </CFormSelect>
                          <CFormFeedback tooltip invalid>
                            Veuillez selectionner le type d'utilisateur.
                          </CFormFeedback>
                        </CCol>
                      </CRow>

                      <CCol xs={4}>{
                        update ?
                          <CButton color="primary" type="submit" onClick={() => {
                            setUpdate(false);
                            context.updateUser({
                              id,
                              nom,
                              prenom,
                              email,
                              phone,
                              departement,
                              userType,
                              confirmedPassword,
                              password
                            })
                          }}>
                            Modifier
                          </CButton>
                          :
                          <CButton color="primary" type="submit" onClick={() => context.addUser({
                            departement,
                            prenom,
                            confirmedPassword,
                            password,
                            nom,
                            email,
                            phone,
                            userType,
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
                      items={context.state.users.filter(i=> i.userType !== 'AD')}
                      itemsPerPageSelect
                      itemsPerPage={5}
                      pagination
                      scopedColumns={{
                        _id: (item) => (
                          <td>{item._id + 1}</td>
                        ),
                        'departement': (item) => (
                          <td>{context.state.departements.filter(i => i._id === item.departement)[0]?.nom}</td>
                        ),
                        'userType':
                          (item) => (
                            <td>
                              {item.userType === 'CE' ? 'conseiller electoral' : item.userType === 'CD' ? 'chef de departement' : 'mandataire'}
                            </td>
                          ),
                        actions: (item) => {
                          return (
                            <td className="py-2">
                              <CDropdown>
                                <CDropdownToggle color="secondary">Actions</CDropdownToggle>
                                <CDropdownMenu>
                                  <CDropdownItem onClick={() => context.deleteUser(item.id)}>Supprimer</CDropdownItem>
                                  <CDropdownItem onClick={() => handleUpdate(item)}>Modifier</CDropdownItem>
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

export default Users;
