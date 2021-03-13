<template>
  <div class="chart">
    <strong> Line Chart </strong>
    <line-chart></line-chart>
  </div>
</template>


<script>
import linechart from '../charts/LineChartAPI.js'

export default {
  components: {
    'line-chart': linechart,
  }
};
</script>


<style>
</style>
