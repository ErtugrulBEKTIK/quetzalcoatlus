import React, { Component } from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {res} from "~/helpers";
import {Text} from "~/components/my-base/index";

export default class Box extends Component {
  render() {
    return (
      <View style={[s.settingsItemC, {borderTopWidth: this.props.first ? res(1) : 0 }]}>
        <TouchableOpacity {...this.props} style={s.settingsItem}>
          {this.props.children}
          <Text style={s.text}>{this.props.text}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const s = StyleSheet.create({
  settingsItemC: {
    borderBottomWidth: res(1),
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: res(10),
    paddingHorizontal: res(25)
  },
  icon: {
    color: 'white',
    fontSize: res(20),
    marginRight: res(10)
  },
  text: {
    marginLeft: res(10),
    color: 'white',
  }
});