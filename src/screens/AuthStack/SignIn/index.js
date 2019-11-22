import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ScrollView, KeyboardAvoidingView, TouchableOpacity } from 'react-native';

import SignInForm from './SignInForm';

export default class SignIn extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headBackground} />

        <KeyboardAvoidingView behavior={"position"}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require('../../../assets/images/logo2.png')}/>
          </View>
          <ScrollView>
            <View style={styles.loginArea}>
              <Text style={styles.loginAreaTitle}>TÜGVA Portal Giriş</Text>
              <SignInForm/>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingVertical: 80
  },
  headBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 250,
    width: '100%',
    backgroundColor: '#48aec4'
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 150,
    width: 150,
  },
  loginArea: {
    marginHorizontal: 40,
    marginVertical: 80,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowRadius: 3,
    shadowOffset: {
      width:0,
      height: 2
    },
    elevation: 4
  },
  loginAreaTitle: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center'
  }
});