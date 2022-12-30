import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'
import logoSuccess from '../assets/images/success.gif'
import '../styles/success.css'
import Helmet from '../components/Helmet/Helmet'
const SuccessOrder = () => {
  return (
    
    <Helmet title='Đặt hàng thành công'>
    
    <section>
      <Container>
        <Row>
          <Col lg='6' md='6' sm='12' className='m-auto text-center'>
                <div className="success__wrapper">
                    <div className="success__icon">
                        <img src={logoSuccess} alt="" />
                    </div>
                    <div className="success__title">
                        <h5>Đặt hàng thành công</h5>
                    </div>
                    {/* <div className="sucess__content">
                        <h6>Mã hơn hàng của bạn là: DH0001</h6>
                    </div>          */}
                    <Link to={'/historyOrder'}><button className='addToCart__btn'>Lịch sử mua hàng</button></Link>
                    
                </div>
          </Col>
        </Row>
      </Container>
    </section>
  </Helmet>
    
  )
}

export default SuccessOrder