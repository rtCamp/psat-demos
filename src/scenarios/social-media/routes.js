const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    // Send the default page
    const currentDomain = req.get('host');
    res.render(path.join(__dirname,'index'), {
        title: 'Social Media'
    });
});

module.exports = router;
