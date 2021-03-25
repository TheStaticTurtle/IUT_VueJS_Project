import Vue from 'vue'
import Vuex from 'vuex'
import {Virus, viruses} from "../model"

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		viruses,
		samples: [],
		parts: [],
		basket: [],
	},
	actions: {
		clone_to_basket({ commit }, { virus }) {
			commit('clone_to_basket', virus);
		},
		move_basket_to_lab({ commit }) {
			commit('move_basket_to_lab');
		},

		slicer_cut({ commit }, { factor , viruses }) {
			commit('slicer_cut', { factor , viruses } );
		},
		slicer_mutate({ commit }, { nb , viruses }) {
			commit('slicer_mutate', { nb , viruses } );
		},

	},
	mutations: {
		clone_to_basket(state, virus) {
			state.basket.push(new Virus(0,virus.name, virus.code))
		},
		move_basket_to_lab(state) {
			state.basket.forEach(v => state.samples.push(v));
			state.basket = []
		},
		slicer_cut(state, { factor , viruses }) {
			if (factor === 0) return;

			viruses.forEach(e => {
				const virus_r = state.samples[e];
				for(let i=0; i < virus_r.code.length; i+=factor) {
					state.parts.push({code : virus_r.code.substring(i,i+factor)});
				}
			});

			for(let i=viruses.length-1;i>=0;i--) {
				state.samples.splice(viruses[i],1);
			}
		},
		slicer_mutate(state, { nb , viruses }) {
			if (nb === 0) return;

			viruses.forEach(e => {
				let newCode;
				const virus_r = state.samples[e];

				for(let i=0;i<nb;i++) {
					let idx = Math.floor(Math.random() * virus_r.code.length);
					let chr =  String.fromCharCode(Math.floor(Math.random() * 4)+ "A".charCodeAt(0));
					newCode = virus_r.code.substring(0,idx) + chr + virus_r.code.substring(idx+1);
					virus_r.code = newCode;
					virus_r.updateCaracs();
				}
			});
		}
	},
	modules: {
	}
})
