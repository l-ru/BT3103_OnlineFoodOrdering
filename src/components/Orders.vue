<template>
<div>
  <ul>
    <li><router-link to="/" exact> Home </router-link></li>
    <li><router-link to="/orders" exact> Orders </router-link></li>
    <li><router-link to="/dashboard" exact> Dashboard </router-link></li>
  </ul>


  <!-- <ul v-for="order in orders" v-bind:key="order.name"> -->
    <!-- <li v-for="food in order" v-bind:key="food.name"> -->
      <!-- for debugging -->
      <!-- {{ order }} <br><br> -->
      <!-- {{ food }} <br><br> -->
      <!-- <ul v-for="item in food" v-bind:key="item.name"> -->
        <!-- {{ item.name }}: {{ item.qty }} -->
      <!-- </ul> -->
    <!-- </li> -->
  <!-- </ul> -->

  <ul>
    <li v-for="order in orders" v-bind:key="order.name">
      <!-- for debugging -->
      <!-- {{ order }} <br><br> --> <!-- the entire document within orders db -->
      <!-- {{ order[0] }} <br><br> --> <!-- The doc id is the first element in the array -->
      <p v-for="food in order[1]" v-bind:key="food.name"> <!-- order[1] gets the doc.data() of the food items-->
        <!-- {{ food }} <br><br> -->
        {{ food.name }}: {{ food.qty }}
      </p>

      <button type="button" v-bind:id="order[0]" v-on:click="deleteItem($event)"> Delete </button>
      <button type="button" v-bind:id="order[0]" v-on:click="route($event)"> Modify </button>

    </li>
  </ul>


</div>
</template>


<script>
import database from '../firebase.js' //Import database into Orders.vue

export default {
  data() {
    return {
      //Create a data property orders and set it to an array
      orders: [],
    }
  },

  // mtds
  methods: {
    // Fn to get all the orders from the order collection and pushes it into the data property "orders"
    fetchItems: function() {
      database.collection('orders').get().then(snapshot => {
        let orderedItems = {};
        snapshot.docs.forEach(doc => {
          console.log(doc.id, " => ", doc.data().foodItems);
          orderedItems = [doc.id, doc.data().foodItems];
          this.orders.push(orderedItems);
        });
      });
    },

    // Fn to del data from firebase
    deleteItem: function(event) {
      let doc_id = event.target.getAttribute("id");
      database.collection('orders').doc(doc_id).delete().then(() => {
          // to auto reload the page
          location.reload(),
          console.log("Order id = " + doc_id + " successfully deleted.")
      });
    },

    // Fn to push the user to '/modify' and also sends the document id as one of the parameters
    route: function(event) {
      let doc_id = event.target.getAttribute("id");
      this.$router.push({path: `/modify/${doc_id}`});
    }

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
  width: 65px;
  height: 30px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
}
</style>
