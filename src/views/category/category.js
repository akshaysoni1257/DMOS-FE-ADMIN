import React, { useEffect, useState } from 'react'
import '../category/category.scss'
import { Label } from '@progress/kendo-react-labels'
import { TextBox } from '@progress/kendo-react-inputs'
import Table from 'react-bootstrap/Table'
import axios from 'axios'
import '../login/login.scss'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Category = () => {
  const [ids, setid] = useState([])
  const delteid = (id) => {
    if (ids.includes(id)) {
      setid(ids.filter((x) => x != id))
    } else {
      setid([...ids, id])
    }
  }

  const [value, setValue] = useState({
    name: '',
  })
  const [showCategory, setShowCategory] = useState([])
  const [editedData, setEditedData] = useState(null)
  const [editButton, setEditButton] = useState(false)
  const [category, setCategory] = useState([])
  const [validError, setValidError] = useState(null)

  console.log('apiid', editedData)

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value })
  }

  const handleClick = async () => {
    const gettoken=localStorage.getItem('token')
    // Category Validation Start
    if (!value.name) {
      setValidError('Please enter your category name')
      return
    }
    // Category Validation End

    if (editButton) {
      try {
        const response = await axios.put(
          `http://localhost:3000/admin/category/updateCategories/${editedData}`,
          value,
          {
            headers: {
              Authorization: `Bearer ${gettoken}`,
            },
          },
        )
        showData()
        toast.success('Updated successfully!')

        if (response.data) {
          const updateData = showCategory.map((prod) =>
            prod._id === editedData ? { ...prod, value } : prod,
          )
          setCategory(updateData)
          setValue({ name: '' })
          setEditButton(false)
        }
      } catch (error) {
        console.log('error', error)
      }
    } else {
      try {
        const gettoken = localStorage.getItem('token')
        const response = await axios.post(
          `http://localhost:3000/admin/category/addCategories`,
          value,
          {
            headers: {
              Authorization: `Bearer ${gettoken}`,
            },
          },
        )
        const data = response.data
        if (response.data) {
          setCategory(data)
          showData()
          toast.success('Category Added successfully!')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleDelete = async (_id) => {
    try {
      let body = !ids.length ? { id: [_id] } : { id: ids }
      const gettoken = localStorage.getItem('token')
      // const res = await axios.delete(`http://localhost:3000/admin/category/deleteCategories`, {
      await axios.delete(`http://localhost:3000/admin/category/deleteCategories`, {
        data: body,
        headers: {
          Authorization: `Bearer ${gettoken}`,
        },
      })

      showData()
      toast.success('Category deleted successfully!')
      if (res.data) {
        const deletedData = showCategory.filter((item) => item._id !== _id)
        setid([])
        console.log('data delete', deletedData)
      }
    } catch (error) {
      console.log(category)
    }
  }

  const handleEdit = (_id) => {
    const exisingId = showCategory.find((item) => item._id === _id)
    console.log('exisingId', exisingId)
    setValue(exisingId)
    setEditedData(_id)
    setEditButton(true)
  }

  const showData = async () => {
    try {
      const gettoken = localStorage.getItem('token')
      const res = await axios.get(
        `http://localhost:3000/admin/category/getCategories`,
        {
          headers: {
            Authorization: `Bearer ${gettoken}`,
          },
        },
      )
      console.log(res.data, '1111')
      const data = res.data
      setShowCategory(data.categories)
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    showData()
  }, [])

  return (
    <>

      <div className='main_card'>
          <div className='heading_wrap'>
              <h5> Category </h5>
          </div>
          <div className='card_details'>
            <div className="category_detail">
              <div className="row">
                <div className="col-md-3">
                  <div className="category_wrap">
                    <Label> Category Name </Label> <br />
                    <TextBox
                      value={value.name}
                      name="name"
                      onChange={handleChange}
                      placeholder="Category Name"
                    />
                    <p className="error"> {validError ? 'Please enter your category name' : ''} </p>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="button_warp">
                    <button className="submit_warp" onClick={handleClick}>
                      {' '}
                      {editButton ? 'update' : 'Submit'}{' '}
                    </button>
                  </div>
                </div>
              </div>
              <div className="category_grid">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th style={{width: "70px" }}>No.</th>
                      <th>Category Name</th>
                      <th style={{width: "200px" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {showCategory.map((item, id) => (
                      <tr key={id}>
                        <td>{id + 1}</td>
                        {/* <input type="checkbox" checked= {ids.includes(item._id)} onClick={()=>delteid(item._id)}/> */}
                        <td>{item.name}</td>
                        <td>
                          {' '}
                          <div className='icon_wrap'>
                            <button className='edit' title='Edit' onClick={() => handleEdit(item._id)}> <i class="fa fa-edit"></i> Edit </button>
                            <button className='delete' title='Delete' onClick={() => handleDelete(item._id)}> <i class="fa fa-trash"></i> Delete </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
      </div>

      
      <div className="card_wrap">
        
      </div>

      <ToastContainer />
    </>
  )
}

export default Category
