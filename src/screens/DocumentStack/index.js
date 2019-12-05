import React from "react";
import {createStackNavigator} from "react-navigation";

import DocumentList from './DocumentList';
import DocumentDetail from './DocumentDetail';
import DrawerButton from "../../components/DrawerButton";
import {res} from "../../helpers";

const ContactStack = createStackNavigator({
  List: {
    screen: DocumentList,
    navigationOptions: ({ navigation }) => ({
      title: 'Belgeler',
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
  },
  Detail: {
    screen: DocumentDetail,
    navigationOptions: {
      title: 'Detay',
      headerStyle: {
        backgroundColor: '#48aec4',
      },
      headerTintColor: '#fff',
    }
  }
});

export default ContactStack;