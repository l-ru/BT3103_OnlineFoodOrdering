<template>
<div>
  <header>
    <h1>{{ msg }}</h1>
  </header>
</div>
</template>


<script>
export default {
  data() {
    return {
      msg: "Jcheez's Zi Char"
    }
  }
}
</script>


<style scoped>
header {
  background: #b0e0e6;
  font-size: 120%;
  text-align: center;
}

h1 {
  color: black
}
</style>
