import React, { Component } from 'react';
import { View } from 'react-native';

import {inject} from 'mobx-react';

@inject('AuthStore', 'MealStore')
export default class UserTypeCheck extends Component {
  componentDidMount() {
    this.checkUserType()
  }

  checkUserType = () => {
    const { user } = this.props.AuthStore;

    let canTakeOrder = false;
    let hasCategory = false;

    user.type.roles.map((role) => {
      if(role.name === 'ROLE_TAKE_ORDER'){
        canTakeOrder = true;
      }
    })


    if(user.type.mealCategories.length > 0){
      hasCategory = true
    }

    if(canTakeOrder){
      const branchId = user.branches[0].id;
      this.props.MealStore.setMealList(branchId);
      this.props.navigation.navigate('Waiter')
    }else if(!canTakeOrder && hasCategory){
      this.props.navigation.navigate('Cook')
    }else {
      this.props.navigation.navigate('Costumer')
    }
  }

  render() {
    return (
      <View style={{ flex:1 }}/>
    );
  }
}
