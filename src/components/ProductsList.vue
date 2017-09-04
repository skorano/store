<template>
	<b-container class="bv-example-row">
		<b-card-group deck>
			<single-product v-for="product in products" :item="product"
					 v-bind:data="product"
					 v-bind:key="product.code"></single-product>
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
	methods: {
	}
}
</script>

<style scoped>
</style>
