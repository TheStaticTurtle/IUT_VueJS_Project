<template>
  <div>
    <h1>Labo</h1>
    <table border="0">
      <tr>
        <td><h1>Viruses</h1></td>
      </tr>
      <tr>
        <td>
          <CheckedList :fields="['name','code']" :entries="samples" @chosen-changed="chosenViruses = $event" />
        </td>
      </tr>
    </table>
    <label for="cut">part length: </label><input id="cut" v-model.number="cutFactor"><button :disabled="chosenViruses.length==0" @click="cut()">Cut</button>
    <label for="mute">nb mutations: </label><input id="mute" v-model.number="nbMutation"><button :disabled="chosenViruses.length==0" @click="mutation()">Mutation</button>
    <hr/>
    <button @click="$router.push({path:'/labo/mix'})">Go to mixer</button>
  </div>
</template>

<script>
  import CheckedList from '../components/CheckedList.vue'

  export default {
    name: 'Slicer',
    props: ['samples', 'parts'],
    data : () => {
      return {
        chosenViruses:[],
        cutFactor: 5,
        nbMutation : 10,
      }
    },
    components: {
      CheckedList
    },
    methods: {
      cut : function() {
        if (this.cutFactor == 0) return;
        this.chosenViruses.forEach(e => {
          let s = this.samples[e];
          for(let i=0;i<s.code.length;i+=this.cutFactor) {
            this.parts.push({code : s.code.substring(i,i+this.cutFactor)});
          }
        });
        // remove chosen viruses
        for(let i=this.chosenViruses.length-1;i>=0;i--) {
          this.samples.splice(this.chosenViruses[i],1);
        }
        // unselect all
        this.chosenViruses.splice(0,this.chosenViruses.length)
      },
      mutation : function() {
        if (this.nbMutation == 0) return;

        this.chosenViruses.forEach(e => {
          let newCode;
          let s = this.samples[e];
          for(let i=0;i<this.nbMutation;i++) {
            let idx = Math.floor(Math.random() * s.code.length);
            let chr =  String.fromCharCode(Math.floor(Math.random() * 4)+ "A".charCodeAt(0));
            newCode = s.code.substring(0,idx) + chr + s.code.substring(idx+1);
            s.code = newCode;
            s.updateCaracs();
          }
        });
      }
    }
  }
</script>

<style scoped>
</style>
