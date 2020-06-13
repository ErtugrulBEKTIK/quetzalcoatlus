import React, { Component } from 'react';
import {StyleSheet, Text, SectionList,} from 'react-native';
import {Root} from 'native-base';
import {Container} from '~/components/my-base';
import axios from "~/Api";
import {res, T} from "~/helpers";
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
      const { data } = await axios.post('api/menuList', {
        branchId: this.company.id
      });

      const lng = 'tr_TR';
      let menu = [];


      const mapPromisses = data.map(async (section) => {
        let title = '';
        let data = [];

        // Set category title according to language
        section.menuCatInLangList.map((rawTitle) => {
          if(rawTitle.language.languageTag === lng){
            title = rawTitle.name;
          }
        });

        // Set menu items according to language
        const mapPromisses2 = section.menuList.map(async (meal) => {
          let newMeal = {
            ...meal,
            title: '',
          };

          meal.menuInLangList.map((rawTitle) => {
            if(rawTitle.language.languageTag === lng){
              newMeal.title = rawTitle.name;
            }
          });

          data.push(newMeal);

        });
        await Promise.all(mapPromisses2);

        let newSection = {
          title,
          data
        };

        menu.push(newSection);
      });

      Promise.all(mapPromisses).then(() => {
        this.setState({
          menu,
          loading: false,
        });

      });


    }catch (e) {
      console.log(e);
    }
  };

  getMealPhoto = async (id) => {

    const {data} = await axios.post('api/menuPhotograph', {
      menuId: id,
    }, {
      responseType: 'arraybuffer'
    });

    return 'data:image/png;base64,'+T.b2a(
      new Uint8Array(data)
        .reduce((data, byte) => data + String.fromCharCode(byte), '')
    );


  };

  render() {
    const { menu, loading} = this.state;
    return (
      <Container style={s.container} loading={loading} scroll>
        <Root>
          <SectionList
            sections={menu}
            keyExtractor={(item, index) => item + index}
            stickySectionHeadersEnabled={false}
            renderItem={({ item }) => <MealItem {...this.props} item={item} />}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={s.header}>{title}</Text>
            )}
          />
        </Root>
      </Container>
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
