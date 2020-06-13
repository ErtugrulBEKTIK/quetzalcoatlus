import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import moment from 'moment';
import {res} from "~/helpers";

import { inject } from 'mobx-react';

@inject('AuthStore')
export default class extends Component {

  checkStatus = (user, statuses) => {
    for(let cat of user.type.mealCategories){

      for (let status of statuses){
        if(cat.id === status.mealCategory.id){
          return true
        }
      }
    }
    return false;
  };

  render() {
    const { orderStatuses, takenTime, user: waiter } = this.props.section;
    const statusList = {
      taken: 'Sipariş alındı',
      ready: 'Hazır',
      presented: 'Servis edildi'
    };
    const { user } = this.props.AuthStore;
    return (
      <View style={s.container} >
        <View style={s.detailContainer}>
          <View style={s.slot}>
            <Text style={s.slotTitle}>GARSON</Text>
            <Text style={s.slotValue}>{waiter.name} {waiter.surname}</Text>
          </View>
          <View style={s.slot}>
            <Text style={s.slotTitle}>SAAT</Text>
            <Text style={s.slotValue}>{moment(takenTime).format('HH:mm')}</Text>
          </View>
        </View>
        <View style={s.statusContainer}>

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
          <View style={s.statusControlContainer}>

            {
              this.checkStatus(user, orderStatuses) &&
              <TouchableOpacity style={s.button}>
                <Text style={s.buttonText}>Onayla</Text>
              </TouchableOpacity>
            }

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
    padding: res(5),
    backgroundColor: '#005656',
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
    flex: 1,
  },
  statusControlContainer: {
    width: res(70),
  },
  status: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  statusTitle: {
    flex: 1,
    color: '#005656',
    fontWeight: 'bold',
  },
  statusText: {
    flex: 1,
    color: '#005656'
  },

  detailContainer: {
    backgroundColor: '#00ACAC',
    paddingVertical: res(10),
    flexDirection: 'row',

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
