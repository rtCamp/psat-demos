const express = require('express');
const path = require('path');
const router = express.Router();

// Route for the main page
router.get('/', (req, res) => {
    // Get the current domain from the request headers
    const currentDomain = req.get('host');
    // Determine the template to render based on the current domain
    const template = currentDomain === res.locals.domainC ? 'theme-selection' : 'index';
    // Render the chosen template
    res.render(path.join(__dirname,template), {
        title: 'Storage Access API'
    });
});

// Route for the theme selection page
router.get('/theme-selection', (req, res) => {
    // Render the theme selection template
    res.render(path.join(__dirname,'theme-selection'), {
        title: 'Storage Access API'
    });
});

// Route to get the current personalization settings
router.get( '/get-personalization', ( req, res ) => {
    // Route to get the current personalization settings
    const currentTheme = req.cookies.theme || 'light';
    // Route to get the current personalization settings
    res.json( { theme: currentTheme });
});

router.post( '/set-personalization', ( req, res ) => {
    // Route to get the current personalization settings
    const { theme } = req.body;
    
    // Route to get the current personalization settings
    if (!theme) {
        res.status(400).send({ message: 'Invalid request' });
        
    }
    
    // Set the theme cookie
    res.cookie('theme', theme, {
        domain: `.${res.locals.domainC}`,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        httpOnly: true,
        sameSite: "none",
        secure: true
    });

    // Respond with a 200 status and a success message
    res.status(200).send({ message: 'Success', theme : theme});
});

// Serve the personalization.js file to the site
router.get('/personalization.js', (req, res) => {
    // Set the Content-Type header to 'application/javascript'
    res.set('Content-Type', 'application/javascript');
    // Set the Content-Type header to 'application/javascript'
    res.render(path.join(__dirname,'personalization'));
});

// Export the router
module.exports = router;
