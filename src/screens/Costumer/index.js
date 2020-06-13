import React from 'react';
import {Icon} from "native-base";
import BasketIcon from "~/components/BasketIcon";
import { res } from '~/helpers';

import { createBottomTabNavigator } from 'react-navigation';

// Stacks & Screens
import CompanyStack from './CompanyStack';
import CartStack from './CartStack';
import FavoriteStack from './FavoriteStack';
import ProfileStack from './ProfileStack';
import OrderStack from './OrderStack';


const Costumer = createBottomTabNavigator({
  List: {
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
  initialRouteName: 'List',
  tabBarOptions: {
    activeTintColor: '#00ACAC',
    inactiveTintColor: '#005454',
    showLabel: false
  }
});


export default Costumer;