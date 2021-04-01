<template>
	<div>
		<v-data-table :headers="header" :items="viruses" :items-per-page="-1" class="elevation-1" >
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

			<template v-slot:item.action="{ item }">
				<v-btn color="accent" elevation="1" @click="$store.dispatch('basket/clone_to_basket', {virus: item}); toast(item.name+' ajoutter au pannier')">Ajouter</v-btn>
			</template>
		</v-data-table>

		<v-snackbar v-model="snackbar" :timeout="750" >
			{{ text }}
			<template v-slot:action="{ attrs }">
				<v-btn color="blue" text v-bind="attrs" @click="snackbar = false" >
					Close
				</v-btn>
			</template>
		</v-snackbar>
	</div>
</template>

<script>
	import {color_mixin} from "../../mixin/colors_methos";
	import {mapState} from "vuex";

	export default {
		name: 'Articles',
		mixins: [ color_mixin ],
		computed: {
			...mapState({
				viruses: state => state.viruses.map(x => {
					x.action = x
					return x
				})
			}),
		},
		data() {
			return {
				snackbar: false,
				text: '',
				header: [
					{
						text: 'Virus',
						align: 'start',
						sortable: false,
						value: 'name',
					},
					{ text: 'Code', value: 'code' },
					{ text: 'Mortalite', value: 'mortalite' },
					{ text: 'Action', value: 'action' },
				]
			}
		},
		methods: {
			toast(text) {
				this.text = text
				this.snackbar = true
			},
		}
	}
</script>

<style scoped>
</style>
