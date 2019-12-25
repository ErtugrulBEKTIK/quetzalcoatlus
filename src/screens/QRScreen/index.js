import React, { Component } from 'react';
import {StyleSheet, Text, SafeAreaView, TouchableOpacity, FlatList,
  View, ActivityIndicator, TextInput, Image, Modal, TouchableHighlight, Dimensions} from 'react-native';
import NavigationService from "../../NavigationService";
import { Icon } from "native-base";
import QRCodeScanner from 'react-native-qrcode-scanner';
import axios from "../../Api";
import {res, T} from "../../helpers";

import {inject, observer} from 'mobx-react';

@inject('AuthStore')
export default class CompanyList extends Component {
  state = {
  };

  renderMaker = () => (
    <View>
      <Icon style={s.qrScannerIcon} name='qr-scanner'/>
    </View>
  );



  render() {
    return (
      <View style={s.container}>
        <TouchableOpacity
          style={s.closeButton}
          onPress={() => {
            NavigationService.navigate('Home')
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
  qrScannerIcon: {
    fontSize: res(230),
    color: 'white'
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