import React, { Component } from "react";
import { Image } from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right
} from "native-base";

import { AsyncStorage } from "react-native";
import { Actions } from "react-native-router-flux";

import AppFooter from "./common/Footer";
class Profile extends Component {
  state = { user: "" };
  onLogout() {
    AsyncStorage.removeItem("Token").then(res => Actions.auth());
  }
  componentWillMount() {
    AsyncStorage.getItem("User", (err, res) => {
      if (!err) {
        this.setState({ user: JSON.parse(res) });
      }
    });
  }
  render() {
    return (
      <Container>
        <Header />
        <Content padder>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{ uri: this.state.user.user_image }} />
                <Body>
                  <Text>{this.state.user.user_name}</Text>
                  <Text note>{this.state.user.user_email}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Button
                block
                danger
                style={{ width: "100%" }}
                onPress={this.onLogout.bind(this)}
              >
                <Text>Log Out</Text>
              </Button>
            </CardItem>
          </Card>
        </Content>
        <AppFooter home={false} profile={true} />
      </Container>
    );
  }
}

export default Profile;
