export const slicer = {
	namespaced: true,
	state: {
	},
	actions: {
		cut({commit, rootState}, {factor, viruses}) {
			commit('cut', {rootState, factor, viruses});
		},
		mutate({commit, rootState}, {nb, viruses}) {
			commit('mutate', {rootState, nb, viruses});
		},
	},
	mutations: {
		cut(state, {rootState, factor, viruses}) {
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
		mutate(state, {rootState, nb, viruses}) {
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
	}
}