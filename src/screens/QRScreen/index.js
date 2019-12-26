import React, { Component } from 'react';
import {StyleSheet, Text, SafeAreaView, TouchableOpacity, FlatList,
  View, ActivityIndicator, TextInput, Image, Modal, TouchableHighlight, Dimensions} from 'react-native';
import NavigationService from "../../NavigationService";
import { Icon } from "native-base";
import QRCodeScanner from 'react-native-qrcode-scanner';
import Svg from 'react-native-svg-uri';
import {res, T} from "../../helpers";

export default class CompanyList extends Component {
  state = {
  };

  renderMaker = () => (
    <View style={s.marker}>
      <Svg
        width={res(200)} height={res(200)}
        source={require('../../assets/images/qr.svg')}/>
    </View>
  );

  render() {
    return (
      <View style={s.container}>
        <TouchableOpacity
          style={s.closeButton}
          onPress={() => {
            NavigationService.navigate('Companies')
          }}>
          <Icon style={s.closeIcon} name='close'/>
        </TouchableOpacity>
        <QRCodeScanner
          onRead={(e) => { alert(e.data) }}
          reactivate={true}
          showMarker={true}
          customMarker={this.renderMaker()}
          reactivateTimeout={5000}
          cameraStyle={s.camera}
          markerStyle={{borderColor: 'white'}}
        />
      </View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    height: Dimensions.get('window').height
  },
  marker: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeButton: {
    position: 'absolute',
    top: res(40),
    left: res(20),
    zIndex: 20
  },
  closeIcon: {
    color: 'white',
    fontSize: res(55)
  }
});