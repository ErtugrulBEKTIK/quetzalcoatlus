import {observable, action} from 'mobx';
import axios from "~/Api";
import { T } from "~/helpers";


class MealStore{
  @observable mealList = [];
  @observable branchId = null;
  @observable loading = true;

  @action async setMealList(branchId){
    try {

      const {data} = await axios.post('api/menuList', {
        branchId
      });

      const lng = 'tr_TR';
      let generalMenu = [];

      const mapPromisses = data.map(async (section) => {
        if(!section.disabled) {
          let title = '';
          let data = [];

          // Set category title according to language
          section.menuCatInLangList.map((rawTitle) => {
            if (rawTitle.language.languageTag === lng) {
              title = rawTitle.name;
            }
          });

          // Set menu items according to language
          const mapPromisses2 = section.menuList.map(async (meal) => {
            let newMeal = {
              ...meal,
              title: ''
            };

            meal.menuInLangList.map((rawTitle) => {
              if (rawTitle.language.languageTag === lng) {
                newMeal.title = rawTitle.name;
              }
            });

            data.push(newMeal);

          });
          await Promise.all(mapPromisses2);

          let newSection = {
            title,
            data
          };

          generalMenu.push(newSection);

        }
      });

      Promise.all(mapPromisses).then(() => {
        this.mealList = generalMenu;
        this.branchId = branchId;
        this.loading = false;
      });

    }catch (e) {
      console.log(e);
    }
  }

}

const getMenuPhoto = async (id) => {

  const {data} = await axios.post('api/menuPhotograph', {
    menuId: id,
  }, {
    responseType: 'arraybuffer'
  });

  return 'data:image/png;base64,'+T.b2a(
    new Uint8Array(data)
      .reduce((data, byte) => data + String.fromCharCode(byte), '')
  );


};

export default new MealStore();
