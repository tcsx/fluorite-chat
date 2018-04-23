import React, { Component } from "react"
import './friends.css'
import Header from '../header/Header.js'
import NavBar from '../navBar/navBar.js'
import { connect } from 'react-redux'
import { SearchBar, Toast } from 'antd-mobile';
import axios from 'axios'


class Friends extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value:""
        }
    }
    toUserCard = (obj) => {
    this.props.history.push({
                                pathname:'/chat',
                                params:{
                                    friend:obj
}
});
    }
    successToast = function () {
        Toast.success('Load success !!!', 1);
    }
    failToast = function () {
        Toast.fail('Load failed !!!', 1);
    }
    onSubmit = (value) => {
        let _this = this;
        // if (!value ) return this.setState({ search_lists: [] });

        // axios.post('/getUsers', { username: value }).then((res) => {
        //     this.setState({ search_lists: res.data.userInfo });
        // })
    }
    onChange = (value) => {
        this.setState({ value });
        this.onSubmit(value);
    }
    clear = () => {
        this.setState({ value: '' });
    }

    componentWillMount() {

    }


    render() {

        return (
          <div id="friends">
          <Header field={{ title: 'Fluorite Chat', path: "/chatlist" }} />

          <NavBar />
            <div id="rightBar">

              <div style={{overflow:'auto',height:"100%"}}>

                  <div style={{ marginTop: ".1rem" }} className="friend_lists">
                      {this.props.list_arr.map((list,index) =>
                          <div onClick={()=>{this.toUserCard(list)}} key={index} className="friend_list">
                              <div className="friend_list_logoWrap">
                                  <img className="friend_list_logo" src="./image/icon_moren_face.png" alt="" />
                              </div>
                              <div className="friend_name">{list.nickname}</div>
                          </div>
                      ,this)}
                  </div>
              </div>
              </div>
          </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        list_arr: state.save_info.friends ,
        groups: state.save_info.groups,
        logo: state.save_info.logo
    }
}

export default connect(mapStateToProps)(Friends);
