import Mock from 'mockjs'
import mainData from './data/index.json';
import carouselData from './data/carousel.json';
import classifyData from './data/classify.json';
import brandData from './data/brand.json';
import menuItemData from './data/menuItem.json';

// 指定监听的url和对应的json数据模板
Mock.mock('/getMain', {
  code: 0,
  data: mainData.menus
})
// 内容区轮播图的数据路由
Mock.mock('/getCarousel', {
  code: 0,
  data: carouselData.data['1'].value,
})

// 内容区10个图标的路由
Mock.mock('/getColumnList', {
  code: 0,
  data: mainData.datas[1].menus,
})

// 内容区每日疯抢数据
Mock.mock('/getMoreList', {
  code: 0,
  data: carouselData.data['3'].goods
})


// 分类页数据
Mock.mock('/getClassifyList', {
  code: 0,
  data: classifyData.categorys
})



// 分类页品牌数据
Mock.mock('/getBrandList', {
  code: 0,
  data: brandData.brand
})

// 导航列表页面数据 mnuItem

Mock.mock('/getMenuList', {
  code: 0,
  data: menuItemData
})


// export default xxx  不需要