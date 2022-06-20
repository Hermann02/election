import React, {useState} from 'react'
import {
  CRow,
  CCol,
  CNav,
  CNavItem,
  CNavLink, CTabContent, CTabPane, CHeaderNav, CCard,

} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Region from "./region/Region";
import Departement from "./departement/Departement";
import Commune from "./communes/Commune";
import {GlobalContext} from "../../services/Global";

const Lieux = () => {

  const [active, setActive] = useState(0);
  const lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.'


  return (
    <GlobalContext.Consumer>
      {
        context =>{
          return(
            <CRow>
              <CCol xs={12}>
                <CCard>
                  <div activeTab={active} onActiveTabChange={idx => setActive(idx)}>
                    <CNav variant="tabs">
                      <CNavItem>
                        <CNavLink active={active === 0} onClick={e => setActive(0)}>
                          {'Regions'}
                        </CNavLink>
                      </CNavItem>
                      <CNavItem>
                        <CNavLink active={active === 1} onClick={e => setActive(1)}>
                          {'Departements'}
                        </CNavLink>
                      </CNavItem>
                      <CNavItem>
                        <CNavLink active={active === 2} onClick={e => setActive(2)}>
                          {'Communes'}
                        </CNavLink>
                      </CNavItem>
                    </CNav>
                    <CTabContent>
                      <CTabPane visible={active === 0}>
                        <Region/>
                      </CTabPane>
                      <CTabPane visible={active === 1}>
                        <Departement/>
                      </CTabPane>
                      <CTabPane visible={active === 2}>
                        <Commune/>
                      </CTabPane>
                    </CTabContent>
                  </div>
                </CCard>
              </CCol>

            </CRow>
          )
        }
      }
    </GlobalContext.Consumer>

  )
}

export default Lieux
