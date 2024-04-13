import React, { useState } from 'react'
import { useNavigate} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../login/login.scss';
import { TextBox } from "@progress/kendo-react-inputs";
import { Label } from "@progress/kendo-react-labels";
import axios from 'axios';

const Login = () => {

  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const [erromsg, setErromsg] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [validError, setValidError] = useState(null);


  const eventInputChange = (event) => {
    setLogin({
      ...login,
      [event.target.name]: event.target.value
    });
  }

  const eventFormSubmit = async (event) =>{
    event.preventDefault();

    if (!login.email ) {
      setValidError('Please enter your email address');
      return
    } if (!login.password){
      setValidError('Please enter your password');
      return
    }

    try {
      await axios.post(`http://localhost:3000/user/adminLogin`, login).then((res) => {
        
        if(res.status===200) {
          const data = res.data;
          const token = data?.data?.token;
          localStorage.setItem('token', token);

          toast.success('Login successful', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            navigate('/category');
          },500)
        }
      })
      // setSuccessMessage(response.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
        });
      // setErromsg(error?.response?.data?.message)
    }

    // const handlelogin = async () => { 
    //   if (!formData.first_name ) {
    //     setValidError('first name required');
    //     return
    //   } if (!formData.last_name){
    //         setValidError('Last name required');
    //         return
    //   } 
    // }

    // const response = await fetch("http://localhost:3000/user/adminLogin", {
    //   method: "POST",
    //   body: JSON.stringify(login),
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // });
    // const json = await response.json();
    // if (response.ok){
    //   navigate("/admindashboard");
    // } else {
    //   console.log(json);
    // }

  }


  return (
    <>
      <div className='login_wrap'>
        <div className='login_details'>
          <div className='login_head'>
            <h4> Login </h4>
            {erromsg && <div>{erromsg}</div>}
            {successMessage && <div>{successMessage}</div>}
          </div>
          <form onSubmit={eventFormSubmit}>
            <div className='login_info'>
              <div className='info_wrap'>
                <Label> Email Address </Label> <br/>
                <TextBox placeholder="email@gmail.com" name="email" value={login.email} onChange={eventInputChange} />
                {/* <p> Please Enter Email Address </p> */}
                <p className='error'> {validError ? 'Please enter your email address' : ''} </p>
              </div>
              <div className='info_wrap'>
                <Label> Password </Label> <br/>
                <TextBox placeholder="Password$123" name="password" value={login.password} onChange={eventInputChange} />
                {/* <p> Please Enter Email Password </p> */}
                <p className='error'> {validError ? 'Please enter your password' : ''} </p>
              </div>
            </div>
            <div className='login_btn'>
              <a>
                <button > Login </button>
              </a>
            </div>

            {/* <div className='login_btn'>
              <a href='/dashboard'>
                <button path='/dashboard'> Login </button>
              </a>
            </div> */}
          </form>
          <div className='wrap_details'>
            <p> Don't have an account? <a href='/register'> Sign Up </a> </p>
          </div>
        </div>
      </div>
    </>
  )

}

export default Login;