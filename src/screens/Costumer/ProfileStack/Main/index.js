import React, { Component } from 'react';
import {StyleSheet, Text, SafeAreaView, TouchableOpacity, FlatList,
  View, ActivityIndicator, TextInput, Image, Modal, TouchableHighlight, Dimensions} from 'react-native';


import { inject, observer } from 'mobx-react';

@inject('CartStore')
@observer
export default class Main extends Component {

  render() {

    return (
      <View style={s.container}>

      </View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  }
});