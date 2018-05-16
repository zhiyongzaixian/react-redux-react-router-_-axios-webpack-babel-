import {combineReducers} from 'redux';
import {HANDLE_SHOW, NAV_INDEX, CHANGE_NAV, GET_HEIGHT, GET_FOOTER_HEIGHT, GET_COLUMN_DATA,
  GET_CAROUSEL_DATA, GET_MORELIST_DATA, GET_CLASSIFY_DATA, GET_BRAND_DATA, GET_MENU_DATA
} from './action-type';
const headerInitState = {
  navIndex: 0,
  display: 'block',
  navList: [],
  headerHeight: '',
  footerHeight: ''
}
// 控制头部的reducer
function header(state=headerInitState, action) {
  switch (action.type){
    case HANDLE_SHOW:
      return {
        ...state,
        display: action.data
      };
    case NAV_INDEX:
      console.log(action.data, 'redux...');
      return {
        ...state,
        navIndex: action.data
      };
    case CHANGE_NAV:
      return {
        ...state,
        navList: action.data
      };
    case GET_FOOTER_HEIGHT:
      return {
        ...state,
        footerHeight: action.data
      };
    case GET_HEIGHT:
      return {
        ...state,
        headerHeight: action.data
      };
    default:
      return state;
  }
}

// 处理 content 组件的reducer
const contentInitState = {
  columnNavList: [],
  CarouselList: [],
  moreList: []
}

function content(state=contentInitState, action) {
  switch (action.type){
    case GET_CAROUSEL_DATA:
      return {
        ...state,
        CarouselList: action.data
      }
    case GET_COLUMN_DATA:
      return {
        ...state,
        columnNavList: action.data
      }
    case GET_MORELIST_DATA:
      return {
        ...state,
        moreList: action.data
      }
    default:
      return state;
  }
}


// 管理classify分类页的reducer

function classify(state=[], action) {
  switch (action.type){
    case GET_CLASSIFY_DATA:
      return action.data;
    default:
      return state;
  }
}

// 全部品牌
function brand(state=[], action) {
  switch (action.type){
    case GET_BRAND_DATA:
      return action.data;
    default:
      return state;
  }
}

// 处理menu数据
function menu(state=[], action) {
  switch (action.type){
    case GET_MENU_DATA:
      return action.data;
    default:
      return state;
  }
}
export default combineReducers({header, content, classify, brand, menu});