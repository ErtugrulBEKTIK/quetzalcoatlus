import React, { Component } from 'react';
import {Text, Image, View, ScrollView, KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import { Segment, Button } from 'native-base';
import s from './styles';

import SignUpFormInd from './Individual/SignUpForm';
import SignUpFormComp from './Company/SignUpForm';
import {inject, observer} from 'mobx-react';
import {res} from "~/helpers";

@inject('AuthStore')
@observer
export default class SignUp extends Component {
  state = {
    individualForm: true
  }

  async componentDidMount() {
    await this.props.AuthStore.setupAuth();
  }

  render() {
    const {individualForm} = this.state;
    return (
      <View style={s.container}>
        <View style={s.headBackground} />
        <View style={s.logoContainer}>
          <Segment style={style.segment} containerStyle={style.segmentContainer}>
            <Button
              first
              onPress={() => {this.setState({individualForm: true}) }}
              style={[style.segmentButton, {backgroundColor: individualForm  ?  '#003d58' : 'white' }]}>
              <Text style={{color: individualForm ?  'white' : '#003d58'}}>Bireysel</Text>
            </Button>
            <Button
              last
              onPress={() => {this.setState({individualForm: false}) }}
              style={[style.segmentButton, {backgroundColor: individualForm ? 'white' : '#003d58' }]}>
              <Text style={{color: individualForm ?  '#003d58' : 'white'}}>Restorant</Text>
            </Button>
          </Segment>
        </View>

        <KeyboardAvoidingView behavior={"padding"} enabled={Platform.OS === 'ios'}>
          <ScrollView contentContainerStyle={s.scrollView} s>
            <View style={s.loginArea}>
              <Text style={s.loginAreaTitle}>Kayıt Ol</Text>
              {
                individualForm ?
                  <SignUpFormInd/>
                  : <SignUpFormComp/>
              }

            </View>
            <View style={{marginTop: 300}}/>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}



const style = StyleSheet.create({
  segmentContainer: {
    borderColor: '#f79b2e',
  },
  segment: {
    backgroundColor: '#f79b2e',
    borderColor: '#005656',
  },
  segmentButton: {
    backgroundColor: '#005656',
    borderColor: '#005656',
    padding: res(5)
  }
});
