import React from 'react';
import {Icon} from "native-base";
import { res } from './helpers';

import {
  createAppContainer, createBottomTabNavigator,
  createDrawerNavigator,
  createSwitchNavigator
} from 'react-navigation';


import Redirector from './screens/AuthStack/Redirector';

// Stacks & Screens
import AuthStack from './screens/AuthStack';
import CompanyStack from './screens/CompanyStack';
import QRScreen from './screens/QRScreen';


const App = createBottomTabNavigator({
  Home: {
    screen: CompanyStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name="search" style={{ color: tintColor, marginTop: res(5) }} />
    }
  },
  QR: {
    screen: QRScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon type='FontAwesome' name="qrcode" style={{ color: tintColor, marginTop: res(5) }} />,
      tabBarVisible: false
    }
  },
  Card: {
    screen: CompanyStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name="basket" style={{ color: tintColor, marginTop: res(5) }} />
    }
  },
  Favorites: {
    screen: CompanyStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name="heart" style={{ color: tintColor, marginTop: res(5) }} />
    }
  },
  Profile: {
    screen: CompanyStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon type='MaterialIcons' name="person" style={{ color: tintColor, marginTop: res(5) }} />
    }
  }
}, {
  initialRouteName: 'Home',
  tabBarOptions: {
    activeTintColor: '#00ACAC',
    inactiveTintColor: '#005454',
    showLabel: false
  }
});

const SwitchNavigator = createSwitchNavigator(
  {
    Redirector,
    App,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'App',
  }
);

export default createAppContainer(SwitchNavigator);