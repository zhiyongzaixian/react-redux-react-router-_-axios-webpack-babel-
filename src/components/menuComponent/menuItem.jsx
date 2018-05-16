import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import BScroll from 'better-scroll';
import {handleShow, getMenuDatas}  from '../../redux/actions';
import menuItem from './menuItem.css';


let IS_SHOW = 'isShow';
class MenuItem extends React.Component{
  state = {
    isShow: false,
    navIndex: 0,
    proNavIndex: 0,
    getCountId: 5   // 原本json数据中全部的menu_param为5
  }

  componentWillMount(){
    let isShow = JSON.parse(localStorage.getItem(IS_SHOW));
    if(!isShow && isShow !== null){
      this.props.handleShow('none');
    }
    // 发送请求获取列表数据
    this.props.getMenuDatas();

  }
  componentDidMount(){
    this.timeoutId = setTimeout(() => {
      // 动态获取nav导航的li个数
      let index = this.props.match.params.id;
      let menuList = this.props.menuState[index];
      let length = menuList.datas[menuList.datas.length - 1].menus.length;
      // 动态获取li的宽度, 延时获取，否则获取不到。
      // 根据li的个数动态设置ul的宽度；
      this.proNavListDOM.style.width = 90 * length + 'px';
      // 使用插件better-scroll， 设置横向滑屏\
      this.scroll = new BScroll(this.proNavContainerDOM, {
        scrollX: true,
        click: true  // 否则点击失效
      })
    }, 200);

    // 监听滚动条滚动
    window.addEventListener('scroll',  this.bodyScroll)
  }
  // addEventListener和removeEventListener必须是同一个参数函数，所以定义个函数
  bodyScroll = (event) => {
    event.preventDefault();
    let scrollTop = document.documentElement.scrollTop;
    // 动态设置proNavContainer是否定位在头部
    if(scrollTop > 630){
      this.proNavContainerDOM.classList.add('navPosition');
    }else {
      this.proNavContainerDOM.classList.remove('navPosition');
    }
  }

  componentWillUnmount(){
    // 当前组件销毁前要已出监听，否则的话处理函数的this属性会出问题。
    window.removeEventListener('scroll',this.bodyScroll)
  }

  handleHide = (event) => {
    this.props.handleShow('none');
    localStorage.setItem(IS_SHOW, false);
  };

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
    let {navIndex, proNavIndex, getCountId} = this.state;
    let {display} = this.props.headerState;
    let index = this.props.match.params.id;
    let menuList = this.props.menuState[index];
    if(!this.props.menuState.length){
      return null; // render首次渲染的时候可能redux没有返回及时返回数据，此时必须作出处理，否则报错，注意一定要返回null。光写return也会报错
    }
    let proList;
    if(proNavIndex === 0){
      proList = menuList.datas[menuList.datas.length - 1].list
    }else {
      proList = menuList.datas[menuList.datas.length - 1].list.filter((item, index) => item.cateid === getCountId)
    }
    return (
      <div className={menuItem.container}>
        <header className={menuItem.header}>
          <img style={{display}} src="./images/app/app.jpg" alt=""/>
          <img style={{display}} onClick={this.handleHide} className={menuItem.close} src="./images/app/close_down_bar.png" alt=""/>
        </header>
        <div style={{marginTop: '55px'}}>
          <div className={menuItem.nav}>
            <NavLink to='/main'  className={menuItem.headerLeft}><i className='iconfont icon-jiantou-copy-copy'></i></NavLink>
            <span className={menuItem.content}>{menuList.page_title}</span>
            <a onClick={this.handleNavShow} href="javascript:;" className={menuItem.headerRight}><i className='iconfont icon-fenlei'></i></a>
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
            <img className={menuItem.advertising} src={menuList.datas[0].value[0].image} alt=""/>
            {/*动态计算图形产品列表导航*/}

            <ul className={menuItem.navList}>
              {
                menuList.datas[1].data.categorys.map((item, index) => {

                  return (
                    <li key={index} onClick={() => this.setState({navIndex: index})} style={{width: menuList.datas[1].data.categorys.length===3?'33.333%':'25%'}}>
                      <img src={navIndex === index?item.image_choose: item.image} alt=""/>
                    </li>
                  )
                })
              }
            </ul>
            {/*动态计算图形产品列表*/}

            <ul className={menuItem.dataList}>
              {
                menuList.datas[1].data.categorys[navIndex].small_cate.menus.map((navItem, index) => {
                  return (
                    <li key={index}>
                      <img src={navItem.image} alt=""/>
                    </li>
                  )
                })
              }
            </ul>
            <img className={menuItem.advertising} src={menuList.datas[0].value[0].image} alt=""/>
          </div>
          <div>
            <div className='proNavContainer'  ref={container => this.proNavContainerDOM = container}>
              {/*动态计算产品列表导航*/}
              <ul className={menuItem.proNavList} ref={container => this.proNavListDOM = container}>
                {
                  menuList.datas[menuList.datas.length - 1].menus.map((item, index) => {
                    return (
                      <li key={index}>
                        <a onClick={() => this.setState({proNavIndex: index, getCountId: item.menu_param})} className={proNavIndex === index? 'proLinkActive': 'proLinkNoActive'} href="javascript:;">
                          {item.menu_name}
                        </a>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
            <ul className={menuItem.proList}>
              {

                proList.map((item, index) => {
                  return (
                    <li key={index}>
                      <div className={menuItem.proPhoto}>
                        <img src={item.photo} alt=""/>
                      </div>
                      <div className={menuItem.proDetail}>
                        <p>{item.subject}</p>
                        <div className={menuItem.priceAndCount}>
                          <p>
                            <span className={menuItem.price}>￥{item.sale_price}</span>&nbsp;&nbsp;
                            <span className={menuItem.cheap}>{item.dprice}</span>
                          </p>
                          <p className={menuItem.appraise}>
                            <span>{item.comments}</span>&nbsp;&nbsp;
                            <span>{item.sold}</span>
                          </p>
                        </div>
                        <img src="/images/addcart.png" alt=""/>
                      </div>
                    </li>
                  )
                })
              }

            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({menuState: state.menu, headerState: state.header,a:state.content }),
  {handleShow, getMenuDatas}
)(MenuItem)