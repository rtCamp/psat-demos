const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    // Send the default page
    res.render(path.join(__dirname,'index'), {
        title: 'Legacy Google Sign-in'
    });
});

module.exports = router;
