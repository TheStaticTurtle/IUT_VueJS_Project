<template>
	<v-container fluid>
		<v-row class="pt-2 ">
			<v-col>
				<v-btn :disabled="chosenParts.length===0" color="accent"  @click="mix" block>Mixer</v-btn>
			</v-col>
		</v-row>

		<v-row>
			<v-col>
				<v-data-table show-select item-key="key" v-model="chosenParts" :headers="header" :items="parts" :items-per-page="-1" class="elevation-1" >
					<template v-slot:item.name="{ item }">
						{{ item.name | capitalize }}
					</template>

					<template v-slot:item.code="{ item }">
						<v-chip class="ml-1 mt-1 mb-2" small v-for="(letter, index) in item.code" :key="item.code+'_'+index+'_'+letter" :color="getCodeLetterColor(letter)" dark >
							{{letter}}
						</v-chip>
					</template>
				</v-data-table>
			</v-col>
		</v-row>

		<v-row class="" v-if="mixer.new_virus != null">
			<v-col class="pa-0 ma-0">
				<h3>Nouveau virus:</h3>
			</v-col>
		</v-row>
		<v-row class="" v-if="mixer.new_virus != null">
			<v-col class="pa-0 ma-0">
				Code
			</v-col>
			<v-col class="pa-0 ma-0">
				Mortalitée
			</v-col>
			<v-col class="pa-0 ma-0">
			</v-col>
		</v-row>
		<v-row  v-if="mixer.new_virus != null">
			<v-col>
				<v-chip class="ml-1 mt-1 mb-2" small v-for="(letter, index) in mixer.new_virus.code" :key="'new_virus_'+index+'_'+letter" :color="getCodeLetterColor(letter)" dark >
					{{letter}}
				</v-chip>
			</v-col>
			<v-col>
				<v-chip :color="getMortaliteLevel(mixer.new_virus.mortalite)" dark >
					{{ mixer.new_virus.mortalite }}
				</v-chip>
			</v-col>
			<v-col>
				<v-dialog v-model="dialog" persistent max-width="600px" >
					<template v-slot:activator="{ on, attrs }">
						<v-btn color="accent"  v-on="on" v-bind="attrs" block>Sauvegarder dans la librarie</v-btn>
					</template>
					<v-card>
						<v-card-title>
							<span class="headline">Nouveau virus</span>
						</v-card-title>
						<v-card-text>
							<v-container fluid>
								<v-row>
									<v-col cols="12">
										<v-text-field v-model="name" label="Nom" required ></v-text-field>
									</v-col>
								</v-row>
							</v-container>
						</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="blue darken-1" text @click="dialog = false" >
								Close
							</v-btn>
							<v-btn color="blue darken-1" text @click="dialog = false; sendToLibrary()" >
								Save
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</v-col>
		</v-row>


		<v-row>
			<v-col>
				<v-btn :disabled="chosenParts.length===0" color="accent"  @click="mix" block>Mixer</v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	import {color_mixin} from "../../mixin/colors_methos";
	import {mapState} from "vuex";

	export default {
		name: 'Mixer',
		mixins: [ color_mixin ],
		data : () => {
			return {
				chosenParts:[],
				dialog : false,
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
			...mapState({
				mixer: state => state.tools.mixer,
				parts: state => state.storage.parts.map(x=>{
					x.key = x.code+Math.round(10000000000)
					return x
				})
			}),
		},
		methods: {
			mix : function() {
				this.$store.dispatch("tools/mixer_mix", {parts: this.chosenParts.map(x=>{
					return this.$store.state.storage.parts.indexOf(x)
				})})
				this.chosenParts = []
				this.name = "new_mixed_virus"
			},
			sendToLibrary : function() {
				this.$store.dispatch("tools/mixer_save_to_library", {name: this.name})
			},
		}
	}
</script>

<style scoped>
</style>
