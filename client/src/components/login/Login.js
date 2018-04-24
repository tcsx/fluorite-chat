import React, { Component } from 'react';
import './login.css'
import { connect } from 'react-redux'
import axios from 'axios'
import {
  Link
} from 'react-router-dom'
import { ActionSheet, Toast } from 'antd-mobile';
// import * as io from 'socket.io-client'


/*const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}*/
class Login extends Component {
  constructor() {
    super();

    this.changeHandle = this.changeHandle.bind(this);
    this.toLogin = this.toLogin.bind(this);

    this.state = {
      username: "",
      password: "",
      bool: false
    };
  }
  username = ""
  password = ""
  bool = ""

  successToast(value) {
    Toast.success(value, 2);
  }
  failToast(value) {
    Toast.fail(value, 2);
  }

  changeHandle(event) {
    let obj = event.target;
    let value = obj.value;
    let name = obj.name;
    this[name] = value;
    // if(this.username != "" && this.password != ""){
    //   this.bool = true;
    // }else {
    //   this.bool = false;
    // }
  }
  toLogin() {
    let _this = this;
    let userInfo = {
      username: this.username,
      password: this.password
    }
    axios.post('/login', userInfo).then(res => {
      if (res.data.status === "success") {
        window.socket.emit('join', res.data.userInfo._id);
        _this.props.dispatch({ type: "SAVE_INFO", data: res.data.userInfo })
        _this.props.history.replace({ pathname: "/chatlist" });
      } else {
        _this.successToast(res.data.message);
      }
    })
  }


  showActionSheet = () => {
    const BUTTONS = ['Sign Up','Close', 'Cancel'];
    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: BUTTONS.length - 1,
      destructiveButtonIndex: BUTTONS.length - 2,
      // title: 'title',
      maskClosable: true,
      'data-seed': 'logId',
     // wrapProps,
    },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          this.props.history.replace("/register")
        }
      });
  }
  render() {
    return (
      <div id="login">
        <Link to="/register" ><div className="switch_button">Register</div></Link>
        <div className='form'>
          <p class="slogan">Welcome to Fluorite Chat!</p>
          <div className="inputArea">
            <div className="inputs"><input name="username" ref="username" onChange={this.changeHandle} type="text" placeholder="Please input account" /></div>
            <div className="inputs"><input name="password" ref="password" onChange={this.changeHandle} type="password" placeholder="Please input password" /></div>
            <button onClick={this.toLogin} className="login_btn">Log In</button>
         </div>
       </div>
        <div className="more-option" onClick={this.showActionSheet}>More Options</div>
      </div>
    );
  }
}

export default connect()(Login);
