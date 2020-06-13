import React from "react";
import {createStackNavigator} from "react-navigation";
import {res} from '~/helpers';

import Menu from './Menu';
import QRScreen from './QRScreen';

const ProfileStack = createStackNavigator({
  QR: {
    screen: QRScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Profilim',
      header: null,
      headerBackTitle: 'Geri'
    })
  },
  Menu: {
    screen: Menu,
    navigationOptions: ({ navigation }) => ({
      title: 'Menü',
      headerStyle: {
        backgroundColor: '#00ACAC',
      },
      headerTitleStyle: {
        fontSize: res(20),
        flex: 1,
        textAlign: "center",
      },
      headerBackTitle: ' ',
      headerTintColor: '#fff'
    })
  },

});

export default ProfileStack;