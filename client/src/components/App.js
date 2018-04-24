import React, { Component } from 'react';
import Login from './login/Login';
import Register from './register/Register';
import Chatlist from './chatlist/Chatlist';
import Friends from './friends/Friends';
import Search from './search/Search';
import User from './user/User';
import UserCard from './usercard/UserCard';
import Add_friend from './add_friend/Add_friend';
import Chat from './chat/Chat';
import EditInfo from './editInfo/EditInfo';
import UploadLogo from './uploadLogo/UploadLogo';
import ResetInfo from './resetInfo/ResetInfo';

import * as io from 'socket.io-client';


import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

window.socket = io();

class App extends Component {

  render() {
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={props => (
        window.store.getState().save_info.username ? (
          <Component {...props} />
        ) : (
            <Redirect to={{
              pathname: '/login',
              state: { from: props.location }
            }} />
          )
      )} />
    );

    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute exact={true} path="/chatlist" component={Chatlist} />
          <PrivateRoute exact={true} path="/friends" component={Friends} />
          <PrivateRoute exact={true} path="/search" component={Search} />
          <PrivateRoute exact={true} path="/user" component={User} />
          <PrivateRoute exact={true} path="/more" component={Friends} />
          <PrivateRoute exact={true} path="/add_friend" component={Add_friend} />
          <PrivateRoute exact={true} path="/userCard" component={UserCard} />
          <PrivateRoute exact={true} path="/chat" component={Chat} />
          <PrivateRoute exact={true} path="/editInfo" component={EditInfo} />
          <PrivateRoute exact={true} path="/uploadLogo" component={UploadLogo} />
          <PrivateRoute exact={true} path="/resetInfo" component={ResetInfo} />
          <Redirect exact={true} from='/' to='/login' />
        </Switch>
      </Router>
    );
  }
}

export default App;
