import React, { Component } from "react"
import './add_friend.css'
import Header from '../header/Header.js'
import { connect } from 'react-redux'
import { SearchBar, Toast } from 'antd-mobile';
import axios from 'axios'

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
        axios.get(`/user/${this.props.user_info.id}/friend/${value}`).then((res) => {
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
    onAdd_friend = ({username, _id}) => {
        // let _this = this;
        let bool = this.props.save_info.friends.some((friend)=>{
            if(friend.id==_id){
                _this.failToast("He/She has been your friend！")
                return true;
            }
        })
        if(bool) return false;
        // let firend = {
        //     username: obj.username,
        //     id: obj._id,
        //     nickname: obj.nickname,
        //     logo: obj.logo
        // };
        // let data = {
        //     self: _this.props.user_info,
        //     friend: firend
        // }
        
        axios.put(`/user/${this.props.user_info.id}/friends/${_id}`).then(res => {
            if (res.data.status == 'success') {
                this.props.dispatch({ type: "ADD_FRIEND", data: res.data })
                this.setState({ value: " ", search_lists: [] });
                this.successToast("Add successfully！！");
            } else {
                this.failToast("Request fails！！！");
            }
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
                                        <div className="friend_name">{obj._id}</div>
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
    return {
        user_info: {
            logo: state.save_info.logo,
            username: state.save_info.username,
            nickname: state.save_info.nickname,
            id: state.save_info._id
        },
        save_info : state.save_info
    }
}

export default connect(mapStateToProps)(Add_friend);