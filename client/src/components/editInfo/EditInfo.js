import React, { Component } from 'react'
import './editInfo.css'
import Header from '../header/Header.js'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class EditInfo extends Component {
    render() {
        return (
            <div id="editInfo">
                <Header field={{ title: 'PersonalInfo', path: "/editInfo" }} />
                <div className="userInfo-content">
                    <div style={{ marginTop: 0 }} className="items-wrap">
                        <Link to="/uploadLogo" className="upload_logo">
                            <div className="textWrap">
                                <div className="">Change your Profile Pic here</div>
                            </div>
                            <div className="logo-wrap">
                                <img src={this.props.self_logo} alt="" />
                            </div>
                            <div className="arrow">
                                <span className="iconfont icon-arrow-right"></span>
                            </div>
                        </Link>
                        <Link style={{display:'flex',color:'#000'}} to="/resetInfo" className="user-item">
                            <div className="textWrap">Nick Name</div>
                            <div className="text-info">{this.props.self_nickname}</div>
                            <div className="arrow">
                                <span className="iconfont icon-arrow-right"></span>
                            </div>
                        </Link>
                        <div className="user-item">
                            <div className="textWrap">WetalkID</div>
                            <div style={{ marginRight: 0 }} className="text-info">{this.props.self_username}</div>
                        </div>
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
export default connect(mapStateToProps)(EditInfo)
