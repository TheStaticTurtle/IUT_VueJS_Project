<template>
	<div>
		<v-btn color="accent" elevation="1" @click="$store.dispatch('basket/move_basket_to_lab')" small block class="mt-2">Send to laboratory</v-btn>
		<v-data-table :headers="header" :items="basket" :items-per-page="-1" class="elevation-1" >
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
		<v-btn color="accent" elevation="1" @click="$store.dispatch('basket/move_basket_to_lab')" small block class="mt-2">Send to laboratory</v-btn>
	</div>
</template>

<script>
	import {color_mixin} from "../../mixin/colors_methos";
	import {mapState} from "vuex";

	export default {
		name: 'Basket',
		mixins: [ color_mixin ],
		computed: {
			...mapState("basket",{
				basket: state => state.basket
			}),
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
					{ text: 'Mortality', value: 'mortalite' },
				]
			}
		},
	}
</script>

<style scoped>
</style>
