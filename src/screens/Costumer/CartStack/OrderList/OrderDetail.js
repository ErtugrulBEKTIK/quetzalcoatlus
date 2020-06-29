import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import moment from 'moment';
import {res} from "~/helpers";
import axios from "~/Api";

import { inject } from 'mobx-react';
import {Spinner, Button} from "native-base";

@inject('AuthStore')
export default class extends Component {


  render() {
    const { orderStatuses, takenTime, user: waiter, id } = this.props.section;
    const statusList = {
      taken: 'Sipariş alındı',
      ready: 'Hazır',
      presented: 'Servis edildi'
    };
    const { user } = this.props.AuthStore;
    return (
      <View style={s.container} >
        <View style={s.detailContainer}>
          <View style={s.statusList}>
            {
              orderStatuses.map((status, index) => {
                const lng = 'tr_TR';
                let title = '';

                status.mealCategory.mealCatInLangList.map((rawTitle) => {
                  if (rawTitle.language.languageTag === lng) {
                    title = rawTitle.name;
                  }
                });

                return (
                  <View style={s.status} key={index.toString()}>
                    <Text style={s.statusTitle}>{title}</Text>
                    <Text style={s.statusText}>{statusList[status.orderStatus]}</Text>
                  </View>
                )
              } )
            }
          </View>
          <View style={s.slot}>
            <Text style={s.slotTitle}>SAAT</Text>
            <Text style={s.slotValue}>{moment(takenTime).format('HH:mm')}</Text>
          </View>
        </View>



      </View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    padding: res(5),
    height: res(30),
    backgroundColor: '#003d58',
    borderRadius: res(5),
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    textAlign: 'center'
  },
  statusContainer: {
    backgroundColor: '#bdfff7',
    paddingHorizontal: res(20),
    paddingVertical: res(10),
    flexDirection: 'row'
  },
  statusList: {
    flex: 2,
    paddingHorizontal: res(20)
  },
  status: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  statusTitle: {
    flex: 1,
    color: 'white',
    fontWeight: 'bold',
  },
  statusText: {
    flex: 1,
    color: 'white'
  },

  detailContainer: {
    backgroundColor: '#00ACAC',
    paddingVertical: res(10),
    flexDirection: 'row',
    alignItems: 'center'

  },

  slot: {
    flex: 1,
    alignItems: 'center'
  },
  slotTitle: {
    fontWeight: 'bold',
    color: 'white'
  },
  slotValue: {
    color: 'white'
  }

});
