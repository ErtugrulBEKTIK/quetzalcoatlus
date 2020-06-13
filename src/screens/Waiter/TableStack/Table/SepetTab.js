import React, { Component } from 'react';
import { res } from '~/helpers';
import {WithBadge, Text} from "~/components/my-base";
import {inject, observer} from "mobx-react";
import {StyleSheet} from "react-native";

@inject('WaiterCartStore')
@observer
export default class extends Component {

  render() {
    const { WaiterCartStore: { cartList, tableId }, tintColor } = this.props;

    let totalCount = 0;
    cartList[tableId].map((item) => {
      totalCount += item.count
    });


    return (
      <WithBadge value={totalCount}>
        <Text style={s.text}> SEPET</Text>
      </WithBadge>
    );
  }
}

const s = StyleSheet.create({
  text: {
    color: '#00ACAC',
    fontSize: res(12),
    fontWeight: '500',
    marginRight: res(10)
  }

});