const express = require( 'express' );
const path = require( 'path' );
const router = express.Router();


router.get( '/', ( req, res ) => {
	res.render( path.join( __dirname, 'checkout' ), {
		title: 'Checkout',
		item: "Virtual Badge for testing the site",
		price: 10,
	} );
} );
router.get( '/payment-form', ( req, res ) => {
	const sessionId = req.cookies.session_id;

	if ( !sessionId ) {
		res.cookie( 'session_id', 'some_random_session_id', {
			maxAge: 900000,
			httpOnly: true,
			domain: res.locals.domainC,
			sameSite: "none",
			secure: true
		} );
	}
	res.render( path.join( __dirname, 'payment-form' ), {
		title: 'Payment Gateway Form',
	} );
} );
router.post( '/payment-form', ( req, res ) => {
	const sessionId = req.cookies.session_id;
	const cardNumber = req.body.cardNumber;

	let message = '';
	let status = 0;

	if (sessionId && ( cardNumber === '4242424242424242' || cardNumber === '4242-4242-4242-4242' )) {
		status = 1;
		message = 'Payment successful!';
	} else if (!sessionId) {
		message = 'Payment failed! Session not valid.';
	} else {
		message = 'Invalid card number. <br/>Please use 4242424242424242 for demo purchases.';
	}

	res.render( path.join( __dirname, 'payment-form' ), {
		title: 'Payment Gateway Result',
		message: message,
		status: status,
	} );
} );
module.exports = router;
