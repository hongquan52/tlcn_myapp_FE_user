import React from 'react'
import { Drawer, Typography } from '@mui/material'
import { useState } from 'react'
import { ListGroupItem } from 'react-bootstrap'
import {Row, Col} from 'react-bootstrap'
import '../styles/historyorderdetail.css'
import { useEffect } from 'react'

const HistoryOrderDetail = ({ data, isShowFeedback, setIsShowFeedback }) => {
    // console.log(data)
    // const [itemData, setItemData] = useState([])

    // useState(() => {
    //     if(data) {
    //         setItemData(data)
    //     }
    // }, [data])
    // console.log(itemData)
    const [orderItem, setOrderItem] = useState([])
    useEffect(() => {
        if(data) {
            setOrderItem(data)
        }
    }, [data])
    console.log('Order item: ',orderItem.product)
    return (
        <Drawer
            open={isShowFeedback}
            anchor="right"
            onClose={() => setIsShowFeedback(!isShowFeedback)}
            modal
            sx={{ zIndex: 1000 }}
        >
            <div className="orderDetail__heading">
                <h4 className='orderDetail__heading-title'>Mã đơn hàng: {orderItem?.orderCode}</h4>
                <div className="orderDetail__heading-content">
                    <h5 >Tổng giá trị: <span className='total__amount'>{orderItem?.total} VNĐ</span></h5>
                    {
                        orderItem?.status === 'completed' ?
                        (
                            <h5>Trạng thái: <span className='status__completed'>Hoàn thành</span></h5>
                        ):
                        null
                    }
                    {
                        orderItem?.status === 'approved' ?
                        (
                            <h5>Trạng thái: <span className='status__completed'>Đã xác nhận</span></h5>
                        ):
                        null
                    }
                    {
                        orderItem?.status === 'wait_for_confirmation' ?
                        (
                            <h5>Trạng thái: <span className='status__wait_confirm'>Chờ xác nhận</span></h5>
                        ):
                        null
                    }
                    {
                        orderItem?.status === 'transporting' ?
                        (
                            <h5>Trạng thái: <span className='status__readyToShip'>Đang vận chuyển</span></h5>
                        ):
                        null
                    }
                    {
                        orderItem?.status === 'ready_to_ship' ?
                        (
                            <h5>Trạng thái: <span className='status__readyToShip'>Chuẩn bị giao</span></h5>
                        ):
                        null 
                    }
                    {
                        orderItem?.status === 'cancelled' ?
                        (
                            <h5>Trạng thái: <span className='status__canceled'>Đã hủy</span></h5>
                        ):
                        null
                    }
                </div>
            </div>
            {
                orderItem?.product?.map((item) => (
                    // <>
                    // <h5>{item.productId}</h5>
                    // <h5>{item.number}</h5>
                    // <h5>{item.price}</h5>
                    // </>

                    <ListGroupItem className='border-0 cart__item'>
                        <Row>
                            <Col lg='3' md='3'>
                                <img className='orderDetail__image'
                                 src={item.image[0]} alt="product-img" />
                                
                            </Col>
                            <Col lg='6' md='3'>
                                <div className="">
                                    <div>
                                        <h3 className='cart__product-title'>{item.name}</h3>
                                        <p className='d-flex align-items-center gap-5 cart__product-price'>
                                            <span>{item.price} VNĐ</span>
                                        </p>
                                        <div className='d-flex align-items-center justify-content-between
                                            increase__decrease-btn'>
                                            <span className='increase__btn'></span>
                                            <span className='quantity'>{item.number}</span>
                                            <span className='decrease__btn'></span>
                                        </div>  
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </ListGroupItem>
                ))
            }
        </Drawer>

    )
}

export default HistoryOrderDetail

const dataProduct = [
    {
        "_id": "6379d37be6599513482c4b4a",
        "productId": "01GHTRT4SRFDX6VZ4EHF155RKD",
        "number": 3,
        "price": 800
    },
    {
        "_id": "6379d37be6599513482c4b4b",
        "productId": "01GHTRZXCY9FK85268R7QWDT7K",
        "number": 2,
        "price": 864
    },
    {
        "_id": "6379d37be6599513482c4b4c",
        "productId": "01GHTS9P05W6BPXMBN1N1WH4CT",
        "number": 1,
        "price": 931
    },
    {
        "_id": "6379d37be6599513482c4b4d",
        "productId": "01GHTSPJCWX3HDRV9TB1GX9M19",
        "number": 3,
        "price": 180
    }
]

