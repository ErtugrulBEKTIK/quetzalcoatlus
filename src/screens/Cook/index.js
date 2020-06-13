import React from 'react';
import {Icon} from "native-base";
import { res } from '~/helpers';

import { createBottomTabNavigator } from 'react-navigation';

// Stacks & Screens
import OrderStack from './OrderStack';


const Waiter = createBottomTabNavigator({
  Order: {
    screen: OrderStack,
    navigationOptions: {
      tabBarVisible: false,
      //tabBarIcon: ({ tintColor }) => <Icon name="list" style={{ color: tintColor, marginTop: res(5) }} />
    }
  }
}, {
  tabBarOptions: {
    activeTintColor: '#00ACAC',
    inactiveTintColor: '#005454',
    showLabel: false
  }
});


export default Waiter;
