import React, { Component } from 'react';
import {StyleSheet, Text, SafeAreaView, TouchableOpacity, FlatList,
  View, ActivityIndicator, TextInput, Image, Modal, TouchableHighlight, Dimensions} from 'react-native';
import NavigationService from "../../../NavigationService";
import { Icon } from "native-base";

import axios from "../../../Api";
import {res, T} from "../../../helpers";

import CartItem from './CartItem';
import { inject, observer } from 'mobx-react';

@inject('CartStore')
@observer
export default class ItemList extends Component {

  state = {
    loading: true,
  };

  render() {
    const { cartList } = this.props.CartStore;

    let total = 0;

    cartList.map((item) => {
      total += item.count * item.fee
    });


    return (
      <View style={s.container}>
        <FlatList
          style={s.flatList}
          data={cartList}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <CartItem item={item} />}
        />
        <View style={s.footer}>
          <View style={s.total}>
            <Text style={s.totalText}>Toplam</Text>
            <Text style={s.totalAmount}>₺{total}</Text>
          </View>
          <TouchableOpacity style={s.orderButton}>
            <Text style={s.orderText}>Siparişi Tamamla</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  flatList: {
    flex: 1
  },
  footer: {
    height: res(125),
    backgroundColor: 'white',
    borderTopWidth: res(1),
    borderColor: '#ddd',
  },
  total: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: res(20)
  },
  totalText: {
    fontSize: res(20),
    fontWeight: '600',
    color: '#000'
  },
  totalAmount: {
    fontSize: res(25),
    color: '#00ACAC',
    fontWeight: '600'
  },
  orderButton: {
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00ACAC',
    paddingVertical: res(15)
  },
  orderText: {
    color: 'white',
    fontSize: res(20),
    fontWeight: '600'
  }

});