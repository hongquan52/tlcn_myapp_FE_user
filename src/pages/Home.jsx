import React , {useState, useEffect} from 'react'
import Helmet from '../components/Helmet/Helmet'
import {Container,Row,Col, ListGroup, ListGroupItem, ListInlineItem} from 'reactstrap'
import heroImg from '../assets/images/hero1.png'
import '../styles/hero-section.css'
import '../styles/home.css'
import { Box, CircularProgress } from '@mui/material'

import { Link } from 'react-router-dom'
import Category from '../components/UI/category/Category'

import featureImg01 from '../assets/images/service-01.png'
import featureImg02 from '../assets/images/service-02.png'
import featureImg03 from '../assets/images/service-03.png'

import {Button, Dialog, Alert, AlertTitle} from '@mui/material'

import ProductCard from '../components/UI/product-card/ProductCard'

import whyImg from '../assets/images/location.jpg'
import networkImg from '../assets/images/network.png'
import TestimonialSlider from '../components/UI/Slider/TestimonialSlider'
import HomeSlider from '../components/UI/Slider/HomeSlider'

import { useQuery } from '@tanstack/react-query'
import { thunkProductTypes, thunkProductTypeTypes } from '../constants/thunkTypes'
import { getAllProducts, getAllProductsList } from '../api/fetchers/product'
import { getAllProductType } from '../api/fetchers/producttype'

const featureData = [
  {
    title: 'Giao hàng nhanh chóng',
    imgUrl: featureImg01,
    desc: 'lorem ipsum dolor, sit amet consectuture adipsdfjsldf elit'
  },
  {
    title: 'Chất lượng bảo đảm',
    imgUrl: featureImg02,
    desc: 'lorem ipsum dolor, sit amet consectuture adipsdfjsldf elit'
  },
  {
    title: 'Dễ dàng đặt hàng',
    imgUrl: featureImg03,
    desc: 'lorem ipsum dolor, sit amet consectuture adipsdfjsldf elit'
  },
]

