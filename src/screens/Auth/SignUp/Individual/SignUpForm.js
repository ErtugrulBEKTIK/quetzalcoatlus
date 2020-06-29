import React, { Component } from 'react';

import {Button, Content, Input, Item, Spinner, Text, Icon, Label, CheckBox} from "native-base";
import {Formik} from "formik";
import {res} from '~/helpers';

import axios from '~/Api';
import validations from './validations';


import {inject} from 'mobx-react';
import {StyleSheet} from "react-native";
import Terms from "~/screens/Auth/SignUp/Terms";
import SmsConfirmation from "~/screens/Auth/SignUp/SmsConfirmation";

@inject('AuthStore')
export default class SignUpForm extends Component {

    state = {
        smsConfirm:false,
        userName: '',
    }

  _handleSubmit = async (data, bag) => {
      console.log(JSON.stringify(data));
    try {
      const response = await axios.post('api/registerPersonal',
        data
      );
      bag.setSubmitting(false);
      bag.resetForm({});

      this.setState({smsConfirm:true, userName:data.username})


    }catch (e) {
      bag.setSubmitting(false);
      console.log(e);
      alert('Kayıt başarısız tekrar deneyin.');
    }
  };

    setSignUpSmsConfirm = (smsConfirm) => {
        this.setState({smsConfirm:smsConfirm})
    }


  render() {
      const { smsConfirm } = this.state;

    return (
      <Formik
        initialValues={{
          name: '',
          surname: '',
          username: '',
          email: '',
          phoneNumber: '',
          password: '',
          passwordConfirm: '',
          terms: false
        }}
        onSubmit={this._handleSubmit}
        validationSchema={validations}
      >
        {({
            values,
            handleChange,
            handleSubmit,
            errors,
            touched,
            setFieldTouched,
            isValid,
            isSubmitting,
            setFieldValue
          }) => (
          <React.Fragment>
            <Item error={errors.name && touched.name}
                  floatingLabel
                  style={{marginTop: res(10)}}>
              <Label>Ad</Label>
              <Input
                returnKeyType={'next'}
                onSubmitEditing={() => this.surnameRef._root.focus()}
                onChangeText={handleChange('name')}
                value={values.name}
                onBlur={() => setFieldTouched('name')}
              />

              { (errors.name && touched.name) && <Icon style={{fontSize: res(17)}} name='close-circle' />}
            </Item>
            <Item error={errors.surname && touched.surname}
                  floatingLabel
                  style={{marginTop: res(10)}}>
              <Label>Soyad</Label>
              <Input
                getRef={ref => this.surnameRef = ref}
                returnKeyType={'next'}
                onSubmitEditing={() => this.usernameRef._root.focus()}
                onChangeText={handleChange('surname')}
                value={values.surname}
                onBlur={() => setFieldTouched('surname')}
                autoCapitalize='characters'
              />

              { (errors.surname && touched.surname) && <Icon style={{fontSize: res(17)}} name='close-circle' />}
            </Item>
            <Item error={errors.username && touched.username}
                  floatingLabel
                  style={{marginTop: res(10)}}>
              <Label>Kullanıcı adı</Label>
              <Input
                getRef={ref => this.usernameRef = ref}
                returnKeyType={'next'}
                onSubmitEditing={() => this.emailRef._root.focus()}
                onChangeText={handleChange('username')}
                value={values.username}
                onBlur={() => setFieldTouched('username')}
                autoCorrect={false}
                autoCapitalize={'none'}
              />

              { (errors.username && touched.username) && <Icon style={{fontSize: res(17)}} name='close-circle' />}
            </Item>

            <Item error={errors.email && touched.email}
                  floatingLabel
                  style={{marginTop: res(10)}}>
              <Label>Eposta</Label>
              <Input
                getRef={ref => this.emailRef = ref}
                returnKeyType={'next'}
                keyboardType='email-address'
                onSubmitEditing={() => this.passwordRef._root.focus()}
                onChangeText={handleChange('email')}
                value={values.email}
                onBlur={() => setFieldTouched('email')}
                autoCorrect={false}
                autoCapitalize={'none'}
              />

              { (errors.email && touched.email) && <Icon style={{fontSize: res(17)}} name='close-circle' />}
            </Item>

              <Item error={errors.phoneNumber && touched.phoneNumber}
                    floatingLabel
                    style={{marginTop: res(10)}}>
                  <Label>Telefon Numarası</Label>
                  <Input
                      returnKeyType={'next'}
                      keyboardType='number-pad'
                      onSubmitEditing={() => this.passwordRef._root.focus()}
                      onChangeText={handleChange('phoneNumber')}
                      value={values.phoneNumber}
                      onBlur={() => setFieldTouched('phoneNumber')}
                      autoCorrect={false}
                      autoCapitalize={'none'}
                  />

                  { (errors.phoneNumber && touched.phoneNumber) && <Icon style={{fontSize: res(17)}} name='close-circle' />}
              </Item>

            <Item error={errors.password && touched.password}
                  floatingLabel
                  style={{marginTop: res(10)}}>
              <Label>Şifre</Label>
              <Input
                getRef={ref => this.passwordRef = ref}
                returnKeyType={'next'}
                onSubmitEditing={() => this.passwordConfirmRef._root.focus()}
                onChangeText={handleChange('password')}
                value={values.password}
                onBlur={() => setFieldTouched('password')}
                autoCapitalize={'none'}
                secureTextEntry={true}
              />

              { (errors.password && touched.password) && <Icon style={{fontSize: res(17)}} name='close-circle' />}
            </Item>

            <Item error={errors.passwordConfirm && touched.passwordConfirm}
                  floatingLabel
                  style={{marginTop: res(10)}}>
              <Label>Şifre Tekrar</Label>
              <Input
                getRef={ref => this.passwordConfirmRef = ref}
                returnKeyType={'go'}
                onChangeText={handleChange('passwordConfirm')}
                value={values.passwordConfirm}
                onBlur={() => setFieldTouched('passwordConfirm')}
                autoCapitalize={'none'}
                secureTextEntry={true}
              />

              { (errors.passwordConfirm && touched.passwordConfirm) && <Icon style={{fontSize: res(17)}} name='close-circle' />}
            </Item>
            <Item error={errors.terms}
                  style={{marginTop: res(15), paddingBottom: res(10)}}>
              <CheckBox
                checked={values.terms}
                onPress={() => { setFieldValue('terms', !values.terms)}}
                color="green"/>
              <Terms />

              { (errors.terms && touched.terms) && <Icon style={{fontSize: res(17)}} name='close-circle' />}
            </Item>
            <Button
              block
              disabled={!isValid || isSubmitting}
              onPress={handleSubmit}
              style={s.button}>

              { isSubmitting && <Spinner size={'small'} color={'white'} /> }
              <Text>Devam</Text>
            </Button>
              <SmsConfirmation userName={this.state.userName} smsConfirm={this.state.smsConfirm} setSignUpSmsConfirm={(smsConfirm) =>this.setSignUpSmsConfirm(smsConfirm)}></SmsConfirmation>

          </React.Fragment>
        )}
      </Formik>
    );
  }

}
const s = StyleSheet.create({
  button: {
    marginTop: res(30),
    backgroundColor: '#003d58',
    borderRadius: res(5),
  },
});
