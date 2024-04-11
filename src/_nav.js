import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilSpeedometer, cilStar, } from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'category',
    to: '/category',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Products',
    to: '/products',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'QR code',
    to: '/qr',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,//QR icon here
  },

    // {
    //   component: CNavItem,
    //   name: 'Login',
    //   to: '/login',
    //   icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    // },
  {
    component: CNavGroup,
    name: 'Pages',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      // {
      //   component: CNavItem,
      //   name: 'Register',
      //   to: '/register',
      // },
      {
        component: CNavItem,
        name: 'Error 404',
        to: '/404',
      },
      {
        component: CNavItem,
        name: 'Error 500',
        to: '/500',
      },
    ],
  },
  // {
  //   component: CNavItem,
  //   name: 'Docs',
  //   href: 'https://coreui.io/react/docs/templates/installation/',
  //   icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  // },
]

export default _nav
