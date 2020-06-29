import React from "react";
import {createBottomTabNavigator} from "react-navigation";
import {Platform} from "react-native";
import {Icon} from "native-base";
import {res} from '~/helpers';

import SignIn from './SignIn';
import SignUp from './SignUp';
import OrderStack from "~/screens/Costumer/OrderStack";

const Auth = createBottomTabNavigator(
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
    },
    Order: {
      screen: OrderStack,
      navigationOptions: {
        title: 'Menü',
        tabBarIcon: ({ tintColor }) => <Icon type='FontAwesome' name="qrcode" style={{ color: tintColor, marginTop: res(5) }} />,
      }
    },
  },
  {
    initialRouteName: 'SignIn',
    tabBarOptions: {
      keyboardHidesTabBar: Platform.OS !== 'ios',
      activeTintColor: '#ffffff',
      inactiveTintColor: '#c5ded4',
      style: {
        backgroundColor: '#003d58'
      }
    }
  }
);

export default Auth;
