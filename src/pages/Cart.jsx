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
import { getCart } from '../api/fetchers/cart'
import { getAllProductsList } from '../api/fetchers/product'
import { deleteCart } from '../api/fetchers/cart'
import { useState, useEffect } from 'react'
import { Dialog,DialogActions, DialogContent, DialogContentText, DialogTitle, Button} from '@mui/material';


// const userInfo = sessionStorage.getItem('userInfo')
// const cartId = userInfo.cartId;
console.log(userInfo);

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

  const { isLoading, data } = useQuery([thunkCartTypes.GET_CART], getCart)

  //const query = useQuery([thunkProductTypes.GETALL_PRODUCTLIST], getAllProductsList)

  const [cartData, setCartData] = useState([])
  

  const cartItems = useSelector(state => state.cart.cartItems)
  const totalAmount = useSelector(state => state.cart.totalAmount)

  const totalBill = cartData.reduce((acc, item) => {

    return acc + (item.price * (1 - item.discount / 100)) * item.number;
  }, 0)
  // const totalBill = 20000

  // console.log(data)
  useEffect(() => {
    if (data) {
      setCartData(data.data.results.product)

      /*
      khi nào tạo thành công api login mới sử dụng
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

    const { productId, number, name, image, price, discount } = props.item
    const cartId = props.cartId;
    const discountPrice = (price * (1 - discount / 100)).toFixed(2)

    const [soLuong, setSoLuong] = useState(number)
    const totalPrice = soLuong * discountPrice;

    const dispatch = useDispatch()

    const deleteItem = () => {
      // dispatch(cartActions.deleteItem(productId))
      
      setSoLuong(0)
      deleteCart(productId)
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

                <img src={image[0]} alt="" />

              </td>
              <td className='text-center'>{name}</td>
              <td className='text-center'>{discountPrice} VNĐ</td>
              <td className='text-center'>
                {/* <div className='d-flex align-items-center justify-content-between increase__decrease-btn'>
              <span className='increase__btn' onClick={increaseItem}><i className='ri-add-line'></i></span>
              <span className='quantity '>{soLuong}</span>
              <span className='decrease__btn' onClick={decreaseItem}><i className='ri-subtract-line'></i></span>
            </div> */}
                <div className='justify-content-center'>
                  
                  <span className='quantity'>{soLuong}</span>
                  

                </div>
              </td>
              <td className='text-center'>{totalPrice} VNĐ</td>
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
                  <span onClick={deleteItem}>Đồng ý</span>
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
      <CommonSection title='Giỏ hàng' />
      <section>
        <Container>
          <Row>
            <Col lg='12'>

              {
                cartData.length === 0 ? <h5 className='text-center'>Không có sản phẩm trong giỏ hàng</h5> :
                  <table className='table table-bordered'>
                    <thead>
                      <tr className='text-center'>
                        <th>Sản phẩm</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá khuyến mãi</th>
                        <th>Số lượng</th>
                        <th>Thành tiền</th>
                        <th>Xóa</th>
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
                <h6>Tổng tiền: <span className='cart__subtotal'>{totalBill} VNĐ</span></h6>
                <p>Tiến hành thanh toán nếu bạn đã mua đủ số lượng</p>
                <div className='cart__page-btn'>
                  <button className="addToCart__btn me-4">
                    <Link to='/foods'>Tiếp tục mua sắm</Link>
                  </button>
                  <button className="addToCart__btn">
                    <Link to='/checkout'>Tiến hành thanh toán</Link>
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
