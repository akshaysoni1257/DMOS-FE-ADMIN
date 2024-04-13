import React from 'react'
import '../addnewproduct/addnewproduct.scss'
import { Label } from '@progress/kendo-react-labels'
import { TextBox } from '@progress/kendo-react-inputs'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AddNewProduct = () => {
  const navigate = useNavigate()
  const [showCategory, setShowCategory] = useState([])
  const [productData, setProductData] = useState({
    name: '',
    category: '',
    quantity: '',
    description: '',
    price: '',
  });
  const [validError, setValidError] = useState(null);
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  useEffect(() => {
    showData()
  }, [])


  //Handle input data and save in state
  const handleInput = (e) => {
    // e.preventDefault()
    const { name, value } = e.target
    const convert = name === 'quantity' || name === 'price' ? parseInt(value) : value
    setProductData({ ...productData, [name]: convert })

  }
  const addProduct = async (e) => {

    // Add Product Start
    if (!productData.name ) {
      setValidError('Please enter your product name');
      return
    }
    // Add Product End

    try {
      const gettoken = localStorage.getItem('token')
      const response = await axios.post(
        `http://localhost:3000/admin/product/addProducts`,{
        ...productData,
        img:image,
        },
        {
          headers: {
            Authorization: `Bearer ${gettoken}`,
          },
        },
      )
      const data = response.data
      if (response.data) {
  
        navigate("/products")
      }
    } catch (error) {
      console.log(error)
    }
  }
  //Get Category
  const showData = async () => {
    try {
      const gettoken = localStorage.getItem('token')
      const res = await axios.get(
        `http://localhost:3000/admin/category/getCategories?page=1&limit=20`,
        {
          headers: {
            Authorization: `Bearer ${gettoken}`,
          },
        },
      )
      const data = res.data
      setShowCategory(data.categories)
    } catch (error) {
      console.log('error', error)
    }
  }
  
  return (
    <>
      <div className="header_wrap">
        <h5> Add New Product </h5>
      </div>

      <div className="card_wrap">
        <div className="product_detail">
          <div className="row">
            <div className="col-md-3">
              <div className="product_info">
                <Label> Product Name </Label> <br />
                <TextBox
                  value={productData.name}
                  name="name"
                  onChange={(e) => handleInput(e)}
                  placeholder="Product Name"
                />
                <p className='error'> {validError ? 'Please enter your product name' : ''} </p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="product_info">
                <Label> Category </Label> <br />
                <select name='category' onChange={(e=>handleInput(e))}>
                  {showCategory?.map((category) => {
                    return <option value={category._id}>{category.name}</option>
                  })}
                </select>
                <p className='error'> {validError ? 'Please select your category' : ''} </p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="product_info">
                <Label> image </Label> <br />
              <input type='text' value={image} onChange={handleImageChange} />
                <p className='error'> {validError ? 'Please select your category' : ''} </p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="product_info">
                <Label> Quantity </Label> <br />
                <TextBox
                  value={productData.quantity}
                  name="quantity"
                  onChange={(e) => handleInput(e)}
                  placeholder="Price"
                />
                <p className='error'> {validError ? 'Please enter your quantity' : ''} </p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="product_info">
                <Label> Description </Label> <br />
                <TextBox
                  value={productData.description}
                  name="description"
                  onChange={(e) => handleInput(e)}
                  placeholder="description"
                />
                <p className='error'> {validError ? 'Please enter product description' : ''} </p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="product_info">
                <Label> Price </Label> <br />
                <TextBox
                  value={productData.price}
                  name="price"
                  onChange={(e) => handleInput(e)}
                  placeholder="Price"
                />
                <p className='error'> {validError ? 'Please enter product price' : ''} </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="button_warp">
                <button
                  className="reset_wrap"
                  onClick={() =>
                    setProductData({
                      name: '',
                      category: '',
                      quantity: '',
                      description: '',
                      price: '',
                    })
                  }
                >
                  {' '}
                  Reset{' '}
                </button>
                <button onClick={() => addProduct()} className="submit_warp">
                  {' '}
                  Submit{' '}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddNewProduct
