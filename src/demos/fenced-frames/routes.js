const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    // Send the default page
    const currentDomain = req.get('host');
    res.render(path.join(__dirname,'index'), {
        title: 'Fenced Frames',
    });
});

router.get('/fenced-ad', (req, res) => {
    // Send the iframe page
    res.render(path.join(__dirname,'fenced-ad'), {
        title: 'Fenced ads'
    });
});


router.get('/traditional-ad', (req, res) => {
    // Send the iframe page
    res.render(path.join(__dirname,'traditional-ad'), {
        title: 'Traditional ads'
    });
});

module.exports = router;
