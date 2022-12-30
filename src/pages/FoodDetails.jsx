import React, { useEffect, useState } from 'react'

// import products from '../assets/fake-data/products'
import { useParams } from 'react-router-dom'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/common-section/CommonSection'
import { Container, Row, Col } from 'reactstrap'
import { Box, CircularProgress } from '@mui/material'

import { useDispatch } from 'react-redux'
import { cartActions } from '../store/shopping-cart/cartSlice'

import ProductCard from '../components/UI/product-card/ProductCard'

import '../styles/product-detail.css'

import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query'
import { thunkProductTypes } from '../constants/thunkTypes'
import { getAllProducts, getProduct } from '../api/fetchers/product'

const userInfo = JSON.parse(sessionStorage.getItem("userInfo")) 
const cartId = sessionStorage.getItem("cartId")

const FoodDetails = () => {
  const [tab, setTab] = useState('desc')
  const [enteredName, setEnteredName] = useState('')
  const [enteredEmail, setEnteredEmail] = useState('')

  const [reviewMsg, setReviewMsg] = useState('')

  const {productId} = useParams()
  // get product
  const {isLoading, data} = useQuery([thunkProductTypes.GET_PRODUCT],
    () => getProduct(productId),
    
  )
  // get all produccts
  const queryAllProducts = useQuery([thunkProductTypes.GETALL_PRODUCT], getAllProducts)
  
  const [productData, setProductData] = useState([])
  const [value, setValue] = React.useState(2);
  
  //const { id } = useParams()
  const dispatch = useDispatch()
  const [previewImg, setPreviewImg] = useState()
  //const product = product.find(product => product.id === id)
  
  

  //const { title, price,category, image } = data.data

  console.log('San pham lien quan: ',queryAllProducts.data.data.results)
  
  const addItem = () => {
    // dispatch(cartActions.addItem({
    //   productId,
    //   name: productData.name,
    //   price: productData.price,
    //   image: productData.image
    // }))
    
      // call API
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
          "productId": productData?.uid,
          "number": 1,
          "price": productData?.discountPrice,
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
  

  const submitHandler = (e) => {
    e.preventDefault()

    console.log(enteredName, enteredEmail, reviewMsg)
  }


  useEffect(() => {
    
    if(data) {
      setProductData(data.data.results)
      setPreviewImg(data.data.results.image[0])
      window.scrollTo(0, 0)


    }
  }, [data])

  console.log(productData)

  //Related product--------------------------
  
  const relatedProduct = productList.filter(
    item => item.discountPrice > 2000000 
  )
  // console.log(relatedProduct)

  if(isLoading || queryAllProducts.isLoading) {
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

    <Helmet title="Product-details">
      <CommonSection title={productData?.name} />

      <section>
        <Container>
          <Row>
            <Col lg="2" md="2">
              <div className="product__images ">
                <div
                  className="img__item mb-3"
                  onClick={() => setPreviewImg(productData?.image)}
                >
                  <img src={productData?.image} alt="" className="w-50" />
                </div>
                <div
                  className="img__item mb-3"
                  onClick={() => setPreviewImg(productData?.image)}
                >
                  <img src={productData?.image} alt="" className="w-50" />
                </div>

                <div
                  className="img__item"
                  onClick={() => setPreviewImg(productData?.image)}
                >
                  <img src={productData?.image} alt="" className="w-50" />
                </div>
              </div>
            </Col>

            <Col lg="4" md="4">
              <div className="product__main-img">
                {/* <img src={previewImg} alt="" className="w-100" /> */} 
                <img src={previewImg} alt="" className="w-100" />
              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="single__product-content">
                <h2 className="product__title mb-3">{productData?.name}</h2>
                {/* <div className='product__discount'>-{productData?.discount}%</div> */}
                <p className="">
                  {" "}
                  <span className='product__discountPrice'>Giá:</span>
                  <span className='product__discountPrice'>{productData?.discountPrice} VNĐ</span>
                  <span className='product__price'>{productData?.price} VNĐ</span>
                </p>
                <p className="category mb-5">
                  Loại sản phẩm: <span>{productData?.productType}</span>
                </p>

                <button onClick={addItem} className="addTOCart__btn">
                  Thêm giỏ hàng
                </button>
              </div>
            </Col>
            <Col lg='12'>
              <div className="tabs d-flex align-items-center gap-3 py-3">
                <h6 className={`${tab === 'desc' ? 'tab__active' : ''}`} onClick={() => setTab('desc')}>Mô tả</h6>
                <h6 className={`${tab === 'rev' ? 'tab__active' : ''}`}
                  onClick={() => setTab('rev')}>Đánh giá</h6>
              </div>
              {
                tab === 'desc' ? (
                  <div className="tab__content">
                    <p>{productData?.name}</p>
                  </div>
                ) :
                  (
                    <div className="tab__form mb-3">

                      <div className="review pt-5">
                        <div className="review__content">
                          <p className="user__name mb-0">John Doe</p>
                          <p className="user__email">JohnCena@gmail.com</p>
                          <p className="feedback__text">Great product</p>
                        </div>
                        <Rating name="read-only" value={value} readOnly />
                      </div>
                      <div className="review">
                        <div className="review__content">
                          <p className="user__name mb-0">John Doe</p>
                          <p className="user__email">JohnCena@gmail.com</p>
                          <p className="feedback__text">Great product</p>
                        </div>
                        <Rating name="read-only" value={value-2} readOnly />

                      </div>
                      <div className="review">
                        <div className="review__content">
                          <p className="user__name mb-0">John Doe</p>
                          <p className="user__email">JohnCena@gmail.com</p>
                          <p className="feedback__text">Great product</p>
                        </div>
                        <Rating name="read-only" value={value-1} readOnly />

                      </div>
                      {/* NAME */}
                      <form className='form' onSubmit={submitHandler}>
                        <div className="form__group">
                          <input type="text" placeholder='Enter your name...'
                            onChange={e => setEnteredName(e.target.value)}
                            required />
                        </div>
                        {/* EMAIL */}
                        <div className="form__group">
                          <input type="text" placeholder='Enter your email...'
                            onChange={e => setEnteredEmail(e.target.value)}
                            required />
                        </div>
                        {/* MESSAGES */}
                        <div className="form__group">
                          <textarea
                            rows={6}
                            type="text"
                            placeholder='Write your review here...'
                            onChange={e => setReviewMsg(e.target.value)}
                            required />
                        </div>
                        <div className='form__group'>
                          <Box
                            sx={{
                              '& > legend': { mt: 2 },
                            }}
                          >
                            <Typography component="legend"><h5>Rating</h5></Typography>
                            <Rating
                              name="simple-controlled"
                              value={value}
                              onChange={(event, newValue) => {
                                setValue(newValue);
                              }}
                            />

                          </Box>
                        </div>
                        {/* BUTTON SUBMIT */}
                        <button type='submit' className='addTOCart__btn'>
                          Submit
                        </button>
                      </form>

                    </div>
                  )
              }



            </Col>
            <Col lg='12' className='mb-5 mt-4'>
              <h2 className='related__Product-title'>You might also like</h2>

            </Col>
            {
              relatedProduct.map(item => (
                <Col lg='3' md='4' sm='6' xs='6' key={item.uid}
                  className='mb-4'>
                  <ProductCard item={item} />
                </Col>
              ))
            }
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default FoodDetails

const productList = [
  {
      "image": [
          "https://product.hstatic.net/1000026716/product/new_project__42__1711b942f99541a19878ca53c420fcd4.png",
          "https://product.hstatic.net/1000026716/product/new_project__40__fcfb1c71d9b54ac1b0efb3570ca68f36.png",
          "https://product.hstatic.net/1000026716/product/new_project__45__96184ad914bc449d8f2306c85fffbbd2.png",
          "https://product.hstatic.net/1000026716/product/new_project__45__96184ad914bc449d8f2306c85fffbbd2.png"
      ],
      "createdAt": "2022-11-19T13:14:54.650Z",
      "uid": "01GJ80E5SK81Q0TY6RCDMX6DCR",
      "code": "SP0057",
      "name": "Fan NZXT F120 RGB Single Black",
      "status": true,
      "expiryDate": 24,
      "price": 600000,
      "discount": 5,
      "discountPrice": 570000,
      "quantity": 55,
      "productType": "Cooler/Fann",
      "brand": "NZXT"
  },
  {
      "image": [
          "https://product.hstatic.net/1000026716/product/1631819120-kraken-x63-rgb-white_b2ef7275fa3c4694935050f2164d609e.png",
          "https://product.hstatic.net/1000026716/product/1631819154-kraken-x63-rgb-white_8a6614a9c11f461b94090a5b821548aa.png",
          "https://product.hstatic.net/1000026716/product/1631819054-kraken-x-pump-front-a_e28385a946c94a5ab0d434dafcddd09e.png",
          "https://product.hstatic.net/1000026716/product/1631821514-kraken-x63-rgb-white_d1d67750faac43948cdac094fac1e143.png",
          "https://product.hstatic.net/1000026716/product/1631821514-kraken-x63-rgb-white_d1d67750faac43948cdac094fac1e143.png"
      ],
      "createdAt": "2022-11-19T13:11:11.754Z",
      "uid": "01GJ807C3R4W7M3VSBY08H8QE9",
      "code": "SP0056",
      "name": "Tản nhiệt nước NZXT AIO Kraken X53 RGB WHITE",
      "status": true,
      "expiryDate": 72,
      "price": 8400000,
      "discount": 15,
      "discountPrice": 7140000,
      "quantity": 35,
      "productType": "Cooler/Fann",
      "brand": "NZXT"
  },
  {
      "image": [
          "https://product.hstatic.net/1000026716/product/z73-rgb-black_7939d18701174d8a91778d89e813ed30.jpeg",
          "https://product.hstatic.net/1000026716/product/z73-rgb-black-3_08fe2876225949cb973d8ef160b1a037.jpeg",
          "https://product.hstatic.net/1000026716/product/z73-rgb-black-4_9758095b8d9f404ba1920badcb1e2a5b.jpeg",
          "https://product.hstatic.net/1000026716/product/z73-rgb-black-3_08fe2876225949cb973d8ef160b1a037.jpeg",
          "https://product.hstatic.net/1000026716/product/z73-rgb-black-7_9ad3ff09788a4a9799eeae6b1bdd811d.jpeg"
      ],
      "createdAt": "2022-11-19T13:07:29.862Z",
      "uid": "01GJ800KDY8MZEDFM6ZXGKXX91",
      "code": "SP0055",
      "name": "Tản nhiệt nước NZXT Kraken Z73 RGB - 360mm ( RL-KRZ73-R1 )",
      "status": true,
      "expiryDate": 72,
      "price": 8400000,
      "discount": 15,
      "discountPrice": 7140000,
      "quantity": 40,
      "productType": "Cooler/Fann",
      "brand": "NZXT"
  },
  {
      "image": [
          "https://product.hstatic.net/1000026716/product/h150i_elite_capellix_1_2282aaceb8cd451d8046fb9f478d361a.png",
          "https://product.hstatic.net/1000026716/product/h150i_elite_capellix_2_b8e358a83a72495cbd686bf0b745c01b.png",
          "https://product.hstatic.net/1000026716/product/h100i_elite_capellix_5_a27f6a9315c4494e883ac868900e7911.png",
          "https://product.hstatic.net/1000026716/product/h100i_elite_capellix_2_3846d6a8e76246e0811c645c6d49a840.png",
          "https://product.hstatic.net/1000026716/product/h100i_elite_capellix_7_fdb6a50b9c964f8f913a6ce717015197.png"
      ],
      "createdAt": "2022-11-19T13:03:46.011Z",
      "uid": "01GJ7ZSRTMKGH5BPFVPZP2MP2X",
      "code": "SP0054",
      "name": "Tản nhiệt nước Corsair H115i ELITE CAPELLIX",
      "status": true,
      "expiryDate": 60,
      "price": 4400000,
      "discount": 15,
      "discountPrice": 3740000,
      "quantity": 40,
      "productType": "Cooler/Fann",
      "brand": "Corsair"
  },
  {
      "image": [
          "https://product.hstatic.net/1000026716/product/thumb_khung_sp_ac092731e45d4c739d6e174327335bbc.png",
          "https://product.hstatic.net/1000026716/product/03__1__8f5aa00ce3d94c7c911122b9f4ae1284.jpg",
          "https://product.hstatic.net/1000026716/product/04__1__457bc7db56c64944907fdd0b1e027ece.jpg",
          "https://product.hstatic.net/1000026716/product/05__1__ddfa6169898f454690df45a13e2e899b.jpg",
          "https://product.hstatic.net/1000026716/product/09_234fc7f1091244a9b8fbfca5f539eac0.jpg",
          "https://product.hstatic.net/1000026716/product/10_a388f3ade34a4d219dd5504eb49d49b3.jpg"
      ],
      "createdAt": "2022-11-19T13:00:04.486Z",
      "uid": "01GJ7ZK0G0YMYK1M91TFF0SPCS",
      "code": "SP0053",
      "name": "Tản nhiệt DEEPCOOL AG400 ARGB White",
      "status": true,
      "expiryDate": 12,
      "price": 1100000,
      "discount": 10,
      "discountPrice": 990000,
      "quantity": 50,
      "productType": "Cooler/Fann",
      "brand": "Deepcool"
  },
  {
      "image": [
          "https://product.hstatic.net/1000026716/product/ssd-gigabyte-aorus-1tb-m-2-pcie-nvme-gen-4_6bd585814a7048c1a6d78c4b1831b9b1.jpg",
          "https://product.hstatic.net/1000026716/product/ssd-gigabyte-aorus-1tb-m-2-pcie-nvme-gen-4-1_c36682e8240242d6a8d53d5876e18a32.jpg",
          "https://product.hstatic.net/1000026716/product/ssd-gigabyte-aorus-1tb-m-2-pcie-nvme-gen-4-1_c36682e8240242d6a8d53d5876e18a32.jpg"
      ],
      "createdAt": "2022-11-19T12:52:42.937Z",
      "uid": "01GJ7Z5H9GFB8NNS7FAWBT65P2",
      "code": "SP0052",
      "name": "SSD GIGABYTE AORUS 1TB M.2 PCIe NVMe gen 4 (Bản không heatsink)",
      "status": true,
      "expiryDate": 36,
      "price": 5000000,
      "discount": 10,
      "discountPrice": 4500000,
      "quantity": 50,
      "productType": "Ổ cứng",
      "brand": "Gigabyte"
  },
  {
      "image": [
          "https://product.hstatic.net/1000026716/product/970_3a70e04049bb4e21ad7f6f8050b02260.png",
          "https://product.hstatic.net/1000026716/product/970_3a70e04049bb4e21ad7f6f8050b02260.png"
      ],
      "createdAt": "2022-11-19T12:49:41.063Z",
      "uid": "01GJ7YZZNZ515T20SQ6T831157",
      "code": "SP0051",
      "name": "SSD Samsung 970 Evo Plus 250GB M.2 NVMe",
      "status": true,
      "expiryDate": 60,
      "price": 1800000,
      "discount": 10,
      "discountPrice": 1620000,
      "quantity": 70,
      "productType": "Ổ cứng",
      "brand": "SamSung"
  },
  {
      "image": [
          "https://product.hstatic.net/1000026716/product/gearvn-ssd-samsung-980-pro-500gb-m-2-nvme-mz-v8p500bw-2_6f66c1d598514d6fa11f07c8286ddad8.jpg",
          "https://product.hstatic.net/1000026716/product/gearvn-ssd-samsung-980-pro-500gb-m-2-nvme-mz-v8p500bw-2_6f66c1d598514d6fa11f07c8286ddad8.jpg",
          "https://product.hstatic.net/1000026716/product/gearvn-ssd-samsung-980-pro-500gb-m-2-nvme-mz-v8p500bw-3_fc831498074c419f990bea4614a39e7e.jpg"
      ],
      "createdAt": "2022-11-19T12:47:19.068Z",
      "uid": "01GJ7YVN0PNNDPTRJJ50TG7BE4",
      "code": "SP0050",
      "name": "SSD SamSung 980 PRO 500GB M.2 PCIe gen 4 NVMe (MZ-V8P500BW)",
      "status": true,
      "expiryDate": 60,
      "price": 3500000,
      "discount": 10,
      "discountPrice": 3150000,
      "quantity": 40,
      "productType": "Ổ cứng",
      "brand": "SamSung"
  },
  {
      "image": [
          "https://product.hstatic.net/1000026716/product/gearvn.com-products-ssd-kingston-a400-480gb-2-5-sata-iii-1_-_copy_33e62d6fbef94f12ad2386515aa0e947.jpg",
          "https://product.hstatic.net/1000026716/product/gearvn.com-products-ssd-kingston-a400-480gb-2-5-sata-iii-2_0ce9182f47e64d0393871fb8677242ae.jpg",
          "https://product.hstatic.net/1000026716/product/gearvn.com-products-ssd-kingston-a400-480gb-2-5-sata-iii-3_5ad8830639014050b4548c7dff1e083c.jpg",
          "https://product.hstatic.net/1000026716/product/gearvn.com-products-ssd-kingston-a400-480gb-2-5-sata-iii-4_cbb14172a7a54be8be024a9708cc4271.jpg"
      ],
      "createdAt": "2022-11-19T12:43:36.590Z",
      "uid": "01GJ7YMVR6YHJKBQ5DAG21P6V4",
      "code": "SP0049",
      "name": "SSD Kingston A400 480GB 2.5' SATA III",
      "status": true,
      "expiryDate": 36,
      "price": 1600000,
      "discount": 5,
      "discountPrice": 1520000,
      "quantity": 50,
      "productType": "Ổ cứng",
      "brand": "Kingston"
  },
  {
      "image": [
          "https://product.hstatic.net/1000026716/product/case_cooler_f464313e62f349b689a1e813acb381ff.jpg",
          "https://product.hstatic.net/1000026716/product/new_project__12__9d458270612d4bf08ddb568aaaa8b166.png",
          "https://product.hstatic.net/1000026716/product/new_project__11__a23cc9ec061141d3bafda2c9e7e773ae.png",
          "https://product.hstatic.net/1000026716/product/new_project__11__a23cc9ec061141d3bafda2c9e7e773ae.png"
      ],
      "createdAt": "2022-11-19T12:37:54.831Z",
      "uid": "01GJ7YAE09317FCZDBPEVYP5TJ",
      "code": "SP0048",
      "name": "Case Cooler Master Cosmos C700M - 30th Anniversary Limited Edition",
      "status": true,
      "expiryDate": 12,
      "price": 26500000,
      "discount": 20,
      "discountPrice": 21200000,
      "quantity": 7,
      "productType": "Case",
      "brand": "Cooler Master"
  }
]