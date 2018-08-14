/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Root } from "native-base";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

import reducer from "./src/reducers";
import Router from "./src/Router";

export default class App extends Component {
  render() {
    return (
      <Root>
        <Provider store={createStore(reducer, {}, applyMiddleware(ReduxThunk))}>
          <Router />
        </Provider>
      </Root>
    );
  }
}
