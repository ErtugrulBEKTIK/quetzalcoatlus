import React from 'react';
import {Icon} from "native-base";
import BasketIcon from "~/components/BasketIcon";
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
import CartStack from './screens/CartStack';
import FavoriteStack from './screens/FavoriteStack';
import ProfileStack from './screens/ProfileStack';
import OrderStack from './screens/OrderStack';


const App = createBottomTabNavigator({
  Companies: {
    screen: CompanyStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name="search" style={{ color: tintColor, marginTop: res(5) }} />
    }
  },
  Order: {
    screen: OrderStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon type='FontAwesome' name="qrcode" style={{ color: tintColor, marginTop: res(5) }} />,
    }
  },
  Cart: {
    screen: CartStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <BasketIcon tintColor={tintColor}/>
    }
  },
  Favorites: {
    screen: FavoriteStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name="heart" style={{ color: tintColor, marginTop: res(5) }} />
    }
  },
  Profile: {
    screen: ProfileStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon type='MaterialIcons' name="person" style={{ color: tintColor, marginTop: res(5) }} />
    }
  }
}, {
  initialRouteName: 'Companies',
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
    initialRouteName: 'Redirector',
  }
);

export default createAppContainer(SwitchNavigator);