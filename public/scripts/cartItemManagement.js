const cartItemUpdateFormElements = document.querySelectorAll(".cart-item-management");
const cartTotalPriceElement = document.getElementById("cart-total-price");
const cartBadgeElements = document.querySelectorAll(".nav-items .badge");

async function updateCartItem(event) {
	event.preventDefault(); // to prevent the default form submission

	const form = event.target;
	const productId = form.dataset.productid;
	const csrfToken = form.dataset.csrf;
	const quantity = form.firstElementChild.value;
	let response;
	try {
		response = await fetch("/cart/items", {
			method: "PATCH",
			body: JSON.stringify({
				productid: productId,
				quantity: quantity,
				// as key given in the cart.controller in updatedItemData const
				_csrf: csrfToken,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		alert("Something went wrong!");
		return;
	}

	if (!response.ok) {
		alert("Something went wrong!");
		return;
	}

	const responseData = await response.json();
	// now we can update the cart items
  // if we decrease the item quantity to zero, means we do not want to buy that product, for that we have to check the quantity and then remove those products which are turned to zero.

  if (responseData.updatedCartData.updatedItemPrice === 0) {
		form.parentElement.parentElement.remove();
	} else {
		const cartItemTotalPriceElement =
			form.parentElement.querySelector(".cart-item-price");
		cartItemTotalPriceElement.textContent =
			responseData.updatedCartData.updatedItemPrice.toFixed(2);
	}
	// point to cart.controller updatedCartData keys fixed i.e, updateItemPrice, newTotalPrice and newTotalQuantity.

	cartTotalPriceElement.textContent =
		responseData.updatedCartData.newTotalPrice.toFixed(2);
		
	for( cartBadgeElement of cartBadgeElements) {
		cartBadgeElement.textContent = responseData.updatedCartData.newTotalQuantity;
	}
}

for(const formElement of cartItemUpdateFormElements) {
  formElement.addEventListener('submit', updateCartItem);
}