<template>
	<b-container>
			<b-row>
			<h2>Admin page</h2>
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
						<tr v-for="(order, index) in orders">
							<th scope="row">{{index+1}}</th>
							<td>{{order.name}} {{order.lastname}}</td>
							<td>${{order.street}} {{order.number}} {{order.postal}} {{order.city}}</td>
							<td>
								<ul>
									<li v-for="product in order.cart">
										{{product.qty}} x ( {{product.code}} ) {{product.name}}
									</li>
								</ul>
							</td>
						</tr>
					</tbody>
				</table>
		</b-row>
	</b-container>
</template>

<script>

import {db} from '../shared/db';

export default {
	name: 'admin',
	firebase: {
		orders: db.ref('orders'),
		products: db.ref('products')
	},
}
</script>

<style>

</style>
