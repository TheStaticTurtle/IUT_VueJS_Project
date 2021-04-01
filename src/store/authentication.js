import router from '../router/index';
import auth_conf from "../auth.json"

export const authentication = {
	namespaced: true,
	state: {
		logged_in: false,
		connected_as: null
	},
	actions: {
		login({ commit }, { email, password }) {
			const valid = auth_conf.accounts.some((x)=>{ return x.email===email && x.password===password })
			if(valid) {
				commit('loginSuccess', { email, password });
				router.push("/library")
			} else {
				commit('loginFailure');
			}
		},
		logout({ commit }) {
			commit('logout');
			router.push("/")
		},
	},
	mutations: {
		loginSuccess(state, { email }) {
			state.connected_as = email;
			state.logged_in = true;
		},
		loginFailure(state) {
			state.logged_in = false;
			state.connected_as = null;
		},
		logout(state) {
			state.logged_in = false;
			state.connected_as = null;
		},
	}
}