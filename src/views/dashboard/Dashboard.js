// import React from 'react'
// import '../login/login.scss'
// import 'react-toastify/dist/ReactToastify.css';
// import { Label } from '@progress/kendo-react-labels'
// import { ToastContainer, toast } from 'react-toastify';

// const Dashboard = () => {

//   return (
//     <>
//        <div className='main_card'>
//           <div className='heading_wrap'>
//               <h5> Dashboard </h5>
//           </div>
//           <div className='card_details'>
//             <div className='dashboard_details'>
//               <div className='dashboard_info'>
//                 <Label> 7 </Label> <br></br>
//                 <Label> Total Category </Label>
//               </div>
//               <div className='dashboard_info'>
//                 <Label> 21 </Label> <br></br>
//                 <Label> Total Product </Label>
//               </div>
//               <div className='dashboard_info'>
//                 <Label> 5 </Label> <br></br>
//                 <Label> Total Order </Label>
//               </div>
//               <div className='dashboard_info'>
//                 <Label> 5 </Label> <br></br>
//                 <Label> Total Payment </Label>
//               </div>
//             </div>
//           </div>
//       </div>
//     </>
//   )
// }

// export default Dashboard

import React, { useState, useEffect } from 'react';
import '../login/login.scss';
import '../dashboard/dashboard.css';
import 'react-toastify/dist/ReactToastify.css';
import { Label } from '@progress/kendo-react-labels';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/admin/dashboard/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch dashboard stats');
    }
  };

  return (
    <>
      <div className='main_card'>
        <div className='heading_wrap'>
          <h5>Dashboard</h5>
        </div>
        <div className='card_details'>
          <div className="dashboard_boxes">
            {stats && (
              <>
                <DashboardBox label="Total Categories" value={stats.numberOfCategories} />
                <DashboardBox label="Total Products" value={stats.productCount} />
                <DashboardBox label="Total Payments" value={stats.totalPayment} />
                <DashboardBox label="Total Orders" value={stats.totalOrders} />
              </>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

const DashboardBox = ({ label, value }) => (
  <div className="dashboard_box">
    <Label style={{fontWeight: 'bold', color:'black'}}>{label}</Label>
    <Label style={{marginLeft: '5 px', display: 'flex', fontSize:'20px'}}>{value}</Label>
  </div>
);

export default Dashboard;


