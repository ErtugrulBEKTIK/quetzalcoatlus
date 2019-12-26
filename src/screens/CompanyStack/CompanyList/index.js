import React, { Component } from 'react';
import {StyleSheet, Text, TouchableOpacity, FlatList,
  View, TextInput, Image, Dimensions} from 'react-native';
import NavigationService from "../../../NavigationService";
import ProgressBar from 'react-native-progress/Bar';
import axios from "../../../Api";
import {res, T} from "../../../helpers";

import { inject } from 'mobx-react';

@inject('AuthStore')
export default class CompanyList extends Component {
  state = {
    text: '',
    page: 1,
    companies: [],
    branches: [],
    loading: true,
  };

  async componentDidMount() {

    await this.props.AuthStore.setupAuth();

    this.getCompanies();
  }

  getCompanies = async () => {
    this.setState({
      loading: true,
    });

    try {
      const {data} = await axios.post('api/companies');

      let branches = [];
      data.map((company) => {
        branches = [...branches, ...company.branches]
      });

      // Setting Total and Available Capacity
      let newBranches = [];
      branches.map((branch) => {
        let totalCapacity = 0;
        let availableCapacity = 0;

        branch.halls.map((hall) => {
          hall.table.map((table) => {
            if(table.active){
              availableCapacity += table.capacity;
            }

            totalCapacity += table.capacity;
          });
        });

        newBranches.push({
          ...branch,
          totalCapacity,
          availableCapacity
        })
      });

      this.setState({
        companies: data,
        branches: newBranches,
        allBranches: newBranches,
        loading: false,
      });

    }catch (e) {
      console.log(e);
    }

  };

  searchFilter = text => {
    const newData = this.state.allBranches.filter(item => {
      const listItem = `${T.toLowerCase(item.name)} ${T.toLowerCase(item.province)} ${T.toLowerCase(item.country)}`;

      return listItem.indexOf(T.toLowerCase(text)) > -1;
    });

    this.setState({
      branches: newData,
    });
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
    const capacity = item.totalCapacity === 0 ? 0 : ((item.totalCapacity-item.availableCapacity)/item.totalCapacity);

    return (
      <TouchableOpacity
        onPress={() => { NavigationService.navigate('Company', {item}) }}
        style={s.itemContainer}
      >
        <View style={s.imageContainer}>
          <Image
            style={s.image}
            source={{uri: 'http://lorempixel.com/350/350/food/'}}/>
          <ProgressBar
            progress={capacity}
            borderRadius={0}
            height={10}
            color={T.getColorGreenToRed(capacity)}
            unfilledColor="#ffffff"
            borderColor="#d3dbff"
            width={res(90)}/>
        </View>
        <View style={s.textContainer}>
          <Text style={s.name}>{item.name}</Text>
          <Text style={s.detail}>{item.province} / {item.country}</Text>
          <Text style={s.detail}>{item.phoneNumber}</Text>
        </View>
      </TouchableOpacity>
    )
  };

  render() {
    return (
      <FlatList
        ListHeaderComponent={this.renderHeader}
        renderItem={this.renderItem}
        keyExtractor={item => item.id.toString()}
        data={this.state.branches}
      />
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
    margin: res(10),
    borderWidth: res(1),
    borderColor: '#ddd',
    borderRadius: res(5)
  },
  imageContainer: {
    justifyContent: 'space-around',
  },
  image: {
    width: res(90),
    height: res(90),
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-around',
    padding: res(10),
  },
  name: {
    fontSize: res(18),
    fontWeight: 'bold'
  },
  detail: {
    fontSize: res(14),
  }
});