import React, { Component } from 'react';

import {Button, Label, Input, Item, Spinner, Text, Icon} from "native-base";
import {Formik} from "formik";

import {API_BASE} from '../../../Api';
import validations from './validations';


import axios from 'axios';
import {inject} from 'mobx-react';

@inject('AuthStore')
export default class SignInForm extends Component {
  _handleSubmit = async ({ username, password }, bag) => {
    try {
      const { data } = await axios.post(`${API_BASE}/authenticate`,
        {
          Username: username,
          UserPass: password,
          UserDeviceId: "0",
          apikey: '98B46602-DA8F-4DC8-9E71-6D8ABB9A2DFF'
        }
        );
      bag.setSubmitting(false);

      console.log(data);
      if (!data) {
        alert('Giriş bilgileri hatalı.');
        return false;
      }

      this.props.AuthStore.saveUser(data[0]);
    }catch (e) {
      bag.setSubmitting(false);
      bag.setErrors(e)
    }
  };

  render() {
    return (
      <Formik
        initialValues={{
          username: '',
          password: ''
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

                { (errors.username && touched.username) && <Icon style={{fontSize: 17}} name='close-circle' />}
              </Item>

              <Item
                error={errors.password && touched.password}
                floatingLabel
                style={{marginTop: 10}}
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

                { (errors.password && touched.password) && <Icon style={{fontSize: 17}} name='close-circle' />}
              </Item>

              <Button
                block
                disabled={!isValid || isSubmitting}
                onPress={handleSubmit}
                style={{marginTop: 30}}>

                { isSubmitting && <Spinner size={'small'} color={'white'} /> }
                <Text>Giriş Yap</Text>
              </Button>


          </React.Fragment>
        )}
      </Formik>
    );
  }
}