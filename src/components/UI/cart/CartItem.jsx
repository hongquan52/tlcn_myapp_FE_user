import React from 'react'
import {DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';

import { ListGroupItem } from 'react-bootstrap'
import '../../../styles/cart-item.css'

import { useDispatch } from 'react-redux'
import { cartActions } from '../../../store/shopping-cart/cartSlice'
import { useState } from 'react'
import { Button, Dialog, Alert, AlertTitle } from '@mui/material'
import { deleteCart } from '../../../api/fetchers/cart'

const cartId = sessionStorage.getItem("cartId")

const CartItem = ({ item }) => {
    //----NOTIFY delete-----------------------------------------
    const [openNotify, setOpenNotify] = React.useState(false);

    const handleClickOpenNotify = () => {
        setOpenNotify(true);
    };

    const handleCloseNotify = () => {
        setOpenNotify(false);
    };
    //----------------------------------------------------------------
    const { productId, number, name, image, price, discount } = item
    const discountPrice = price - price * discount / 100
    const [soLuong, setSoLuong] = useState(number);

    const dispatch = useDispatch()

    //   const handleClick = () => {
    //     setOpen(!open);
    //   };
    const increaseItem = () => {
        //   dispatch(cartActions.addItem({
        //     productId,
        //       name: 'product name',
        //       image: 'https://phuongtung.vn/pt/images/detailed/32/iphone-14-pro-tim_u11b-by_rmmz-lr_n3hg-4z.png',
        //       price
        //   }))

        // call API
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "productId": productId,
            "number": 1,
            "price": discountPrice,
        });


        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`http://localhost:3000/api/v1/cart/${cartId}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        //------
        setSoLuong(soLuong + 1)
        window.location.reload();


    }
    const decreaseItem = () => {
        // dispatch(cartActions.removeItem(productId))

        // call API
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "productId": productId,
            "number": -1,
            "price": discountPrice,
        });


        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`http://localhost:3000/api/v1/cart/${cartId}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        //------
        setSoLuong(soLuong - 1)
        window.location.reload();

    }

    const deleteItem = () => {
        // dispatch(cartActions.deleteItem(productId))

        // call API
        // var myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/json");

        // var raw = JSON.stringify({
        //     "productId": productId,
        //     "number": -number,
        //     "price": discountPrice,
        // });


        // var requestOptions = {
        //     method: 'PUT',
        //     headers: myHeaders,
        //     body: raw,
        //     redirect: 'follow'
        // };

        // fetch(`http://localhost:3000/api/v1/cart/${cartId}`, requestOptions)
        //     .then(response => response.text())
        //     .then(result => console.log(result))
        //     .catch(error => console.log('error', error));
        //------

        deleteCart(productId);
        setSoLuong(0)
        window.location.reload();


    }

    return (
        <>
            <ListGroupItem className='border-0 cart__item'>
                {
                    soLuong > 0 ?
                        (
                            <div className="cart__item-info d-flex gap-2">
                                <img src={image[0]} alt="product-img" />
                                <div className="cart__product-info w-100 d-flex align-items-center
             gap-4 justify-content-between">
                                    <div>

                                        <h6 className='cart__product-title'>{name}</h6>
                                        <p className='d-flex align-items-center gap-5
                     cart__product-price'>{soLuong}x <span className='defaultPrice'>{price} VNĐ</span>
                                            <span>{discountPrice} VNĐ</span>
                                        </p>

                                        <div className='d-flex align-items-center justify-content-between
                         increase__decrease-btn'>
                                            <span>
                                                <span className='increase__btn' onClick={increaseItem}><i className='ri-add-line'></i></span>
                                            </span>
                                            <span className='quantity'>{soLuong}</span>
                                            <span>
                                                <span className='decrease__btn' onClick={decreaseItem}><i className='ri-subtract-line'></i></span>
                                            </span>
                                        </div>
                                    </div>
                                    <span className='delete__btn' onClick={deleteItem}><i className='ri-close-line'></i></span>

                                </div>
                            </div>
                        ) :
                        (
                            null
                        )
                }
            </ListGroupItem>
            <div>
                
                <Dialog
                    open={openNotify}
                    onClose={handleCloseNotify}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Thông báo"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Bạn có chắc muốn xóa sản phẩm ra khỏi giỏ hàng ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <button className="addToCart__btn" onClick={handleCloseNotify}>Hủy</button>
                        <button className="addToCart__btn" onClick={handleCloseNotify}>
                            Đồng ý
                        </button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    )
}

export default CartItem