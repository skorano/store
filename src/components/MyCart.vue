<template>
	<b-container>
		<b-row>
			<table class="table">
				<thead class="thead-inverse">
					<tr>
						<th>#</th>
						<th>Product</th>
						<th>Price</th>
						<th>Quanity</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(product, index) in cart.products">
						<th scope="row">{{index+1}}</th>
						<td>{{product.name}}</td>
						<td>${{product.price}}</td>
						<td>
							<div class="input-group">
								<span class="input-group-btn">
									<button class="btn btn-secondary" @click="addToCart(product,-1)" type="button">-</button>
								</span>
								<b-form-input type="number"
									min="1"
									step="1"
									placeholder="0"
									class="form-control"
									oninput="validity.valid||(value='1')"
									v-model="product.qty"
									@keyup="updateCart(product, Number(product.qty))"
									@change="updateCart(product, Number(product.qty))"></b-form-input>
								<span class="input-group-btn">
									<button class="btn btn-secondary" @click="addToCart(product,1)" type="button">+</button>
								</span>
							</div>
						</td>
						<td><button type="button" class="btn btn-outline-danger" @click="">X</button></td>
					</tr>
					<tr v-if="!cart.products.length">
						<td colspan="5"> You do not have any products in your cart. </td>
					</tr>
				</tbody>
			</table>
			<div class="container">

			TOTAL: {{cart.summary}}
				<b-button variant="success" id="success" @click="checkout" :disabled="cart.products.length<1">Checkout</b-button>
			</div>
		</b-row>
	</b-container>
</template>

<script>

import cart from '../shared/cart.js'

export default {
	name: 'my-cart',
	data () {
		return {
			cart: cart.data
		}
	},
	methods: {
		updateCart(product, qty){
			this.cart.update(product, qty);
		},
		addToCart(product, qty){
			this.cart.add(product, qty);
		},
		removeProduct(product){
			this.cart.removeProduct(product);
		},
		checkout(){
			this.$router.push({ path: 'checkout' })
		}
	}
}
</script>

<style>
	tr th:nth-child(4){
		width: 160px;
	}
	#success{
		float: right;
	}
</style>
