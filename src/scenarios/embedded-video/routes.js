const express = require('express');
const path = require('path');
const router = express.Router();


router.get('/', (req, res) => {
    res.render(path.join(__dirname,'index'), {
        title: 'Embedded Video Demo'
    });
});
module.exports = router;
