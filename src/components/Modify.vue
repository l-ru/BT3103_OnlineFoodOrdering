<template>
<div>
  <br>

  <div v-for="(data, index) in datapacket" v-bind:key="index">
    <!-- for debugging -->
    <!-- {{ data }} <br><br> --> <!-- the entire document array for the selected order -->
    <p v-for="(food, index) in data" v-bind:key="index">
      <!-- {{ food }} <br><br> -->
      <!-- food Index: {{ index }} <br> -->
      {{ food.name }}: {{ food.qty }}

      <br>

      <input type="number" v-bind:id="index" placeholder=0 min="0" max="10"><br><br>

    </p>

    <button type="button" v-on:click="updateOrder()"> Update Order </button>

  </div>

</div>
</template>


<script>
import database from '../firebase.js' //Import database into Modify.vue

export default {

  data() {
    return {
      //Create a data property orders and set it to an array
      datapacket: [],
    }
  },


  // mtds
  methods: {
    // Fn to retrieve the order from firebase and set the data to a data property called datapacket
    fetchItems: function() {
      let doc_id = this.$route.params.id;
      database.collection('orders').doc(doc_id).get().then(snapshot => {
        this.datapacket = snapshot.data();
      });
    },

    // Fn that update the order
    updateOrder: function() {
      // make a copy of the Object datapacket
      var dataCopy = Object.assign({}, this.datapacket);
      //var dataCopy = JSON.parse(JSON.stringify(this.datapacket)); //OR
      console.log(dataCopy);
      //console.log("First food item name: " + dataCopy.foodItems[0].name);

      // to test out the input field on the index=0 food item
      //var inputValue = document.getElementById(0).value;
      //console.log("Input Qty for the first food: " + inputValue);

      // for loop to update the Object with the new values in the input fields
      for (let i = 0; i < this.datapacket.foodItems.length; i++) {
        var updatedQty = document.getElementById(i).value;

        if (updatedQty == "") {
          updatedQty = 0;
        } else {
          dataCopy.foodItems[i].qty = updatedQty;
        }
        console.log(updatedQty);
      }

      // send an update request with the new object to firebase, then push user back to '/orders'
      let doc_id = this.$route.params.id;
      database.collection('orders').doc(doc_id).update(dataCopy).then(() => {
        console.log("Order id = " + doc_id + " successfully updated."),

        // to push user back to '/orders'
        this.$router.push({path: '/orders/'})
      });
    },

  },


  // To use the created lifecycle hook and place fetchItems into it.
  created() {
    this.fetchItems();
  },

}

</script>


<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}

li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}

button {
  width: 150px;
  height: 35px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
  font-size: 16px;
}

input[type=number] {
  height: 20px;
  /* TO - Hide Arrows From Input Number */
  /* -moz-appearance: textfield; */
}
</style>
