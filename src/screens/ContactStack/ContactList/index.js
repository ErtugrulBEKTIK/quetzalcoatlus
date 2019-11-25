import React, {Component} from 'react';
import {StyleSheet, View, FlatList, Image, TouchableOpacity, TextInput, ActivityIndicator, Text} from 'react-native';
import {inject, observer} from "mobx-react";
import _ from 'lodash';
import axios from '../../../Api';
import NavigationService from '../../../NavigationService';
import { T } from '../../../helpers'

@inject('AuthStore')
export default class ContactList extends Component {
  state = {
    text: '',
    page: 1,
    contacts: [],
    allContacts: [],
    loading: true,
  };

  componentDidMount() {
    this.getContacts();
  }

  getContacts = async () => {
    this.setState({
      loading: true,
    });

    const { data } = await axios.post('Personel/PersonelListesi');

    this.setState({
      contacts: _.sortBy(data, ['Name', 'Lastname']),
      allContacts: data,
      loading: false,
    });
  };

  renderContactsItem = ({item, index}) => {
    return (
      <TouchableOpacity 
        onPress={() => { NavigationService.navigate('Detail', {item}) }}
        style={[styles.itemContainer, {backgroundColor: index % 2 === 1 ? '#fafafa' : ''}]}
      >
        <Image
          style={styles.avatar}
          source={{uri: item.file}}/>
        <View style={styles.textContainer}>
          <Text>{item.Name} {item.Lastname}</Text>
          <Text style={styles.email}>{item.Email}</Text>
        </View>
      </TouchableOpacity>
    )
  };

  searchFilter = text => {
    const newData = this.state.allContacts.filter(item => {
      const listItem = `${T.toLowerCase(item.Name)} ${T.toLowerCase(item.Lastname)} ${T.toLowerCase(item.Email)}`;

      return listItem.indexOf(T.toLowerCase(text)) > -1;
    });

    this.setState({
      contacts: newData,
    });
  };

  renderHeader = () => {
    const {text} = this.state;
    return (
      <View style={styles.searchContainer}>
        <TextInput
          onChangeText={text => {
            this.setState({
              text,
            });
            this.searchFilter(text);
          }}
          value={text}
          placeholder="Ara..."
          style={styles.searchInput}/>
      </View>
    )
  };

  renderFooter = () => {
    if (!this.state.loading) return null;
    return(
      <View style={{
        paddingVertical: 20
      }}>
        <ActivityIndicator size="large" />
      </View>
    )
  };

  render() {
    return (
      <FlatList
        ListFooterComponent={this.renderFooter}
        ListHeaderComponent={this.renderHeader()}
        renderItem={this.renderContactsItem}
        keyExtractor={item => item.$id}
        data={this.state.contacts}
      />
    );
  }
}


const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginHorizontal: 10
  },
  textContainer: {
    justifyContent: 'space-around',
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