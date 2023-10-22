import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './CarouselComponent.css'
import { Button } from '@material-tailwind/react';
import { axiosUserInstance } from '../../../Constants/axios';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const CarouselComponent = () => {
  const [data,setData]=useState([])
  const { isLoading, error } = useQuery({
    queryKey: ['banner'],
    queryFn: async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        console.log('banner');
        const response = await axiosUserInstance.get('/bannerdata',config);
        console.log(response);
        console.log(response.data.banner);
        setData(response.data.banner);
      } catch (err) {
        console.error(err.message);
        // Handle error here
      }
    },
  });
  const navigate=useNavigate()
  console.log(data);
  return (
    <div className="mx-auto">
      <Carousel
        showStatus={false}
        showArrows={false}
        infiniteLoop={true}
        showThumbs={false}
        dynamicHeight={true}
        autoPlay={true}
        interval={3000}
      >
        {data.map((item,index)=>(<div className='image-container' key={index}>
          <img src={item.banner_img} alt="Slide 1" />
          <div className="overlay-text w-96">{item.main_text} <br/> {item.banner_text.includes('Birthday') ? (
              <Button onClick={() => navigate('/eventlist/birthday')}>{item.button_text}</Button>
            ) : item.banner_text.includes('Wedding') ? (
              <Button onClick={() => navigate('/eventlist/wedding')}>{item.button_text}</Button>
            ) : (
              <Button>{item.button_text}</Button>
            )} </div>
        </div>))}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;


