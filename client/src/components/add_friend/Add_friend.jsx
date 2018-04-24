import React, { Component } from "react";
import './add_friend.css';
import Header from '../header/Header';
import { connect } from 'react-redux';
import { SearchBar, Toast } from 'antd-mobile';
import axios from 'axios';

class Add_friend extends Component {
    constructor(props) {
        super(props);
        this.onAdd_friend = this.onAdd_friend.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    state = {
        value: '',
        search_lists: []
    };

    successToast = function (value) {
        Toast.success(value, 1);
    }
    failToast = function (value) {
        Toast.fail(value, 1);
    }
    onSubmit = (value) => {
        if (!value) return this.setState({ search_lists: [] });
        // let self_username = window.store.getState().save_info.username;
        axios.get(`/user/${this.props._id}/friends/${value}`).then((res) => {
            this.setState({ search_lists: res.data.userInfo });
        })
    }
    onChange = (value) => {
        this.setState({ value });
        this.onSubmit(value);
    }
    clear = () => {
        this.setState({ value: '' });
    }
    handleClick = () => {
        this.manualFocusInst.focus();
    }
    onAdd_friend = ({ username, _id }) => {
        if (this.props.friends.includes(_id)) { 
            this.failToast("He/She has been your friend！");
            return false;
        }

        axios.put(`/user/${this.props._id}/friends/${_id}`).then(res => {
            this.props.dispatch({ type: "ADD_FRIEND", data: res.data })
            this.setState({ value: " ", search_lists: [] });
            this.successToast("Add successfully！！");
        })
    }
    componentWillMount() {

    }
    render() {

        return (
            <div id="friends">
                <Header field={{ title: 'Wetalk', path: "/add_friend" }} />
                <div style={{ fontSize: 14 }}>
                    <SearchBar
                        value={this.state.value}
                        placeholder="Search"
                        onSubmit={this.onSubmit}
                        onChange={this.onChange}
                    />
                </div>
                <div>
                    <div style={{ marginTop: ".1rem" }} className="friend_lists">
                        {
                            this.state.search_lists.map((obj, index) => {
                                return (
                                    <div onClick={() => {
                                        this.onAdd_friend(obj)
                                    }} key={index} className="friend_list">
                                        <div className="friend_list_logoWrap">
                                            <img className="friend_list_logo" src={obj.logo ? obj.logo : "./image/icon_moren_face.png"} alt="" />
                                        </div>
                                        <div className="friend_name">{obj.username}</div>
                                    </div>
                                )
                            }, this)
                        }
                    </div>

                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return { ...state.save_info };
}

export default connect(mapStateToProps)(Add_friend);