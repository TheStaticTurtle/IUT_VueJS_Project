<template>
	<v-container fluid>
		<v-row class="pt-2 ">
			<v-col cols="4" class="pa-0">
				<v-text-field
						v-model.number="cutFactor"
						append-icon="mdi-plus"
						@click:append="cutFactor++"
						prepend-icon="mdi-minus"
						@click:prepend="cutFactor = Math.max(cutFactor-1,1)"
						label="Facteur de coupe">
				</v-text-field>
			</v-col>
			<v-col cols="2">
				<v-btn :disabled="chosenViruses.length===0" color="accent"  @click="cut" block>Couper</v-btn>
			</v-col>
			<v-col cols="4" class="pa-0">
				<v-text-field
						v-model.number="nbMutation"
						append-icon="mdi-plus"
						@click:append="nbMutation++"
						prepend-icon="mdi-minus"
						@click:prepend="nbMutation = Math.max(nbMutation-1,1)"
						label="Nombre de mutations">
				</v-text-field>
			</v-col>
			<v-col cols="2">
				<v-btn :disabled="chosenViruses.length===0" color="accent" @click="mutation()" block>Muter</v-btn>
			</v-col>
		</v-row>

		<v-row>
			<v-col>
				<v-data-table show-select item-key="key" v-model="chosenViruses" :headers="header" :items="samples" :items-per-page="-1" class="elevation-1" >
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
				<v-text-field
						v-model.number="cutFactor"
						append-icon="mdi-plus"
						@click:append="cutFactor++"
						prepend-icon="mdi-minus"
						@click:prepend="cutFactor = Math.max(cutFactor-1,1)"
						label="Facteur de coupe">
				</v-text-field>
			</v-col>
			<v-col cols="2">
				<v-btn :disabled="chosenViruses.length===0" color="accent"  @click="cut" block>Couper</v-btn>
			</v-col>
			<v-col cols="4" class="pa-0">
				<v-text-field
						v-model.number="nbMutation"
						append-icon="mdi-plus"
						@click:append="nbMutation++"
						prepend-icon="mdi-minus"
						@click:prepend="nbMutation = Math.max(nbMutation-1,1)"
						label="Nombre de mutations">
				</v-text-field>
			</v-col>
			<v-col cols="2">
				<v-btn :disabled="chosenViruses.length===0" color="accent" @click="mutation()" block>Muter</v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	import {color_mixin} from "../../mixin/colors_methos";
	import {mapState} from "vuex";

	export default {
		name: 'Slicer',
		mixins: [ color_mixin ],
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
			...mapState({
				samples: state => state.storage.samples.map(x=>{
					x.key = x.name+x.code+Math.random()*10000000000
					return x
				})
			}),
		},
		methods: {
			cut() {
				this.$store.dispatch('tools/slicer/cut', {factor: this.cutFactor, viruses: this.chosenViruses.map(x=>{
					return this.samples.indexOf(x)
				})});
				this.chosenViruses=[]
			},

			mutation : function() {
				this.$store.dispatch('tools/slicer/mutate', {nb: this.nbMutation, viruses: this.chosenViruses.map(x=>{
					return this.samples.indexOf(x)
				})});
				this.chosenViruses=[]
			},
		}
	}
</script>

<style scoped>
</style>
