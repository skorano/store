<template>
	<b-container>
		<h2>Log in</h2>
		<input v-model="email" type="email" placeholder="E-mail">
		<input v-model="password" type="password" placeholder="Password">
		<button @click="login">Log in</button>
	</b-container>
</template>

<script>

import {firebase} from '../shared/db';

export default {
	name: 'login',
	data(){
		return{
			email: '',
			password: ''
		}
	},
	methods: {
		login: function(){
			firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
			(user)=>{
				alert("Well done! You are now connected!");
				this.$router.replace('admin');
			},
			(err)=>{
				alert("Oops! " + err.message);
			}
			);
		}
	}
}
</script>

<style>

</style>
