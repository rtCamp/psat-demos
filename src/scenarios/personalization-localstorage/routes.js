const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    const currentDomain = req.get('host');
    const pageTemplate = currentDomain === res.locals.domainC ? 'theme-selection' : 'index';
    res.render(path.join(__dirname, pageTemplate), {
        title: 'Personalization with localStorage'
    });
});

router.get('/theme-selection', (req, res) => {
    res.render(path.join(__dirname,'theme-selection'), {
        title: 'Personalization'
    });
});

module.exports = router;
