import React, {useContext, useState} from 'react'
import {
  CCard,
  CCardBody,
  CCol,
  CCardImg,
  CCardText, CButton,
} from '@coreui/react'
import CIcon from "@coreui/icons-react";
import {useNavigate} from "react-router-dom";
import {GlobalContext} from "../../services/Global";


const VoteCard = ({props}) => {

  const navigate = useNavigate();
  const context = useContext(GlobalContext);
  const [clic, setClic] = useState(false);

  return (
    <GlobalContext.consumer>
      {
        context => {

          return (
            <CCol xs="4">
              <CCard>
                <CCardBody>
                  <CCol>
                    {context.candidats.filter(i => i.owner === props.owner).map((i) => {
                      return (
                        <CCardText>{i.ordre}.{i.nom} {i.prenom}</CCardText>
                      )
                    })}

                  </CCol>
                </CCardBody>
              </CCard>
              ))

            </CCol>
          )
        }
      }
    </GlobalContext.consumer>
  )

};


export default VoteCard;
