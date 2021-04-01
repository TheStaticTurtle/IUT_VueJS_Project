import router from '../router/index';
import auth_conf from "../auth.json"

export const authentication = {
	namespaced: true,
	state: {
		logged_in: false
	},
	actions: {
		login({ commit }, { email, password }) {
			const valid = auth_conf.accounts.some((x)=>{ return x.email===email && x.password===password })
			if(valid) {
				commit('loginSuccess');
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
		loginSuccess(state) {
			state.logged_in = true;
		},
		loginFailure(state) {
			state.logged_in = false;
		},
		logout(state) {
			state.logged_in = false;
		},
	}
}