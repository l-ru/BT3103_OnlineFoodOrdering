<template>
<div>
  <ul>
    <li><router-link to="/" exact> Home </router-link></li>
    <li><router-link to="/orders" exact> Orders </router-link></li>
    <li><router-link to="/dashboard" exact> Dashboard </router-link></li>
  </ul>

  <div id = 'chart'>
    <barChart-component></barChart-component>
    <br>

    <div id = 'chart'>
      <lineChart-component></lineChart-component>
    </div>
  </div>

</div>
</template>


<script>
import BarChart from './charts/BarChart.vue'
import LineChart from './charts/LineChartAPI.vue'

export default {
  components: {
    'barChart-component': BarChart,
    'lineChart-component': LineChart,
  }
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

#chart {
  background-color: #9edae0;
  height: 85px;
  color: #333333;
  font-size: 45px;
  text-align: center;
  vertical-align: middle;
  line-height: 85px;      /* The same as the div height */
}
</style>
