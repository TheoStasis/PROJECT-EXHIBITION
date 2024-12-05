import { foodItems } from './mayuri_food_items.js';
import { addToCart } from './cart.js'; 

document.addEventListener('DOMContentLoaded', () => {
    // Create container
    const container = document.createElement('div');
    container.className = 'container mt-5 mb-5';
    document.body.appendChild(container);

    // Create row
    const row = document.createElement('div');
    row.className = 'row g-4';
    container.appendChild(row);

    // Function to generate food item cards
    const generateFoodCards = () => {
        // Clear existing cards
        row.innerHTML = '';

        // Generate cards for each food item
        foodItems.forEach((item) => {
            // Create column
            const col = document.createElement('div');
            col.className = 'col-md-3';
            
            // Create card
            const card = document.createElement('div');
            card.className = 'card h-100 mb-4 glassmorphism';
            card.style.textAlign = 'center';
            
            // Create card content
            card.innerHTML = `
                <img src="${item.image}" class="card-img-top" alt="Food" style="height: 200px; object-fit: cover;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">${item.price}</p>
                    <div class="product-quantity-container">
                        <select class="js-quantity-selector-${item.id}">
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
                        data-id="${item.id}" data-name="${item.name}" data-price="${item.price}">
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
        });
    };

    // Initial generation of food cards
    generateFoodCards();

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
    
    // Event listener for add to cart buttons
    document.querySelectorAll('.js-add-to-cart').forEach((button) => {
        button.addEventListener('click', () => addToCart(button));
    });
});