import React, { useState } from 'react'
import '../register/register.scss'
import { TextBox } from "@progress/kendo-react-inputs";
import { Label } from "@progress/kendo-react-labels";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Register = () => { 

    const navigate = useNavigate();
    const [formData, setFormData] = useState({ first_name: '', last_name: '', email: '', password: '', phone: '' });
    const [successMessage, setSuccessMessage] = useState(null);
    const [erromsg, setErromsg] = useState(null);
    const [validError, setValidError] = useState(null);

    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleRegister = async () => {
        if (!formData.first_name ) {
             setValidError('first name required');
             return
        } if (!formData.last_name){
             setValidError('Last name required');
             return
        } else {
            try {
                const res = await axios.post(`http://localhost:3000/user/adminregister`, formData);
                

                if(res.status===200) {
                    const data = res.data;
                    const token = data.token;
                    localStorage.setItem('token', token);
                    toast.success('Registration successful', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                        setTimeout(() => {
                        navigate('/');
                    },2000);

                    // navigate('/');
                    // setSuccessMessage(response.data.message)
                }

                
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
                // console.log('error =>', error);
                // setErromsg(error?.response?.data?.message)
            }
        }
    }


    return (
        <>
            <div className='login_wrap'>
                <div className='login_details'>
                    <div className='login_head'>
                        <h4> Sign Up </h4>
                        {erromsg && <div>{erromsg}</div>}
                        {successMessage && <div>{successMessage}</div>}
                    </div>
                    <div className='login_info' onSubmit={handleSubmit}>
                        <div className='info_wrap'>
                            <Label> First Name </Label> <br />
                            <TextBox value={formData.first_name} name='first_name' onChange={handleOnChange} placeholder="First Name" />
                            <p className='error'> {validError ? 'Please enter your first name' : ''} </p>
                        </div>
                        <div className='info_wrap'>
                            <Label> Last Name </Label> <br />
                            <TextBox value={formData.last_name} name='last_name' onChange={handleOnChange} placeholder="Last Name" />
                            <p className='error'> {validError ? 'Please enter your last name' : ''} </p>
                        </div>
                        <div className='info_wrap'>
                            <Label> Email Address </Label> <br />
                            <TextBox value={formData.email} name='email' onChange={handleOnChange} placeholder="email@gmail.com" />
                            <p className='error'> {validError ? 'Please enter your email address' : ''} </p>
                        </div>
                        <div className='info_wrap'>
                            <Label> Password </Label> <br />
                            <TextBox value={formData.password} name='password' onChange={handleOnChange} placeholder="Password@XYZ" />
                            <p className='error'> {validError ? 'Please enter your password' : ''} </p>
                        </div>
                        <div className='info_wrap'>
                            <Label> Phone Number </Label> <br />
                            <TextBox value={formData.phone} name='phone' onChange={handleOnChange} placeholder="+91 XXXXX XXXXX" />
                            <p className='error'> {validError ? 'Please enter your phone number Required' : ''} </p>
                        </div>
                    </div>
                    <div className='login_btn'>
                        <a onClick={handleRegister}>
                            <button type='submit'> Sign Up </button>
                        </a>
                    </div>
                    <div className='wrap_details'>
                        <p> Already have an account? <a href='/'> Login </a> </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register