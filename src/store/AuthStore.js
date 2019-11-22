import {observable, action} from 'mobx';
import AsyncStorage from '@react-native-community/async-storage';

// navigation service
import NavigationService from '../NavigationService';

class AuthStore{
  @observable token = null;
  @observable user = {
    Name: '',
    Eposta: '',
    ProfilResmi: 'https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png',
  };

  @action async saveUser(auth){
    try{
      await AsyncStorage.setItem('token', auth.Tokenkey);
      await AsyncStorage.setItem('user', JSON.stringify(auth));
      await this.setupAuth();
    }catch (e) {
      console.log(e);
    }
  }

  @action async removeUser(){
    try{
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      this.token = null;
      this.user = null;
      await this.setupAuth();
    }catch (e) {
      console.log(e);
    }
  }

  @action async setupAuth(){
    await this.getToken();
    await this.getUser();
  }

  @action async getToken(){
    try{
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        NavigationService.navigate('Auth');
        return false;
      }

      this.token = token;
      NavigationService.navigate('App');
    }catch (e) {
      console.log(e);
    }
  }

  @action async getUser(){
    try{
      const user = await AsyncStorage.getItem('user');
      if (!user) {
        NavigationService.navigate('Auth');
        return false;
      }

      this.user = JSON.parse(user);
      NavigationService.navigate('App');
    }catch (e) {
      console.log(e);
    }
  }
}

export default new AuthStore();