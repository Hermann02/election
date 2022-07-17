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


const Verification = props => {
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


  const columns = [
    {
      key: 'ordre',
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
      _style: {width: '10%'},
    },
    {
      key: 'prenom',
      label: 'prenom',
      filter: false,
      sorter: false,
      _style: {width: '10%'},
    },
    {
      key: 'sexe',
      label: 'sexe',
      filter: false,
      sorter: false,
      _style: {width: '10%'},
    },
    {
      key: 'date',
      label: 'Né le',
      filter: false,
      sorter: false,
      _style: {width: '10%'},
    },
    {
      key: 'lieu',
      label: 'A',
      filter: false,
      sorter: false,
      _style: {width: '10%'},
    },
    {
      key: 'actions',
      label: '',
      _style: {width: '50%'},
      filter: false,
      sorter: false,
    },
  ];
  console.log(state, 'location');
  return (
    <GlobalContext.Consumer>
      {
        context => {
          return (
            <CRow>
              <CCol>

                <CCard>
                  <CCardHeader>
                    <h3>LISTE {state.nom} {context.state.departements.filter(i=> i._id === state.departement)[0]?.nom}</h3>
                  </CCardHeader>

                  <CCardBody>
                    <CSmartTable
                      activePage={1}
                      cleaner
                      clickableRows
                      columns={columns}
                      columnFilter
                      columnSorter
                      items={context.state.candidats.filter(i => i.owner === state.owner)}
                      itemsPerPageSelect
                      itemsPerPage={5}
                      pagination
                      scopedColumns={{
                        numero: (item) => (
                          <td>
                            {item.ordre}
                          </td>
                        ),
                        actions: (item) => {
                          return (
                            <td className="py-2">
                              <CIcon icon={cilFolderOpen} customClassName="nav-icon"
                                     onClick={() => navigate('/candidat/verification', {state: item})}/>
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

export default Verification;
