import {observable, action} from 'mobx';
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';
import {T} from '../helpers';


class CartStore{
  @observable cartList = [];

  @action addItem(item){
    // const user = AsyncStorage.getItem('user');

    if(_.find(this.cartList, { id: item.id})){

      this.cartList.map((cartItem) => {
        if(cartItem.id === item.id){
          cartItem.count += 1
        }
      })
    }else{
      this.cartList = [
        ...this.cartList,
        {
          ...item,
          count: 1
        },
      ];
    }

  }

  @action increase(id){
    this.cartList.map((cartItem) => {
      if(cartItem.id === id){
        cartItem.count += 1
      }
    })
  }

  @action decrease(id){
    this.cartList.map((cartItem) => {
      if(cartItem.id === id){
        cartItem.count -= 1;

        if(cartItem.count < 1){
          this.cartList = this.cartList.filter(item => item.id !== id)
        }
      }
    })
  }

}

export default new CartStore();