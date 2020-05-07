import React, { Component } from 'react';

import {Button, Label, Input, Item, Spinner, Text, Icon} from "native-base";
import {Formik} from "formik";
import {res} from '../../../helpers';

import axios from '../../../Api';
import validations from './validations';


import {inject} from 'mobx-react';

@inject('AuthStore')
export default class SignInForm extends Component {
  _handleSubmit = async ({ username, password }, bag) => {
    try {
      const { data } = await axios.post('api/login',
        {
          username,
          password,
        }
      );

      bag.setSubmitting(false);

      this.props.AuthStore.login(data);

    }catch (e) {
      bag.setSubmitting(false);
      console.log(e);
      alert('Giriş başarısız tekrar deneyin.');
    }
  };

  render() {
    return (
      <Formik
        initialValues={{
          username: 'deneme3',
          password: '123456'
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

              <Item error={errors.username && touched.username} floatingLabel>
                <Label>Kullanıcı adı</Label>
                <Input
                  returnKeyType={'next'}
                  onSubmitEditing={() => this.passwordRef._root.focus()}
                  onChangeText={handleChange('username')}
                  value={values.username}
                  onBlur={() => setFieldTouched('username')}
                  autoCorrect={false}
                  autoCapitalize={'none'}
                />

                { (errors.username && touched.username) && <Icon style={{fontSize: res(17)}} name='close-circle' />}
              </Item>

              <Item
                error={errors.password && touched.password}
                floatingLabel
                style={{marginTop: res(10)}}
              >
                <Label>Şifre</Label>
                <Input
                  getRef={ref => this.passwordRef = ref}
                  returnKeyType={'go'}
                  onChangeText={handleChange('password')}
                  value={values.password}
                  onBlur={() => setFieldTouched('password')}
                  autoCapitalize={'none'}
                  secureTextEntry={true}
                />

                { (errors.password && touched.password) && <Icon style={{fontSize: res(17)}} name='close-circle' />}
              </Item>

              <Button
                block
                disabled={!isValid || isSubmitting}
                onPress={handleSubmit}
                style={{marginTop: res(30)}}>

                { isSubmitting && <Spinner size={'small'} color={'white'} /> }
                <Text style={{fontSize: res(15)}}>GİRİŞ YAP</Text>
              </Button>

          </React.Fragment>
        )}
      </Formik>
    );
  }
}
