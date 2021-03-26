<template>
	<v-container fluid>
		<v-data-table show-select item-key="key" v-model="chosenParts" :headers="header" :items="data" :items-per-page="-1" class="elevation-1" >
			<template v-slot:item.name="{ item }">
				{{ item.name | capitalize }}
			</template>

			<template v-slot:item.code="{ item }">
				<v-chip class="ml-1 mt-1 mb-2" small v-for="(letter, index) in item.code" :key="item.code+'_'+index+'_'+letter" :color="getCodeLetterColor(letter)" dark >
					{{letter}}
				</v-chip>
			</template>
		</v-data-table>

		<button :disabled="chosenParts.length===0" @click="mix()">Mixing</button>

		<hr/>
		<button @click="$router.push({path:'/labo/slice'})">Go to slicer</button>

		<hr/>
		<p v-if="$store.state.mixer.new_virus != null">New virus: <input v-model="name"> {{$store.state.mixer.new_virus.code}} {{$store.state.mixer.new_virus.mortalite}}
			<button @click="sendToLibrary">Send to library</button>
		</p>

	</v-container>
</template>

<script>
	export default {
		name: 'Mixer',
		data : () => {
			return {
				chosenParts:[],
				name : null,

				header: [
					{
						text: 'Code',
						align: 'start',
						sortable: false,
						value: 'code',
					},
				]
			}
		},
		computed: {
			data() {
				let i=0
				return this.$store.state.parts.map(x=>{
					x.key = i+x.code
					i++
					return x
				})
			}
		},
		methods: {
			mix : function() {
				this.$store.dispatch("mixer_mix", {parts: this.chosenParts})
				this.chosenParts = []
				this.name = "new_mixed_virus"
			},
			sendToLibrary : function() {
				this.$store.dispatch("mixer_save_to_library", {name: this.name})
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
