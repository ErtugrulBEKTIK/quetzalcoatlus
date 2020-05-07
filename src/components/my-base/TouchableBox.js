import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {res} from "~/helpers";

export default class TouchableBox extends Component {
  render() {
    return (
      <TouchableOpacity {...this.props} style={[s.box, this.props.style]} >
        { this.props.children }
      </TouchableOpacity>
    );
  }
}

const s = StyleSheet.create({
  box: {
    backgroundColor: 'white',
    padding: res(15),
    borderRadius: res(20),
    borderBottomColor: '#DC6929',
    borderBottomWidth: res(8),
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: res(7),
    shadowOffset: {
      width:0,
      height: res(10)
    },
    elevation: 4
  }
});