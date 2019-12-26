import React from "react";
import {createStackNavigator} from "react-navigation";
import {res} from '../../helpers';

import ItemList from './ItemList';

const FavoriteStack = createStackNavigator({
  ItemList: {
    screen: ItemList,
    navigationOptions: ({ navigation }) => ({
      title: 'Favorilerim',
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

export default FavoriteStack;