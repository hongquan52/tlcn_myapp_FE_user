import React from 'react'

import '../../../styles/product-card.css'

import { Link, Navigate } from 'react-router-dom'
import image from '../../../assets/images/ava-1.jpg'
import { useDispatch } from 'react-redux'
import { cartActions } from '../../../store/shopping-cart/cartSlice'
import { useNavigate } from 'react-router-dom'
const userInfo = JSON.parse(sessionStorage.getItem("userInfo")) 
const cartId = sessionStorage.getItem("cartId")

const ProductCard = (props) => {
    const navigate = useNavigate()
    const {uid, name, image, price, discount, discountPrice} = props.item
    const dispatch = useDispatch()
    //console.log(props.item)

    // const addToCart = () => {
    //     dispatch(cartActions.addItem({
    //         uid,
    //         name,
    //         image: image[0],
    //         price
    //     }))
    // }
    const addToCart = () => {
        // call API
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
          "productId": uid,
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
      
    }
    return (
    <div className='product__item'>
        <div className="product__img">
            <img src={image[0]} alt="product-img" className='w-50'/>
        </div>

        <div className="product__content">
            <h5><Link to={`/foods/${uid}`}>{name}</Link></h5>
            <div className='d-flex align-items-center
             justify-content-between'>
                {/* <span className="product__price">
                    ${price}
                </span> */}
                {' '}
                <span className="product__discountPrice">
                    {discountPrice} VNĐ
                </span>
                <p className='product__discount'>-{discount}%</p>
                {
                    userInfo ? (
                        <span onClick={props.sukien}>
                            <button className='addToCart__btn addToCart__btn1'
                                onClick={addToCart}>Mua</button>
                        </span>
                    ):
                    (
                        <span>
                            <button className='addToCart__btn addToCart__btn1'
                                onClick={() => navigate('/login')}>Mua</button>
                        </span>
                    )
                }
                
            </div>
        </div>
        
    </div>
  )
}

export default ProductCard