import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import {inject} from 'mobx-react';

@inject('AuthStore')
export default class AuthCheck extends Component {
  async componentDidMount() {
    await this.props.AuthStore.setupAuth();
  }

  render() {
    return (
      <View style={{ flex:1 }}/>
    );
  }
}