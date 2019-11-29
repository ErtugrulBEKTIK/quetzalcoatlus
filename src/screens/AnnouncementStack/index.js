import React from "react";
import {createStackNavigator} from "react-navigation";

import AnnouncementList from './AnnouncementList';
import AnnouncementDetail from './AnnouncementDetail';
import DrawerButton from "../../components/DrawerButton";

const AnnouncementStack = createStackNavigator({
  List: {
    screen: AnnouncementList,
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
    screen: AnnouncementDetail,
    navigationOptions: {
      title: 'Detay',
      headerStyle: {
        backgroundColor: '#4895ec',
      },
      headerTintColor: '#fff',
    }
  }
});

export default AnnouncementStack;