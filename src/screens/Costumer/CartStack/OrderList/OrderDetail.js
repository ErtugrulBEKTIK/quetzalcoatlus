import React, { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import moment from 'moment';
import {res} from "~/helpers";


export default class extends Component {

  render() {
    const { orderStatus, takenTime, user } = this.props.section;
    const status = {
      taken: 'Bildirildi',
      ready: 'Hazır',
      presented: 'Servis edildi'
    };
    return (
      <View style={s.container} >
        <View style={s.slot}>
          <Text style={s.slotTitle}>DURUM</Text>
          <Text style={s.slotValue}>{status[orderStatus]}</Text>
        </View>
        <View style={s.slot}>
          <Text style={s.slotTitle}>SAAT</Text>
          <Text style={s.slotValue}>{moment(takenTime).format('HH:mm')}</Text>
        </View>
      </View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#00ACAC',
    paddingVertical: res(10)
  },
  slot: {
    flex: 1,
    alignItems: 'center'
  },
  slotTitle: {
    fontWeight: 'bold',
    color: 'white'
  },
  slotValue: {
    color: 'white'
  }

});
