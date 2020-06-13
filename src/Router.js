import React from 'react';

import {
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';


import AuthCheck from './screens/AuthCheck';
import UserTypeCheck from './screens/UserTypeCheck';
import Costumer from './screens/Costumer';
import Waiter from './screens/Waiter';
import Cook from './screens/Cook';

// Stacks & Screens
import Auth from './screens/Auth';

const App = createSwitchNavigator(
  {
    UserTypeCheck,
    Costumer,
    Waiter,
    Cook
  },
  {
    initialRouteName: 'UserTypeCheck',
  }
);

const SwitchNavigator = createSwitchNavigator(
  {
    AuthCheck,
    App,
    Auth,
  },
  {
    initialRouteName: 'AuthCheck',
  }
);

export default createAppContainer(SwitchNavigator);
