import React from 'react'
import AddQR from './views/qr/addqr'
import GetAllQR from './views/qr/getAllQR'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Category = React.lazy(() => import('./views/category/category'))
const Products = React.lazy(() => import('./views/products/products'))
const Order = React.lazy(() => import('./views/order/order'))
const AddNewProduct = React.lazy(() => import('./views/products/addnewproduct/addnewproduct'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

const routes = [
  { path: '/', exact: true, name: 'Home' },

  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/category', name: 'Category', element: Category },
  { path: '/products', name: 'Products', element: Products },
  { path: '/order', name: 'Order', element: Order },
  { path: '/qr/addqr', name: 'AddNewQR', element: AddQR },
  { path: '/qr', name: 'GetAllQR', element: GetAllQR },
  { path: '/products/addnewproduct', name: 'AddNewProduct', element: AddNewProduct },

  // { path: '/login', name: 'Login', element: Dashboard },

  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
]

export default routes
