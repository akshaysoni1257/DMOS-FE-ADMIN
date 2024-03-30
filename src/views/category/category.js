import React, { useEffect, useState } from 'react'
import '../category/category.scss'
import { Label } from "@progress/kendo-react-labels";
import { TextBox } from "@progress/kendo-react-inputs";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import products from "../category/data.json";
import Table from 'react-bootstrap/Table';
import axios from 'axios';



const Category = () => { 
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
  const [value, setValue] = useState({name:''})
  const [category, setCategory] = useState([]);
  const [showCategory, setShowCategory] = useState([]);
  const [editedData, setEditedData] = useState(null);
  const [editButton, setEditButton] = useState(false);

console.log('apiid',editedData);

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  }

  const handleClick = async () => {
    if (editButton) {
      try {
        const gettoken = localStorage.getItem('token');
        const response = await axios.put(`http://localhost:3000/admin/category/updateCategories/${editedData}`, value , {
          headers: {
            'Authorization':`Bearer ${gettoken}`
          }
        });
          if (response.data) {
              const updateData = showCategory.map((prod) => prod._id === editedData ? {...prod, value} : prod);
              setCategory(updateData);
              setValue({name: ''});
              showData();
              setEditButton(false);
          }
      } catch (error) {
        console.log('error',error);
      }
    } else {
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
          showData();
        }
        } catch (error) {
          console.log(error);
        }
    }
  }

  const handleDelete = async (_id) => {
    try {
      let body= !ids.length ?{ id:[_id]}:{id:ids}
      const gettoken = localStorage.getItem('token')
      console.log(ids,"222")
      const res = await axios.delete(`http://localhost:3000/admin/category/deleteCategories`, {
        data: body // Sending _id in the request body
       ,
        // id:ids,      
        headers: {
          'Authorization': `Bearer ${gettoken}`
        },
      });
      if (res.data) {
        const deletedData = showCategory.filter((item) => item._id !== _id)
        showData();
        setid([])
        console.log('data delete',deletedData);
      }
    } catch (error) {
      console.log(category);

    }
  }


  const handleEdit = (_id) => {
    const exisingId = showCategory.find((item) => item._id === _id)
    console.log('exisingId', exisingId);
    setValue(exisingId);
    setEditedData(_id);
    setEditButton(true);
  }

  const showData = async () => {
    try {
      const gettoken = localStorage.getItem('token')
      const res = await axios.get(`http://localhost:3000/admin/category/getCategories?page=1&limit=20`, {
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
                <button className='submit_warp' onClick={handleClick}> {editButton ? 'update': 'Submit'}  </button>
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
                <th>no.</th>
                <th></th>
                <th>category Name</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              {showCategory.map((item, id) => (
              <tr key={id}>
                <td>{id +1}</td>
                <input type="checkbox" checked= {ids.includes(item._id)} onClick={()=>delteid(item._id)}/>
                <td>{item.name}</td>
                <td> <button onClick={() => handleDelete(item._id)}>delete</button> 
                     <button onClick={() => handleEdit(item._id)}> Edit </button> 
                </td>
              </tr>
              ))}
            </tbody>
          </Table>


          </div>
        </div>
      </div>

      
    </>
  )
}

export default Category;
