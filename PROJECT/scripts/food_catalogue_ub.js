// Food items data with unique names
const foodItems = [
    { name: "Aloo Mutter Samosa", price: "₹149", image: "./css/images/food-items/Mayuri/aloo mutter samosa.png" },
    { name: "Aloo Tikki", price: "₹299", image: "./css/images/food-items/Mayuri/ALOO TIKKI.png" },
    { name: "Dahi bhalle", price: "₹199", image: "./css/images/food-items/Mayuri/dahi bhalla.png" },
    { name: "Dahi Puri", price: "₹129", image: "./css/images/food-items/Mayuri/dahi puri.png" },
    { name: "Indori Hot Dog", price: "₹179", image: "./css/images/food-items/Mayuri/indori hot dog.png" },
    { name: "Loaded Sandwhich", price: "₹249", image: "./css/images/food-items/Mayuri/LOADED SANDWITCH.jpg" },
    { name: "Masala Dosa", price: "₹219", image: "./css/images/food-items/Mayuri/masala dosa.jpg" },
    { name: "Masala Paneer Samosa", price: "₹159", image: "./css/images/food-items/Mayuri/masala paneer samosa.png" },
    { name: "Paneer Fried Momo", price: "₹189", image: "./css/images/food-items/Mayuri/paneer fried momo.jpg" },
    { name: "Paneer Hotdog", price: "₹229", image: "./css/images/food-items/Mayuri/paneer hotdog.jpg" },
    { name: "Paneer Steam Momo", price: "₹329", image: "./css/images/food-items/Mayuri/paneer steam momo.jpg" },
    { name: "Paneer Tikka", price: "₹259", image: "./css/images/food-items/Mayuri/paneer tikka.png" },
    { name: "Pani Puri", price: "₹169", image: "./css/images/food-items/Mayuri/pani puri.png" },
    { name: "", price: "₹289", image: "./css/images/food-items/Mayuri" },
    { name: "Greek Gyros", price: "₹199", image: "./css/images/food-items/Mayuri" },
    { name: "Shrimp Scampi", price: "₹279", image: "./css/images/food-items/Mayuri" },
    { name: "Vegetable Lasagna", price: "₹239", image: "./css/images/food-items/Mayuri" },
    { name: "Beef Pho", price: "₹209", image: "./css/images/food-items/Mayuri" },
    { name: "Chicken Shawarma", price: "₹179", image: "./css/images/food-items/Mayuri" },
    { name: "Eggplant Parmesan", price: "₹199", image: "./css/images/food-items/Mayuri" },
    { name: "Fish and Chips", price: "₹229", image: "./css/images/food-items/Mayuri" },
    { name: "Beef Burrito", price: "₹199", image: "./css/images/food-items/Mayuri" },
    { name: "Caprese Salad", price: "₹169", image: "./css/images/food-items/Mayuri" },
    { name: "Lamb Kebabs", price: "₹269", image: "./css/images/food-items/Mayuri" },
    { name: "Vegetable Tempura", price: "₹189", image: "./css/images/food-items/Mayuri" },
    { name: "Beef Stroganoff", price: "₹249", image: "./css/images/food-items/Mayuri" },
    { name: "Spinach and Feta Quiche", price: "₹179", image: "./css/images/food-items/Mayuri" },
    { name: "Teriyaki Chicken", price: "₹219", image: "./css/images/food-items/Mayuri" },
    { name: "Vegetable Paella", price: "₹239", image: "./css/images/food-items/Mayuri" },
    { name: "Beef Wellington", price: "₹349", image: "./css/images/food-items/Mayuri" }
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

            // Loop through the quantity and add the item to the cart
            for (let i = 0; i < quantity; i++) {
                let foodItem = {
                    id: button.dataset.id,
                    name: button.dataset.name,
                    price: button.dataset.price,
                    // You can also add a unique identifier if needed
                };

                // Add the item to the cart
                cart.push(foodItem);
            }

            // Update the cart quantity display
            document.querySelector('.js-cart-quantity-number').innerHTML = cart.length; // Update the displayed quantity
            
            console.log(cart);
        } else {
            console.error('Quantity selector not found for button with ID:', button.dataset.id);
        }
    });
});