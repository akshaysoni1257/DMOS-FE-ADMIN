import React from 'react';
import '../products/products.scss'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Label } from '@progress/kendo-react-labels';
import { TextBox } from '@progress/kendo-react-inputs';

const Products = () => {

  
  // Product List Start
  const [products, setProducts]=useState([])
  
  const getProducts=async()=>{
      const gettoken=localStorage.getItem('token')
      try {
        let res= await axios.get("http://localhost:3000/admin/product/getProducts", {
          headers: {
            Authorization: `Bearer ${gettoken}`,
          },
        })
        console.log(res.data)
        setProducts(res.data.products)
      } catch (error) {
        console.log(error)
      }
  }
  useEffect(()=>{
    getProducts();
  },[])
  // Product List End


  // Delete Start
  const [ids, setid] = useState([])
  const delteid = (id) =>{
    if(ids.includes(id))
    {
      setid(ids.filter(x=>x != id))
    }
    else{
      setid([...ids,id])
    }
  }

  const handleDelete = async (_id) => {
    try {
      let body= !ids.length ?{ id:[_id]}:{id:ids}
      console.log('apidataid',body);
      const gettoken = localStorage.getItem('token')
      // console.log(ids,"222")
      const res = await axios.post(`http://localhost:3000/admin/product/deleteProduct`, {
        id: !ids.length ?[ _id] :ids,
        
        // data: body,
        // id:ids,
      },{headers: {
        'Authorization': `Bearer ${gettoken}`
      }}).then((res2)=>{
        console.log('res2', res2)
        getProducts();
        const deletedData = products.filter((item) => item.id !== id)
        setid([])
      })
      console.log(res,">>>>>res")
      if (res.data) {
      }
    } catch (error) {
      console.log(error);
    }
  }
  // Delete End



  // Edit Start
  const [productData, setProductData] = useState({
    name: '',
    category: '',
    quantity: '',
    description: '',
    price: '',
  })
  const [editedData, setEditedData] = useState(null);
  const [editButton, setEditButton] = useState(false);
  // Popup Start
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleShow = () => {
    setShow(true);
  }
  // Popup End

  const [showCategory, setShowCategory] = useState([]);
  
  const handleEdit = (_id) => {
    setShow(true);
    const exisingId = products.find((item) => item._id === _id)
    console.log('exisingId', exisingId);
    setProductData(exisingId);
    setEditedData(_id);
    setEditButton(true);
    addProduct()
  }
  useEffect(() => {
    showData()
  }, [])


  //Handle input data and save in state
  const handleInput = (e) => {
    // e.preventDefault()
    setProductData({ ...productData, [e.target.name]: e.target.value })
  }
  // const { name, category, quantity, description, price } = productData
  const addProduct = async (e) => {

    if (editButton) {
      try {
        const gettoken = localStorage.getItem('token');
        const response = await axios.put(`http://localhost:3000/admin/product/updateProduct/${editedData}`, productData , {
          headers: {
            'Authorization':`Bearer ${gettoken}`
          }
        });
          if (response.data) {
              const updateData = products.map((prod) => prod._id === editedData ? {...prod, productData} : prod);
              setProductData(updateData);
              // setValue({name: ''});
              getProducts();
              setShow(false);
              setEditButton(false);
          }
      } catch (error) {
        console.log('error',error);
      }
    }
    else {
      // e.preventDefault()
      try {
        const gettoken = localStorage.getItem('token')
        const response = await axios.post(
          `http://localhost:3000/admin/product/addProducts`,
          productData,
          {
            headers: {
              Authorization: `Bearer ${gettoken}`,
            },
          },
        )
        const data = response.data
        if (response.data) {
          // setProductData(data)
          navigate("/products")
        }
      } catch (error) {
        console.log(error)
      }
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
  // Edit End


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
              <th>No.</th>
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
              <td> 
                <button onClick={() => handleDelete(item._id)}> delete</button> 
                <button onClick={() => handleEdit(item._id)}> Edit </button> 
                {/* <button onClick={() => handleDelete(item._id)}> delete</button> 
                <button onClick={() => handleEdit(item._id)}> Edit </button>  */}
              </td>
            </tr>
            ))}
          </tbody>
        </Table>


        {/* Model Popup Start */}
        {/* <Button variant="primary" onClick={handleShow}>
          Edit
        </Button> */}
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={true}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='edit_details'>
              <div className='row'>
                <div className='col-md-6'>
                  <div className='product_info'>
                    <Label> Product Name </Label>
                    <TextBox
                      value={productData.name}
                      name="name"
                      onChange={(e) => handleInput(e)}
                      placeholder="Product Name"
                    />
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='product_info'>
                    <Label> Category </Label> <br />
                    <select name='category' onChange={(e=>handleInput(e))}>
                      {showCategory?.map((category) => {
                        return <option value={category._id} selected={productData.category == category._id}>{category.name}</option>
                      })}
                    </select>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='product_info'>
                    <Label> Quantity </Label>
                    <TextBox
                      value={productData.quantity}
                      name="quantity"
                      onChange={(e) => handleInput(e)}
                      placeholder="Price"
                    />
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='product_info'>
                    <Label> Description </Label>
                    <TextBox
                      value={productData.description}
                      name="description"
                      onChange={(e) => handleInput(e)}
                      placeholder="Price"
                    />
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='product_info'>
                    <Label> Price </Label>
                    <TextBox
                      value={productData.price}
                      name="price"
                      onChange={(e) => handleInput(e)}
                      placeholder="Price"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={addProduct}> Save </Button>
          </Modal.Footer>
        </Modal>
        {/* Model Popup End */}


      </>
  )
}

export default Products;