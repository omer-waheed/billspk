import React, { Component } from "react";
import {
  Content,
  Container,
  Card,
  CardItem,
  Button,
  Text,
  Body,
  Item,
  Label,
  Input,
  Icon,
  Toast,
  Spinner
} from "native-base";
import { Image, ImageBackground, AsyncStorage } from "react-native";
import { Actions } from "react-native-router-flux";

import LoginService from "../services/login";
class Signup extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    validated: "",
    loading: ""
  };
  onEmailChange(text) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      this.setState({ validated: false, email: text });
    } else {
      this.setState({ validated: true, email: text });
    }
  }
  onPasswordChange(text) {
    this.setState({ password: text });
  }
  onNameChange(text) {
    this.setState({ name: text.replace(/\s/g, "") });
  }
  onEmailCorrect() {
    if (this.state.email != "") {
      if (!this.state.validated) {
        return <Icon name="close-circle" style={{ color: "red" }} />;
      } else {
        return <Icon name="checkmark-circle" />;
      }
    }
    return <Text />;
  }
  onLogin() {
    // console.log(this.state.email + "-" + this.state.password);
    this.setState({ loading: true });
    LoginService.signup({
      user_email: this.state.email,
      user_password: this.state.password,
      user_name: this.state.name
    })
      .then(res => {
        console.log(res.data);
        if (res.data.responseCode == "200") {
          Toast.show({
            text: "SignUp Successful",
            position: "top",
            type: "success"
          });
        }
        this.setState({
          name: "",
          email: "",
          password: "",
          validated: "",
          loading: ""
        });
        Actions.login();
      })
      .catch(err => {
        Toast.show({
          text: err.response.data.error.toUpperCase(),
          position: "top",
          type: "danger"
        });
        this.setState({ loading: false });
      });
  }
  buttonActive() {
    if (
      this.state.email != "" &&
      this.state.password != "" &&
      this.state.name != "" &&
      this.state.validated
    ) {
      return (
        <Button
          rounded
          style={{
            width: "100%",
            textAlign: "center",
            backgroundColor: "white"
          }}
          onPress={this.onLogin.bind(this)}
        >
          {this.onLoad()}
        </Button>
      );
    }
    return (
      <Button
        rounded
        disabled
        style={{
          width: "100%",
          textAlign: "center"
        }}
      >
        {this.onLoad()}
      </Button>
    );
  }
  onLoad() {
    if (this.state.loading == true) {
      return (
        <Spinner
          style={{
            marginRight: "auto",
            marginLeft: "auto",
            color: "green"
          }}
        />
      );
    }
    return (
      <Text
        style={{
          marginRight: "auto",
          marginLeft: "auto",
          color: "green"
        }}
      >
        Sign Up
      </Text>
    );
  }
  render() {
    return (
      <Container>
        <ImageBackground
          source={require("../../assets/background-login.jpg")}
          style={{ width: "100%", height: "100%" }}
        >
          <Content>
            <Card transparent>
              <CardItem
                cardBody
                style={{
                  backgroundColor: "transparent",
                  width: "100%",
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: 130
                }}
              >
                <Image
                  source={require("../../assets/logo-login.png")}
                  style={{
                    width: 195,
                    height: 100
                  }}
                />
              </CardItem>
            </Card>
            <Card transparent style={{ paddingTop: "30%" }}>
              <CardItem style={{ backgroundColor: "transparent" }}>
                <Item floatingLabel success>
                  <Label style={{ color: "green" }}>Name</Label>
                  <Input
                    onChangeText={this.onNameChange.bind(this)}
                    value={this.state.name}
                  />
                </Item>
              </CardItem>
              <CardItem style={{ backgroundColor: "transparent" }}>
                <Item floatingLabel success>
                  <Label style={{ color: "green" }}>Email</Label>
                  <Input
                    onChangeText={this.onEmailChange.bind(this)}
                    value={this.state.email}
                  />
                  {this.onEmailCorrect()}
                </Item>
              </CardItem>
              <CardItem style={{ backgroundColor: "transparent" }}>
                <Item floatingLabel success>
                  <Label style={{ color: "green" }}>Password</Label>
                  <Input
                    secureTextEntry={true}
                    onChangeText={this.onPasswordChange.bind(this)}
                    value={this.state.password}
                  />
                </Item>
              </CardItem>
              <CardItem style={{ backgroundColor: "transparent" }}>
                <Body style={{ width: "100%" }}>{this.buttonActive()}</Body>
              </CardItem>
            </Card>
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}

export default Signup;
