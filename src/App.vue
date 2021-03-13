<!-- Template - HTML -->
<template>
<div id="app">
  <web-header></web-header>

  <!-- Replacing the PageContent component with router-view here -->
  <!-- <page-content-props></page-content-props> -->
  <router-view></router-view>

</div>
</template>

<!-- Script - JavaScript -->
<script>
// Register Locally
import Header from './components/Header.vue'
//import PageContent from './components/PageContent.vue' // Step 3: Remove the import statement for PageContent in App.vue

export default {
  data() {
    return {

    }
  },
  // mtds
  methods: {

  },
  //Register Locally
  components: {
    'web-header': Header,
    //'page-content-props': PageContent,
  }
}
</script>

<!-- Style - CSS -->
<style>

</style>
