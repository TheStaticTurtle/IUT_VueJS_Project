<template>
	<v-container fluid class="pa-0">
		<v-tabs  v-model="tab" fixed-tabs dark background-color="deep-purple accent-4" >
			<v-tabs-slider color="white"></v-tabs-slider>

			<v-tab>
				<v-icon left>
					mdi-scissors-cutting
				</v-icon>
				Available viruses
			</v-tab>
			<v-tab>
				<v-icon left>
					mdi-shopping-outline
				</v-icon>
				Basket
			</v-tab>

			<v-tab-item>
				<v-container fluid>
					<Articles></Articles>
				</v-container>
			</v-tab-item>
			<v-tab-item>
				<v-container fluid>
					<Basket></Basket>
				</v-container>
			</v-tab-item>
		</v-tabs>
	</v-container>
</template>

<script>
	import Articles from './_library/Articles.vue'
	import Basket from "./_library/Basket";
	export default {
		name: 'Library',
		data() {
			return {
				tab: null
			}
		},
		components: {
			Basket,
			Articles
		}
	}
</script>

<style scoped>
</style>
