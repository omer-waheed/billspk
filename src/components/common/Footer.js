import React, { Component } from "react";
import { Footer, FooterTab, Button, Icon, Text } from "native-base";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";

import { shiftingToMain } from "../../actions";

class AppFooter extends Component {
  state = {};
  render() {
    return (
      <Footer>
        <FooterTab>
          <Button
            vertical
            onPress={() => {
              Actions.main();
              //add these lines must
              this.props.shiftingToMain();
            }}
            active={this.props.home}
            // disabled={this.props.home}
          >
            <Icon active name="home" />
            <Text>Home</Text>
          </Button>
          <Button vertical>
            <Icon active name="camera" />
            <Text>Camera</Text>
          </Button>
          <Button vertical>
            <Icon active name="navigate" />
            <Text>Navigate</Text>
          </Button>
          <Button
            vertical
            onPress={() => {
              Actions.profile();
            }}
            active={this.props.profile}
            // disabled={this.props.profile}
          >
            <Icon active name="information-circle" />
            <Text>Profile</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

export default connect(
  null,
  { shiftingToMain }
)(AppFooter);
