<template>
	<v-container fluid>
		<v-row class="pt-2">
			<v-col>
				<v-btn :disabled="chosenViruses.length===0" color="accent"  @click="invert" block>Invert</v-btn>
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
						<v-chip :color="getMortalityLevel(item.mortalite)" dark >
							{{ item.mortalite }}
						</v-chip>
					</template>
				</v-data-table>
			</v-col>
		</v-row>


		<v-row>
			<v-col>
				<v-btn :disabled="chosenViruses.length===0" color="accent"  @click="invert" block>Invert</v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	import {color_mixin} from "../../mixin/colors_methos";
	import {mapState} from "vuex";

	export default {
		name: 'Inverter',
		mixins: [ color_mixin ],
		data : () => {
			return {
				chosenViruses:[],
				header: [
					{
						text: 'Virus',
						align: 'start',
						sortable: false,
						value: 'name',
					},
					{ text: 'Code', value: 'code' },
					{ text: 'Mortalité', value: 'mortalite' },
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
			invert() {
				this.$store.dispatch('tools/inverter/invert', {viruses: this.chosenViruses.map(x=>{
					return this.samples.indexOf(x)
				})});
				this.chosenViruses=[]
			},
		}
	}
</script>

<style scoped>
</style>
