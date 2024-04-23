import React from 'react'
import '../login/login.scss'
import 'react-toastify/dist/ReactToastify.css';
import { Label } from '@progress/kendo-react-labels'
import { ToastContainer, toast } from 'react-toastify';

const Dashboard = () => {

  return (
    <>
       <div className='main_card'>
          <div className='heading_wrap'>
              <h5> Dashboard </h5>
          </div>
          <div className='card_details'>
            <div className='dashboard_details'>
              <div className='dashboard_info'>
                <Label> 7 </Label> <br></br>
                <Label> Total Category </Label>
              </div>
              <div className='dashboard_info'>
                <Label> 21 </Label> <br></br>
                <Label> Total Product </Label>
              </div>
              <div className='dashboard_info'>
                <Label> 5 </Label> <br></br>
                <Label> Total Order </Label>
              </div>
              <div className='dashboard_info'>
                <Label> 5 </Label> <br></br>
                <Label> Total Payment </Label>
              </div>
            </div>
          </div>
      </div>
    </>
  )
}

export default Dashboard
