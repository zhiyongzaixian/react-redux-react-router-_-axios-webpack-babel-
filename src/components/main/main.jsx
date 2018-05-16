import React from 'react';
import {connect} from 'react-redux';
import MyHeader from '../header/header'
import Content from '../content/content';
import mainContainer from './main.css';

class Main extends React.Component{
  render(){
    let {footerHeight, headerHeight} = this.props.mainState;
    return (
      <div>
        <MyHeader ref={headerDOM => this.headerDOM = headerDOM} />
        <Content headerHeight={headerHeight} footerHeight={footerHeight}/>
        <div className='goDog goAnimate'></div>
      </div>
    )
  }
}

export default connect(
  state => ({mainState: state.header}),
  {}
)(Main);
