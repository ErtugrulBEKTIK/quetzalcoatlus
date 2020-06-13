import React, { Component } from 'react';
import {Text, Image, View, ScrollView, KeyboardAvoidingView, TouchableOpacity, Platform} from 'react-native';
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
      <View style={s.container}>
        <View style={s.headBackground} />
        <KeyboardAvoidingView behavior={"padding"} enabled={Platform.OS === 'ios'}>
          <View style={s.logoContainer}>
            <Image style={s.logo} source={require('~/assets/images/logo.png')}/>
          </View>
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
