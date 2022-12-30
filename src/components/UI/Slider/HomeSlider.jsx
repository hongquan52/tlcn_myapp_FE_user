import React from 'react'
//import Slider from 'slick-carousel'
import Slider from 'react-slick'


import '../../../styles/slider.css'

const HomeSlider = () => {
  
    const settings = {
        dots: true,
        autoplay: true,
        infinite: true,
        speed: 1500,
        autoplaySpeed: 3000,
        swipeToSlide: true,
        slidesToShow: 1,
        slidesToScroll: 1,
    }
  
    return (
        <Slider {...settings}>
            <div>
            <img className='home__slider-img rounded' src={'https://vitinhhh.com/files/assets/banner-nho-1.jpg'} alt="avatar" />
                
            </div>
            <div>
            <img src={'https://pcchinhhang.com/upload/images/Tin-Tuc/banner-gaming.jpg'} alt="avatar" className='rounded home__slider-img' />
                
            </div>
            <div>
            <img src={'http://laptophue.com.vn/wp-content/uploads/2021/04/1612_1216-BANNER-pcgm-km-.png'} alt="avatar" className='rounded home__slider-img' />
                
            </div>
            <div>
            <img src={'https://mypc.vn/wp-content/uploads/2021/09/Untitled-5.png'} alt="avatar" className='rounded home__slider-img' />
                
            </div>
        </Slider>
  )
}

export default HomeSlider