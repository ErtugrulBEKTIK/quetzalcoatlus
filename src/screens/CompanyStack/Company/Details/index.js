import React, { Component } from 'react';
import {StyleSheet, Text, SafeAreaView, TouchableOpacity, FlatList,
  View, ActivityIndicator, TextInput, Image, Modal, TouchableHighlight, Dimensions} from 'react-native';
import NavigationService from "../../../../NavigationService";
import { Icon } from "native-base";
import ProgressBar from 'react-native-progress/Bar';
import axios from "../../../../Api";
import {res, T} from "../../../../helpers";

export default class CompanyDetail extends Component {

  constructor(props) {
    super(props);
    this.item = props.navigation.getParam('item');
  }


  state = {
    companies: [],
    branches: [],
    loading: true,
  };


  render() {
    return (
      <View style={s.container}>
        <Text>Company Detail</Text>
      </View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
  }

});