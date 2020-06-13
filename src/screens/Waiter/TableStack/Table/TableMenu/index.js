import React, { Component } from 'react';
import {StyleSheet, Text,  SectionList, View } from 'react-native';
import {Container} from '~/components/my-base';
import { Root } from "native-base";
import {res, T} from "~/helpers";
import MealItem from './MealItem';
import { inject, observer } from 'mobx-react';

@inject('WaiterCartStore', 'MealStore')
@observer
export default class Menu extends Component {

  componentWillMount() {
    this.props.navigation.addListener('willFocus', payload => {
      console.log(payload);
    });
  }
  render() {

    const {mealList, loading} = this.props.MealStore;

    return (
      <Container style={s.container} loading={loading}>
        <Root>
          <SectionList
            sections={mealList.slice()}
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
