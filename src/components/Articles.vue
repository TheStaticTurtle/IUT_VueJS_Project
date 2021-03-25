<template>
  <div>
    <table>
      <tr><td>Name</td><td>Code</td><td>% Mortality</td></tr>
      <tr v-for="(v,index) in collec" :key="index"><td>{{v.name}}</td><td>{{v.code}}</td><td>{{v.mortalite}}</td><td> <button @click="$router.push({path: '/library/addbasket?name='+v.name+'&code='+v.code})">Clone virus for the lab</button></td></tr>
    </table>
  </div>
</template>

<script>

  export default {
    name: 'Articles',
    props: ['collec']
  }
</script>

<style scoped>
</style>
