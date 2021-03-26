<template>
	<v-container fluid>
		<v-data-table show-select item-key="key" v-model="chosenViruses" :headers="header" :items="data" :items-per-page="-1" class="elevation-1" >
			<template v-slot:item.name="{ item }">
				{{ item.name | capitalize }}
			</template>

			<template v-slot:item.code="{ item }">
				<v-chip class="ml-1 mt-1 mb-2" small v-for="(letter, index) in item.code" :key="item.code+'_'+index+'_'+letter" :color="getCodeLetterColor(letter)" dark >
					{{letter}}
				</v-chip>
			</template>

			<template v-slot:item.mortalite="{ item }">
				<v-chip :color="getMortaliteLevel(item.mortalite)" dark >
					{{ item.mortalite }}
				</v-chip>
			</template>
		</v-data-table>

		<label for="cut">part length: </label><input id="cut" v-model.number="cutFactor">
		<button :disabled="chosenViruses.length===0" @click="cut">Cut</button>

		<label for="mute">nb mutations: </label><input id="mute" v-model.number="nbMutation">
		<button :disabled="chosenViruses.length===0" @click="mutation()">Mutation</button>

		<hr/>
		<button @click="$router.push({path:'/labo/mix'})">Go to mixer</button>
	</v-container>
</template>

<script>
	export default {
		name: 'Slicer',
		data : () => {
			return {
				chosenViruses:[],
				cutFactor: 5,
				nbMutation : 10,

				header: [
					{
						text: 'Virus',
						align: 'start',
						sortable: false,
						value: 'name',
					},
					{ text: 'Code', value: 'code' },
					{ text: 'Mortalite', value: 'mortalite' },
				]
			}
		},
		computed: {
			data() {
				let i=0
				return this.$store.state.samples.map(x=>{
					x.key = i+x.name+x.code
					i++
					return x
				})
			}
		},
		methods: {
			cut() {
				console.log(this.chosenViruses)
				this.$store.dispatch('slicer_cut', {factor: this.cutFactor, viruses: this.chosenViruses.map(x=>{
					return this.$store.state.samples.indexOf(x)
				})});
				this.chosenViruses=[]
			},

			mutation : function() {
				this.$store.dispatch('slicer_mutate', {nb: this.nbMutation, viruses: this.chosenViruses.map(x=>{
					return this.$store.state.samples.indexOf(x)
				})});
				this.chosenViruses=[]
			},

			getMortaliteLevel(level) {
				if(level>=15) return "purple"
				if(level>=10) return "red"
				if(level>=5) return "orange"
				if(level>0) return "green"
				return "black"
			},
			getCodeLetterColor(letter) {
				if(letter==="A") return "red"
				if(letter==="B") return "orange"
				if(letter==="C") return "green"
				if(letter==="D") return "blue"
				if(letter==="E") return "purple"

				return "black"
			}
		}
	}
</script>

<style scoped>
</style>
