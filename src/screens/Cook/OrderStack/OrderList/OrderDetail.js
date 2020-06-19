import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import moment from 'moment';
import {res} from "~/helpers";
import axios from "~/Api";

import { inject } from 'mobx-react';
import {Spinner, Button} from "native-base";

@inject('AuthStore')
export default class extends Component {

  state = {
    sending: false,
    onaylandi: false,
    categoryId: null,
    checkStatus: false
  };

  checkStatus = (user, statuses) => {
    for(let cat of user.type.mealCategories){

      for (let status of statuses){
        if((cat.id === status.mealCategory.id) && (status.orderStatus === 'taken')){
          this.setState({categoryId: status.mealCategory.id, checkStatus: true});

        }
      }
    }

  };

  componentDidMount() {
    const { user } = this.props.AuthStore;
    const { orderStatuses} = this.props.section;
    this.checkStatus(user, orderStatuses)
  }


  onayla = async () => {

    try {

      const { id } = this.props.section;
      const { user } = this.props.AuthStore;
      this.setState({sending: true});
      await axios.post('api/advanceOrderStatus', {
        userId: user.id,
        orderId: id
      });

      this.props.section.orderStatuses.map((status) => {
        if(status.mealCategory.id === this.state.categoryId){
          status.orderStatus = 'ready'
        }
      })

      this.setState({sending: false, onaylandi: true });


    }catch (e) {
      alert('Onaylama sırasında hata meydana geldi')
      console.log(e);
    }


  }

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
              (this.state.checkStatus && !this.state.onaylandi) &&
              <Button onPress={this.onayla} style={s.button}>
                { this.state.sending
                  ? <Spinner size={'small'} color={'white'} />
                  : <Text style={s.buttonText}>Onayla</Text>
                }

              </Button>
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
    flexDirection: 'row',
    padding: res(5),
    height: res(30),
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
