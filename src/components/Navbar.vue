<template>
	<b-navbar toggleable="md" variant="light">

	<b-nav-toggle target="nav_collapse"></b-nav-toggle>

	<b-navbar-brand>Store!</b-navbar-brand>

	<b-collapse is-nav id="nav_collapse">

		<b-nav is-nav-bar>
			<b-button @click="goto('/')" size="sm" variant="outline-primary">Go to store!</b-button>
			<div class="dropdown" @click="checkAuth">
				<button class="btn btn-sm btn-outline-primary dropdown-toggle right" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
					Admin panel
				</button>
				<div v-if="toggleMenu" class="dropdown-menu" aria-labelledby="dropdownMenuButton">
					<b-dropdown-item v-if="isAuth" @click="goto('admin')">Orders</b-dropdown-item>
					<b-dropdown-item v-if="isAuth" @click="goto('promo')">Discounts</b-dropdown-item>
					<b-dropdown-item v-if="isAuth" @click="signout">Sign out</b-dropdown-item>
					<b-dropdown-item v-if="!isAuth" @click="goto('login')">Log in</b-dropdown-item>
					<b-dropdown-item v-if="!isAuth" @click="goto('signup')">Sign in</b-dropdown-item>
				</div>
			</div>

		</b-nav>

		<!-- Right aligned nav items -->
		<b-nav is-nav-bar class="ml-auto">
<!--

			<b-button size="sm" class="my-2 my-sm-0" @click="cart.addToCart">My cart ({{cart.productsQty()}}) ${{cart.summary}}</b-button>
-->
<!--

			<div class="btn-group">
				<button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					My cart ({{cart.productsQty()}}) ${{cart.summary}}
				</button>
				<div class="dropdown-menu">
					<a class="dropdown-item" @click="console.log('mycart')">My cart</a>
					<a class="dropdown-item"  @click="console.log('checkout')">Checkout</a>
				</div>
			</div>
-->

			<b-dropdown id="ddown2" variant="success" split class="m-md-2" @click="goto('cart')" :text="'My cart (' + cart.productsQty + ') ' + cart.summary">
				<b-dropdown-item  @click="goto('cart')">Show my cart</b-dropdown-item>
				<b-dropdown-item  @click="goto('checkout')" v-if="cart.products.length">Checkout</b-dropdown-item>
			</b-dropdown>
		</b-nav>

	</b-collapse>
</b-navbar>

</template>

<script>

import cart from '../shared/cart.js'
import {db} from '../shared/db';
import {firebase} from '../shared/db';


export default {
	name: 'navbar',
	data () {
		return {
			isAuth: false,
			toggleMenu: true,
			msg: 'Navigation',
			cart: cart.data
		}
	},
	methods: {
		goto(page){
			this.$router.push({ path: page })
		},
		checkAuth(){
			this.isAuth = firebase.auth().currentUser;
			this.toggleMenu= !this.toggleMenu;
		},
		signout(){
			firebase.auth().signOut().then(
				() => { this.$router.replace('login') }
			);
		}
	},
	mounted(){
		 this.checkAuth();
	},
	watch:{
		dbconnection(){
			console.log("DB!");
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	button{
		margin-left: 10px;
		cursor: pointer;
	}
	nav{
		margin-bottom: 20px;
	}
	.dropdown-menu{
		display:block;
	}
</style>
