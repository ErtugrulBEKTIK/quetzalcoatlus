import React, {Component} from 'react';
import {StyleSheet, View, FlatList, Image, TouchableOpacity, Linking, Text} from 'react-native';
import {Icon} from 'native-base';
import {inject} from "mobx-react";
import _ from 'lodash';
import axios from '../../../Api';
import NavigationService from '../../../NavigationService';


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


        <View style={styles.textContainer}>
          <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim incidunt neque sunt temporibus totam? Error mollitia porro quas repudiandae ut?</Text>
        </View>
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
    backgroundColor: '#fcfcfc'
  },
  itemContainer: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: '#eee',
    borderRadius: 5,
    marginHorizontal: 20,
    marginVertical: 5
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  },

  textContainer: {
    paddingVertical: 3
  },
  email: {
    fontSize: 14
  },
  searchContainer: {
    padding: 10
  },
  searchInput: {
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    padding: 10
  }
});