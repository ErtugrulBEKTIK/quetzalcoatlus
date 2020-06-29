import React, { Component } from 'react';
import { TouchableOpacity, Modal, ScrollView, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {Button, Content, Input, Item, Spinner, Text, Icon, Label, CheckBox, Body} from "native-base";
import {Formik} from "formik";
import {res} from '~/helpers';

import axios from '~/Api';
import validations from './validations';
import Terms from '../Terms';


import {inject} from 'mobx-react';
import {StyleSheet} from "react-native";
import _ from "lodash";
import SmsConfirmation from "~/screens/Auth/SignUp/SmsConfirmation";

@inject('AuthStore')
export default class SignUpForm extends Component {

  state = {
    types: [],
    loading: true,
    termsModal: false,
    smsConfirm:false,
    userName: '',
  }


  componentDidMount() {
    this.getCompanyTypes()
  }

  getCompanyTypes = async () => {
    try {

      const {data} = await axios.post('api/companyTypes');

      let types = [];

      data.map((item) => {

        types.push({
          label: item.name,
          value: item.id
        });

      });

      this.setState({
        types,
        loading: false
      });

    }catch (e) {
      console.log(e);
    }

  }


  _handleSubmit = async (data, bag) => {
    try {
      const response = await axios.post('api/registerCorporate',
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

    const { types, loading } = this.state;

    return (
      <>
        <Formik
          initialValues={{
            companyTypeId: '',
            companyName: '',
            email: '',
            phoneNumber: '',
            username: '',
            password: '',
            terms: false,
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

              <Item error={errors.companyTypeId && touched.companyTypeId}

                    style={{marginTop: res(10)}}>
                <Label>Şirket Türü</Label>
                <RNPickerSelect
                  value={values.companyTypeId}
                  disabled={loading}
                  doneText="Kapat"
                  useNativeAndroidPickerStyle={false}
                  placeholder={{label: loading ? 'Yükleniyor...' : 'Seçiniz'}}
                  textInputProps={{style: s.input}}
                  onValueChange={(value) => { setFieldValue('companyTypeId', value)}}
                  items={types}
                />

                { (errors.companyTypeId && touched.companyTypeId) && <Icon style={{fontSize: res(17)}} name='close-circle' />}
              </Item>
              <Item error={errors.companyName && touched.companyName}
                    floatingLabel
                    style={{marginTop: res(10)}}>
                <Label>Şirket Adı</Label>
                <Input
                  returnKeyType={'next'}
                  onSubmitEditing={() => this.phoneRef._root.focus()}
                  onChangeText={handleChange('companyName')}
                  value={values.companyName}
                  onBlur={() => setFieldTouched('companyName')}
                />

                { (errors.companyName && touched.companyName) && <Icon style={{fontSize: res(17)}} name='close-circle' />}
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
                    getRef={ref => this.phoneRef = ref}
                    returnKeyType={'next'}
                    keyboardType='number-pad'
                    onSubmitEditing={() => this.usernameRef._root.focus()}
                    onChangeText={handleChange('phoneNumber')}
                    value={values.phoneNumber}
                    onBlur={() => setFieldTouched('phoneNumber')}
                />

                { (errors.phoneNumber && touched.phoneNumber) && <Icon style={{fontSize: res(17)}} name='close-circle' />}
              </Item>

              <Item error={errors.password && touched.password}
                    floatingLabel
                    style={{marginTop: res(10)}}>
                <Label>Şifre</Label>
                <Input
                  getRef={ref => this.passwordRef = ref}
                  returnKeyType={'go'}
                  onSubmitEditing={handleSubmit}
                  onChangeText={handleChange('password')}
                  value={values.password}
                  onBlur={() => setFieldTouched('password')}
                  autoCapitalize={'none'}
                  secureTextEntry={true}
                />

                { (errors.password && touched.password) && <Icon style={{fontSize: res(17)}} name='close-circle' />}
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

      </>
    );
  }

}
const s = StyleSheet.create({
  button: {
    marginTop: res(30),
    backgroundColor: '#003d58',
    borderRadius: res(5),
  },
  input: {
    height: res(40),
    marginLeft: res(5),
    paddingHorizontal: res(5),
  }
});
