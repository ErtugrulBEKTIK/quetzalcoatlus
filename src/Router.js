import React from 'react';
import {Icon} from "native-base";

import {
  createAppContainer,
  createDrawerNavigator,
  createSwitchNavigator
} from 'react-navigation';

import DrawerButton from './components/DrawerButton';
import DrawerMenu from './components/DrawerMenu';

import Redirector from './screens/AuthStack/Redirector';

// Stacks & Screens
import AuthStack from './screens/AuthStack';
import HomeStack from './screens/HomeStack';
import ContactStack from './screens/ContactStack';
import DocumentStack from './screens/DocumentStack';
import ProfileStack from './screens/ProfileStack';
import AnnouncementStack from './screens/AnnouncementStack';


const App = createDrawerNavigator({
  Profile: {
    screen: ProfileStack,
    navigationOptions: ({ navigation }) => ({
      title: 'Profil',
      headerLeft: <DrawerButton navigation={navigation} />,
      drawerIcon: ({ tintColor }) => (
        <Icon style={{color: tintColor, fontSize: 25}} name='contact' />
      ),
    })
  },
  Home: {
    screen: HomeStack,
    navigationOptions: ({ navigation }) => ({
      title: 'Anasayfa',
      headerLeft: <DrawerButton navigation={navigation} />,
      drawerIcon: ({ tintColor }) => (
        <Icon style={{color: tintColor, fontSize: 25}} name='home' />
      ),
    })
  },
  Contacts: {
    screen: ContactStack,
    navigationOptions: ({ navigation }) => ({
      title: 'Rehber',
      headerLeft: <DrawerButton navigation={navigation} />,
      drawerIcon: ({ tintColor }) => (
        <Icon style={{color: tintColor, fontSize: 25}} name='contacts' />
      ),
    })
  },
  Announcements: {
    screen: AnnouncementStack,
    navigationOptions: ({ navigation }) => ({
      title: 'Duyurular',
      headerLeft: <DrawerButton navigation={navigation} />,
      drawerIcon: ({ tintColor }) => (
          <Icon style={{color: tintColor, fontSize: 25}} name='megaphone' />
      ),
    })
  },
  Documents: {
    screen: DocumentStack,
    navigationOptions: ({ navigation }) => ({
      title: 'Belgeler',
      headerLeft: <DrawerButton navigation={navigation} />,
      drawerIcon: ({ tintColor }) => (
        <Icon style={{color: tintColor, fontSize: 25}} name='document' />
      ),
    })
  }
}, {
  initialRouteName: 'Announcements',
  contentComponent: DrawerMenu,
  overlayColor: 'rgba(0,0,0,0.67)',
  contentOptions: {
    activeTintColor: '#fff',
    inactiveTintColor: '#3492c7',
    activeBackgroundColor: '#3492c7',
    inactiveBackgroundColor: '#fff',
    iconContainerStyle: { marginRight: 0,}
  }
});

const SwitchNavigator = createSwitchNavigator(
  {
    Redirector,
    App,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Redirector',
  }
);

export default createAppContainer(SwitchNavigator);