import React, { Component } from 'react';
import {StyleSheet, SafeAreaView, Text, ScrollView, TouchableOpacity, Linking} from 'react-native';
import { T, res } from '../../../helpers'

export default class Cafeteria extends Component {


  constructor(props) {
    super(props);
    this.item = props.navigation.getParam('item');
  }

  render() {
    //const { Name, Lastname, Email, Department, GSM, file, Title } = this.item;
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={s.container}>
          <Text style={s.title}>'Antartika'yı Kutlamak' Kitabına İTÜ'lü Öğrencilerden Türkçe Çeviri</Text>
          <Text style={s.content}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus alias amet cupiditate dicta distinctio dolores dolorum error facere inventore iusto minus modi molestias mollitia natus neque non numquam, optio quae quas, saepe sequi suscipit tenetur vero vitae voluptas voluptatem, voluptatum! Lorem ipsum dolor sit amet,</Text>
          <TouchableOpacity
            onPress={() => { Linking.openURL('http://tugva.org/')}}>
            <Text style={s.link}>Haber sayfasına gitmek için tıklayınız...</Text>
          </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: res(15),
    paddingVertical: res(25),
  },
  title: {
    fontWeight: 'bold',
    marginBottom: res(10),
    fontSize: res(16),
  },
  link: {
    marginTop: res(10),
    marginBottom: res(25),
    color: '#3e95a8',
    fontWeight: 'bold',
  }
});