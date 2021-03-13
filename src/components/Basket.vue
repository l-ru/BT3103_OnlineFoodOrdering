<template>
<div>
  <p><strong> Menu: </strong></p>
  <!-- itemsSelected will be a list of item names
      and its corresponding Quantity -->
  <!-- Iterate through the list itemsSelected in Basket.vue and
      display each item name as a list item of an unordered list. -->
  <ul id="itemsList">
    <li id="menu-list" v-for="item in itemsSelected" v-bind:key="item.name">
      {{ item[0] }} x {{ item[1] }}
    </li>
  </ul>

  <button type="button" v-on:click="showTotal = !showTotal; sendOrder()"> Add Order </button>
  <br>
  <br>
  <p v-show="showTotal"> Subtotal: <strong>${{ findTotal() }}</strong></p>
  <p v-show="showTotal"> Grand Total: <strong>${{ finalPrice }}</strong></p>

</div>
</template>


<script>
import database from '../firebase.js' // Activity4 Step 1 - Importing database

export default {
  props: ['itemsSelected'],

  data() {
    return {
      showTotal: false,
    }
  },

  methods: {
    // fn that finds the subtotal of the orders
    findTotal: function() {
      var total = 0;
      for (let i = 0; i < this.itemsSelected.length; i++) {
        const curr_item = this.itemsSelected[i];
        total += parseFloat(curr_item[1]) * parseFloat(curr_item[2]);
      }
      return total;
    },

    // fn that sends the current order in the basket to a
    // collection in firebase called "orders"
    sendOrder: function() {
      //let foodItems - [];
      let foodItems = [
        { name: "Prawn omelette", qty: 0 },
        { name: "Dry Beef Hor Fun", qty: 0 },
        { name: "Sambal KangKung", qty: 0 },
        { name: "Pork Fried Rice", qty: 0 },
        { name: "Mapo Tofu", qty: 0 },
        { name: "Cereal Prawn", qty: 0 }
      ];

      for (let i = 0; i < this.itemsSelected.length; i++) {
        var curr_item = this.itemsSelected[i];
        /*
        foodItems.push({
          name: curr_item[0],
          qty: curr_item[1]
        });
      } */
        //console.log(this.foodItems);
        for (let j = 0; j < foodItems.length; j++) {
          // To compare name
          var item = foodItems[j];
          console.log(item.name);

          if (curr_item[0] == item.name) {
            var orderedList = {};
            orderedList['name'] = curr_item[0];
            orderedList['qty'] = curr_item[1];
            foodItems[j] = orderedList; // to update the qty of foodItems
            console.log(foodItems);
          }
        }
      }

      database.collection('orders').add(
        {foodItems}
      ).then(() => {
        // to auto reload the page
        location.reload(),
        console.log("New order saved to database.")
      });
    },

  },

  computed: {
    finalPrice() {
      var final = parseFloat(this.findTotal() * 1.07).toFixed(2);
      return final;
    }
  }
}
</script>


<style scoped>
button {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  display: in-inline-block;
  text-align: center;
  background-color: #f0ccca;
  font-size: 14px;
  border-radius: 5px;
}

p {
  font-size: 20px;
}

#menu-list {
  font-size: 20px;
}
</style>
