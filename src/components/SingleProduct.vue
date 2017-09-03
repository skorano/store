<template>
		<b-card :title="product.name"
						:img-src="product.url"
						:img-alt="product.name"
						img-top
						style="max-width: 20rem;"
						class="mb-2">
			<p class="card-text">
				Price: ${{product.price}} <b-badge variant="primary" v-if="product.discount">{{product.discount.name}}</b-badge>
			</p>
			<b-button variant="primary" @click="cart.add(product,Number.parseInt(qty))" :disabled="!/^[1-9]\d*$/.test(qty)">Add to cart</b-button>
			<input type="number" v-model="qty" min="0" step="1"  class="form-control">
		</b-card>
</template>

<script>

import cart from '../shared/cart.js'
import {db} from '../shared/db';

let discounts = db.ref('discounts');

export default {
	name: 'single-product',
	props: ['item'],
	data () {
		return {
			product: this.item,
			qty: 1,
			cart: cart.data
		}
	}
//	methods: {
//		findDiscount(){
//			this.discounts.forEach( (discount) => {
//				if(discount.code == this.product.code) this.discount = discount;
//				this.product.discount = this.discount;
//				return this.discount;
//			})
//		}
//	},
//	watch: {
//		discounts() {
//			this.findDiscount();
//		}
//	}
}
</script>

<style scoped>

	input[type=number]{
		width: 100px;
		float:	left;
		margin-right: 5px;
	}

</style>
