import React from 'react'
import {Container, Col, Row} from 'reactstrap'

import categoryImg01 from '../../../assets/images/category-01.png'
import categoryImg02 from '../../../assets/images/category-02.png'
import categoryImg03 from '../../../assets/images/category-03.png'
import categoryImg04 from '../../../assets/images/category-04.png'
import categoryImg05 from '../../../assets/images/category-05.png'

import '../../../styles/category.css'

const categoryData = [
    {
        display: 'Máy tính',
        imgUrl: categoryImg03
    },
    {
        display: 'Bàn phím',
        imgUrl: categoryImg03
    },
    {
    
        display: 'Màn hình',
        imgUrl: categoryImg03
    },
    {
        display: 'Laptop',
        imgUrl: categoryImg03
    },
    
]

const Category = () => {
  return (
    <Container>
        <Row>
            
            {categoryData.map((item, index) => (
                <Col lg="3" md="4" key={index} >
                    <div className="category__item">
                    <div className="category__img"
                    >
                        <img src={item.imgUrl} alt="category__item d-flex align-items-center gap-3" />
                    </div>
                    <h6>{item.display}</h6>
                    </div>
                </Col>
            ))}
        </Row>
    </Container>
  )
}

export default Category