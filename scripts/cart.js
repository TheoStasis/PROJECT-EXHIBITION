export let cart = [];

export function addToCart(button) {
  const quantitySelector = document.querySelector(`.js-quantity-selector-${button.dataset.id}`);
  if (quantitySelector) {
      const quantity = parseInt(quantitySelector.value, 10);
      const foodItem = {
          id: button.dataset.id,
          name: button.dataset.name,
          price: button.dataset.price,
          quantity: quantity
      };
      // Logic to add foodItem to cart
      cart.push(foodItem); // Add item to cart
      console.log(cart); // Log the cart array to the console
      updateCartQuantity();
  } else {
      console.error('Quantity selector not found for button with ID:', button.dataset.id);
  }
}

// Function to update cart quantity display
export function updateCartQuantity() {
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelector('.js-cart-quantity-number').innerHTML = totalQuantity;
}

