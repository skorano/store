<template>
	<div id="app">
		<navbar :auth="isAuth"></navbar>
		<router-view></router-view>
	</div>
</template>

<script>


import Navbar from './components/Navbar'

import {firebase} from './shared/db';


let db = firebase.db;

export default {
	name: 'app',
	components: { Navbar },
	data(){
		return{
			isAuth: false
		}
	},
	methods:{
		checkAuth(){
			console.log("CHECKING FROM APP!");
			console.log(firebase.auth().currentUser);
			this.isAuth = firebase.auth().currentUser;
		}
	},
	mounted(){
		this.checkAuth();
	}
}
</script>

<style>
	/* fixes for	BootstrapVue */
	button{
		cursor: pointer;
	}
	.modal{
		display: block;
	}
	tr .remove {
		visibility: hidden;
		transition: none;
	}
	tr:hover{
		background-color: #eee;
	}
	tr:hover .remove {
		visibility: visible;
		transition: none;
	}
	.invalid-feedback{
		display: block !important;
	}
</style>
