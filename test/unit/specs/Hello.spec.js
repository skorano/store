import Vue from 'vue'
import Hello from '@/components/SingleProduct'

describe('SingleProduct.vue', () => {
	it('Should render:', () => {
		const Constructor = Vue.extend(SingleProduct)
		const vm = new Constructor().$mount()
		expect(vm.$el.querySelector('.card').textContent)
			.to.equal('Welcome to Your Vue.js App')
	})
})
