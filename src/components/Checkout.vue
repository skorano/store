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
		<b-form @submit.prevent="validateBeforeSubmit" validated>
		<b-row>
				<b-col>
					<h3>Order to:</h3>
					<b-form-group
						label="Name:">
					<b-form-input id="nameForm"  v-validate="'required|alpha_spaces'" name="name"
							type="text" v-model="form.name" required
							placeholder="Your name"></b-form-input>
						<div class="invalid-feedback" v-show="errors.has('form.name')" >
						<span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span></div>
					</b-form-group>
					<b-form-group
						label="Last Name:">
						<b-form-input v-validate="'required|alpha_spaces'"  name="lastname"
							id="formLastname"
							type="text" v-model="form.lastname" required
							placeholder="Your Last Name"></b-form-input>
							<div class="invalid-feedback" v-show="errors.has('form.lastname')" ><span v-show="errors.has('lastname')" class="help is-danger">{{ errors.first('lastname') }}</span></div>
					</b-form-group>
					<b-form-group
						label="E-mail:">
					<b-form-input  v-validate="'required|email'"  name="email"
								id="formEmail"
								type="email" v-model="form.email" required
								placeholder="email@example.com"></b-form-input>
						<div class="invalid-feedback" v-show="errors.has('form.email')" ><span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span></div>
					</b-form-group>
				</b-col>
				<b-col>
					<h3>Shipping address:</h3>
					<b-form-group
						label="Street and house number:">
						<b-form-input id="formStreet" v-validate="'required|min:3'" name="street"
							type="text" v-model="form.street" required
							placeholder="Your street"></b-form-input>
						<div class="invalid-feedback" v-show="errors.has('form.street')" ><span v-show="errors.has('street')" class="help is-danger">{{ errors.first('street') }}</span></div>
					</b-form-group>
					<b-form-group
							label="Phone:">
						<b-form-input id="formNumber"  v-validate="'required|min:6|numeric'" name="number"
							type="text" v-model="form.number" required
							placeholder="Your home number"></b-form-input>
						<div class="invalid-feedback" v-show="errors.has('form.number')" ><span v-show="errors.has('number')" class="help is-danger">{{ errors.first('number') }}</span></div>
					</b-form-group>
					<b-form-group
						label="City:">
						<b-form-input id="formCity"  v-validate="'required|min:3|alpha_spaces'" name="city"
						type="text" v-model="form.city" required
						placeholder="Your City"></b-form-input>
						<div class="invalid-feedback" v-show="errors.has('form.city')" ><span v-show="errors.has('city')" class="help is-danger">{{ errors.first('city') }}</span></div>
					</b-form-group>
					<b-form-group
						label="Postal code:">
						<b-form-input id="formPostal" v-validate="'required|min:3'" name="postal"
							type="text" v-model="form.postal" required
							placeholder="Your postal code"></b-form-input>
						<div class="invalid-feedback" v-show="errors.has('form.postal')" ><span v-show="errors.has('postal')" class="help is-danger">{{ errors.first('postal') }}</span></div>
					</b-form-group>
					<b-button v-b-modal.orderPlaced type="submit" variant="primary" :disabled="cart.products.length<1 ">Submit</b-button>
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
		title="The order has been sent."><br/>
		<h3>Order summary:</h3>
		<hr/>
		<b>Placed: </b> {{form.date}}<br/>
		<b>Order to:</b> {{form.name}} {{form.lastname}}<br/>
		<b>Shipping address:</b><br/>
		{{form.street}} {{form.number}} <br/>
		{{form.postal}} {{form.city}}<br/>
		<b>E-mail: </b>{{form.email}}
		<hr/>
		<b>Pay:</b> {{form.sum}}
		<hr/>
		<b>Cart:</b><br/>
		<table class="table">
			<thead class="thead-inverse">
				<tr>
					<th>#</th>
					<th>Code</th>
					<th>Product</th>
					<th>Quanity</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(product, index) in form.cart">
					<th scope="row">{{index+1}}</th>
					<td>{{product.code}}</td>
					<td>{{product.name}}</td>
					<td>{{product.qty}}</td>
				</tr>
			</tbody>
		</table>
	</b-modal>
	</div>
</template>

<script>



import VeeValidate from 'vee-validate';

import cart from '../shared/cart.js'
import {db} from '../shared/db'
let dateFormat = require('dateformat');
let order = db.ref('orders')
let products = db.ref('products')

class Order {
	constructor(name, lastname, email, street, number, postal, city, cart, date = new Date(), sum){
	this.date = date,
	this.name = name,
	this.lastname = lastname,
	this.email = email,
	this.street = street,
	this.number = number,
	this.postal = postal,
	this.city = city,
	this.cart = cart,
	this.sum = sum
	}
}

export default {
	name: 'checkout',
	firebase: {
		products: products,
		orders: order
	},
	data () {
		return {
			email: "",
			cart: cart.data,
			name: "",
			form: new Order
		}
	},
	methods: {
		onSubmit(){
			let that = this;
			this.form.date = this.date();
			order.push(this.form).then( () => {
				that.$refs.orderPlaced.show();
				that.cart.clear();
			});
		},
		hideModal(){
			this.$refs.orderPlaced.hide();
		},
		goHome(){
				this.$router.push({ path: '/' });
		},
		date(){
			let date = new Date;
			let local = new Date(date);
			local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
			return local.toJSON().slice(0, 10);
		},
		validateBeforeSubmit() {
			this.$validator.validateAll().then((result) => {
			if (result) {
				this.onSubmit();
			}
			});
		}
	},
	created(){
		this.form.cart = this.cart.products;
		this.form.sum = this.cart.summary;
	}
}
</script>

<style>
</style>
