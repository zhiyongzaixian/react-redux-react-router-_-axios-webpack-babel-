import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import cart from './cart.css';


class Cart extends React.Component{
  state = {
    isShow: false
  }
  //处理头部nav导航方法
  handleNavShow = () => {
    let isShow = !this.state.isShow;
    // 每次点击清除之前添加的动画类
    this.navContainer.className = 'headerNav';
    if(!isShow){
      // 高度展开
      this.navContainer.classList.add('navAnimate')
    }else {
      // 高度收起
      this.navContainer.classList.add('navAnimate2')
    }
    // 更新标识收起/展开的状态标识
    this.setState({
      isShow: isShow
    })

  }
  render(){
    let isShow = this.state.isShow;
    return (
      <div className={cart.container}>
        <div className={cart.header}>
          <NavLink to='/main'  className={cart.headerLeft}><i className='iconfont icon-jiantou-copy-copy'></i></NavLink>
          <span className={cart.content}>购物车</span>
          <a onClick={this.handleNavShow} href="javascript:;" className={cart.headerRight}><i className='iconfont icon-fenlei'></i></a>
        </div>
        <ul ref={container => this.navContainer = container} className='headerNav '>
          <li>
            <NavLink to='/main'>
              <i className='iconfont icon-shouye2' ></i>
              <div>首页</div>
            </NavLink>
          </li>
          <li>
            <NavLink  to='/classify' >
              <i className='iconfont icon-fenlei'></i>
              <div>分类</div>
            </NavLink>
          </li>
          <li>
            <NavLink to='/cart' >
              <i className='iconfont icon-gouwuche2'></i>
              <div>购物车</div>
            </NavLink>
          </li>
          <li>
            <NavLink to='/myEpet' >
              <i className='iconfont icon-wode5'></i>
              <div>我的E宠</div>
            </NavLink>
          </li>
        </ul>
        <div>
          <div className={cart.cartBg}></div>
          <div className={cart.cartContent}>购物车是空的</div>
          <div className={cart.navLink}>
            <NavLink to='/main'>去逛逛</NavLink>
            <NavLink to='/myEpet'>我的收藏</NavLink>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({state: state.footer}),
  {}
)(Cart);