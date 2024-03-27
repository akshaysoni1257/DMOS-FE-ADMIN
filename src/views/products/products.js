import React from 'react';
import '../products/products.scss'
import { Link } from 'react-router-dom'

const Products = () => {
    return (
        <>
            <div className='header_wrap'>
                <h5> Category </h5>
            </div>
            <div className='card_wrap'>
                <button> <Link to='/products/addnewproduct'> Add New Product </Link> </button>
            </div>
        </>
    )
}

export default Products;