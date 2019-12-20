import React, { Component } from 'react';
import {StyleSheet, Text, SafeAreaView, TouchableOpacity, FlatList,
  View, ActivityIndicator, TextInput, Image, Modal, TouchableHighlight, Dimensions} from 'react-native';
import NavigationService from "../../../NavigationService";
import { Icon } from "native-base";
import ProgressBar from 'react-native-progress/Bar';
import axios from "../../../Api";
import {res, T} from "../../../helpers";

export default class CompanyDetail extends Component {

  constructor(props) {
    super(props);
    this.item = props.navigation.getParam('item');
  }


  state = {
    text: '',
    page: 1,
    companies: [],
    branches: [],
    qrModal: false,
    loading: true,
  };


  render() {
    return (
      <SafeAreaView style={s.container}>
        <View style={s.infoContainer}>
          <View style={s.imageContainer}>
            <Image
              style={s.image}
              source={{uri: 'https://media-cdn.tripadvisor.com/media/photo-s/03/0e/2a/06/capari-restoran.jpg'}}/>
            <ProgressBar
              progress={0.8}
              borderRadius={0}
              height={10}
              color="#6be672"
              unfilledColor="#ffffff"
              borderColor="#d3dbff"
              width={res(60)}/>
          </View>
          <View style={s.textContainer}>
            <Text style={s.name}>{this.item.name}</Text>
            <Text style={s.name}>{this.item.province} / {this.item.country}</Text>
            <Text style={s.name}>{this.item.phoneNumber}</Text>
          </View>
        </View>
        <View style={s.addressContainer}>
          <Text style={s.address}>Adress</Text>
          <View style={s.map}>

          </View>
        </View>

        <View style={s.footer}>
          <TouchableOpacity
            onPress={() => { this.setState({qrModal: true}) }}
            style={s.plusIconContainer}>
            <Icon style={s.plusIcon} type="FontAwesome" name="plus"/>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoContainer: {
    height: res(100),
    flexDirection: 'row',
    paddingVertical: res(10),
    margin: res(10),
    backgroundColor: '#d3dbff'
  },
  imageContainer: {
    justifyContent: 'space-around',
    marginHorizontal: res(10)
  },
  image: {
    width: res(60),
    height: res(60),
    marginBottom: res(5),
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-around',
    paddingRight: res(10)
  },
  name: {
    fontSize: res(14),
    backgroundColor: 'white',
    padding: res(3),
  },
  addressContainer: {
    flex: 1,
    backgroundColor: '#d3dbff',
    margin: res(10),
    padding: res(10),
  },
  address: {
    fontSize: res(14),
    height: res(75),
    marginBottom: res(10),
    backgroundColor: 'white',
  },
  map: {
    flex: 1,
    backgroundColor: 'white',
  },
  footer: {
    height: res(50),
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderTopWidth: res(2),
    borderColor: '#556B89',
    paddingHorizontal: res(10)
  },
  plusIconContainer: {
    width: res(40),
    height: res(40),
    borderWidth: res(2),
    borderRadius: res(20),
    borderColor: '#556B89',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIcon: {
    color: '#556B89',
    fontSize: res(24)
  },


});