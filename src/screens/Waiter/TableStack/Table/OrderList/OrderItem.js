import React, { Component } from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {res} from "~/helpers";

export default class extends Component {

  render() {
    const {id, title, fee, count,} = this.props.item;
    return (
      <View style={s.itemContainer}>

        <View style={s.textContainer}>
          <TouchableOpacity>
            <Text style={s.title}>{title}</Text>
          </TouchableOpacity>

          <View style={s.body}>
            <View style={s.quantity}>
              <Text>Adet: {count}</Text>
            </View>

            <Text style={s.fee}>₺{fee*count}</Text>
          </View>

        </View>
      </View>
    );
  }
}

const s = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: res(1),
    borderColor: '#ddd',
    borderRadius: res(5),
    padding: res(15)
  },
  imageContainer: {
    justifyContent: 'space-around',
    paddingRight: res(15),
  },
  image: {
    width: res(70),
    height: res(70),
    borderRadius: res(10),
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  title: {
    fontSize: res(16),
    fontWeight: '500',
    marginBottom: res(10),
    color: '#000'
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quantity: {
    flex: 1,
    flexDirection: 'row',
  },
  fee: {
    fontSize: res(16),
    width: res(60),
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#00ACAC'
  }
});
