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
import {useLocation, useNavigate} from "react-router";
import CIcon from "@coreui/icons-react";
import {cilFolderOpen} from "@coreui/icons";


const CandidatVerification = props => {
  const [validated, setValidated] = useState(false);
  const [nom, setNom] = useState('');
  const [owner, setOwner] = useState('');
  const [departement, setDepartement] = useState('');
  const [region, setRegion] = useState('');
  const [urls, setUrls] = useState('');
  const [collegeType, setcollegeType] = useState('');
  const [id, setId] = useState('');
  const context = useContext(GlobalContext);
  const {token, setToken} = useToken();
  const navigate = useNavigate();
  const {state} = useLocation();
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

  return (
    <GlobalContext.Consumer>
      {
        context => {
          return (
            <CRow>
              <CCol>

                <CCard>

                  <CCardBody>
                    <CRow>
                    <CCol>
                      <p>Nom : {state.nom}</p>
                      <p>Prenom : {state.prenom}</p>
                      <p>Sexe : {state.sexe}</p>
                      <p>Profession : {state.profession}</p>
                    </CCol>
                    <CCol>
                      <p>Commune : {context.state.communes.filter(i=>i._id === state.commune)[0]?.nom}</p>
                      <p>Date de naissance : {state.date}</p>
                      <p>Lieu : {state.lieu}</p>
                      <p>Ordre sur la liste : {state.ordre}</p>
                    </CCol>

                    </CRow>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          )
        }
      }
    </GlobalContext.Consumer>
  )
}

export default CandidatVerification;
