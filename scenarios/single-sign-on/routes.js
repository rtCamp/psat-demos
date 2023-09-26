const express = require('express');
const path = require( "path" );
const router = express.Router();

router.get('/', (req, res) => {
	const email = req.cookies.email;

	if (email) {
		// User is 'logged in', redirect to profile page
		res.redirect('/single-sign-on/profile');
	} else {
		// Show the sign-in page
		res.render(path.join(__dirname,'index'), { title: '🚧 Single Sign-On Demo' });
	}
});

router.post('/sign-in', (req, res) => {
	const email = req.body.email;

	if (email) {
		// Set the email address in a cookie
		res.cookie('email', email, { maxAge: 900000, httpOnly: true });
		res.redirect('/single-sign-on/profile');
	} else {
		res.render(path.join(__dirname,'index'), { title: '🚧 Single Sign-On Demo' });
	}
});

router.get('/profile', (req, res) => {
	const email = req.cookies.email;

	if (email) {
		res.render(path.join(__dirname,'profile'), { title: '🚧 Single Sign-On Demo', email: email });
	} else {
		res.redirect('/single-sign-on');
	}
});

router.get('/logout', (req, res) => {
	// Clear the email cookie
	res.clearCookie('email');
	res.render(path.join(__dirname,'logout'), { title: '🚧 Single Sign-On Demo' });
});

module.exports = router;
