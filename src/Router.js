import React, { Component } from "react";
import { Router, Scene } from "react-native-router-flux";

import Splash from "./components/Splash";
import Login from "./components/Login";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Profile from "./components/Profile";

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" tabs hideTabBar hideNavBar>
        <Scene key="auth">
          <Scene
            key="splash"
            component={Splash}
            tabs
            hideTabBar
            hideNavBar
            initial={true}
          />
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
      </Scene>
    </Router>
  );
};

export default RouterComponent;
