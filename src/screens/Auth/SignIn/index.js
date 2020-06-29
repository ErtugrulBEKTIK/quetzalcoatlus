import React, { Component } from 'react';
import {Text, Image, View, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform} from 'react-native';
import s from './styles';

import SignInForm from './SignInForm';
import {inject, observer} from 'mobx-react';

@inject('AuthStore')
@observer
export default class SignIn extends Component {
  async componentDidMount() {
    await this.props.AuthStore.setupAuth();
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={s.container}>

        <View style={s.headBackground} />

        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={{flex: 1}}>

            <View style={s.inner}>
              <View style={s.logoContainer}>
                <Image style={s.logo} source={require('~/assets/images/logo1.png')}/>
              </View>
              <View style={s.loginArea}>

                <SignInForm/>
              </View>
            </View>

        </KeyboardAvoidingView>

      </View>
      </TouchableWithoutFeedback>
    );
  }
}
