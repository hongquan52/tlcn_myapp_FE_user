import React, {useRef, useState} from 'react'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/common-section/CommonSection'
import { Container, Row, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import { login } from '../api/fetchers/user'
import '../styles/login.css'
import jwtDecode from 'jwt-decode'
import {Button, Dialog, Alert, AlertTitle} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { thunkCartTypes } from '../constants/thunkTypes'
import { getCart } from '../api/fetchers/cart'


const Login = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([])

  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (dataForm) => {
    const messageErr = document.querySelector('.response');
    const info = document.querySelector('.info');
    const {email, password} = dataForm;

    // const {
    //   data: { status, message, data },
    // } 
    //  = await login(dataForm);
    // console.log("Login response: ", status, message, data);
    // if (status ="OK") {
    //   messageErr.innerText = message;
      
    //   // sessionStorage.setItem("userInfo", JSON.stringify(results));
      
      
    //   // navigate("/home");
    //   // window.location.reload();
    // }

    var formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch("http://localhost:8080/auth/login", requestOptions)
      .then(response => response.text())
      .then(result => 
        {
          
          setData(JSON.parse(result));
        })
      .catch(error => console.log('error', error));
    
    console.log("Data login 1111111: ", data);
    
    sessionStorage.setItem("userName", data.data.name)
    decoded(data.data.accessToken);
    
    if(data.data) {
      // let userID = sessionStorage.getItem("userID")
      // getCartByUserID(userID);
      navigate("/home")
      window.location.reload();
    }
    else {
      messageErr.innerText = "Đăng nhập thất bại";
    }
      
  };
  
  const decoded = (token) => {
    const decoded = jwtDecode(token);
    const manguoidung = decoded.sub
    const manguoidung1 = parseInt(manguoidung);
    console.log("Mã khách hàng: ", manguoidung1);
    sessionStorage.setItem("userID", manguoidung1);
  }
  
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Helmet title='Login'>
      <CommonSection title='Đăng nhập' />
      <section>
        <Container>
          <Row>
            <Col lg='6' md='6' sm='12' className='m-auto text-center'>
              <form className='form mb-5' id="form" onSubmit={handleSubmit(onSubmit)}>
                
                <div className="form__group">
                <input 
                  type="text"
                  placeholder="Username"
                  {...register("email", { required: true })}
                />
                
                </div>
                <div className="form__group">
                <input 
                  type='password'
                  placeholder='Password'
                  {...register("password", { required: true })}

                />
                </div>
                {errors.username && (
                <span className="message">Trường username là bắt buộc.</span>
                )}
                {errors.password && (
                <span className="message">Trường password là bắt buộc.</span>
                )}
                <span className="response"></span>
                <div>
                  <p className='info'></p>
                  
                </div>
                
                <button
                  onClick={handleClick}
                  className="addToCart__btn">
                  Login
                  </button>
              </form>
              <Dialog open={open} onClose={handleClick}>
                <Alert

                  //props go here
                >
                  <AlertTitle>Tài khoản</AlertTitle>
                  Đăng nhập thành công
                </Alert>
            </Dialog>
              <Link to='/register'>Create an new account</Link>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Login