import React,{Component} from 'react'
import './userCard.css'
import Header from '../header/Header.js'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Toast } from 'antd-mobile'

class InfoCard extends Component {
    constructor(props){
        super(props)
    }
    toChat = () => {
        this.props.history.push({
            pathname:'/chat',
            params:{
                friend:this.props.history.location.params.friend
            }
        });
    }

    successToast = function (value) {
        Toast.success(value, 1);
    }
    failToast = function (value) {
        Toast.fail(value, 1);
    }

    toDelete = () =>{
        let friend_id = this.props.history.location.params.friend._id;
        let user_id = this.props.user_info.id;
        axios.delete(`/user/${user_id}/friends/${friend_id}`).then(res => {
            if (res.data === 'Deleted') {
                this.successToast("Successfully deleted!");
            } else {
                this.failToast("Request failed");
            }
        });
    }

    render(){
        return (
            <div id='userCard'>
                <Header  field={{title:'More...',path:"/userCard"}} />
                <div onClick={this.toChat} className="green_btn">Send message</div>
                <Link to="/friends"><div className='red_btn' onClick={this.toDelete}>Delete</div></Link>
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
        }
    }
}
export default connect(mapStateToProps)(InfoCard);