import React, {Component} from 'react';
import {StyleSheet, View, FlatList, Image, TouchableOpacity, TextInput, ActivityIndicator} from 'react-native';
import { Text } from 'native-base';
import axios from 'axios';
import NavigationService from '../../../NavigationService';

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

    const { data: { results: contacts } } = await axios.get(`https://randomuser.me/api/?results=300&page=${this.state.page}`);
    const users = [...this.state.allContacts, ...contacts];

    if (this.state.refreshing) {
      users.reverse();
    }

    this.setState({
      contacts: users,
      allContacts: users,
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
          source={{uri: item.picture.thumbnail}}/>
        <View style={styles.textContainer}>
          <Text>{item.name.first} {item.name.last}</Text>
          <Text style={styles.email}>{item.email}</Text>
        </View>
      </TouchableOpacity>
    )
  };

  searchFilter = text => {
    const newData = this.state.allContacts.filter(item => {
      const listItem = `${item.name.first.toLowerCase()} ${item.name.last.toLowerCase()} ${item.location.state.toLowerCase()}`;

      return listItem.indexOf(text.toLowerCase()) > -1;
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
        keyExtractor={item => item.login.uuid}
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