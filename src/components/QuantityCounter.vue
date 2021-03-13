<template>
  <div id="counter">
    <button type = "button" v-on:click="decrease"> - </button>
    {{ counter }}
    <button type="button" v-on:click="increase"> + </button>
  </div>
</template>


<script>
export default {
  props: ['item'],

  data() {
    return {
      counter: 0,
    }
  },

  methods: {
    decrease: function() {
      if (this.counter > 0) {
        this.counter--;
      } else {
        // else, counter will not decrement
        this.counter;
      }
      this.$emit('counter', this.item, this.counter);
    },

    increase: function() {
      if (this.counter < 10) {
        this.counter++;
      } else {
        alert("You cannot buy more than 10 items.");
      }
      this.$emit('counter', this.item, this.counter);
    },
  },
}
</script>


<style scoped>
    button{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    text-align: center;
    background-color: #f0ccca;
    font-size:24px;
    border-radius: 5px;
    width:35px;
    }
</style>
