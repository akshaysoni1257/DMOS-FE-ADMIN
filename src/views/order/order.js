// import { Table } from 'react-bootstrap'
// import '../order/order.css'

// const Order = () => {
//     return (
//         <>
//             <div className='main_card'>
//                 <div className='heading_wrap'>
//                     <h5> Orders </h5>
//                 </div>
//                 <div className='card_details'>
//                     <div className="order_table">
//                         <Table striped bordered hover>
//                             <thead>
//                                 <tr>
//                                     <th style={{width: "70px" }}>No.</th>
//                                     <th style={{width: "150px" }}>Image</th>
//                                     <th>Product Name</th>
//                                     <th>Price</th>
//                                     <th style={{width: "200px" }}>Quantity</th>
//                                     <th style={{width: "200px" }}> Total Amount</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 <tr>
//                                     <td> 1 </td>
//                                     <th> <img style={{width:'40px',height:"40px"}} src="https://www.dominos.co.in/files/items/Corn_&_Cheese.jpg"/> </th>
//                                     <td> Cheese N Corn </td>
//                                     <td> 360 </td>
//                                     <td> 2 </td>
//                                     <td> 720 </td>
//                                 </tr>
//                             </tbody>
//                         </Table>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Order;


//new code 1
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Order = () => {
//     const [items, setOrders] = useState([]); 
//     const getOrders = async () => {
//         try {
            
//             const response = await axios.get(
//                 'http://localhost:3000/admin/order/orders');
//             const ordersData = response.data;
//              console.log(ordersData,"===ordersdata===");// Assuming your API response has an array of orders under the key 'orders'
//             setOrders(ordersData.items || []); // Ensure ordersData.items is an array, otherwise fallback to an empty array
//                 console.log(items,"-=======oitems");
//         } catch (error) {
//             console.error('Error fetching orders:', error);
//         }
//     };

//     useEffect(() => {
//         getOrders();
//     }, []);

//     return (
//         <div className='main_card'>
//             <div className='heading_wrap'>
//                 <h5> Orders </h5>
//             </div>
//             <div className='card_details'>
//                 <div className="order_table">
//                     <table striped bordered hover>
//                         <thead>
//                             <tr>
//                                 <th style={{width: "70px" }}>No.</th>
//                                 <th style={{width: "150px" }}>Image</th>
//                                 <th style={{width: "150px" }}>Product Name</th>
//                                 <th style={{width: "150px" }}>Price</th>
//                                 <th style={{width: "200px" }}>Quantity</th>
//                                 <th style={{width: "200px" }}>Total Amount</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {items.map((item, index) => (
//                                 <tr key={index}>
//                                     <td>{index + 1}</td>
//                                     <td><img style={{ width: '40px', height: "40px" }} src={item.product.img} alt="Product" /></td>
//                                     <td>{item.product.name}</td>
//                                     <td>{item.totalPrice}</td>
//                                     <td>{item.quantity}</td>
//                                     <td>{item.totalPrice}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Order;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../order/order.scss'
import Table from 'react-bootstrap/Table'

const Order = () => {
    const [items, setItems] = useState([]);

    const getOrders = async () => {
        try {
            const response = await axios.get('http://localhost:3000/admin/order/orders');
            const ordersData = response.data;
            console.log(ordersData, "===ordersdata==="); // Log the entire response for debugging
            setItems(ordersData);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        getOrders();
    }, []);

    return (
        <div className='main_card'>
            <div className='heading_wrap'>
                <h5> Orders </h5>
            </div>
            <div className='card_details'>
                <div className="order_table">
                    <table striped bordered hover>
                        <thead>
                            <tr>
                                <th style={{width: "70px" }}>No.</th>
                                <th style={{width: "200px" }}>Customer name</th>
                                <th style={{width: "200px" }}>Customer email</th>
                                {/* <th style={{width: "150px" }}>Image</th> */}
                                {/* <th style={{width: "200px" }}>Product Name</th> */}
                                {/* <th style={{width: "200px" }}>Price</th> */}
                                {/* <th style={{width: "200px" }}>Quantity</th> */}
                                <th style={{width: "200px" }}>Total Amount</th>
                                <th style={{width: "200px" }}>Order Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => 
                                // console.log(item,"====item");
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        {/* <td><img style={{ width: '40px', height: "40px" }} src={item.product.img} alt="Product" /></td> */}
                                        <td>{item.customer.first_name}</td>
                                        <td>{item.customer.email}</td>
                                        {/* <td>{item.quantity}</td> */}
                                        <td>{item.totalOrderPrice}</td>
                                        <td>{item.status}</td>
                                    </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Order;



