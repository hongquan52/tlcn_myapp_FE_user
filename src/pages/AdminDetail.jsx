import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Helmet from '../components/Helmet/Helmet'

import { Box, CircularProgress } from '@mui/material'

import { useQuery } from '@tanstack/react-query'
import {getProduct} from '../api/fetchers/product'
import { thunkProductTypes} from "../constants/thunkTypes";

const AdminDetail = () => {
    const productId = useParams()
    console.log(productId.productId)
    const {isLoading, data} = useQuery([thunkProductTypes.GET_PRODUCT],
        () => getProduct(productId.productId))
    //const [productData, setProductData] = useState([])
    

    console.log(productId)
    
    // useEffect(() => {
    //     if(data) {
    //         setProductData(data.data.results.data)
    //     }
    // })    

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
    console.log('data: ' ,data)
    console.log('Product data: ', data.data.results)
    return (
        <Helmet title='Admin detail'>
            <div><h2>Admin detail</h2>
                
            </div>
        </Helmet>
    )
}

export default AdminDetail