import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'
import CommonSection from '../components/UI/common-section/CommonSection'
import Helmet from '../components/Helmet/Helmet'
import { Combobox, DropdownList } from "react-widgets"
import '../styles/checkout.css'
import { useQuery } from '@tanstack/react-query'
import { thunkAddressTypes, thunkCartTypes, thunkOrderTypes, thunkUserTypes } from '../constants/thunkTypes'
import { getCart, getProductInCart } from '../api/fetchers/cart'
import { useEffect } from 'react'
import { API } from '../api/baseUrl'
import {useNavigate} from 'react-router-dom'

import {InputLabel, MenuItem, Select, FormControl} from '@mui/material'
import { pay } from '../api/fetchers/pay'
import { useRef } from 'react'
import { getUSer } from '../api/fetchers/user'
import { getAddressByUser } from '../api/fetchers/address'



const userInfo = sessionStorage.getItem("userID")

const cartId = sessionStorage.getItem("cartId")


const Checkout = () => {
  const navigate = useNavigate()
  const ref = useRef()
  const queryGetUser = useQuery([thunkUserTypes.GET_USER], () => getUSer(userInfo) );
  const queryGetAddressByUser = useQuery([thunkAddressTypes.GET_ADDRESS_BY_USER], () => getAddressByUser(userInfo) );

  const [userData, setUserData] = useState([]);
  const [addressData, setAddressUser] = useState([])
  const [addressIdBill, setAddressIdBill] = useState(0)

  const [enterTypePayment, setEnterTypePayment] = useState("COD")

  const {isLoading, data} = useQuery([thunkCartTypes.GET_PRODUCT_IN_CART],
    () => getProductInCart(cartId) );
  const [cartData, setCartData] = useState([])
  //console.log(userInfo.customer?.uid)
  

  const cartTotalAmount = cartData?.reduce((acc, item) => {
    return acc + item.amount * (item.price*(100-item.promotion)/100)
  },0)
  const tong = Number(cartTotalAmount.toFixed(0))
  const phiShip = Number((tong*0.01).toFixed(2))
  console.log('cartData: ',cartData)
  

  var today = new Date();
  var date =today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
  
  console.log( date)
  
  
  const totalAmount = Number(tong + phiShip)

  const submitHandler  = async (e) => {
    
    var formdata = new FormData();
    formdata.append("status", "waiting_confirm");
    formdata.append("paymentMethod", enterTypePayment);
    formdata.append("payDate", date);
    formdata.append("totalPrice", totalAmount);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch(`http://localhost:8080/api/v1/bill?userId=${userInfo}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    
    localStorage.setItem("addressIdBill", addressIdBill);
    

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
    //

    
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
    if (data && queryGetUser.data && queryGetAddressByUser.data) {
      setCartData(data.data)
      setUserData(queryGetUser.data.data)
      setAddressUser(queryGetAddressByUser.data.data)
    }
  }, [data, queryGetUser.data, queryGetAddressByUser.data])
  // console.log(enterTypePayment)
  console.log("address data: ", addressData)
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
                  <input type="text" value={userData.email}
                    
                  />
                </div>
                <div className="form__group">
                <label>Phone</label>

                  <input type="text" value={userData.phone} />
                    
                </div>
                {
                  addressData.map((item) => {
                    if(item.defaultAddress === true) {
                      // setAddressIdBill(item.address.id);
                      // console.log("item.address.id",item.address.id)
                      localStorage.setItem('AddressIdBill', item.address.id);
                      return (
                        <>
                        <div className="form__group">
                          <label>Street</label>

                            <input type="text" value={item.address.apartmentNumber}
                              // required
                              />
                          </div>
                          <div className="form__group">
                          <label>Ward</label>

                            <input type="text" value={item.address.ward}
                              // required
                              />
                          </div>
                          <div className="form__group">
                          <label>District</label>

                            <input type="text" value={item.address.district}
                              // required
                              />
                          </div>
                          <div className="form__group">
                          <label>Province</label>

                            <input type="text" value={item.address.province}
                              // required
                              />
                          </div>
                        </>
                      )
                    }
                  }
                  )
                }

                <div className="form__group">
                  <label>Phương thức thanh toán</label>
                  
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