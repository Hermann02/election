import React, {useState, useEffect} from 'react'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CCol,
  CRow, CFormSelect,
} from '@coreui/react'

import CIcon from "@coreui/icons-react";
import {GlobalContext} from "../../services/Global";


const Statistiques = (props) => {
  const history = useHistory()

  return (
    <GlobalContext.Consumer>
      {context => {
        // const handleFilterCandidat = (event)=>{
        //     if(event === 0){
        //         return context.state.candidat.map(candidat).filter();
        //     }
        // };

        return (
          <>
            <CRow>
              <CCol>
                <CCard>
                  <CCardHeader>
                    <CRow>
                      <CCol xs="4">
                        <CFormGroup>
                          <CLabel htmlFor="ccyear">Région</CLabel>
                          <CSelect custom name="ccyear" id="ccyear"
                                   onChange={(event) => setRegion(event.target.value)}>
                            <option></option>
                            {context.state.regions.map(region =>
                              <option value={region._id}>{region.nom}</option>
                            )}
                          </CSelect>
                        </CFormGroup>
                      </CCol>

                      <CCol xs="4">
                        <CFormGroup>
                          <CLabel htmlFor="ccyear">Département</CLabel>
                          <CSelect custom name="ccyear" id="ccyear"
                                   onChange={(event) => setDepartement(event.target.value)}>
                            <option></option>
                            {context.state.departements.map(dept =>
                              <option value={dept._id}>{dept.nom}</option>
                            )}
                          </CSelect>
                        </CFormGroup>
                      </CCol>

                      <CCol xs="4">
                        <CFormGroup>
                          <CFormLa htmlFor="ccyear">Collège Electoral</CFormLa>
                          <CFormSelect custom name="ccyear" id="ccyear" onChange={(event) => {
                            context.getElecteurFilter(event.target.value)
                          }}>
                            <option></option>
                            {context.state.typeElection.map(e =>
                              <option value={e.code}>{e.nom}</option>
                            )}
                          </CFormSelect>
                        </CFormGroup>
                      </CCol>


                      {/*<CCol xs="4">*/}
                      {/*<CFormGroup>*/}
                      {/*<CLabel htmlFor="ccyear">Année</CLabel>*/}
                      {/*<CSelect custom name="ccyear" id="ccyear">*/}
                      {/*<option></option>*/}
                      {/*{context.state.annee.map(e =>*/}
                      {/*<option value={e._id}>{e.annee}</option>*/}
                      {/*)}*/}
                      {/*</CSelect>*/}
                      {/*</CFormGroup>*/}
                      {/*</CCol>*/}


                    </CRow>
                  </CCardHeader>

                  <CCardBody>
                    <table className="table table-striped table-hover">
                      <thead>

                      <tr>
                        <th>Commune</th>
                        <th>Nombre d'inscrits</th>
                        <th>Nombre de votants</th>
                        <th>Taux de participation</th>
                        <th>Bulletin nuls</th>
                        <th>Suffrages Valablement Exprimés</th>
                        {context.state.stat[0]?.tab.map(s => (
                          <th>liste {s.liste}</th>
                        ))}
                        {context.state.stat[0]?.tab.map(s => (
                          <th>%{s.liste}</th>
                        ))}
                      </tr>

                      </thead>
                      <tbody>
                      {
                        context.state.stat.map(st => (
                          <tr>
                            <td>{st.commune}</td>
                            <td>{st.totalInscrit}</td>
                            <td>{st.votants}</td>
                            <td>{parseFloat(st.tauxParticipation).toFixed(2)}%</td>
                            <td>{st.nuls}</td>
                            <td>{st.sve}</td>
                            {st.tab.map(s => (
                              <td>{s.voteparliste}</td>
                            ))}
                            {st.tab.map(s => (
                              <td>{parseFloat(s.pourcentageliste).toFixed(2)}%</td>
                            ))}
                          </tr>
                        ))
                      }
                      </tbody>
                      <tfoot >
                      {

                        <tr>
                          <td><b>{context.state.statistique?.total}</b></td>
                          <td><b>{context.state.statistique?.totalInscrit}</b></td>
                          <td><b>{context.state.statistique?.totalVotants}</b></td>
                          <td><b>{parseFloat(context.state.statistique?.totalParticipation).toFixed(2)}%</b></td>
                          <td><b>{context.state.statistique?.totalNuls}</b></td>
                          <td><b>{context.state.statistique?.totalSVE}</b></td>
                          {context.state.statistique?.statistiques.map(s =>(
                            <td><b>{s.totalListe}</b></td>
                          ))}
                          {context.state.statistique?.statistiques.map(s =>(
                            <td><b>{parseFloat(s.totalPourcentage).toFixed(2)}%</b></td>
                          ))}

                        </tr>

                      }
                      </tfoot>
                    </table>
                  </CCardBody>
                  <CCardFooter>
                    <CRow>
                      {/*<CCol x="12" md="3">*/}
                      {/*<CFormGroup row>*/}
                      {/*<CCol md="6">*/}
                      {/*<CLabel htmlFor="hf-mere" >Nombre d'electeurs</CLabel>*/}
                      {/*</CCol>*/}
                      {/*<CCol xs="6" md="6">*/}
                      {/*<CInput type="text" id="hf-ordre" name="hf-email" placeholder="" value={context.state.totalElecteur}/>*/}
                      {/*</CCol>*/}
                      {/*</CFormGroup>*/}
                      {/*</CCol>*/}
                      <CFormGroup>
                        <CCol md="12">
                          <CButton type="submit" size="sm" color="success"
                                   onClick={context.getTotalChefDepartement}><CIcon
                            name="cil-check"/> Géner total</CButton>
                        </CCol>
                      </CFormGroup>

                      {/*<CFormGroup row>*/}
                      {/*<CCol md="12">*/}

                      {/*<CButton type="submit" size="sm" color="info"><CIcon name="cil-print" /> Imprimer</CButton>*/}
                      {/*</CCol>*/}
                      {/*</CFormGroup>*/}


                    </CRow>
                  </CCardFooter>
                </CCard>
              </CCol>
            </CRow>
          </>
        )
      }}
    </GlobalContext.Consumer>
  )
}

export default Statistiques
