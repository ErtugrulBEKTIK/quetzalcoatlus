import React from "react";
import {createMaterialTopTabNavigator, SafeAreaView, MaterialTopTabBar} from "react-navigation";

import ItemList from './ItemList';
import OrderList from './OrderList';

const SafeAreaMaterialTopTabBar = ({ ...props }) => (
  <SafeAreaView>
    <MaterialTopTabBar {...props} />
  </SafeAreaView>
);

const CartStack = createMaterialTopTabNavigator({
  Sepet: {
    screen: ItemList,
    navigationOptions: ({ navigation }) => ({
      title: 'Sepet',
    })
  },
  Siparisler: {
    screen: OrderList,
    navigationOptions: ({ navigation }) => ({
      title: 'SİPARİŞLERİM',
    })
  }
},
{
  tabBarComponent: props => (<SafeAreaMaterialTopTabBar {...props} />),
  tabBarOptions: {
    style: {
      backgroundColor: 'white'
    },
    indicatorStyle: {
      backgroundColor: '#003d58'
    },
    labelStyle: {
      color: '#003d58',
      fontWeight: '600'
    }
  }
});

export default CartStack;