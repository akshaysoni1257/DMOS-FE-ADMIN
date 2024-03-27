import React from 'react'
import '../addnewproduct/addnewproduct.scss'
import { Label } from '@progress/kendo-react-labels'
import { TextBox } from '@progress/kendo-react-inputs'
import axios from 'axios'

const AddNewProduct = () => {
  const [productData, setProductData] = useState({
    name: '',
    category: '',
    quantity: '',
    description: '',
    price: '',
  })

  //Handle input data and save in state
  const handleInput = (e) => {
    e.preventDefault()
    setProductData({ ...productData, [e.target.name]: e.target.value })
  }
  const { name, category, quantity, description, price } = productData
  const addProduct = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/addProducts', productData)
      // add toaster, message alert or anything
      console.log('product added successfully')
    } catch (error) {
      console.log(error)
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
                  value={name}
                  name="name"
                  onChange={(e) => handleInput(e)}
                  placeholder="Product Name"
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="product_info">
                <Label> Category </Label> <br />
                <TextBox
                  value={category}
                  name="category"
                  onChange={(e) => handleInput(e)}
                  placeholder="Category"
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="product_info">
                <Label> Quantity </Label> <br />
                <TextBox
                  value={quantity}
                  name="quantity"
                  onChange={(e) => handleInput(e)}
                  placeholder="Price"
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="product_info">
                <Label> Description </Label> <br />
                <TextBox
                  value={description}
                  name="description"
                  onChange={(e) => handleInput(e)}
                  placeholder="Price"
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="product_info">
                <Label> Price </Label> <br />
                <TextBox
                  value={price}
                  name="price"
                  onChange={(e) => handleInput(e)}
                  placeholder="Price"
                />
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
                <button onClick={(e) => addProduct(e)} className="submit_warp">
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
