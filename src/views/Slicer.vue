<template>
	<v-container fluid>
		<v-row class="pt-2 ">
			<v-col cols="4" class="pa-0">
				<v-text-field v-model.number="cutFactor" label="Facteur de coupe">
					<v-icon slot="append" color="red" > mdi-plus </v-icon>
					<v-icon slot="prepend" color="green"> mdi-minus </v-icon>
				</v-text-field>
			</v-col>
			<v-col cols="2">
				<v-btn :disabled="chosenViruses.length===0" color="accent"  @click="cut" block>Couper</v-btn>
			</v-col>
			<v-col cols="4" class="pa-0">
				<v-text-field v-model.number="nbMutation" label="Nombre de mutations">
					<v-icon slot="append" color="red" > mdi-plus </v-icon>
					<v-icon slot="prepend" color="green"> mdi-minus </v-icon>
				</v-text-field>
			</v-col>
			<v-col cols="2">
				<v-btn :disabled="chosenViruses.length===0" color="accent" @click="mutation()" block>Muter</v-btn>
			</v-col>
		</v-row>

		<v-row>
			<v-col>
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
			</v-col>
		</v-row>

		<v-row>
			<v-col cols="4" class="pa-0">
				<v-text-field v-model.number="cutFactor" label="Facteur de coupe">
					<v-icon slot="append" color="red" > mdi-plus </v-icon>
					<v-icon slot="prepend" color="green"> mdi-minus </v-icon>
				</v-text-field>
			</v-col>
			<v-col cols="2">
				<v-btn :disabled="chosenViruses.length===0" color="accent"  @click="cut" block>Couper</v-btn>
			</v-col>
			<v-col cols="4" class="pa-0">
				<v-text-field v-model.number="nbMutation" label="Nombre de mutations">
					<v-icon slot="append" color="red" > mdi-plus </v-icon>
					<v-icon slot="prepend" color="green"> mdi-minus </v-icon>
				</v-text-field>
			</v-col>
			<v-col cols="2">
				<v-btn :disabled="chosenViruses.length===0" color="accent" @click="mutation()" block>Muter</v-btn>
			</v-col>
		</v-row>
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
