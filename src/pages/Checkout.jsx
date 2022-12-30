import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'
import CommonSection from '../components/UI/common-section/CommonSection'
import Helmet from '../components/Helmet/Helmet'
import { Combobox, DropdownList } from "react-widgets"
import '../styles/checkout.css'
import { useQuery } from '@tanstack/react-query'
import { thunkCartTypes, thunkOrderTypes } from '../constants/thunkTypes'
import { getCart } from '../api/fetchers/cart'
import { useEffect } from 'react'
import { API } from '../api/baseUrl'
import {useNavigate} from 'react-router-dom'

import {InputLabel, MenuItem, Select, FormControl} from '@mui/material'
import { pay } from '../api/fetchers/pay'
import { useRef } from 'react'



const userInfo = JSON.parse(sessionStorage.getItem("userInfo"))

const api = 'localhost:3000/api/v1/order'

const Checkout = () => {
  const navigate = useNavigate()
  const ref = useRef()

  const [enterEmail, setEnterEmail] = useState(userInfo.customer.email)
  const [enterPhone, setEnterPhone] = useState(userInfo.customer.phone)
  const [enterStreet, setEnterStreet] = useState(userInfo.customer.address[0].street)
  const [enterWard, setEnterWard] = useState(userInfo.customer.address[0].ward)
  const [enterDistrict, setEnterDistrict] = useState(userInfo.customer.address[0].district)
  const [enterProvince, setEnterProvince] = useState(userInfo.customer.address[0].province)
  const [enterTypePayment, setEnterTypePayment] = useState("PAYPAL")

  const { isLoading, data } = useQuery([thunkCartTypes.GET_CART], getCart)
  const [cartData, setCartData] = useState([])
  //console.log(userInfo.customer?.uid)
  

  const cartTotalAmount = cartData?.reduce((acc, item) => {
    return acc + item.number * (item.price*(100-item.discount)/100)
  },0)
  const tong = Number(cartTotalAmount.toFixed(0))
  const phiShip = Number((tong*0.01).toFixed(2))
  console.log('cartData: ',cartData)
  
  // if(tong > 3000) {
  //   phiShip = Number((tong*0).toFixed(2))
  // } else if(tong <= 3000 && tong > 1000) {
  //   phiShip = Number((tong*0.05).toFixed(2))
  // }
  // else {
  //   phiShip = Number((tong*0.1).toFixed(2))
    
  // }

  
  const totalAmount = Number(tong + phiShip)

  const submitHandler  = async (e) => {
    console.log(enterTypePayment)
    console.log(enterDistrict)
    console.log(enterStreet)
    console.log(enterProvince)
    console.log(enterWard)

    e.preventDefault()

    
    var raw = {
      "address": {
        "street": enterStreet,
        "province": enterProvince,
        "district": enterDistrict,
        "ward": enterWard,
      },
      "transportFee": 0,
      "typePayment": enterTypePayment,
      "phone": enterPhone,
      "email": enterEmail,
      "totalAmount": {
        "total": totalAmount,
        "discount": 1000
      }
    };

    await API.post('/api/v1/order', raw)
    
    // redirect by type payment
    if(enterTypePayment === 'PAYPAL') {
      const form = {
        price: `${totalAmount}`
      };
      const {data} = await pay(form);
      console.log('Data: :' ,data)
      if(data) {
        ref.current.href = data
        window.onload = document.getElementById("redirect").click();
      }
    }
    else if(enterTypePayment === 'COD') {
      navigate('/successOrder')
    }
  }

  // const handlePay = async () => {
  //   if(enterTypePayment === 'PAYPAL') {
  //     const form = {
  //       price: `${totalAmount}`
  //     };
  //     const {data} = await pay(form);
  //     console.log('Data: :' ,data)
  //     if(data) {
  //       ref.current.href = data
  //       window.onload = document.getElementById("redirect").click();
  //     }
  //   }
  //   else if(enterTypePayment === 'COD') {
  //     navigate('/successOrder')
  //   }
  // }

  useEffect(() => {
    if (data) {
      setCartData(data.data.results.product)
    }
  }, data)
  // console.log(enterTypePayment)

  return (
    <Helmet title='Checkout'>
      <CommonSection title='Thanh toán' />
      <section>
        <Container>
          <Row>
            <Col lg='8' md='6'>
              <h6 className='mb-4'>Địa chỉ giao hàng</h6>
              <form className="checkout__form" onSubmit={submitHandler}>
                <div className="form__group">
                  <label>Email</label>
                  <input type="text" value={enterEmail}
                    required
                    onChange={e => setEnterEmail(e.target.value)}
                  />
                </div>
                <div className="form__group">
                <label>Phone</label>

                  <input type="text" value={enterPhone}
                    required
                    onChange={e => setEnterPhone(e.target.value)} />
                </div>
                <div className="form__group">
                <label>Street</label>

                  <input type="text" value={enterStreet}
                    required
                    onChange={e => setEnterStreet(e.target.value)} />
                </div>
                <div className="form__group">
                <label>Ward</label>

                  <input type="text" value={enterWard}
                    required
                    onChange={e => setEnterWard(e.target.value)} />
                </div>
                <div className="form__group">
                <label>District</label>

                  <input type="text" value={enterDistrict}
                    required
                    onChange={e => setEnterDistrict(e.target.value)} />
                </div>
                <div className="form__group">
                <label>Province</label>

                  <input type="text" value={enterProvince}
                    required
                    onChange={e => setEnterProvince(e.target.value)} />
                </div>

                <div className="form__group">
                  <label>Phương thức thanh toán</label>
                  {/* <DropdownList
                    value={enterTypePayment}
                    onChange={(nextValue) => setEnterTypePayment(nextValue)}
                    data={["COD", "PAYPAL"]}
                  /> */}
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label"></InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Type payment"
                      value={enterTypePayment}
                      onChange={(e) => setEnterTypePayment(e.target.value)}
                    >
                      <MenuItem value='PAYPAL'>Paypal</MenuItem>
                      <MenuItem value='COD'>COD</MenuItem>
                      
                    </Select>
                  </FormControl>
                  
                  </div>
                  <button 
                    className="addToCart__btn"
                    // onClick={handlePay}
                  >
                    Thanh toán
                  </button>
              </form>
              

            </Col>
            <Col lg='4' md='6'>
              <div className='checkout__bill'>
                <h6 className='d-flex align-items-center justify-content-between mb-3'>Tổng: <span>{cartTotalAmount} VNĐ</span></h6>
                <h6 className='d-flex align-items-center justify-content-between mb-3'>Phí vận chuyển: 
                    {/* {
                      phiShip === 0 ? (
                        <span>FREE SHIP</span>
                      ) :
                      (
                        <span>{phiShip} $</span>
                      )
                    } */}
                    <span>{phiShip} VNĐ</span>
                </h6>
                <div> 
                  <h5 className='d-flex align-items-center justify-content-between checkout__total'>Tổng tiền: <span>{totalAmount} VNĐ</span></h5>
                </div>
              </div>
            </Col>
          </Row>
          <a href rel="noreferrer" id="redirect" ref={ref}></a>

        </Container>
      </section>
    </Helmet>
  )
}

export default Checkout