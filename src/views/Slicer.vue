<template>
	<div>
		<h1>Labo</h1>
		<table border="0">
			<tr>
				<td><h1>Viruses</h1></td>
			</tr>
			<tr>
				<td>
					<CheckedList :fields="['name','code']" :entries="$store.state.samples" @chosen-changed="chosenViruses = $event" />
				</td>
			</tr>
		</table>
		<label for="cut">part length: </label><input id="cut" v-model.number="cutFactor">
		<button :disabled="chosenViruses.length===0" @click="cut">Cut</button>

		<label for="mute">nb mutations: </label><input id="mute" v-model.number="nbMutation">
		<button :disabled="chosenViruses.length===0" @click="mutation()">Mutation</button>

		<hr/>
		<button @click="$router.push({path:'/labo/mix'})">Go to mixer</button>
	</div>
</template>

<script>
	import CheckedList from '../components/CheckedList.vue'

	export default {
		name: 'Slicer',
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
			cut() {
				this.$store.dispatch('slicer_cut', {factor: this.cutFactor, viruses: this.chosenViruses});
				this.chosenViruses=[]
			},

			mutation : function() {
				this.$store.dispatch('slicer_mutate', {nb: this.nbMutation, viruses: this.chosenViruses});
				this.chosenViruses=[]

				/*if (this.nbMutation == 0) return;

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
				});*/
			}
		}
	}
</script>

<style scoped>
</style>
