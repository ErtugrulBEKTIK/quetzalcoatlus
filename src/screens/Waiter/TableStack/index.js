import React from "react";
import {createStackNavigator} from "react-navigation";

import TableList from './TableList';
import Table from './Table';
import LogoutButton from "~/components/LogoutButton";

import {res} from "~/helpers";

const TableStack = createStackNavigator({
  TableList: {
    screen: TableList,
    navigationOptions: ({ navigation }) => ({
      title: 'Masa Listesi',
      headerStyle: {
        backgroundColor: '#00ACAC',
      },
      headerTitleStyle: {
        fontSize: res(20),
        flex: 1,
        textAlign: "center",
      },
      tabBarVisible: false,
      headerBackTitle: ' ',
      headerTintColor: '#fff',
      headerRight: <LogoutButton navigation={navigation} />
    })
  },
  Table: {
    screen: Table,
    navigationOptions: ({ navigation }) => ({
      title: `Masa ${navigation.state.params.table.tableNo}`,
      headerStyle: {
        backgroundColor: '#00ACAC',
      },
      headerTitleStyle: {
        fontSize: res(20),
        flex: 1,
        textAlign: "center",
      },
      headerBackTitle: ' ',
      headerTintColor: '#fff',
    })
  }
});



export default TableStack;
