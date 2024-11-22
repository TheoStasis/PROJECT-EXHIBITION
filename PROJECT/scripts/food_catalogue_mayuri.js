// Food items data with unique names
const foodItems = [
    { name: "Aloo Mutter Samosa", price: "₹149", image: "./css/images/food-items/Mayuri/aloo mutter samosa.png", quantity: 0 },
    { name: "Aloo Tikki", price: "₹299", image: "./css/images/food-items/Mayuri/ALOO TIKKI.png", quantity: 0 },
    { name: "Dahi bhalle", price: "₹199", image: "./css/images/food-items/Mayuri/dahi bhalla.png", quantity: 0 },
    { name: "Dahi Puri", price: "₹129", image: "./css/images/food-items/Mayuri/dahi puri.png", quantity: 0 },
    { name: "Indori Hot Dog", price: "₹179", image: "./css/images/food-items/Mayuri/indori hot dog.png", quantity: 0 },
    { name: "Loaded Sandwhich", price: "₹249", image: "./css/images/food-items/Mayuri/LOADED SANDWITCH.jpg", quantity: 0 },
    { name: "Masala Dosa", price: "₹219", image: "./css/images/food-items/Mayuri/masala dosa.jpg", quantity: 0 },
    { name: "Masala Paneer Samosa", price: "₹159", image: "./css/images/food-items/Mayuri/masala paneer samosa.png", quantity: 0 },
    { name: "Paneer Fried Momo", price: "₹189", image: "./css/images/food-items/Mayuri/paneer fried momo.jpg", quantity: 0 },
    { name: "Paneer Hotdog", price: "₹229", image: "./css/images/food-items/Mayuri/paneer hotdog.jpg", quantity: 0 },
    { name: "Paneer Steam Momo", price: "₹329", image: "./css/images/food-items/Mayuri/paneer steam momo.jpg", quantity: 0 },
    { name: "Paneer Tikka", price: "₹259", image: "./css/images/food-items/Mayuri/paneer tikka.png", quantity: 0 },
    { name: "Pani Puri", price: "₹169", image: "./css/images/food-items/Mayuri/pani puri.png", quantity: 0 },
    { name: "Papdi Chat", price: "₹289", image: "./css/images/food-items/Mayuri/papdi chat.png", quantity: 0 },
    { name: "Pav Bhaji", price: "₹199", image: "./css/images/food-items/Mayuri/pav bhaji.png", quantity: 0 },
    { name: "Raj Kachori", price: "₹279", image: "./css/images/food-items/Mayuri/raj kachori.png", quantity: 0 },
    { name: "Shahi Kachori", price: "₹239", image: "./css/images/food-items/Mayuri/shahi kachori.png", quantity: 0 },
    { name: "Vada Pav", price: "₹209", image: "./css/images/food-items/Mayuri/vada pav.png", quantity: 0 },
    { name: "Vada Smbhar", price: "₹179", image: "./css/images/food-items/Mayuri/vada sambhar.png", quantity: 0 },
    { name: "Veg Burger", price: "₹199", image: "./css/images/food-items/Mayuri/veg burger.jpg", quantity: 0 },
    { name: "Veg Cheese Burger", price: "₹229", image: "./css/images/food-items/Mayuri/veg cheese burger.jpg", quantity: 0 },
    { name: "Veg Fried Momo", price: "₹199", image: "./css/images/food-items/Mayuri/veg fried momo.jpg", quantity: 0 },
    { name: "Veg Steam Momo", price: "₹169", image: "./css/images/food-items/Mayuri/veg steam momo.jpg", quantity: 0 },
    { name: "Blueberry Soda", price: "₹269", image: "./css/images/food-items/Mayuri/blue berry soda.jpg", quantity: 0 },
    { name: "Cold Coffee", price: "₹189", image: "./css/images/food-items/Mayuri/cold coffee.jpg", quantity: 0 },
    { name: "Green Apple Soda", price: "₹249", image: "./css/images/food-items/Mayuri/green apple soda.jpg", quantity: 0 },
    { name: "Mint Mojito", price: "₹179", image: "./css/images/food-items/Mayuri/mint mojito.jpg", quantity: 0 },
    { name: "Kiwi Punch", price: "₹219", image: "./css/images/food-items/Mayuri/kiwi punch.jpg", quantity: 0 },
    { name: "Pineapple Soda", price: "₹239", image: "./css/images/food-items/Mayuri/pineapple juice.jpg", quantity: 0 },
    { name: "Idli Sambhar", price: "₹349", image: "./css/images/food-items/Mayuri", quantity: 0 }
];

