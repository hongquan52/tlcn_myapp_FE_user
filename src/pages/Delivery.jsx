import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { getDelivery } from '../api/fetchers/order'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/common-section/CommonSection'
import { thunkOrderTypes } from '../constants/thunkTypes'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Delivery = () => {
    const { billId } = useParams()
    const { isLoading, data } = useQuery([thunkOrderTypes.GET_DELIVERY], () => getDelivery(billId))
    const [delivery, setDelivery] = useState([])
    
    
    useEffect(() => {
        if (data) {
            setDelivery(data.data)
        }
        
    }, [data])
    const addressDelivery = delivery.deliveryApartmentNumber+' '+delivery.deliveryWard+' '+delivery.deliveryDistrict+' '+delivery.deliveryProvince
    
    if(isLoading) {
        return <div>...Loading</div>
    }

    return (
        
        <Helmet title="delivery">
            <CommonSection title="Delivery"></CommonSection>
            
            <section>
            <form
                    className='form userUpdateForm'
                    id='form'
                    
                    style={{
                        'marginBottom': '40px',
                    }}
                >
                    <div className="userUpdateLeft">
                        <div className="form__group">
                            <label>Mã đơn hàng</label>
                            <input
                                
                                type='text'
                                placeholder='Full name'
                                className=''
                                value={delivery.billId}
                            />
                        </div>
                        <div className="form__group">
                            <label>Tổng tiển</label>
                            <input
                                
                                type='text'
                                placeholder='Total Price'
                                className=''
                                value={delivery.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                + " VNĐ"}
                            />
                        </div>
                        <div className="form__group">
                            <label>Tên người giao hàng</label>
                            <input
                                
                                type='text'
                                placeholder='Last name'
                                className=''
                                value={delivery.shipperName}
                            />
                        </div>
                        
                        <div className="form__group">
                            <label>Số điện thoại người giao hàng</label>
                            <input
                                type='text'
                                placeholder='Ngay sinh'
                                className=''
                                value={delivery.shipperPhone}

                            />
                        </div>
                        <div className="form__group">
                            <label>Tình trạng đơn hàng</label>
                            <input
                                type='text'
                                placeholder='Tình trạng đơn hàng'
                                className=''
                                value={delivery.status}

                            />
                       
                        </div>
                        <div className="form__group">
                            <label>Địa chỉ giao hàng</label>
                            <input
                                
                                type='text'
                                placeholder='Phone'
                                className=''
                                value={addressDelivery}
                            />
                        </div>
                        
                    </div>


                    <div className="userFormRight">
                        <Link to={"/historyOrder"}>
                        <button className="addToCart__btn">
                            Go back bill list

                        </button>
                        </Link>
                    </div>

                </form>
            </section>
        </Helmet>

    )
}

export default Delivery