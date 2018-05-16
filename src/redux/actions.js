import {HANDLE_SHOW, NAV_INDEX, CHANGE_NAV, GET_HEIGHT, GET_FOOTER_HEIGHT, GET_COLUMN_DATA,
  GET_CAROUSEL_DATA, GET_MORELIST_DATA, GET_CLASSIFY_DATA, GET_BRAND_DATA,GET_MENU_DATA} from './action-type';
import {getMainData, getCarouselData, getColumnData, getMoreData, getClassify, getBrand, getMenu} from '../api';
export const handleShow = (data) => ({type: HANDLE_SHOW, data});

export const navIndex = (data) => ({type: NAV_INDEX, data});

export const changeNavList = (data) => ({type: CHANGE_NAV, data});
// 获取header头部高度
export const getHeight = (data) => ({type: GET_HEIGHT, data});
// 获取底部高度;
export const getFooterHeight = (data) => ({type: GET_FOOTER_HEIGHT, data});

//
export const getCarousel = (data) => ({type: GET_CAROUSEL_DATA, data});


export const getColumn = (data) => ({type: GET_COLUMN_DATA, data});


export const getMore = (data) => ({type: GET_MORELIST_DATA, data});

export const getClassifyData = (data) => ({type: GET_CLASSIFY_DATA, data});

export const getBrandData = (data) => ({type: GET_BRAND_DATA, data});


export const getMenuData = (data) => ({type: GET_MENU_DATA, data});


// 获取头部导航数据
export const getMainDatas = () => {
  return async dispatch => {
    // 异步获取数据
    let result = await getMainData()
    // 判断状态码是否是成功的数据
    if(result.code === 0){
      dispatch(changeNavList(result.data))
    }
  }
}

// 获取内容区轮播图数据
export const getCarouselDatas = () => {
  return async dispatch => {
    // 异步获取数据
    let result = await getCarouselData();
    // 判断状态码是否是成功的数据
    if(result.code === 0){
      dispatch(getCarousel(result.data))
    }
  }
}

// 获取内容区10个图标数据选项数据
export const getColumnDatas = () => {
  return async dispatch => {
    // 异步获取数据
    let result = await getColumnData();
    // 判断状态码是否是成功的数据
    if(result.code === 0){
      dispatch(getColumn(result.data))
    }
  }
}

// 获取内容区每日疯抢数据
export const getMoreDatas = () => {
  return async dispatch => {
    // 异步获取数据
    let result = await getMoreData();
    // 判断状态码是否是成功的数据
    if(result.code === 0){
      dispatch(getMore(result.data))
    }
  }
}

// 处理分类页classify数据
export const getClassifyDatas = () => {
  return async dispatch => {
    let result =await getClassify();
    if(result.code === 0){
      dispatch(getClassifyData(result.data))
    }
  }
}

// 处理分类页品牌数据
export const getBrandDatas = () => {
  return async dispatch => {
    let result =await getBrand();
    if(result.code === 0){
      dispatch(getBrandData(result.data))
    }
  }
}

// 处理导航列表数据

export const getMenuDatas = () => {
  return async dispatch => {
    let result =await getMenu();
    if(result.code === 0){
      dispatch(getMenuData(result.data))
    }
  }
}
