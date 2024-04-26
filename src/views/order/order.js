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



