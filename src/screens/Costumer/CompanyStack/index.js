import React from "react";
import {createStackNavigator} from "react-navigation";

import CompanyList from './CompanyList';
import Company from './Company';
import CompanyHeader from './Company/Header';
import LogoutButton from "~/components/LogoutButton";

import {res} from "~/helpers";

const CompanyStack = createStackNavigator({
  CompanyList: {
    screen: CompanyList,
    navigationOptions: ({ navigation }) => ({
      title: 'Quetzal Coatlus',
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
      headerRight: <LogoutButton navigation={navigation} />
    })
  },
  Company: {
    screen: Company,
    navigationOptions: (props) => ({
      header: CompanyHeader(props)
    })
  },
});



export default CompanyStack;