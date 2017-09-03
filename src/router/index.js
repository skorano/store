import Vue from 'vue'
import Router from 'vue-router'
import {firebase} from '../shared/db';

import ProductsList from '@/components/ProductsList'
import MyCart from '@/components/MyCart'
import Checkout from '@/components/Checkout'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import Admin from '@/components/Admin'
import Promo from '@/components/Promo'

Vue.use(Router)

let router = new Router({
	routes: [
		{
			path: '/',
			name: 'products-list',
			component: ProductsList
		},
		{
			path: '/cart',
			name: 'my-cart',
			component: MyCart
		},
		{
			path: '/checkout',
			name: 'checkout',
			component: Checkout
		},
		{
			path: '/login',
			name: 'login',
			component: Login
		},
		{
			path: '/signup',
			name: 'signup',
			component: Signup
		},
		{
			path: '/admin',
			name: 'admin',
			component: Admin,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/promo',
			name: 'promo',
			component: Promo,
			meta: {
				requiresAuth: true
			}
		}
	]
})

router.beforeEach( (to, from, next) => {
	let currentUser = firebase.auth().currentUser;
	let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

	if (requiresAuth && !currentUser) next('login')
	else next()
})

export default router;
