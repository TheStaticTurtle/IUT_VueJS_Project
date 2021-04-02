export const inverter = {
	namespaced: true,
	state: {
	},
	actions: {
		invert({commit, rootState}, {viruses}) {
			commit('invert', {rootState, viruses});
		},
	},
	mutations: {
		invert(state, {rootState, viruses}) {
			viruses.forEach(e => {
				const virus_r = rootState.storage.samples[e];

				virus_r.code = virus_r.code.split("").reverse().join("");
				virus_r.updateCaracs();
			});
		},
	}
}