document.addEventListener('DOMContentLoaded', () => {
    fetch('./json/cart.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(cartItems => {
            displayCartItems(cartItems);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});

function displayCartItems(cartItems) {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Clear existing items

    let subtotal = 0;

    cartItems.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'card mb-3 col-md-12';
        card.innerHTML = `
            <div class="card-body d-flex align-items-start">
                <span class="me-3 fs-4 item-number">${index + 1}</span>
                <img src="${item.image}" alt="${item.name}" class="me-3 item-image" style="width: 100px; height: 100px; object-fit: cover" />
                <div class="flex-grow-1">
                    <h5 class="card-title item-name">${item.name}</h5>
                    <div class="input-group" style="width: 120px">
                        <button class="btn btn-outline-secondary decrement" type="button">-</button>
                        <input type="text" class="form-control text-center item-quantity"style="color: black" value="${item.quantity}" readonly />
                        <button class="btn btn-danger increment" type="button">+</button>
                    </div>
                </div>
                <div class="text-end mt-auto">
                    <p class="mb-0 item-original-price">₹${item.price.replace('₹', '')}</p>
                    <p class="mb-0 item-quantity-display" style="color: black">x${item.quantity}</p>
                    <p class="fw-bold item-total-price">₹${(parseFloat(item.price.replace('₹', '')) * item.quantity).toFixed(2)}</p>
                </div>
            </div>
        `;

        // Update subtotal
        subtotal += parseFloat(item.price.replace('₹', '')) * item.quantity;

        // Add event listeners for increment and decrement buttons
        card.querySelector('.increment').addEventListener('click', () => {
            item.quantity++;
            updateCartItem(card, item);
        });

        card.querySelector('.decrement').addEventListener('click', () => {
            if (item.quantity > 1) {
                item.quantity--;
                updateCartItem(card, item);
            }
        });

        cartItemsContainer.appendChild(card);
    });

    // Update invoice totals
    document.getElementById('subtotal').textContent = `₹${subtotal.toFixed(2)}`;
    const tax = subtotal * 0.05;
    document.getElementById('tax').textContent = `₹${tax.toFixed(2)}`;
    const discount = 0; // You can implement discount logic here
    document.getElementById('discount').textContent = `₹${discount.toFixed(2)}`;
    const shipping = 40; // Fixed shipping charge
    document.getElementById('shipping').textContent = `₹${shipping.toFixed(2)}`;
    const total = subtotal + tax - discount + shipping;
    document.getElementById('total').textContent = `₹${total.toFixed(2)}`;
}

function updateCartItem(card, item) {
    const quantityInput = card.querySelector('.item-quantity');
    const totalPriceElement = card.querySelector('.item-total-price');
    quantityInput.value = item.quantity;
    totalPriceElement.textContent = `₹${(parseFloat(item.price.replace('₹', '')) * item.quantity).toFixed(2)}`;
}
