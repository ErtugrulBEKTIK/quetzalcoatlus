import React, { Component } from 'react';
import {StyleSheet, Text, TouchableOpacity, FlatList, View, Dimensions, SectionList} from 'react-native';
import {res, T} from "~/helpers";
import OrderItem from './OrderItem';
import OrderDetail from './OrderDetail';
import { inject, observer } from 'mobx-react';
import _ from 'lodash';
import axios from "~/Api";
import {Root} from "native-base";
import {Container} from "~/components/my-base";

@inject('AuthStore', 'WaiterCartStore')
@observer
export default class OrderList extends Component {

  state = {
    orderList: [],
    refreshing: false,
    loading: true,
  };

  componentWillMount() {
    this.props.navigation.addListener('willFocus', payload => {
      this.getOrderList()
    });
  }

  getOrderList = async () => {
    try{
      const { user } = this.props.AuthStore;

      const branchId = user.branches[0].id;
      const {data} = await axios.post('api/orders', {
        branchId
      });

      const lng = 'tr_TR';
      let generalMenu = [];
      let total = 0;

      for (const section of data) {
        let newSection = {
          ...section,
          data: []
        };
        total += section.totalFee;

        // Set menu items according to language
        for (const {menu} of section.orderMenuList) {

          const foundedMeal = _.find(newSection.data, { 'id': menu.id });
          if(foundedMeal){
            foundedMeal.count ++;
          }else {
            let newMeal = {
              ...menu,
              title: '',
              count: 1,
            };


            menu.menuInLangList.map((rawTitle) => {
              if (rawTitle.language.languageTag === lng) {
                newMeal.title = rawTitle.name;
              }
            });

            newSection.data.push(newMeal);
          }
        }

        generalMenu.push(newSection);
      }

      this.setState({
        orderList: generalMenu,
        total,
        loading: false,
        refreshing: false
      });



    }catch (e) {
      console.log(e);
    }
  };

  render() {

    const { orderList, loading, refreshing } = this.state;

    return (
      <Container style={s.container} loading={loading}>
        <Root>
          <SectionList
            sections={orderList.slice()}
            keyExtractor={(item, index) => item + index}
            stickySectionHeadersEnabled={false}
            refreshing={refreshing}
            onRefresh={() => {
              this.setState({refreshing: true});
              this.getOrderList()
            }}
            renderItem={({ item }) => <OrderItem {...this.props} item={item} />}
            renderSectionHeader={({ section }) => <OrderDetail section={section}/>}
          />

        </Root>
      </Container>
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
    height: res(50),
    backgroundColor: 'white',
    justifyContent: 'center',
    borderTopWidth: res(1),
    borderColor: '#ddd',
  },
  total: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: res(20)
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
