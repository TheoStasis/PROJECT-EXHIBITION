
        // // Load cart items when page loads
        // window.onload = function() {
        //     displayCartItems();
        //     updateCartCount();
        // };

        // function displayCartItems() {
        //     const cartContainer = document.getElementById('cart-items');
        //     cartContainer.innerHTML = ''; // Clear existing items
            
        //     let subtotal = 0;

        //     cart.forEach((item, index) => {
        //         const itemPrice = parseFloat(item.price.replace('₹', ''));
        //         subtotal += itemPrice * item.quantity;

        //         const itemElement = document.createElement('div');
        //         itemElement.className = 'col-md-6 mb-4';
        //         itemElement.innerHTML = `
        //             <div class="card h-100">
        //                 <img src="${item.image}" class="card-img-top" alt="${item.name}">
        //                 <div class="card-body">
        //                     <h5 class="card-title">${item.name}</h5>
        //                     <p class="card-text">Price: ${item.price}</p>
        //                     <div class="d-flex justify-content-between align-items-center">
        //                         <div class="input-group" style="width: 120px;">
        //                             <button class="btn btn-outline-secondary" onclick="updateQuantity(${index}, -1)">-</button>
        //                             <input type="text" class="form-control text-center" value="${item.quantity}" readonly>
        //                             <button class="btn btn-outline-secondary" onclick="updateQuantity(${index}, 1)">+</button>
        //                         </div>
        //                         <button class="btn btn-danger" onclick="removeItem(${index})">Remove</button>
        //                     </div>
        //                 </div>
        //             </div>
        //         `;
        //         cartContainer.appendChild(itemElement);
        //     });

        //     // Update summary
        //     const tax = subtotal * 0.05;
        //     const total = subtotal + tax;

        //     document.getElementById('subtotal').textContent = `₹${subtotal.toFixed(2)}`;
        //     document.getElementById('tax').textContent = `₹${tax.toFixed(2)}`;
        //     document.getElementById('total').textContent = `₹${total.toFixed(2)}`;
        // }

        // function updateQuantity(index, change) {
        //     if (cart[index].quantity + change > 0) {
        //         cart[index].quantity += change;
        //         displayCartItems();
        //         updateCartCount();
        //     }
        // }

        // function removeItem(index) {
        //     cart.splice(index, 1);
        //     displayCartItems();
        //     updateCartCount();
        // }

        // function proceedToBuy() {
        //     alert('Thank you for your purchase!');
        //     cart = [];
        //     displayCartItems();
        //     updateCartCount();
        // }

        // function updateCartCount() {
        //     const cartCount = document.querySelector('.cart-count');
        //     const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        //     cartCount.textContent = totalItems;
        // }
