import React from 'react';
import {Route, Redirect, Switch, withRouter} from 'react-router-dom';

import Main from '../main/main';
import Cart from '../cart/cart';
import Classify from '../classify/classifty';
import MyEpet from '../myEpet/myEpet';
import MyFooter from '../footer/footer'
import MenuItem from '../menuComponent/menuItem';

let display = 'block';

class App extends React.Component{
  render(){
    let urlPath = this.props.history.location.pathname;
    // 动态设置当内容区组件是非底部导航的四个组件的时候隐藏底部
    if(urlPath === '/main' || urlPath === '/classify/clsMain' ||  urlPath === '/classify/brand') {
      display = 'block';
    }else {
      display = 'none'
    }
    return (
      <div>
        {/*向路由组件传递数据使用render对应箭头函数返回组件对象，   一定要注意此时this的指向问题*/}
        {/*<Route path='/main' render={() => <Main footerHeight={footerHeight}/>}></Route>, 使用当前的方式，路由Route将不会像组件内部传递数据*/}
        <Switch>
          <Route path='/main' render={() => <Main data='传递的数据' path='main'/>}></Route>
          {/*<Route path='/classify' render={() => <Classify path='classify'/>}></Route>*/}
          {/*<Route path='/Cart' render={() => <Cart  path='Cart'/>}></Route>*/}
          {/*<Route path='/MyEpet' render={() => <MyEpet path='MyEpet'/>}></Route>*/}
          {/*<Route path='/main' render={() => <Main path='main'/>}></Route>*/}
          <Route  path='/main'  component={Main}></Route>
          <Route  path='/classify' component={Classify}></Route>
          <Route  path='/Cart' component={Cart}></Route>
          <Route  path='/MyEpet' component={MyEpet}></Route>
          <Route  path='/menuItem/:id' component={MenuItem}></Route>
          <Redirect to='/main'></Redirect>
        </Switch>
        <MyFooter display={display}/>
      </div>
    )
  }
}

export default withRouter(App)