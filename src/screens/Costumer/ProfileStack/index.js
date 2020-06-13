import React from "react";
import {createStackNavigator} from "react-navigation";
import {res} from '~/helpers';

import Main from './Main';

const ProfileStack = createStackNavigator({
  Profile: {
    screen: Main,
    navigationOptions: ({ navigation }) => ({
      title: 'Profilim',
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
  }
});

export default ProfileStack;