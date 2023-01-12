class Cart {
  constructor(items = [], totalQuantity = 0, totalPrice = 0) {
    this.items = items;
    this.totalQuantity = totalQuantity;
    this.totalPrice = totalPrice;
  }

  addItem(product) {
    const cartItem = {
      product: product,
      quantity: 1,
      totalPrice: product.price
    };

    // to add same item multiple times
    for(let i =0 ; i <this.items.length; i++) {
      const item = this.items[i];
      if(item.product.id === product.id) {
        cartItem.quantity = item.quantity + 1;   // for cart logic
        cartItem.totalPrice = item.totalPrice + product.price;
        this.items[i] = cartItem;

        this.totalQuantity++;   // for session
        this.totalPrice += product.price;
        return;
      }
    }
    // to add different items
    this.items.push(cartItem);
    this.totalQuantity++; // for session
		this.totalPrice += product.price;
  }

  updateItem(productid, newQuantity) {
     for (let i = 0; i < this.items.length; i++) {
				const item = this.items[i];
				if (item.product.id === productid && newQuantity > 0) {          
          const cartItem = { ...item } ;
          const quantityChange = newQuantity - item.quantity;          
					
          cartItem.quantity = newQuantity; 
					cartItem.totalPrice = newQuantity * item.product.price;
					this.items[i] = cartItem;

					this.totalQuantity = this.totalQuantity + quantityChange;
					this.totalPrice += quantityChange * item.product.price;
					return {
            updatedItemPrice : cartItem.totalPrice
          } ;

				} else if (item.product.id === productid && newQuantity <= 0) {
          this.items.splice(i, 1);
          this.totalQuantity = this.totalQuantity - item.quantity;
					this.totalPrice -= item.totalPrice;

					return {updatedItemPrice: 0};	
        }
			}
    
  }
}

module.exports = Cart;  