import React, { useState, useEffect } from 'react'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/common-section/CommonSection'
import { Container, Col, Row } from 'reactstrap'
import { Box, CircularProgress } from '@mui/material'
import { Button, Dialog, Alert, AlertTitle } from '@mui/material'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import ProductCard from '../components/UI/product-card/ProductCard'
import '../styles/all-foods.css'
import '../styles/pagination.css'
import ReactPaginate from 'react-paginate'

import { useQuery } from '@tanstack/react-query'
import { thunkBrandTypes, thunkProductTypes, thunkProductTypeTypes } from '../constants/thunkTypes'
import { getAllProducts } from '../api/fetchers/product'
import { getAllBrand } from '../api/fetchers/brand'
import { getAllProductType } from '../api/fetchers/producttype'

const AllFoods = () => {
  // category and brand
  const [methodFilter, setMethodFilter] = useState("search")

  const [allProductData, setAllProductData] = useState([])
  const [brand, setBrand] = useState();
  const [category, setCategory] = useState();

  const [filter, setFilter] = useState("all")

  const handleChangeBrand = (event) => {
    setBrand(event.target.value);
    console.log('Brand handelChange: ', event.target.value)
    setFilter(event.target.value);
    setCategory('')
    
  };
  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
    console.log('Category handelChange: ', event.target.value)
    setFilter(event.target.value)
    setBrand('');
  }

  //
  const [open, setOpen] = useState(false)

  const [searchTerm, setSearchTerm] = useState('')
  //const [productData, setProductData] = useState(products)
  const [pageNumber, setPageNumber] = useState(0)

  const productPerPage = 8
  const visitedPage = pageNumber * productPerPage

  // react query fetch api
  const { isLoading, data } = useQuery([thunkProductTypes.GETALL_PRODUCT], getAllProducts)
  const brandUseQuery = useQuery([thunkBrandTypes.GETALL_BRAND], getAllBrand);
  const categoryUseQuery = useQuery([thunkProductTypeTypes.GETALL_PRODUCTTYPE], getAllProductType);

  const [brandData, setBrandData] = useState([])
  const [categoryData, setCategoryData] = useState([])

  useEffect(() => {
    if (brandUseQuery.data && categoryUseQuery.data) {
      setBrandData(brandUseQuery.data.data);
      setCategoryData(categoryUseQuery.data.data);

    }
  }, [brandUseQuery.data, categoryUseQuery.data])

  useEffect(() => {
    if(data) {
      if(filter === "all") {
        setAllProductData(data?.data)
      }
      if(filter === "disable") {
        setAllProductData([])
      }
      if(filter === "Samsung") {
        console.log("test product data: ",data?.data)
        const filter1111 = data?.data.filter(
          (item) => item.brand === "Samsung"
        )
        console.log("test samsung product data: ", filter1111);
        setAllProductData(filter1111);
      }
      if(filter === "Logitech") {
        console.log("test product data: ",data?.data)
        const filter1111 = data?.data.filter(
          (item) => item.brand === "Logitech"
        )
        console.log("test Logitech product data: ", filter1111);
        setAllProductData(filter1111);
      }
      if(filter === "Kingston") {
        console.log("test product data: ",data?.data)
        const filter1111 = data?.data.filter(
          (item) => item.brand === "Kingston"
        )
        console.log("test Kingston product data: ", filter1111);
        setAllProductData(filter1111);
      }
      if(filter === "Case") {
        console.log("test product data: ",data?.data)
        const filter1111 = data?.data.filter(
          (item) => item.category === "Case"
        )
        console.log("test Case product data: ", filter1111);
        setAllProductData(filter1111);
      }
      if(filter === "Mouse") {
        console.log("test product data: ",data?.data)
        const filter1111 = data?.data.filter(
          (item) => item.category === "Mouse"
        )
        console.log("test Mouse product data: ", filter1111);
        setAllProductData(filter1111);
      }
      if(filter === "Ram") {
        console.log("test product data: ",data?.data)
        const filter1111 = data?.data.filter(
          (item) => item.category === "Ram"
        )
        console.log("test Ram product data: ", filter1111);
        setAllProductData(filter1111);
      }
      if(filter === "SSD") {
        console.log("test product data: ",data?.data)
        const filter1111 = data?.data.filter(
          (item) => item.category === "SSD"
        )
        console.log("test SSD product data: ", filter1111);
        setAllProductData(filter1111);
      }
      if(filter === "VGA") {
        console.log("test product data: ",data?.data)
        const filter1111 = data?.data.filter(
          (item) => item.category === "VGA"
        )
        console.log("test VGA product data: ", filter1111);
        setAllProductData(filter1111);
      }
      if(filter === "CPU") {
        console.log("test product data: ",data?.data)
        const filter1111 = data?.data.filter(
          (item) => item.category === "CPU"
        )
        console.log("test CPU product data: ", filter1111);
        setAllProductData(filter1111);
      }
      if(filter === "Fan") {
        console.log("test product data: ",data?.data)
        const filter1111 = data?.data.filter(
          (item) => item.category === "Fan"
        )
        console.log("test Fan product data: ", filter1111);
        setAllProductData(filter1111);
      }
      if(filter === "Mainboard") {
        console.log("test product data: ",data?.data)
        const filter1111 = data?.data.filter(
          (item) => item.category === "Mainboard"
        )
        console.log("test Mainboard product data: ", filter1111);
        setAllProductData(filter1111);
      }
      
    }
  }, [data,filter])
  console.log("alll product data filter is: ", allProductData);
  

  // console.log("brand data: ",brandData ," category data: ", categoryData);

  if (isLoading || brandUseQuery.isLoading || categoryUseQuery.isLoading) {
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

  const searchedProduct = data?.data?.filter((item) => {
    if (searchTerm.value === '')
      return item;
    // if(item.title.toLowerCase().includes(searchTerm.toLowerCase()))
    //     return item
    if (item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      return item
  })
  // console.log(searchedProduct)
  const filterProduct1 = []
  const filterProduct = data?.data?.map((item) => {
    // if(item.price > 30000000) {
    //   filterProduct1.push(item);
    // }
    if(item.brand === brand) {
      filterProduct1.push(item)
    }
  })

  // const displayPage = filterProduct1.slice(visitedPage, visitedPage + productPerPage)
  // console.log('displayPage: ', displayPage);
  // const pageCount = Math.ceil(filterProduct1.length / productPerPage)

  const displayPage = searchedProduct.slice(visitedPage, visitedPage + productPerPage)
  console.log('displayPage: ', displayPage);
  const pageCount = Math.ceil(searchedProduct.length / productPerPage)



  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }
  const handleClick = () => {
    setOpen(!open);
  };

  // console.log("Product filter by brand is: ", allProductData);
  // console.log("Filter tab product is: ", filter);
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
                  value={searchTerm} onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setAllProductData([]);
                  }} />
                <span><i className='ri-search-line'></i></span>
              </div>
            </Col>
            {/* <button onClick={() => setFilter("Logitech")}>Logitech</button>
            <button onClick={() => setFilter("Samsung")}>Samsung</button>
            <button onClick={() => setFilter("Kingston")}>Kingston</button> */}
            
            <Col lg='6' md='6' sm='6' xs='12' className='mb-5'>
              <div className="sorting__widget text-end d-flex align-items-center
               justify-content-between w-100">

                <Box sx={{ minWidth: 200 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Brand</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={brand}
                      label="Brand"
                      onChange={handleChangeBrand}
                    >
                      {
                        brandData.map((item) => (
                          <MenuItem value={item.name}>{item.name}</MenuItem>
                        ))
                      }

                    </Select>
                  </FormControl>
                </Box>

                <Box sx={{ minWidth: 200 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={category}
                      label="Category"
                      onChange={handleChangeCategory}
                    >
                      {
                        categoryData.map((item) => (
                          <MenuItem value={item.name}>{item.name}</MenuItem>
                        ))
                      }

                    </Select>
                  </FormControl>
                </Box>

              </div>
            </Col>
            
            
            {
              allProductData.map((item) => (
                <Col lg='3' md='4' sm='6' xs='6' key={item.id} className='mb-4' >
                      {""}
                      <ProductCard item={item} sukien={handleClick} />
                    </Col>
              ))
            }
            <h2>Search product</h2>
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