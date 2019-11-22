import React, {Component} from 'react';
import {StyleSheet, View, SafeAreaView, TouchableOpacity, ImageBackground, FlatList} from 'react-native';
import { Content, Button, Text, Thumbnail} from 'native-base';

import { DrawerItems } from 'react-navigation'

import {inject, observer} from 'mobx-react';

@inject('AuthStore')
@observer
export default class DrawerMenu extends Component {

  render() {
    const {Name, Eposta, ProfilResmi} = this.props.AuthStore.user;
    console.log(ProfilResmi);
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={require('../assets/images/bg.jpg')} style={styles.profileContainer}>
          <Thumbnail large source={{uri: ProfilResmi}} />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{Name}</Text>
            <Text style={styles.email}>{Eposta}</Text>
          </View>
        </ImageBackground>

        <Content style={styles.menuContainer}>
          <DrawerItems {...this.props} />
        </Content>

        <View style={styles.footer}>
          <Button style={styles.footerText} block danger
                  onPress={() => this.props.AuthStore.removeUser()}
          >
            <Text>Çıkış Yap</Text>
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    height: 150,
    paddingVertical: 40,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  profileInfo:{
    height: 60,
    marginRight: 10,
    justifyContent: 'space-around',
  },
  name:{
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
  email:{
    color: 'white',
    fontSize: 12
  },
  menuContainer:{
    paddingVertical: 20
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
    color: '#303030'
  },
  itemText: {
    color: '#303030'
  },
  itemIcon: {
    marginRight: 15
  },
  footer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    padding: 20
  },
  footerText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 11
  }
});