import React, { Component } from "react";
import { Router, Scene } from "react-native-router-flux";
import { connect } from "react-redux";

import { shiftingToMain, shiftingTobills } from "./actions";
import Splash from "./components/Splash";
import Login from "./components/Login";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Transaction from "./components/Transaction";

class RouterComponent extends Component {
  state = {};
  render() {
    return (
      <Router>
        <Scene key="root" tabs hideTabBar hideNavBar>
          <Scene key="auth" hideTabBar>
            <Scene key="splash" component={Splash} tabs hideTabBar hideNavBar />
            <Scene key="login" component={Login} tabs hideTabBar hideNavBar />
            <Scene key="signup" component={Signup} tabs hideTabBar hideNavBar />
          </Scene>
          <Scene key="main">
            <Scene
              key="home"
              component={Home}
              tabs
              hideTabBar
              hideNavBar
              initial={true}
              onEnter={this.props.shiftingToMain}
            />
          </Scene>
          <Scene key="profile">
            <Scene
              key="profile-1"
              component={Profile}
              tabs
              hideTabBar
              hideNavBar
            />
          </Scene>
          <Scene key="transactionList">
            <Scene
              key="transaction"
              component={Transaction}
              tabs
              hideTabBar
              hideNavBar
              onEnter={this.props.shiftingTobills}
            />
          </Scene>
        </Scene>
      </Router>
    );
  }
}

export default connect(
  null,
  { shiftingToMain, shiftingTobills }
)(RouterComponent);
