import React, { Component } from 'react';
import Header from './header/Header';
import Footer from './footer/Footer';
import Content from './Content';
import Chatlist from "./chatlist/Chatlist";
import {Route} from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div id="home">
        <Header/>
          <Content>
              <Route path="/home/chatlist" Component={Chatlist} />
          </Content>
        <Footer/>
      </div>
    );
  }
}

export default Home;
