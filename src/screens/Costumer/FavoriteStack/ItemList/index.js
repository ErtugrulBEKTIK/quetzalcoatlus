import React, { Component } from 'react';
import {StyleSheet, Text, SafeAreaView, TouchableOpacity, FlatList,
  View, ActivityIndicator, TextInput, Image, Modal, TouchableHighlight, Dimensions} from 'react-native';
import NavigationService from "~/NavigationService";
import { Icon } from "native-base";

import axios from "~/Api";
import {res, T} from "~/helpers";

import FavoriteItem from './FavoriteItem';
import { inject, observer } from 'mobx-react';

@inject('AuthStore')
export default class ItemList extends Component {

  state = {
    loading: true,
  };

  async componentDidMount() {

    await this.props.AuthStore.setupAuth();

    this.getFollowingBranches();
  }

  getFollowingBranches = async () => {
    this.setState({
      loading: true,
    });
    const { user } = this.props.AuthStore;

    try {
      const {data} = await axios.post('api/followingBranches',{
        userId: user.id
      });
      console.log(JSON.stringify(data));
      let branches = [];
      data.map((company) => {
        branches = [...branches, ...company.branches];
      });

      // Setting Total and Available Capacity
      let newBranches = [];
      const mapPromisses = branches.map( async (branch) => {
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
          availableCapacity,
          image: await this.getBranchPhoto(branch.id)
        })
      });

      Promise.all(mapPromisses).then(() => {
        this.setState({
          companies: data,
          branches: newBranches,
          allBranches: newBranches,
          loading: false,
        });
      });


    }catch (e) {
      console.log(e);
    }

  };

  render() {
   // const { cartList } = this.props.CartStore;

    return (
      <View style={s.container}>
        <FlatList
          style={s.flatList}
          data={[]}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <FavoriteItem item={item} />}
        />
      </View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  flatList: {
    flex: 1
  },
  footer: {
    height: res(125),
    backgroundColor: 'white',
    borderTopWidth: res(1),
    borderColor: '#ddd',
  },
  total: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: res(20)
  },
  totalText: {
    fontSize: res(20),
    fontWeight: '600',
    color: '#000'
  },
  totalAmount: {
    fontSize: res(25),
    color: '#00ACAC',
    fontWeight: '600'
  },
  orderButton: {
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00ACAC',
    paddingVertical: res(15)
  },
  orderText: {
    color: 'white',
    fontSize: res(20),
    fontWeight: '600'
  }

});