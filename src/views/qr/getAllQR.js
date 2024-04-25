import { TextBox } from '@progress/kendo-react-inputs'
import { Table } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'
import { Label } from '@progress/kendo-react-labels'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import '../qr/allqr.scss'

const GetAllQR = () => {
  const [qrData, setQRdata] = useState({ table_no: '' })
  const [allQRcode, setAllQRcode] = useState([])
  const [validError, setValidError] = useState(null)
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

    if (!qrData.table_no) {
      setValidError('Please enter your table number')
      return
    }

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

      <div className='main_card'>
          <div className='heading_wrap'>
              <h5> QR Code </h5>
          </div>
          <div className='card_details'>
            <div className="qr_detail">
              <div className="row">
                <div className="col-md-2">
                  <div className="qr_grid">
                    <Label> Table No. </Label> <br />
                    <TextBox
                      value={qrData.table_no}
                      name="table_no"
                      onChange={handleChange}
                      placeholder="Add Table Number"
                    />
                    <p className="error"> {validError ? 'Please enter table number' : ''} </p>
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
              <div className="qr_grid">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th style={{width: "120px" }}>Table No.</th>
                      <th>QR Code</th>
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
      </div>
      <ToastContainer />
    </>
  )
}
export default GetAllQR
