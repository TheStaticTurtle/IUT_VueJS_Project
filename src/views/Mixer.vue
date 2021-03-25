<template>
	<div>
		<table border="0">
			<tr>
				<td><h1>Parts</h1></td>
			</tr>
			<tr>
				<td>
					<CheckedList :fields="['code']" :entries="$store.state.parts" @chosen-changed="chosenParts = $event" />
				</td>
			</tr>
		</table>
		<button :disabled="chosenParts.length===0" @click="mix()">Mixing</button>

		<hr/>
		<button @click="$router.push({path:'/labo/slice'})">Go to slicer</button>

		<hr/>
		<p v-if="$store.state.mixer.new_virus != null">New virus: <input v-model="name"> {{$store.state.mixer.new_virus.code}} {{$store.state.mixer.new_virus.mortalite}}
			<button @click="sendToLibrary">Send to library</button>
		</p>

	</div>
</template>

<script>
	import CheckedList from '../components/CheckedList.vue'

	export default {
		name: 'Mixer',
		data : () => {
			return {
				chosenParts:[],
				name : null
			}
		},
		components: {
			CheckedList
		},
		methods: {
			mix : function() {
				this.$store.dispatch("mixer_mix", {parts: this.chosenParts})
				this.chosenParts = []
				this.name = "new_mixed_virus"
			},
			sendToLibrary : function() {
				this.$store.dispatch("mixer_save_to_library", {name: this.name})
			}
		}
	}
</script>

<style scoped>
</style>
