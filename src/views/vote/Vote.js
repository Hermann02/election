import React, {useContext, useEffect, useState} from 'react'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CRow,
  CFormInput, CFormLabel, CFormSelect,
  CInputGroup,
  CInputGroupText,
  CButton, CForm, CFormFeedback, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem, CCardText,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import CardVote from "./VoteCard";
import useToken from "../../utils/UseToken";
import {useNavigate} from "react-router";
import {GlobalContext} from "../../services/Global";
import {CSmartTable} from "@coreui/react-pro";


const Vote = () => {
  const [clic, setClic] = useState(false);
  const token = useToken().token
  const [choix, setChoix] = useState('');
  const [bureau, setBureau] = useState('');
  const [electeur, setElecteur] = useState('');

  const navigate = useNavigate();
  const context = useContext(GlobalContext);

  useEffect(() => {
    console.log("token", token)
    if (token.token === undefined || token.token === null) {
      history.push('/electeur/login')
    }
  }, [token.token]);

  return (
    <GlobalContext.Consumer>
      {
        context => {
          return (
            <>
              <div className="c-app c-default-layout">
                <div className="c-wrapper">
                  <div className="c-body">
                    <CCard>
                      <CCardHeader>{token.user.userType === 'CM' ? 'COLLEGE DES CHEFS DE DEPARTEMENTS' : 'COLLEGE DES REPRESENTANT DU COMMANDEMENT TRADITIONNEL'} </CCardHeader>
                      <CCardBody>
                        <CRow>
                          <CCol md={4} className="position-relative">
                            {context.state.listes.filter(i => i.bureau === token.user.bureau).map((elec) => (
                              <CCard style={{borderRadius: 20}}>
                                <CCardBody style={{display: "flex", flexDirection: "row"}}>
                                  <CCol md={4} className="position-relative">
                                    {context.state.candidats.filter(i => i.owner === elec.owner).map((i) => {
                                      return (
                                        <CCol>
                                          <CCardText
                                            style={{textAlign: "center"}}>{i.ordre}. {i.nom} {i.prenom}</CCardText>
                                        </CCol>
                                      )
                                    })}

                                  </CCol>
                                </CCardBody>
                              </CCard>
                            ))
                            }
                          </CCol>
                        </CRow>
                      </CCardBody>

                      <CCardFooter>
                        <CRow>
                          <CCol x="12" md="3">
                            <CInputGroup row>
                              <CCol md="6">
                                <CFormLabel htmlFor="hf-mere">choississez une liste</CFormLabel>
                              </CCol>
                              <CCol xs="6" md="6">
                                <CFormSelect custom name="ccyear" id="ccyear"
                                             onChange={(event) => setChoix(event.target.value)}>
                                  <option value={"N/A"}>Bulletin null</option>
                                  {context.state.listes.filter(i => i.bureau === token.user.bureau).map(e => <option
                                    value={e._id}> LISTE {e.nom}</option>
                                  )}
                                </CFormSelect>
                              </CCol>
                            </CInputGroup>
                          </CCol>

                          <CInputGroup>
                            <CCol md="12">
                              <CButton type="submit" size="sm" color="success"
                                       onClick={() => context.vote({
                                         choix,
                                         bureau: token.user.bureau,
                                         electeur: token.user._id
                                       })}> Voter</CButton>
                            </CCol>
                          </CInputGroup>
                        </CRow>
                      </CCardFooter>
                    </CCard>
                  </div>
                </div>
              </div>
            </>
          )
        }
      }
    </GlobalContext.Consumer>
  )

}


export default Vote;

