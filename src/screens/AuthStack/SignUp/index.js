import React, { Component } from 'react';
import { Text, Image, View, ScrollView, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import s from './styles';

import SignUpForm from './SignUpForm';
import {inject, observer} from 'mobx-react';
import axios2 from "axios";

@inject('AuthStore')
@observer
export default class SignUp extends Component {
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
              <Text style={s.loginAreaTitle}>Kayıt Ol</Text>
              <SignUpForm/>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}