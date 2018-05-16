import React from 'react';
import {connect} from 'react-redux';
import {NavLink, Link} from 'react-router-dom';
import {getFooterHeight} from '../../redux/actions';
import footer from  './footer.css';

class MyFooter extends React.Component{

  componentDidMount(){
    setTimeout(() => {
      this.props.getFooterHeight(this.container.offsetHeight);
    }, 100);
  }

  render(){
    return (
      <div style={{display: this.props.display}}>
        <ul ref={container => this.container = container} className={footer.nav} >
          <li>
            <NavLink  activeClassName='activeFooter' to='/main'>
              <i className='iconfont icon-shouye2' ></i>
              <div>首页</div>
            </NavLink>
          </li>
          <li>
            <NavLink  activeClassName='activeFooter'  to='/classify' >
              <i className='iconfont icon-fenlei'></i>
              <div>分类</div>
            </NavLink>
          </li>
          <li>
            <NavLink  activeClassName='activeFooter' to='/cart' >
              <i className='iconfont icon-gouwuche2'></i>
              <div>购物车</div>
            </NavLink>
          </li>
          <li>
            <NavLink  activeClassName='activeFooter' to='/myEpet' >
              <i className='iconfont icon-wode5'></i>
              <div>我的E宠</div>
            </NavLink>
          </li>
        </ul>
      </div>
    )
  }
}


export default connect(
  state => ({state: state.header}),
  {getFooterHeight}
)(MyFooter);