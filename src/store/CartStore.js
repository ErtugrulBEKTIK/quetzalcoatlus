import {observable, action} from 'mobx';
import _ from 'lodash';
import axios from "~/Api";
import { T } from "~/helpers";


class CartStore{
  @observable cartList = [];
  @observable tableId = null;

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

  @action setTableId(id){
    this.tableId = id;
  }


  @action async order(userId){
    try {


      let postData = {
        userId,
        tableId: this.tableId,
        mealId: [],
      };

      this.cartList.map((item) => {
        for(let i = 1; i <= item.count; i++){
          postData.mealId.push(item.id)
        }
      });

      await axios.post('api/takeOrder', postData);

      this.cartList = [];

      alert('Siparişiniz başarılı bir şekilde verilmiştir.');


    }catch (e) {
      console.log(e);
      alert('Sipariş verilirken hata meydana geldi.');
    }
  }

}

export default new CartStore();