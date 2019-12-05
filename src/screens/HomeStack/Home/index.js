import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AnnounceSlide from './AnnounceSlide'
import ShortCuts from './ShortCuts'

export default class SignIn extends Component {


  render() {
    return (
      <View style={styles.container}>
        <AnnounceSlide/>
        <ShortCuts/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});