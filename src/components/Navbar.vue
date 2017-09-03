<template>
	<b-navbar toggleable="md" variant="light">

	<b-nav-toggle target="nav_collapse"></b-nav-toggle>

	<b-navbar-brand>Store!</b-navbar-brand>

	<b-collapse is-nav id="nav_collapse">

		<b-nav is-nav-bar>
			<b-nav-item @click="goto('/')">Products</b-nav-item>

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


			<b-dropdown id="ddown2" variant="success" split class="m-md-2" @click="goto('cart')" :text="'My cart (' + cart.productsQty() + ') ' + cart.summary">
				<b-dropdown-item  @click="goto('cart')">Show my cart</b-dropdown-item>
				<b-dropdown-item  @click="goto('checkout')" v-if="cart.products.length">Checkout</b-dropdown-item>
			</b-dropdown>

		<b-dropdown id="ddown1" text="Actions" variant="primary" class="m-md-2" right >
				<b-dropdown-item v-if="auth" @click="goto('admin')">Orders</b-dropdown-item>
				<b-dropdown-item v-if="auth" @click="goto('promo')">Discounts</b-dropdown-item>
				<b-dropdown-item v-if="auth" @click="goto('login')">Log offf</b-dropdown-item>
				<b-dropdown-item v-if="!auth" @click="goto('login')">Log in</b-dropdown-item>
				<b-dropdown-item v-if="!auth" @click="goto('signup')">Sign in</b-dropdown-item>
			</b-dropdown>



		</b-nav>

	</b-collapse>
</b-navbar>

</template>

<script>

import cart from '../shared/cart.js'
import {firebase} from '../shared/db';


export default {
	name: 'navbar',
	data () {
		return {
			msg: 'Navigation',
			cart: cart.data
		}
	},
	methods: {
		goto(page){
			this.$router.push({ path: page })
		},
		auth(){
			return firebase.auth().currentUser;
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
</style>
