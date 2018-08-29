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
import FileViewer from "react-native-file-viewer";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import RNFS from "react-native-fs";

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
          this.openPdf();
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
      <Content style={{ marginTop: 0, marginRight: 5, marginLeft: 5 }}>
        <Card style={{ borderRadius: 5 }}>
          <CardItem style={{ marginTop: 5 }}>
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
  async openPdf() {
    let options = {
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <title>Title</title>
          <link href="https://fonts.googleapis.com/css?family=Roboto:400,500i,700" rel="stylesheet">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
              body{
                  font-family: Roboto, sans-serif;
                  color: #505a6b;
                  font-size: 0.9rem;
              }
      
              .logo-font{
                  color: #505a6b;
              }
              table{
                  width: 100%;
                  border-collapse: collapse;
                  text-align: center;
              }
      
              table, th, td {
                  border: 1px solid #dcdcdc;
              }
      
              thead{
                  font-weight: 600
              ;
              }
              .main-wrapper{
                  max-width: 500px;
                  margin: 0 auto;
                  padding: 2rem;
                  background: #f0f0f0;
              }
              .main-inner{
                  border: 1px solid #969696;
                  background-color: #fff;
                  padding: 1rem;
              }
              .clearfix{
                  overflow: auto;
              }
      
              .clearfix::after{
                  content: "";
                  clear: both;
                  display: table;
              }
      
              .row{
      
                  padding: 1rem;
              }
      
              .col-md-6{
                  width: 50%;
                  display: inline-block;
                  float: left;
              }
              .text-right{
                  text-align: right;
              }
              ul{
                  margin-top: 8px;
                  list-style-type: none;
                  padding: 0;
              }
              ul li{
                  padding: 0.18rem 0;
              }
      
              a{
                  background-color: #006837;
                  color: #fff;
                  display: block;
                  text-align: center;
                  margin-top: 3rem;
                  padding: 0.67rem;
                  border: 1px solid #00371b;
                  border-radius: 5px;
                  text-decoration: none;
              }
          </style>
      </head>
      
      <body>
      
      <div class="main-wrapper">
          <div class="row clearfix">
              <div class="col-md-6">
                  <b class="logo-font">Bills.pk</b>
                  <ul>
                      <li><b>Reference No.</b>${
                        this.state.data.subscriber_reference_no
                      } </li>
                  </ul>
              </div>
              <div class="col-md-6 text-right">
                  <b>Billed To:</b>
                  <ul>
                      <li>${this.state.data.subscriber_nickname}</li>
                      <li>Amount Due: ${this.state.data.subscriber_balance}</li>
                  </ul>
              </div>
          </div>
      
              <table>
                  <thead>
                  <td>Name</td>
                  <td>Institution</td>
                  <td>Amount Paid</td>
                  </thead>
                  <tbody>
                  <tr>
                      <td>
                          ${this.state.data.subscriber_nickname}
                      </td>
                      <td>
                          ${this.state.data.merchant_name}
                      </td>
                      <td>
                          ${this.state.data.subscriber_balance}
                      </td>
                  </tr>
                  </tbody>
              </table>
          <a href="">Thank you for working with us! </a>
      </div>
      
      </body>
      </html>`,
      fileName: "test",
      directory: RNFS.DocumentDirectoryPath.toString()
    };

    let file = await RNHTMLtoPDF.convert(options);
    // console.log(file.filePath);
    console.log(file.filePath);
    // Linking.openURL(file.filePath);
    FileViewer.open(file.filePath);
  }
}

export default SubscriberCard;
