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
        cartItem.quantity++;   // for cart logic
        cartItem.totalPrice += product.price;
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
}

module.exports = Cart;