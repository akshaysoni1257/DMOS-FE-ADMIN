import React, { useEffect, useState } from 'react'
import '../category/category.scss'
import { Label } from "@progress/kendo-react-labels";
import { TextBox } from "@progress/kendo-react-inputs";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import products from "../category/data.json";
import Table from 'react-bootstrap/Table';
import axios from 'axios';

// const cellWithBackGround = (props) => {
//   return (
//     <td className='icon_wrap'>
//       <i class="fa fa-pencil-square-o"></i>
//       <i class="fa fa-trash-o"></i>
//     </td>
//   );
// };


const Category = () => { 

  const [value, setValue] = useState({name:''})
  const [category, setCategory] = useState([]);
  const [showCategory, setShowCategory] = useState([]);


  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  }

  const handleClick = async () => {
    try {
      const gettoken = localStorage.getItem('token')
    const response = await axios.post(`http://localhost:3000/admin/category/addCategories`, value, {
      headers: {
        'Authorization': `Bearer ${gettoken}`
      }
    });
    const data = response.data;
    if (response.data) {
      setCategory(data);
    }
    } catch (error) {
      console.log(category);
    }
  }

  const handleDelete = async (_id) => {
    console.log('delete', _id);
    try {
      const gettoken = localStorage.getItem('token')
      const res = await axios.delete(`http://localhost:3000/admin/category/deleteCategories${_id}`, {
        headers: {
          'Authorization': `Bearer ${gettoken}`
        }
      });
      if (res.data) {
        console.log('delete ==>', res.data);
        // const deletedData = showCategory.filter((item) => item._id !== _id)
        // console.log('data delete',deletedData);
      }
    } catch (error) {
      console.log(category);
    }
  }

  const showData = async () => {
    try {
      const gettoken = localStorage.getItem('token')
      const res = await axios.get(`http://localhost:3000/admin/category/getCategories?page=1&limit=2`, {
        headers: {
          'Authorization': `Bearer ${gettoken}`
        }
      });
      console.log(res.data,"1111")
      const data = res.data;
      setShowCategory(data.categories);
    } catch (error) {
      console.log('error', error);
    }
  }

  useEffect(() => {
    showData();
  },[]);

  return (
    <>
      <div className='header_wrap'>
        <h5> Category </h5>
      </div>
      <div className='card_wrap'>
        <div className='category_detail'>
          <div className='row'>
            <div className='col-md-3'>
              <div className='category_wrap'>
                <Label> Category Name </Label> <br/>
                <TextBox value={value.name} name='name' onChange={handleChange} placeholder="Category Name" />
              </div>
            </div>
            <div className='col-md-2'>
              <div className='button_warp'>
                <button className='submit_warp' onClick={handleClick}> Submit </button>
              </div>
            </div>
          </div>
          <div className='category_grid'>
            {/* <Grid style={{ height: "400px" }} data={products}>
              <GridColumn field="ProductID" title="ID" width="40px" />
              <GridColumn field="CategoryName" title="Category Name" />
              <GridColumn title="Action" cell={cellWithBackGround} />
              
              <GridColumn field="ProductName" title="Name" width="250px" />
              <GridColumn field="UnitPrice" title="Price" />
              <GridColumn field="UnitsInStock" title="In stock" />
            </Grid> */}

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              {showCategory.map((item, id) => (
              <tr key={id}>
                <td>{id +1}</td>
                <td>{item.name}</td>
                <td> <button onClick={() => handleDelete(item._id)}>delete</button>   </td>
              </tr>
              ))}
              {/* <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Thornton</td>
                <td>Larry the Bird</td>
                <td>@twitter</td>
              </tr> */}
            </tbody>
          </Table>


          </div>
        </div>
      </div>

      
    </>
  )
}

export default Category;
