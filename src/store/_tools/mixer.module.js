import router from '../../router/index';
import {Virus} from "../../model";

export const mixer = {
	namespaced: true,
	state: {
		new_virus: null
	},
	actions: {
		mix({commit, rootState}, {parts}) {
			commit('mix', {rootState, parts});
		},
		save_to_library({commit, rootState}, {name}) {
			commit('save_to_library', {rootState, name});
			router.push("/library")
		},
	},
	mutations: {
		mix(state, {rootState, parts}) {
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
			state.new_virus = new Virus(parts_cloned.length, 'mixedvirus', newCode);
			// remove chosen parts
			for (let i = parts.length - 1; i >= 0; i--) {
				rootState.storage.parts.splice(parts[i], 1);
			}
		},
		save_to_library(state, {rootState, name}) {
			state.new_virus.name = name
			rootState.viruses.push(state.new_virus)
			state.new_virus = null
		}
	}
}