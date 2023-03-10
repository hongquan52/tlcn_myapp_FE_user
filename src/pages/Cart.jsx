import React from 'react'
import CommonSection from '../components/UI/common-section/CommonSection'
import Helmet from '../components/Helmet/Helmet'
import { Box, CircularProgress } from '@mui/material'

import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import { cartActions } from '../store/shopping-cart/cartSlice'

import '../styles/cart-page.css'
import { useQuery } from '@tanstack/react-query'
import { thunkCartTypes, thunkProductTypes } from '../constants/thunkTypes'
import { deleteCart, getCart, getProductInCart } from '../api/fetchers/cart'
import { getAllProductsList } from '../api/fetchers/product'

import { useState, useEffect } from 'react'
import { Dialog,DialogActions, DialogContent, DialogContentText, DialogTitle, Button} from '@mui/material';

const userInfo = localStorage.getItem('userInfo');
const cartId = sessionStorage.getItem('cartId');

const Cart = () => {
  //----NOTIFY delete-----------------------------------------
  // const Transition = React.forwardRef(function Transition(props, ref) {
  //   return <Slide direction="up" ref={ref} {...props} />;
  // });
  
  const [openNotify, setOpenNotify] = React.useState(false);

  const handleClickOpenNotify = () => {
      setOpenNotify(true);
      
  };

  const handleCloseNotify = () => {
      setOpenNotify(false);
  };

  const {isLoading, data} = useQuery([thunkCartTypes.GET_PRODUCT_IN_CART],
    () => getProductInCart(cartId) );

  //const query = useQuery([thunkProductTypes.GETALL_PRODUCTLIST], getAllProductsList)

  const [cartData, setCartData] = useState([])
  

  const cartItems = useSelector(state => state.cart.cartItems)
  const totalAmount = useSelector(state => state.cart.totalAmount)

  const totalBill = cartData.reduce((acc, item) => {

    return acc + (item.price * (1 - item.promotion / 100)) * item.amount;
  }, 0)
  // const totalBill = 20000

  // console.log(data)
  useEffect(() => {
    if (data) {
      setCartData(data.data)

      /*
      khi n??o t???o th??nh c??ng api login m???i s??? d???ng
      sessionStorage.setItem("cartId", data.data.results.uid)
      */
      
    }
  }, [data])

  if (isLoading) {
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
  //-----------------------------------------------chidren--------------------------------------
  const Tr = (props) => {
    const navigate = useNavigate()

    const { productId, productName, productImage, price, promotion, amount } = props.item
    const cartId = props.cartId;
    const discountPrice = (price * (1 - promotion / 100)).toFixed(2)

    const [soLuong, setSoLuong] = useState(amount)
    const totalPrice = soLuong * discountPrice;

    const dispatch = useDispatch()

    const deleteItem = () => {
      // dispatch(cartActions.deleteItem(productId))
      
      setSoLuong(0)
      deleteCart(productId, cartId);
      window.location.reload();
    }
    const increaseItem = () => {
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
      console.log('cartID: ', cartId)
    }
    const decreaseItem = () => {
      
      // var myHeaders = new Headers();
      // myHeaders.append("Content-Type", "application/json");

      // var raw = JSON.stringify({
      //   "productId": productId,
      //   "number": -1,
      //   "price": discountPrice,
      // });


      // var requestOptions = {
      //   method: 'PUT',
      //   headers: myHeaders,
      //   body: raw,
      //   redirect: 'follow'
      // };

      // fetch(`http://localhost:3000/api/v1/cart/${cartId}`, requestOptions)
      //   .then(response => response.text())
      //   .then(result => console.log(result))
      //   .catch(error => console.log('error', error));
      //------
      setSoLuong(soLuong - 1)
    }

    return (
      <>
      <tr>

        {
          soLuong ? (
            <>
              <td className='text-center cart__img-box'>

                <img src={productImage} alt="" />

              </td>
              <td className='text-center'>{productName}</td>
              <td className='text-center'>{discountPrice} VN??</td>
              <td className='text-center'>
                {/* <div className='d-flex align-items-center justify-content-between increase__decrease-btn'>
              <span className='increase__btn' onClick={increaseItem}><i className='ri-add-line'></i></span>
              <span className='quantity '>{soLuong}</span>
              <span className='decrease__btn' onClick={decreaseItem}><i className='ri-subtract-line'></i></span>
            </div> */}
                <div className='justify-content-center'>
                  
                  <span className='quantity'>{amount}</span>
                  

                </div>
              </td>
              <td className='text-center'>{totalPrice} VN??</td>
              <td className='text-center cart__item-del'>
              <div className=''>
                  {/* <i class="ri-add-box-fill delete__btn1 m-3" onClick={increaseItem}></i> */}
                  <i className='ri-delete-bin-line delete__btn1 m-3' onClick={handleClickOpenNotify}></i>
                  {/* <i class="ri-checkbox-indeterminate-fill delete__btn1 m-3" onClick={decreaseItem}></i> */}
              </div>
            </td>
            </>
          ) :
            (
              null
            )
        }
      </tr>
      <div>
      <Dialog
          open={openNotify}
          onClose={handleCloseNotify}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          // TransitionComponent={Transition}
      >
          <DialogTitle id="alert-dialog-title">
              {"Th??ng b??o"}
          </DialogTitle>
          <DialogContent>
              <DialogContentText id="alert-dialog-description">
                  B???n c?? ch???c mu???n x??a s???n ph???m ra kh???i gi??? h??ng ?
              </DialogContentText>
          </DialogContent>
          <DialogActions>
              <button className="addToCart__btn" onClick={handleCloseNotify}>H???y</button>
              <button className="addToCart__btn" onClick={handleCloseNotify}>
                  <span onClick={deleteItem}>?????ng ??</span>
              </button>
          </DialogActions>
      </Dialog>
    </div>
    </>
    )
  }
  //------------------------------------------------------------------------
  return (
    <Helmet title='Cart'>
      <CommonSection title='Gi??? h??ng' />
      <section>
        <Container>
          <Row>
            <Col lg='12'>

              {
                cartData.length === 0 ? <h5 className='text-center'>Kh??ng c?? s???n ph???m trong gi??? h??ng</h5> :
                  <table className='table table-bordered'>
                    <thead>
                      <tr className='text-center'>
                        <th>S???n ph???m</th>
                        <th>T??n s???n ph???m</th>
                        <th>Gi?? khuy???n m??i</th>
                        <th>S??? l?????ng</th>
                        <th>Th??nh ti???n</th>
                        <th>X??a</th>
                      </tr>

                    </thead>
                    <tbody>
                      {
                        cartData.map((item) => {
                          return (
                            <Tr item={item} key={item.productId} cartId={cartId} />
                          )
                        })
                      }
                    </tbody>
                  </table>

              }
              <div className='mt-5'>
                <h6>T???ng ti???n: <span className='cart__subtotal'>{totalBill} VN??</span></h6>
                <p>Ti???n h??nh thanh to??n n???u b???n ???? mua ????? s??? l?????ng</p>
                <div className='cart__page-btn'>
                  <button className="addToCart__btn me-4">
                    <Link to='/foods'>Ti???p t???c mua s???m</Link>
                  </button>
                  <button className="addToCart__btn">
                    <Link to='/checkout'>Ti???n h??nh thanh to??n</Link>
                  </button>
                </div>
              </div>
              
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

//-------------------------------------------------------

//--------------------------------------------------------

export default Cart
