import React from "react";
import {createStackNavigator} from "react-navigation";

import CompanyList from './CompanyList';
import CompanyDetail from './CompanyDetail';

import DrawerButton from "../../components/DrawerButton";
import LogoutButton from "../../components/LogoutButton";
import {res} from "../../helpers";

const HomeStack = createStackNavigator({
  Home: {
    screen: CompanyList,
    navigationOptions: ({ navigation }) => ({
      title: 'Quetzal Coatlus',
      tabBarLabel: 'İşletme Listesi',
      headerStyle: {
        backgroundColor: '#48aec4',
      },
      headerTitleStyle: {
        fontSize: res(20),
        flex: 1,
        textAlign: "center",
      },
      headerBackTitle: ' ',
      headerTintColor: '#fff',
      headerLeft: ({ tintColor }) => (
        <DrawerButton navigation={navigation} color={tintColor} />
      ),
      headerRight: <LogoutButton navigation={navigation} />
    })
  },
  Detail: {
    screen: CompanyDetail,
    navigationOptions: {
      title: 'Detay',
      headerStyle: {
        backgroundColor: '#48aec4',
      },
      headerTitleStyle: {
        fontSize: res(16)
      },
      headerTintColor: '#fff',
    }
  },
});

export default HomeStack;