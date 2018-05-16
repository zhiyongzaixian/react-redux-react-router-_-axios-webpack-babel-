import React from 'react';
import {connect} from 'react-redux';
import {NavLink, withRouter} from 'react-router-dom';
import $ from 'jquery';
import verify from './jquery_plugin/js/verify';
import verifyCss from './jquery_plugin/css/verify.css';
import {changeFooterStyle} from '../../redux/actions';
import Tip from '../../tips ui/tip';


import myEpet from './myEpet.css';

let layer, tipProps={}, usernameIsOk = false, passwordIsOk = false;


class MyEpet extends React.Component{
  state = {
    loginWay: true,
    tipProps: {}
  }

  componentDidMount(){
    /// 验证图片验证码
    $('.mpanel2').codeVerify({
      type : 1,
      width : '100px',
      height : '40px',
      fontSize : '26px',
      codeLength : 4,
      btnId : 'check-btn',
      ready : function() {
      },
      success : function() {
        alert('验证成功。。。');
      },
      error : function() {
        alert('验证码不匹配！');
      }
    });


  }
  componentWillUpdate(){
    // 当两个登录方式的切换的时候清空之前输入的内容。
    this.refs.username.value = '';
    this.refs.password.value = '';
    this.refs.phoneNumber.value = '';
    this.refs.img.value = '';
    this.refs.passwd.value = '';
  }

  updateTip(value, passwd){
    if(!value.trim()){
      console.log(tipProps);
      tipProps = {
        isShow: true,
        title: '验证错误',
        content: '用户名不能为空'
      }

    }else if(value.length <= 3){
      tipProps = {
        isShow: true,
        title: '验证错误',
        content: '用户名不能少于3位'
      }
    }else if(!passwd.trim()){
      tipProps = {
        isShow: true,
        title: '验证错误',
        content: '密码不能为空'
      }

    }else if(passwd.length <= 3){
      tipProps = {
        isShow: true,
        title: '验证错误',
        content: '密码不能少于3位'
      }
    }else {
      tipProps = {
        isShow: true,
        title: '登录成功',
        content: '即将跳转到主页面',
        time: 5000
      }
      this.setState({tipProps});

      setTimeout(() => {
        this.props.history.replace('/main');
      }, 3000)
      return;
    }
    this.setState({tipProps});
  }

  handleLogin = () => {
    let value = this.refs.username.value;
    let passwd = this.refs.password.value;
    this.updateTip(value, passwd);
  }
  render(){
    let {loginWay, tipProps} = this.state;
    return (
      <div className={myEpet.myEpet}>
        <div className={myEpet.header}>
          <NavLink to='/main'><i className='iconfont icon-jiantou-copy-copy'></i></NavLink>
          <a>注册</a>
          <div className={myEpet.navLogin}>
            <a onClick={() => this.setState({loginWay: true, tipProps:{isShow: false}})} href='javascript:;'>普通登录</a>
            <a onClick={() => this.setState({loginWay: false, tipProps:{isShow: false}})} href='javascript:;'>手机动态密码登录</a>
            <div className={loginWay?'sanjiao': ''}></div>
            <div className={loginWay?'': 'sanjiao2'}></div>
          </div>
        </div>
        <div className="common" style={{display: loginWay?'block': 'none'}}>
          <ul>
            <li>
              <i className='iconfont icon-yonghutouxiang'></i>
              <input id='username'  ref='username' type="text" placeholder='手机号/邮箱/用户名'/>
            </li>
            <li>
              <i className='iconfont icon-kongxin'></i>
              <input  ref='password' type="text" placeholder='输入密码'/>
            </li>
          </ul>
        </div>
        <div className="common" style={{display: loginWay?'none': 'block'}}>
          <ul>
            <li>
              <i className='iconfont icon-shouji'></i>
              <input ref='phoneNumber' type="text" placeholder='已注册的手机号'/>
            </li>
            <li>
              <i className='iconfont icon-back-top'></i>
              <input ref='img' className='user_code' type="text" placeholder='请输入图片内容'/>
            </li>
            <li>
              <i className='iconfont icon-kongxin'></i>
              <input ref='passwd' type="text" placeholder='动态密码'/>
            </li>
          </ul>

          <div className="mpanel2" >
          </div>

          {/*<button type="button" id="check-btn" className="verify-btn">确定</button>*/}
        </div>
        <div>
          
          <a href="javascript:;" className={myEpet.noPwd}>忘记密码?</a>
          <button onClick={this.handleLogin} className='loginBtn' ref={btn => this.btnDOM = btn} style={{display: !loginWay?'none': 'block'}}>登录</button>
          <button className='loginBtn' ref={btn => this.btnDOM = btn} style={{display: loginWay?'none': 'block'}} id='check-btn'>登录</button>
        </div>
        <Tip {...tipProps}/>
      </div>
    )
  }
}

export default connect(
  state => ({state: state.footer}),
  {}
)(withRouter(MyEpet));