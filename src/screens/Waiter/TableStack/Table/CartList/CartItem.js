import React, { Component } from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'native-base';
import {res} from "~/helpers";

import { inject, observer } from 'mobx-react';

@inject('WaiterCartStore')
@observer
export default class extends Component {

  render() {
    const {id, title, fee, count, image} = this.props.item;
    return (
      <View style={s.itemContainer}>
        <View style={s.imageContainer}>
          <Image
            style={s.image}
            source={{uri: image}}
          />
        </View>
        <View style={s.textContainer}>
          <TouchableOpacity>
            <Text style={s.title}>{title}</Text>
          </TouchableOpacity>

          <View style={s.body}>
            <View style={s.quantity}>

              <TouchableOpacity
                onPress={() => { this.props.WaiterCartStore.decrease(id) }}
                style={s.counterButton}
              >
                <Icon style={s.counterIcon} name='remove'/>
              </TouchableOpacity>

              <Text style={s.count}>{count}</Text>

              <TouchableOpacity
                onPress={() => { this.props.WaiterCartStore.increase(id) }}
                style={s.counterButton}
              >
                <Icon style={s.counterIcon} name='add'/>
              </TouchableOpacity>

            </View>

            <Text style={s.fee}>₺{fee*count}</Text>
          </View>

        </View>
      </View>
    );
  }
}

const s = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: res(1),
    borderColor: '#ddd',
    borderRadius: res(5),
    padding: res(15)
  },
  imageContainer: {
    justifyContent: 'space-around',
    paddingRight: res(15),
  },
  image: {
    width: res(70),
    height: res(70),
    borderRadius: res(10),
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  title: {
    fontSize: res(16),
    fontWeight: '500',
    marginBottom: res(10),
    color: '#000'
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quantity: {
    flex: 1,
    flexDirection: 'row',
  },
  counterButton: {
    height: res(25),
    width: res(25),
    borderWidth: res(1),
    borderRadius: res(12.5),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#000000',
  },
  counterIcon: {
    fontSize: res(22)
  },
  count: {
    fontSize: res(20),
    width: res(25),
    textAlign: 'center',
    marginHorizontal: res(10),
    color: '#000'
  },
  fee: {
    fontSize: res(16),
    width: res(60),
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#00ACAC'
  }
});
