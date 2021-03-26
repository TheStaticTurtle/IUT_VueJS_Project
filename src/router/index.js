import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Labo from '../views/Labo.vue'
import Library from '../views/Library.vue'
//import Basket from '../views/Basket.vue'
import Slicer from '../views/Slicer.vue'
import Mixer from '../views/Mixer.vue'

Vue.use(VueRouter)

const routes = [
	{path: '/home', name: 'Home', components: {locCentral: Home}},
	{
		path: '/labo', name: 'Laboratory', components: {locCentral: Labo}, children: [
			{name: 'Laboratory1', path: 'slice', components: {locSubCentral: Slicer}},
			{name: 'Laboratory2', path: 'mix', components: {locSubCentral: Mixer}}
		]
	},
	{
		path: '/library', name: 'Library', components: {locCentral: Library}/*, children: [
			{name: 'Library', path: ':op', components: {locDown: Basket},}
		]*/
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
