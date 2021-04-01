<template>
	<div>
		<template>
			<v-form ref="form" v-model="valid" lazy-validation >
				<v-text-field
						v-model="email"
						:rules="emailRules"
						label="E-mail"
						required
				></v-text-field>

				<v-text-field
						v-model="password"
						:rules="passwordRules"
						label="Mot de passe"
						type="password"
						required
				></v-text-field>

				<v-btn
						:disabled="!valid"
						color="success"
						class="mr-4"
						@click="login"
				>
					Login
				</v-btn>

				<v-btn
						color="error"
						class="mr-4"
						@click="reset"
				>
					Reset
				</v-btn>
			</v-form>
		</template>
	</div>
</template>

<script>
	export default {
		name: 'Auth',
		computed: {
		},
		data() {
			return {
				email:"",
				emailRules: [
					v => !!v || 'E-mail is required',
					v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
				],
				password:"",
				passwordRules: [
					v => !!v || 'Password is required',
					v => v.length>4 || 'Password must have a minimum of 4 char',
				],
			}
		},
		methods: {
			login() {
				this.$store.dispatch("authentication/login", { email:this.email, password:this.password })
			},
			reset() {
				this.$refs.form.reset()
			},
		}
	}
</script>

<style scoped>
</style>
