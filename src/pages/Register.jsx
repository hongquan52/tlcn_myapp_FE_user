import React, {useRef, useState} from 'react'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/common-section/CommonSection'
import { Container, Row, Col } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import { createUser } from '../api/fetchers/user'
import {Button, Dialog, Alert, AlertTitle} from '@mui/material'


import { useForm } from "react-hook-form";

const Register = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (dataForm) => {

    const messageErr = document.querySelector('.response');
    if(password !== passwordAgain) {
      messageErr.innerText = "Mật khẩu đăng kí không trùng khớp"
      alert(password.length);
    }
    else if(password.length < 6) {
      messageErr.innerText = "Độ dài mật khẩu dưới 6 kí tự"
    }
    else {
      const {
        data: {success}
      } = await createUser(dataForm);
      if(success === true)
      {
        messageErr.innerText = "Dang ki Thanh cong"
        navigate("/login");
      }
    }
  }
  const handleClick = () => {
    setOpen(!open);
  };

  const passwordAgain = document.getElementById("passwordAgain")?.value
  const password = document.getElementById("password")?.value

  return (
      <Helmet title='register'>
        <CommonSection title='Đăng kí tài khoản' />
        <section>
          <Container>
            <Row>
              <Col lg='6' md='6' sm='12' className='m-auto text-center'>
                <form 
                  className='form mb-5' 
                  id="form" 
                  onSubmit={handleSubmit(onSubmit)}>
                  
                  <div className="form__group">
                    <input 
                      type="text"
                      placeholder="Username"
                      {...register("username", { required: true })}
                    />
                  
                  </div>
                  <div className="form__group">
                    <input
                      id='password' 
                      type='password'
                      placeholder='Password'
                      {...register("password", { required: true })}

                    />
                  </div>
                  <div className="form__group">
                  <input
                    id='passwordAgain' 
                    type='password'
                    placeholder='Password again'
                    
                  />

                  </div>
                  
                  <div className="form__group">
                  <input 
                    type='text'
                    placeholder='Email'
                    {...register("email", { required: true })}

                  />

                  </div>
                  <div className="form__group">

                  <input 
                    type='text'
                    placeholder='Phone'
                    {...register("phone", { required: true })}

                  />
                  </div>
                  
                  {errors.username && (
                  <span className="message">Trường username là bắt buộc.</span>
                  )}
                  {errors.password && (
                  <span className="message">Trường password là bắt buộc.</span>
                  )}
                  <span className="response"></span>
                  
                  <Dialog open={open} onClose={handleClick}>
                      <Alert

                        //props go here
                      >
                        <AlertTitle>Tài khoản</AlertTitle>
                        Đăng ký thành công
                      </Alert>
                  </Dialog>
                  <button 
                    onClick={handleClick}
                    className="addToCart__btn">
                    
                    Đăng kí
                    </button>
                </form>
                
              </Col>
            </Row>
          </Container>
        </section>
      </Helmet>
    )
}

  

export default Register