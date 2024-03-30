import React from 'react';
import '../products/products.scss'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

const Products = () => {
    const [products, setProducts]=useState([])
    useEffect(()=>{
getProducts()
    },[])
    const getProducts=async()=>{
        const gettoken=localStorage.getItem('token')
        try {
          let res= await axios.get("http://localhost:3000/admin/product/getProducts", {
            headers: {
              Authorization: `Bearer ${gettoken}`,
            }
          })
          console.log(res.data)
          setProducts(res.data.products)
        } catch (error) {
          console.log(error)
        }
      }
    return (
        <>
            <div className='header_wrap'>
                <h5> Products </h5>
            </div>
            <div className='card_wrap'>
                <button> <Link to='/products/addnewproduct'> Add New Product </Link> </button>
            </div>
            <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((item, id) => (
              <tr key={id}>
                <td>{id +1}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                {/* <input type="checkbox" checked= {ids.includes(item._id)} onClick={()=>delteid(item._id)}/> */}
                <td> <button onClick={() => handleDelete(item._id)}>delete</button> 
                     <button onClick={() => handleEdit(item._id)}> Edit </button> 
                </td>
              </tr>
              ))}
            </tbody>
          </Table>
        </>
    )
}

export default Products;