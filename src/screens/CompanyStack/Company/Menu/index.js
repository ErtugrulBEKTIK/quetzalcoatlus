import React, { Component } from 'react';
import {StyleSheet, Text, SafeAreaView, TouchableOpacity, SectionList,
  View, ActivityIndicator, TextInput, Image, Modal, TouchableHighlight, Dimensions} from 'react-native';
import NavigationService from "../../../../NavigationService";
import { Icon } from "native-base";

import axios from "../../../../Api";
import {res, T} from "../../../../helpers";

import MealItem from './MealItem';

import { inject, observer } from 'mobx-react';

@inject('CartStore')
@observer
export default class CompanyDetail extends Component {

  constructor(props) {
    super(props);
    this.company = props.navigation.getParam('item');
  }

  state = {
    menu: [],
    loading: true,
  };

  async componentDidMount() {
    this.getMenu();
  }

  getMenu = async () => {
    this.setState({
      loading: true,
    });

    try {
      const { data } = await axios.post('api/menu', {
        branchId: this.company.id
      });

      const lng = 'tr_TR';
      let menu = [];

      data.map((section) => {
        let title = '';
        let data = [];

        // Set category title according to language
        section.mealCatInLangList.map((rawTitle) => {
          if(rawTitle.language.languageTag === lng){
            title = rawTitle.name;
          }
        });

        // Set menu items according to language
        section.meals.map((meal) => {
          let newMeal = {
            ...meal,
            title: ''
          };

          meal.mealInLangList.map((rawTitle) => {
            if(rawTitle.language.languageTag === lng){
              newMeal.title = rawTitle.name;
            }
          });

          data.push(newMeal);

        });

        let newSection = {
          title,
          data
        };

        menu.push(newSection);
      });

      this.setState({
        menu,
        loading: false,
      });

    }catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <View style={s.container}>
        <SectionList
          sections={this.state.menu}
          keyExtractor={(item, index) => item + index}
          stickySectionHeadersEnabled={false}
          renderItem={({ item }) => <MealItem {...this.props} item={item} />}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={s.header}>{title}</Text>
          )}
        />
      </View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 32,
    marginHorizontal: res(10),
    marginTop: res(20),
    color: '#000'
  }

});