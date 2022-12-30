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

    // const { firstname, lastname, email, phone, username, password } = dataForm;
    // const formData = new FormData();
    // formData.set("firstname", firstname);
    // formData.set("lastname", lastname);
    // formData.set("email", email);
    // formData.set("phone", phone);
    // formData.set("username", username);
    // formData.set("password", password);
    
    // formData.set("address", address);

    const {
      data: {success}
    } = await createUser(dataForm);
    if(success === true)
    {
      navigate("/login");
    }
    // if(success === true) {
    //   messageErr.innerText = "Dang ki Thanh cong"
    // }

    // alert('Tien hanh dang ki...')
    // navigate("/login");
  }
  const handleClick = () => {
    setOpen(!open);
  };

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
                      type='password'
                      placeholder='Password'
                      {...register("password", { required: true })}

                    />
                  </div>
                  <div className="form__group">
                  <input 
                    type='text'
                    placeholder='firstname'
                    {...register("firstname", { required: true })}

                  />

                  </div>
                  <div className="form__group">
                  <input 
                    type='text'
                    placeholder='lastname'
                    {...register("lastname", { required: true })}

                  />

                  </div>
                  <div className="form__group">
                  <input 
                    type='text'
                    placeholder='email'
                    {...register("email", { required: true })}

                  />

                  </div>
                  <div className="form__group">

                  <input 
                    type='text'
                    placeholder='phone'
                    {...register("phone", { required: true })}

                  />
                  </div>
                  {/* <div className="form__group">
                  <input 
                    type='text'
                    placeholder='address'
                    {...register("address", { required: true })}

                  />

                  </div> */}
                  
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
                    {/* <Link to={`/home`}>Đăng nhập</Link> */}
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