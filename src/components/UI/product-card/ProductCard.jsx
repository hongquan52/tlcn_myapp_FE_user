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
    const {id, name, image, promotion, price} = props.item
    const dispatch = useDispatch()
    //console.log(props.item)

    // const addToCart = () => {
    //     dispatch(cartActions.addItem({
    //         id,
    //         name,
    //         image: image[0],
    //         price
    //     }))
    // }
    const handleClickProductName = () => {
        window.location.reload();
    }
    const addToCart = () => {
        // call API
        var requestOptions = {
            method: 'POST',
            redirect: 'follow'
          };
          
          fetch(`http://localhost:8080/api/v1/cart/product?cartId=${cartId}&productId=${id}&amount=1`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
      //------
      window.location.reload();
      
    }
    return (
    <div className='product__item'>
        <div className="product__img">
            {
                image ?
                (<img src={image} alt="product-img" className='w-50'/>):
                (<img src={"https://www.pngitem.com/pimgs/m/45-455622_transparent-computer-png-gaming-pc-transparent-png-png.png"} alt="product-img" className='w-50'/>)
            }
            
        </div>

        <div className="product__content">
            <h5 onClick={handleClickProductName}><Link to={`/foods/${id}`}>{name}</Link></h5>
            <div className='d-flex align-items-center
             justify-content-between'>
                {/* <span className="product__price">
                    ${price}
                </span> */}
                {' '}
                <span className="product__discountPrice">
                    {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ
                </span>
                <p className='product__discount'>-{promotion}%</p>
                {
                    // userInfo ? (
                    //     <span onClick={props.sukien}>
                    //         <button className='addToCart__btn addToCart__btn1'
                    //             onClick={addToCart}>Mua</button>
                    //     </span>
                    // ):
                    // (
                    //     <span>
                    //         <button className='addToCart__btn addToCart__btn1'
                    //             onClick={() => navigate('/login')}>Mua</button>
                    //     </span>
                    // )

                    <span onClick={props.sukien}>
                             <button className='addToCart__btn addToCart__btn1'
                               onClick={addToCart}>Mua</button>
                    </span>
                }
                
            </div>
        </div>
        
    </div>
  )
}

export default ProductCard