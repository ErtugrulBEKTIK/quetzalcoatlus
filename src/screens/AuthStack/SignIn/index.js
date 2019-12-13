import React, { Component } from 'react';
import { Text, Image, View, ScrollView, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import s from './styles';

import SignInForm from './SignInForm';
import {inject, observer} from 'mobx-react';
import axios2 from "axios";

@inject('AuthStore')
@observer
export default class SignIn extends Component {
  async componentDidMount() {
    await this.props.AuthStore.setupAuth();
  }

  render() {
    return (
      <View style={s.container}>
        <View style={s.headBackground} />
        <KeyboardAvoidingView behavior={"position"}>

          <ScrollView contentContainerStyle={s.scrollView}>
            <View style={s.loginArea}>
              <Text style={s.loginAreaTitle}>Giriş Yap</Text>
              <SignInForm/>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}