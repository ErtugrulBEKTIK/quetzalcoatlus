import React, { Component } from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Icon, Content, Button, Left, Card, CardItem, Thumbnail, Body, Text} from 'native-base';


import { inject, observer } from 'mobx-react';

@inject('AuthStore')
@observer
export default class Main extends Component {

  render() {

    const {user} = this.props.AuthStore;

    return (
      <View style={s.container}>
        <Content>
          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Thumbnail source={require('~/assets/images/no-image.jpg')} />
                <Body>
                  <Text>{user.name} {user.surname}</Text>
                  <Text note>{user.mail}</Text>
                </Body>
              </Left>
            </CardItem>
          </Card>
        </Content>
      </View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  }
});
