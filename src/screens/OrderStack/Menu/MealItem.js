import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View, Modal, FlatList} from 'react-native';
import NavigationService from "~/NavigationService";
import {res, T} from "~/helpers";
import {TouchableBar, Box} from '~/components/my-base'
import {Toast} from 'native-base'

export default class MealItem extends Component {

  state = {
    detailModal: false,
    ingredients: []
  };

  componentDidMount() {
    this.setIngradients()
  }

  setIngradients = () => {
    const { ingredients } = this.props.item;

    const lng = 'tr_TR';
    const newIngredients = [];

    ingredients.map((item) => {
      const ingredient = {
        ...item
      };



      // Set ingradient title according to language
      item.ingredient.ingredientInLangList.map((rawTitle) => {
        if(rawTitle.language.languageTag === lng){
          ingredient.title = rawTitle.name;
        }
      });

      // Set ingradient category according to language
      item.ingredient.ingredientCategory.ingredientCatInLangList.map((rawTitle) => {
        if(rawTitle.language.languageTag === lng){
          ingredient.category = rawTitle.name;
        }
      });

      // Set ingradient amount type according to language
      item.ingredient.ingredientAmountType.ingredientAmountTypeInLangList.map((rawTitle) => {
        if(rawTitle.language.languageTag === lng){
          ingredient.amountType = rawTitle.name;
        }
      });

      newIngredients.push(ingredient)

    });

    this.setState({
      ingredients: newIngredients
    });

  };

  renderItem = ({item, index}) => {

    return (
      <View style={s.ingradientContainer}>
        <Text>{item.title} </Text>
        <Text>{item.amountInMeal} {item.amountType}</Text>
      </View>
    )
  };


  render(){
    const { item, CartStore } = this.props;
    const {title, fee, image } = item;
    const {detailModal} = this.state;

    return (
      <View
        onPress={() => { NavigationService.navigate('Company', {item}) }}
        style={s.itemContainer}
      >
        <Modal transparent={true} visible={detailModal} >
          <View style={s.modal}>
            <Box style={s.modalContainer}>
              <Text style={s.title}>İçindekiler</Text>

              <FlatList
                style={{ width: '90%'}}
                renderItem={this.renderItem}
                keyExtractor={item => item.id.toString()}
                data={this.state.ingredients}
              />
              <View style={s.modalFooter}>
                <View style={s.infoContainer}>
                  <Text>Kalori: {item.calorie}kcal</Text>
                  <Text>Süre: {item.cookTime}dk</Text>
                </View>
                <TouchableBar style={s.closeButton} onPress={() => { this.setState({detailModal: false}) }}>
                  <Text style={{color: 'white'}}>Kapat</Text>
                </TouchableBar>
              </View>
            </Box>
          </View>
        </Modal>


        <View style={s.imageContainer}>
          <Image
            style={s.image}
            source={{uri: image}}
          />
        </View>
        <View style={s.textContainer}>
          <TouchableOpacity onPress={() => { this.setState({detailModal: true}) }}>
            <Text style={s.title}>{title}</Text>
          </TouchableOpacity>

          <View style={s.body}>
            <View style={s.content}>
              <Text style={s.fee}>₺{fee}</Text>
            </View>
          </View>

        </View>
        <TouchableOpacity
          onPress={() => {
            CartStore.addItem(item);
            Toast.show({
              text: 'Sepete eklendi!',
              buttonText: 'Kapat',
              type: 'success'
            })
          }}
          style={s.addButton}
        >
          <Text style={s.addButtonText}>+Ekle</Text>
        </TouchableOpacity>
      </View>
    );
  }


}

const s = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
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
    color: '#000'
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1
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
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    marginHorizontal: res(50),
    paddingHorizontal: 0,
    paddingVertical: res(20),
    height: res(300),
  },
  modalText: {
    color: '#545757',
    textAlign: 'center'
  },
  ingradientContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: res(1),
    borderColor: '#ddd',
    padding: res(5),
  },
  modalFooter: {
    width: '100%',
    alignItems: 'center'
  },
  infoContainer: {
    flexDirection:'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: res(10)
  },
  closeButton: {
    backgroundColor: '#17a27b',
    height: res(30),
    width: '90%'
  }
});