const Home = () => {
  
  // fetch api
  
  const {isLoading, data} = useQuery([thunkProductTypes.GETALL_PRODUCT],getAllProducts)
  const queryListProducts = useQuery([thunkProductTypes.GETALL_PRODUCTLIST], getAllProductsList)
  console.log('list product by product type: ',queryListProducts.data)
  //
  const [category, setCategory] = useState('ALL')
  
  const [allProducts, setAllProducts] = useState([])
  
  const [open, setOpen] = useState(false);
  
  const [hotPizza, setHotPizza] = useState([]);

  const handleClick = () => {
    setOpen(!open);
  };
  useEffect(() => {
    if(data) {
      setAllProducts(data.data.results)
    }
  },[data])

  useEffect(() => {
    if(data) {
      const filteredPizza = data.data.results.filter((item) => item.price > 1000);
      const slicePizza = filteredPizza.slice(0, 4);
      setHotPizza(slicePizza);
    }
  }, [data]);
  
  // search product
  useEffect(() => {
    if(productList) {
      if (category === "ALL") {
        setAllProducts(productList);

      }
  
      if (category === "Kingston") {
        const filteredProducts = productList.filter(
          (item) => item.brand ==="Kingston"
        );
        console.log('ram: ',filteredProducts)
        
        setAllProducts(filteredProducts);
      }
  
      if (category === "SamSung") {
        const filteredProducts = productList.filter(
          (item) => item.brand === 'SamSung'
        );
        console.log('card man hinh: ',filteredProducts)
        setAllProducts(filteredProducts);
      }
  
      if (category === "NZXT") {
        const filteredProducts = productList.filter(
          (item) => item.brand === 'NZXT'
        );
  
        setAllProducts(filteredProducts);
      }
      if (category === "Corsair") {
        const filteredProducts = productList.filter(
          (item) => item.brand === 'Corsair'
        );
  
        setAllProducts(filteredProducts);
      }
      
    }
  }, [category, productList]);

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
    <Helmet title='Home'>
      <section>
            <Dialog open={open} onClose={handleClick}>
                <Alert

                  //props go here
                >
                  <AlertTitle>Sản phẩm</AlertTitle>
                  Thêm sản phẩm vào giỏ hàng thành công
                </Alert>
            </Dialog>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg='6' md='6'>
              <div className="hero__content">
                <h5 className="mb-3">Đặt hàng dễ dàng</h5>
                  <h1 className="mb-4 hero__title">
                    <span>Bạn cần mua máy tính?</span> Chờ chút <br /> sản phẩm của chúng tôi
                    <span>  dành cho bạn</span>
                     
                  </h1>

                  <p>
                    Gaming shop chúng tôi cung cấp các sản phẩm và linh kiện máy tính trong khu vực TP HCM và các tỉnh miền Nam Việt Nam
                  </p>
                  <div className="hero__btns d-flex align-items-center gap-5 mt-4">
                    <button className="order__btn">
                      Mua ngay <i className='ri-arrow-right-s-line'></i>
                    </button>

                    <button className="all__foods-btn">
                      <Link to="/foods">Xem tất cả sản phẩm</Link>
                    </button>
                  </div>

                  <div className='hero__service d-flex align-items-center gap-5 mt-5'>
                    <p className='d-flex align-items-center gap-2'><span className="shipping__icon">
                      <i class="ri-car-line"></i>
                      </span>Miễn phí vận chuyển</p>

                    <p className='d-flex align-items-center gap-2'><span className="shipping__icon">
                      <i className="ri-shield-check-line"></i>
                      </span>Thanh toán an toàn</p>
                  </div>
              </div>
            </Col>
            <Col lg='6' md='6'>
              <div className="hero__img">
                <img src={heroImg} alt="hero-img" className="w-100" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <HomeSlider />
          </Row>
        </Container>
      </section>
      <section className='pt-0'>
        <Category />
      </section>

      <section>
        <Container>
          <Row>
            <Col lg='12' className='text-center'>
              <h5 className='feature__subtitle mb-4'>Bạn cần chúng tôi những gì</h5>
              <h2 className='feature__title'>Chỉ cần ở nhà</h2>
              <h2 className='feature__title'>
                Chúng tôi <span>sẽ giao tới</span>
              </h2>
              <p className='mt-5 mb-1 feature__text'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum dolorem doloremque dicta maiores.
              Temporibus, ipsum facilis incidunt ut sint </p>
              <p className='feature__text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse et saepe iure dignissimos ea! Blanditiis unde atque at illo fugiat ad aliquid rem iure</p>

            </Col>
            {featureData.map((item, index)=> (
              <Col lg='4' md='4' key={index} className='mt-5'>
                <div className="feature__item text-center py-3 px-5">
                  <img src={item.imgUrl} alt="feature-img" 
                  className='w-25 mb-3'/>
                  <h5 className='fw-bold mb-3'>{item.title}</h5>
                  <p>{item.desc}</p>
                </div>
              </Col>
            ))}
            
          </Row>
        </Container>
      </section>
      
      <section>
        <Container>
          <Row>
            <Col lg='12' className='text-center'>
              <h2>Thương hiệu nổi tiếng</h2>
            </Col>

            <Col lg='12'>
              <div className="food__category d-flex align-items-center justify-content-center gap-4">
                
                <button
                  className={`all__btn  ${
                    category === "ALL" ? "foodBtnActive" : ""
                  } `}
                  onClick={() => setCategory("ALL")}
                >
                  Tất cả
                </button>
                <button
                  className={`d-flex align-items-center gap-2 ${
                    category === 'Kingston' ? 'foodBtnActive' : ''
                  }`}
                  onClick={() => setCategory("Kingston")}
                >
                  {/* <img src={foodCategoryImg01} alt="" /> */}
                  Kingston
                  <img src="https://www.pngitem.com/pimgs/m/26-260244_kingston-technology-hd-png-download.png" alt="" />
                </button>

                <button
                  className={`d-flex align-items-center gap-2 ${
                    category === "SamSung" ? "foodBtnActive" : ""
                  } `}
                  onClick={() => setCategory("SamSung")}
                >
                  {/* <img src={foodCategoryImg02} alt="" /> */}
                  Samsung
                  <img src="https://brademar.com/wp-content/uploads/2022/05/Samsung-Logo-PNG-1993-%E2%80%93-2005.png" alt="" />
                </button>

                <button
                  className={`d-flex align-items-center gap-2 ${
                    category === "Corsair" ? "foodBtnActive" : ""
                  } `}
                  onClick={() => setCategory("Corsair")}
                >
                  {/* <img src={foodCategoryImg03} alt="" /> */}
                  Corsair
                  <img src="https://1000logos.net/wp-content/uploads/2020/10/Corsair-logo.png" alt="" />
                </button>
                <button
                  className={`d-flex align-items-center gap-2 ${
                    category === "NZXT" ? "foodBtnActive" : ""
                  } `}
                  onClick={() => setCategory("NZXT")}
                >
                  {/* <img src={foodCategoryImg03} alt="" /> */}
                  NZXT
                  <img src="https://i.pinimg.com/originals/9b/c6/b1/9bc6b124e34c593797fca80d652dcfd6.png" alt="" />
                </button>
              </div> 
            </Col>

            {allProducts.map((item) => (
              <Col lg='3' md='4' key={item.id} className='mt-5'>
                <ProductCard item={item} sukien={handleClick}/>
              </Col>  
            ))}
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <img src={whyImg} alt="why-tasty-treat" className='w-100'/>
            </Col>

            <Col lg="6" md="6">
                <div className="why__tasty-treat">
                  <h2 className="tasty__treat-title mb-4">
                    Tại sao <span>chọn Gaming shop?</span>
                  </h2>
                  <p className="tasty__treat-desc">
                    Chúng tôi là đơn vị cung cấp máy tính và linh kiện uy tín và lâu đời nhất ở TP HCM, với đôi ngũ nhân viên nhiệt huyết và tận tình với khách hàng
                  </p>
                  <ListGroup className='mt-5'>
                    <ListGroupItem className="border-0 ps-0">
                      <p className="choose__us-title d-flex align-items-center gap-2 ">
                        <i class="ri-checkbox-circle-line"></i> Luôn cung cấp những mẫu máy tình và linh kiện mới nhất thị trường
                      </p>
                      <p className="choose__us-desc">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        Quia, voluptatibus.
                      </p>
                    </ListGroupItem>

                    <ListGroupItem className="border-0 ps-0">
                      <p className="choose__us-title d-flex align-items-center gap-2 ">
                        <i class="ri-checkbox-circle-line"></i> Hỗ trợ tận tình
                      </p>
                      <p className="choose__us-desc">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Qui, earum.
                      </p>
                    </ListGroupItem>

                    <ListGroupItem className="border-0 ps-0">
                      <p className="choose__us-title d-flex align-items-center gap-2 ">
                        <i class="ri-checkbox-circle-line"></i>Đặt hàng dễ dàng ở bất cứ đâu{" "}
                      </p>
                      <p className="choose__us-desc">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Qui, earum.
                      </p>
                    </ListGroupItem>
                  </ListGroup>
                </div>
              </Col>
          </Row>
        </Container>
      </section>

      <section className='pt-0'>
        <Container>
          <Row>
            <Col lg='12' className='text-center mb-5'>
              <h2>Sản phẩm cao cấp</h2>
            </Col>
            {
              hotPizza.map((item) => (
                <Col lg='3' md='4' key={item.uid}>
                  <ProductCard item={item} sukien={handleClick}/>
                </Col>
              ))
            }
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg='6' md='6'>
              <div className='testimonial'>
                <h5 className='testimonial__subtitle mb-5'>Cảm nhận người dùng</h5>
                <h2 className='testimonial__title mb-5'>Mọi người <span>nói gì </span>về chúng tôi</h2>
                <p className="testimonial__desc">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. A at commodi, ut tenetur saepe illo doloribus voluptatum blanditiis culpa adipisci quibusdam maiores eligendi aliquam aliquid repellat quod fuga numquam dignissimos?
                </p>
                <TestimonialSlider />
              </div>
            </Col>
            <Col lg='6' md='6'>
              <img src={networkImg} alt="testimonial-img" className='w-100' />
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Home

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