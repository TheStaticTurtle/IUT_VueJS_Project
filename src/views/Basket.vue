<template>
	<div>
		<v-btn color="accent" elevation="1" @click="$store.dispatch('move_basket_to_lab')" small block class="mb-3">Envoyer au laboratoire</v-btn>
		<v-data-table :headers="header" :items="data" :items-per-page="-1" class="elevation-1" >
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
		<v-btn color="accent" elevation="1" @click="$store.dispatch('move_basket_to_lab')" small block class="mt-2">Envoyer au laboratoire</v-btn>
	</div>
</template>

<script>
	import {color_mixin} from "../mixin/colors_methos";

	export default {
		name: 'Basket',
		mixins: [ color_mixin ],
		computed: {
			data() {
				return this.$store.state.basket
			}
		},
		data() {
			return {
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
	}
</script>

<style scoped>
</style>