// Create container
const container = document.createElement('div');
container.className = 'container mt-5 mb-5';
document.body.appendChild(container);

// Create row
const row = document.createElement('div');
row.className = 'row g-4';
container.appendChild(row);

// Generate 30 cards
for (let i = 0; i < 30; i++) {
    // Create column
    const col = document.createElement('div');
    col.className = 'col-md-3';
    
    // Create card
    const card = document.createElement('div');
    card.className = 'card h-100 mb-4 glassmorphism'; // Added glassmorphism class
    card.style.textAlign = 'center';
    
    // Create card content
    card.innerHTML = `
        <img src="${foodItems[i].image}" class="card-img-top" alt="Food" style="height: 200px; object-fit: cover;">
        <div class="card-body d-flex flex-column">
            <h5 class="card-title">${foodItems[i].name}</h5>
            <p class="card-text">${foodItems[i].price}</p>
            <div class="product-quantity-container">
                <select class = "js-quantity-selector-${i}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                </select>
            </div>
            <button class="btn mt-auto align-self-end js-add-to-cart" style="background-color: rgba(255, 0, 0, 0.7); color: white;"
                data-id="${i}" data-name="${foodItems[i].name}" data-price="${foodItems[i].price}">
                <i class="bi bi-cart-plus-fill"></i>
            </button>
        </div>
    `;
    
    // Add hover effect
    card.style.transition = 'transform 0.3s ease';
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1)';
    });
    
    // Append card to column and column to row
    col.appendChild(card);
    row.appendChild(col);
}

// Add required Bootstrap Icons CSS
const linkElement = document.createElement('link');
linkElement.rel = 'stylesheet';
linkElement.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css';
document.head.appendChild(linkElement);

// Add custom styles
const style = document.createElement('style');
style.textContent = `
    .glassmorphism {
        background: rgba(200, 200, 200, 0.5);
        backdrop-filter: blur(10px);
        border-radius: 1.5rem;
        border: 1px solid rgba(255, 255, 255, 0.18);
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    }
    
    .card-body {
        padding: 1.25rem;
    }
    
    .btn {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(255, 0, 0, 0.7) !important;
        backdrop-filter: blur(5px);
        border: 1px solid rgba(255, 255, 255, 0.18);
        font-size: 1.2rem;
    }
    
    .btn:hover {
        background-color: rgba(204, 0, 0, 0.8) !important;
    }

    .card-title, .card-text {
        color: #333;
    }
`;
document.head.appendChild(style);

document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
        // Get the quantity from the corresponding selector
        const quantitySelector = document.querySelector(`.js-quantity-selector-${button.dataset.id}`);
        
        // Check if the quantitySelector exists
        if (quantitySelector) {
            const quantity = parseInt(quantitySelector.value, 10); // Get the selected quantity as an integer

            // Check if the item already exists in the cart
            const existingItemIndex = cart.findIndex(item => item.id === button.dataset.id);
            if (existingItemIndex !== -1) {
                // If it exists, increase the quantity
                cart[existingItemIndex].quantity += quantity;
            } else {
                // If it doesn't exist, create a new item object
                let foodItem = {
                    id: button.dataset.id,
                    name: button.dataset.name,
                    price: button.dataset.price,
                    quantity: quantity // Set the initial quantity
                };

                // Add the item to the cart
                cart.push(foodItem);
            }

            // Calculate total quantity of all items in the cart
            const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
            document.querySelector('.js-cart-quantity-number').innerHTML = totalQuantity; // Update the displayed total quantity
            
            console.log(cart);
        } else {
            console.error('Quantity selector not found for button with ID:', button.dataset.id);
        }
    });
});