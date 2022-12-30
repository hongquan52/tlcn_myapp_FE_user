import React, {useRef, useState, useEffect} from 'react'
import { Container } from "reactstrap"
import logo from '../../assets/images/res-logo.png'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
// import {LogoutIcon} from '@mui/icons-material'
import { cartUiActions } from '../../store/shopping-cart/cartUiSlice'

import "../../styles/header.css";
import { useQuery } from '@tanstack/react-query'
import { thunkCartTypes } from '../../constants/thunkTypes'
import { getCart } from '../../api/fetchers/cart'

import {Button, Dialog, Alert, AlertTitle} from '@mui/material'

const userInfo = JSON.parse(sessionStorage.getItem("userInfo")) 


const nav__links = [
  {
    display: "Trang chủ",
    path: "/home",
  },
  {
    display: "Tất cả sản phẩm",
    path: "/foods",
  },
  // {
  //   display: "Giỏ hàng",
  //   path: "/cart",
  // },
  // {
  //   display: "",
  //   path: "/contact",
  // },
  // {
  //   display: "Admin",
  //   path: '/admin'
  // },
  userInfo ? {
    display: "Thông tin người dùng",
    path: `/userinformation/${userInfo.customer?.uid}`
    
  } : null
  ,
  {
    display: "Lịch sử mua hàng",
    path: "/historyOrder",
  },
  
]

const Header = () => {
  const {data} = useQuery([thunkCartTypes.GET_CART], getCart)
  
  console.log('data cart: ', data?.data?.results?.product)
  const [quantity, setQuantity] = useState(0)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const menuRef = useRef(null)
  const toggleMenu = () => menuRef.current.classList.toggle('show__menu')
  const headerRef = useRef(null)
  const totalQuantity = useSelector(state => state.cart.totalQuantity)

  const dispatch = useDispatch()
  const toggleCart = () => {
    dispatch(cartUiActions.toggle());
  };
  
  useEffect(() => {
    if(data) {
      setQuantity(data.data.results.product.length)
    }
  }, [data])

  const logout = () => {
    sessionStorage.removeItem("userInfo")
    sessionStorage.removeItem("cartId")

    handleClick()
    navigate('/login')
    window.location.reload();
    
  }
  const handleClick = () => {
    setOpen(!open);
  };
  const soLuongSanPhamTrongGioHang = data?.data?.results?.product.reduce((acc, currentValue) => {
    return acc + currentValue.number
  }, 0)
  return (
    
    <header className="header" >
      <Container>
        <div className="nav__wrapper d-flex align-items-center justify-content-between">
          
          <div className="logo">
            <Link to="/home">
              <img src={logo} alt="logo" />
            </Link>
            <h5>Gaming shop</h5>
          </div>
          

          {/* ======= menu ======= */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <div className="menu d-flex align-items-center gap-5">
              {nav__links.map((item, index) => (
                <NavLink
                
                  to={item?.path}
                  key={index}
                  className={navClass => navClass.isActive ? 'active__menu' : ''}
                >
                  {item?.display}
                </NavLink>
              ))}
            </div>
          </div>
          
          {/* nav right icon */}
          {/* <p>Hello {userInfo.username}</p> */}
          {
            userInfo ? (
              <>
                <p>Hello {userInfo.customer?.username}</p>
                {/* <button className='logout__btn' onClick={logout}>Log out</button> */}
                {/* <span onClick={logout}><LogoutIcon/></span> */}
                
              </>
              
            )
            : null
          }
          <div>
            <Dialog open={open} onClose={handleClick}>
                  <Alert

                    //props go here
                  >
                    <AlertTitle>Tài khoản</AlertTitle>
                    Đăng xuất thành công
                  </Alert>
              </Dialog>
          </div>
          <div className="nav__right d-flex align-items-center gap-4">
            <span className="cart__icon" onClick={toggleCart}>
              <i class="ri-shopping-cart-fill"></i>
              {/* <span className="cart__badge">{totalQuantity}</span>
              <span className="cart__badge">{quantity}</span> */}
              <span className="cart__badge">{soLuongSanPhamTrongGioHang}</span>
              
            </span>

            <span className="user">
              {
                userInfo ? (
                    <span onClick={logout}>
                      <Link to={'/login'}>
                    <i class="ri-logout-box-r-line"></i>
                    </Link>
                    </span>
                    
                  
                ) :
                ( 
                  <span>
                    <Link to="/login">
                  <i class="ri-user-line" ></i>
                  </Link></span>
                    
                  
                  
                )
              }
              
              
            </span>
            
            <span className="mobile__menu" onClick={toggleMenu}>
              <i class="ri-menu-line"></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  )
}

export default Header 