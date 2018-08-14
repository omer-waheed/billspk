import React, { Component } from "react";
import {
  Content,
  Container,
  Card,
  CardItem,
  Button,
  Text,
  Body
} from "native-base";
import { Image, ImageBackground, AsyncStorage } from "react-native";
import { Actions } from "react-native-router-flux";
// import { connect } from "react-redux";
// import { Actions } from "react-native-router-flux";

// import { emailChanged, passwordChanged, loginUser } from "../../actions";

class Splash extends Component {
  state = {};
  componentWillMount() {
    AsyncStorage.getItem("Token").then(res => {
      if (res) {
        Actions.main();
      }
    });
  }
  render() {
    return (
      <Container>
        <ImageBackground
          source={require("../../assets/background.jpg")}
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
                  source={require("../../assets/logo-splash.png")}
                  style={{
                    width: 195,
                    height: 100
                  }}
                />
              </CardItem>
            </Card>
            <Card transparent style={{ paddingTop: "30%" }}>
              <CardItem style={{ backgroundColor: "transparent" }}>
                <Body>
                  <Button
                    rounded
                    bordered
                    style={{ width: "100%", borderColor: "white" }}
                    success
                    onPress={() => Actions.signup()}
                  >
                    <Text
                      style={{
                        marginRight: "auto",
                        marginLeft: "auto",
                        color: "white"
                      }}
                    >
                      SIGN UP
                    </Text>
                  </Button>
                </Body>
              </CardItem>
              <Text
                numberOfLines={1}
                style={{
                  width: "100%",
                  textAlign: "center",
                  color: "white"
                }}
              >
                ──────── OR ────────
              </Text>
              <CardItem style={{ backgroundColor: "transparent" }}>
                <Body style={{ width: "100%" }}>
                  <Button
                    rounded
                    style={{
                      width: "100%",
                      textAlign: "center",
                      backgroundColor: "white"
                    }}
                    onPress={() => Actions.login()}
                  >
                    <Text
                      style={{
                        marginRight: "auto",
                        marginLeft: "auto",
                        color: "green"
                      }}
                    >
                      LOG IN
                    </Text>
                  </Button>
                </Body>
              </CardItem>
            </Card>
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}

// const MapStateToProps = state => {
//   return {
//     email: state.auth.email,
//     password: state.auth.password,
//     user: state.auth.user,
//     error: state.auth.error,
//     load: state.auth.load
//   };
// };

// export default connect(
//   MapStateToProps,
//   { emailChanged, passwordChanged, loginUser }
// )(LoginForm);
export default Splash;
