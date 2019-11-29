import React from "react";
import {createStackNavigator} from "react-navigation";

import DocumentList from './DocumentList';
import DocumentDetail from './DocumentDetail';
import DrawerButton from "../../components/DrawerButton";

const ContactStack = createStackNavigator({
  List: {
    screen: DocumentList,
    navigationOptions: ({ navigation }) => ({
      title: 'Belgeler',
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
    screen: DocumentDetail,
    navigationOptions: {
      title: 'Detay',
      headerStyle: {
        backgroundColor: '#4895ec',
      },
      headerTintColor: '#fff',
    }
  }
});

export default ContactStack;