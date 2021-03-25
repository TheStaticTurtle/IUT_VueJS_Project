<template>
  <div>
    <table>
      <tr>
        <td>
          <p v-for="(e,index) in entries" :key="index">
            <input type="checkbox" :id="index" :value="index" v-model="chosenEntries" @change="$emit('chosen-changed',chosenEntries)">
            <label for="index"><span v-for="(f,index) in fields" :key="index">{{e[f]}} </span></label>
          </p>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>

  export default {
    name: 'CheckedList',
    props: ['entries','fields'],
    data : () => {
      return {
        chosenEntries:[]
      }
    }
  }
</script>

<style scoped>
</style>
