import React, { Component } from "react";
import {
  Container,
  Card,
  Content,
  CardItem,
  Text,
  Toast,
  Spinner,
  Header,
  Left,
  Thumbnail,
  Body
} from "native-base";
import { AsyncStorage } from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import NumberFormat from "react-number-format";

import UserService from "../services/user";
import AppFooter from "./common/Footer";
import { shiftedTobills } from "../actions";
class Transaction extends Component {
  state = {
    balanceLoad: "",
    Token: "",
    user: {},
    cardLoad: "",
    card: []
  };
  stateChange() {
    if (this.props.bills) {
      this.props.shiftedTobills();
      this.artificial_function();
    }
  }
  componentWillMount() {
    this.artificial_function();
  }
  artificial_function() {
    // componentWillMount();
    // console.log("-i am called from artificial");
    AsyncStorage.getItem("Token", (err, res) => {
      console.log(res);
      if (!err) {
        this.setState({ Token: res });
        this.getBalance();
        this.getCard();
      }
    });
  }
  getBalance() {
    this.setState({
      balanceLoad: true
    });
    UserService.aboutMe(this.state.Token)
      .then(response => {
        if (response.data.status) {
          this.setState({
            user: response.data.response,
            balanceLoad: false
          });
        } else {
          this.setState({
            balanceLoad: false
          });
          Toast.show({
            text: "Something Went Wrong",
            position: "top",
            type: "danger"
          });
          Actions.auth();
        }
      })
      .catch(error => {
        Toast.show({
          text: "Something Went Wrong",
          position: "top",
          type: "danger"
        });
        Actions.auth();
      });
  }
  getCard() {
    this.setState({
      cardLoad: true
    });
    UserService.transactionList(this.state.Token)
      .then(response => {
        if (response.data.status) {
          this.setState({
            card: response.data.response,
            cardLoad: false
          });
        } else {
          this.setState({
            cardLoad: false
          });
          Toast.show({
            text: "Something Went Wrong",
            position: "top",
            type: "danger"
          });
          Actions.auth();
        }
      })
      .catch(error => {
        Toast.show({
          text: "Something Went Wrong",
          position: "top",
          type: "danger"
        });
        Actions.auth();
      });
  }
  onLoad() {
    if (this.state.balanceLoad) {
      return <Spinner color="#69db84" />;
    }
    return (
      <NumberFormat
        value={this.state.user.user_wallet_balance}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"Rs "}
        renderText={value => (
          <Text style={{ color: "#69db84", fontSize: 34 }}>{value}</Text>
        )}
      />
    );
  }
  onCardLoad() {
    if (this.state.cardLoad) {
      return <Spinner color="#00590f" />;
    }
    return this.state.card.map(data => {
      return (
        <Card>
          <CardItem>
            <Left>
              <Thumbnail
                source={{
                  uri: data.merchant_logo
                }}
              />
              <Body>
                <Text>{data.merchant_name}</Text>
                <Text note>{data.subscriber_nickname}</Text>
                <Text note>Amount: {data.amount}</Text>
              </Body>
            </Left>
          </CardItem>
        </Card>
      );
    });
  }
  render() {
    this.stateChange();
    return (
      <Container style={{ backgroundColor: "#f2f2f2" }}>
        <Header transparent span style={{ paddingTop: 30 }}>
          <Card
            padder
            transparent
            style={{
              paddingTop: 5,
              paddingLeft: 5,
              paddingRight: 5,
              width: "100%",
              height: "100%"
            }}
          >
            <CardItem
              style={{
                backgroundColor: "#00590f",
                width: "100%",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10
              }}
            >
              {this.onLoad()}
            </CardItem>
            <CardItem style={{ backgroundColor: "#f2f2f2" }} />
          </Card>
        </Header>
        <Content padder>{this.onCardLoad()}</Content>
        <AppFooter home={false} profile={false} transaction={true} />
      </Container>
    );
  }
}

const MapStateToProps = state => {
  return {
    bills: state.shift.bills
  };
};
export default connect(
  MapStateToProps,
  { shiftedTobills }
)(Transaction);
