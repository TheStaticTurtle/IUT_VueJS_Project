import Vue from 'vue'
import Vuex from 'vuex'
import {viruses} from "../model"

import { authentication } from './authentication.module';
import { basket } from './basket.module';
import { tools } from './tools.module';
import { storage } from './storage.module';

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		authentication,
		basket,
		tools,
		storage
	},

	state: {
		viruses,
	},

	actions: {
	},
	mutations: {
	},
})
