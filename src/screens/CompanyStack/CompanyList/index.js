import React, { Component } from 'react';
import {StyleSheet, Text, SafeAreaView, TouchableOpacity, FlatList,
  View, ActivityIndicator, TextInput, Image, Modal, TouchableHighlight, Dimensions} from 'react-native';
import NavigationService from "../../../NavigationService";
import { Icon } from "native-base";
import ProgressBar from 'react-native-progress/Bar';
import QRCodeScanner from 'react-native-qrcode-scanner';
import axios from "../../../Api";
import {res, T} from "../../../helpers";
import { RNCamera } from 'react-native-camera';

import {inject, observer} from 'mobx-react';

@inject('AuthStore')
export default class CompanyList extends Component {
  state = {
    text: '',
    page: 1,
    companies: [],
    branches: [],
    qrModal: false,
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

      this.setState({
        companies: data,
        branches,
        allBranches: branches,
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




  renderContactsItem = ({item, index}) => {
    const { Paylaşım_Adı, Hedef_Departmanlar, Pdflink } = item;
    return (
      <TouchableOpacity
        onPress={() => { NavigationService.navigate('Detail', {item}) }}
        style={s.itemContainer}
      >
        <View style={s.imageContainer}>
          <Image
            style={s.image}
            source={{uri: 'https://media-cdn.tripadvisor.com/media/photo-s/03/0e/2a/06/capari-restoran.jpg'}}/>
          <ProgressBar
            progress={0.8}
            borderRadius={0}
            height={10}
            color="#6be672"
            unfilledColor="#ffffff"
            borderColor="#d3dbff"
            width={res(60)}/>
        </View>
        <View style={s.textContainer}>
          <Text style={s.name}>{item.name}</Text>
          <Text style={s.name}>{item.province} / {item.country}</Text>
          <Text style={s.name}>{item.phoneNumber}</Text>
        </View>
      </TouchableOpacity>
    )
  };

  renderFooter = () => {
    if (!this.state.loading) return null;
    return(
      <View style={{
        paddingVertical: 20
      }}>
        <ActivityIndicator size="large" />
      </View>
    )
  };

  render() {
    return (
      <SafeAreaView style={s.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.qrModal}>
          <TouchableOpacity
            style={s.closeButton}
            onPress={() => {
              this.setState({qrModal: false})
            }}>
            <Icon style={s.closeIcon} name='close'/>
          </TouchableOpacity>
          <QRCodeScanner
            onRead={(e) => { alert(e.data) }}
            reactivate={true}
            showMarker={true}
            reactivateTimeout={5000}
            cameraStyle={s.camera}
            markerStyle={{borderColor: 'white'}}

          />

        </Modal>
        <FlatList
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          renderItem={this.renderContactsItem}
          keyExtractor={item => item.id.toString()}
          data={this.state.branches}
        />
        <View style={s.qrContainer}>
          <TouchableOpacity
            onPress={() => { this.setState({qrModal: true}) }}
            style={s.plusIconContainer}>
            <Icon style={s.plusIcon} type="FontAwesome" name="plus"/>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
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
    borderColor: '#556B89'
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: res(10),
    margin: res(10),
    backgroundColor: '#d3dbff'
  },
  imageContainer: {
    justifyContent: 'space-around',
    marginHorizontal: res(10)
  },
  image: {
    width: res(60),
    height: res(60),
    marginBottom: res(5),
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-around',
    paddingRight: res(10)
  },
  name: {
    fontSize: res(14),
    backgroundColor: 'white',
    padding: res(3),
  },
  qrContainer: {
    height: res(50),
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderTopWidth: res(2),
    borderColor: '#556B89',
    paddingHorizontal: res(10)
  },
  plusIconContainer: {
    width: res(40),
    height: res(40),
    borderWidth: res(2),
    borderRadius: res(20),
    borderColor: '#556B89',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIcon: {
    color: '#556B89',
    fontSize: res(24)
  },
  camera: {
    height: Dimensions.get('window').height
  },
  closeButton: {
    position: 'absolute',
    top: res(40),
    left: res(20),
    zIndex: 20
  },
  closeIcon: {
    color: 'white',
    fontSize: res(45)
  }
});