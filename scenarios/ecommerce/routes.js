// Import required libraries
const express = require('express');
const path = require('path');
const router = express.Router();

// Middleware to setup common rendering variables
router.use((req, res, next) => {
	// Set common variables for rendering views
	res.locals.title =  'E-Commerce Demo' // Set the page title
	next();  // Continue to the next middleware or route handler
});

// Route to serve the home page
router.get('/', (req, res) => {
	// Render the index view (homepage)
	res.render(path.join(__dirname,'index'));
});

// Route to serve the products page
router.get('/products', (req, res) => {
	// Render the products view
	res.render(path.join(__dirname,'products'));
});

// Route to get cart data
router.get('/cart-data', (req, res) => {
	// Check if cart data exists in cookies, parse it to JSON, or initialize an empty array
	let cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
	// Send cart data as JSON
	res.json(cart);
});

// Route to serve the cart page
router.get('/cart', (req, res) => {
	// Render the cart view
	res.render(path.join(__dirname,'cart'));
});

// Route to handle adding items to cart
router.get('/add-to-cart', (req, res) => {
	// Get the product ID from the query parameters
	const productId = req.query.productId;
	// Check if cart data exists in cookies, parse it to JSON, or initialize an empty array
	let cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
	// Add the new product ID to the cart array
	cart.push(productId);
	// Update the cart cookie with the new cart data
	res.cookie('cart', JSON.stringify(cart), { maxAge: 900000, httpOnly: true, sameSite: 'none', secure:true });
	// Send a success message along with a 200 OK status
	res.status(200).send({ message: 'Success' });
});

// Export the router to be used in other parts of the application
module.exports = router;
