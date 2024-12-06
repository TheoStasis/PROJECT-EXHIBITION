const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Endpoint to update cart.json
app.post('/update-cart', (req, res) => {
    const newItem = req.body;

    // Read the existing cart.json
    fs.readFile(path.join(__dirname, 'json/cart.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading cart file');
        }

        let cart = [];
        if (data) {
            cart = JSON.parse(data);
        }

        // Check if the item already exists in the cart
        const existingItemIndex = cart.findIndex(item => item.id === newItem.id);
        if (existingItemIndex > -1) {
            // Item exists, increment the quantity
            cart[existingItemIndex].quantity += newItem.quantity; // Increment by the quantity being added
        } else {
            // Item does not exist, add it to the cart
            cart.push(newItem);
        }

        // Write the updated cart back to cart.json
        fs.writeFile(path.join(__dirname, 'json/cart.json'), JSON.stringify(cart, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error writing to cart file');
            }
            res.status(200).send('Cart updated successfully');
        });
    });
});

// Route for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'home-page.html')); // Change this to your main HTML file
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
