import React from "react";
import { createMaterialTopTabNavigator } from "react-navigation";

import OrderList from './OrderList';
import TableMenu from './TableMenu';
import CartList from './CartList';
import SepetTab from './SepetTab';

const TableTab = createMaterialTopTabNavigator({
  TableMenu: {
    screen: TableMenu,
    navigationOptions: {
      title: 'MENU'
    }
  },
  Cart: {
    screen: CartList,
    navigationOptions: ({ navigation }) => ({
      title: 'SEPET',
      tabBarLabel: ({ tintColor }) => <SepetTab tintColor={tintColor}/>

    })
  },
  Orders: {
    screen: OrderList,
    navigationOptions: ({ navigation }) => ({
      title: 'SİPARİŞLER'
    })
  },

}, {
  tabBarOptions: {
    style: {
      backgroundColor: 'white'
    },
    indicatorStyle: {
      backgroundColor: '#00ACAC'
    },
    labelStyle: {
      color: '#00ACAC',
      fontWeight: '600'
    }
  }
});

export default TableTab;