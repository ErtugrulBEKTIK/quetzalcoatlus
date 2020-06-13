import {observable, action} from 'mobx';
import _ from 'lodash';
import axios from "~/Api";


class WaiterCartStore{
  @observable cartList = {};
  @observable tableId = null;

  @action addItem(item){

    if(_.find(this.cartList[this.tableId], { id: item.id})){

      this.cartList[this.tableId].map((cartItem) => {
        if(cartItem.id === item.id){
          cartItem.count += 1
        }
      })
    }else{
      this.cartList[this.tableId] = [
        ...this.cartList[this.tableId],
        {
          ...item,
          count: 1
        },
      ];
    }

  }

  @action increase(id){
    this.cartList[this.tableId].map((cartItem) => {
      if(cartItem.id === id){
        cartItem.count += 1
      }
    })
  }

  @action decrease(id){
    this.cartList[this.tableId].map((cartItem) => {
      if(cartItem.id === id){
        cartItem.count -= 1;

        if(cartItem.count < 1){
          this.cartList[this.tableId] = this.cartList[this.tableId].filter(item => item.id !== id)
        }
      }
    })
  }

  @action setTableId(id){
    this.tableId = id;

    if(!(id in this.cartList)){
      this.cartList[id] = [];
    }

  }


  @action async order(userId){
    try {


      let postData = {
        userId,
        tableId: this.tableId,
        mealId: [],
        menuId: [],
      };

      this.cartList[this.tableId].map((item) => {
        for(let i = 1; i <= item.count; i++){
          postData.menuId.push(item.id)
        }
      });

      const res = await axios.post('api/takeOrder', postData);

      console.log(res);
      this.cartList[this.tableId] = [];

      alert('Siparişiniz başarılı bir şekilde verilmiştir.');


    }catch (e) {
      console.log(e);
      alert('Sipariş verilirken hata meydana geldi.');
    }
  }

}

export default new WaiterCartStore();
