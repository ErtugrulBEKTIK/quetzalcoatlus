import React from "react";
import {createStackNavigator} from "react-navigation";

import Home from './Home';
import DrawerButton from "../../components/DrawerButton";
import {res} from "../../helpers";

const HomeStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      title: 'Anasayfa',
      headerStyle: {
        backgroundColor: '#48aec4',
      },
      headerTitleStyle: {
        fontSize: res(16)
      },
      headerTintColor: '#fff',
      headerLeft: ({ tintColor }) => (
        <DrawerButton navigation={navigation} color={tintColor} />
      )
    })
  }
});

export default HomeStack;