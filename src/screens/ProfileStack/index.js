import React from "react";
import {createStackNavigator} from "react-navigation";

import Profile from './Profile';
import DrawerButton from "../../components/DrawerButton";

const ProfileStack = createStackNavigator({
  List: {
    screen: Profile,
    navigationOptions: ({ navigation }) => ({
      title: 'Profil',
      headerStyle: {
        backgroundColor: 'rgba(238,238,238,0)',
        borderBottomWidth: 0,
        shadowColor: 'transparent',
        elevation: 0
      },
      headerTintColor: '#fff',
      headerLeft: ({ tintColor }) => (
        <DrawerButton navigation={navigation} color={tintColor} />
      )
    })
  }
});

export default ProfileStack;