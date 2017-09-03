<template>
	<b-container>
			<b-row>
				<h2>Add and manage promotions and discounts</h2>
			</b-row>
			<b-row>
			<h4>(Promotions can not be combined)</h4>
				<table class="table">
					<thead class="thead-inverse">
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Product code</th>
							<th>Trigger after</th>
							<th>Number of products with discount</th>
							<th>Discount</th>
							<th>Repeat</th>
							<th><b-button variant="success" size="sm" @click="getProductsList" v-b-modal.addDisco>Create</b-button></th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(product, index) in products" v-if="product.discount">
							<th scope="row">{{index+1}}</th>
							<td>{{product.discount.name}}</td>
							<td>{{product.discount.code}}</td>
							<td>{{product.discount.amountTrigger}}</td>
							<td>
								<div v-if="product.discount.select">All</div>
								<div v-if="!product.discount.select">{{product.discount.quanity}}</div>
							</td>
							<td>-{{product.discount.discount}}%</td>
							<td>
								<div v-if="!product.discount.repeat ||  product.discount.select">Once</div>
								<div v-if="product.discount.repeat && !product.discount.select">Repeat</div>
							</td>
							<td>
								<b-button size="sm" variant="outline-danger" class="remove" @click="removeDiscount(product.code)">
									X
								</b-button>
							</td>
						</tr>
					</tbody>
				</table>
				<b-modal id="addDisco"
					@ok="addDiscount"
					title="Add new discount">
						<b-form @submit.prevent="addDiscount" novalidate validated>
							<b-form-group
								label="Name:"
								description="Discount name">
								<b-form-input
									type="text" v-model="form.name" required
									placeholder="Discount name"></b-form-input>
							</b-form-group>
							<b-form-group
								label="Select product">
								<b-form-select v-model="form.code" @click="getProductsList" :options="productsList" class="mb-3"></b-form-select>
							</b-form-group>
							<b-form-group
								label="Amount trigger:"
								description="Minimum amount of products that launches the discount">
								<b-form-input
									type="number" v-model="form.amountTrigger" required
									placeholder="Amount trigger"></b-form-input>
							</b-form-group>
							<b-form-group
								label="Discount size:"
								description="Given amount will be subtracted from regular product price.">
								<b-form-input
									type="number" v-model="form.discount" required
									placeholder="Discount size"></b-form-input>
							</b-form-group>
							<b-form-group>
								<h5>How many products will get discount:</h5>
									<b-form-radio
										v-model="form.select"
										:options="quanityOptions"
										stacked
										size="sm"></b-form-radio>
							</b-form-group>
							<b-form-group v-if="!form.select"
								label="Quanity:"
								description="Quanity of products with discount">
								<b-form-input
									type="number" v-model="form.quanity" required
									placeholder="Quanity of products with discount"></b-form-input>
							</b-form-group>
							<b-form-group v-if="!form.select">
								<h5>After {{form.amountTrigger}} products added to cart do you want to start counting next products for and repeat discounts?</h5>
								<b-form-checkbox id="checkbox1" v-model="form.repeat" value="true" unchecked-value="false">
								 Repeat discount
								</b-form-checkbox>
							</b-form-group>

							</b-form>
				</b-modal>
		</b-row>
	</b-container>
</template>

<script>

import {db} from '../shared/db';


class Discount {
	constructor(name, code, trigger=0, discount=0, qty=0, repeat=false, select=true){
		this.name = name;
		this.code = code;
		//from which products number discounts is avalieble "if you buy X then.."
		this.amountTrigger = trigger;
		//how much percents cheaper 0-100%
		this.discount = discount;
		//set quanity or make promo for all products (with this code)
		this.select = select;
		//if set quanity: how many next products are under discount?
		this.quanity = qty;
		//if set quanity: repeat counting amountTrigger after quanity reaches the end?
		this.repeat = repeat;
	}
}

let discounts = db.ref('discounts');
let orders = db.ref('orders');
let products = db.ref('products');

export default {
	name: 'promo',
	firebase: {
		orders: orders,
		products: products,
		discounts: discounts
	},
	data(){
		return{
			form: new Discount(),
			selected: null,
			productsList: [],
			quanityOptions: [
				{value: true, text: 'All products'},
				{value: false, text: 'Selected number of products'}
			],
		}
	},
	methods: {
		addDiscount(){
			let that = this;
			let query = db.ref("products").orderByChild("code").equalTo(that.form.code);
			query.once("child_added", function(snapshot) {
				snapshot.ref.update({ discount: that.form }).then( () => {
					alert('Discount created!');
					that.clearForm();
				});
			});
		},
		getProductsList(){
//			this.productsList = [{value: 'ALL', text: "All products"}];
			this.productsList=[];
			this.products.forEach( (product) => {
				this.productsList.push({ value: product.code, text: "("+product.code+") "+ product.name });
			});
		},
		clearForm(){
			this.form = new Discount;
		},
		removeDiscount(code){
			let that = this;
			let query = db.ref("products").orderByChild("code").equalTo(code);
			query.once("child_added", function(snapshot) {
				snapshot.ref.update({ discount: {} }).then( () => {
					alert('Discount removed!');
				});
			});
		},
	}
}
</script>

<style>
</style>
