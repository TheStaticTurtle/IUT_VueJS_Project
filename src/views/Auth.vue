<template>
	<div>
		<v-dialog v-model="dialog" persistent max-width="600" >
			<v-card>
				<v-card-title class="headline">
					Se connecter
				</v-card-title>

				<v-card-text>
					<v-form ref="form" v-model="valid" lazy-validation >
						<v-text-field v-model="email" :rules="emailRules" label="E-mail" required ></v-text-field>
						<v-text-field v-model="password" :rules="passwordRules" label="Mot de passe" type="password" required ></v-text-field>
					</v-form>
				</v-card-text>

				<v-card-actions>
					<v-btn text :disabled="!valid" color="success" class="mr-4" @click="login" >
						Login
					</v-btn>
					<v-btn text color="error" class="mr-4" @click="reset" >
						Reset
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-dialog v-model="invaliddialog" max-width="300" >
			<v-card>
				<v-card-title class="headline">
					Erreur
				</v-card-title>

				<v-card-text>
					Le combo email / mot de passe n'est pas valide
				</v-card-text>

				<v-card-actions>
					<v-btn text color="error" class="mr-4" @click="invaliddialog = false" >
						Fermer
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
	export default {
		name: 'Auth',
		computed: {
		},
		data() {
			return {
				invaliddialog: false,
				dialog: true,
				valid: false,
				email:"dr.mad@madlab.org",
				emailRules: [
					v => !!v || 'E-mail is required',
					v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
				],
				password:"w0rldd357r0y3r",
				passwordRules: [
					v => !!v || 'Password is required',
					v => !!v && v.length>4 || 'Password must have a minimum of 4 char',
				],
			}
		},
		created() {
			this.$store.subscribe((mutation) => {
				if (mutation.type==="authentication/loginFailure") {
					this.invaliddialog = true
				}
			});
		},
		methods: {
			login() {
				this.$refs.form.validate()
				if(this.valid) {
					this.$store.dispatch("authentication/login", { email:this.email, password:this.password })
				}
			},
			reset() {
				this.$refs.form.reset()
			},
		}
	}
</script>

<style scoped>
</style>
