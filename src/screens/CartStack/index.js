import React from "react";
import {createStackNavigator} from "react-navigation";
import {res} from '../../helpers';

import ItemList from './ItemList';

const CartStack = createStackNavigator({
  ItemList: {
    screen: ItemList,
    navigationOptions: ({ navigation }) => ({
      title: 'Sepet',
      headerStyle: {
        backgroundColor: '#00ACAC',
      },
      headerTitleStyle: {
        fontSize: res(20),
        flex: 1,
        textAlign: "center",
      },
      headerBackTitle: ' ',
      headerTintColor: '#fff'
    })
  }
});

export default CartStack;