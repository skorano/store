<template>
<div>
	<b-container>
			<b-row>
			<h2>Admin page</h2>
				<table class="table">
					<thead class="thead-inverse">
						<tr>
							<th>#</th>
							<th>Customer</th>
							<th>Shipping address</th>
							<th>Placed</th>
							<th>Cart</th>
							<th>Summary</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(order, index) in orders" @click="show(order)">
							<th scope="row">{{index+1}}</th>
							<td>{{order.name}} {{order.lastname}}</td>
							<td>{{order.street}} {{order.number}}, {{order.city}}</td>
							<td>{{order.date}}</td>
							<td>{{order.cart.length}}</td>
							<td>{{order.sum}}</td>
						</tr>
					</tbody>
				</table>
		</b-row>
	</b-container>
	<b-modal ref="orderInfo"
		@ok="hide"
		ok-only
		title="Order details">
		<b>Placed: </b> {{order.date}}<br/>
		<b>Customer:</b> {{order.name}} {{order.lastname}}<br/>
		<b>Shipping address:</b><br/>
		{{order.street}} {{order.number}} <br/>
		{{order.postal}} {{order.city}}<br/>
		<b>E-mail: </b>{{order.email}}
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
				<tr v-for="(product, index) in order.cart">
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

import {db} from '../shared/db';

export default {
	name: 'admin',
	firebase: {
		orders: db.ref('orders'),
		products: db.ref('products')
	},
	data(){
		return{
			order:{}
		}
	},
	methods:{
		hide(){
			this.$refs.orderInfo.hide()
		},
		show(order){
				this.order = order;
			 this.$refs.orderInfo.show();

		}
	},
}
</script>

<style scoped>
	tr{
		cursor: pointer;
	}
	tr:hover{
		background-color: #ddd;
	}
</style>
