const express = require('express');
const path = require('path');
const router = express.Router();
const uuid = require( 'uuid' );

router.get('/', (req, res) => {
	// Send the default page
	res.render(path.join(__dirname,'analytics-third-party'), {
		title: 'CHIPS'
	});
});

router.get('/analytics-third-party', (req, res) => {
	// Send the default page
	res.render(path.join(__dirname,'analytics-third-party'), {
		title: 'CHIPS'
	});
});

// Serve the analytics.js file to the site
router.get( '/analytics.js', ( req, res ) => {
	// Check if the analyticsId cookie is set
	let analyticsId = req.cookies.analyticsId;
	if ( !analyticsId ) {
		// Generate a new analytics ID
		analyticsId = uuid.v4();

		// Store the analytics ID in a cookie
		res.cookie( 'analyticsId', analyticsId, {
			// Set the domain of the cookie to the current domain
			Domain: `.${res.locals.domainC}`,
			// Set the max age of the cookie to 30 days
			maxAge: 30 * 24 * 60 * 60 * 1000,
			// Set the httpOnly flag to true to prevent the cookie from being accessed by JavaScript
			httpOnly: true,
			// Set the sameSite flag to "none" to allow the cookie to be sent across different sites
			sameSite: "none",
			// Set the secure flag to true to require the cookie to be sent over HTTPS
			secure: true
		} );


	}

	// Check if the analyticsId-chips cookie is set
	let analyticsIdCHIPS = req.cookies['analyticsId-chips'];

	if ( !analyticsIdCHIPS ) {
		// If the analyticsId-chips cookie is not set, generate a new analytics ID
		analyticsIdCHIPS = uuid.v4();
		
		// Store the analytics ID in a cookie
		res.cookie( 'analyticsId-chips', analyticsIdCHIPS, {
			// Set the domain of the cookie to the current domain
			domain: `.${res.locals.domainC}`,
			// Set the max age of the cookie to 30 days
			maxAge: 30 * 24 * 60 * 60 * 1000,
			// Set the httpOnly flag to true to prevent the cookie from being accessed by JavaScript
			httpOnly: true,
			// Set the sameSite flag to "none" to allow the cookie to be sent across different sites
			sameSite: "none",
			// Set the secure flag to true to require the cookie to be sent over HTTPS
			secure: true,
			// Set the partitioned flag to true to prevent the cookie from being shared across different partitions
			partitioned: true
		} );
	}

	// Set the Content-Type header to 'application/javascript' and render the analytics file
	res.set( 'Content-Type', 'application/javascript' );
	res.render(path.join(__dirname,'analytics'));
} );

// Route to track user interactions
router.post( '/track', ( req, res ) => {
	const {interaction} = req.body;
	const analyticsId = req.cookies.analyticsId;
	
	// If interaction and analyticsId are present, send a success status
	// Otherwise, send a 400 status with an error message
	interaction && analyticsId ? res.status(200).send(analyticsId) : res.status(400).send('Invalid request');
} );

// Route to track user interactions for CHIPS
router.post( '/trackCHIPS', ( req, res ) => {
	const {interaction} = req.body;
	const analyticsIdCHIPS = req.cookies['analyticsId-chips'];

	// If interaction and analyticsIdCHIPS are present, send a success status
	// Otherwise, send a 400 status with an error message
	interaction && analyticsIdCHIPS ? res.status(200).send(analyticsIdCHIPS) : res.status(400).send('Invalid request');
} );

// Export the router
module.exports = router;
