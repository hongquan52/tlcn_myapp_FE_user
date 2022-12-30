import React,{useState, useEffect} from 'react'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/common-section/CommonSection'
import { Container, Col, Row } from 'reactstrap'
import { Box, CircularProgress } from '@mui/material'
import {Button, Dialog, Alert, AlertTitle} from '@mui/material'


import products from '../assets/fake-data/products'
import ProductCard from '../components/UI/product-card/ProductCard'
import '../styles/all-foods.css'
import '../styles/pagination.css'
import ReactPaginate from 'react-paginate'

import { useQuery } from '@tanstack/react-query'
import { thunkProductTypes } from '../constants/thunkTypes'
import { getAllProducts } from '../api/fetchers/product'

const AllFoods = () => {

  const [open, setOpen] = useState(false)
  
  const [searchTerm, setSearchTerm] = useState('')
  //const [productData, setProductData] = useState(products)
  const [pageNumber, setPageNumber]  = useState(0)
  
  const productPerPage = 8
  const visitedPage = pageNumber * productPerPage

  // react query fetch api
  const { isLoading, data} = useQuery([thunkProductTypes.GETALL_PRODUCT], getAllProducts)
  
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
  //----------------------

  const searchedProduct = data.data.results.filter((item) => {
    if(searchTerm.value === '')
        return item;
    // if(item.title.toLowerCase().includes(searchTerm.toLowerCase()))
    //     return item
    if(item.name.toLowerCase().includes(searchTerm.toLowerCase()))
        return item
  })
  console.log(searchedProduct)

  const displayPage = searchedProduct.slice(visitedPage, visitedPage+productPerPage)

  const pageCount = Math.ceil(searchedProduct.length / productPerPage)

  const changePage = ({selected}) => {
    setPageNumber(selected)
  }
  const handleClick = () => {
    setOpen(!open);
  };


  return (
    <Helmet title='All-foods'>
      
      <CommonSection title='Tất cả sản phẩm' />
      <section>
        <Container>
          <Row>
            <Col lg='6' md='6' sm='6' xs='12'>
              <div className="search__widget d-flex align-items-center
               justify-content-between w-50">
                <input type="text" placeholder='Bạn muốn tìm gì?...' 
                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                <span><i className='ri-search-line'></i></span>
              </div>
            </Col>
            <Col lg='6' md='6' sm='6' xs='12' className='mb-5'>
              <div className="sorting__widget text-end">
                <select className='w-50'>
                  <option >Lọc</option>
                  <option value="ascending">Alphabetical a-z</option>
                  <option value="descending">Alphabetical a-z</option>
                  <option value="high-price">Giá thấp đến cao</option>
                  <option value="low-price">Giá cao đến thấp</option>
                </select>
              </div>
            </Col>
            {
              displayPage.map((item) => (
                <Col lg='3' md='4' sm='6' xs='6' key={item.id} className='mb-4' >
                  {""}
                  <ProductCard item={item} sukien={handleClick} />
                </Col>
              ))
            }
            
            <Dialog open={open} onClose={handleClick}>
              <Alert

                //props go here
              >
                <AlertTitle>Sản phẩm</AlertTitle>
                Thêm vào giỏ hàng thành công
              </Alert>
            </Dialog>
            <div>
              <ReactPaginate 
                pageCount={pageCount}
                onPageChange={changePage}
                previousLabel='Prev'
                nextLabel='Next'
                containerClassName='paginationBttns'
              />
            </div>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default AllFoods