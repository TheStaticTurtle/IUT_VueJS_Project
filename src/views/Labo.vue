<template>
	<v-container fluid class="pa-0">
		<v-tabs fixed-tabs dark background-color="deep-purple accent-4" >
			<v-tabs-slider color="white"></v-tabs-slider>

			<v-tab to="/labo/slice">
				<v-icon left>
					mdi-scissors-cutting
				</v-icon>
				Slicer
			</v-tab>
			<v-tab to="/labo/inverter">
				<v-icon left>
					mdi-swap-horizontal
				</v-icon>
				Inverter
			</v-tab>
			<v-tab to="/labo/mix">
				<v-icon left>
					mdi-bowl-mix-outline
				</v-icon>
				Mixer
			</v-tab>
		</v-tabs>
		<keep-alive include="Mixer">
			<router-view name="locSubCentral"></router-view>
		</keep-alive>
	</v-container>
</template>

<script>
	export default {
		name: 'Labo',
	}
</script>

<style scoped>
</style>
