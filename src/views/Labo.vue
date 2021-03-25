<template>
	<div>
		<h1>Labo</h1>
		<table border="1">
			<tr>
				<td>
					<keep-alive include="Mixer">
						<router-view name="locSubCentral"></router-view>
					</keep-alive>
				</td>
			</tr>
		</table>
	</div>
</template>

<script>
	export default {
		name: 'Labo',
	}
</script>

<style scoped>
</style>
