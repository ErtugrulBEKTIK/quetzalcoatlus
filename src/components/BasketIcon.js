import React, { Component } from 'react';
import { Icon } from 'native-base';
import { res } from '~/helpers';
import {WithBadge} from "~/components/my-base";
import {inject, observer} from "mobx-react";

@inject('CartStore')
@observer
export default class BasketIcon extends Component {

  render() {
    const { CartStore: { cartList }, tintColor } = this.props;

    let totalCount = 0;
    cartList.map((item) => {
      totalCount += item.count
    });

    return (
      <WithBadge value={totalCount}>
        <Icon name="basket" style={{ color: tintColor, marginTop: res(5) }} />
      </WithBadge>
    );
  }
}