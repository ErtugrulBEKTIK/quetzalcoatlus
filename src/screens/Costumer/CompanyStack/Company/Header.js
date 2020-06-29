import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Platform, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import {res} from "~/helpers";

const CompanyHeader = ({ navigation }) => {
  const company = navigation.getParam('item');
  return(
    <View style={s.container}>
      <ImageBackground source={company.image} style={s.imageBackground}>
        <TouchableOpacity
          style={s.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name='arrow-back' style={s.backIcon} />
        </TouchableOpacity>
        <View style={s.titleContainer}>
          <Text style={s.title}>{company.name}</Text>
        </View>
      </ImageBackground>
    </View>
  )
};

const s = StyleSheet.create({
  container: {
    backgroundColor: '#003d58',
    height: res(230),
  },
  imageBackground: {
    width: '100%',
    height: '100%'
  },
  backButton: {
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginLeft: 20,
    width: res(35),
    alignItems: 'center',
    borderRadius: res(3),
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  backIcon: {
    color: 'white',
    fontSize: res(24),
    padding: res(5),
  },
  titleContainer:{
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingLeft: res(10),
    justifyContent: 'center',
    height: res(40),
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  title: {
    color: 'white',
    fontSize: res(24),
  }
});

export default CompanyHeader