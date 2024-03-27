import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div className='footer_detail'>
        <span className="ms-1"> Copyright &copy; 2023 creativeLabs.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://grofresh-admin.6amtech.com/admin/product/list" target="_blank" rel="noopener noreferrer">
          Store Name
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)