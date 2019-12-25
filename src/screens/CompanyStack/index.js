import React from "react";
import {createStackNavigator} from "react-navigation";
import {View, Text} from "react-native";

import CompanyList from './CompanyList';
import Company from './Company';
import CompanyHeader from './Company/Header';

import {res} from "../../helpers";

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
      headerTintColor: '#fff'
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