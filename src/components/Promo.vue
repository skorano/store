<template>
	<b-container>
			<b-row>
			<h2>Add and manage promotions and discounts</h2>
			<h4>(Promotions can not be combined)</h4>
				<table class="table">
					<thead class="thead-inverse">
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Product code</th>
							<th>Trigger after</th>
							<th>Last for</th>
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
								<div v-if="product.discount.select==1">All</div>
								<div v-if="product.discount.select==0">All additional</div>
								<div v-if="product.discount.select=='2'">{{product.discount.quanity}} products</div>
							</td>
							<td>-{{product.discount.discount}}%</td>
							<td>
								<div v-if="!product.discount.repeat ||  product.discount.select!='2'">Once</div>
								<div v-if="product.discount.repeat && product.discount.select=='2'">Repeat</div>
							</td>
							<td></td>
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
							<b-form-group v-if="form.select==2"
								label="Quanity:"
								description="Quanity of products with discount">
								<b-form-input
									type="number" v-model="form.quanity" required
									placeholder="Quanity of products with discount"></b-form-input>
							</b-form-group>
							<b-form-group v-if="form.select==2">
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
	constructor(name, code, trigger, discount, qty, repeat){
		this.name = name;
		//product code
		this.code = code;
		//from which products number discounts is avalieble
		this.amountTrigger = trigger;
		//how much percents cheaper
		this.discount = discount;
		//how many next products are under discount? 0:all next, -1: all , 1-n: all (n) next
		this.quanity = qty;
		//repeat counting amountTrigger after quanity reaches the end?
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
			newDiscount: new Discount,
			selected: null,
			productsList: [],
			quanityOptions: [
				{value: 0, text: 'All additional products'},
				{value: 1, text: 'All products'},
				{value: 2, text: 'Selected number of products'}
			],
			form: {
				name: '',
				code: '',
				amountTrigger: 0,
				discount: 0,
				quanity: 0,
				select: 0,
				repeat: false
			}
		}
	},
	methods: {
		addDiscount(){
			let that = this;
			let query = db.ref("products").orderByChild("code").equalTo(that.form.code);
			query.once("child_added", function(snapshot) {
				snapshot.ref.update({ discount: that.form }).then( () => {
					alert("Hurray!");
				});
			});
		},
		getProductsList(){
			this.productsList = [{value: 'ALL', text: "All products"}];
			this.products.forEach( (product) => {
				this.productsList.push({ value: product.code, text: "("+product.code+") "+ product.name });
			});
		}
	}
}
</script>

<style>

</style>
