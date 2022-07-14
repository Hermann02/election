import React from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {CNavGroup, CNavItem, CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import {AppSidebarNav} from './AppSidebarNav'

import {logoNegative} from 'src/assets/brand/logo-negative'
import {sygnet} from 'src/assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import useToken from "../utils/UseToken";
import {cilList, cilPeople, cilPuzzle, cilSpeedometer} from "@coreui/icons";


const AppSidebar = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.sidebarShow);
  const {token, setToken} = useToken();
  let routes = [];

  switch (token?.user.userType) {

    case 'CD' :
      routes = [
        {
          component: CNavItem,
          name: 'Dashboard',
          to: '/dashboard',
          icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon"/>,
        },
        {
          component: CNavItem,
          name: 'Bureaux de vote',
          to: '/bureau/vote',
          icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon"/>,
        },

        {
          component: CNavGroup,
          name: 'Gestion des electeurs',
          icon: <CIcon icon={cilPuzzle} customClassName="nav-icon"/>,
          items: [
            {
              component: CNavItem,
              name: 'Electeurs',
              to: '/electeur',
            },
            {
              component: CNavItem,
              name: 'Demandeur',
              to: '/demandeur',
            },

          ],
        },
      ];
      break;

    case 'CE' :
      routes = [
        {
          component: CNavItem,
          name: 'Dashboard',
          to: '/dashboard',
          icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon"/>,
        },
      ];
      break;

    case 'MD' :
      routes = [
        {
          component: CNavItem,
          name: 'Dashboard',
          to: '/dashboard',
          icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon"/>,
        },
        {
          component: CNavItem,
          name: 'Candidats',
          to: '/candidat',
          icon: <CIcon icon={cilList} customClassName="nav-icon"/>,
        },
      ];
      break;

    case 'AD' :
      routes = [
        {
          component: CNavItem,
          name: 'Dashboard',
          to: '/dashboard',
          icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon"/>,
        },
        {
          component: CNavItem,
          name: 'Gestion des lieux',
          to: '/lieux',
          icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon"/>,
        },
        {
          component: CNavItem,
          name: 'Gestion des Utilisateurs',
          to: '/users',
          icon: <CIcon icon={cilPeople} customClassName="nav-icon"/>,
        },
        {
          component: CNavItem,
          name: 'Demandeurs',
          to: '/demandeur',
          icon: <CIcon icon={cilPeople} customClassName="nav-icon"/>,
        },
      ];
      break;
  }

  console.log(routes, 'nav');
  return (
    <>
      <CSidebar
        position="fixed"
        unfoldable={unfoldable}
        visible={sidebarShow}
        onVisibleChange={(visible) => {
          dispatch({type: 'set', sidebarShow: visible})
        }}
      >
        <CSidebarBrand className="d-none d-md-flex" to="/">
          <CIcon className="sidebar-brand-full" icon={logoNegative} height={35}/>
          <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35}/>
        </CSidebarBrand>
        <CSidebarNav>
          <SimpleBar>
            <AppSidebarNav items={routes}/>
          </SimpleBar>
        </CSidebarNav>
        <CSidebarToggler
          className="d-none d-lg-flex"
          onClick={() => dispatch({type: 'set', sidebarUnfoldable: !unfoldable})}
        />
      </CSidebar>
    </>
  )
};

export default React.memo(AppSidebar)
