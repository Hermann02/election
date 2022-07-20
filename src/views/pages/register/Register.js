import React, {useContext, useState} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm, CFormFeedback,
  CFormInput, CFormLabel, CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {cilLockLocked, cilNotes, cilUser} from '@coreui/icons'
import {GlobalContext} from "../../../services/Global";
import {useNavigate} from "react-router-dom";

const Register = () => {
  const context = useContext(GlobalContext);
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUsertype] = useState('');
  const [region, setRegion] = useState('');
  const [departement, setDepartement] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const navigate = useNavigate();

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Inscription</h1>
                  <p className="text-medium-emphasis">Créer votre compte</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser}/>
                    </CInputGroupText>
                    <CFormInput placeholder="code" onChange={e => setCode(e.target.value)}/>
                  </CInputGroup>

                  <CInputGroup className="mb-3">

                    <CInputGroupText>
                      <CIcon icon={cilNotes}/>
                    </CInputGroupText>
                    <CFormSelect onChange={e => setRegion(e.target.value)} required>
                      <option>Region</option>
                      {context.state.regions.map(item => (
                        <option value={item._id}>
                          {item.nom}
                        </option>
                      ))
                      }
                    </CFormSelect>
                    <CFormFeedback tooltip invalid>
                      Veuillez selectionner une Region.
                    </CFormFeedback>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilNotes}/>
                    </CInputGroupText>
                    <CFormSelect onChange={e => setDepartement(e.target.value)} required>
                      <option>Departement</option>
                      {context.state.departements.filter(i => i.region === region).map(item => (
                        <option value={item._id}>
                          {item.nom}
                        </option>
                      ))
                      }
                    </CFormSelect>
                    <CFormFeedback tooltip invalid>
                      Veuillez selectionner un Departement.
                    </CFormFeedback>
                  </CInputGroup>


                  <CInputGroup className="mb-3">

                    <CInputGroupText>
                      <CIcon icon={cilNotes}/>
                    </CInputGroupText>
                    <CFormSelect onChange={e => setUsertype(e.target.value)}
                                 required>
                      <option disabled defaultValue="">
                        Choisissez...
                      </option>
                      <option>College</option>
                      <option value="CD">conseiller communal</option>
                      <option value="CT">chef traditionnel</option>
                    </CFormSelect>
                    <CFormFeedback tooltip invalid>
                      Veuillez selectionner un college electoral.
                    </CFormFeedback>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked}/>
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Mot de passe"
                      onChange={e => setPassword(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked}/>
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Confirmer mot de passe"
                      onChange={e => setConfirmedPassword(e.target.value)}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" onClick={(e) => {
                      context.signUp({code, userType, departement, password, confirmedPassword}).then(res => {
                        if (res.data.success) {
                          console.log(res.data);
                          navigate('/electeur/login', {replace: false});
                        }
                      }, err => {
                        console.error(err);
                      })
                    }}>S'inscricre</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
