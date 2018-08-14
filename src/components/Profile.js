import React, { Component } from "react";
import { Container, Header, Content, Button, Text } from "native-base";
import { AsyncStorage } from "react-native";
import { Actions } from "react-native-router-flux";

import AppFooter from "./common/Footer";
class Profile extends Component {
  state = {};
  onLogout() {
    AsyncStorage.removeItem("Token").then(res => Actions.auth());
  }
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Button block danger onPress={this.onLogout.bind(this)}>
            <Text>Log Out</Text>
          </Button>
        </Content>
        <AppFooter home={false} profile={true} />
      </Container>
    );
  }
}

export default Profile;
