<template>
	<b-container class="bv-example-row">
		<b-card-group deck>
			<single-product v-for="product in products" :item="product"></single-product>
	</b-card-group>
	</b-container>
</template>

<script>

import SingleProduct from './SingleProduct'
import {db} from '../shared/db';


export default {
	name: 'products-list',
	components: { SingleProduct },
	firebase: {
		products: db.ref('products')
	},
	data () {
		return {
//			products: [
//				{
//					code: "123",
//					name: "Jabłko",
//					price: 10,
//					url: ""
//				},
//				{
//					code: "234",
//					name: "Kawa",
//					price: 9.50,
//					url: ""
//				},
//				{
//					code: "345",
//					name: "Ziemniak",
//					price: 5.10,
//					url: ""
//				}
//			]
		}
	},
	methods: {
	}
}
</script>

<style scoped>


</style>
