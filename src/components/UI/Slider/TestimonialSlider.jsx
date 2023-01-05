import React from 'react'
//import Slider from 'slick-carousel'
import Slider from 'react-slick'
import { getAllFeedback } from '../../../api/fetchers/feedback';
import { thunkFeedbackTypes } from '../../../constants/thunkTypes';
import { useQuery } from '@tanstack/react-query';
import { Rating } from '@mui/material';
import ava01 from "../../../assets/images/ava-1.jpg";
import ava02 from "../../../assets/images/ava-2.jpg";
import ava03 from "../../../assets/images/ava-3.jpg";

import '../../../styles/slider.css'

const TestimonialSlider = () => {
    const querygetAllFeedback = useQuery([thunkFeedbackTypes.GETALL_FEEDBACK], getAllFeedback)
    console.log("get all feedback: ", querygetAllFeedback?.data?.data?.list)

    const settings = {
        dots: true,
        autoplay: true,
        infinite: true,
        speed: 1000,
        autoplaySpeed: 3000,
        swipeToSlide: true,
        slidesToShow: 1,
        slidesToScroll: 1,
    }
  
    return (
        <Slider {...settings}>
            {
                
                querygetAllFeedback?.data?.data?.list.map((item, index) => (
                    <div key={index}>
                        <p className="review__text">
                            {item.content}
                        </p>
                        <Rating
                              name="simple-controlled"
                              value={item.vote}
                              
                        />
                        <h6 className=''>{item.userName}</h6>
                        <div className='slider__content d-flex align-items-center gap-3 mt-4'>
                            <img src={item.productThumbnail} alt="avatar" className='rounded' />
                            <h6>{item.productName}</h6>
                        </div>
                    </div>
                ))
            }
            
            
        </Slider>
  )
}

export default TestimonialSlider