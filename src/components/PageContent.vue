<template>
<div>
  <ul id='itemsList'>
    <li><router-link to="/" exact> Home </router-link></li>
    <li><router-link to="/orders" exact> Orders </router-link></li>
    <li><router-link to="/dashboard" exact> Dashboard </router-link></li>
  </ul>

  <ul id='itemsList'>
    <li v-for="item in items" v-bind:key="item.name">
      <h2 id='itemName'> {{item.name}} </h2>
      <img v-bind:src="item.imageURL" />
      <h4 id='price'> ${{item.price}} </h4>
      <qtyCounterBtn v-bind:item="item" v-on:counter="onCounter"></qtyCounterBtn>
    </li>
  </ul>

  <basketItems id="shoppingBasket" v-bind:itemsSelected="itemsSelected"></basketItems>

</div>
</template>


<script>
// Register Locally
import Basket from './Basket.vue'

import database from '../firebase.js' // Activity3 Step 1 - Importing database

export default {

  data() {
    return {
      itemsSelected: [], // Create a data property itemsSelected as an empty list
      items: [], // Activity3 Step 2 - Create a data property 'items' and set it to an array
    }
  },

  //All mtds are defined here
  methods: {
    onCounter: function(item, count) {
      if (this.itemsSelected.length === 0 && count > 0) {
        //If there is nothing in items selected, push the ORDER in
        this.itemsSelected.push([item.name, count, item.price]);
        //console.log(this.itemsSelected);

      } else {
        // Loop through everything to check what is not in the basket
        for (let i = 0; i < this.itemsSelected.length; i++) {
          const curr_item = this.itemsSelected[i];
          const item_name = curr_item[0];

          // if item_name is the same as item.name and the count is more than 0, update this.itemsSelected
          if ((item_name === item.name) && count > 0) {
            this.itemsSelected.splice(i, 1);
            this.itemsSelected.splice(i, 0, [item.name, count, item.price]);
            //console.log(this.itemsSelected[i]);
            break;
          }

          // Next, item_name is the same as item.name and the count is 0, remove it from itemsSelected.
          else if ((item_name === item.name) && count === 0) {
            this.itemsSelected.splice(i, 1);
            //console.log(this.itemsSelected);
            break;
          }

          // otherwise, if the item is not in itemSelected, add it to itemsSelected by pushing the ORDER in.
          else if ((item_name != item.name)) {
            if (i != this.itemsSelected.length - 1) {
              continue;

            } else {
              this.itemsSelected.push([item.name, count, item.price]);
            }
            //console.log(this.itemsSelected);
          }
        }
      }
    },

    // Mtd to get all the dishes from the 'menu' collection and pushes it into the data property "items".
    fetchItems: function() {
      database.collection('menu').get().then(snapshot => {
        let item = {};
        snapshot.docs.forEach(doc => {
          //console.log(doc.data());
          item = doc.data();
          item.show = false;
          item.id = doc.id;
          this.items.push(item);
        });
      });
    },

  },

  // To use the created lifecycle hook and place fetchItems into it.
  created() {
    this.fetchItems();
  },

  //Register Locally
  components: {
    'basketItems': Basket,
  }

}
</script>


<style scoped>
#itemsList {
  width: 100%;
  max-width: 70%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
}

ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
  font-size: 24px; /* added style */
}

li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}

img {
  width: 135px;
  height: 135px;
}

#price {
  font-size: 30px;
}

#itemName {
  font-size: 30px;
}

#shoppingBasket {
  position: absolute;
  top: 23%;
  left: 78%;
}
</style>
