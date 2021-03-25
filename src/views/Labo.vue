<template>
  <div>
    <h1>Labo</h1>
    <table border="1">
      <tr>
        <td>
          <keep-alive include="Mixer">
            <router-view name="locSubCentral" :parts="parts" :samples="samples" @store-virus="$emit('store-virus',$event)"></router-view>
          </keep-alive>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import {Virus, viruses} from '../model.js'

  export default {
    name: 'Labo',
    props: ['samples'],
    data : () => {
      return {
        parts : []
      }
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
      },
      mix : function() {
        let newCode="";

        let chosen = [...this.chosenParts]; // real copy so that we can splice on the copy
        let nb = chosen.length;
        for(let i=0;i<nb;i++) {
          // choose randomly a part among the selected ones
          let idx = Math.floor(Math.random() * chosen.length);
          let p = this.parts[chosen[idx]];
          newCode = newCode+p.code;
          chosen.splice(idx,1);
        }
        this.newVirus = new Virus(viruses.length,'mixedvirus',newCode);
        // remove chosen parts
        for(let i=this.chosenParts.length-1;i>=0;i--) {
          this.parts.splice(this.chosenParts[i],1);
        }
        // unselect all
        this.chosenParts.splice(0,this.chosenParts.length)
      }
    }
  }
</script>

<style scoped>
</style>
