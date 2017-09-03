<template>
	<b-container>
		<h2>Sign up</h2><br/>
		<b-form-input v-validate="'required|email'" name="email" v-model="email" type="email" placeholder="E-mail"></b-form-input>
		<div class="invalid-feedback" v-show="errors.has('email')" ><span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span></div>
		<br/>
		<b-form-input v-validate="'required|min:6'" name="password"  v-model="password" type="password" placeholder="Password"></b-form-input>
		<div class="invalid-feedback" v-show="errors.has('password')" ><span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span></div>
		<br/>
		<b-button @click="validateBeforeSubmit" variant="outline-primary">Sign up</b-button>
	</b-container>
</template>

<script>

import {firebase} from '../shared/db';

export default {
	name: 'signup',
	data(){
		return{
			email:'',
			password:''
		}
	},
	methods:{
		signup(){
			firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
				(user)=>{
					alert('Your account has been created!');
					this.$router.replace('login');
				},
				(err)=>{
					alert("Oops! " + err.message);
				})
		},
		validateBeforeSubmit() {
			this.$validator.validateAll().then((result) => {
			if (result) {
				this.signup();
			}
			});
		}
	}
}
</script>

<style>

</style>
