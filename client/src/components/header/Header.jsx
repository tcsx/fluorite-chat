import React, { Component } from 'react';
import './header.css';
import { Link } from 'react-router-dom';

class Header extends Component {
  componentDidMount() {

  }
  render() {


    let Left = null;
    switch (this.props.field.path) {
      case "/add_friend":
        Left = <Link to="/friends" className="left iconfont icon-back">ContactList</Link>;
        break;
      case "/chat":
        Left = <Link to="/chatlist" className="left iconfont icon-back" >Back</Link>;
        break;
      case "/userCard":
        Left = <Link to="/friends" className="left iconfont icon-back">ContactList</Link>;
        break;
      case "/editInfo":
        Left = <Link to="/chatlist" className="left iconfont icon-back">Me</Link>;
        break;
      case "/uploadLogo":
        Left = <Link to="/editInfo" className="left iconfont icon-back">PersonalInfo</Link>;
        break;
      case "/resetInfo":
        Left = <Link to="/editInfo" className="left iconfont">Cancel</Link>;
        break;
      default:
        Left = <span></span>;
    }

    let Right = null;
    switch (this.props.field.path) {
      
      case "/friends":
        Right = <Link to="/add_friend" className="right iconfont icon-add_friend" />;
        break;

      case "/uploadLogo":
        Right = <label className="right iconfont icon-upload" ><input name="avatar" accept='image/*' onChange={this.props.onUpload} type="file"/></label>;
        break;
      case "/resetInfo":
        Right = <Link onClick={this.props.onSavename} style={{fontSize:'.16rem',color:"#1aad19"}} to="/editInfo" className="right iconfont">Finish</Link>;
        break;
      default:
        Right = <span></span>;
    }
    return (
      <div id="header">
        {Left}
        {this.props.field.title}
        {Right}
      </div>
    );
  }
}

export default Header;
