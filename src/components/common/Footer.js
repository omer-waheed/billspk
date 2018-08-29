import React, { Component } from "react";
import {
  Footer,
  FooterTab,
  Button,
  Icon,
  Text,
  Fab,
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Body,
  Title,
  Item,
  Label,
  Input,
  Picker,
  Right,
  Left,
  Toast,
  Spinner,
  Root
} from "native-base";
import { Actions } from "react-native-router-flux";
import { Modal, AsyncStorage } from "react-native";

import UserService from "../../services/user";
class AppFooter extends Component {
  state = {
    modalVisible: false,
    refer: "",
    name: "",
    selected: "",
    Token: "",
    merchants: [],
    load: ""
  };
  componentWillMount() {
    this.artificial_function();
  }
  getMerchant() {
    UserService.merchantList(this.state.Token)
      .then(response => {
        // console.log(response);
        if (response.data.status) {
          this.setState({ merchants: response.data.response.data });
        } else {
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
  artificial_function() {
    // componentWillMount();
    console.log("-i am called from artificial");
    AsyncStorage.getItem("Token", (err, res) => {
      console.log(res);
      if (!err) {
        this.setState({ Token: res });
        this.getMerchant();
      }
    });
  }
  saveSubscriber() {
    this.setState({ load: true });
    UserService.saveSubscriber(this.state.Token, {
      subscriber_nickname: this.state.name,
      subscriber_reference_no: this.state.refer,
      merchant_id: this.state.selected
    })
      .then(response => {
        console.log(response.data);
        if (response.data.status) {
          Toast.show({
            text: "Subscriber Added Successfully",
            position: "top",
            type: "success"
          });
          this.setState({
            modalVisible: false,
            load: false,
            refer: "",
            name: "",
            selected: "",
            load: ""
          });
        } else {
          Toast.show({
            text: response.data.error.toUpperCase(),
            position: "top",
            type: "danger"
          });
          this.setState({ load: false });
        }
      })
      .catch(error => {
        // console.log(error.response.data.error);
        Toast.show({
          text: error.response.data.error.toUpperCase(),
          position: "top",
          type: "danger",
          duration: 5000
        });
        this.setState({ load: false });
      });
  }
  onNameChange(text) {
    this.setState({ name: text });
  }
  onReferenceChange(text) {
    this.setState({ refer: text });
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  onValueChange(value) {
    this.setState({
      selected: value
    });
  }
  buttonStatus() {
    if (this.state.load) {
      return (
        <Button success style={{ width: "40%" }} disabled>
          <Spinner color="#69db84" style={{ marginLeft: "40%" }} />
        </Button>
      );
    }
    return (
      <Button
        success
        style={{ width: "40%" }}
        onPress={this.saveSubscriber.bind(this)}
      >
        <Icon active name="bookmark" />
        <Text>Save</Text>
      </Button>
    );
  }
  render() {
    return (
      <React.Fragment>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <Root>
            <Container>
              <Header>
                <Body>
                  <Title>Add Subscriber</Title>
                </Body>
              </Header>
              <Content padder>
                <Card transparent>
                  <CardItem>
                    <Item floatingLabel success>
                      <Label style={{ color: "green" }}>Name</Label>
                      <Input
                        onChangeText={this.onNameChange.bind(this)}
                        value={this.state.name}
                      />
                    </Item>
                  </CardItem>
                  <CardItem>
                    <Item floatingLabel success>
                      <Label style={{ color: "green" }}>Reference ID</Label>
                      <Input
                        onChangeText={this.onReferenceChange.bind(this)}
                        value={this.state.refer}
                      />
                    </Item>
                  </CardItem>
                  <CardItem>
                    <Left>
                      <Label style={{ color: "green" }}>Merchant </Label>
                    </Left>
                    <Right>
                      <Picker
                        mode="dialog"
                        iosIcon={<Icon name="ios-arrow-down-outline" />}
                        placeholder="Select Merchant"
                        placeholderStyle={{ color: "#69db84" }}
                        placeholderIconColor="#69db84"
                        selectedValue={this.state.selected}
                        onValueChange={this.onValueChange.bind(this)}
                      >
                        {this.state.merchants.map(data => {
                          return (
                            <Picker.Item
                              label={data.merchant_name}
                              value={data.merchant_id}
                              key={data.merchant_id}
                            />
                          );
                        })}
                      </Picker>
                    </Right>
                  </CardItem>
                  <CardItem>
                    <Left>
                      <Button
                        danger
                        onPress={() => this.setModalVisible(false)}
                      >
                        <Icon name="close-circle" />
                        <Text>Cancel</Text>
                      </Button>
                    </Left>
                    {this.buttonStatus()}
                    {/* <Button
                    success
                    style={{ width: "40%" }}
                    onPress={this.saveSubscriber.bind(this)}
                  >
                    <Icon active name="bookmark" />
                    <Text>Save</Text>
                  </Button> */}
                  </CardItem>
                </Card>
              </Content>
            </Container>
          </Root>
        </Modal>

        <Footer>
          <FooterTab>
            <Button
              vertical
              onPress={() => {
                Actions.main();
              }}
              active={this.props.home}
              // disabled={this.props.home}
            >
              <Icon active name="paper" />
              <Text>Home</Text>
            </Button>
            <Button
              vertical
              onPress={() => {
                Actions.transactionList();
              }}
              active={this.props.transaction}
            >
              <Icon active name="bookmarks" />
              <Text>Bills</Text>
            </Button>

            <Button
              vertical
              onPress={() => {
                Actions.profile();
              }}
              active={this.props.profile}
              // disabled={this.props.profile}
            >
              <Icon active name="person" />
              <Text>Profile</Text>
            </Button>
          </FooterTab>
        </Footer>
        <Fab
          style={{
            backgroundColor: "#00aff0",
            position: "absolute",
            bottom: 50
          }}
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Icon active name="add" />
        </Fab>
      </React.Fragment>
    );
  }
}

export default AppFooter;
