import React, { Component } from 'react';
import {StyleSheet, Text, TouchableOpacity, FlatList,
  View, TextInput, RefreshControl } from 'react-native';
import {Container} from '~/components/my-base';
import NavigationService from "~/NavigationService";
import _ from 'lodash';
import axios from "~/Api";
import {res, T} from "~/helpers";

import { inject } from 'mobx-react';

@inject('AuthStore', 'WaiterCartStore')
export default class TableList extends Component {
  state = {
    text: '',
    page: 1,
    tables: [],
    allTables: [],
    loading: true,
    refreshing: false
  };

  async componentDidMount() {
    this.getTables();
    setInterval(this.getTables, 1000*15);
  }

  getTables = async () => {

    try {

      const { user } = this.props.AuthStore;

      const branchId = user.branches[0].id;
      const {data} = await axios.post('api/tables', {
        branchId
      });

      const sorted = _.sortBy(data, ['active', o => parseInt(o.tableNo)]);

      this.setState({
        tables: sorted,
        allTables: sorted,
        loading: false,
        refreshing: false,
      });


    }catch (e) {
      console.log(e);
    }

  };

  searchFilter = text => {
    const newData = this.state.allTables.filter(item => {
      const listItem = item.tableNo;

      return listItem.indexOf(T.toLowerCase(text)) > -1;
    });

    this.setState({
      tables: newData,
    });
  };

  handleSelect = (table) => {
    this.props.WaiterCartStore.setTableId(table.id);
    NavigationService.navigate('Table', {table})
  };

  renderHeader = () => {
    const {text} = this.state;
    return (
      <View style={s.searchContainer}>
        <TextInput
          onChangeText={text => {
            this.setState({
              text,
            });
            this.searchFilter(text);
          }}
          value={text}
          placeholder="Ara..."
          style={s.searchInput}/>
      </View>
    )
  };

  renderItem = ({item, index}) => {

    return (
      <TouchableOpacity
        onPress={() => { this.handleSelect(item) }}
        style={s.itemContainer}
      >
        <Text style={s.name}>No: {item.tableNo}</Text>
        <Text style={s.capacity}>Kapasite: {item.capacity}</Text>
        <Text style={[s.isActive, { backgroundColor: item.active ? 'red' : 'green'}]}>{item.active}</Text>
      </TouchableOpacity>
    )
  };

  render() {
    const { tables, loading, refreshing, text } = this.state;

    return (
      <Container

        loading={loading}
        >
        <View style={s.searchContainer}>
          <TextInput
            onChangeText={text => {
              this.setState({
                text,
              });
              this.searchFilter(text);
            }}
            value={text}
            placeholder="Ara..."
            style={s.searchInput}/>
        </View>
        <FlatList
          renderItem={this.renderItem}
          refreshing={refreshing}
          onRefresh={() => {
            this.setState({refreshing: true});
            this.getTables()
          }}
          keyExtractor={item => item.id.toString()}
          data={tables}
        />
      </Container>

    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: res(10)
  },
  searchInput: {
    fontSize: res(16),
    backgroundColor: '#f9f9f9',
    padding: res(10),
    borderRadius: res(20),
    height: res(40),
    borderWidth: res(1),
    borderColor: '#ddd',
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: res(10),
    margin: res(10),
    borderWidth: res(1),
    borderColor: '#ddd',
    borderRadius: res(5)
  },
  name: {
    flex: 1,
    fontSize: res(18),
    fontWeight: 'bold',
    color: '#000'
  },
  capacity: {
    flex: 1,
    fontSize: res(14),
    color: '#000'
  },
  isActive: {
    width: res(50),
  }
});