const productList = [
    {
        "image": [],
        "createdAt": "2022-11-19T13:14:54.650Z",
        "uid": "01GJ80E5SK81Q0TY6RCDMX6DCR",
        "code": "SP0057",
        "name": "Fan NZXT F120 RGB Single Black",
        "expiryDate": 24,
        "price": 20,
        "discount": 5,
        "discountPrice": 19,
        "quantity": 55
    },
    {
        "image": [],
        "createdAt": "2022-11-19T13:11:11.754Z",
        "uid": "01GJ807C3R4W7M3VSBY08H8QE9",
        "code": "SP0056",
        "name": "Tản nhiệt nước NZXT AIO Kraken X53 RGB WHITE",
        "expiryDate": 72,
        "price": 340,
        "discount": 15,
        "discountPrice": 289,
        "quantity": 35
    },
    {
        "image": [],
        "createdAt": "2022-11-19T13:07:29.862Z",
        "uid": "01GJ800KDY8MZEDFM6ZXGKXX91",
        "code": "SP0055",
        "name": "Tản nhiệt nước NZXT Kraken Z73 RGB - 360mm ( RL-KRZ73-R1 )",
        "expiryDate": 72,
        "price": 340,
        "discount": 15,
        "discountPrice": 289,
        "quantity": 40
    },
    {
        "image": [],
        "createdAt": "2022-11-19T13:03:46.011Z",
        "uid": "01GJ7ZSRTMKGH5BPFVPZP2MP2X",
        "code": "SP0054",
        "name": "Tản nhiệt nước Corsair H115i ELITE CAPELLIX",
        "expiryDate": 60,
        "price": 180,
        "discount": 15,
        "discountPrice": 153,
        "quantity": 40
    },
    {
        "image": [],
        "createdAt": "2022-11-19T13:00:04.486Z",
        "uid": "01GJ7ZK0G0YMYK1M91TFF0SPCS",
        "code": "SP0053",
        "name": "Tản nhiệt DEEPCOOL AG400 ARGB White)",
        "expiryDate": 12,
        "price": 30,
        "discount": 10,
        "discountPrice": 27,
        "quantity": 50
    },
    {
        "image": [],
        "createdAt": "2022-11-19T12:52:42.937Z",
        "uid": "01GJ7Z5H9GFB8NNS7FAWBT65P2",
        "code": "SP0052",
        "name": "SSD GIGABYTE AORUS 1TB M.2 PCIe NVMe gen 4 (Bản không heatsink)",
        "expiryDate": 36,
        "price": 200,
        "discount": 10,
        "discountPrice": 180,
        "quantity": 50
    },
    {
        "image": [],
        "createdAt": "2022-11-19T12:49:41.063Z",
        "uid": "01GJ7YZZNZ515T20SQ6T831157",
        "code": "SP0051",
        "name": "SSD Samsung 970 Evo Plus 250GB M.2 NVMe",
        "expiryDate": 60,
        "price": 70,
        "discount": 10,
        "discountPrice": 63,
        "quantity": 70
    },
    {
        "image": [],
        "createdAt": "2022-11-19T12:47:19.068Z",
        "uid": "01GJ7YVN0PNNDPTRJJ50TG7BE4",
        "code": "SP0050",
        "name": "SSD SamSung 980 PRO 500GB M.2 PCIe gen 4 NVMe (MZ-V8P500BW)",
        "expiryDate": 60,
        "price": 140,
        "discount": 10,
        "discountPrice": 126,
        "quantity": 40
    },
    {
        "image": [],
        "createdAt": "2022-11-19T12:43:36.590Z",
        "uid": "01GJ7YMVR6YHJKBQ5DAG21P6V4",
        "code": "SP0049",
        "name": "SSD Kingston A400 480GB 2.5' SATA III",
        "expiryDate": 36,
        "price": 60,
        "discount": 5,
        "discountPrice": 57,
        "quantity": 50
    },
    {
        "image": [],
        "createdAt": "2022-11-19T12:37:54.831Z",
        "uid": "01GJ7YAE09317FCZDBPEVYP5TJ",
        "code": "SP0048",
        "name": "Case Cooler Master Cosmos C700M - 30th Anniversary Limited Edition",
        "expiryDate": 12,
        "price": 1070,
        "discount": 20,
        "discountPrice": 856,
        "quantity": 7
    },
    {
        "image": [],
        "createdAt": "2022-11-19T12:34:34.229Z",
        "uid": "01GJ7Y4A38KQJAPA3BXF2K8M1K",
        "code": "SP0047",
        "name": "Case Cooler Master Cosmos C700M",
        "expiryDate": 12,
        "price": 480,
        "discount": 15,
        "discountPrice": 408,
        "quantity": 50
    },
    {
        "image": [],
        "createdAt": "2022-11-19T12:29:59.062Z",
        "uid": "01GJ7XVXCDCZSMNWVVMCSK6K37",
        "code": "SP0046",
        "name": "Case Corsair 4000X Black",
        "expiryDate": 24,
        "price": 140,
        "discount": 15,
        "discountPrice": 119,
        "quantity": 70
    },
    {
        "image": [],
        "createdAt": "2022-11-19T12:27:40.134Z",
        "uid": "01GJ7XQNPY4524H3J21E6GBSSP",
        "code": "SP0045",
        "name": "Case Corsair 220T White RGB Airflow Tempered Glass ( Mid-Tower )",
        "expiryDate": 24,
        "price": 280,
        "discount": 10,
        "discountPrice": 252,
        "quantity": 80
    },
    {
        "image": [],
        "createdAt": "2022-11-19T12:25:02.535Z",
        "uid": "01GJ7XJVSWBJ53KCWA3DKR2KDX",
        "code": "SP0044",
        "name": "Case Corsair 5000X RGB Tempered Glass White (sẵn 3 fan Argb)",
        "expiryDate": 24,
        "price": 280,
        "discount": 10,
        "discountPrice": 252,
        "quantity": 70
    },
    {
        "image": [],
        "createdAt": "2022-11-19T12:16:34.119Z",
        "uid": "01GJ7X3B9W1SSPQRFXECYW0MY4",
        "code": "SP0043",
        "name": "Ram Corsair Dominator Platinum 16GB (2x8GB) RGB 3200 White (CMT16GX4M2C3200C16W)",
        "expiryDate": 36,
        "price": 160,
        "discount": 15,
        "discountPrice": 136,
        "quantity": 150
    },
    {
        "image": [],
        "createdAt": "2022-11-19T12:12:18.636Z",
        "uid": "01GJ7WVHSQ0YNN0J3BTWMDSM1A",
        "code": "SP0042",
        "name": "RAM Corsair Dominator Platinum 64GB (2x32GB) RGB 5200 DDR5 (CMT64GX5M2B5200C40)",
        "expiryDate": 36,
        "price": 450,
        "discount": 10,
        "discountPrice": 405,
        "quantity": 140
    },
    {
        "image": [],
        "createdAt": "2022-11-19T12:08:24.041Z",
        "uid": "01GJ7WMCPZ2DA3E47AN9ZCVSTP",
        "code": "SP0041",
        "name": "RAM Kingston Fury Beast 8GB 3200 DDR4 RGB SE (KF432C16BWA/8)",
        "expiryDate": 36,
        "price": 50,
        "discount": 10,
        "discountPrice": 45,
        "quantity": 100
    },
    {
        "image": [],
        "createdAt": "2022-11-19T12:01:01.398Z",
        "uid": "01GJ7W6WEFPRZ8T63C11VQHHSQ",
        "code": "SP0040",
        "name": "GIGABYTE B660M AORUS PRO AX DDR4 (rev. 1.0)",
        "expiryDate": 36,
        "price": 180,
        "discount": 15,
        "discountPrice": 153,
        "quantity": 120
    },
    {
        "image": [],
        "createdAt": "2022-11-19T11:57:34.716Z",
        "uid": "01GJ7W0JKNZRXX0GK3V0VMRMB5",
        "code": "SP0039",
        "name": "ASUS ROG CROSSHAIR X670E EXTREME (Socket AM5)",
        "expiryDate": 36,
        "price": 1000,
        "discount": 15,
        "discountPrice": 850,
        "quantity": 80
    },
    {
        "image": [],
        "createdAt": "2022-11-19T11:53:34.242Z",
        "uid": "01GJ7VS7RVZ1RAN0MFJGBA00QA",
        "code": "SP0038",
        "name": "ASUS PRIME H610M-A WIFI D4",
        "expiryDate": 36,
        "price": 110,
        "discount": 10,
        "discountPrice": 99,
        "quantity": 100
    },
    {
        "image": [],
        "createdAt": "2022-11-19T11:45:28.193Z",
        "uid": "01GJ7VAD2ZFGS6X3KAPMWZ2Y5V",
        "code": "SP0037",
        "name": "ASUS TUF GAMING Z690-PLUS WIFI DDR4",
        "expiryDate": 36,
        "price": 282,
        "discount": 0,
        "discountPrice": 282,
        "quantity": 125
    },
    {
        "image": [],
        "createdAt": "2022-11-19T11:35:02.219Z",
        "uid": "01GJ7TQ9SV46WY31VV1N5W5DE5",
        "code": "SP0036",
        "name": "ASUS PRIME Z790-A WIFI DDR5",
        "expiryDate": 36,
        "price": 880,
        "discount": 5,
        "discountPrice": 836,
        "quantity": 100
    },
    {
        "image": [],
        "createdAt": "2022-11-19T10:44:10.453Z",
        "uid": "01GJ7QT5JDYBDJTX92Y0S68WSH",
        "code": "SP0035",
        "name": "Intel Core i5 11400 / 12MB / 4.4GHZ / 6 nhân 12 luồng / LGA 1200",
        "expiryDate": 36,
        "price": 240,
        "discount": 5,
        "discountPrice": 228,
        "quantity": 200
    },
    {
        "image": [],
        "createdAt": "2022-11-19T10:41:37.402Z",
        "uid": "01GJ7QNG3HRHCDBZ0JVHQ7KF2X",
        "code": "SP0034",
        "name": "Intel Core i7 13700KF / 3.4GHz Turbo 5.4GHz / 16 Nhân 24 Luồng / 30MB / LGA 1700",
        "expiryDate": 36,
        "price": 960,
        "discount": 15,
        "discountPrice": 816,
        "quantity": 200
    },
    {
        "image": [],
        "createdAt": "2022-11-19T10:39:12.820Z",
        "uid": "01GJ7QH2XB4F11S43NGJYD6DX0",
        "code": "SP0033",
        "name": "Intel Core i9 12900KS / 3.4GHz Turbo 5.5GHz / 16 Nhân 24 Luồng / 30MB / LGA 1700",
        "expiryDate": 36,
        "price": 1940,
        "discount": 10,
        "discountPrice": 1746,
        "quantity": 180
    },
    {
        "image": [],
        "createdAt": "2022-11-19T10:35:57.068Z",
        "uid": "01GJ7QB3R3RQ25A4M7Y184AMPQ",
        "code": "SP0032",
        "name": "AMD Ryzen 5 4600G / 3.7GHz Boost 4.2GHz / 6 nhân 12 luồng / 11MB / AM4",
        "expiryDate": 36,
        "price": 180,
        "discount": 10,
        "discountPrice": 162,
        "quantity": 80
    },
    {
        "image": [],
        "createdAt": "2022-11-19T10:34:17.284Z",
        "uid": "01GJ7Q829XN2JGJ16QD7H9E9AD",
        "code": "SP0031",
        "name": "AMD Ryzen 5 5600X / 3.7GHz Boost 4.6GHz / 6 nhân 12 luồng / 32MB / AM4",
        "expiryDate": 36,
        "price": 300,
        "discount": 20,
        "discountPrice": 240,
        "quantity": 140
    },
    {
        "image": [],
        "createdAt": "2022-11-19T10:31:44.856Z",
        "uid": "01GJ7Q3DEE4VNT98C4WK5DP41G",
        "code": "SP0030",
        "name": "AMD Ryzen 7 7700X / 4.5GHz Boost 5.4GHz / 8 nhân 16 luồng / 40MB / AM5",
        "expiryDate": 36,
        "price": 1200,
        "discount": 20,
        "discountPrice": 960,
        "quantity": 150
    },
    {
        "image": [],
        "createdAt": "2022-11-19T10:23:16.838Z",
        "uid": "01GJ7PKXAYV4ENB0D938Z3JPQR",
        "code": "SP0029",
        "name": "ASUS ROG Strix GeForce RTX 4090 OC Edition 24GB GDDR6X",
        "expiryDate": 36,
        "price": 3955,
        "discount": 0,
        "discountPrice": 3955,
        "quantity": 50
    },
    {
        "image": [],
        "createdAt": "2022-11-19T10:20:47.624Z",
        "uid": "01GJ7PFBM14CSWBPD9TK31QHG8",
        "code": "SP0028",
        "name": "ASUS TUF Gaming GeForce RTX 3080 Ti O12G GDDR6X",
        "expiryDate": 36,
        "price": 2850,
        "discount": 10,
        "discountPrice": 2565,
        "quantity": 100
    },
    {
        "image": [],
        "createdAt": "2022-11-19T10:18:10.387Z",
        "uid": "01GJ7PAJ24TDZ7F74F9G5JZAEQ",
        "code": "SP0027",
        "name": "GIGABYTE AORUS GeForce RTX 4080 MASTER 16G",
        "expiryDate": 36,
        "price": 4600,
        "discount": 10,
        "discountPrice": 4140,
        "quantity": 50
    },
    {
        "image": [],
        "createdAt": "2022-11-19T10:16:14.191Z",
        "uid": "01GJ7P70K8DP00NP66C1YZN1YS",
        "code": "SP0026",
        "name": "Gigabyte AORUS GeForce RTX 3090 Ti XTREME WATERFORCE 24G",
        "expiryDate": 36,
        "price": 4450,
        "discount": 10,
        "discountPrice": 4005,
        "quantity": 50
    },
    {
        "image": [],
        "createdAt": "2022-11-19T10:14:01.707Z",
        "uid": "01GJ7P2Z70MJX2QEXHPQ36QSJP",
        "code": "SP0025",
        "name": "GIGABYTE GeForce RTX 3090 GAMING OC 24G",
        "expiryDate": 36,
        "price": 3700,
        "discount": 10,
        "discountPrice": 3330,
        "quantity": 80
    },
    {
        "image": [],
        "createdAt": "2022-11-19T10:11:27.293Z",
        "uid": "01GJ7NY8DKMAAR6Y9ZR5NG4MNF",
        "code": "SP0024",
        "name": "GIGABYTE AORUS GeForce RTX 3080 Xtreme Waterforce WB 10G",
        "expiryDate": 36,
        "price": 2800,
        "discount": 10,
        "discountPrice": 2520,
        "quantity": 80
    },
    {
        "image": [],
        "createdAt": "2022-11-19T10:08:53.219Z",
        "uid": "01GJ7NSHYMVMZMKEEQ3GPVDKAZ",
        "code": "SP0023",
        "name": "GIGABYTE AORUS GeForce RTX 3070 Ti MASTER 8G",
        "expiryDate": 36,
        "price": 1300,
        "discount": 10,
        "discountPrice": 1170,
        "quantity": 110
    },
    {
        "image": [],
        "createdAt": "2022-11-19T10:05:47.484Z",
        "uid": "01GJ7NKWJG3XAQPKD93MS6N6SM",
        "code": "SP0022",
        "name": "GIGABYTE GeForce RTX 3070 VISION OC 8G (rev 2.0)",
        "expiryDate": 36,
        "price": 650,
        "discount": 10,
        "discountPrice": 585,
        "quantity": 110
    },
    {
        "image": [],
        "createdAt": "2022-11-19T09:59:44.833Z",
        "uid": "01GJ7N8TD65SKFCAW4RK75RJ0C",
        "code": "SP0021",
        "name": "Leadtek NVIDIA Quadro P620 2GB GDDR5",
        "expiryDate": 36,
        "price": 450,
        "discount": 10,
        "discountPrice": 405,
        "quantity": 100
    },
    {
        "image": [
            "string"
        ],
        "createdAt": "2022-11-17T15:58:11.919Z",
        "uid": "01GJ34ZQE3C2NJ01NT5NP8RWPV",
        "code": "SP0020",
        "name": "Cao Trí",
        "expiryDate": 24,
        "price": 3000,
        "discount": 10,
        "discountPrice": 2700,
        "quantity": 100
    },
    {
        "image": [
            "anh.jpg"
        ],
        "createdAt": "2022-11-17T09:53:57.875Z",
        "uid": "01GJ2G4SKE2ZQF47XDTNF4QF0T",
        "code": "",
        "name": "test 223",
        "expiryDate": 0,
        "price": 1000,
        "discount": 0,
        "discountPrice": 1000,
        "quantity": 10
    },
    {
        "image": [
            "https://product.hstatic.net/1000026716/product/tuf-b660m-plus-wifi-d4-01_0c7a9a623c9745ea85dcbccc866ce033.jpg",
            "https://product.hstatic.net/1000026716/product/tuf-b660m-plus-wifi-d4-01_0c7a9a623c9745ea85dcbccc866ce033.jpg",
            "https://product.hstatic.net/1000026716/product/tuf-b660m-plus-wifi-d4-03_a1c96d6c2f2f4a099372956f2e4094ab.jpg",
            "https://product.hstatic.net/1000026716/product/tuf-b660m-plus-wifi-d4-03_a1c96d6c2f2f4a099372956f2e4094ab.jpg"
        ],
        "createdAt": "2022-11-17T06:53:27.463Z",
        "uid": "01GJ25T90CTNXPFV48VX0RYMTD",
        "code": "SP0018",
        "name": "ASUS TUF GAMING B660M-PLUS WIFI DDR4",
        "expiryDate": 36,
        "price": 700,
        "discount": 10,
        "discountPrice": 630,
        "quantity": 60
    },
    {
        "image": [
            "https://product.hstatic.net/1000026716/product/preview_1_i9k_special_box_right_26064d1b0cdc48b1a81fef46b9804046.jpg,https://product.hstatic.net/1000026716/product/preview_2_i9k_special_box_left_8e9d955731504617bfafd7e42bd94360.jpg,https://product.hstatic.net/1000026716/product/preview_2_i9k_special_box_left_8e9d955731504617bfafd7e42bd94360.jpg"
        ],
        "createdAt": "2022-11-14T10:16:41.592Z",
        "uid": "01GHTT88B707QMW0PW5P6MKQ9J",
        "code": "",
        "name": "Intel Core i9 12900KS / 3.4GHz Turbo 5.5GHz / 16 Nhân 24 Luồng / 30MB / LGA 1700",
        "expiryDate": 36,
        "price": 850,
        "discount": 10,
        "discountPrice": 765,
        "quantity": 55
    },
    {
        "image": [
            "https://product.hstatic.net/1000026716/product/gearvn-intel-core-i5-12400f-28_ddd5ef7cd12d4513b5541b3047a5e078.jpg",
            "https://product.hstatic.net/1000026716/product/box_t4_i5f_12th_m35582_ang03_left_v01_1280x1280_fb37895518ad463d80b9685f1be7e80e.png",
            "https://product.hstatic.net/1000026716/product/gearvn-intel-core-i5-12400f-0_0a810bba7f1946358baa3b053026d494.jpg",
            "https://product.hstatic.net/1000026716/product/gearvn-intel-core-i5-12400f-7_8067cb4c9bee4ba98aa57cf403750796.jpg"
        ],
        "createdAt": "2022-11-14T10:10:27.484Z",
        "uid": "01GHTSWV04C0KTZTDNCKCEHBB5",
        "code": "SP0016",
        "name": "Intel Core i5 12400F / 2.5GHz Turbo 4.4GHz / 6 Nhân 12 Luồng / 18MB / LGA 1700",
        "expiryDate": 36,
        "price": 360,
        "discount": 10,
        "discountPrice": 324,
        "quantity": 55
    },
    {
        "image": [
            "https://product.hstatic.net/1000026716/product/10105f_5b126b4acf4948cc9569ec7f73d8b273.jpg"
        ],
        "createdAt": "2022-11-14T10:07:02.060Z",
        "uid": "01GHTSPJCWX3HDRV9TB1GX9M19",
        "code": "SP0015",
        "name": "Intel Core i3 10105F / 6MB / 4.4GHZ / 4 nhân 8 luồng / LGA 1200",
        "expiryDate": 36,
        "price": 200,
        "discount": 10,
        "discountPrice": 180,
        "quantity": 55
    },
    {
        "image": [
            "https://product.hstatic.net/1000026716/product/argb-led-strip-scenario-photo-2-image_2b1a0c0a971541c3931de1b96a5ed7c4.jpg",
            "https://product.hstatic.net/1000026716/product/argb-led-strip-scenario-photo-1-zoom_cedbbb56ed58494da5de1758eb1d10e8.jpg",
            "https://product.hstatic.net/1000026716/product/argb-led-strip-scenario-photo-3-image_22b5fb91cbec43f0b0ef9f35646c8cce.jpg",
            "https://product.hstatic.net/1000026716/product/argb-led-strip-scenario-photo-4-image_4d5c702de0e248ab9c8bffd4dcde2d9d.jpg"
        ],
        "createdAt": "2022-11-14T09:59:59.762Z",
        "uid": "01GHTS9P05W6BPXMBN1N1WH4CT",
        "code": "SP0014",
        "name": "Phụ kiện Cooler Master ADDRESSABLE RGB LED STRIP",
        "expiryDate": 24,
        "price": 980,
        "discount": 5,
        "discountPrice": 931,
        "quantity": 45
    },
    {
        "image": [
            "https://product.hstatic.net/1000026716/product/gearvn-fan-cougar-vortex-fr120-led-666_83beb3beae07451a8d85564799a755de.png",
            "https://product.hstatic.net/1000026716/product/gearvn-fan-cougar-vortex-fr120-led-2_e30583f36623432b922fc768bc958bff.png",
            "https://product.hstatic.net/1000026716/product/gearvn-fan-cougar-vortex-fr120-led-2_e30583f36623432b922fc768bc958bff.png",
            "https://product.hstatic.net/1000026716/product/gearvn-fan-cougar-vortex-fr120-led-4_eb7dae09859a4a4988426726ea9f9238.png"
        ],
        "createdAt": "2022-11-14T09:57:11.310Z",
        "uid": "01GHTS4HG6YNNRP0YYZBBZWXF8",
        "code": "SP0013",
        "name": "Fan Cougar Vortex FR120 Led",
        "expiryDate": 36,
        "price": 800,
        "discount": 5,
        "discountPrice": 760,
        "quantity": 45
    },
    {
        "image": [
            "https://product.hstatic.net/1000026716/product/gearvn-fan-xigmatek-starz-x22a-argb-pack-x3-controller-1_15aa98d5d4b7488a86943ea93a8d1f39.png",
            "https://product.hstatic.net/1000026716/product/gearvn-fan-xigmatek-starz-x22a-argb-pack-x3-controller-1_15aa98d5d4b7488a86943ea93a8d1f39.png",
            "https://product.hstatic.net/1000026716/product/gearvn-fan-xigmatek-starz-x22a-argb-pack-x3-controller-2_1da28ab1f8114c1ea224a89956b40de7.png",
            "https://product.hstatic.net/1000026716/product/gearvn-fan-xigmatek-starz-x22a-argb-pack-x3-controller-3_dd04ab2135104a46b70786375335386f.png",
            "https://product.hstatic.net/1000026716/product/gearvn-fan-xigmatek-starz-x22a-argb-pack-x3-controller-6_cd12fbd0ff634959a4a6f74a6c290c3f.png"
        ],
        "createdAt": "2022-11-14T09:54:39.658Z",
        "uid": "01GHTRZXCY9FK85268R7QWDT7K",
        "code": "SP0012",
        "name": "Fan XIGMATEK STARZ - X22A ARGB - PACK x3, CONTROLLER",
        "expiryDate": 36,
        "price": 960,
        "discount": 10,
        "discountPrice": 864,
        "quantity": 45
    },
    {
        "image": [
            "https://product.hstatic.net/1000026716/product/gearvn-fan-xigmatek-x22f-rgb-fixed-2_bccc8fddd64a4da7994ee1549c39fe35.png",
            "https://product.hstatic.net/1000026716/product/gearvn-fan-xigmatek-x22f-rgb-fixed-2_bccc8fddd64a4da7994ee1549c39fe35.png",
            "https://product.hstatic.net/1000026716/product/gearvn-fan-xigmatek-x22f-rgb-fixed-2_bccc8fddd64a4da7994ee1549c39fe35.png",
            "https://product.hstatic.net/1000026716/product/gearvn-fan-xigmatek-x22f-rgb-fixed-3_9c2e1200de694000a3afa3819cb96901.png"
        ],
        "createdAt": "2022-11-14T09:51:30.632Z",
        "uid": "01GHTRT4SRFDX6VZ4EHF155RKD",
        "code": "SP0011",
        "name": "Fan XIGMATEK X22F - RGB FIXED",
        "expiryDate": 36,
        "price": 1000,
        "discount": 20,
        "discountPrice": 800,
        "quantity": 35
    },
    {
        "image": [
            "https://product.hstatic.net/1000026716/product/gearvn.com-products-ssd-kingston-a400-480gb-2-5-sata-iii-1_-_copy_33e62d6fbef94f12ad2386515aa0e947.jpg",
            "https://product.hstatic.net/1000026716/product/gearvn.com-products-ssd-kingston-a400-480gb-2-5-sata-iii-2_0ce9182f47e64d0393871fb8677242ae.jpg",
            "https://product.hstatic.net/1000026716/product/gearvn.com-products-ssd-kingston-a400-480gb-2-5-sata-iii-2_0ce9182f47e64d0393871fb8677242ae.jpg",
            "https://product.hstatic.net/1000026716/product/gearvn.com-products-ssd-kingston-a400-480gb-2-5-sata-iii-4_cbb14172a7a54be8be024a9708cc4271.jpg"
        ],
        "createdAt": "2022-11-14T08:25:07.025Z",
        "uid": "01GHTKVYP320GQ4YJB7ZRG1W91",
        "code": "SP0010",
        "name": "SSD Kingston A400 480GB 2.5' SATA III",
        "expiryDate": 36,
        "price": 1200,
        "discount": 20,
        "discountPrice": 960,
        "quantity": 25
    },
    {
        "image": [
            "https://product.hstatic.net/1000026716/product/gearvn-ram-laptop-kingston-fury-32gb-ddr5-4800mhz-kf548s38ib-32-1_4b783c77520c4a10a25345757d54fa70.png",
            "https://product.hstatic.net/1000026716/product/gearvn-ram-laptop-kingston-fury-32gb-ddr5-4800mhz-kf548s38ib-32-1_4b783c77520c4a10a25345757d54fa70.png",
            "https://product.hstatic.net/1000026716/product/gearvn-ram-laptop-kingston-fury-32gb-ddr5-4800mhz-kf548s38ib-32-2_3e9f8d001fd04f0f93bf76bd3f6c470f.png"
        ],
        "createdAt": "2022-11-14T08:22:32.233Z",
        "uid": "01GHTKQ7GSAWMNMG65CKWS3CZH",
        "code": "SP0009",
        "name": "Ram Laptop Kingston Fury 32GB DDR5 4800MHZ KF548S38IB-32",
        "expiryDate": 36,
        "price": 1100,
        "discount": 20,
        "discountPrice": 880,
        "quantity": 5
    },
    {
        "image": [
            "https://product.hstatic.net/1000026716/product/16gb_6637ede3fe484daea39fa860df8a0dd3.png"
        ],
        "createdAt": "2022-11-14T08:21:04.557Z",
        "uid": "01GHTKMHX0KY06MPP76RTMVV2H",
        "code": "SP0008",
        "name": "Ram Laptop Kingston 16G DDR5 4800 S40 1Rx8 SODIMM KVR48S40BS8-16",
        "expiryDate": 36,
        "price": 950,
        "discount": 10,
        "discountPrice": 855,
        "quantity": 5
    },
    {
        "image": [
            "https://product.hstatic.net/1000026716/product/ktc-product-ssd-snv2s-2000g-3-lg_320bf6f1cf6340e4880ffd6166e3fa1f.jpg",
            "https://product.hstatic.net/1000026716/product/ktc-product-ssd-snv2s-2000g-2-lg_86e24ee557794b1a8cde730b8bdbe0b5.jpg",
            "https://product.hstatic.net/1000026716/product/ktc-product-ssd-snv2s-2000g-1-lg_f4cfb3383e3c48df805f17984bdb0189.jpg"
        ],
        "createdAt": "2022-11-14T08:18:47.998Z",
        "uid": "01GHTKGCHEZQ41HXN1YHJBD672",
        "code": "SP0007",
        "name": "SSD Kingston NV2 2TB M.2 PCIe NVMe Gen4",
        "expiryDate": 36,
        "price": 900,
        "discount": 10,
        "discountPrice": 810,
        "quantity": 10
    },
    {
        "image": [
            "https://product.hstatic.net/1000026716/product/ktc-product-memory-beast-ddr4-rgb-se-single-3-lg_918326d759f7417690179d86394d8102.jpg",
            "https://product.hstatic.net/1000026716/product/ktc-product-memory-beast-ddr4-rgb-se-single-1-lg_7b353c53f9e743c3b93ad80e4848ef7a.jpg",
            "https://product.hstatic.net/1000026716/product/ktc-product-memory-beast-ddr4-rgb-se-single-2-lg_1a1ed5bae2434be49f7ff894961a084f.jpg"
        ],
        "createdAt": "2022-11-14T08:16:11.264Z",
        "uid": "01GHTKBKFPZZ311GXTGWJFDAAE",
        "code": "SP0006",
        "name": "RAM Kingston Fury Beast 8GB 3200 DDR4 RGB SE (KF432C16BWA/8)",
        "expiryDate": 36,
        "price": 1500,
        "discount": 50,
        "discountPrice": 750,
        "quantity": 70
    },
    {
        "image": [
            "https://product.hstatic.net/1000026716/product/tai_xuong_6044a67859ad46be9534611b2b126976.png",
            "https://product.hstatic.net/1000026716/product/tai_xuong__15__f905ce54046a4a21938ad9afb8908bc4.png",
            "https://product.hstatic.net/1000026716/product/tai_xuong__14__6ce73123126f4c6b9c74999492266f5c.png",
            "https://product.hstatic.net/1000026716/product/tai_xuong__2__1b89d903051849f6bb0e3f0247790a1e.png"
        ],
        "createdAt": "2022-11-14T08:11:22.195Z",
        "uid": "01GHTK2S6ABAZC0F070QDEB7TN",
        "code": "SP0005",
        "name": "ASUS Dual GeForce RTX 3060 V2 12GB GDDR6 (LHR)",
        "expiryDate": 36,
        "price": 2000,
        "discount": 50,
        "discountPrice": 1000,
        "quantity": 70
    },
    {
        "image": [
            "https://product.hstatic.net/1000026716/product/4_7bd7709379314705968d983646f8f3dc.png",
            "https://product.hstatic.net/1000026716/product/3_139e6507928a490fae470087008b1200.png",
            "https://product.hstatic.net/1000026716/product/7_1e6f4019631e4007920ef7528039a0f9.png",
            "https://product.hstatic.net/1000026716/product/7_1e6f4019631e4007920ef7528039a0f9.png",
            "https://product.hstatic.net/1000026716/product/6_9f104d54089b42b2aee95625fc5bea5d.png"
        ],
        "createdAt": "2022-11-14T08:08:38.119Z",
        "uid": "01GHTJXRYQC0DJZAY06B5EJN9K",
        "code": "SP0004",
        "name": "ASUS Dual GeForce RTX 3060 Ti V2 O8G GDDR6 (LHR)",
        "expiryDate": 36,
        "price": 500,
        "discount": 15,
        "discountPrice": 425,
        "quantity": 40
    },
    {
        "image": [
            "https://product.hstatic.net/1000026716/product/asus_dual_geforce_rtx_3050_oc_edition_8gb__10__d2c507b4734341e1bb1547d943a31701.jpg",
            "https://product.hstatic.net/1000026716/product/asus_dual_geforce_rtx_3050_oc_edition_8gb__10__d2c507b4734341e1bb1547d943a31701.jpg",
            "https://product.hstatic.net/1000026716/product/asus_dual_geforce_rtx_3050_oc_edition_8gb__5__71cf814330654e8cbe7532f99395dd32.jpg",
            "https://product.hstatic.net/1000026716/product/asus_dual_geforce_rtx_3050_oc_edition_8gb__2__ece9ff0ee2314d1e97c1f8641bb20562.jpg",
            "https://product.hstatic.net/1000026716/product/asus_dual_geforce_rtx_3050_oc_edition_8gb__8__92fa94051cbd4496a68cc3f85828409b.jpg",
            "https://product.hstatic.net/1000026716/product/asus_dual_geforce_rtx_3050_oc_edition_8gb__8__92fa94051cbd4496a68cc3f85828409b.jpg"
        ],
        "createdAt": "2022-11-14T08:06:03.848Z",
        "uid": "01GHTJS2A0AA856K30CW5GVZAD",
        "code": "SP0003",
        "name": "ASUS Dual GeForce RTX 3050 OC Edition 8GB",
        "expiryDate": 36,
        "price": 1000,
        "discount": 20,
        "discountPrice": 800,
        "quantity": 40
    },
    {
        "image": [
            "https://product.hstatic.net/1000026716/product/asus_dual_geforce_rtx_3050_8gb__11__8d0f0351677f417887073d9608cc76fd.jpg",
            "https://product.hstatic.net/1000026716/product/asus_dual_geforce_rtx_3050_8gb__5__59f3389ef78a4cdcb33b0f0aa74212d4.jpg",
            "https://product.hstatic.net/1000026716/product/asus_dual_geforce_rtx_3050_8gb__6__fc85180930e8401a93b57cae932d4948.jpg",
            "https://product.hstatic.net/1000026716/product/asus_dual_geforce_rtx_3050_8gb__7__e791ee02043b4422ae9601f62c595cb2.jpg",
            "https://product.hstatic.net/1000026716/product/asus_dual_geforce_rtx_3050_8gb__8__6ab0bfe247824a54b1e8aad3cabf4666.jpg",
            "https://product.hstatic.net/1000026716/product/asus_dual_geforce_rtx_3050_8gb__9__1fb3263373ca47efa97feb8ce7fba314.jpg",
            "https://product.hstatic.net/1000026716/product/asus_dual_geforce_rtx_3050_8gb__3__f06dd34c582c495cb6d247daa6ac97d0.jpg"
        ],
        "createdAt": "2022-11-14T08:04:05.030Z",
        "uid": "01GHTJNE8RHWF0PRGV1H3BSPRR",
        "code": "SP0002",
        "name": "ASUS Dual GeForce RTX 3050 8GB",
        "expiryDate": 36,
        "price": 500,
        "discount": 10,
        "discountPrice": 450,
        "quantity": 50
    },
    {
        "image": [
            "https://product.hstatic.net/1000026716/product/01_2332cba6be5243a7b5fd9dca236be128.png",
            "https://product.hstatic.net/1000026716/product/03_f62198c733ce4003882c675e7d727db8.png",
            "https://product.hstatic.net/1000026716/product/04_3cdb257ab1e044c383e4083d6c85bcce.png",
            "https://product.hstatic.net/1000026716/product/04_3cdb257ab1e044c383e4083d6c85bcce.png",
            "https://product.hstatic.net/1000026716/product/05_735bfe60020b4a1690e78efcdf046e3a.png",
            "https://product.hstatic.net/1000026716/product/07_b48e31afd59947fc8f908dac58a54d82.png"
        ],
        "createdAt": "2022-11-14T07:58:46.573Z",
        "uid": "01GHTJBQ87ZKS7G8K2RTBQM730",
        "code": "SP0014",
        "name": "ASUS Dual GeForce RTX 2060 OC EVO 6GB GDDR6",
        "expiryDate": 36,
        "price": 400,
        "discount": 10,
        "discountPrice": 360,
        "quantity": 30
    }
]