<template>
	<!--<div id="app">
		<NavBar :titles="titles" />
		<keep-alive>
			<router-view name="locCentral"></router-view>
		</keep-alive>
	</div>-->
	<v-app>
		<v-navigation-drawer app v-model="drawer">
			<v-list-item>
				<v-list-item-content>
					<v-list-item-title class="title">
						MadLab
					</v-list-item-title>
					<v-list-item-subtitle>
						Let's destroy the world
					</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>

			<v-divider></v-divider>

			<v-list dense nav >
				<v-list-item v-for="link in links" :key="link.title" :to="link.path" link >
					<v-list-item-icon>
						<v-icon>{{ link.icon }}</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title>{{ link.title }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-app-bar color="deep-purple accent-4" app dark elevation="0">
			<v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
			<v-toolbar-title>{{ $router.currentRoute.matched[0].name }}</v-toolbar-title>
			<v-spacer></v-spacer>
		</v-app-bar>

		<v-main class="pt-0">
			<v-container fluid>
				<router-view name="locCentral"></router-view>
			</v-container>
		</v-main>

		<v-footer app>
		</v-footer>
	</v-app>
</template>

<script>
	//import NavBar from './components/NavBar.vue'
	export default {
		name: 'App',
		data : () => {
			return {
				drawer: false,
				links : [
					{ icon:"mdi-home", title: "Home", path:"/home"},
					{ icon:"mdi-microscope", title: "Lab", path:"/labo/slice"},
					{ icon:"mdi-library-shelves", title: "Library", path:"/library/view"}
				],
				currentMenu : 0,
			}
		},
		/*components: {
			NavBar
		},*/
	}
</script>

<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
</style>
