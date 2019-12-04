import React, {Component} from 'react';
import {StyleSheet, View, FlatList, Image, TouchableOpacity, Linking, Text} from 'react-native';
import {Icon} from 'native-base';
import {inject} from "mobx-react";
import _ from 'lodash';
import axios from '../../../Api';
import { font } from '../../../helpers/tools';


@inject('AuthStore')
export default class DocumentList extends Component {
  state = {
    text: '',
    page: 1,
    documents: [],
    allContacts: [],
    loading: true,
  };

  componentDidMount() {
    this.getDocuments();
  }

  getDocuments = async () => {
    this.setState({
      loading: true,
    });

    const {data} = await axios.post('Dokuman/DokumanListesi');


    this.setState({
      documents: _.sortBy(data, ['Paylaşım_Adı']),
      loading: false,

    });
  };

  renderContactsItem = ({item, index}) => {
    const { Paylaşım_Adı, Hedef_Departmanlar, Pdflink } = item;
    return (
      <TouchableOpacity 
        onPress={() => { Linking.openURL(Pdflink)}}
        style={ styles.itemContainer }
      >

        <Text style={styles.header}>Örnek Haber Başlığı</Text>


        <Text style={styles.textContainer}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim incidunt neque sunt temporibus totam? Error mollitia porro quas repudiandae ut?
        </Text>
        <Text style={styles.date}>
          <Icon name='calendar' style={styles.calendarIcon}/> 12.09.2018
        </Text>
      </TouchableOpacity>
    )
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          renderItem={this.renderContactsItem}
          keyExtractor={item => item.$id}
          data={this.state.documents}
        />
      </View>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcfc',
    paddingVertical: 15
  },
  itemContainer: {
    flex: 1,
    padding: 15,
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: '#eee',
    borderRadius: 5,
    marginHorizontal: 20,
    marginVertical: 5
  },
  header: {
    fontSize: font(16),
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#3e95a8'
  },
  textContainer: {
    paddingVertical: 3,
    fontSize: font(12)
  },
  date: {
    marginTop: 5,
    fontSize: font(11),
    color: '#606060'
  },
  calendarIcon: {
    fontSize: font(14),
    color: '#48aec4'
  },

});