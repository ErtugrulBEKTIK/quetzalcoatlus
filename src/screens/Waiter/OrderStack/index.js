import React from "react";
import {createStackNavigator} from "react-navigation";

import OrderList from './OrderList';
import LogoutButton from "~/components/LogoutButton";

import {res} from "~/helpers";

const OrderStack = createStackNavigator({
  OrderList: {
    screen: OrderList,
    navigationOptions: ({ navigation }) => ({
      title: 'Sipariş Listesi',
      headerStyle: {
        backgroundColor: '#00ACAC',
      },
      headerTitleStyle: {
        fontSize: res(20),
        flex: 1,
        textAlign: "center",
      },
      headerBackTitle: ' ',
      headerTintColor: '#fff',
      headerRight: <LogoutButton navigation={navigation} />
    })
  },
});



export default OrderStack;
