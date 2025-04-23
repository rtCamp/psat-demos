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
	let analyticsId = req.cookies.analyticsId;
	if ( !analyticsId ) {
		// Generate a new analytics ID
		analyticsId = uuid.v4();

		// Store the analytics ID in a cookie
		res.cookie( 'analyticsId', analyticsId, {
			Domain: `.${res.locals.domainC}`,
			maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
			httpOnly: true,
			sameSite: "none",
			secure: true
		} );


	}

	let analyticsIdCHIPS = req.cookies['analyticsId-chips'];

	if ( !analyticsIdCHIPS ) {
		analyticsIdCHIPS = uuid.v4();
		res.cookie( 'analyticsId-chips', analyticsIdCHIPS, {
			domain: `.${res.locals.domainC}`,
			maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
			httpOnly: true,
			sameSite: "none",
			secure: true,
			partitioned: true
		} );
	}

	// Set the appropriate content type and send the analytics code
	res.set( 'Content-Type', 'application/javascript' );
	res.render(path.join(__dirname,'analytics'));
} );

router.post( '/track', ( req, res ) => {
	const {interaction} = req.body;
	const analyticsId = req.cookies.analyticsId;

	if ( interaction && analyticsId ) {

		// Send success status for successful interaction tracking
		res.status( 200 ).send( analyticsId );
	} else {
		res.status( 400 ).send( 'Invalid request' );
	}
} );

router.post( '/trackCHIPS', ( req, res ) => {
	const {interaction} = req.body;
	const analyticsIdCHIPS = req.cookies['analyticsId-chips'];

	if ( interaction && analyticsIdCHIPS ) {

		// Send success status for successful interaction tracking
		res.status( 200 ).send( analyticsIdCHIPS );
	} else {
		res.status( 400 ).send( 'Invalid request' );
	}
} );

module.exports = router;
