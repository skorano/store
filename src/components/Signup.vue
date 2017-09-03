<template>
	<b-container>
		<h2>Sign up</h2>
		<input v-model="email" type="email" placeholder="E-mail">
		<input v-model="password" type="password" placeholder="Password">
		<button @click="signup">Sign up</button>
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
		}
	}
}
</script>

<style>

</style>
