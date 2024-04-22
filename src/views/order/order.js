import { Table } from 'react-bootstrap'
import '../order/order.css'

const Order = () => {
    return (
        <>
            <div className='main_card'>
                <div className='heading_wrap'>
                    <h5> Order </h5>
                </div>
                <div className='card_details'>
                    <div className="order_table">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th style={{width: "70px" }}>No.</th>
                                    <th style={{width: "150px" }}>Image</th>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th style={{width: "200px" }}>Quantity</th>
                                    <th style={{width: "200px" }}> Total Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td> 1 </td>
                                    <th> <img style={{width:'40px',height:"40px"}} src="https://www.dominos.co.in/files/items/Corn_&_Cheese.jpg"/> </th>
                                    <td> Cheese N Corn </td>
                                    <td> 360 </td>
                                    <td> 2 </td>
                                    <td> 720 </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Order;