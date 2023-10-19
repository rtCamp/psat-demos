const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
	const email = req.cookies.localemail;

	if (email) {
		// User is 'logged in', redirect to profile page
		res.redirect('/single-sign-on/profile');
	} else {
		// User is not logged in, redirect to sign-in page
		res.redirect('/single-sign-on/sign-in');
	}
});

router.get('/profile', (req, res) => {
	// Stored for site's own login status
	const email = req.cookies.localemail;
	const domain = req.get('host');

	if (email) {
		res.render(path.join(__dirname, 'profile'), { title: 'Single Sign-On Demo for ' + domain, email: email });
	} else {
		res.redirect('/single-sign-on/sign-in');
	}
});

router.get('/logout', (req, res) => {
	const domain = req.get('host');
	res.clearCookie('localemail');
	res.render(path.join(__dirname, 'logout'), { title: 'Single Sign-On Demo for ' + domain });
});

router.get('/login', (req, res) => {
	const domain = req.get('host');
	const email = req.cookies.email;
	if (email) {
		// Render a page that will post a message back to the parent window
		res.render(path.join(__dirname, 'postmessage'), { email: email });
	} else {
		res.render(path.join(__dirname, 'login'), { title: 'Login to ' + domain });
	}
});

router.get('/sign-in', (req, res) => {
	const domain = req.get('host');
	res.render(path.join(__dirname, 'signin'), { title: 'Single Sign-On Demo for ' + domain, protocol: 'https', domainC: res.locals.domainC });
});

router.post('/validate', (req, res) => {
	const email = req.body.email;
	if (email) {
		res.cookie('email', email, { maxAge: 900000, httpOnly: true, domain: res.locals.domainC, sameSite: "none", secure: true });
		res.render(path.join(__dirname, 'postmessage'), { email: email });
	} else {
		res.status(400).send('Email validation failed');
	}
});

router.get('/check-login-status', (req, res) => {
	const email = req.cookies.email;
	res.render(path.join(__dirname, 'check-login-status'), { email: email });
});


module.exports = router;
