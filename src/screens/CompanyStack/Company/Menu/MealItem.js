import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import NavigationService from "../../../../NavigationService";
import {res} from "../../../../helpers";

const MealItem = ({ item, CartStore }) => {
  const {title, fee} = item;
  return (
    <View
      onPress={() => { NavigationService.navigate('Company', {item}) }}
      style={s.itemContainer}
    >
      <View style={s.imageContainer}>
        <Image
          style={s.image}
          source={{uri: 'http://lorempixel.com/350/350/food/'}}
        />
      </View>
      <View style={s.textContainer}>
        <TouchableOpacity>
          <Text style={s.title}>{title}</Text>
        </TouchableOpacity>

        <View style={s.body}>
          <View style={s.content}>
            <Text style={s.detail}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, fuga.</Text>
            <Text style={s.fee}>₺{fee}</Text>
          </View>

          <TouchableOpacity
            onPress={() => { CartStore.addItem(item) }}
            style={s.addButton}
          >
            <Text style={s.addButtonText}>+Ekle</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};

const s = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
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
    width: res(90),
    height: res(90),
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
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1
  },
  detail: {
    fontSize: res(12),
    marginBottom: res(10),
    color: '#a4a4a4'
  },
  fee: {
    fontSize: res(16),
    fontWeight: 'bold',
    color: '#00ACAC'
  },
  addButton: {
    width: res(50),
    height: res(30),
    padding: res(5),
    marginLeft: res(10),
    borderWidth: res(1),
    borderRadius: res(3),
    justifyContent: 'center',
    borderColor: '#00ACAC',
  },
  addButtonText: {
    fontSize: res(14),
    color: '#00ACAC',
  }
});

export default MealItem