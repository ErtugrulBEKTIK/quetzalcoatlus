import React, { Component } from 'react';
import {StyleSheet, TouchableOpacity, View, Modal, Dimensions, Text, Image} from 'react-native';
import NavigationService from "~/NavigationService";
import { Icon } from "native-base";
import QRCodeScanner from 'react-native-qrcode-scanner';
import {res, T} from "~/helpers";
import {inject, observer} from "mobx-react";


@inject('CartStore')
@observer
export default class QRScreen extends Component {
  state = {
    modal: true
  };

  componentDidMount() {
    this.props.navigation.addListener(
      'willFocus',
      payload => {
        this.setState({
          modal: true
        });
      }
    );
  }

  onRead = (e) => {
    this.setState({ modal: false });
    const tableId = e.data;
    this.props.CartStore.setTableId(tableId);

    NavigationService.navigate('Menu');
  };

  renderMaker = () => (
    <View style={s.marker}>
      <Image
        style={{width: res(200), height: res(200)}}
        source={require('~/assets/images/qr.png')}/>
    </View>
  );

  render() {
    return (
        <Modal visible={this.state.modal}>
          <View style={s.container}>
            <TouchableOpacity
              style={s.closeButton}
              onPress={() => {
                NavigationService.navigate('List');
                this.setState({modal: false});
              }}>
              <Icon style={s.closeIcon} name='close'/>
            </TouchableOpacity>
            <QRCodeScanner
              onRead={this.onRead}
              reactivate={true}
              showMarker={true}
              customMarker={this.renderMaker()}
              reactivateTimeout={5000}
              cameraStyle={s.camera}
              markerStyle={{borderColor: 'white'}}
            />
          </View>
        </Modal>

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
