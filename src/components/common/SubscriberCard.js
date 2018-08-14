import React, { Component } from "react";
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
  Right,
  Item,
  Spinner,
  Toast
} from "native-base";
import Moment from "moment";

import UserService from "../../services/user";
class SubscriberCard extends Component {
  state = {
    payLoad: "",
    data: {}
  };
  componentWillMount() {
    this.setState({ data: this.props.data });
  }
  ButtonStatus() {
    if (this.state.data.subscriber_dues_status === "Paid") {
      return (
        <Button
          block
          disabled
          style={{ width: "100%", backgroundColor: "#7a7a7a" }}
        >
          <Icon active name="card" />
          <Text style={{ fontWeight: "bold" }}>Paid</Text>
        </Button>
      );
    }
    return this.ButtonPayable();
  }
  ButtonPayable() {
    if (this.state.payLoad) {
      return (
        <Button
          block
          disabled
          style={{ width: "100%", backgroundColor: "#00590f" }}
        >
          <Spinner style={{ color: "#69db84" }} />
        </Button>
      );
    }
    return (
      <Button
        block
        style={{ width: "100%", backgroundColor: "#00590f" }}
        onPress={this.buttonPressed.bind(this)}
      >
        <Icon active name="card" />
        <Text style={{ fontWeight: "bold" }}>Pay</Text>
      </Button>
    );
  }
  buttonPressed() {
    this.setState({ payLoad: true });
    UserService.payBill(this.props.Token, this.state.data.subscriber_id)
      .then(res => {
        console.log(res);
        if (res.data.status) {
          // console.log({ ...this.state.data, subscriber_dues_status: "Paid" });
          this.setState({
            payLoad: false,
            data: { ...this.state.data, subscriber_dues_status: "Paid" }
          });
          this.props.onPay();
        } else {
          this.setState({
            payLoad: false
          });
          Toast.show({
            text: res.data.error.toUpperCase(),
            position: "top",
            type: "danger"
          });
        }
      })
      .catch(error => {
        console.log(error.response);
        this.setState({
          payLoad: false
        });
        Toast.show({
          text: error.response.data.error.toUpperCase(),
          position: "top",
          type: "danger"
        });
      });
  }
  paidStatus() {
    if (!(this.state.data.subscriber_dues_status === "Paid")) {
      return (
        <React.Fragment>
          <CardItem>
            <Left>
              <Text style={{ fontWeight: "bold", color: "#8d8d8d" }}>
                Balance:
              </Text>
            </Left>
            <Right>
              <Text style={{ fontWeight: "bold", color: "#389e4d" }}>
                {this.state.data.subscriber_balance}
              </Text>
            </Right>
          </CardItem>

          <CardItem>
            <Left>
              <Text style={{ fontWeight: "bold", color: "#8d8d8d" }}>
                Due Data:
              </Text>
            </Left>
            <Right>
              <Text style={{ fontWeight: "bold", color: "#389e4d" }}>
                {Moment(this.state.data.due_date).format("DD MMM, YYYY")}
              </Text>
            </Right>
          </CardItem>
        </React.Fragment>
      );
    }
  }
  render() {
    Moment.locale("en");
    return (
      <Content padder>
        <Card style={{ borderRadius: 5 }}>
          <CardItem>
            <Left>
              <Text style={{ fontWeight: "bold", color: "#8d8d8d" }}>
                Subscriber Name:
              </Text>
            </Left>
            <Right>
              <Text style={{ fontWeight: "bold", color: "#389e4d" }}>
                {this.state.data.subscriber_nickname}
              </Text>
            </Right>
          </CardItem>
          <CardItem>
            <Left>
              <Text style={{ fontWeight: "bold", color: "#8d8d8d" }}>
                Reference No:
              </Text>
            </Left>
            <Right>
              <Text style={{ fontWeight: "bold", color: "#389e4d" }}>
                {this.state.data.subscriber_reference_no}
              </Text>
            </Right>
          </CardItem>

          <CardItem>
            <Left>
              <Text style={{ fontWeight: "bold", color: "#8d8d8d" }}>
                Merchant Name:
              </Text>
            </Left>
            <Right>
              <Text style={{ fontWeight: "bold", color: "#389e4d" }}>
                {this.state.data.merchant_name}
              </Text>
            </Right>
          </CardItem>
          {this.paidStatus()}
          <CardItem>{this.ButtonStatus()}</CardItem>
        </Card>
      </Content>
    );
  }
}

export default SubscriberCard;
