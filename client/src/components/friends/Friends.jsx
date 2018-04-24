import React, { Component } from "react";
import './friends.css';
import Header from '../header/Header';
import NavBar from '../navBar/navBar';
import { connect } from 'react-redux';
import { SearchBar, Toast } from 'antd-mobile';
import axios from 'axios';


class Friends extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "" 
        }
    }

    toUserCard = (obj) => {
        this.props.history.push({
            pathname: '/userCard',
            params: {
                friend: obj
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


    renderFriends() {
        return this.props.friends.map((friend, index) =>
                                <div onClick={() => { this.toUserCard(friend) }} key={index} className="friend_list">
                                    <div className="friend_list_logoWrap">
                                        <img className="friend_list_logo" src={friend.logo} alt="" />
                                    </div>
                                    <div className="friend_name">{friend.nickname}</div>
                                </div>
                                , this);
    }


    render() {

        return (
            <div id="friends">
                <Header field={{ title: 'Fluorite Chat', path: "/friends" }} />

                <NavBar />
                <div id="rightBar">

                    <div style={{ overflow: 'auto', height: "100%" }}>

                        <div style={{ marginTop: ".1rem" }} className="friend_lists">
                            {this.renderFriends()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { friends, groups, logo, _id } = state.save_info;
    return { friends, groups, logo, _id };
}

export default connect(mapStateToProps)(Friends);
