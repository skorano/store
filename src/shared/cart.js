let cart = {
	products: [],
	summary: 0,
	productsQty(){
		let qty =0;
		for (let item of this.products) {
			qty += item.qty;
		}
		return qty;
	},
	add(product, qty){
		return cartOperations.add(product, qty);
	},
	remove(product, qty){
		return cartOperations.add(product, -1);
	},
	removeProduct(product){
		return cartOperations.removeProduct(product);
	},
	update(product, qty){
		return cartOperations.update(product, qty);
	}
}

const currency = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 2,
	maximumFractionDigits: 2
});

let cartOperations = {
	find: function(code){
		if(cart.products.length>0){
			for(let i=0;i<cart.products.length;i++){
				if(cart.products[i].code === code){
					return cart.products[i];
				}
			}
		}
		return null;
	},
	update: function(product, qty){
		let item = cartOperations.find(product.code);
		if(item){
			let index = cart.products.indexOf(item);
			cart.products[index].qty = qty;
			cart.products[index].discount = product.discount;
			cartOperations.calculate();
		}
	},
	add: function(product, qty){
		let item = cartOperations.find(product.code);
		if(item){
			let index = cart.products.indexOf(item);
			if(cart.products[index].qty + qty <= 0){
					cart.products.splice(index,1);
			}
			else{
				cart.products[index].qty += qty;
				cart.products[index].discount = product.discount;
			}
		}
		else{
			product.qty = qty;
			delete product[".key"];
			cart.products.push(product);
		}
		cartOperations.calculate();
	},
	removeProduct: function(product){
// TO DO!
//		let item = cartOperations.find(product.code);
//		if(item){
//			let index = cart.products.indexOf(item);
//			cart.products.splice(index,1);
//		}
	},
	getQty: function(code) {
		let item = cartOperations.find(code);
		if(item){
			return item.qty;
		}
		else{
			return 0;
		}
	},
	calculate: function(){
		let sum = 0;
		for(let item of cart.products){
			sum += item.qty * item.price;
		}
		cart.summary = currency.format(sum);
	}
}
export default {
	name: 'cart',
	data : cart
}
