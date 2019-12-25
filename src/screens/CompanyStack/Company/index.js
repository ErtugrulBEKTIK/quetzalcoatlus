import React from "react";
import { createMaterialTopTabNavigator } from "react-navigation";

import Details from './Details';
import Menu from './Menu';

const CompanyTab = createMaterialTopTabNavigator({
  Details: {
    screen: Details,
    navigationOptions: ({ navigation }) => ({
      title: 'DETAY'
    })
  },
  Menu: {
    screen: Menu,
    navigationOptions: {
      title: 'MENU'
    }
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

export default CompanyTab;