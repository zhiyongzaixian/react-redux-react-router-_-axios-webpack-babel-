import React from 'react';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css';
import swiperStyle from './carousel.css';

export default class Carousel extends React.Component{
  componentDidMount(){
    this.timeoutId = setTimeout(() => {
      // swiper插件 设置轮播图效果
      this.swiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        loop: true,
        autoplay: true,
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
        }
      })
    }, 1000)
  }
  componentWillUnmount(){
    clearTimeout(this.timeoutId);
  }
  render(){
    return (
      <div className='swiper-container' >
        <div className='swiper-wrapper' >
          {
            this.props.carouselList.map((item, index) => {
              return (
                <div key={index} className='swiper-slide'>
                  <img  src={item.image} alt=""/>
                </div>
              )
            })
          }

        </div>
        {/*<!-- 如果需要分页器 -->*/}
        <div className="swiper-pagination"></div>
      </div>
    )
  }
}