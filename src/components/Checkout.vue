<template>
<div>
	<b-container>
		<b-row v-if="cart.products.length">
			<table class="table">
				<thead class="thead-inverse">
					<tr>
						<th>#</th>
						<th>Product</th>
						<th>Price</th>
						<th>Quanity</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(product, index) in cart.products">
						<th scope="row">{{index+1}}</th>
						<td>{{product.name}}</td>
						<td>${{product.price}}</td>
						<td>{{product.qty}}</td>
					</tr>
				</tbody>
			</table>
		</b-row>
		<b-form @submit.prevent="onSubmit" novalidate validated>
		<b-row>
				<b-col>
					<h3>Order to:</h3>
					<b-form-group
												label="Name:" label-for="formName"
												description="Place your name here.">
					<b-form-input id="nameForm"
													type="text" v-model="form.name" required
													placeholder="Your name"></b-form-input>
					</b-form-group>
					<b-form-group
												label="Last Name:" label-for="formLastname"
												description="Place your Last Name here.">
						<b-form-input id="formLastname"
													type="text" v-model="form.lastname" required
													placeholder="Your Last Name"></b-form-input>
					</b-form-group>
					<b-form-group
												label="E-mail:" label-for="formEmail"
												description="Place your email here.">
						<b-form-input id="formEmail"
													type="email" v-model="form.email" required
													placeholder="email@example.com"></b-form-input>
					</b-form-group>
				</b-col>
				<b-col>
					<h3>Shipping address:</h3>
					<b-form-group
												label="Street:" label-for="formStreet"
												description="Place your street here.">
						<b-form-input id="formStreet"
													type="text" v-model="form.street" required
													placeholder="Your street"></b-form-input>
					</b-form-group>
					<b-form-group
												label="Number:" label-for="formNumber"
												description="Place your home number here.">
						<b-form-input id="formNumber"
													type="text" v-model="form.number" required
													placeholder="Your home number"></b-form-input>
					</b-form-group>
					<b-form-group
												label="City:" label-for="formCity"
												description="Place your city here.">
						<b-form-input id="formCity"
													type="text" v-model="form.city" required
													placeholder="Your City"></b-form-input>
					</b-form-group>
					<b-form-group
												label="Postal code:" label-for="formPostal"
												description="Place your postal code here.">
						<b-form-input id="formPostal"
													type="text" v-model="form.postal" required
													placeholder="Your postal code"></b-form-input>
					</b-form-group>
					<b-form-group id="exampleGroup4">
						<b-form-checkbox v-model="form.agreement" id="form.agreement">
							Check me out
						</b-form-checkbox>
					</b-form-group>
					<b-button v-b-modal.orderPlaced type="submit" variant="primary">Submit</b-button>
					<b-button type="reset" variant="secondary">Reset</b-button>
				</b-col>
		</b-row>
			</b-form>
		<b-row v-if="!cart.products.length">
			<h2>Cart is empty.</h2>
		</b-row>
	</b-container>
	<b-modal ref="orderPlaced"
		@ok="goHome"
		ok-only
		title="The order has been sent.">
		Have a nice day!
	</b-modal>
	</div>
</template>

<script>

import cart from '../shared/cart.js'
import {db} from '../shared/db';

let order = db.ref('orders');
let products = db.ref('products');

export default {
	name: 'checkout',
	firebase: {
		products: products,
		orders: order
	},
	data () {
		return {
			cart: cart.data,
			name: "",
			formProps: {
				novalidate: true,
				validated: true
			},
			form: {
				name:"Krzysztof",
				lastname:"Skorupski",
				email:"krzychu@gmail.com",
				street:"Kowalówki",
				number:"11",
				postal:"61-695",
				city:"Poznań"
			}
		}
	},
	methods: {
		onSubmit(){
			let that = this;
			order.push(this.form).then( () => {
				that.$refs.orderPlaced.show();
			});
		},
		hideModal(){
			this.$refs.orderPlaced.hide();
		},
		goHome(){
				this.$router.push({ path: '/' });
		}
	},
	created(){
		this.form.cart = this.cart.products;
	}
}
</script>

<style>
</style>
