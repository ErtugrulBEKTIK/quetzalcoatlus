import React, { Component } from 'react';

import {Button, Content, Input, Item, Spinner, Text, Icon, Label} from "native-base";
import {Formik} from "formik";
import {res} from '~/helpers';

import axios from '~/Api';
import validations from './validations';


import {inject} from 'mobx-react';

@inject('AuthStore')
export default class SignUpForm extends Component {
  _handleSubmit = async (data, bag) => {
    try {
      const response = await axios.post('api/registerPersonal',
        data
      );
      bag.setSubmitting(false);
      bag.resetForm({});

      alert('Kayıt Başarılı');

    }catch (e) {
      bag.setSubmitting(false);
      console.log(e);
      alert('Kayıt başarısız tekrar deneyin.');
    }
  };


  render() {
    return (
      <Formik
        initialValues={{
          name: '',
          surname: '',
          username: '',
          email: '',
          password: '',
          passwordConfirm: ''
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
            isSubmitting
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

            <Button
              block
              disabled={!isValid || isSubmitting}
              onPress={handleSubmit}
              style={{marginTop: 10}}>

              { isSubmitting && <Spinner size={'small'} color={'white'} /> }
              <Text>Gönder</Text>
            </Button>
          </React.Fragment>
        )}
      </Formik>
    );
  }

}
