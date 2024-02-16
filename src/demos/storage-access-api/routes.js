const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    const currentDomain = req.get('host');
    const template = currentDomain === res.locals.domainC ? 'theme-selection' : 'index';
    res.render(path.join(__dirname,template), {
        title: 'Storage Access API'
    });
});

router.get('/theme-selection', (req, res) => {
    res.render(path.join(__dirname,'theme-selection'), {
        title: 'Storage Access API'
    });
});


router.get( '/get-personalization', ( req, res ) => {
    const currentTheme = req.cookies.theme || 'light';
    res.json( { theme: currentTheme });
});

router.post( '/set-personalization', ( req, res ) => {
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

// Serve the personalization.js file to the site
router.get('/personalization.js', (req, res) => {
    res.set('Content-Type', 'application/javascript');
    res.render(path.join(__dirname,'personalization'));
});

module.exports = router;
