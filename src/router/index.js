import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Labo from '../views/Labo.vue'
import Library from '../views/Library.vue'
//import Basket from '../views/Basket.vue'
import Slicer from '../views/Slicer.vue'
import Mixer from '../views/Mixer.vue'
import Auth from "../views/Auth";

import store from '../store/index'

Vue.use(VueRouter)

const routes = [
	{path: '/home', name: 'Home', components: {locCentral: Home}},
	{
		path: '/labo', name: 'Laboratory', components: {locCentral: Labo}, meta: { requiresLogin: true }, children: [
			{name: 'Laboratory1', path: 'slice', components: {locSubCentral: Slicer}, meta: { requiresLogin: true }},
			{name: 'Laboratory2', path: 'mix', components: {locSubCentral: Mixer}, meta: { requiresLogin: true }}
		]
	},
	{ path: '/library', name: 'Library', components: {locCentral: Library}, meta: { requiresLogin: true } },
	{ path: '/login', name: 'Login', components: {locCentral: Auth} },
	{ path: '*', redirect: '/home' }
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresLogin) && !store.state.authentication.logged_in) {
		next("/login")
	} else {
		next()
	}
})

export default router
