const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    // Send the default page
    res.render(path.join(__dirname,'index'), {
        title: 'Social media Like Button'
    });
});

module.exports = router;
