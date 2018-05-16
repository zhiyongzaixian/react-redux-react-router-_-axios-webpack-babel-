import React from 'react';
import {connect} from 'react-redux';
import BScroll from 'better-scroll';
import Lazyimg, {withLazyimg} from 'react-lazyimg-component';
import {getBrandDatas} from '../../../redux/actions';

import brandCss from './brandCss.css';

// 设置懒加载图片，但此库不是太好用。
// const config = {
//   placeholder: 'https://img1.epetbar.com/2017-08/02/16/56d2cd336393223f4624c35ae65165b2.jpg?x-oss-process=style/waterfall&$1=200',
// }

// const Lazy = withLazyimg(config);


class Brand extends React.Component{
  componentWillMount(){
    // 发送请求获取品牌数据
    this.props.getBrandDatas();
  }
  componentDidMount(){
    this.timeoutId1 = setTimeout(() => {
      this.scroll = new BScroll(this.scrollWrapper , {
        scrollY: true,
        click: true
      })
    }, 1000)
  }
  componentWillUnmount(){
    clearTimeout(this.timeoutId1);
    clearTimeout(this.timeoutId2);
  }


  render(){
    let brandList = this.props.brandState;
    return (
      <div ref={scrollWrapper => this.scrollWrapper = scrollWrapper} className={brandCss.container}>
        <div className={brandCss.listContainer}>
          {
            brandList.map((brandItem, index) => {
              return (
                <div key={index} className={brandCss.listItem}>
                  <p>—— {brandItem.title} ——</p>
                  <ul>
                    {
                      brandItem.list.map((item, index) => {
                        return (
                          <li key={index} className={brandCss.liItem}>
                            <a href="">
                              <div>
                                {/*不是太好，可打开测试*/}
                                {/*<Lazyimg className='lazy' src={item.logo}></Lazyimg>*/}
                                {/*测试上边的代码，将下边的一行代码注释掉*/}
                                <img src={item.logo} alt=""/>
                              </div>
                              <p className={brandCss.firstP}>{item.name}</p>
                              <p>{item.address}</p>
                            </a>
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
              )
            })
          }

        </div>
      </div>
    )
  }
}
export default connect(
  state => ({brandState: state.brand}),
  {getBrandDatas}
)(Brand);
