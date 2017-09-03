let cart = {
	products: [],
	summary: 0,
	productsQty: 0,
	countProductsQty(){
		let qty =0;
		for (let item of this.products) {
			qty += item.qty;
		}
		this.productsQty = qty;
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
	},
	clear(){
		this.products = [],
		this.summary = 0,
		this.productsQty = 0
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
			let product = cart.products[index];
			product.qty = qty;
			product.discount = product.discount;
			cartOperations.calculate();
		}
	},
	add: function(product, qty){
		let item = cartOperations.find(product.code);
		if(item){
			let index = cart.products.indexOf(item);
			let prod = cart.products[index];
			if(prod.qty + qty <= 0){
					cart.products.splice(index,1);
			}
			else{
				prod.qty += qty;
				prod.discount = product.discount || {};
			}
		}
		else{
			product.discount = product.discount || {};
			product.qty = qty;
			delete product[".key"];
			cart.products.push(product);
		}
		cartOperations.calculate();
	},
	removeProduct: function(product){
		let item = cartOperations.find(product.code);
		if(item){
			let index = cart.products.indexOf(item);
			cart.products.splice(index,1);
			cartOperations.calculate();
		}
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
		let total = 0;
		for(let item of cart.products){
			if(item.discount && item.qty >= item.discount.amountTrigger){
				let discount = item.discount;
				let sum = 0;
				let priceDiscount = item.price - ( item.price * ( discount.discount ) / 100 );

				if(item.discount.select){
					sum = item.qty * priceDiscount;
				}
				else{
					let count = Number(discount.amountTrigger) + Number(discount.quanity);
					let modulo = Number(item.qty % count);
					let times = Number((item.qty - modulo) / count);
					let itemsDiscount = Number(times * discount.quanity);
					if(modulo > discount.amountTrigger){
						itemsDiscount += (modulo - discount.amountTrigger);
					}
					sum = itemsDiscount * priceDiscount + ( item.qty - itemsDiscount ) * item.price;
				}
				total += sum;
			}
			else{
				total += item.qty * item.price;
			}
		}
		cart.countProductsQty();
		cart.summary = currency.format(total);
	}
}
export default {
	name: 'cart',
	data : cart
}
