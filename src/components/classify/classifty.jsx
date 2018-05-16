import React from 'react';
import {connect} from 'react-redux';
import {getHeight, getFooterHeight} from '../../redux/actions';
import {Route, NavLink, Switch, Redirect} from 'react-router-dom';
import ClassifyMain from './main/clsMain';
import Brand from './brand/brand';
import classify from './classify.css'

class Classify extends React.Component{
  componentDidMount(){
    this.timeoutId = setTimeout(() => {
      // 动态获取当前页面头部区域高度，修改redux数据状态
      this.props.getHeight(this.headerContainer.offsetHeight);
      this.contentWrapper.style.height = (document.documentElement.clientHeight - this.props.state.headerHeight - this.props.state.footerHeight) + 'px'
    }, 1000)
  }
  componentWillUnmount(){
    clearTimeout(this.timeoutId);
  }

  render(){
    let {headerHeight, footerHeight} = this.props.state;
    console.log(headerHeight, footerHeight);
    return (
      <div className={classify.classify}>
        <div ref={headerContainer => this.headerContainer = headerContainer} className={classify.header}>
          <div className={classify.headerLeft}>
            <NavLink activeClassName='activeClassify'  to='/classify/clsMain'>
              <span >分类</span>
            </NavLink>
          </div>
          <div className={classify.headerRight}>
            <NavLink activeClassName='activeClassify' to='/classify/brand'>
              <span>品牌</span>
              <img src="/images/search-icon.png" alt=""/>
            </NavLink>
          </div>
        </div>
        <div ref={contentWrapper => this.contentWrapper = contentWrapper}>
          <Switch>
            <Route exact path='/classify/clsMain' component={ClassifyMain}></Route>
            <Route exact path='/classify/brand' component={Brand}></Route>
            <Redirect exact to='/classify/clsMain'></Redirect>
          </Switch>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({state: state.header}),
  {getHeight, getFooterHeight}
)(Classify);