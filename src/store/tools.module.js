import router from '../router/index';
import {Virus} from "../model";

export const tools = {
	namespaced: true,
	state: {
		mixer: {
			new_virus: null
		},
	},
	actions: {
		slicer_cut({commit, rootState}, {factor, viruses}) {
			commit('slicer_cut', {rootState, factor, viruses});
		},
		slicer_mutate({commit, rootState}, {nb, viruses}) {
			commit('slicer_mutate', {rootState, nb, viruses});
		},

		mixer_mix({commit, rootState}, {parts}) {
			commit('mixer_mix', {rootState, parts});
		},
		mixer_save_to_library({commit, rootState}, {name}) {
			commit('mixer_save_to_library', {rootState, name});
			router.push("/library")
		},
	},
	mutations: {
		slicer_cut(state, {rootState, factor, viruses}) {
			if (factor === 0) return;

			viruses.forEach(e => {
				const virus_r = rootState.storage.samples[e];
				for (let i = 0; i < virus_r.code.length; i += factor) {
					rootState.storage.parts.push({code: virus_r.code.substring(i, i + factor)});
				}
			});

			for (let i = viruses.length - 1; i >= 0; i--) {
				rootState.storage.samples.splice(viruses[i], 1);
			}
		},
		slicer_mutate(state, {rootState, nb, viruses}) {
			if (nb === 0) return;

			viruses.forEach(e => {
				let newCode;
				const virus_r = rootState.storage.samples[e];

				for (let i = 0; i < nb; i++) {
					let idx = Math.floor(Math.random() * virus_r.code.length);
					let chr = String.fromCharCode(Math.floor(Math.random() * 4) + "A".charCodeAt(0));
					newCode = virus_r.code.substring(0, idx) + chr + virus_r.code.substring(idx + 1);
					virus_r.code = newCode;
					virus_r.updateCaracs();
				}
			});
		},

		mixer_mix(state, {rootState, parts}) {
			let newCode = "";

			let nb = parts.length;
			const parts_cloned = [...parts]
			for (let i = 0; i < nb; i++) {
				// choose randomly a part among the selected ones
				let idx = Math.floor(Math.random() * parts_cloned.length);
				let p = rootState.storage.parts[parts_cloned[idx]];
				newCode = newCode + p.code;
				parts_cloned.splice(idx, 1);
			}
			state.mixer.new_virus = new Virus(parts_cloned.length, 'mixedvirus', newCode);
			// remove chosen parts
			for (let i = parts.length - 1; i >= 0; i--) {
				rootState.storage.parts.splice(parts[i], 1);
			}
		},
		mixer_save_to_library(state, {rootState, name}) {
			state.mixer.new_virus.name = name
			rootState.viruses.push(state.mixer.new_virus)
			state.mixer.new_virus = null
		}
	}
}