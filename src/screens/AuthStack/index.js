import React from "react";
import {createBottomTabNavigator} from "react-navigation";
import {Icon} from "native-base";
import {res} from '../../helpers';

import SignIn from './SignIn';
import SignUp from './SignUp';

const AuthStack = createBottomTabNavigator(
  {
    SignIn: {
      screen: SignIn,
      navigationOptions: {
        title: 'Giriş Yap',
        tabBarIcon: ({ tintColor }) => <Icon name="log-in" style={{ color: tintColor, marginTop: res(5) }} />
      }
    },
    SignUp: {
      screen: SignUp,
      navigationOptions: {
        title: 'Kayıt Ol',
        tabBarIcon: ({ tintColor }) => <Icon name="person-add" style={{ color: tintColor, marginTop: res(5) }} />
      }
    }
  },
  {
    initialRouteName: 'SignIn',
    tabBarOptions: {
      activeTintColor: '#fff',
      inactiveTintColor: '#586589',
      style: {
        backgroundColor: '#171f33'
      }
    }
  }
);

export default AuthStack;