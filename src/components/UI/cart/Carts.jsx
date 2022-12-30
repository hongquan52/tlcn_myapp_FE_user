
import React, {useState,useEffect} from "react";

import { ListGroup } from "reactstrap";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";

import {Button, Dialog, Alert, AlertTitle} from '@mui/material'
import { useDispatch, useSelector } from "react-redux";
import { cartUiActions } from "../../../store/shopping-cart/cartUiSlice";
import { Box, CircularProgress } from '@mui/material'

import "../../../styles/shopping-cart.css";
import { useQuery } from "@tanstack/react-query";
import { thunkCartTypes } from "../../../constants/thunkTypes";
import { getCart } from "../../../api/fetchers/cart";

const Carts = () => {

  const [visible, setVisible] = useState(false)
  const {isLoading, data} = useQuery([thunkCartTypes.GET_CART], getCart);
  const [cartData, setCartData] = useState([])
  useEffect(() => {
    if(data) {
      setCartData(data.data.results.product);
    }
  }, [data])
  const totalBill = cartData.reduce((acc, item) => {
    
    return acc + (item.price * (1-item.discount/100) ) * item.number;
  }, 0)
  totalBill.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")


  const dispatch = useDispatch();
  //const cartProducts = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  
  const toggleCart = () => {
    dispatch(cartUiActions.toggle());
  };
  

  if(isLoading) {
    return (
        <div style={{
            display: "flex",
            height: "100vh",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        </div>
    )
  }
  
  return (
    <div className="cart__container">
      
      <ListGroup className="cart">
        <div className="cart__close">
          <span onClick={toggleCart}>
            <i class="ri-close-fill"></i>
          </span>
        </div>

        <div className="cart__item-list">
          {cartData.length === 0 ? (
            <h6 className="text-center mt-5">Giỏ hàng trống</h6>
          ) : (
            cartData.map((item, index) => (
              <CartItem item={item} key={index}/>
            ))
          )}
          <Link className="m-3" to='/cart'><button onClick={toggleCart} className="addToCart__btn">Chi tiết giỏ hàng</button></Link>
        </div>
        
        <div>
          
          {/* <CAlert color="primary" 
            dismissible visible={visible} 
            onClose={() => setVisible(false)}>
              A simple primary alert—check it out!
          </CAlert> */}
        </div>
        <div className="cart__bottom d-flex align-items-center justify-content-between">
          <h6>
            
            Tổng tiền : <span>{totalBill} VNĐ</span>
          </h6>
          <button>
            <Link to="/checkout" onClick={toggleCart}>
              Thanh toán
            </Link>
          </button>
        </div>
      </ListGroup>
    </div>
  );
};

export default Carts;