import React, { Component } from 'react';
import './navBar.css'
import User from '../user/user.js'
import { NavLink } from 'react-router-dom'

class NavBar extends Component {
  render() {
    return (
      <div id="navBar">
        <User />
        <NavLink
          to="/chatlist"
          activeClassName="selected"
        >
        <span className="iconfont icon-info"></span>
        <span className="navBar-text">Chat List</span>
        </NavLink>
        <NavLink
          to="/friends"
          activeClassName="selected"
        >
        <span className="iconfont icon-friends"></span>
        <span className="navBar-text">Contact List</span>
        </NavLink>
      
       <NavLink to="/login" activeClassName="selected">
          <span className="navBar-text" id="logout">Log out</span>
          </NavLink>
      </div>
    );
  }
}

export default NavBar;
