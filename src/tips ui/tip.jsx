import React from 'react';
import PropTypes from 'prop-types';
import tip from  './tip.css';

export default class Tip extends React.Component{
  // 初始化的值
  state = {
    title: '',
    content: '',
    isShow: false,
  }
  static propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
    isShow: PropTypes.bool.isRequired,
    time: PropTypes.number.isRequired
  }
  componentWillUnmount(){
    // 关闭当前组件的时候清除定时器
    clearTimeout(this.timeoutId);
  }

  componentWillReceiveProps(nextProps){
    this.setState({...nextProps})
    // 2s以后自动关闭提示层
    this.timeoutId = setTimeout(() => {
      this.setState({
        isShow: false
      })
    }, nextProps.time)
  }
  componentWillUpdate(){
    // 关闭当前组件的时候清除定时器, 否则会影响新开的定时器。
    clearTimeout(this.timeoutId);
  }
  render(){
    let {title, content, isShow} = this.state;
    return (
      <div className='shade' ref={container => this.containerDOM = container} style={{display: isShow?'block':'none'}}>
        <div  className='tipContainer animate' >
          <div className='header'>
            <span>{title}</span>
            <span onClick={() => this.setState({isShow: false})} className='close'>X</span>
          </div>
          <div className='content'>
            {content}
          </div>
        </div>
      </div>
    )
  }
}

//弹层的默认属性值
Tip.defaultProps = {
  title: '自定义标题',
  isShow: false,
  content: '自定义弹层组件',
  time: 5500
}

