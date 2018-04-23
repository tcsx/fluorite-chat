import React,{Component} from 'react'
import './userCard.css'
import Header from '../header/Header.js'

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

    render(){
        return (
            <div id='userCard'>
                <Header  field={{title:'More...',path:"/userCard"}} />
                <div onClick={this.toChat} className="green_btn">Send message</div>
            </div>
        )
    }
}

export default InfoCard;