import React, { Component } from 'react';
import './register.css'
import axios from 'axios'
import { connect } from 'react-redux'
import {
  Link
} from 'react-router-dom'
import { ActionSheet, Toast } from 'antd-mobile';

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

class Register extends Component {
  constructor(props) {
    super(props);

    this.changeHandle = this.changeHandle.bind(this);
    this.toRegister = this.toRegister.bind(this);

    this.state = {
      username: "",
      password: "",
      bool: false
    };
  }
  changeHandle(event) {
    let obj = event.target;
    let value = obj.value;
    let name = obj.name;
    this[name] = value;

  }

  username = ""
  password = ""
  nickname = ""

  successToast(value) {
    Toast.success(value, 1);
  }
  failToast(value) {
    Toast.fail(value, 1);
  }
  toRegister() {
    let _this = this;
    let userInfo = {
      username: this.username,
      password: this.password,
      nickname: this.nickname
    }

    if (!userInfo.username || !userInfo.password || !userInfo.nickname) {
      this.failToast("Please input content！！！")
    }

    axios.post('/register', userInfo).then(res => {
      if (res.data.status === "success") {
        window.socket.emit('join', res.data.userInfo._id);
        _this.props.dispatch({ type: "SAVE_INFO", data: res.data.userInfo })
        _this.props.history.replace("/chatlist")
      } else {
        _this.failToast("Add fails！！！");
      }
    })
  }


  showActionSheet = () => {
    const BUTTONS = ['Log In', 'Close', 'Cancel'];
    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: BUTTONS.length - 1,
      destructiveButtonIndex: BUTTONS.length - 2,
      // title: 'title',
      maskClosable: true,
      'data-seed': 'logId',
      wrapProps,
    },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          this.props.history.replace("/login")
        }
      });
  }

  render() {

    return (

      <div id="register">
        <Link to="/login" ><div className="switch_button">Login</div></Link>
        <div class='form'>
          <p class="slogan">Welcome to Fluorite Chat!</p>
           <div class="inputArea">
          <div className="input_wrap"><input name="username" onChange={this.changeHandle} type="text" placeholder="Account" /></div>
          <div className="input_wrap"><input name="password" onChange={this.changeHandle} type="password" placeholder="Password" /></div>
          <div className="input_wrap"><input name="nickname" onChange={this.changeHandle} type="nickname" placeholder="Nickname" /></div>
          <button onClick={this.toRegister} className="signup_btn">Sign Up</button>
          </div>
          </div>
        <div className="more-option" onClick={this.showActionSheet}>More Options</div>
      </div>
    );
  }
}

export default connect()(Register);
