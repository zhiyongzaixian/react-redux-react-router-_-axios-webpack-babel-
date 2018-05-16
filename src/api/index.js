/*
与后台交互模块
 */
import ajax from './ajax'
// const EPET ='http://localhost:3000';

/**
 * 获取头部nav数据
 */
export const getMainData = () => ajax('/getMain');

/**
 * 获取内容区10个图标列表
 */
export const getColumnData = () => ajax('/getColumnList');

/**
 * 获取轮播图数据
 */

export const getCarouselData = () => ajax('/getCarousel');


/**
 *每日疯抢数据
 */

export const getMoreData = () => ajax('/getMoreList');


/**
 *分类页classify数据
 */

export const getClassify = () => ajax('/getClassifyList');

/**
 *分类页brand数据
 */

export const getBrand = () => ajax('/getBrandList');


/**
 *导航列表页menu数据
 */

export const getMenu = () => ajax('/getMenuList');
