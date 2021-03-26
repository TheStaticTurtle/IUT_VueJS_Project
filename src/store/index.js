import Vue from 'vue'
import Vuex from 'vuex'
import {Virus, viruses} from "../model"
import router from '../router/index'


Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		viruses,
		samples: [],
		parts: [],
		basket: [],
		mixer: {
			new_virus: null
		},
	},
	actions: {
		clone_to_basket({commit}, {virus}) {
			commit('clone_to_basket', virus);
		},
		move_basket_to_lab({commit}) {
			commit('move_basket_to_lab');
			router.push("/labo/slice")
		},

		slicer_cut({commit}, {factor, viruses}) {
			commit('slicer_cut', {factor, viruses});
		},
		slicer_mutate({commit}, {nb, viruses}) {
			commit('slicer_mutate', {nb, viruses});
		},

		mixer_mix({commit}, {parts}) {
			commit('mixer_mix', parts);
		},
		mixer_save_to_library({commit}, {name}) {
			commit('mixer_save_to_library', name);
		},


	},
	mutations: {
		clone_to_basket(state, virus) {
			state.basket.push(new Virus(0, virus.name, virus.code))
		},
		move_basket_to_lab(state) {
			state.basket.forEach(v => state.samples.push(v));
			state.basket = []
		},

		slicer_cut(state, {factor, viruses}) {
			if (factor === 0) return;

			viruses.forEach(e => {
				const virus_r = state.samples[e];
				for (let i = 0; i < virus_r.code.length; i += factor) {
					state.parts.push({code: virus_r.code.substring(i, i + factor)});
				}
			});

			for (let i = viruses.length - 1; i >= 0; i--) {
				state.samples.splice(viruses[i], 1);
			}
		},
		slicer_mutate(state, {nb, viruses}) {
			if (nb === 0) return;

			viruses.forEach(e => {
				let newCode;
				const virus_r = state.samples[e];

				for (let i = 0; i < nb; i++) {
					let idx = Math.floor(Math.random() * virus_r.code.length);
					let chr = String.fromCharCode(Math.floor(Math.random() * 4) + "A".charCodeAt(0));
					newCode = virus_r.code.substring(0, idx) + chr + virus_r.code.substring(idx + 1);
					virus_r.code = newCode;
					virus_r.updateCaracs();
				}
			});
		},

		mixer_mix(state, parts) {
			let newCode = "";

			let nb = parts.length;
			const parts_cloned = [...parts]
			for (let i = 0; i < nb; i++) {
				// choose randomly a part among the selected ones
				let idx = Math.floor(Math.random() * parts_cloned.length);
				let p = state.parts[parts_cloned[idx]];
				newCode = newCode + p.code;
				parts_cloned.splice(idx, 1);
			}
			state.mixer.new_virus = new Virus(parts_cloned.length, 'mixedvirus', newCode);
			// remove chosen parts
			for (let i = parts.length - 1; i >= 0; i--) {
				state.parts.splice(parts[i], 1);
			}
		},
		mixer_save_to_library(state, name) {
			state.mixer.new_virus.name = name
			state.viruses.push(state.mixer.new_virus)
			state.mixer.new_virus = null
		}
	},
	modules: {}
})
