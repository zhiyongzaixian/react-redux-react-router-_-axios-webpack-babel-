import React from 'react';
import {connect} from 'react-redux';
import {getClassifyDatas} from '../../../redux/actions';
import BScroll from 'better-scroll';


import classifyCss from './clsMain.css';

class ClassifyMain extends React.Component{
  state = {
    navIndex: 0
  }
  componentWillMount(){
    // 发送请求获取数据
    this.props.getClassifyDatas();
  }
  componentDidMount(){
    this.refs.defaultHeight.style.height = '800px';
    this.timeoutId = setTimeout(() => {
      this.refs.defaultHeight.style.height = '100%';
      this.BScroll = new BScroll(this.containerWrapper, {
        scrollY: true,
        click: true,
        // bounce: false, // 不设置回弹
        momentumLimitDistance: 30
      })

      this.BScroll2 = new BScroll(this.listWrapper, {
        scrollY: true,
        click: true,
        // bounce: false, // 不设置回弹
        momentumLimitDistance: 30
      })
    }, 1500)
  }
  componentWillUnmount(){
    clearTimeout(this.timeoutId);
  }
  
  // 处理nav导航
  handleNavClick = (index, event) => {
    // 修改state的navIndex的值。
    this.setState({navIndex: index})
  };
  render() {
    let classState = this.props.classState;
    let {navIndex} = this.state;
    let listArr;
    if(!classState.length){
      listArr = []
    }else {
      listArr = classState[navIndex].cate_list;
    }
    return (
      <div className={classifyCss.container}>
        <div ref='defaultHeight' className={classifyCss.listContainer}>
          <div ref={listWrapper => this.listWrapper = listWrapper}>
            <div>
              {
                listArr.map((listItem, index) => {
                  return (
                    <div key={index} className={classifyCss.list} style={{borderTop: index>0? '1px solid #eee': 'none'}}>
                      <a href="#">{listItem.title}</a>
                      <ul className='clearfix'>
                        {
                          listItem.list.map((item, index) => {
                            return (
                              <li key={index} className={classifyCss.item}>
                                <a href="#">
                                  <div>
                                    <img src={item.photo}/>
                                  </div>
                                  <p>{item.name}</p>
                                </a>
                              </li>
                            )
                          })
                        }
                      </ul>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
        <div ref={container => this.containerWrapper = container} className={classifyCss.navContainer}>
          <ul  className={classifyCss.nav}>
            {
              classState.map((item, index) => {
                return (
                  <li key={index} onClick={this.handleNavClick.bind(this, index)} style={{color: navIndex ===index? 'red': '#333'}}>{item.name}</li>
                )
              })
            }
            {/*iphoneX下数据少，高度不够，用空的li占位*/}
            <li></li>
          </ul>
        </div>

      </div>

  )
  }
}

export default connect(
  state => ({classState: state.classify}),
  {getClassifyDatas}
)(ClassifyMain);