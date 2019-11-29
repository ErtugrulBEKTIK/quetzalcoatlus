import React from "react";
import {createStackNavigator} from "react-navigation";

import ContactList from './ContactList';
import ContactDetail from './ContactDetail';
import DrawerButton from "../../components/DrawerButton";

const ContactStack = createStackNavigator({
  List: {
    screen: ContactList,
    navigationOptions: ({ navigation }) => ({
      title: 'Rehber',
      headerStyle: {
        backgroundColor: '#4895ec',
      },
      headerTintColor: '#fff',
      headerLeft: ({ tintColor }) => (
        <DrawerButton navigation={navigation} color={tintColor} />
      )
    })
  },
  Detail: {
    screen: ContactDetail,
    navigationOptions: {
      title: '',
      headerStyle: {
        backgroundColor: 'rgba(238,238,238,0)',
        borderBottomWidth: 0,
        shadowColor: 'transparent',
        elevation: 0
      },
      headerTintColor: '#fff',
    }
  }
});

export default ContactStack;