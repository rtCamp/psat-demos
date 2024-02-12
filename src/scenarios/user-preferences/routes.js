const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    res.render(path.join(__dirname,'index'), {
        title: 'Personalization'
    });
});

router.get( '/get-user-preference', ( req, res ) => {
    const currentTheme = req.cookies.theme || 'light';
    res.json( { theme: currentTheme });
});

router.post( '/set-user-preference', ( req, res ) => {
    const { theme } = req.body;
    
    if (!theme) {
        res.status(400).send({ message: 'Invalid request' });
        
    }
    
    res.cookie('theme', theme, {
        domain: res.locals.domainC,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        httpOnly: true,
        sameSite: "none",
        secure: true
    });
    res.status(200).send({ message: 'Success', theme : theme});
});

// Serve the user-preference.js file to the site
router.get('/user-preference.js', (req, res) => {
    res.set('Content-Type', 'application/javascript');
    res.render(path.join(__dirname,'user-preference'));
});

module.exports = router;
