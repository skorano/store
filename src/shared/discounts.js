class Discount {
	constructor(name, trigger, discount, qty, repeat){
		this.name = name;
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



