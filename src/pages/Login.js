import React, { useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon
}
    from 'mdb-react-ui-kit';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Url } from '../AppSettings';

function LoginForm() {
    const isAdmin = JSON.parse(localStorage.getItem("user"))?.token ?? false

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailError('');
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Email doğrulaması
        if (!email) {
            setEmailError('E-posta adresi zorunludur');
        } else if (!isValidEmail(email)) {
            setEmailError('Geçerli bir e-posta adresi girin');
        }

        // Şifre doğrulaması
        if (!password) {
            setPasswordError('Şifre zorunludur');
        } else if (password.length < 8) {
            setPasswordError('Şifre en az 8 karakter olmalıdır.');
        }

        if (email && isValidEmail(email) && password && password.length >= 8) {
            login(email, password)
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
    }

    const login = async (username, password) => {
        const API_BASE_URL = Url + "/api"
        const response = await axios.post(API_BASE_URL + '/User/Login', {
            username,
            password,
        })
        const resp = response.data
        if (resp?.isSuccess && resp?.data?.token) {
            localStorage.setItem('user', JSON.stringify(resp.data))
            navigate(`/`)
        }
        return response.data
    }

    const isMobile = () => {
        const { innerWidth: width, innerHeight: height } = window;
        return width < height;
    }

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
        // E-posta adresi doğrulama işlemleri
        // Geçerli bir e-posta adresi kontrolü için regex veya başka bir yöntem kullanabilirsiniz
        // return true; // veya false
    };


    return (
        // <MDBContainer fluid >

        //   <MDBRow className='d-flex justify-content-center align-items-center h-100' >
        //     <MDBCol col='12'>
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            backgroundColor: "white"
        }}>
            <MDBCard className='bg-black text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
                <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

                    <img src="images/logo.jpeg" style={{
                        width: isMobile() ? "200px" : "250px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 50
                    }}></img>
                    {!isAdmin && <h2 className="fw-bold mb-2 text-uppercase" style={{ color: "white", fontSize: 30 }}>Login</h2>}
                    {!isAdmin ? <>
                        <MDBInput
                            wrapperClass='mb-2 mx-5 w-100'
                            labelClass='text-white'
                            label='Email address'
                            id='formControlLgEmail'
                            type='email'
                            size="m"
                            color='white'
                            style={{ color: 'white' }}
                            onChange={handleEmailChange}
                            error={emailError}
                        />
                        {emailError && <div className="error-message" style={{ color: "red", marginBottom: 10, fontSize: 12, marginRight: "auto" }}>{emailError}</div>}

                        <MDBInput
                            wrapperClass='mb-2 mx-5 w-100'
                            labelClass='text-white'
                            label='Password'
                            id='formControlLgPassword'
                            style={{ color: 'white' }}
                            type='password'
                            size="m"
                            onChange={handlePasswordChange}
                        />
                        {passwordError && <div className="error-message" style={{ color: "red", marginBottom: 10, fontSize: 12, marginRight: "auto" }}>{passwordError}</div>}


                        <p className="small mb-3 pb-lg-2"><a className="text-white-150" href="#!" style={{ color: "white" }}>Forgot password?</a></p>
                        <MDBBtn outline className='mx-2 px-5' color='white' size='lg' style={{ color: 'white' }} onClick={handleSubmit} >
                            Login
                        </MDBBtn>
                    </>
                        : 
                        <MDBBtn outline className='mx-2 px-5' color='white' size='lg' style={{ color: 'white' }} onClick={handleLogout} >
                            Logout
                        </MDBBtn>
                    }

                </MDBCardBody>
            </MDBCard>
        </div>

    );
}

export default LoginForm;