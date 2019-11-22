import React from "react";
import {createStackNavigator} from "react-navigation";

import Home from './Home';
import DrawerButton from "../../components/DrawerButton";

const HomeStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      title: 'Anasayfa',
      headerLeft: <DrawerButton navigation={navigation} />,
    })
  }
});

export default HomeStack;