import React, { Component } from 'react'
import './user.css'
import Header from '../header/Header.js'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class User extends Component {
    render() {
        return (
          <div id='user'>
              <div className="userInfo-content">
                      <div className="logo-wrap">
                          <img src={ this.props.self_logo } alt="" />
                      </div>
                      <div className="textWrap">
                          <div className="user-username">{this.props.self_username}</div>
                      </div>

              </div>

          </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        self_logo: state.save_info.logo,
        self_username: state.save_info.username,
        self_nickname: state.save_info.nickname,
    }
}
export default connect(mapStateToProps)(User)
