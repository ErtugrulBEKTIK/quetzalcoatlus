import {observable, action} from 'mobx';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import axios from '~/Api';
import {T} from '~/helpers';
import { API_USERNAME, API_PASSWORD, TOKEN_CREDENTIALS } from '~/../config';

// navigation service
import NavigationService from '~/NavigationService';


class AuthStore{
  @observable token = '';
  @observable tokenExp = '';
  @observable user = false;

  @action async setupAuth(){
    await this.setToken();
    await this.setUser();
  }

  @action async getToken(){
    try{
      const { data } = await axios.post('oauth/token',
        TOKEN_CREDENTIALS,
        {
          headers: {
            'Authorization': 'Basic ' + T.b2a(`${API_USERNAME}:${API_PASSWORD}`)
          }
        }
      );

      this.token = data.access_token;
      this.tokenExp = moment().add(data.expires_in, 'seconds').unix().toString();


      AsyncStorage.setItem('token', this.token);
      AsyncStorage.setItem('tokenExp', this.tokenExp);

      axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;

      return this.token;
    }catch (e) {
      console.log(e);
    }
  }

  @action async setToken(){
    try{
      const token = await AsyncStorage.getItem('token');
      const tokenExp = await AsyncStorage.getItem('tokenExp');


      const isExpired = moment().unix() > tokenExp;

      if (!token || !tokenExp || isExpired ) {
        await this.getToken();
      }else {
        this.token = token;
        this.tokenExp = tokenExp;

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }

      const the = this;
      axios.interceptors.request.use(async function (options) {
        // Check is it get token request
        if(options.url !== 'oauth/token'){
          // Check is token expired
          if(the.tokenExp < moment()){
          //  const token = await the.getToken();
          //  options.headers['Authorization'] = `Bearer ${token}`;
          }

        }

        return options;
      }, function (error) {
        console.log('Request error: ', error);
        return Promise.reject(error);
      });


    }catch (e) {
      console.log(e);
    }
  }

  @action async setUser(){
    try{
      const user = await AsyncStorage.getItem('user');
      this.user = JSON.parse(user);

      if(this.user){
        NavigationService.navigate('App')
      }else{
        NavigationService.navigate('Auth')
      }

    }catch (e) {
      console.log(e);
    }
  }

  @action setCapabilities(canTakeOrder, hasCategory){
    try{

      this.user = {
        ...this.user,
        canTakeOrder,
        hasCategory
      }

    }catch (e) {
      console.log(e);
    }
  }

  @action async login(user){
    try{
      console.log("login başladı");
      await AsyncStorage.setItem('user', JSON.stringify(user));
      console.log("login bitti");
      this.user = user;
      NavigationService.navigate('App')
    }catch (e) {
      console.log(e);
    }
  }


  @action async logout(){
    try{
      await AsyncStorage.setItem('user', JSON.stringify(false));
      this.user = false;
      NavigationService.navigate('Auth')
    }catch (e) {
      console.log(e);
    }
  }
}

export default new AuthStore();
