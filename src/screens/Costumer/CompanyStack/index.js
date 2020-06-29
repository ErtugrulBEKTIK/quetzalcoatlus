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
      title: 'Esinti',
      headerStyle: {
        backgroundColor: '#003d58',
      },
      headerTitleStyle: {
        fontSize: res(20),
        flex: 1,
        textAlign: "center",
        alignItems: 'center',
        marginLeft: res(70)
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
