import router from '../router/index';
import {Virus} from "../model";

export const basket = {
	namespaced: true,
	state: {
		basket: [],
	},
	actions: {
		clone_to_basket({commit}, {virus}) {
			commit('clone_to_basket', virus);
		},
		move_basket_to_lab({commit, rootState}) {
			commit('move_basket_to_lab', { rootState });
			router.push("/labo/slice")
		},
	},
	mutations: {
		clone_to_basket(state, virus) {
			state.basket.push(new Virus(0, virus.name, virus.code))
		},
		move_basket_to_lab(state, { rootState }) {
			state.basket.forEach(v => rootState.storage.samples.push(v));
			state.basket = []
		},
	}
}