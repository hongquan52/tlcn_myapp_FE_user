import React, {useRef, useState} from 'react'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/common-section/CommonSection'
import { Container, Row, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import { login } from '../api/fetchers/user'
import '../styles/login.css'

import {Button, Dialog, Alert, AlertTitle} from '@mui/material'


const Login = () => {
  const [open, setOpen] = useState(false);

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
    const {
      data: { code, message, results, success },
    } = await login(dataForm);
    if (success === true) {
      messageErr.innerText = "Thanh cong"
      // localStorage.setItem("userInfo", JSON.stringify(results));
      sessionStorage.setItem("userInfo", JSON.stringify(results));
      
      
      navigate("/home");
      window.location.reload();
    }
    
  };

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
                  {...register("username", { required: true })}
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