import React from 'react';
import BScroll from 'better-scroll';
import {connect} from 'react-redux';
import {getCarouselDatas, getColumnDatas, getMoreDatas} from '../../redux/actions'
import Carousel from '../carousel/carousel';
import contentCss from './content.css';

// import swiperStyle from 'swiper/dist/css/swiper.css';


class Content extends React.Component{
  componentWillMount(){

    // 发送请求获取10个导航图标链接
    this.props.getCarouselDatas();
    this.props.getColumnDatas();
    this.props.getMoreDatas();

  }


  componentDidMount() {
    this.timeoutId = setTimeout(() => {
      // 动态获取每日疯抢列表宽度
      // 后边 加的40px是因为在安卓真机上测试的时候经常显示宽度不够会掉一个下去，在苹果手机上没事。所以加20
      this.moreListDOM.style.width = this.moreItem.offsetWidth * this.props.contentState.moreList.length + 40 + 'px';

      // 获取头部，底部的高度  !!!延时获取，否则无法获取高度为空。
      let wrapperHeight = (document.documentElement.clientHeight - this.props.headerHeight - this.props.footerHeight) + 'px'
      this.contentWrapper.style.height = wrapperHeight;

      // 整体内容区的scroll滑动
      this.scroll = new BScroll(this.contentWrapper, {
        scrollY: true,
        click: true,
        bounce: false, // 不设置回弹
        momentumLimitDistance: 30
        // scrollbar: true
      })
      // 每日疯抢处的scroll滑动
      this.scroll1 = new BScroll(this.moreListContainer, {
        scrollX: true,
        click: true,
      })

      // 以下代码感觉意义不太大，只是为了在PC测试的时候切换机型动态计算内容区的高度。在真机上不会频繁切换的
      // window.addEventListener('resize', () => {
      //   console.log('xxx');
      //   let wrapperHeight2 = (document.documentElement.clientHeight - this.props.headerHeight - this.props.footerHeight) + 'px'
      //   this.contentWrapper.style.height = wrapperHeight2;
      // })
    }, 2000)
  }

  componentWillUnmount(){
    // 切换路由的时候关掉之前的开的定时器，否则可能会因为在willMount中开的定时器出现不必要的错误(频繁切换路由的时候)
    clearTimeout(this.timeoutId);
  }



