import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {Icon} from 'native-base';
import {res} from '../../../helpers';

export default class AnnounceSlide extends Component {
  render() {
    return (
      <View style={s.container}>
        <SwiperFlatList
          showPagination
          autoplay
          autoplayDelay={7}
          autoplayLoop
          paginationDefaultColor={"rgba(255,255,255,0.24)"}
          paginationActiveColor={"rgba(255,255,255,0.81)"}
        >
          <View style={[s.itemContainer, { backgroundColor: '#c24c30' }]}>
            <View style={s.header}>
              <Text style={s.headerText}>PAZARTESİ</Text>
              <Text style={s.headerText}>
                <Icon name="calendar" type="AntDesign" style={[s.headerText, s.calendarIcon]} />&nbsp;
                04.12.2019
              </Text>
            </View>
            <View style={s.content}>
              <Text style={s.title}>Sınıfınızdaki Ödev Düzenlendi</Text>
              <Text style={s.description}>İsmail Çevik, EHB 231 dersindeki 'MOSFET' başlıklı ödevi düzenledi.</Text>
            </View>
          </View>
          <View style={[s.itemContainer, { backgroundColor: '#5dca56' }]}>
            <View style={s.header}>
              <Text style={s.headerText}>SALI</Text>
              <Text style={s.headerText}>
                <Icon name="calendar" type="AntDesign" style={[s.headerText, s.calendarIcon]} />&nbsp;
                04.12.2019
              </Text>
            </View>
            <View style={s.content}>
              <Text style={s.title}>Sınıfınızdaki Ödev Düzenlendi</Text>
              <Text style={s.description}>İsmail Çevik, EHB 231 dersindeki 'MOSFET' başlıklı ödevi düzenledi.</Text>
            </View>
          </View>
          <View style={[s.itemContainer, { backgroundColor: '#378aed' }]}>
            <View style={s.header}>
              <Text style={s.headerText}>ÇARŞAMBA</Text>
              <Text style={s.headerText}>
                <Icon name="calendar" type="AntDesign" style={[s.headerText, s.calendarIcon]} />&nbsp;
                04.12.2019
              </Text>
            </View>
            <View style={s.content}>
              <Text style={s.title}>Sınıfınızdaki Ödev Düzenlendi</Text>
              <Text style={s.description}>İsmail Çevik, EHB 231 dersindeki 'MOSFET' başlıklı ödevi düzenledi.</Text>
            </View>
          </View>
          <View style={[s.itemContainer, { backgroundColor: '#7bb0d0' }]}>
            <View style={s.header}>
              <Text style={s.headerText}>PAZARTESİ</Text>
              <Text style={s.headerText}>
                <Icon name="calendar" type="AntDesign" style={[s.headerText, s.calendarIcon]} />&nbsp;
                04.12.2019
              </Text>
            </View>
            <View style={s.content}>
              <Text style={s.title}>Sınıfınızdaki Ödev Düzenlendi</Text>
              <Text style={s.description}>İsmail Çevik, EHB 231 dersindeki 'MOSFET' başlıklı ödevi düzenledi.</Text>
            </View>
          </View>
          <View style={[s.itemContainer, { backgroundColor: '#9636a1' }]}>
            <View style={s.header}>
              <Text style={s.headerText}>PAZARTESİ</Text>
              <Text style={s.headerText}>
                <Icon name="calendar" type="AntDesign" style={[s.headerText, s.calendarIcon]} />&nbsp;
                04.12.2019
              </Text>
            </View>
            <View style={s.content}>
              <Text style={s.title}>Sınıfınızdaki Ödev Düzenlendi</Text>
              <Text style={s.description}>İsmail Çevik, EHB 231 dersindeki 'MOSFET' başlıklı ödevi düzenledi.</Text>
            </View>
          </View>
        </SwiperFlatList>
      </View>
    );
  }
}

const { width } = Dimensions.get('window');
const s = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: 'white'
  },
  itemContainer: {
    flex: 1,
    width,
    justifyContent: 'center',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.4)',
    paddingHorizontal: res(20),
    paddingVertical: res(10),
  },
  headerText: {
    color: '#fff',
    fontSize: res(12),
  },
  calendarIcon: {
    fontSize: res(14),
  },
  content: {
    flex: 8,
    padding: res(20),
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: res(17),
    marginBottom: res(10),
  },
  description: {
    color: '#fff',
    fontSize: res(15),
  }
});