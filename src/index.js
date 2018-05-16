import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {HashRouter, BrowserRouter} from 'react-router-dom';
import store from './redux/store';
import  './mock/mockServer';

import App from './components/index/App';

// 大坑，当使用BrowserRouter时候，一旦有二级路由，刷新页面会报错。  https://blog.csdn.net/weixin_39168678/article/details/79756305

ReactDOM.render((
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
), document.getElementById('root'));