import React from 'react';
import header from './header.css';
import BScroll from 'better-scroll';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import {handleShow, changeNavList, navIndex, getMainDatas, getHeight}  from '../../redux/actions';
import {HANDLE_SHOW} from '../../redux/action-type';
import {getMainData} from '../../api';
import 'swiper/dist/css/swiper.min.css'
let IS_SHOW = 'isShow';

class MyHeader extends React.Component{
  static propTypes = {
    headerState: PropTypes.object.isRequired,
    handleShow: PropTypes.func.isRequired,
    changeNavList: PropTypes.func.isRequired,
    navIndex: PropTypes.func.isRequired
  }
  componentWillMount(){
    // 发送请求获取navList数据
    this.props.getMainDatas();

    let isShow = JSON.parse(localStorage.getItem(IS_SHOW));
    if(!isShow && isShow !== null){
      this.props.handleShow('none');
    }
    // 首页加载的时候从新设置nav导航底部边框的样式
    this.props.navIndex(0);

  }
  componentDidMount(){
    this.timeoutId = setTimeout(() => {
      // 动态获取nav导航的li个数
      let length = this.props.headerState.navList.length;
      // 动态获取li的宽度, 延时获取，否则获取不到。
      // let liWidth = this.contentDOM.getElementsByTagName('li')[0].clientWidth;
      // 根据li的个数动态设置ul的宽度；
      this.contentDOM.style.width = 75 * length + 'px';
      this.props.getHeight(this.container.offsetHeight);

      // 使用插件better-scroll， 设置横向滑屏\
      this.scroll = new BScroll(this.wrapperDOM, {
        scrollX: true,
        click: true  // 否则点击失效
      })
    }, 200);

  }
  componentWillUnmount(){
    console.log('销毁。。。');
    clearTimeout(this.timeoutId)
  }
  handleHide = (event) => {
    this.props.handleShow('none');
    localStorage.setItem(IS_SHOW, false);
  };
  handleClickBor = (index) => {
    // 更改记录当前item的下标
    this.props.navIndex(index);
  }
  render(){
    let {navIndex, display, navList} = this.props.headerState;
    return (
      <div ref={container => this.container = container} className={header.header}>
        <img style={{display}} src="./images/app/app.jpg" alt=""/>
        <img style={{display}} onClick={this.handleHide} className={header.close} src="./images/app/close_down_bar.png" alt=""/>
        <div className={header.search}>
          <div className={header.searchContainer}>
            <div className={header.toSearch}>
              <span>搜索商品和品牌</span>
              <i className='iconfont icon-sousuo'></i>
            </div>
          </div>
          <div className={header.address}>
            <span>狗狗</span>
            <span> | </span>
            <span className={header.city}>北京 <i></i> </span>
          </div>

          <a className={header.myDope} href="javascript:;">
            <img src="./images/news.png" alt=""/>
          </a>
        </div>
        <div ref={input => this.wrapperDOM = input} className={header.wrapper}>
          <ul  ref={content => this.contentDOM=content} className={header.content}>
            {
              navList.map((navItem, index) => {
                return (
                  <li onClick={this.handleClickBor.bind(this, index)} key={index} >
                    <NavLink to={`/menuItem/${index}`}>
                      <span className={navIndex === index?header.bottomBorder: header.noBorder}>{navItem.menu_name}</span>
                    </NavLink>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({headerState: state.header}),
  {changeNavList, handleShow, navIndex, getHeight, getMainDatas}
)(MyHeader)