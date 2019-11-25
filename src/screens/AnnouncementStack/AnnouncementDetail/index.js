import React, { Component } from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import { Text, Icon } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { T } from '../../../helpers'

export default class ContactDetail extends Component {


  constructor(props) {
    super(props);
    this.item = props.navigation.getParam('item');
  }

  render() {
    const { Name, Lastname, Email, Department, GSM, file, Title } = this.item;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.clipper}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1.5, y: 0.2}}
              colors={['#4591ec', '#56c4e0', '#5cd6dc']}
              style={styles.linearGradient}
            >

            </LinearGradient>

            <Text style={styles.headerTitle}>{Name} {Lastname}</Text>

            <View style={styles.photoContainer}>
              <Image source={{uri: file}} style={styles.photo}/>
            </View>

          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.itemContainer}>
            <View style={styles.iconContainer}>
              <Icon
                style={[styles.icon, {color: '#e6b2c9'}]}
                name='git-network'/>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Departman</Text>
              <Text>{T.capitalizeFirstLetter(Department)}</Text>
            </View>
          </View>
          <View style={styles.itemContainer}>
            <View style={styles.iconContainer}>
              <Icon
                style={[styles.icon, {color: '#eee2aa'}]}
                name='briefcase'/>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Görev</Text>
              <Text>{T.capitalizeFirstLetter(Title)}</Text>
            </View>
          </View>
          <View style={styles.itemContainer}>
            <View style={styles.iconContainer}>
              <Icon
                style={[styles.icon, {color: '#8cbeec'}]}
                name='phone-portrait'/>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>GSM</Text>
              <Text>{GSM}</Text>
            </View>
          </View>
          <View style={styles.itemContainer}>
            <View style={styles.iconContainer}>
              <Icon
                style={[styles.icon, {color: '#b1e3d2'}]}
                name='mail'/>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Email</Text>
              <Text>{Email}</Text>
            </View>
          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 3,
  },
  clipper: {
    width: '100%',
    top: -100,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  linearGradient: {
    width: 500,
    height: 500,
    transform: [{ rotate: "-20deg" }],
    borderRadius: 70,
    zIndex: 10,
    bottom: 50
  },
  headerTitle: {
    color: '#fff',
    fontSize: 23,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 140,
    left: 20,
    zIndex: 20
  },
  photoContainer: {
    width: 120,
    height: 120,
    zIndex: 20,
    position: 'absolute',
    bottom: 0,
    left: 200,
    borderWidth: 4,
    borderColor: 'rgba(240,240,240,0.4)',
    borderRadius: 60,
    overflow: 'hidden'
  },
  photo: {
    width: 112,
    height: 112,
    borderRadius: 56,
  },
  body: {
    flex: 4,
    paddingHorizontal: 30,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#eee'
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 22,
    borderWidth: 4,
    borderColor: 'rgba(240,240,240,0.4)',
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    fontSize: 20
  },
  textContainer: {
    height: 45,
    justifyContent: 'space-around',
    width: '85%',
  },
  title: {
    fontSize: 12,
    color: '#878787',
  },
});