  render() {
    // redux中的store传递过来的数据
    let {columnNavList, CarouselList, moreList} = this.props.contentState;
    return (
      <div>
        <div ref={contentWrapper => this.contentWrapper = contentWrapper} className={contentCss.wrapper}>
          <div className={contentCss.contentContainer} ref={contentDOM => this.contentDOM = contentDOM}>
            {/*动态从redux中获取数据传递给轮播图组件*/}
            <Carousel carouselList={CarouselList}/>
            {/*10个导航图标*/}
            <ul className={contentCss.navWrapper}>
              {
                columnNavList.map((item, index) => {
                  return (
                    <li key={index}>
                      <a href="javascript:;">
                        <img src={item.image}/>
                      </a>
                    </li>
                  )
                })
              }
            </ul>
            <div className={contentCss.default_bg}>
              <a href="javascript:;">
                <img src="https://img1.epetbar.com/2018-04/18/09/39cbb85bc98c28d7e1c95c8705e9f4a6.gif"/>
              </a>
            </div>
            <div className={contentCss.moreContainer}>
              <div className={contentCss.moreHeader}>
                <img src="/images/nav/oneday.png" alt=""/>
                <a className={contentCss.goMore} href="javascript:;">
                  <img src="https://img2.epetbar.com/nowater/2018-02/02/12/80acfffe2d91b341fd2c8de903b3eace.png"
                       alt=""/>
                </a>
                <div className={contentCss.Countdown}>
                  本场结束： <span>16</span> : <span>00</span>
                </div>
              </div>
              {/*每日疯抢列表*/}
              <div ref={moreListContainer => this.moreListContainer = moreListContainer} className="moreListContainer">
                <ul ref={moreListDOM => this.moreListDOM = moreListDOM} className={contentCss.moreList}>
                  {
                    moreList.map((item, index) => {
                      return (
                        <li ref={moreItem => this.moreItem = moreItem} className={contentCss.moreItem} key={index}>
                          <a href="javascript:;">
                            <div className={contentCss['thispro-img']}>
                              <img src={item.image.image}/>
                            </div>
                            <div className={contentCss.itemPrice}>
                              <span>¥</span>
                              <span>{item.sale_price}</span>
                            </div>
                            <p>{item.little_price}</p>
                          </a>
                        </li>
                      )
                    })
                  }

                </ul>
              </div>

            </div>
            <div className='total_bg'>
              <div className={contentCss.divboximg}>
                <div className={contentCss.left}>
                  <a style={{height: '100%'}} href="javascript:;" className={contentCss.total_style}>
                    <img
                      src="https://img2.epetbar.com/nowater/2017-12/13/09/1ec9379f83eb421db9a09195c9594e29.jpg@!water"/>
                  </a>
                </div>
                <div className={contentCss.right}>
                  <a href="javascript:;" className={contentCss.total_style}>
                    <img name="374x250"
                         src="https://img2.epetbar.com/nowater/2018-05/07/09/b60a5101d5685dd6ab4ef19e01212d8f.jpg@!water"/>
                  </a>
                  <a href="javascript:;" className={contentCss.total_style}>
                    <img
                      src="https://img2.epetbar.com/nowater/2017-12/19/13/62a49af47aa7f713fc0ac0c9b9657e33.jpg@!water"/>
                  </a>
                </div>
              </div>
              <div>
                <a className={contentCss.seckill} href="javascript:;">
                  <img src="https://img2.epetbar.com/nowater/2018-05/04/18/5d85c9a49e9d253b894cef474a9efaa9.jpg@!water"
                       alt=""/>
                </a>
              </div>
              <div className={contentCss.divboximg}>
                <div className={contentCss.left}>
                  <a style={{height: '50%'}} href="javascript:;" className={contentCss.total_style}>
                    <img
                      src="https://img2.epetbar.com/nowater/2018-02/05/14/4c32811744e04f6b63632b42a0d5325d.jpg@!water"/>
                  </a>
                  <a style={{height: '50%'}} href="javascript:;" className={contentCss.total_style}>
                    <img
                      src="https://img2.epetbar.com/nowater/2018-02/05/14/fa66a0c8437b6fb8137c58d9b6ccb1c6.jpg@!water"/>
                  </a>
                </div>
                <div className={contentCss.right}>
                  <a href="javascript:;" className={contentCss.total_style}>
                    <img name="374x250"
                         src="https://img2.epetbar.com/nowater/2018-02/05/14/9aa462284ec8a79694fa5c9ce062d5ab.jpg@!water"/>
                  </a>
                  <a href="javascript:;" className={contentCss.total_style}>
                    <img
                      src="https://img2.epetbar.com/nowater/2018-02/05/14/6e3a2cb186e1028d481940c42fb54732.jpg@!water"/>
                  </a>
                </div>
              </div>
              {/*品牌特卖区*/}
              <div className={contentCss.brand}>
                <div className={contentCss.brandHead}>
                  <div>
                    <img src="https://img2.epetbar.com/nowater/2017-12/13/13/11acf905ca327ed7aae8f9b4851850a0.jpg"
                         alt=""/>
                  </div>
                  <div>
                    <img src="https://img2.epetbar.com/nowater/2017-12/13/13/22f20febaae655371ef3766612102c0e.jpg"
                         alt=""/>
                  </div>
                </div>
                <ul className={contentCss.brandList}>
                  <li>
                    <a href="javascript:;">
                      <img
                        src="https://img2.epetbar.com/nowater/2018-04/26/10/f94ef6ba0fdde69d5958fb3e33d325d2.jpg@!water"
                        alt=""/>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:;">
                      <img
                        src="https://img2.epetbar.com/nowater/2018-04/20/11/05716da5852dc75d59a7c36ef0b4ae56.jpg@!water"
                        alt=""/>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:;">
                      <img
                        src="https://img2.epetbar.com/nowater/2018-04/04/10/6afbf23c23988b13756a03aa85e14577.jpg@!water"
                        alt=""/>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:;">
                      <img
                        src="https://img2.epetbar.com/nowater/2018-05/07/16/12f78e978cd733b6882bc9e8707aa4cb.jpg@!water"
                        alt=""/>
                    </a>
                  </li>
                </ul>

                <div className={contentCss.brandHead}>
                  <div>
                    <img src="https://img2.epetbar.com/nowater/2017-12/13/13/e747ca83834dbd4d1f9663f11f7bf146.jpg"
                         alt=""/>
                  </div>
                  <div>
                    <img src="https://img2.epetbar.com/nowater/2017-12/13/13/22f20febaae655371ef3766612102c0e.jpg"
                         alt=""/>
                  </div>
                </div>
                <video controls='controls' width='100%'
                       src="http://player.epetbar.com/21108e7a91b44fc09218fe3ba97577ba/809dae73a6c74816ad02cdb04fb75440-5287d2089db37e62345123a1be272f8b.mp4">
                  当前浏览器不支持视频播放
                </video>
                <div className={contentCss.footer_bg1}>
                  <img src="https://img2.epetbar.com/nowater/2017-12/13/11/be84f01e893b0e631d8512566eb79117.jpg@!water" />
                </div>
              </div>
            </div>
            {/*底部关于我们模块*/}
            <div className={contentCss.contentFooter} >
              <div className={contentCss.footerHeader}>
                <span style={{color: 'red'}} title="触屏版">触屏版</span>
                <span><a href="https://wap.epet.com/app.html">手机客户端</a></span>
                <span><a href="https://wap.epet.com/AboutEpet.html">关于我们</a></span>
                <span><a href="https://wap.epet.com/faq.html">联系我们</a></span>
              </div>
              <div className={contentCss.copy}>© wap.epet.com 版权：志勇科技有限公司</div>
            </div>
          </div>
        </div>

      </div>
  )
  }
  }

export default connect(
  state => ({heightList: state.header, contentState: state.content}),
  {getCarouselDatas, getColumnDatas, getMoreDatas}
)(Content);