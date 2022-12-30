import React from 'react'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/common-section/CommonSection'
import { Box, CircularProgress } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import HistoryOrderDetail from './HistoryOrderDetail';
import { useQuery } from '@tanstack/react-query';
import { thunkOrderTypes } from '../constants/thunkTypes';
import { getAllOrder } from '../api/fetchers/order';
import { useEffect } from 'react';
import '../styles/historyorderdetail.css'



const HistoryOrder = () => {

    const {isLoading, data} = useQuery([thunkOrderTypes.GET_ALLORDER], getAllOrder)
    const [dataFeedback, setDataFeedback] = useState(null);
    const [isShowFeedback, setIsShowFeedback] = useState(false);


    const [orderData, setOrderData] = useState([])

    useEffect(() => {
        if(data) {
            
            setOrderData(data.data.results)
        }
    }, [data])

    const columns = [
        { field: "orderCode", headerName: "Mã đơn hàng", width: 300 },
        
        // { field: "total", headerName: "Số lượng sản phẩm", width: 300 },
        { field: "date", headerName: "Ngày tạo", width: 300 },
        // { field: "total", headerName: "Tổng giá trị", width: 300 },
        { field: "total", headerName: "Tổng giá trị", width: 300, renderCell: (params) => {
            if(params.row.total) {
                return `${params.row.total} VNĐ`
            }
        } },
        { field: "status", headerName: "Trạng thái", width: 300, renderCell: (params) => {
            if(params.row.status === 'completed') {
                return 'Hoàn tất'
            }
            else if(params.row.status === 'wait_for_confirmation') {
                return 'Chờ xác nhận'
            }
            else if (params.row.status==='cancelled') {
                return 'Đã hủy'
            }
            else if (params.row.status==='approved') {
                return 'Đã xác nhận'
            }
            else if(params.row.status === 'transporting') {
                return 'Đang giao hàng'
            }
        }},
        { field: "deliveryDate", headerName: "Ngày giao hàng", width: 200 },
    //     {
    //         field: "action",
    //         headerName: "Action",
    //         width: 300,
    //         renderCell: (params) => {
            
    //           return (
    //             <>
    //               <Link to={'/admin/'+params.row.uid}>
    //                 <button className="addToCart__btn"
    //                 >Chi tiết</button>
    //               </Link>
                  
    //             </>
    //           );

    //         },
    // },
    ];
    
    //
    const handleRowClick = (params) => {
        setIsShowFeedback(true);
        setDataFeedback(params.row);

    }

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
        <Helmet title="history transaction">
            <CommonSection title="Lịch sử giao dịch" />
            <DataGrid className='data__grid'
                // rows={data.data.results}
                rows={orderData}
                columns={columns}
                pageSize={6}
                rowsPerPageOptions={[5]}
                // checkboxSelection
                disableSelectionOnClick
                // experimentalFeatures={{ newEditingApi: true }}
                autoHeight
                getRowId={(row) =>  row.uid}
                onRowClick={handleRowClick}
            />
            <HistoryOrderDetail
                data={dataFeedback}
                isShowFeedback={isShowFeedback}
                setIsShowFeedback={setIsShowFeedback}
            />
        </Helmet>
    )
}

export default HistoryOrder
