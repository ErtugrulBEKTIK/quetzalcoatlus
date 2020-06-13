import React, { Component } from 'react';
import {StyleSheet, Text, Platform, View} from 'react-native';
import MapView from 'react-native-maps';
import { Icon } from "native-base";
import {res} from "~/helpers";
import {ScrollView} from "react-navigation";

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
    const {phoneNumber, mail, address } = this.item;
    return (
      <ScrollView style={s.container}>
        <View style={s.card}>
          <View style={s.slot}>
            <Icon style={s.slotIcon} name='call'/>
            <Text style={s.slotText}>{phoneNumber}</Text>
          </View>
          <View style={s.slot}>
            <Icon style={s.slotIcon} name='mail'/>
            <Text style={s.slotText}>{mail}</Text>
          </View>

          {
            address &&
              <>
                <View style={s.slot}><
                  Icon style={s.slotIcon} name='pin'/>
                  <Text style={s.slotText}>{address.address} </Text>
                </View>
                <View style={s.slot}>
                  <Text style={s.slotText}>{address.quarter.name}/{address.country} </Text>
                </View>
              </>
          }

        </View>
        <View style={[s.card, s.mapCard]}>
          <MapView
            style={s.map}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        </View>
      </ScrollView>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  card: {
    margin: res(10),
    padding: res(20),
    borderWidth: res(1),
    borderColor: '#ddd',
    borderRadius: res(10),
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  slot: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  slotIcon: {
    fontSize: res(24),
    color: '#00ACAC',
    width: res(25)
  },
  slotText: {
    fontSize: res(14),
  },
  mapCard: {
    padding: 0,
    height: res(250),
    overflow: Platform.OS !== 'ios' ? 'hidden' : 'visible'
  },
  map: {
    flex: 1,
    borderRadius: res(10),
  }

});