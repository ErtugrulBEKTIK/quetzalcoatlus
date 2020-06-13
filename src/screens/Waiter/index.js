import React from 'react';
import {Icon} from "native-base";
import { res } from '~/helpers';

import { createBottomTabNavigator } from 'react-navigation';

// Stacks & Screens
import TableStack from './TableStack';
import OrderStack from './OrderStack';


const Waiter = createBottomTabNavigator({
  Table: {
    screen: TableStack,
    navigationOptions: {
      //tabBarVisible: false,
      tabBarIcon: ({ tintColor }) => <Icon name="grid" style={{ color: tintColor, marginTop: res(5) }} />
    }
  },
  Order: {
    screen: OrderStack,
    navigationOptions: {
      //tabBarVisible: false,
      tabBarIcon: ({ tintColor }) => <Icon name="list" style={{ color: tintColor, marginTop: res(5) }} />
    }
  }
}, {
  initialRouteName: 'Table',
  tabBarOptions: {
    activeTintColor: '#00ACAC',
    inactiveTintColor: '#005454',
    showLabel: false
  }
});


export default Waiter;
