import { TextBox } from '@progress/kendo-react-inputs'
import { Table } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'
import { Label } from '@progress/kendo-react-labels'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

const GetAllQR = () => {
  const [qrData, setQRdata] = useState({ table_no: '' })
  const [allQRcode, setAllQRcode] = useState([])
  const gettoken = localStorage.getItem('token')
  const handleChange = (e) => {
    setQRdata({ ...qrData, [e.target.name]: e.target.value })
  }
  //get All QR code
  const getAllQRcode = async () => {
    let response = await axios.get(
      'http://localhost:3000/admin/tableRoutes/qrCodes', //All QR link here
      {
        headers: {
          Authorization: `Bearer ${gettoken}`,
        },
      },
    )
    setAllQRcode(response.data)
  }

  useEffect(() => {
    getAllQRcode()
  }, [])

  const handleClick = async (e) => {
    e.preventDefault()
    const response = await axios.post(
      `http://localhost:3000/admin/tableRoutes/generateQR/${qrData.table_no}`,
      {
        headers: {
          Authorization: `Bearer ${gettoken}`,
        },
      },
    )
    toast.success('QR code Generated successfully!')
    getAllQRcode()

  }
  return (
    <>
      <div className="header_wrap">
        <h5> Category </h5>
      </div>
      <div className="card_wrap">
        <div className="category_detail">
          <div className="row">
            <div className="col-md-3">
              <div className="category_wrap">
                <Label> Table No. </Label> <br />
                <TextBox
                  value={qrData.table_no}
                  name="table_no"
                  onChange={handleChange}
                  placeholder="Add table number"
                />
                {/* <p className="error"> {validError ? 'Please enter your category name' : ''} </p> */}
              </div>
            </div>
            <div className="col-md-2">
              <div className="button_warp">
                <button className="submit_warp" onClick={handleClick}>
                  {' '}
                  Add QR
                </button>
              </div>
            </div>
          </div>
          <div className="category_grid">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Table No.</th>
                  <th>QR</th>
                  {/* <th></th> */}
                </tr>
              </thead>
              <tbody>
                {allQRcode.map((item, id) => (
                  <tr key={id}>
                    <td>{item.number}</td>
                    <td>
                        <img src={item.qrCode}/>
                    </td>
                    {/* <td>
                      {' '}
                      <button onClick={() => handleDelete(item._id)}>delete</button>
                      <button onClick={() => handleEdit(item._id)}> Edit </button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  )
}
export default GetAllQR
